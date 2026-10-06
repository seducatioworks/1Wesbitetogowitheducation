import type { TutorRequest } from '../types';
import { NOTIFICATION_CONFIG } from '../config/notifications';

/**
 * Formats a TutorRequest into a structured text form formatted for WhatsApp chat.
 */
export function formatRequestAsWhatsAppTextForm(request: TutorRequest): string {
  const isTutor = request.user_type === 'tutor';
  const roleTitle = isTutor ? '🧑‍🏫 TUTOR APPLICATION' : '👨‍👩‍👧 PARENT REQUEST';
  const nameLabel = isTutor ? 'Tutor Name' : 'Parent / Guardian';
  const classLabel = isTutor ? 'Classes Taught' : 'Student Class';
  const helpLabel = isTutor ? 'Teaching Expertise' : 'Help Needed';

  const dateStr = request.created_at
    ? new Date(request.created_at).toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    : new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

  const lines = [
    `📋 *SPECTRE TUTORS NETWORK - REQUEST FORM*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `📌 *Type:* ${roleTitle}`,
    `👤 *${nameLabel}:* ${request.parent_name}`,
    `📞 *Phone:* +91 ${request.phone}`,
    request.email ? `📧 *Email:* ${request.email}` : '',
    ``,
    `📚 *${classLabel}:* ${request.student_class} (${request.board || 'CBSE'})`,
    `🎯 *Subjects:* ${request.subjects.join(', ')}`,
    `💡 *${helpLabel}:* ${request.help_needed.join(', ')}`,
    ``,
    `📍 *Area in Delhi:* ${request.area}`,
    request.landmark ? `🏛️ *Landmark:* ${request.landmark}` : '',
    ``,
    `🗓️ *Preferred Days:* ${request.preferred_days.join(', ')}`,
    `⏰ *Preferred Time:* ${request.preferred_time}`,
    request.frequency ? `🔁 *Frequency:* ${request.frequency}` : '',
    ``,
    request.additional_message
      ? `💬 *Notes / Requirements:*\n"${request.additional_message}"\n`
      : '',
    `━━━━━━━━━━━━━━━━━━━━`,
    `⏰ *Submitted:* ${dateStr}`,
    request.id ? `🆔 *Ref ID:* ${request.id}` : '',
  ];

  return lines.filter((line) => line !== undefined).join('\n');
}

/**
 * Sends an automated background WhatsApp alert to the coordinator via CallMeBot API.
 * Uses mode: 'no-cors' so the browser fires the request without CORS restrictions.
 */
export async function sendAutomatedWhatsAppAlert(request: TutorRequest): Promise<boolean> {
  const phone = import.meta.env.VITE_CALLMEBOT_PHONE || NOTIFICATION_CONFIG.coordinatorWhatsAppNumber;
  const apiKey = import.meta.env.VITE_CALLMEBOT_APIKEY || NOTIFICATION_CONFIG.callMeBotApiKey;

  // If no CallMeBot API key is configured yet, gracefully exit
  if (!apiKey || apiKey === 'YOUR_APIKEY') {
    return false;
  }

  try {
    // Ensure phone has leading + if not present
    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
    const textForm = formatRequestAsWhatsAppTextForm(request);
    const encodedText = encodeURIComponent(textForm);
    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(formattedPhone)}&text=${encodedText}&apikey=${encodeURIComponent(apiKey)}`;

    // Fire non-blocking request with 5s timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    await fetch(url, {
      method: 'GET',
      mode: 'no-cors',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return true;
  } catch (err) {
    console.warn('Background WhatsApp alert notice (offline or unconfigured):', err);
    return false;
  }
}

/**
 * Builds a direct WhatsApp click URL (wa.me) containing the full pre-filled text form.
 * Works instantly on mobile and desktop WhatsApp with zero configuration.
 */
export function getDirectWhatsAppClickUrl(request: TutorRequest): string {
  const targetPhone = import.meta.env.VITE_COORDINATOR_WHATSAPP || NOTIFICATION_CONFIG.coordinatorWhatsAppNumber;
  // Clean phone number (digits only for wa.me)
  const cleanPhone = targetPhone.replace(/\D/g, '');
  const textForm = formatRequestAsWhatsAppTextForm(request);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(textForm)}`;
}

/**
 * Builds an instant reply link for the coordinator to reach out to the parent or tutor.
 */
export function getAdminReplyWhatsAppUrl(request: TutorRequest): string {
  const cleanPhone = request.phone.replace(/\D/g, '');
  const isTutor = request.user_type === 'tutor';
  
  const greeting = isTutor
    ? `Hi ${request.parent_name}, this is Spectre Tutors Network coordinator. We received your tutor application for ${request.subjects.join('/')} in Delhi. Are you available for a quick discussion?`
    : `Hi ${request.parent_name}, this is Spectre Tutors Network coordinator. We received your home tuition request for ${request.student_class} (${request.subjects.join(', ')}) in ${request.area}. We're reviewing suitable tutors for your child and would like to confirm your schedule.`;

  return `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(greeting)}`;
}
