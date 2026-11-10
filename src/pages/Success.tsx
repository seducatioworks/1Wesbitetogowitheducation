import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  CheckCircle, 
  Home, 
  MessageSquare, 
  Copy, 
  Check, 
  ExternalLink
} from 'lucide-react';
import { Button } from '../components/Button';
import { 
  getSpectreWhatsAppNumber, 
  createWhatsAppLink 
} from '../lib/whatsapp';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const Success: React.FC = () => {
  useDocumentTitle('Enquiry Prepared | Spectre Education');

  const location = useLocation();
  const [copied, setCopied] = useState(false);

  // Retrieve state passed from the intake flows
  const state = (location.state as {
    enquiryType?: 'parent' | 'educator' | 'guidance';
    whatsappUrl?: string;
    message?: string;
    wasOpened?: boolean;
    persistedRemotely?: boolean;
    summary?: Record<string, string>;
  }) || {};

  const enquiryType = state.enquiryType || 'parent';
  const wasOpened = Boolean(state.wasOpened);
  const whatsappNumber = getSpectreWhatsAppNumber();

  // Fallback message if accessed directly
  const message = state.message || [
    'NEW ENQUIRY — SPECTRE EDUCATION',
    '───────────────────────────────────────',
    'Hello Spectre Education,',
    'I would like to enquire about your educational services in Delhi.',
    'Please connect with me to discuss suitable options.',
    '───────────────────────────────────────',
  ].join('\n');

  const whatsappUrl = state.whatsappUrl || createWhatsAppLink(whatsappNumber, message);

  const handleCopyText = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getHeading = () => {
    switch (enquiryType) {
      case 'educator':
        return 'Your Application Details Are Ready';
      case 'guidance':
        return 'Your Advisory Details Are Ready';
      default:
        return 'Your Enquiry Details Are Ready';
    }
  };

  return (
    <div className="min-h-screen bg-warm-white py-10 sm:py-16 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white rounded-sm border border-border p-6 sm:p-8 text-center shadow-xs">
          
          {/* Status Check Icon */}
          <div className="w-12 h-12 rounded-sm bg-surface-blue text-academic border border-academic/20 flex items-center justify-center mx-auto mb-5 shadow-xs">
            <CheckCircle className="w-6 h-6" />
          </div>

          {/* Heading */}
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-navy tracking-tight mb-2">
            {getHeading()}
          </h1>

          <p className="text-xs sm:text-sm text-slate-dark mb-6">
            Continue to WhatsApp to transmit your request directly to our coordinator.
          </p>

          {/* Primary Transmission Notice */}
          {wasOpened ? (
            <div className="p-3.5 mb-6 rounded-sm bg-emerald-50 border border-emerald-200 text-left text-xs sm:text-sm text-emerald-950 font-ui leading-relaxed">
              <strong className="block font-semibold mb-1 text-emerald-900">
                WhatsApp conversation launched:
              </strong>
              Your pre-filled message has been loaded in WhatsApp. Please review the text and press <strong>Send</strong> to dispatch your enquiry to Spectre Education.
            </div>
          ) : (
            <div className="p-3.5 mb-6 rounded-sm bg-amber-50 border border-amber-200 text-left text-xs sm:text-sm text-amber-950 font-ui leading-relaxed">
              <strong className="block font-semibold mb-1 text-amber-900">
                Action Required to Send:
              </strong>
              Your enquiry has been prepared below. It has <strong>not yet been sent</strong>. Tap <strong>Open in WhatsApp</strong> or copy the text to transmit it directly to our coordinator.
            </div>
          )}

          {/* WhatsApp Direct Action Box */}
          <div className="mb-6 p-5 rounded-sm bg-emerald-50/60 border border-emerald-200 text-left">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-sm bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex-grow">
                <h2 className="font-ui font-semibold text-sm sm:text-base text-emerald-950">
                  Transmit via WhatsApp
                </h2>
                <p className="text-xs text-emerald-900 mt-1 leading-relaxed font-body">
                  Coordinate directly with Spectre Education’s coordinator at <strong>+91 92206 38540</strong>.
                </p>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-ui font-semibold transition-colors shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open in WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-sm bg-white border border-emerald-300 text-emerald-900 text-xs font-ui font-medium hover:bg-emerald-50 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied Message!' : 'Copy Message Text'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Message Preview Box */}
          <div className="border border-border rounded-sm overflow-hidden text-left mb-6 bg-warm-white">
            <div className="bg-surface px-4 py-2 border-b border-border flex items-center justify-between text-xs font-ui text-slate-dark">
              <span className="font-semibold text-navy">
                Formatted Message Preview
              </span>
              <button
                type="button"
                onClick={handleCopyText}
                className="text-[11px] font-semibold text-academic hover:underline flex items-center gap-1"
              >
                {copied ? 'Copied' : 'Copy Text'}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-navy/90 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto bg-white">
              {message}
            </pre>
          </div>

          {/* Operational Workflow Steps */}
          <div className="border-t border-border pt-5 mb-6 text-left">
            <h2 className="font-ui font-bold text-xs uppercase tracking-widest text-navy mb-3">
              How the Introduction Workflow Operates
            </h2>
            <div className="space-y-2.5 text-xs text-slate-dark font-body">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-sm bg-navy text-white flex items-center justify-center text-[10px] font-bold font-ui shrink-0 mt-0.5">
                  1
                </span>
                <p>
                  Press <strong>Send</strong> in your WhatsApp chat so our coordinator receives your formatted details.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-sm bg-navy text-white flex items-center justify-center text-[10px] font-bold font-ui shrink-0 mt-0.5">
                  2
                </span>
                <p>
                  Our academic coordinator personally reviews your child’s grade, subject requirements, and locality.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-sm bg-navy text-white flex items-center justify-center text-[10px] font-bold font-ui shrink-0 mt-0.5">
                  3
                </span>
                <p>
                  We coordinate with suitable educators in our vetted network and propose an introductory in-home session.
                </p>
              </div>
            </div>
          </div>

          {/* Clear Route Back */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button to="/" variant="secondary" size="md" className="w-full sm:w-auto gap-2">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
            <Button to="/parent-resources" variant="outline" size="md" className="w-full sm:w-auto">
              <span>Explore Parent Resources</span>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};
