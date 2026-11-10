import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  Clock, 
  MapPin, 
  ChevronDown, 
  MessageSquare
} from 'lucide-react';
import { Button } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { SITE_METADATA } from '../data/content';

export const PrivateTutoring: React.FC = () => {
  useDocumentTitle(
    'Private Tutoring in Delhi (Classes 6–12)',
    'Individual one-to-one home tutoring in Delhi for Classes 6–12 in Mathematics, Science and English. Thoughtfully matched educators and personalised pace.'
  );

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const subjects = [
    {
      title: 'Mathematics',
      grades: 'Classes 6–12 (CBSE & ICSE)',
      description: 'Building deep conceptual fluency from fundamental algebra and geometry to trigonometry, calculus, and applied mathematics. We eliminate rote formula memorisation by grounding concepts in intuitive logic and rigorous problem-solving.',
      topics: ['Arithmetic & Number Systems', 'Algebraic Expressions & Polynomials', 'Coordinate Geometry & Trigonometry', 'Calculus (Differential & Integral)', 'Applied Mathematics & Statistics'],
    },
    {
      title: 'Science (Physics, Chemistry, Biology)',
      grades: 'Classes 6–12',
      description: 'Demystifying complex natural laws and mechanisms through structured inquiry. In senior classes, we provide specialized subject educators who navigate the rigorous analytical demands of CBSE and ICSE boards with calm clarity.',
      topics: ['Integrated Middle School Science', 'Physics (Mechanics, Optics, Electromagnetism)', 'Chemistry (Physical, Organic & Inorganic)', 'Biology (Cell Biology, Genetics & Physiology)', 'Laboratory Practical Preparation'],
    },
    {
      title: 'English Language & Literature',
      grades: 'Classes 6–12',
      description: 'Fostering expressive clarity, critical literary analysis, and structured essay writing. We guide students through poetry deconstruction, prose analysis, formal letter drafting, and grammar precision.',
      topics: ['Advanced Grammar & Syntax Mastery', 'Reading Comprehension & Critical Analysis', 'Formal Essay & Article Writing', 'CBSE/ICSE Literature Prescribed Texts', 'Spoken Articulation & Vocabulary Expansion'],
    },
  ];

  const classTiers = [
    {
      tier: 'Classes 6–8',
      focus: 'Middle School Foundations',
      description: 'Establishing strong intellectual habits and eliminating early conceptual hesitancy before academic stakes rise.',
      points: ['Cultivating genuine curiosity in science and numbers', 'Strengthening arithmetic and reading comprehension', 'Building daily homework discipline without stress'],
    },
    {
      tier: 'Classes 9–10',
      focus: 'Secondary Board Preparation',
      description: 'Navigating the curriculum step-change and preparing for board examinations with calm, timed precision.',
      points: ['Mastering the expanded CBSE/ICSE board syllabus', 'Step-by-step problem deconstruction in Maths & Science', 'Past paper practice, timed tests, and marking rubric alignment'],
    },
    {
      tier: 'Classes 11–12',
      focus: 'Senior Secondary Mastery',
      description: 'Specialised instruction to manage the rigorous conceptual depth of senior school streams.',
      points: ['In-depth analytical rigor across Physics, Chem, Math, Biology', 'Balancing school board syllabus with entrance preparation requirements', 'Advanced problem-solving sets and targeted doubt resolution'],
    },
  ];

  const vettingStages = [
    {
      step: '01',
      title: 'Subject Matter Mastery',
      description: 'Every educator undergoes a stringent academic evaluation in their specialized domain, ensuring complete syllabus command and the ability to solve multi-step problems without hesitation.',
    },
    {
      step: '02',
      title: 'Pedagogical Interview',
      description: 'We do not hire based on degrees alone. We interview educators to evaluate how they communicate under pressure, their natural patience, and how they reframe explanations when a student is stuck.',
    },
    {
      step: '03',
      title: 'Diagnostic Case Evaluation',
      description: 'Candidates are presented with real-world student profiles—diagnosing foundational gaps, addressing exam panic, and outlining a realistic 12-week progression strategy.',
    },
    {
      step: '04',
      title: 'Code of Conduct & Verification',
      description: 'We verify residential credentials, references, and conduct background checks to ensure absolute safety, punctuality, and professional etiquette in your home.',
    },
  ];

  const introductionProcess = [
    {
      number: '1',
      title: 'Initial Consultation',
      description: 'You share your child’s current grade, school, curriculum, subject hurdles, and specific learning temperament via our request form or an advisory telephone discussion.',
    },
    {
      number: '2',
      title: 'Thoughtful Educator Matching',
      description: 'We do not dispatch the nearest tutor on a map. Our academic coordinator hand-selects an educator whose teaching style and subject mastery match your child’s unique needs.',
    },
    {
      number: '3',
      title: 'In-Home Diagnostic Session',
      description: 'The educator visits your home for an introductory session, assessing your child’s foundational knowledge and discussing a personalized learning plan with you.',
    },
    {
      number: '4',
      title: 'Structured Regular Learning',
      description: 'Sessions begin on a consistent weekly cadence. We maintain continuous check-ins and monthly progress reviews to ensure consistent academic momentum.',
    },
  ];

  const faqs = [
    {
      q: 'Where do tutoring sessions take place?',
      a: 'All sessions are conducted in-person at your residence in Delhi. This provides a focused, comfortable, and safe learning environment where parents can observe the academic atmosphere firsthand.',
    },
    {
      q: 'Which school boards do your educators support?',
      a: 'Our educators are thoroughly versed in CBSE, ICSE/ISC, and state board curricula across Classes 6 to 12. We align our pacing directly with your child’s school calendar and upcoming term assessments.',
    },
    {
      q: 'What happens if the educator is not the right fit for my child?',
      a: 'If after the initial session you feel the educator’s communication style or personality does not resonate with your child, we will gladly arrange an alternative educator without hesitation.',
    },
    {
      q: 'How many sessions per week are typically recommended?',
      a: 'Most families opt for 2 sessions per week per subject (90 minutes each). This provides adequate instructional depth while preserving vital time for independent student practice.',
    },
    {
      q: 'How do you monitor my child’s ongoing academic progress?',
      a: 'Educators maintain regular lesson notes, conduct monthly diagnostic check-ins, and provide periodic feedback to parents, ensuring transparency and alignment throughout the academic term.',
    },
  ];

  return (
    <div className="bg-warm-white min-h-screen text-navy font-sans">
      {/* Institutional Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 border-b border-border bg-warm-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-semibold bg-surface-blue text-academic border border-academic/20 uppercase tracking-wider">
              Primary Academic Service · Delhi
            </span>
          </div>

          <h1 className="font-extrabold text-3xl sm:text-5xl md:text-5xl text-navy tracking-tight leading-[1.18] mb-4">
            Private One-to-One Home Tutoring
          </h1>

          <p className="text-base sm:text-lg text-slate-dark mb-6 max-w-3xl leading-relaxed">
            Individual attention. Thoughtfully matched educators. Learning that moves at the student's pace.
          </p>

          <p className="text-sm sm:text-base text-slate-dark max-w-2xl leading-relaxed mb-8">
            We provide private, in-home academic instruction across Delhi for Classes 6–12. We focus on rigorous conceptual understanding, closing foundational learning gaps, and developing calm, confident mastery in Mathematics, Science, and English.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              to="/request-tutor"
              variant="primary"
              size="lg"
              className="flex items-center justify-center gap-2"
            >
              <span>Find the Right Educator</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <a
              href={`https://wa.me/${SITE_METADATA.coordinatorWhatsApp}?text=Hi%20Spectre%20Education!%20I%20would%20like%20to%20enquire%20about%20private%20home%20tutoring%20in%20Delhi.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm border border-navy/30 bg-white hover:bg-surface text-navy text-xs sm:text-sm font-semibold transition-colors shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-academic" />
              <span>Direct WhatsApp Enquiry</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-border text-xs sm:text-sm text-slate-dark font-medium">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-academic" />
              <span>Classes 6–12 CBSE & ICSE</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-academic" />
              <span>In-Home Across Delhi</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-academic" />
              <span>Personalised Pacing</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-academic" />
              <span>Strictly Vetted Tutors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why One-to-One Tutoring Matters */}
      <section className="py-16 md:py-20 border-b border-border bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The One-to-One Difference"
            title="Why Individual Education Changes Academic Trajectories"
            subtitle="In standard classrooms, teachers must teach to the median. In private one-to-one education, the entire lesson adapts to your child’s cognitive pace."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="p-6 rounded-sm bg-warm-white border border-border flex flex-col justify-between">
              <div>
                <span className="font-mono text-sm font-bold text-academic">01</span>
                <h3 className="font-bold text-base text-navy mt-2 mb-2">Immediate Doubt Resolution</h3>
                <p className="text-xs text-slate-dark leading-relaxed">
                  In a class of forty, students frequently hesitate to ask basic questions out of social fear. With a private educator, doubts are addressed the second they arise, preventing minor confusion from hardening into permanent gaps.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-sm bg-warm-white border border-border flex flex-col justify-between">
              <div>
                <span className="font-mono text-sm font-bold text-academic">02</span>
                <h3 className="font-bold text-base text-navy mt-2 mb-2">Root-Cause Gap Diagnosis</h3>
                <p className="text-xs text-slate-dark leading-relaxed">
                  A struggle with Class 10 trigonometry often stems from an unaddressed weakness in Class 8 geometry. Our educators trace difficulties back to their conceptual origin rather than repeatedly drilling superficial formulas.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-sm bg-warm-white border border-border flex flex-col justify-between">
              <div>
                <span className="font-mono text-sm font-bold text-academic">03</span>
                <h3 className="font-bold text-base text-navy mt-2 mb-2">Calm Exam Temperament</h3>
                <p className="text-xs text-slate-dark leading-relaxed">
                  Through regular timed practice, answer structuring, and marking scheme reviews, students transition from anxiety-driven cramming to composed, methodical examination mastery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Subjects & Classes */}
      <section className="py-16 md:py-20 border-b border-border bg-warm-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Academic Scope"
            title="Subjects & Grade Levels We Support"
            subtitle="Deep curricular alignment across CBSE, ICSE and State Boards for Classes 6 through 12 in Delhi."
          />

          {/* Subjects Grid */}
          <div className="space-y-6 mt-10">
            {subjects.map((sub) => (
              <div key={sub.title} className="p-6 sm:p-7 bg-white border border-border rounded-sm shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-3">
                  <h3 className="font-bold text-xl sm:text-2xl text-navy">
                    {sub.title}
                  </h3>
                  <span className="text-xs uppercase tracking-wider text-academic font-semibold mt-1 sm:mt-0">
                    {sub.grades}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-dark leading-relaxed mb-5 max-w-3xl">
                  {sub.description}
                </p>
                <div className="pt-4 border-t border-border">
                  <span className="text-xs font-semibold text-navy uppercase tracking-wider block mb-2">
                    Key Focus Areas:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {sub.topics.map((topic) => (
                      <span key={topic} className="inline-flex items-center text-xs px-2.5 py-1 rounded-sm bg-surface-blue text-academic border border-academic/20 font-medium">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Classes Breakdown */}
          <div className="mt-14">
            <h3 className="font-bold text-xl text-navy mb-6 text-center">
              Tailored Instruction Across Academic Stages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {classTiers.map((tier) => (
                <div key={tier.tier} className="p-6 bg-white border border-border rounded-sm shadow-xs">
                  <span className="text-xs font-bold text-academic uppercase tracking-wider block mb-1">
                    {tier.tier}
                  </span>
                  <h4 className="font-semibold text-base text-navy mb-2">
                    {tier.focus}
                  </h4>
                  <p className="text-xs text-slate-dark mb-4 leading-relaxed">
                    {tier.description}
                  </p>
                  <ul className="space-y-2 text-xs text-slate-dark">
                    {tier.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-academic mt-0.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How Spectre Considers Educator Suitability */}
      <section className="py-16 md:py-20 border-b border-border bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Vetting Standards"
            title="How We Consider Educator Suitability"
            subtitle="Fewer than 12% of applicants are invited to represent Spectre Education. We evaluate character, clarity, and patience just as rigorously as subject qualifications."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {vettingStages.map((stage) => (
              <div key={stage.step} className="p-6 bg-warm-white border border-border rounded-sm">
                <span className="text-xs font-bold tracking-widest text-academic block mb-1">
                  STAGE {stage.step}
                </span>
                <h3 className="font-bold text-base text-navy mb-2">
                  {stage.title}
                </h3>
                <p className="text-xs text-slate-dark leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-sm bg-surface border border-border text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-slate-dark">
              <ShieldCheck className="w-5 h-5 text-academic shrink-0" />
              <span>All educators undergo full document verification and adhere to a strict in-home professional code of conduct.</span>
            </div>
            <Link to="/apply-educator" className="text-academic hover:underline shrink-0 font-semibold">
              Join as an Educator →
            </Link>
          </div>
        </div>
      </section>

      {/* How the Introduction Process Works */}
      <section className="py-16 md:py-20 border-b border-border bg-warm-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Simple & Transparent"
            title="The Introduction Process"
            subtitle="From your initial inquiry to regular weekly sessions, every step is managed with care and clear communication."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {introductionProcess.map((step) => (
              <div key={step.number} className="p-6 bg-white border border-border rounded-sm shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-7 h-7 rounded-sm bg-navy text-white font-bold text-xs flex items-center justify-center mb-4">
                    {step.number}
                  </div>
                  <h4 className="font-bold text-base text-navy mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-dark leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button to="/request-tutor" variant="primary" size="lg">
              Begin by Requesting an Educator
            </Button>
          </div>
        </div>
      </section>

      {/* Parent FAQ */}
      <section className="py-16 md:py-20 border-b border-border bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Common Questions"
            title="Frequently Asked Questions by Parents"
            subtitle="Straightforward answers regarding our tutoring approach, session arrangements, and quality assurances."
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

      {/* Final Call to Action */}
      <section className="py-16 md:py-20 bg-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-wider text-academic-light block mb-2 font-semibold">
            Tailored In-Home Education
          </span>
          <h2 className="font-extrabold text-2xl sm:text-4xl font-semibold mb-4 text-white">
            Find the Right Educator for Your Child
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Share your child’s grade, subjects, and specific learning requirements. We will connect you with a carefully vetted educator suited to their temperament.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              to="/request-tutor"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto bg-white text-navy hover:bg-surface border-white font-bold"
            >
              Request an Educator
            </Button>
            <a
              href={`https://wa.me/${SITE_METADATA.coordinatorWhatsApp}?text=Hi%20Spectre%20Education!%20I%20would%20like%20to%20discuss%20private%20tutoring%20for%20my%20child.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold transition-colors w-full sm:w-auto shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Consultation</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
