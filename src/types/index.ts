export interface TutorRequest {
  id?: string;
  created_at?: string;
  user_type?: 'parent' | 'tutor';
  parent_name: string; // Used for Parent Name or Tutor Name
  phone: string;
  email?: string;
  student_class: string; // Student Class or Classes taught
  board?: string;
  subjects: string[];
  help_needed: string[];
  area: string;
  landmark?: string;
  preferred_days: string[];
  preferred_time: string;
  frequency?: string;
  additional_message?: string;
  status?: 'new' | 'contacted' | 'matched' | 'closed';
}

export type FormStep = 1 | 2 | 3 | 4 | 5;
