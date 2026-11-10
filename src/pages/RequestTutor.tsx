import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  MapPin, 
  AlertCircle,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { Button } from '../components/Button';
import { submitTutorRequest } from '../lib/supabase';
import { 
  getSpectreWhatsAppNumber, 
  generateParentTutoringMessage, 
  createWhatsAppLink 
} from '../lib/whatsapp';
import { normalizeIndianPhone, isValidIndianPhone } from '../lib/validation';
import { DELHI_LOCALITIES } from '../data/delhiLocalities';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { ParentTutoringEnquiry, FormStep } from '../types';

const CLASS_OPTIONS = [
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
];

const BOARD_OPTIONS = [
  'CBSE',
  'ICSE',
  'State Board',
  'Other',
];

const LANGUAGE_OPTIONS = [
  'English',
  'Bilingual (English + Hindi)',
  'Hindi',
];

const SUBJECT_OPTIONS = [
  'Mathematics',
  'Science',
  'English',
];

const SCIENCE_BRANCHES = [
  'Physics',
  'Chemistry',
  'Biology',
];

const REQUIREMENT_OPTIONS = [
  'Concept clarity',
  'Examination preparation',
  'Confidence building',
  'Catching up with the syllabus',
  'Regular academic support',
];

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const TIME_OPTIONS = [
  'Evening',
  'Afternoon',
  'Morning',
  'Flexible',
];

const SESSIONS_PER_WEEK_OPTIONS = [
  '2 days/week',
  '3 days/week',
  '4 days/week',
  '5 days/week',
  'Flexible',
];

const DURATION_OPTIONS = [
  '90 minutes (Recommended)',
  '60 minutes',
  '2 hours',
  'Flexible',
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
];

export const RequestTutor: React.FC = () => {
  useDocumentTitle(
    'Request a Private Educator',
    'Submit your child’s academic requirements to be thoughtfully paired with a vetted in-home educator in Delhi.'
  );

  const navigate = useNavigate();
  const location = useLocation();

  // If query string specifies tutor, route to the dedicated educator flow
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('type') === 'tutor' || params.get('role') === 'tutor') {
      navigate('/apply-educator', { replace: true });
    }
  }, [location.search, navigate]);

  const [currentStep, setCurrentStep] = useState<FormStep>(1);

  const [formData, setFormData] = useState<ParentTutoringEnquiry>(() => {
    const navState = location.state as { preselectedHelp?: string; preselectedSubject?: string } | null;
    const initialRequirement = navState?.preselectedHelp
      ? (REQUIREMENT_OPTIONS.find((opt) => opt.toLowerCase() === navState.preselectedHelp?.toLowerCase()) || navState.preselectedHelp)
      : 'Concept clarity';
    const initialSubjects = navState?.preselectedSubject ? [navState.preselectedSubject] : [];

    return {
      student_class: '',
      board: 'CBSE',
      language_instruction: 'English',
      subjects: initialSubjects,
      science_branches: [],
      academic_requirement: initialRequirement,
      additional_context: '',
      locality: '',
      address: '',
      landmark: '',
      preferred_days: ['Monday', 'Wednesday', 'Friday'],
      preferred_time: 'Evening',
      sessions_per_week: '3 days/week',
      session_duration: '90 minutes (Recommended)',
      parent_name: '',
      phone: '',
      preferred_contact_method: 'WhatsApp',
    };
  });

  const [parentalConsent, setParentalConsent] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Locality autocomplete
  const [showLocalitySuggestions, setShowLocalitySuggestions] = useState(false);
  const [localitySuggestions, setLocalitySuggestions] = useState<string[]>([]);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setShowLocalitySuggestions(false);
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
      ).slice(0, 7);
      setLocalitySuggestions(filtered);
      setShowLocalitySuggestions(true);
    } else {
      setLocalitySuggestions([]);
      setShowLocalitySuggestions(false);
    }
  };

  const handleSelectLocality = (locality: string) => {
    setFormData((prev) => ({ ...prev, locality }));
    setShowLocalitySuggestions(false);
  };

  // Phone input handling: normalizes clean 10-digit number
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normalized = normalizeIndianPhone(e.target.value);
    setFormData((prev) => ({ ...prev, phone: normalized }));
    if (validationError && isValidIndianPhone(normalized)) {
      setValidationError(null);
    }
  };

  // Toggle helpers
  const toggleSubject = (subject: string) => {
    setFormData((prev) => {
      const exists = prev.subjects.includes(subject);
      const updated = exists ? prev.subjects.filter((s) => s !== subject) : [...prev.subjects, subject];
      // If science unselected, clear branches
      const updatedBranches = exists && subject === 'Science' ? [] : prev.science_branches;
      return { ...prev, subjects: updated, science_branches: updatedBranches };
    });
  };

  const toggleScienceBranch = (branch: string) => {
    setFormData((prev) => {
      const current = prev.science_branches || [];
      const exists = current.includes(branch);
      return {
        ...prev,
        science_branches: exists ? current.filter((b) => b !== branch) : [...current, branch],
      };
    });
  };

  const toggleDay = (day: string) => {
    setFormData((prev) => {
      const exists = prev.preferred_days.includes(day);
      return {
        ...prev,
        preferred_days: exists
          ? prev.preferred_days.filter((d) => d !== day)
          : [...prev.preferred_days, day],
      };
    });
  };

  // Validation per step
  const validateStep = (step: FormStep): boolean => {
    setValidationError(null);

    if (step === 1) {
      if (!formData.student_class) {
        setValidationError('Please select the student’s current class level.');
        return false;
      }
      return true;
    }

    if (step === 2) {
      if (formData.subjects.length === 0) {
        setValidationError('Please select at least one subject (Mathematics, Science, or English).');
        return false;
      }
      return true;
    }

    if (step === 3) {
      if (!formData.locality.trim()) {
        setValidationError('Please indicate your locality in Delhi (e.g., Preet Vihar, Rohini, Saket).');
        return false;
      }
      return true;
    }

    if (step === 4) {
      if (formData.preferred_days.length === 0) {
        setValidationError('Please choose at least one preferred day of the week.');
        return false;
      }
      return true;
    }

    if (step === 5) {
      if (!formData.parent_name.trim()) {
        setValidationError('Please enter your name as the parent or guardian.');
        return false;
      }
      if (!isValidIndianPhone(formData.phone)) {
        setValidationError('Please enter a valid 10-digit Indian mobile number (e.g., 98123 45678).');
        return false;
      }
      if (!parentalConsent) {
        setValidationError('Please confirm that you are the student’s parent or legal guardian authorized to submit this enquiry.');
        return false;
      }
      return true;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setValidationError(null);
      if (currentStep < 5) {
        setCurrentStep((prev) => (prev + 1) as FormStep);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    setValidationError(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as FormStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateStep(5)) {
      return;
    }

    const whatsappNumber = getSpectreWhatsAppNumber();
    const formattedMessage = generateParentTutoringMessage(formData);

    setIsSubmitting(true);
    setValidationError(null);

    const whatsappUrl = createWhatsAppLink(whatsappNumber, formattedMessage);

    // Direct synchronous launch to avoid browser popup blockers
    let opened = false;
    try {
      const win = window.open(whatsappUrl, '_blank');
      if (win && !win.closed) {
        opened = true;
      }
    } catch {
      opened = false;
    }

    // Optional legacy background record creation (non-blocking)
    submitTutorRequest({
      user_type: 'parent',
      parent_name: formData.parent_name,
      phone: formData.phone,
      student_class: formData.student_class,
      board: formData.board,
      subjects: formData.subjects,
      help_needed: [formData.academic_requirement],
      area: formData.locality,
      preferred_days: formData.preferred_days,
      preferred_time: formData.preferred_time,
      frequency: formData.sessions_per_week,
      additional_message: formData.additional_context,
    });

    navigate('/request-success', {
      state: {
        enquiryType: 'parent',
        whatsappUrl,
        message: formattedMessage,
        wasOpened: opened,
      },
    });
  };

  const stepsList = [
    { num: 1, label: 'Student' },
    { num: 2, label: 'Subject' },
    { num: 3, label: 'Location' },
    { num: 4, label: 'Schedule' },
    { num: 5, label: 'Contact' },
  ];

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
            Private 1-on-1 In-Home Instruction · Delhi
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl text-navy font-bold tracking-tight">
            Request an Educator
          </h1>
          <p className="text-xs sm:text-sm text-slate-dark font-body mt-2 max-w-lg mx-auto leading-relaxed">
            Share your child’s academic requirements. Our academic coordinator will personally review your details and introduce a vetted educator suited to their learning pace.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-white border border-border rounded-sm p-4 mb-6 shadow-xs">
          <div className="flex items-center justify-between">
            {stepsList.map((s, index) => {
              const isPassed = currentStep > s.num;
              const isCurrent = currentStep === s.num;
              return (
                <React.Fragment key={s.num}>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-8 h-8 rounded-sm flex items-center justify-center font-ui text-xs font-semibold transition-all ${
                        isPassed
                          ? 'bg-navy text-white'
                          : isCurrent
                          ? 'bg-academic text-white shadow-xs font-bold'
                          : 'bg-surface text-slate'
                      }`}
                    >
                      {isPassed ? <Check className="w-4 h-4" /> : s.num}
                    </div>
                    <span
                      className={`text-[11px] font-ui mt-1 hidden sm:block ${
                        isCurrent ? 'text-navy font-bold' : 'text-slate'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {index < stepsList.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-1 transition-all ${
                        currentStep > s.num ? 'bg-navy' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-border rounded-sm p-6 sm:p-8 shadow-xs">
          
          {/* Validation Alert */}
          {validationError && (
            <div className="mb-6 p-4 rounded-sm bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-ui flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* ====================================================================
              STEP 1: Student Information
             ==================================================================== */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-navy mb-1">
                  Student Information
                </h2>
                <p className="text-xs text-slate-dark font-body">
                  Select your child’s current grade level and school board in Delhi.
                </p>
              </div>

              {/* Class Selection */}
              <div>
                <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2.5">
                  Current Class Level <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {CLASS_OPTIONS.map((c) => {
                    const isSelected = formData.student_class === c;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, student_class: c }));
                          setValidationError(null);
                        }}
                        className={`py-3 px-3 rounded-sm border text-xs font-ui font-medium transition-all ${
                          isSelected
                            ? 'bg-navy text-white border-navy shadow-xs font-semibold'
                            : 'bg-warm-white hover:bg-surface border-border text-navy'
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Board Selection */}
              <div>
                <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2.5">
                  School Curriculum / Board
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {BOARD_OPTIONS.map((b) => {
                    const isSelected = formData.board === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, board: b }))}
                        className={`py-2.5 px-3 rounded-sm border text-xs font-ui font-medium transition-all ${
                          isSelected
                            ? 'bg-navy text-white border-navy font-semibold'
                            : 'bg-warm-white hover:bg-surface border-border text-navy'
                        }`}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Language */}
              <div>
                <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2.5">
                  Preferred Medium of Instruction
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {LANGUAGE_OPTIONS.map((lang) => {
                    const isSelected = formData.language_instruction === lang;
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, language_instruction: lang }))}
                        className={`py-2 px-3 rounded-sm border text-xs font-ui transition-all ${
                          isSelected
                            ? 'bg-navy text-white border-navy font-semibold'
                            : 'bg-warm-white hover:bg-surface border-border text-navy'
                        }`}
                      >
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ====================================================================
              STEP 2: Academic Requirements
             ==================================================================== */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-navy mb-1">
                  Academic Requirements
                </h2>
                <p className="text-xs text-slate-dark font-body">
                  Which subject(s) does your child need individual instruction for?
                </p>
              </div>

              {/* Subject Selection */}
              <div>
                <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2.5">
                  Subject Focus <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SUBJECT_OPTIONS.map((sub) => {
                    const isSelected = formData.subjects.includes(sub);
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => toggleSubject(sub)}
                        className={`p-3.5 rounded-sm border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-navy text-white border-navy shadow-xs font-semibold'
                            : 'bg-warm-white hover:bg-surface border-border text-navy'
                        }`}
                      >
                        <span className="font-ui text-sm">{sub}</span>
                        {isSelected && <Check className="w-4 h-4 text-academic-light" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Science Sub-branches (if Science selected) */}
              {formData.subjects.includes('Science') && (
                <div className="p-4 bg-surface-blue border border-academic/20 rounded-sm">
                  <span className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2">
                    Science Sub-Specialisation (Optional):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {SCIENCE_BRANCHES.map((branch) => {
                      const isSelected = (formData.science_branches || []).includes(branch);
                      return (
                        <button
                          key={branch}
                          type="button"
                          onClick={() => toggleScienceBranch(branch)}
                          className={`px-3 py-1.5 rounded-sm border text-xs font-ui font-medium transition-all ${
                            isSelected
                              ? 'bg-academic text-white border-academic font-semibold shadow-xs'
                              : 'bg-white border-border text-navy hover:bg-slate-50'
                          }`}
                        >
                          {branch}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-slate-dark mt-2 font-body">
                    Helpful for Classes 9 to 12 when Science branches require specialized educators.
                  </p>
                </div>
              )}

              {/* Main Academic Requirement */}
              <div>
                <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2.5">
                  Primary Learning Objective
                </label>
                <div className="space-y-2">
                  {REQUIREMENT_OPTIONS.map((req) => {
                    const isSelected = formData.academic_requirement === req;
                    return (
                      <button
                        key={req}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, academic_requirement: req }))}
                        className={`w-full p-3 rounded-sm border text-left text-xs font-ui flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-navy/5 border-navy text-navy font-semibold'
                            : 'bg-warm-white hover:bg-surface border-border text-navy'
                        }`}
                      >
                        <span>{req}</span>
                        {isSelected && <Check className="w-4 h-4 text-academic" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Context */}
              <div>
                <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2">
                  Additional Details / Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.additional_context || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, additional_context: e.target.value }))}
                  placeholder="e.g. Current test scores, specific topics causing difficulty, upcoming exam deadlines..."
                  className="w-full p-3 text-xs sm:text-sm font-ui rounded-sm border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-academic focus:border-academic"
                />
              </div>
            </div>
          )}

          {/* ====================================================================
              STEP 3: Location
             ==================================================================== */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-navy mb-1">
                  Location in Delhi
                </h2>
                <p className="text-xs text-slate-dark font-body">
                  Sessions are conducted in-person at your residence. Your locality allows us to match educators within comfortable travel proximity.
                </p>
              </div>

              {/* Locality with Autocomplete */}
              <div className="relative" ref={autocompleteRef}>
                <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2">
                  Delhi Locality / Neighborhood <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-academic absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.locality}
                    onChange={(e) => handleLocalityChange(e.target.value)}
                    placeholder="Type locality (e.g. Preet Vihar, Saket, Rohini...)"
                    className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm font-ui rounded-sm border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-academic focus:border-academic"
                  />
                </div>

                {/* Suggestions Dropdown */}
                {showLocalitySuggestions && localitySuggestions.length > 0 && (
                  <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-border rounded-sm shadow-md max-h-52 overflow-y-auto">
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

              {/* Popular Area Quick Select */}
              <div>
                <span className="block text-[11px] font-ui text-slate-dark uppercase tracking-wider mb-2">
                  Common Delhi Locations:
                </span>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_DELHI_AREAS.map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => handleSelectLocality(area)}
                      className={`text-xs font-ui px-2.5 py-1 rounded-sm border transition-colors ${
                        formData.locality === area
                          ? 'bg-navy text-white border-navy font-medium'
                          : 'bg-warm-white text-slate-dark border-border hover:bg-surface'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Address */}
              <div>
                <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2">
                  House / Apartment / Street Address (Optional)
                </label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                  placeholder="e.g. Flat 302, Palm Heights, Block C"
                  className="w-full p-2.5 text-xs sm:text-sm font-ui rounded-sm border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-academic focus:border-academic"
                />
              </div>

              {/* Landmark */}
              <div>
                <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2">
                  Nearby Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={formData.landmark || ''}
                  onChange={(e) => setFormData((prev) => ({ ...prev, landmark: e.target.value }))}
                  placeholder="e.g. Near Metro Station / Community Park"
                  className="w-full p-2.5 text-xs sm:text-sm font-ui rounded-sm border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-academic focus:border-academic"
                />
              </div>
            </div>
          )}

          {/* ====================================================================
              STEP 4: Schedule
             ==================================================================== */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-navy mb-1">
                  Schedule & Frequency
                </h2>
                <p className="text-xs text-slate-dark font-body">
                  Select your preferred tutoring days and weekly frequency. Reasonable flexibility is welcomed.
                </p>
              </div>

              {/* Preferred Days */}
              <div>
                <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2.5">
                  Preferred Days of the Week <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DAYS_OF_WEEK.map((day) => {
                    const isSelected = formData.preferred_days.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`py-2 px-3 rounded-sm border text-xs font-ui transition-all ${
                          isSelected
                            ? 'bg-navy text-white border-navy font-semibold'
                            : 'bg-warm-white hover:bg-surface border-border text-navy'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Time Slot */}
              <div>
                <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2.5">
                  Preferred Time of Day
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {TIME_OPTIONS.map((slot) => {
                    const isSelected = formData.preferred_time === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, preferred_time: slot }))}
                        className={`py-2 px-3 rounded-sm border text-xs font-ui transition-all ${
                          isSelected
                            ? 'bg-navy text-white border-navy font-semibold'
                            : 'bg-warm-white hover:bg-surface border-border text-navy'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sessions Per Week */}
              <div>
                <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2.5">
                  Desired Frequency
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SESSIONS_PER_WEEK_OPTIONS.map((freq) => {
                    const isSelected = formData.sessions_per_week === freq;
                    return (
                      <button
                        key={freq}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, sessions_per_week: freq }))}
                        className={`py-2 px-3 rounded-sm border text-xs font-ui transition-all ${
                          isSelected
                            ? 'bg-navy text-white border-navy font-semibold'
                            : 'bg-warm-white hover:bg-surface border-border text-navy'
                        }`}
                      >
                        {freq}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2.5">
                  Session Duration
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {DURATION_OPTIONS.map((dur) => {
                    const isSelected = formData.session_duration === dur;
                    return (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, session_duration: dur }))}
                        className={`py-2 px-3 rounded-sm border text-left text-xs font-ui transition-all ${
                          isSelected
                            ? 'bg-navy/5 border-navy text-navy font-semibold'
                            : 'bg-warm-white hover:bg-surface border-border text-navy'
                        }`}
                      >
                        {dur}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ====================================================================
              STEP 5: Contact Details & Review
             ==================================================================== */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-navy mb-1">
                  Parent Contact & Enquiry Review
                </h2>
                <p className="text-xs text-slate-dark font-body">
                  Review your information. When you click Prepare My Enquiry, your message will be formatted for WhatsApp.
                </p>
              </div>

              {/* Parent Name */}
              <div>
                <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2">
                  Parent or Guardian Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.parent_name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, parent_name: e.target.value }))}
                  placeholder="e.g. Dr. A. Sharma"
                  className="w-full p-2.5 text-xs sm:text-sm font-ui rounded-sm border border-border bg-white text-navy focus:outline-none focus:ring-2 focus:ring-academic focus:border-academic"
                />
              </div>

              {/* Phone */}
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
                <span className="text-[11px] text-slate-dark mt-1 block font-body">
                  Used solely to coordinate the educator introduction. No spam or commercial messages.
                </span>
              </div>

              {/* Preferred Contact Mode */}
              <div>
                <label className="block text-xs font-ui font-semibold text-navy uppercase tracking-wider mb-2">
                  Preferred Contact Channel
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['WhatsApp', 'Phone Call'] as const).map((method) => {
                    const isSelected = formData.preferred_contact_method === method;
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, preferred_contact_method: method }))}
                        className={`p-2.5 rounded-sm border text-xs font-ui font-medium transition-all ${
                          isSelected
                            ? 'bg-navy text-white border-navy font-semibold'
                            : 'bg-warm-white hover:bg-surface border-border text-navy'
                        }`}
                      >
                        {method}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Review Summary Card */}
              <div className="p-4 sm:p-5 rounded-sm bg-surface-blue border border-academic/20">
                <span className="text-xs font-ui font-bold uppercase tracking-widest text-navy block mb-3">
                  Enquiry Summary
                </span>
                <div className="grid grid-cols-2 gap-y-2 text-xs font-ui text-navy/90">
                  <div>
                    <span className="text-slate-dark block text-[11px]">Student Level:</span>
                    <span className="font-semibold text-navy">{formData.student_class} ({formData.board})</span>
                  </div>
                  <div>
                    <span className="text-slate-dark block text-[11px]">Subject(s):</span>
                    <span className="font-semibold text-navy">
                      {formData.subjects.join(', ')}
                      {formData.science_branches && formData.science_branches.length > 0
                        ? ` (${formData.science_branches.join(', ')})`
                        : ''}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-dark block text-[11px]">Objective:</span>
                    <span className="font-semibold text-navy">{formData.academic_requirement}</span>
                  </div>
                  <div>
                    <span className="text-slate-dark block text-[11px]">Locality:</span>
                    <span className="font-semibold text-navy">{formData.locality}</span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-academic/20">
                    <span className="text-slate-dark block text-[11px]">Schedule:</span>
                    <span className="font-semibold text-navy">
                      {formData.preferred_days.join(', ')} · {formData.preferred_time} ({formData.sessions_per_week})
                    </span>
                  </div>
                </div>
              </div>

              {/* Parental / Guardian Consent Checkbox (DPDP Compliance) */}
              <div className="p-3.5 bg-white border border-border rounded-sm">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={parentalConsent}
                    onChange={(e) => {
                      setParentalConsent(e.target.checked);
                      if (validationError) setValidationError(null);
                    }}
                    className="mt-1 h-4 w-4 rounded border-border text-academic focus:ring-academic"
                  />
                  <span className="text-xs text-navy font-body leading-relaxed">
                    I confirm that I am the parent or legal guardian of the student, authorized to submit these educational details, and I have read and agree to Spectre Education’s{' '}
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

              {/* Informational Notice */}
              <div className="p-3.5 bg-surface border border-border rounded-sm text-xs text-slate-dark font-body leading-relaxed flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-academic shrink-0 mt-0.5" />
                <p>
                  Clicking <strong>Prepare My Enquiry</strong> formats your requirements. You will review the complete message on WhatsApp before pressing send to connect with our coordinator.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-sm border border-border text-xs font-ui font-medium text-navy hover:bg-surface transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <span />
            )}

            {currentStep < 5 ? (
              <Button
                type="button"
                onClick={handleNext}
                variant="primary"
                size="md"
                className="flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-navy text-white text-xs sm:text-sm font-ui font-semibold hover:bg-navy-light transition-colors shadow-xs disabled:opacity-60"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>{isSubmitting ? 'Formatting...' : 'Prepare My Enquiry'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Educator Application Footer Callout */}
        <div className="mt-8 text-center text-xs font-ui text-slate-dark">
          <span>Are you a qualified educator looking to teach in Delhi? </span>
          <Link to="/apply-educator" className="text-academic font-semibold hover:underline">
            Apply as a Private Educator →
          </Link>
        </div>
      </div>
    </div>
  );
};
