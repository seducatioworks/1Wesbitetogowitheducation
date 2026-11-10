import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  MessageSquare, 
  ChevronDown,
  Brain,
  Target,
  FileText
} from 'lucide-react';
import { Button } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { SITE_METADATA } from '../data/content';

export const Mentorship: React.FC = () => {
  useDocumentTitle(
    'Academic Mentorship',
    'Personalised academic mentorship for students in Delhi. Developing independent study habits, time management, revision structures, and intellectual confidence.'
  );

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const mentorshipPillars = [
    {
      title: 'Study Planning & Architecture',
      description: 'Replacing frantic cramming with structured, realistic weekly study timetables that balance school homework, revision cycles, extracurriculars, and restorative sleep.',
      points: ['Deconstructing multi-chapter syllabi into daily blocks', 'Prioritising high-yield foundational topics', 'Eliminating last-minute panic before school unit tests'],
    },
    {
      title: 'Active Revision Methodologies',
      description: 'Moving students away from passive re-reading and useless highlighting toward active recall, self-quizzing, and spaced repetition frameworks that build durable long-term memory.',
      points: ['Techniques for efficient, concise summary notes', 'Spaced repetition scheduling across terms', 'Practicing unassisted problem retrieval under timed conditions'],
    },
    {
      title: 'Academic Accountability & Consistency',
      description: 'A compassionate, non-punitive external voice who reviews weekly study logs, helps troubleshoot friction, and keeps the student accountable to their own goals.',
      points: ['Weekly reflective check-ins on progress and hurdles', 'Constructive analysis of where time was lost', 'Building self-discipline gradually without overwhelming friction'],
    },
    {
      title: 'Exam Temperament & Confidence',
      description: 'Cultivating emotional composure during high-stakes assessments. We help students de-escalate anxiety and view mistakes as diagnostic data rather than personal failure.',
      points: ['Calm exam day routines and time-budgeting strategies', 'Techniques for managing mid-exam mental freezes', 'Reframing mistakes into actionable improvement plans'],
    },
  ];

  const whoBenefits = [
    {
      icon: Clock,
      title: 'The Overwhelmed Student',
      description: 'Spends long hours at their desk but struggles to translate effort into academic results due to unstructured, passive study habits.',
    },
    {
      icon: Target,
      title: 'The Procrastinating Student',
      description: 'Delays homework and revision until midnight, resulting in chronic stress, fatigue, and inconsistent school performance.',
    },
    {
      icon: Brain,
      title: 'The Transitioning Student',
      description: 'Finding the sharp increase in syllabus volume between Class 8 and Class 9, or Class 10 and Class 11, difficult to manage alone.',
    },
    {
      icon: Compass,
      title: 'The High-Potential Aspirant',
      description: 'Capable of top-tier results who needs sophisticated organisational systems to balance board exams with competitive ambitions.',
    },
  ];

  const sessionFlow = [
    {
      step: '01',
      title: 'Habit & Schedule Diagnostic',
      description: 'We review the student’s current daily routine, smartphone habits, homework backlog, and past exam patterns to pinpoint where momentum is lost.',
    },
    {
      step: '02',
      title: 'Personalised Study Framework',
      description: 'Together with the student, we co-create a weekly study architecture that reflects their natural energy rhythms and school commitments.',
    },
    {
      step: '03',
      title: 'Regular Mentorship Check-ins',
      description: 'Structured one-to-one sessions dedicated entirely to reviewing weekly adherence, addressing procrastination hurdles, and refining revision techniques.',
    },
    {
      step: '04',
      title: 'Iterative Habit Maturation',
      description: 'The ultimate objective is self-reliance. Over weeks, external scaffolding is gradually withdrawn as the student adopts self-directed discipline.',
    },
  ];

  const faqs = [
    {
      q: 'How does an academic mentor differ from a subject tutor?',
      a: 'A subject tutor teaches specific course content—such as calculus or organic chemistry. An academic mentor focuses on cognitive habits and study architecture: how the student organises their week, reviews notes, handles exam anxiety, and builds independent discipline.',
    },
    {
      q: 'Does mentorship replace private subject tutoring?',
      a: 'No. Mentorship complements subject tutoring. While an educator ensures deep conceptual understanding in Mathematics or Science, a mentor ensures the student has the overall organizational systems and revision habits to succeed across all subjects.',
    },
    {
      q: 'Does Spectre Education offer clinical psychological counselling?',
      a: 'No. Spectre Education provides educational mentorship only. Mentorship focuses strictly on academic organisation, study habits, and intellectual development. It does not replace professional mental health therapy, adolescent psychotherapy, or clinical medical support.',
    },
    {
      q: 'Is Academic Mentorship available immediately in all areas of Delhi?',
      a: 'Mentorship is offered as a selective, enquiry-led service. Because effective mentorship requires an exceptional pairing of temperament and intellectual maturity, we assess requirements individually before proposing a mentorship engagement.',
    },
    {
      q: 'How frequently do mentorship sessions take place?',
      a: 'Typically, mentorship involves one focused 60-to-75-minute consultation per week, supported by brief mid-week accountability check-ins to monitor study plan adherence.',
    },
  ];

  const whatsappInquiryUrl = `https://wa.me/${SITE_METADATA.coordinatorWhatsApp}?text=Hi%20Spectre%20Education!%20I%20am%20interested%20in%20learning%20more%20about%20Academic%20Mentorship%20for%20my%20child.`;

  return (
    <div className="bg-warm-white min-h-screen text-navy font-sans">
      {/* Institutional Hero */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 border-b border-border bg-warm-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-semibold bg-surface-blue text-academic border border-academic/20 uppercase tracking-wider">
              Academic Development · Selective Advisory Service
            </span>
          </div>

          <h1 className="font-extrabold text-3xl sm:text-5xl md:text-5xl text-navy tracking-tight leading-[1.18] mb-4">
            Academic Mentorship
          </h1>

          <p className="text-base sm:text-lg text-slate-dark mb-6 max-w-3xl leading-relaxed">
            Beyond completing the syllabus, help students develop the habits that support independent learning.
          </p>

          <p className="text-sm sm:text-base text-slate-dark max-w-2xl leading-relaxed mb-8">
            Many capable students struggle not because they lack intelligence, but because they have never been taught how to manage time, organise revision, or regulate academic pressure. Our mentorship provides the structured architecture for lasting intellectual independence.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              to="/request-guidance?type=mentorship"
              variant="primary"
              size="lg"
            >
              Submit an Advisory Request
            </Button>
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm border border-navy/30 bg-white hover:bg-surface text-navy text-xs sm:text-sm font-semibold transition-colors shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-academic" />
              <span>Enquire via WhatsApp</span>
            </a>
          </div>

          {/* Boundaries Notice Box */}
          <div className="mt-8 p-4 rounded-sm bg-surface border border-border flex items-start space-x-3 text-xs sm:text-sm text-slate-dark">
            <AlertCircle className="w-4 h-4 text-academic mt-0.5 shrink-0" />
            <p>
              <strong className="text-navy font-semibold">Important Scope Notice:</strong> Academic mentorship focuses on study habits, time management, and intellectual organization. It complements subject tutoring and is distinctly separate from clinical psychological counselling or medical therapy.
            </p>
          </div>
        </div>
      </section>

      {/* Tutor vs Academic Mentor Comparison */}
      <section className="py-16 md:py-20 border-b border-border bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Clarifying the Roles"
            title="Tutor vs. Academic Mentor: What Is the Difference?"
            subtitle="Understanding when a student needs subject-specific instruction, and when they require metacognitive habit transformation."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {/* Subject Tutor Card */}
            <div className="p-6 sm:p-7 rounded-sm bg-warm-white border border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <FileText className="w-4 h-4 text-academic" />
                  <span className="text-xs font-bold uppercase tracking-wider text-academic">The Subject Educator</span>
                </div>
                <h3 className="font-bold text-xl text-navy mb-2">
                  Teaches the Syllabus Content
                </h3>
                <p className="text-xs text-slate-dark mb-5 leading-relaxed">
                  Focuses on syllabus mastery, solving specific homework problems, explaining complex scientific or mathematical laws, and preparing for chapter unit tests.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-dark border-t border-border pt-4">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-academic mt-0.5 shrink-0" />
                    <span>Calculus derivations, chemical equations, grammar rules</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-academic mt-0.5 shrink-0" />
                    <span>Grading school homework and correcting calculation errors</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-academic mt-0.5 shrink-0" />
                    <span>Syllabus pacing aligned with school exam dates</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-border text-xs text-slate-dark font-medium">
                Primary Goal: <strong className="text-navy font-semibold">Curricular Comprehension</strong>
              </div>
            </div>

            {/* Academic Mentor Card */}
            <div className="p-6 sm:p-7 rounded-sm bg-surface-blue border border-academic/30 flex flex-col justify-between relative shadow-xs">
              <span className="absolute -top-3 right-5 px-2.5 py-0.5 bg-navy text-white text-[10px] font-semibold uppercase tracking-wider rounded-sm">
                Spectre Mentorship
              </span>
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Compass className="w-4 h-4 text-academic" />
                  <span className="text-xs font-bold uppercase tracking-wider text-academic">The Academic Mentor</span>
                </div>
                <h3 className="font-bold text-xl text-navy mb-2">
                  Teaches How to Learn
                </h3>
                <p className="text-xs text-slate-dark mb-5 leading-relaxed">
                  Focuses on study habits, planning architecture, emotional resilience, time efficiency, active revision, and cultivating sustainable intellectual independence.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-dark border-t border-academic/20 pt-4">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-academic mt-0.5 shrink-0" />
                    <span>Designing realistic, sustainable weekly revision schedules</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-academic mt-0.5 shrink-0" />
                    <span>Teaching active recall frameworks over passive reading</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-academic mt-0.5 shrink-0" />
                    <span>Overcoming exam-day freezing and homework procrastination</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-academic/20 text-xs text-slate-dark font-medium">
                Primary Goal: <strong className="text-navy font-semibold">Autonomous Self-Sufficiency</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Mentorship */}
      <section className="py-16 md:py-20 border-b border-border bg-warm-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Core Competencies"
            title="Areas of Academic Mentorship"
            subtitle="Transforming how students organize their cognitive energy and approach demanding academic milestones."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {mentorshipPillars.map((pillar) => (
              <div key={pillar.title} className="p-6 bg-white border border-border rounded-sm shadow-xs">
                <h3 className="font-bold text-xl text-navy mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-dark leading-relaxed mb-4">
                  {pillar.description}
                </p>
                <ul className="space-y-2 border-t border-border pt-4 text-xs text-slate-dark">
                  {pillar.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-academic font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who May Benefit */}
      <section className="py-16 md:py-20 border-b border-border bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Student Profiles"
            title="Who May Benefit from Mentorship"
            subtitle="Recognising the academic scenarios where structured habit guidance makes the most meaningful impact."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {whoBenefits.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-6 bg-warm-white border border-border rounded-sm flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-sm bg-surface-blue flex items-center justify-center text-academic mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-base text-navy mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-dark leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How Mentorship Sessions Work */}
      <section className="py-16 md:py-20 border-b border-border bg-warm-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Methodology"
            title="How Mentorship Engagements Progress"
            subtitle="A systematic, non-judgmental progression from diagnostic assessment to autonomous study routines."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {sessionFlow.map((step) => (
              <div key={step.step} className="p-6 bg-white border border-border rounded-sm shadow-xs">
                <span className="text-xs font-mono font-bold text-academic uppercase tracking-widest block mb-2">
                  PHASE {step.step}
                </span>
                <h4 className="font-bold text-base text-navy mb-2">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-dark leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button to="/request-guidance?type=mentorship" variant="primary" size="lg">
              Submit an Advisory Request
            </Button>
          </div>
        </div>
      </section>

      {/* Mentorship FAQ */}
      <section className="py-16 md:py-20 border-b border-border bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Questions & Clarity"
            title="Frequently Asked Questions on Mentorship"
            subtitle="Transparent explanations regarding expectations, format, and fit."
          />

          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border border-border rounded-sm overflow-hidden bg-warm-white shadow-xs">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between text-navy font-bold text-sm sm:text-base hover:bg-surface transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate transition-transform duration-200 shrink-0 ml-3 ${
                        isOpen ? 'transform rotate-180 text-academic' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-dark leading-relaxed border-t border-border">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enquiry CTA Banner */}
      <section className="py-16 md:py-20 bg-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-wider text-academic-light block mb-2 font-semibold">
            Selective Advisory Service
          </span>
          <h2 className="font-extrabold text-2xl sm:text-4xl font-semibold mb-4 text-white">
            Explore Academic Mentorship for Your Child
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Begin with a confidential conversation with our academic coordinator. We evaluate whether your child’s primary hurdle is subject-specific or habit-oriented.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              to="/request-guidance?type=mentorship"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto bg-white text-navy hover:bg-surface border-white font-bold"
            >
              Submit an Advisory Request
            </Button>
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold transition-colors w-full sm:w-auto shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
