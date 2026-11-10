import type { 
  ParentTutoringEnquiry, 
  EducatorApplication, 
  GuidanceEnquiry, 
  TutorRequest 
} from '../types';
import { formatIndianPhoneDisplay } from './validation';

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
 * Generates a standard WhatsApp Click-to-Chat (wa.me) URL.
 * Safely encodes all content including newlines and symbols.
 */
export function createWhatsAppLink(phoneNumber: string, message: string): string {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * 1. Structured WhatsApp message for Parent Tutoring Enquiries
 */
export function generateParentTutoringMessage(enquiry: ParentTutoringEnquiry): string {
  const lines: string[] = [
    'NEW PARENT ENQUIRY — SPECTRE EDUCATION',
    '───────────────────────────────────────',
    `Parent Name: ${enquiry.parent_name.trim() || 'Parent'}`,
    `Contact Number: ${formatIndianPhoneDisplay(enquiry.phone)}`,
  ];

  if (enquiry.preferred_contact_method) {
    lines.push(`Preferred Contact: ${enquiry.preferred_contact_method}`);
  }

  lines.push('');
  lines.push('STUDENT DETAILS:');
  const boardSuffix = enquiry.board && enquiry.board !== 'Not sure' ? ` (${enquiry.board})` : '';
  lines.push(`Student Class: ${enquiry.student_class}${boardSuffix}`);

  if (enquiry.language_instruction) {
    lines.push(`Instruction Language: ${enquiry.language_instruction}`);
  }

  // Format subjects including science branches
  const formattedSubjects: string[] = [];
  enquiry.subjects.forEach((sub) => {
    if (sub === 'Science' && enquiry.science_branches && enquiry.science_branches.length > 0) {
      formattedSubjects.push(`Science (${enquiry.science_branches.join(', ')})`);
    } else {
      formattedSubjects.push(sub);
    }
  });
  lines.push(`Subjects: ${formattedSubjects.length > 0 ? formattedSubjects.join(', ') : 'Not specified'}`);

  lines.push('');
  lines.push(`Academic Requirement: ${enquiry.academic_requirement}`);

  lines.push('');
  lines.push('LOCATION & SCHEDULE:');
  lines.push(`Locality: ${enquiry.locality || 'Delhi'}`);
  if (enquiry.address && enquiry.address.trim()) {
    lines.push(`Address: ${enquiry.address.trim()}`);
  }
  if (enquiry.landmark && enquiry.landmark.trim()) {
    lines.push(`Landmark: ${enquiry.landmark.trim()}`);
  }

  if (enquiry.preferred_days && enquiry.preferred_days.length > 0) {
    const timeSuffix = enquiry.preferred_time ? ` (${enquiry.preferred_time})` : '';
    lines.push(`Preferred Days: ${enquiry.preferred_days.join(', ')}${timeSuffix}`);
  }
  if (enquiry.sessions_per_week) {
    const durSuffix = enquiry.session_duration ? ` · ${enquiry.session_duration}/session` : '';
    lines.push(`Sessions: ${enquiry.sessions_per_week}${durSuffix}`);
  }

  if (enquiry.additional_context && enquiry.additional_context.trim()) {
    lines.push('');
    lines.push(`Additional Notes: ${enquiry.additional_context.trim()}`);
  }

  lines.push('───────────────────────────────────────');
  lines.push('Please coordinate with a suitable educator.');

  return lines.join('\n');
}

/**
 * 2. Structured WhatsApp message for Educator Applications
 */
export function generateEducatorApplicationMessage(app: EducatorApplication): string {
  const lines: string[] = [
    'NEW EDUCATOR APPLICATION — SPECTRE EDUCATION',
    '───────────────────────────────────────────',
    `Educator Name: ${app.name.trim() || 'Educator'}`,
    `Contact Number: ${formatIndianPhoneDisplay(app.phone)}`,
  ];

  if (app.email && app.email.trim()) {
    lines.push(`Email: ${app.email.trim()}`);
  }

  lines.push(`Highest Qualification: ${app.highest_qualification.trim()}`);

  lines.push('');
  lines.push('TEACHING SCOPE:');
  lines.push(`Subjects: ${app.subjects.join(', ')}`);
  lines.push(`Classes Taught: ${app.classes_taught.join(', ')}`);
  lines.push(`Experience: ${app.teaching_experience}`);

  lines.push('');
  lines.push('LOCALITIES & AVAILABILITY:');
  lines.push(`Preferred Localities: ${app.preferred_localities.length > 0 ? app.preferred_localities.join(', ') : 'Across Delhi'}`);
  lines.push(`Availability: ${app.availability}`);

  if (app.teaching_background && app.teaching_background.trim()) {
    lines.push('');
    lines.push('BACKGROUND & PEDAGOGY:');
    lines.push(app.teaching_background.trim());
  }

  lines.push('───────────────────────────────────────────');
  lines.push('I would like to discuss joining Spectre Education.');

  return lines.join('\n');
}

/**
 * 3. Structured WhatsApp message for Guidance & Mentorship Enquiries
 */
export function generateGuidanceMessage(enquiry: GuidanceEnquiry): string {
  const isMentorship = enquiry.guidance_type === 'Academic Mentorship';
  const header = isMentorship 
    ? 'NEW ACADEMIC MENTORSHIP ENQUIRY — SPECTRE EDUCATION' 
    : 'NEW EDUCATIONAL GUIDANCE ENQUIRY — SPECTRE EDUCATION';

  const lines: string[] = [
    header,
    '───────────────────────────────────────────',
    `Name: ${enquiry.name.trim() || 'Parent / Student'}`,
    `Contact Number: ${formatIndianPhoneDisplay(enquiry.phone)}`,
    `Student Class: ${enquiry.student_class}`,
    `Locality: ${enquiry.locality || 'Delhi'}`,
    `Guidance Service: ${enquiry.guidance_type}`,
    '',
    'DETAILS & SPECIFIC QUESTIONS:',
    enquiry.description.trim() || 'Interested in discussing academic guidance.',
    '───────────────────────────────────────────',
    'Please schedule an advisory telephone discussion.',
  ];

  return lines.join('\n');
}

/**
 * Legacy unified generator for backward compatibility
 */
export function generateWhatsAppMessage(request: TutorRequest): string {
  if (request.user_type === 'tutor') {
    return generateTutorWhatsAppMessage(request);
  }
  if (request.user_type === 'guidance') {
    return generateGuidanceMessage({
      name: request.parent_name,
      phone: request.phone,
      student_class: request.student_class,
      locality: request.area,
      guidance_type: (request.guidance_type as any) || 'Academic Mentorship',
      description: request.additional_message || '',
    });
  }
  return generateParentWhatsAppMessage(request);
}

export function generateParentWhatsAppMessage(request: TutorRequest): string {
  return generateParentTutoringMessage({
    student_class: request.student_class || 'Class 10',
    board: request.board || 'CBSE',
    subjects: request.subjects || ['Mathematics'],
    academic_requirement: request.help_needed && request.help_needed.length > 0 ? request.help_needed[0] : 'Concept clarity',
    additional_context: request.additional_message,
    locality: request.area || 'Delhi',
    address: request.house_address,
    landmark: request.landmark,
    preferred_days: request.preferred_days || ['Monday', 'Wednesday'],
    preferred_time: request.preferred_time || 'Evening',
    sessions_per_week: request.frequency || '3 days/week',
    parent_name: request.parent_name || 'Parent',
    phone: request.phone || '',
  });
}

export function generateTutorWhatsAppMessage(request: TutorRequest): string {
  return generateEducatorApplicationMessage({
    name: request.parent_name || 'Educator',
    phone: request.phone || '',
    email: request.email,
    highest_qualification: 'Graduate',
    subjects: request.subjects || ['Mathematics'],
    classes_taught: [request.student_class || 'Classes 9–10'],
    teaching_experience: '3+ years',
    preferred_localities: request.area ? [request.area] : ['Delhi'],
    availability: `${request.preferred_days?.join(', ') || 'Flexible'} (${request.preferred_time || 'Evening'})`,
    teaching_background: request.additional_message || '',
  });
}
