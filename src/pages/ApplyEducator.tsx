import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Check, 
  MapPin, 
  AlertCircle, 
  MessageSquare, 
  ShieldCheck 
} from 'lucide-react';
import { submitTutorRequest } from '../lib/supabase';
import { 
  getSpectreWhatsAppNumber, 
  generateEducatorApplicationMessage, 
  createWhatsAppLink 
} from '../lib/whatsapp';
import { normalizeIndianPhone, isValidIndianPhone } from '../lib/validation';
import { DELHI_LOCALITIES } from '../data/delhiLocalities';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { EducatorApplication } from '../types';

const QUALIFICATION_OPTIONS = [
  "Master's Degree (M.Sc / M.A. / M.Tech)",
  "Bachelor's in Engineering / Tech (B.Tech / B.E.)",
  "Bachelor's Degree (B.Sc / B.A. / B.Com)",
  "B.Ed / Specialized Teaching Certification",
  "Doctorate / PhD",
  "Other Relevant Academic Degree",
];

const SUBJECT_OPTIONS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English Language & Literature',
];

const CLASS_TIERS = [
  'Classes 6–8 (Middle School)',
  'Classes 9–10 (Secondary Board)',
  'Classes 11–12 (Senior Secondary)',
];

const EXPERIENCE_OPTIONS = [
  '1–3 years of private/school teaching',
  '3–5 years of dedicated tutoring',
  '5–10 years of academic experience',
  '10+ years of senior teaching experience',
];

const AVAILABILITY_OPTIONS = [
  'Weekday Evenings (5 PM – 9 PM)',
  'Weekend Mornings & Afternoons',
  'Flexible (Weekdays & Weekends)',
  'Full-time Private Educator',
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

export const ApplyEducator: React.FC = () => {
  useDocumentTitle(
    'Apply as a Private Educator',
    'Join Spectre Education as an in-home private educator in Delhi. Thoughtfully matched students, professional academic standards.'
  );

  const navigate = useNavigate();

  const [formData, setFormData] = useState<EducatorApplication>({
    name: '',
    phone: '',
    email: '',
    highest_qualification: "Master's Degree (M.Sc / M.A. / M.Tech)",
    subjects: ['Mathematics'],
    classes_taught: ['Classes 9–10 (Secondary Board)'],
    teaching_experience: '3–5 years of dedicated tutoring',
    preferred_localities: ['Preet Vihar'],
    availability: 'Weekday Evenings (5 PM – 9 PM)',
    teaching_background: '',
  });

  const [localityInput, setLocalityInput] = useState('');
  const [localitySuggestions, setLocalitySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleLocalityInputChange = (val: string) => {
    setLocalityInput(val);
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

  const addLocality = (loc: string) => {
    if (!formData.preferred_localities.includes(loc)) {
      setFormData((prev) => ({
        ...prev,
        preferred_localities: [...prev.preferred_localities, loc],
      }));
    }
    setLocalityInput('');
    setShowSuggestions(false);
  };

  const removeLocality = (loc: string) => {
    setFormData((prev) => ({
      ...prev,
      preferred_localities: prev.preferred_localities.filter((item) => item !== loc),
    }));
  };

  const toggleSubject = (sub: string) => {
    setFormData((prev) => {
      const exists = prev.subjects.includes(sub);
      return {
        ...prev,
        subjects: exists ? prev.subjects.filter((s) => s !== sub) : [...prev.subjects, sub],
      };
    });
  };

  const toggleClassTier = (tier: string) => {
    setFormData((prev) => {
      const exists = prev.classes_taught.includes(tier);
      return {
        ...prev,
        classes_taught: exists ? prev.classes_taught.filter((t) => t !== tier) : [...prev.classes_taught, tier],
      };
    });
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

    // Validation
    if (!formData.name.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    if (!isValidIndianPhone(formData.phone)) {
      setValidationError('Please provide a valid 10-digit Indian mobile number (e.g., 98123 45678).');
      return;
    }
    if (formData.subjects.length === 0) {
      setValidationError('Please select at least one subject you can teach.');
      return;
    }
    if (formData.classes_taught.length === 0) {
      setValidationError('Please select at least one class stage you can teach.');
      return;
    }
    if (formData.preferred_localities.length === 0) {
      setValidationError('Please specify at least one preferred teaching locality in Delhi.');
      return;
    }
    if (!formData.teaching_background.trim() || formData.teaching_background.trim().length < 20) {
      setValidationError('Please provide a brief background (at least 20 characters) explaining your teaching experience and pedagogy.');
      return;
    }
    if (!privacyAcknowledged) {
      setValidationError('Please confirm your application details and accept the Privacy Policy and Terms of Service.');
      return;
    }

    const whatsappNumber = getSpectreWhatsAppNumber();
    const formattedMessage = generateEducatorApplicationMessage(formData);

    setIsSubmitting(true);

    const whatsappUrl = createWhatsAppLink(whatsappNumber, formattedMessage);

    // Synchronous window open directly in user gesture
    let opened = false;
    try {
      const win = window.open(whatsappUrl, '_blank');
      if (win && !win.closed) opened = true;
    } catch {
      opened = false;
    }

    // Optional legacy background record creation (non-blocking)
    submitTutorRequest({
      user_type: 'tutor',
      parent_name: formData.name,
      phone: formData.phone,
      email: formData.email,
      student_class: formData.classes_taught.join(', '),
      subjects: formData.subjects,
      help_needed: ['Educator Application'],
      area: formData.preferred_localities.join(', '),
      preferred_days: [formData.availability],
      preferred_time: 'Evening',
      additional_message: `Qualification: ${formData.highest_qualification} | Experience: ${formData.teaching_experience} | Details: ${formData.teaching_background}`,
    });

    navigate('/request-success', {
      state: {
        enquiryType: 'educator',
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
            Private Educator Network · Delhi
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl text-navy font-bold tracking-tight">
            Apply as a Private Educator
          </h1>
          <p className="text-xs sm:text-sm text-slate-dark font-body mt-2 max-w-lg mx-auto leading-relaxed">
            We partner with patient, academically rigorous educators who value conceptual clarity and intellectual mentorship.
          </p>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-border rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Validation Alert */}
          {validationError && (
            <div className="p-4 rounded-sm bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-ui flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Section: Personal & Contact */}
          <div className="space-y-4">
            <h2 className="font-heading text-lg sm:text-xl font-bold text-navy border-b border-border pb-2">
              1. Professional Information
            </h2>

            <div>
              <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Rahul Verma"
                className="w-full p-2.5 text-xs sm:text-sm font-ui rounded-sm border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-academic focus:border-academic"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div>
                <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="e.g. rahul.verma@example.com"
                  className="w-full p-2.5 text-xs sm:text-sm font-ui rounded-sm border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-academic focus:border-academic"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2">
                Highest Academic Qualification <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.highest_qualification}
                onChange={(e) => setFormData((prev) => ({ ...prev, highest_qualification: e.target.value }))}
                className="w-full p-2.5 text-xs sm:text-sm font-ui rounded-sm border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-academic focus:border-academic"
              >
                {QUALIFICATION_OPTIONS.map((q) => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Section: Teaching Scope */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h2 className="font-heading text-lg sm:text-xl font-bold text-navy border-b border-border pb-2">
              2. Teaching Capabilities
            </h2>

            <div>
              <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2.5">
                Subjects You Can Teach <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SUBJECT_OPTIONS.map((sub) => {
                  const isSelected = formData.subjects.includes(sub);
                  return (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => toggleSubject(sub)}
                      className={`p-2.5 rounded-sm border text-left text-xs font-ui flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-navy text-white border-navy font-semibold shadow-xs'
                          : 'bg-warm-white hover:bg-surface border-border text-navy'
                      }`}
                    >
                      <span>{sub}</span>
                      {isSelected && <Check className="w-4 h-4 text-academic-light" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2.5">
                Classes / Grade Stages <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {CLASS_TIERS.map((tier) => {
                  const isSelected = formData.classes_taught.includes(tier);
                  return (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => toggleClassTier(tier)}
                      className={`p-2.5 rounded-sm border text-left text-xs font-ui transition-all ${
                        isSelected
                          ? 'bg-navy text-white border-navy font-semibold'
                          : 'bg-warm-white hover:bg-surface border-border text-navy'
                      }`}
                    >
                      {tier}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2">
                Teaching Experience <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.teaching_experience}
                onChange={(e) => setFormData((prev) => ({ ...prev, teaching_experience: e.target.value }))}
                className="w-full p-2.5 text-xs sm:text-sm font-ui rounded-sm border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-academic focus:border-academic"
              >
                {EXPERIENCE_OPTIONS.map((exp) => (
                  <option key={exp} value={exp}>{exp}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Section: Localities & Availability */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h2 className="font-heading text-lg sm:text-xl font-bold text-navy border-b border-border pb-2">
              3. Delhi Localities & Availability
            </h2>

            {/* Selected Localities Chips */}
            <div>
              <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2">
                Preferred Teaching Localities in Delhi <span className="text-rose-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-2.5">
                {formData.preferred_localities.map((loc) => (
                  <span
                    key={loc}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-navy text-white text-xs font-ui"
                  >
                    <span>{loc}</span>
                    <button
                      type="button"
                      onClick={() => removeLocality(loc)}
                      className="text-academic-light hover:text-white"
                      aria-label={`Remove ${loc}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Autocomplete Input */}
              <div className="relative" ref={autocompleteRef}>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-academic absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={localityInput}
                    onChange={(e) => handleLocalityInputChange(e.target.value)}
                    placeholder="Search and add a locality (e.g. Rohini, Saket, Preet Vihar...)"
                    className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm font-ui rounded-sm border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-academic focus:border-academic"
                  />
                </div>

                {showSuggestions && localitySuggestions.length > 0 && (
                  <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-border rounded-sm shadow-md max-h-48 overflow-y-auto">
                    {localitySuggestions.map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => addLocality(sug)}
                        className="w-full text-left px-3.5 py-2 text-xs font-ui text-navy hover:bg-surface transition-colors border-b border-border/50 last:border-b-0"
                      >
                        + Add {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Popular Area Quick Add */}
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {POPULAR_DELHI_AREAS.filter((a) => !formData.preferred_localities.includes(a)).slice(0, 6).map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => addLocality(area)}
                    className="text-[11px] font-ui px-2 py-0.5 rounded-sm bg-warm-white border border-border text-slate-dark hover:bg-surface"
                  >
                    + {area}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2">
                Weekly Availability
              </label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData((prev) => ({ ...prev, availability: e.target.value }))}
                className="w-full p-2.5 text-xs sm:text-sm font-ui rounded-sm border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-academic focus:border-academic"
              >
                {AVAILABILITY_OPTIONS.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Section: Pedagogical Background */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h2 className="font-heading text-lg sm:text-xl font-bold text-navy border-b border-border pb-2">
              4. Teaching Background & Pedagogy
            </h2>

            <div>
              <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2">
                Summary of Teaching Experience & Approach <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                value={formData.teaching_background}
                onChange={(e) => setFormData((prev) => ({ ...prev, teaching_background: e.target.value }))}
                placeholder="Share your teaching style, past student outcomes, how you explain difficult foundational concepts, and why you are interested in joining Spectre Education..."
                className="w-full p-3 text-xs sm:text-sm font-ui rounded-sm border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-academic focus:border-academic leading-relaxed"
              />
              <span className="text-[11px] text-slate-dark mt-1 block font-body">
                Fewer than 12% of applicants are invited for representation. Detailed, thoughtful applications receive priority.
              </span>
            </div>

            {/* Institutional Review Notice */}
            <div className="p-4 bg-surface border border-border rounded-sm text-xs text-slate-dark font-body leading-relaxed flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-academic shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy font-ui font-semibold block mb-0.5">
                  Spectre Education Application Standards:
                </strong>
                Submitting an application does not automatically guarantee student assignment. Every applicant undergoes individual document verification, a pedagogical interview, and a background evaluation.
              </div>
            </div>
          </div>

          {/* Educator Privacy & Terms Acknowledgement */}
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
                I confirm that the credentials and experience provided are accurate and I agree to Spectre Education’s{' '}
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
              Looking to hire an educator instead? Switch to Parent Enquiry
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-navy text-white text-xs sm:text-sm font-ui font-semibold hover:bg-navy-light transition-colors shadow-xs disabled:opacity-60"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>{isSubmitting ? 'Formatting...' : 'Apply as a Private Educator'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
