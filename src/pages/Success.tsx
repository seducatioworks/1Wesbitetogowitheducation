import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle, Home, MessageSquare, Copy, Check, Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { 
  formatRequestAsWhatsAppTextForm, 
  getDirectWhatsAppClickUrl 
} from '../lib/notifications';
import type { TutorRequest } from '../types';

export const Success: React.FC = () => {
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  // Retrieve submitted request or construct fallback
  const rawRequest = (location.state as any)?.request;
  const requestDetails = (location.state as any)?.requestDetails;

  const request: TutorRequest = rawRequest || {
    parent_name: requestDetails?.parentName || 'Parent',
    phone: requestDetails?.phone || '',
    student_class: requestDetails?.studentClass || 'Class 10',
    subjects: requestDetails?.subjects || ['Mathematics'],
    help_needed: ['Concept clarity'],
    area: requestDetails?.area || 'Delhi',
    preferred_days: ['Monday', 'Wednesday', 'Friday'],
    preferred_time: 'Evening',
    user_type: 'parent',
  };

  const isTutor = request.user_type === 'tutor';
  const textForm = formatRequestAsWhatsAppTextForm(request);
  const directWhatsAppUrl = getDirectWhatsAppClickUrl(request);

  const handleCopyText = () => {
    navigator.clipboard.writeText(textForm);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-parchment py-10 sm:py-16 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white rounded-lg border border-border-subtle p-6 sm:p-8 text-center shadow-sm">
          
          {/* Success Check Icon */}
          <div className="w-14 h-14 rounded-full bg-trust-light text-trust flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8" />
          </div>

          {/* Heading */}
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy tracking-tight">
            {isTutor ? "We've received your tutor profile." : "We've received your request."}
          </h1>

          {/* Supporting text */}
          <p className="mt-2 text-sm sm:text-base text-ink-muted leading-relaxed">
            {isTutor
              ? 'Thank you for applying to the Spectre Network. Our team will review your teaching preferences and connect with you.'
              : 'Thank you. Our team will review your requirements and contact you regarding the next steps.'}
          </p>

          {/* Instant WhatsApp CTA Button */}
          <div className="mt-6 mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-left">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <h4 className="font-heading font-bold text-sm text-emerald-950">
                    Connect Instantly on WhatsApp
                  </h4>
                  <span className="text-[10px] font-semibold bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded">
                    Instant
                  </span>
                </div>
                <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
                  Tap below to send this request text directly to our Delhi coordinator's WhatsApp chat.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open in WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-white border border-emerald-300 text-emerald-900 text-xs font-semibold hover:bg-emerald-50 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Form Text'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Form Text in Chat Preview */}
          <div className="border border-border-subtle rounded-md overflow-hidden text-left mb-6 bg-slate-50">
            <div className="bg-slate-100 px-4 py-2 border-b border-border-subtle flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-trust" />
                <span>Message Text (Delivered to Chat)</span>
              </span>
              <button
                type="button"
                onClick={handleCopyText}
                className="text-[11px] font-semibold text-trust hover:underline flex items-center gap-1"
              >
                {copied ? 'Copied!' : 'Copy text'}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto bg-[#F8FAFC]">
              {textForm}
            </pre>
          </div>

          {/* What happens next */}
          <div className="border-t border-border-subtle pt-5 mb-6 text-left">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-navy mb-3">
              What Happens Next
            </h4>
            <div className="space-y-2.5 text-xs text-ink-muted">
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-navy shrink-0 mt-0.5">
                  1
                </span>
                <p>
                  A Spectre coordinator receives your request text and reviews locality in Delhi.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-navy shrink-0 mt-0.5">
                  2
                </span>
                <p>
                  We reach out to you via WhatsApp or phone call to confirm timings and tutor matching.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-navy shrink-0 mt-0.5">
                  3
                </span>
                <p>
                  The first 1-on-1 home session is scheduled at your convenience.
                </p>
              </div>
            </div>
          </div>

          {/* Back Home Action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button to="/" variant="secondary" size="md" className="w-full sm:w-auto gap-2">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
            <Button to="/request-tutor" variant="outline" size="md" className="w-full sm:w-auto">
              <span>Submit Another Request</span>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};
