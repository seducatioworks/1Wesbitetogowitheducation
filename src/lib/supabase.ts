/**
 * ==============================================================================
 * Spectre Education — Intake Persistence & Legacy Client
 * ==============================================================================
 * NON-NEGOTIABLE ARCHITECTURE:
 * Spectre Education launches with a WhatsApp-first, human-operated workflow.
 * Enquiries are formatted directly into structured WhatsApp Click-to-Chat URLs.
 * 
 * In accordance with privacy & data minimization standards:
 * - NO personal identifiable information (PII) is stored in localStorage or sessionStorage.
 * - Enquiries do not depend on an external database write before proceeding to WhatsApp.
 * - Supabase is optional legacy infrastructure and is not required for production launch.
 * ==============================================================================
 */

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

// Dormant client: only initialized if genuine valid credentials are provided
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface SubmitResult {
  success: boolean;
  enquiryId: string;
  persistedRemotely: boolean;
  error?: string;
}

/**
 * Prepares the enquiry reference for the WhatsApp handoff.
 * Operates purely in-memory with zero local/session storage PII persistence.
 */
export async function submitTutorRequest(
  requestData: Omit<TutorRequest, 'id' | 'created_at' | 'status'>
): Promise<SubmitResult> {
  const enquiryId = `req-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

  // Optional non-blocking background archive IF Supabase is configured
  if (isSupabaseConfigured && supabase) {
    try {
      const record: TutorRequest = {
        ...requestData,
        id: enquiryId,
        created_at: new Date().toISOString(),
        status: 'new',
      };
      
      // Fire-and-forget or non-blocking insert; never block the WhatsApp handoff
      Promise.resolve(
        supabase
          .from('tutor_requests')
          .insert([record])
      ).catch(() => {});
    } catch {
      // Non-fatal: WhatsApp is the primary source of truth
    }
  }

  return {
    success: true,
    enquiryId,
    persistedRemotely: isSupabaseConfigured,
  };
}
