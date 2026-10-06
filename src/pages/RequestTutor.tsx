import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  MapPin, 
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/Button';
import { submitTutorRequest } from '../lib/supabase';
import type { TutorRequest, FormStep } from '../types';

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
  'Not sure',
];

const SUBJECT_OPTIONS = [
  'Mathematics',
  'Science',
  'English',
];

const HELP_OPTIONS = [
  'Concept clarity',
  'Exam preparation',
  'Confidence building',
  'Catching up',
  'Regular academic support',
  'Other',
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
  'Morning',
  'Afternoon',
  'Evening',
  'Flexible',
];

const FREQUENCY_OPTIONS = [
  '2 days/week',
  '3 days/week',
  '4 days/week',
  '5 days/week',
  'Flexible',
];

export const RequestTutor: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Step state
  const [currentStep, setCurrentStep] = useState<FormStep>(1);

  // Form data state
  const [formData, setFormData] = useState<Omit<TutorRequest, 'id' | 'created_at' | 'status'>>({
    user_type: 'parent',
    parent_name: '',
    phone: '',
    email: '',
    student_class: '',
    board: 'CBSE',
    subjects: [],
    help_needed: [],
    area: '',
    landmark: '',
    preferred_days: [],
    preferred_time: 'Evening',
    frequency: '3 days/week',
    additional_message: '',
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isTutor = formData.user_type === 'tutor';

  // Handle preselected values from navigation state
  useEffect(() => {
    if (location.state && (location.state as any).preselectedHelp) {
      const helpVal = (location.state as any).preselectedHelp;
      setFormData((prev) => ({
        ...prev,
        help_needed: prev.help_needed.includes(helpVal) ? prev.help_needed : [...prev.help_needed, helpVal],
      }));
    }
  }, [location.state]);

  // Validation per step
  const validateStep = (step: FormStep): boolean => {
    setValidationError(null);

    if (step === 1) {
      if (!formData.student_class) {
        setValidationError(isTutor ? "Please select the class level you teach." : "Please select the student's current class.");
        return false;
      }
      return true;
    }

    if (step === 2) {
      if (formData.subjects.length === 0) {
        setValidationError('Please select at least one subject (Mathematics, Science, or English).');
        return false;
      }
      if (formData.help_needed.length === 0) {
        setValidationError(isTutor ? 'Please select your areas of teaching focus.' : 'Please select what kind of help your child needs.');
        return false;
      }
      return true;
    }

    if (step === 3) {
      if (!formData.area.trim()) {
        setValidationError('Please specify your locality in Delhi (e.g. Preet Vihar, Rohini, Saket).');
        return false;
      }
      return true;
    }

    if (step === 4) {
      if (formData.preferred_days.length === 0) {
        setValidationError('Please select at least one preferred day.');
        return false;
      }
      if (!formData.preferred_time) {
        setValidationError('Please select your preferred time slot.');
        return false;
      }
      return true;
    }

    if (step === 5) {
      if (!formData.parent_name.trim()) {
        setValidationError(isTutor ? 'Please provide your full name as the tutor.' : 'Please provide your name as the parent or guardian.');
        return false;
      }
      const cleanPhone = formData.phone.replace(/[\s-]/g, '');
      if (!cleanPhone || cleanPhone.length < 10) {
        setValidationError('Please provide a valid 10-digit mobile number so we can reach you.');
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

  // Toggle array item helper
  const toggleArrayItem = (key: 'subjects' | 'help_needed' | 'preferred_days', value: string) => {
    setFormData((prev) => {
      const list = prev[key];
      const exists = list.includes(value);
      return {
        ...prev,
        [key]: exists ? list.filter((item) => item !== value) : [...list, value],
      };
    });
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) {
      return;
    }

    setIsSubmitting(true);
    setValidationError(null);

    try {
      const result = await submitTutorRequest(formData);
      if (result.success) {
        navigate('/request-success', {
          state: {
            request: result.data || {
              ...formData,
              id: `req-${Date.now().toString(36)}`,
              created_at: new Date().toISOString(),
            },
          },
        });
      } else {
        setValidationError(result.error || "We couldn't submit your request right now. Please try again.");
      }
    } catch (err) {
      setValidationError("We couldn't submit your request right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepLabels = [
    { num: 1, label: isTutor ? 'Level' : 'Student' },
    { num: 2, label: 'Subject' },
    { num: 3, label: 'Location' },
    { num: 4, label: 'Schedule' },
    { num: 5, label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-parchment py-8 sm:py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        {/* Back to Home Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-navy transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Spectre Home</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg border border-border-subtle shadow-sm p-6 sm:p-8">
          
          {/* Role Switcher (Parent or Tutor) */}
          <div className="flex bg-slate-100 p-1 rounded-md mb-6 border border-border-subtle">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, user_type: 'parent' })}
              className={`flex-1 py-2 px-3 text-xs font-semibold rounded transition-all ${
                !isTutor
                  ? 'bg-white text-navy shadow-xs border border-border-subtle'
                  : 'text-ink-muted hover:text-navy'
              }`}
            >
              👨‍👩‍👧 Parent / Guardian (Request a Tutor)
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, user_type: 'tutor' })}
              className={`flex-1 py-2 px-3 text-xs font-semibold rounded transition-all ${
                isTutor
                  ? 'bg-white text-navy shadow-xs border border-border-subtle'
                  : 'text-ink-muted hover:text-navy'
              }`}
            >
              🧑‍🏫 Tutor / Educator (Join Network)
            </button>
          </div>

          {/* Header */}
          <div className="border-b border-border-subtle pb-6 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-trust">
              Step {currentStep} of 5 &middot; {isTutor ? 'Tutor Registration' : 'Parent Request'}
            </span>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-navy mt-1 tracking-tight">
              {isTutor ? 'Join as a Home Tutor' : 'Request a Home Tutor'}
            </h1>
            <p className="text-xs sm:text-sm text-ink-muted mt-1">
              {isTutor
                ? 'Share your teaching subjects, classes, and Delhi location preferences. We will connect with you.'
                : 'Tell us about your requirements. A member of the Spectre team will review them and contact you.'}
            </p>

            {/* Stepper Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs font-medium text-ink-muted mb-2">
                {stepLabels.map((s) => (
                  <span
                    key={s.num}
                    className={`${
                      currentStep === s.num
                        ? 'text-navy font-bold'
                        : currentStep > s.num
                        ? 'text-trust'
                        : 'text-ink-subtle'
                    }`}
                  >
                    {s.num}. {s.label}
                  </span>
                ))}
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-navy h-full transition-all duration-300"
                  style={{ width: `${(currentStep / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Validation Alert */}
          {validationError && (
            <div className="mb-6 p-4 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Please review:</p>
                <p className="mt-0.5">{validationError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* STEP 1: STUDENT / TUTOR LEVEL */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading font-bold text-lg sm:text-xl text-navy">
                    {isTutor ? 'Tell us about the classes you teach.' : 'Tell us about the student.'}
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-muted mt-1">
                    {isTutor
                      ? 'Select the primary class level you specialize in.'
                      : 'Select the class your child is currently enrolled in.'}
                  </p>
                </div>

                {/* Class selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
                    {isTutor ? 'Target Class Level' : "Student's Class"} <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {CLASS_OPTIONS.map((cls) => {
                      const isSelected = formData.student_class === cls;
                      return (
                        <button
                          key={cls}
                          type="button"
                          onClick={() => setFormData({ ...formData, student_class: cls })}
                          className={`py-3 px-3 rounded-md text-sm font-semibold border transition-all text-center ${
                            isSelected
                              ? 'bg-navy text-white border-navy shadow-xs'
                              : 'bg-white text-ink border-border-subtle hover:border-slate-400'
                          }`}
                        >
                          {cls}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Board selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
                    Educational Board (Optional)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {BOARD_OPTIONS.map((brd) => {
                      const isSelected = formData.board === brd;
                      return (
                        <button
                          key={brd}
                          type="button"
                          onClick={() => setFormData({ ...formData, board: brd })}
                          className={`py-2.5 px-3 rounded-md text-sm font-medium border transition-all text-center ${
                            isSelected
                              ? 'bg-trust-light text-navy border-trust font-semibold'
                              : 'bg-white text-ink border-border-subtle hover:border-slate-400'
                          }`}
                        >
                          {brd}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: SUBJECT */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading font-bold text-lg sm:text-xl text-navy">
                    {isTutor ? 'What subjects & expertise do you teach?' : 'What does your child need help with?'}
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-muted mt-1">
                    {isTutor
                      ? 'Select the subjects you offer for 1-on-1 home tuition in Delhi.'
                      : 'Select one or more subjects for home tutoring.'}
                  </p>
                </div>

                {/* Subjects */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
                    {isTutor ? 'Subjects You Teach' : 'Subjects Needed'} <span className="text-red-500">*</span> (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SUBJECT_OPTIONS.map((sub) => {
                      const isSelected = formData.subjects.includes(sub);
                      return (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => toggleArrayItem('subjects', sub)}
                          className={`p-4 rounded-md text-left border transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-navy text-white border-navy shadow-xs'
                              : 'bg-white text-ink border-border-subtle hover:border-slate-400'
                          }`}
                        >
                          <span className="font-semibold text-sm">{sub}</span>
                          {isSelected && <Check className="w-4 h-4 text-trust" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Help needed / Teaching Focus */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
                    {isTutor ? 'Teaching Focus & Strengths' : 'What kind of help do they need?'} <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {HELP_OPTIONS.map((opt) => {
                      const isSelected = formData.help_needed.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => toggleArrayItem('help_needed', opt)}
                          className={`p-3 rounded-md text-left border text-sm transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-trust-light text-navy border-trust font-semibold'
                              : 'bg-white text-ink border-border-subtle hover:border-slate-400'
                          }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <Check className="w-4 h-4 text-trust" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Additional details */}
                <div>
                  <label htmlFor="topic-details" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
                    {isTutor ? 'Qualifications & Teaching Experience (Optional)' : 'Tell us a little more (Optional)'}
                  </label>
                  <textarea
                    id="topic-details"
                    rows={3}
                    placeholder={
                      isTutor
                        ? 'e.g. M.Sc. Physics with 4 years experience teaching CBSE Class 10 & 12 students...'
                        : 'e.g. Struggling with quadratic equations, or needs help preparing for term exams...'
                    }
                    value={formData.additional_message}
                    onChange={(e) => setFormData({ ...formData, additional_message: e.target.value })}
                    className="w-full text-sm p-3 rounded-md border border-border-subtle focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: LOCATION */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading font-bold text-lg sm:text-xl text-navy">
                    {isTutor ? 'Where can you travel to teach?' : 'Where will the sessions take place?'}
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-muted mt-1">
                    Spectre provides in-person 1-on-1 home tuition across Delhi localities.
                  </p>
                </div>

                <div>
                  <label htmlFor="area-input" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
                    {isTutor ? 'Your Preferred Localities in Delhi' : 'Area / Locality in Delhi'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="area-input"
                    type="text"
                    required
                    placeholder="e.g. Preet Vihar, Rohini Sector 9, Saket, Dwarka..."
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full text-sm p-3 rounded-md border border-border-subtle focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy"
                  />
                  <p className="text-xs text-ink-muted mt-1.5">
                    A simple locality name is enough so we can arrange suitable tutor visits.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
                    Session Format
                  </label>
                  <div className="p-3 bg-slate-50 rounded-md border border-border-subtle flex items-center gap-2.5 text-sm font-medium text-navy">
                    <MapPin className="w-4 h-4 text-trust" />
                    <span>In-person 1-on-1 Home Tuition (Delhi)</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="landmark-input" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
                    Nearby Landmark / Metro Station (Optional)
                  </label>
                  <input
                    id="landmark-input"
                    type="text"
                    placeholder="e.g. Near Metro Station, Opposite Central Market"
                    value={formData.landmark || ''}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    className="w-full text-sm p-3 rounded-md border border-border-subtle focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: PREFERRED SCHEDULE */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading font-bold text-lg sm:text-xl text-navy">
                    {isTutor ? 'When are you available for sessions?' : 'When would you like the sessions?'}
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-muted mt-1">
                    {isTutor
                      ? 'Select the days and timings you have available for home tuition visits.'
                      : 'Select your preferred days and timings for the home tutor visits.'}
                  </p>
                </div>

                {/* Days */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
                    Preferred Days <span className="text-red-500">*</span> (Select all suitable days)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {DAYS_OF_WEEK.map((day) => {
                      const isSelected = formData.preferred_days.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleArrayItem('preferred_days', day)}
                          className={`p-2.5 rounded-md text-xs font-medium border text-center transition-all ${
                            isSelected
                              ? 'bg-navy text-white border-navy font-semibold'
                              : 'bg-white text-ink border-border-subtle hover:border-slate-400'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preferred time */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
                    Preferred Time Slot <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {TIME_OPTIONS.map((tm) => {
                      const isSelected = formData.preferred_time === tm;
                      return (
                        <button
                          key={tm}
                          type="button"
                          onClick={() => setFormData({ ...formData, preferred_time: tm })}
                          className={`p-3 rounded-md text-sm font-medium border text-center transition-all ${
                            isSelected
                              ? 'bg-trust-light text-navy border-trust font-semibold'
                              : 'bg-white text-ink border-border-subtle hover:border-slate-400'
                          }`}
                        >
                          {tm}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Frequency */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
                    Weekly Frequency (Optional)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {FREQUENCY_OPTIONS.map((freq) => {
                      const isSelected = formData.frequency === freq;
                      return (
                        <button
                          key={freq}
                          type="button"
                          onClick={() => setFormData({ ...formData, frequency: freq })}
                          className={`p-2.5 rounded-md text-xs font-medium border text-center transition-all ${
                            isSelected
                              ? 'bg-slate-100 text-navy border-slate-400 font-semibold'
                              : 'bg-white text-ink border-border-subtle hover:border-slate-400'
                          }`}
                        >
                          {freq}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: CONTACT */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-heading font-bold text-lg sm:text-xl text-navy">
                    How can we reach you?
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-muted mt-1">
                    A member of the Spectre team will contact you to discuss the details.
                  </p>
                </div>

                <div>
                  <label htmlFor="parent-name" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
                    {isTutor ? 'Tutor Full Name' : 'Parent / Guardian Name'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="parent-name"
                    type="text"
                    required
                    placeholder={isTutor ? 'e.g. Rahul Sharma' : 'e.g. Sunita Sharma'}
                    value={formData.parent_name}
                    onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                    className="w-full text-sm p-3 rounded-md border border-border-subtle focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy"
                  />
                </div>

                <div>
                  <label htmlFor="phone-number" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
                    Phone / Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-sm text-ink-muted font-medium">
                      +91
                    </span>
                    <input
                      id="phone-number"
                      type="tel"
                      required
                      placeholder="98123 45678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-sm p-3 pl-12 rounded-md border border-border-subtle focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy"
                    />
                  </div>
                  <p className="text-xs text-ink-muted mt-1.5">
                    We will use this number to contact you and confirm next steps.
                  </p>
                </div>

                <div>
                  <label htmlFor="email-input" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    placeholder="e.g. contact@example.com"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-sm p-3 rounded-md border border-border-subtle focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy"
                  />
                </div>

                {/* Brief Summary of selections */}
                <div className="p-4 rounded-md bg-parchment border border-border-subtle space-y-2 text-xs">
                  <p className="font-semibold text-navy">
                    {isTutor ? 'Tutor Application Summary:' : 'Request Summary:'}
                  </p>
                  <p className="text-ink-muted">
                    <span className="font-medium text-ink">Level:</span> {formData.student_class} ({formData.board || 'CBSE'}) &middot;{' '}
                    <span className="font-medium text-ink">Subjects:</span> {formData.subjects.join(', ')} &middot;{' '}
                    <span className="font-medium text-ink">Location:</span> {formData.area}, Delhi
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons (Back / Next / Submit) */}
            <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-navy py-2 px-3 rounded-md transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}
              </div>

              <div>
                {currentStep < 5 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    variant="primary"
                    size="md"
                    className="w-full sm:w-auto gap-2"
                  >
                    <span>Next: {stepLabels[currentStep].label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto gap-2"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>{isTutor ? 'Submit Tutor Profile' : 'Request My Tutor'}</span>
                        <Check className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Legal consent note below submit */}
            {currentStep === 5 && (
              <p className="mt-4 text-xs text-ink-muted text-center">
                By submitting, you agree that Spectre Tutors Network may contact you regarding this tutoring request.
              </p>
            )}
          </form>
        </div>

        {/* Small reassurance note below form card */}
        <div className="mt-6 text-center text-xs text-ink-muted space-y-1">
          <p>No account required &middot; 1-on-1 Delhi Home Tutoring &middot; Instant WhatsApp Alert</p>
        </div>
      </div>
    </div>
  );
};
