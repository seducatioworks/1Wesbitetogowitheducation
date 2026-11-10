export interface ParentTutoringEnquiry {
  student_class: string;
  board: string;
  language_instruction?: string;
  subjects: string[];
  science_branches?: string[];
  academic_requirement: string;
  additional_context?: string;
  locality: string;
  address?: string;
  landmark?: string;
  preferred_days: string[];
  preferred_time: string;
  sessions_per_week: string;
  session_duration?: string;
  parent_name: string;
  phone: string;
  preferred_contact_method?: 'WhatsApp' | 'Phone Call';
}

export interface EducatorApplication {
  name: string;
  phone: string;
  email?: string;
  highest_qualification: string;
  subjects: string[];
  classes_taught: string[];
  teaching_experience: string;
  preferred_localities: string[];
  availability: string;
  teaching_background: string;
}

export interface GuidanceEnquiry {
  name: string;
  phone: string;
  student_class: string;
  locality: string;
  guidance_type: 'Academic Mentorship' | 'Class 10 Stream Selection' | 'Subject Selection' | 'Academic Planning' | 'Other Educational Guidance';
  description: string;
}

/**
 * Legacy unified interface maintained for backward compatibility
 */
export interface TutorRequest {
  id?: string;
  created_at?: string;
  user_type?: 'parent' | 'tutor' | 'guidance';
  parent_name: string;
  phone: string;
  email?: string;
  student_class: string;
  board?: string;
  subjects: string[];
  help_needed: string[];
  area: string;
  house_address?: string;
  landmark?: string;
  preferred_days: string[];
  preferred_time: string;
  frequency?: string;
  additional_message?: string;
  status?: 'new' | 'contacted' | 'matched' | 'closed';
  guidance_type?: string;
}

export type FormStep = 1 | 2 | 3 | 4 | 5;
