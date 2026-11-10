import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  AlertCircle, 
  MessageSquare, 
  Check, 
  ShieldCheck
} from 'lucide-react';
import { submitTutorRequest } from '../lib/supabase';
import { 
  getSpectreWhatsAppNumber, 
  generateGuidanceMessage, 
  createWhatsAppLink 
} from '../lib/whatsapp';
import { normalizeIndianPhone, isValidIndianPhone } from '../lib/validation';
import { DELHI_LOCALITIES } from '../data/delhiLocalities';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { GuidanceEnquiry } from '../types';

const GUIDANCE_TYPES: GuidanceEnquiry['guidance_type'][] = [
  'Academic Mentorship',
  'Class 10 Stream Selection',
  'Subject Selection',
  'Academic Planning',
  'Other Educational Guidance',
];

const CLASS_OPTIONS = [
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
];

const POPULAR_DELHI_AREAS = [
  'Preet Vihar',
  'Rohini',
  'Saket',
  'Dwarka',
  'Lajpat Nagar',
  'Janakpuri',
  'Model Town',
  'Mayur Vihar',
  'Vasant Kunj',
  'Greater Kailash',
];

export const RequestGuidance: React.FC = () => {
  useDocumentTitle(
    'Request Educational Guidance or Mentorship',
    'Schedule an advisory discussion on academic mentorship, study habits, or Class 10 to 11 stream selection in Delhi.'
  );

  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState<GuidanceEnquiry>(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get('type');
    let initialType: GuidanceEnquiry['guidance_type'] = 'Academic Mentorship';
    if (typeParam === 'stream' || typeParam === 'stream-selection') {
      initialType = 'Class 10 Stream Selection';
    } else if (typeParam === 'subject' || typeParam === 'subject-selection') {
      initialType = 'Subject Selection';
    }

    return {
      name: '',
      phone: '',
      student_class: 'Class 10',
      locality: '',
      guidance_type: initialType,
      description: '',
    };
  });

  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Locality autocomplete
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [localitySuggestions, setLocalitySuggestions] = useState<string[]>([]);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLocalityChange = (val: string) => {
    setFormData((prev) => ({ ...prev, locality: val }));
    if (val.trim().length > 0) {
      const filtered = DELHI_LOCALITIES.filter((loc) =>
        loc.toLowerCase().includes(val.trim().toLowerCase())
      ).slice(0, 6);
      setLocalitySuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setLocalitySuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectLocality = (loc: string) => {
    setFormData((prev) => ({ ...prev, locality: loc }));
    setShowSuggestions(false);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normalized = normalizeIndianPhone(e.target.value);
    setFormData((prev) => ({ ...prev, phone: normalized }));
    if (validationError && isValidIndianPhone(normalized)) {
      setValidationError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setValidationError(null);

    if (!formData.name.trim()) {
      setValidationError('Please enter your name as the parent or student.');
      return;
    }
    if (!isValidIndianPhone(formData.phone)) {
      setValidationError('Please enter a valid 10-digit Indian mobile number (e.g. 98123 45678).');
      return;
    }
    if (!formData.locality.trim()) {
      setValidationError('Please specify your locality in Delhi.');
      return;
    }
    if (!formData.description.trim() || formData.description.trim().length < 15) {
      setValidationError('Please provide a brief summary of your question or situation (at least 15 characters).');
      return;
    }
    if (!privacyAcknowledged) {
      setValidationError('Please confirm that you agree to Spectre Education’s Privacy Policy and Terms of Service.');
      return;
    }

    const whatsappNumber = getSpectreWhatsAppNumber();
    const formattedMessage = generateGuidanceMessage(formData);

    setIsSubmitting(true);

    const whatsappUrl = createWhatsAppLink(whatsappNumber, formattedMessage);

    // Direct synchronous launch to avoid browser popup blockers
    let opened = false;
    try {
      const win = window.open(whatsappUrl, '_blank');
      if (win && !win.closed) opened = true;
    } catch {
      opened = false;
    }

    // Optional legacy background record creation (non-blocking)
    submitTutorRequest({
      user_type: 'guidance',
      parent_name: formData.name,
      phone: formData.phone,
      student_class: formData.student_class,
      area: formData.locality,
      subjects: [formData.guidance_type],
      help_needed: [formData.guidance_type],
      preferred_days: ['Advisory Call'],
      preferred_time: 'Flexible',
      guidance_type: formData.guidance_type,
      additional_message: formData.description,
    });

    navigate('/request-success', {
      state: {
        enquiryType: 'guidance',
        whatsappUrl,
        message: formattedMessage,
        wasOpened: opened,
      },
    });
  };

  return (
    <div className="min-h-screen bg-warm-white py-10 sm:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-xs font-ui text-slate hover:text-navy transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Return to Home</span>
          </Link>
          <span className="text-[11px] font-ui font-semibold uppercase tracking-widest text-academic block mb-1">
            Enquiry-Led Advisory Service · Delhi
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl text-navy font-bold tracking-tight">
            Educational Guidance & Mentorship
          </h1>
          <p className="text-xs sm:text-sm text-slate-dark font-body mt-2 max-w-lg mx-auto leading-relaxed">
            Connect with our academic coordinator for objective, patient advice on study architecture, habits, or Class 10 to 11 stream exploration.
          </p>
        </div>

        {/* Guidance Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-border rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Validation Alert */}
          {validationError && (
            <div className="p-4 rounded-sm bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-ui flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Guidance Type Selection */}
          <div>
            <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2.5">
              Type of Advisory Requested <span className="text-rose-500">*</span>
            </label>
            <div className="space-y-2">
              {GUIDANCE_TYPES.map((type) => {
                const isSelected = formData.guidance_type === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, guidance_type: type }))}
                    className={`w-full p-3 rounded-sm border text-left text-xs font-ui flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-navy/5 border-navy text-navy font-semibold shadow-xs'
                        : 'bg-warm-white hover:bg-surface border-border text-navy'
                    }`}
                  >
                    <span>{type}</span>
                    {isSelected && <Check className="w-4 h-4 text-academic" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Student Class & Locality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2">
                Student’s Current Class <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.student_class}
                onChange={(e) => setFormData((prev) => ({ ...prev, student_class: e.target.value }))}
                className="w-full p-2.5 text-xs sm:text-sm font-ui rounded-sm border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-academic focus:border-academic"
              >
                {CLASS_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="relative" ref={autocompleteRef}>
              <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2">
                Delhi Locality <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-academic absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.locality}
                  onChange={(e) => handleLocalityChange(e.target.value)}
                  placeholder="e.g. Preet Vihar, Saket"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm font-ui rounded-sm border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-academic focus:border-academic"
                />
              </div>

              {showSuggestions && localitySuggestions.length > 0 && (
                <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-border rounded-sm shadow-md max-h-44 overflow-y-auto">
                  {localitySuggestions.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => handleSelectLocality(loc)}
                      className="w-full text-left px-3.5 py-2 text-xs font-ui text-navy hover:bg-surface transition-colors border-b border-border/50 last:border-b-0"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Select Common Areas */}
          <div>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_DELHI_AREAS.slice(0, 6).map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => handleSelectLocality(area)}
                  className={`text-[11px] font-ui px-2 py-0.5 rounded-sm border transition-colors ${
                    formData.locality === area
                      ? 'bg-navy text-white border-navy font-semibold'
                      : 'bg-warm-white text-slate-dark border-border hover:bg-surface'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Question / Description */}
          <div>
            <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2">
              What specific challenge or question would you like to explore? <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="e.g. My child is torn between Commerce with Maths and Science PCM; looking for an objective perspective on their academic strengths and workload..."
              className="w-full p-3 text-xs sm:text-sm font-ui rounded-sm border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-academic focus:border-academic leading-relaxed"
            />
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
            <div>
              <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2">
                Your Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Parent or Student name"
                className="w-full p-2.5 text-xs sm:text-sm font-ui rounded-sm border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-academic focus:border-academic"
              />
            </div>

            <div>
              <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2">
                Indian Mobile Number <span className="text-rose-500">*</span>
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-sm border border-r-0 border-border bg-surface text-slate-dark text-xs font-ui font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="98123 45678"
                  maxLength={10}
                  className="w-full p-2.5 text-xs sm:text-sm font-ui rounded-r-sm border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-academic focus:border-academic tracking-wider"
                />
              </div>
            </div>
          </div>

          {/* Scope Notice */}
          <div className="p-4 bg-surface border border-border rounded-sm text-xs text-slate-dark font-body leading-relaxed flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-academic shrink-0 mt-0.5" />
            <p>
              <strong className="text-navy font-ui font-semibold">Important Scope Notice:</strong> Spectre Education provides general curriculum guidance and academic mentorship. We do not provide clinical psychological evaluations or certified psychometric assessments.
            </p>
          </div>

          {/* Privacy & Terms Acknowledgement */}
          <div className="p-3.5 bg-white border border-border rounded-sm">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={privacyAcknowledged}
                onChange={(e) => {
                  setPrivacyAcknowledged(e.target.checked);
                  if (validationError) setValidationError(null);
                }}
                className="mt-1 h-4 w-4 rounded border-border text-academic focus:ring-academic"
              />
              <span className="text-xs text-navy font-body leading-relaxed">
                I confirm that the details provided are accurate and I agree to Spectre Education’s{' '}
                <Link to="/privacy-policy" target="_blank" className="text-academic font-semibold underline hover:text-navy">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link to="/terms" target="_blank" className="text-academic font-semibold underline hover:text-navy">
                  Terms of Service
                </Link>.
              </span>
            </label>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/request-tutor"
              className="text-xs font-ui text-slate-dark hover:text-navy"
            >
              Looking for subject home tutoring? Go to Tutoring Request →
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-navy text-white text-xs sm:text-sm font-ui font-semibold hover:bg-navy-light transition-colors shadow-xs disabled:opacity-60"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>{isSubmitting ? 'Formatting...' : 'Prepare Guidance Enquiry'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
