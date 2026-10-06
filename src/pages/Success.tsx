import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle, Home, MessageSquare, Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '../components/Button';
import { 
  getSpectreWhatsAppNumber, 
  generateWhatsAppMessage, 
  createWhatsAppLink 
} from '../lib/whatsapp';
import type { TutorRequest } from '../types';

export const Success: React.FC = () => {
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  // Retrieve submitted request or construct fallback
  const rawRequest = (location.state as any)?.request;
  const passedMessage = (location.state as any)?.message;
  const passedUrl = (location.state as any)?.whatsappUrl;

  const request: TutorRequest = rawRequest || {
    parent_name: 'Parent',
    phone: '',
    student_class: 'Class 10',
    subjects: ['Mathematics'],
    help_needed: ['Concept clarity'],
    area: 'Delhi',
    preferred_days: ['Monday', 'Wednesday', 'Friday'],
    preferred_time: 'Evening',
    user_type: 'parent',
  };

  const isTutor = request.user_type === 'tutor';
  const whatsappNumber = getSpectreWhatsAppNumber();
  const message = passedMessage || generateWhatsAppMessage(request);
  const whatsappUrl = passedUrl || createWhatsAppLink(whatsappNumber, message);

  const handleCopyText = () => {
    navigator.clipboard.writeText(message);
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
            {isTutor ? "Your Tutor Profile is Ready" : "Your Request is Ready"}
          </h1>

          {/* Supporting text */}
          <p className="mt-2 text-sm sm:text-base text-ink-muted leading-relaxed">
            {isTutor
              ? 'Your application details have been formatted. Review the message below and send it on WhatsApp to complete your application.'
              : 'Your requirements have been formatted. Review the message below and send it on WhatsApp to connect with our coordinator.'}
          </p>

          {/* WhatsApp Click-to-Chat Card */}
          <div className="mt-6 mb-6 p-5 rounded-lg bg-emerald-50 border border-emerald-200 text-left">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <h4 className="font-heading font-bold text-sm sm:text-base text-emerald-950">
                    Send via WhatsApp
                  </h4>
                  <span className="text-[10px] font-semibold bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded">
                    wa.me
                  </span>
                </div>
                <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                  We've prepared your message. Tap below to open WhatsApp, review your text, and press <strong>Send</strong>.
                </p>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold transition-all shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open in WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-md bg-white border border-emerald-300 text-emerald-900 text-xs font-semibold hover:bg-emerald-50 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied Message!' : 'Copy Message'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pre-filled Message Review Card */}
          <div className="border border-border-subtle rounded-md overflow-hidden text-left mb-6 bg-slate-50">
            <div className="bg-slate-100 px-4 py-2 border-b border-border-subtle flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">
                Pre-filled Message Preview
              </span>
              <button
                type="button"
                onClick={handleCopyText}
                className="text-[11px] font-semibold text-trust hover:underline flex items-center gap-1"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto bg-[#F8FAFC]">
              {message}
            </pre>
          </div>

          {/* What happens next */}
          <div className="border-t border-border-subtle pt-5 mb-6 text-left">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-navy mb-3">
              How It Works
            </h4>
            <div className="space-y-2.5 text-xs text-ink-muted">
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-navy shrink-0 mt-0.5">
                  1
                </span>
                <p>
                  WhatsApp opens with your message already typed out.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-navy shrink-0 mt-0.5">
                  2
                </span>
                <p>
                  You can review or make any changes to the text and press Send.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-navy shrink-0 mt-0.5">
                  3
                </span>
                <p>
                  Our Delhi coordinator replies directly to your WhatsApp chat.
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
              <span>Start New Request</span>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};
