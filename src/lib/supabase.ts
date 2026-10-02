import { createClient } from '@supabase/supabase-js';
import type { TutorRequest } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  supabaseUrl !== 'https://your-project.supabase.co'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local fallback store key
const LOCAL_STORAGE_KEY = 'spectre_tutor_requests';

// Initial sample requests for demonstration in admin
const SAMPLE_REQUESTS: TutorRequest[] = [
  {
    id: 'req-001',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    parent_name: 'Rajesh Sharma',
    phone: '9811234567',
    email: 'rajesh.sharma@example.com',
    student_class: 'Class 10',
    board: 'CBSE',
    subjects: ['Mathematics', 'Science'],
    help_needed: ['Concept clarity', 'Exam preparation'],
    area: 'Preet Vihar',
    landmark: 'Near Metro Station',
    preferred_days: ['Monday', 'Wednesday', 'Friday'],
    preferred_time: 'Evening',
    frequency: '3 days/week',
    additional_message: 'Needs special help with Quadratic Equations and Light refraction.',
    status: 'new',
  },
  {
    id: 'req-002',
    created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
    parent_name: 'Sunita Aggarwal',
    phone: '9873456789',
    email: 'sunita.aggarwal@example.com',
    student_class: 'Class 12',
    board: 'CBSE',
    subjects: ['Mathematics'],
    help_needed: ['Exam preparation', 'Confidence building'],
    area: 'Rohini Sector 9',
    landmark: 'Near Bal Bharati School',
    preferred_days: ['Tuesday', 'Thursday', 'Saturday'],
    preferred_time: 'Evening',
    frequency: '3 days/week',
    additional_message: 'Board exam preparation for Calculus & Probability.',
    status: 'contacted',
  },
  {
    id: 'req-003',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    parent_name: 'Anand Verma',
    phone: '9910098765',
    email: 'anand.verma@example.com',
    student_class: 'Class 8',
    board: 'ICSE',
    subjects: ['English', 'Science'],
    help_needed: ['Catching up', 'Concept clarity'],
    area: 'Saket',
    landmark: 'Near Max Hospital',
    preferred_days: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    preferred_time: 'Afternoon',
    frequency: '4 days/week',
    additional_message: 'Needs patient guidance for English grammar and Physics foundations.',
    status: 'matched',
  },
];

const getLocalRequests = (): TutorRequest[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(SAMPLE_REQUESTS));
      return SAMPLE_REQUESTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Error reading from localStorage:', err);
    return SAMPLE_REQUESTS;
  }
};

const saveLocalRequests = (requests: TutorRequest[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(requests));
  } catch (err) {
    console.warn('Error saving to localStorage:', err);
  }
};

/**
 * Submits a new tutor request. Uses Supabase if configured, otherwise falls back to local storage.
 */
export async function submitTutorRequest(requestData: Omit<TutorRequest, 'id' | 'created_at' | 'status'>): Promise<{ success: boolean; data?: TutorRequest; error?: string }> {
  const newRequest: TutorRequest = {
    ...requestData,
    id: `req-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
    created_at: new Date().toISOString(),
    status: 'new',
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('tutor_requests')
        .insert([newRequest])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        // Fallback to local storage on network/permission error to ensure no user request is ever lost
        const localList = getLocalRequests();
        saveLocalRequests([newRequest, ...localList]);
        return { success: true, data: newRequest };
      }

      return { success: true, data: data as TutorRequest };
    } catch (err) {
      console.error('Network error during Supabase insert:', err);
      const localList = getLocalRequests();
      saveLocalRequests([newRequest, ...localList]);
      return { success: true, data: newRequest };
    }
  }

  // Local storage persistence
  const localList = getLocalRequests();
  const updated = [newRequest, ...localList];
  saveLocalRequests(updated);

  return { success: true, data: newRequest };
}

/**
 * Fetches all tutor requests (for operator / admin view)
 */
export async function getTutorRequests(): Promise<{ data: TutorRequest[]; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('tutor_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch error, using local fallback:', error.message);
        return { data: getLocalRequests() };
      }

      return { data: (data as TutorRequest[]) || [] };
    } catch (err) {
      console.warn('Network error fetching from Supabase, using local fallback:', err);
      return { data: getLocalRequests() };
    }
  }

  return { data: getLocalRequests() };
}

/**
 * Updates the status of a request
 */
export async function updateRequestStatus(
  id: string,
  status: 'new' | 'contacted' | 'matched' | 'closed'
): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('tutor_requests')
        .update({ status })
        .eq('id', id);

      if (error) {
        console.warn('Supabase update status failed, updating local:', error.message);
      }
    } catch (err) {
      console.warn('Network error updating status, updating local:', err);
    }
  }

  const localList = getLocalRequests();
  const updated = localList.map(req => (req.id === id ? { ...req, status } : req));
  saveLocalRequests(updated);

  return { success: true };
}
