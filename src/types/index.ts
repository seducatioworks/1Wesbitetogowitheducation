export interface TutorRequest {
  id?: string;
  created_at?: string;
  parent_name: string;
  phone: string;
  email?: string;
  student_class: string;
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
