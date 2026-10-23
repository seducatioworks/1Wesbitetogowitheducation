import type { TutorRequest } from '../types';

/**
 * Returns the Spectre business WhatsApp number in international format (e.g. 919XXXXXXXXX)
 * without +, spaces, brackets, or hyphens.
 */
export function getSpectreWhatsAppNumber(): string {
  const rawNumber =
    import.meta.env.VITE_SPECTRE_WHATSAPP_NUMBER ||
    import.meta.env.VITE_COORDINATOR_WHATSAPP ||
    '919220638540';
  return rawNumber.replace(/\D/g, '');
}

/**
 * Generates a concise, natural WhatsApp message for parent tutor requests.
 * Only includes fields that have valid values.
 */
export function generateParentWhatsAppMessage(request: TutorRequest): string {
  const parentName = request.parent_name && request.parent_name.trim() ? request.parent_name.trim() : 'Parent';
  const lines: string[] = [
    "Hi Spectre Tutors!",
    `I am a parent: ${parentName}`,
    "",
    "I'd like help finding a home tutor."
  ];

  if (request.student_class) {
    const boardSuffix = request.board && request.board !== 'Not sure' ? ` (${request.board})` : '';
    lines.push(`Class: ${request.student_class}${boardSuffix}`);
  }

  if (request.subjects && request.subjects.length > 0) {
    lines.push(`Subject: ${request.subjects.join(', ')}`);
  }

  if (request.area) {
    const landmarkSuffix = request.landmark ? ` (Near ${request.landmark})` : '';
    lines.push(`Area: ${request.area}${landmarkSuffix}`);
  }

  lines.push("Mode: Home tuition");

  if (request.help_needed && request.help_needed.length > 0) {
    lines.push(`Help Needed: ${request.help_needed.join(', ')}`);
  }

  if (request.preferred_days && request.preferred_days.length > 0) {
    const timeSuffix = request.preferred_time ? ` (${request.preferred_time})` : '';
    lines.push(`Schedule: ${request.preferred_days.join(', ')}${timeSuffix}`);
  }

  if (request.phone) {
    lines.push(`Phone: +91 ${request.phone}`);
  }

  if (request.additional_message && request.additional_message.trim()) {
    lines.push(`Note: ${request.additional_message.trim()}`);
  }

  lines.push("");
  lines.push("Please help me find a suitable tutor.");

  return lines.join("\n");
}

/**
 * Generates a concise, natural WhatsApp message for tutor/educator applications.
 * Only includes fields that have valid values.
 */
export function generateTutorWhatsAppMessage(request: TutorRequest): string {
  const tutorName = request.parent_name && request.parent_name.trim() ? request.parent_name.trim() : 'Tutor';
  const lines: string[] = [
    "Hi Spectre Tutors!",
    `I am a tutor: ${tutorName}`,
    "",
    "I'd like to apply as a home tutor in Delhi."
  ];

  if (request.subjects && request.subjects.length > 0) {
    lines.push(`Subjects: ${request.subjects.join(', ')}`);
  }

  if (request.student_class) {
    lines.push(`Classes: ${request.student_class}`);
  }

  if (request.area) {
    lines.push(`Area: ${request.area}`);
  }

  lines.push("Mode: Home tuition");

  if (request.preferred_days && request.preferred_days.length > 0) {
    const timeSuffix = request.preferred_time ? ` (${request.preferred_time})` : '';
    lines.push(`Availability: ${request.preferred_days.join(', ')}${timeSuffix}`);
  }

  if (request.phone) {
    lines.push(`Phone: +91 ${request.phone}`);
  }

  if (request.additional_message && request.additional_message.trim()) {
    lines.push(`Details / Experience: ${request.additional_message.trim()}`);
  }

  lines.push("");
  lines.push("I'd like to know more about becoming a Spectre tutor.");

  return lines.join("\n");
}

/**
 * Generates the appropriate WhatsApp message depending on whether the request
 * is from a parent or a tutor.
 */
export function generateWhatsAppMessage(request: TutorRequest): string {
  return request.user_type === 'tutor'
    ? generateTutorWhatsAppMessage(request)
    : generateParentWhatsAppMessage(request);
}

/**
 * Generates a standard WhatsApp Click-to-Chat (wa.me) URL.
 */
export function createWhatsAppLink(phoneNumber: string, message: string): string {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Creates an admin coordinator reply WhatsApp link.
 */
export function createAdminReplyWhatsAppLink(request: TutorRequest): string {
  const cleanPhone = request.phone.replace(/\D/g, '');
  const isTutor = request.user_type === 'tutor';

  const greeting = isTutor
    ? `Hi ${request.parent_name}, this is Spectre Tutors Network. We received your tutor application for ${request.subjects.join('/')} in Delhi. Are you available for a quick discussion?`
    : `Hi ${request.parent_name}, this is Spectre Tutors Network. We received your home tuition request for ${request.student_class} (${request.subjects.join(', ')}) in ${request.area}. We're reviewing suitable tutors for your child.`;

  return `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(greeting)}`;
}
