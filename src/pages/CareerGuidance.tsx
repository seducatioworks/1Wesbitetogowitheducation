import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  ChevronDown
} from 'lucide-react';
import { Button } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { SITE_METADATA } from '../data/content';

export const CareerGuidance: React.FC = () => {
  useDocumentTitle(
    'Educational & Stream Guidance',
    'Thoughtful academic and stream selection guidance for Class 10 and 11 students in Delhi. Clarifying strengths, subject combinations, and higher education pathways.'
  );

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const streamBreakdowns = [
    {
      name: 'Science (PCM / PCB / PCMB)',
      subtitle: 'Rigorous Empirical & Analytical Exploration',
      description: 'Ideal for students with sustained curiosity for physical mechanisms, deep comfort with abstract quantitative deduction, and high daily problem-solving stamina.',
      considerations: [
        'Requires 4–5 hours of disciplined daily self-study outside school hours',
        'Sharp mathematical step-change from Class 10 Euclidean geometry to Class 11 calculus',
        'Directly opens engineering, medicine, computing, pure sciences, and architecture',
      ],
      caution: 'Beware choosing Science purely as a "safe fallback" if the student dislikes abstract mathematics.',
    },
    {
      name: 'Commerce (With / Without Mathematics)',
      subtitle: 'Commercial, Economic & Strategic Systems',
      description: 'Superbly suited to students intrigued by markets, organizational strategy, resource allocation, business law, and quantitative finance.',
      considerations: [
        'Opting for Core/Applied Mathematics retains eligibility for premier economics and global business programs',
        'Combines analytical rigor with practical application in corporate and financial domains',
        'Direct pathways into Chartered Accountancy, investment banking, corporate law, and management',
      ],
      caution: 'Ensure the student has solid computational arithmetic and analytical attention to detail.',
    },
    {
      name: 'Humanities & Social Sciences',
      subtitle: 'Rhetoric, Historiography & Critical Inquiry',
      description: 'For passionate readers, analytical writers, and students who thrive on debating societal structures, political philosophy, and human behaviour.',
      considerations: [
        'Demands extensive critical reading and nuanced, structured argumentative essay writing',
        'Builds the exact analytical and persuasive capabilities least vulnerable to technological automation',
        'Premier pathways into constitutional law, civil services, international diplomacy, policy, and journalism',
      ],
      caution: 'This is not an "easy option"—top university liberal arts admissions require exceptional intellectual rigor.',
    },
  ];

  const guidanceProcess = [
    {
      step: '01',
      title: 'Academic Transcript Review',
      description: 'We evaluate past unit test trends, board score trajectories, and teacher feedback to separate genuine cognitive strengths from temporary grading anomalies.',
    },
    {
      step: '02',
      title: 'Aptitude & Curiosity Discussion',
      description: 'A structured, relaxed exploratory conversation with the student to explore where their natural intellectual stamina lies outside school test rubrics.',
    },
    {
      step: '03',
      title: 'Pathway & University Mapping',
      description: 'We demystify senior secondary subject combination requirements (CBSE/ICSE) and connect them to Indian and international undergraduate admissions realities.',
    },
    {
      step: '04',
      title: 'Actionable Family Roadmap',
      description: 'A clear, written summary outlining recommended subject pairings, necessary academic foundations to reinforce, and upcoming timeline checkpoints.',
    },
  ];

  const faqs = [
    {
      q: 'Does Spectre Education offer certified psychometric testing or career counselling?',
      a: 'No. Spectre Education provides educational and academic stream guidance led by experienced educators. We do not offer clinical psychological assessments, certified psychometric battery tests, or licensed career counselling. Our focus is strictly on academic subject alignment, curriculum selection, and study readiness.',
    },
    {
      q: 'At what stage should families begin stream selection discussions?',
      a: 'The ideal window is during the middle of Class 10 (between October and January). This provides adequate time to reflect on academic comfort, explore subject combinations, and prepare for the step-change in Class 11.',
    },
    {
      q: 'Is Mathematics strictly necessary with the Commerce stream?',
      a: 'While many schools offer Commerce without Mathematics, taking Core Mathematics or Applied Mathematics preserves access to elite Bachelor of Economics, Statistics, and Management courses in top universities across India and abroad. We evaluate your child’s math comfort realistically.',
    },
    {
      q: 'How does an educational guidance consultation work?',
      a: 'We begin with an advisory telephone discussion, followed by a detailed review of recent academic work. We then schedule a comprehensive discussion with the student and parents to explore suitable pathways.',
    },
  ];

  const whatsappInquiryUrl = `https://wa.me/${SITE_METADATA.coordinatorWhatsApp}?text=Hi%20Spectre%20Education!%20I%20would%20like%20to%20enquire%20about%20Educational%20Guidance%20and%20Class%2010-11%20stream%20selection.`;

  return (
    <div className="bg-warm-white min-h-screen text-navy font-sans">
      {/* Institutional Hero */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 border-b border-border bg-warm-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-semibold bg-surface-blue text-academic border border-academic/20 uppercase tracking-wider">
              Advisory Guidance · Enquiry-Led Service
            </span>
          </div>

          <h1 className="font-extrabold text-3xl sm:text-5xl md:text-5xl text-navy tracking-tight leading-[1.18] mb-4">
            Educational & Stream Guidance
          </h1>

          <p className="text-base sm:text-lg text-slate-dark mb-6 max-w-3xl leading-relaxed">
            Better academic decisions begin with understanding a student's interests, strengths and aspirations.
          </p>

          <p className="text-sm sm:text-base text-slate-dark max-w-2xl leading-relaxed mb-8">
            The transition from Class 10 to Class 11 is one of the most pivotal forks in a student’s academic life. We help families navigate stream selection, subject combinations, and future educational pathways with clarity, objective insight, and calm reassurance.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              to="/request-guidance?type=stream-selection"
              variant="primary"
              size="lg"
            >
              Request an Advisory Consultation
            </Button>
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm border border-navy/30 bg-white hover:bg-surface text-navy text-xs sm:text-sm font-semibold transition-colors shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-academic" />
              <span>Direct WhatsApp Discussion</span>
            </a>
          </div>

          {/* Scope Disclaimer Box */}
          <div className="mt-8 p-4 rounded-sm bg-surface border border-border flex items-start space-x-3 text-xs sm:text-sm text-slate-dark">
            <AlertCircle className="w-4 h-4 text-academic mt-0.5 shrink-0" />
            <p>
              <strong className="text-navy font-semibold">Scope of Service:</strong> Spectre Education provides general academic and curriculum guidance. We do not provide clinical psychological evaluations, certified psychometric assessments, or licensed career counselling. Our advisory service is enquiry-led and focuses on academic alignment and syllabus preparedness.
            </p>
          </div>
        </div>
      </section>

      {/* Why Academic Direction Matters */}
      <section className="py-16 md:py-20 border-b border-border bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Pivotal Junction"
            title="Why Early Academic Direction Matters"
            subtitle="Rushing into a senior secondary stream based on societal pressure or peer decisions leads to unnecessary stress and academic friction."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="p-6 rounded-sm bg-warm-white border border-border flex flex-col justify-between">
              <div>
                <span className="font-mono text-sm font-bold text-academic">01</span>
                <h3 className="font-bold text-base text-navy mt-2 mb-2">The Class 11 Step-Change</h3>
                <p className="text-xs text-slate-dark leading-relaxed">
                  The volume and conceptual depth of Class 11 curricula expand nearly four-fold. Choosing a stream aligned with natural cognitive endurance prevents severe mid-year demoralisation.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-sm bg-warm-white border border-border flex flex-col justify-between">
              <div>
                <span className="font-mono text-sm font-bold text-academic">02</span>
                <h3 className="font-bold text-base text-navy mt-2 mb-2">Subject Synergy</h3>
                <p className="text-xs text-slate-dark leading-relaxed">
                  Thoughtfully pairing elective subjects (such as Applied Math, Informatics Practices, or Economics) creates natural academic reinforcement and strengthens undergraduate applications.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-sm bg-warm-white border border-border flex flex-col justify-between">
              <div>
                <span className="font-mono text-sm font-bold text-academic">03</span>
                <h3 className="font-bold text-base text-navy mt-2 mb-2">Objective Parental Perspective</h3>
                <p className="text-xs text-slate-dark leading-relaxed">
                  An experienced educational advisor introduces a neutral, supportive sounding board, allowing parents and students to align without emotional confrontation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Class 10 to 11 Stream Exploration */}
      <section className="py-16 md:py-20 border-b border-border bg-warm-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Curricular Pathways"
            title="Understanding Senior Secondary Streams"
            subtitle="An objective, unvarnished look at the realistic demands and opportunities of Science, Commerce, and Humanities."
          />

          <div className="space-y-6 mt-10">
            {streamBreakdowns.map((stream) => (
              <div key={stream.name} className="p-6 sm:p-7 bg-white border border-border rounded-sm shadow-xs">
                <div className="border-b border-border pb-3 mb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-academic block mb-1">
                    {stream.subtitle}
                  </span>
                  <h3 className="font-bold text-xl sm:text-2xl text-navy">
                    {stream.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-dark mb-5 leading-relaxed">
                  {stream.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  <div>
                    <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-2.5">
                      Key Practical Realities:
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-dark">
                      {stream.considerations.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-academic mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-surface rounded-sm border border-border flex flex-col justify-center">
                    <span className="text-xs font-bold text-navy uppercase tracking-wider block mb-1">
                      Advisory Caution:
                    </span>
                    <p className="text-xs text-slate-dark leading-relaxed italic">
                      "{stream.caution}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Guidance Process */}
      <section className="py-16 md:py-20 border-b border-border bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Advisory Approach"
            title="How Our Guidance Consultation Works"
            subtitle="A systematic, respectful evaluation designed to provide clarity and peace of mind."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {guidanceProcess.map((step) => (
              <div key={step.step} className="p-6 bg-warm-white border border-border rounded-sm">
                <span className="text-xs font-mono font-bold text-academic uppercase tracking-widest block mb-2">
                  STAGE {step.step}
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
            <Button to="/request-guidance?type=stream-selection" variant="primary" size="lg">
              Request an Advisory Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Guidance FAQ */}
      <section className="py-16 md:py-20 border-b border-border bg-warm-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Parent Inquiries"
            title="Frequently Asked Questions on Guidance"
            subtitle="Clear explanations regarding our advisory scope and consultation structure."
          />

          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="border border-border rounded-sm overflow-hidden bg-white shadow-xs">
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
            Educational Advisory Consultation
          </span>
          <h2 className="font-extrabold text-2xl sm:text-4xl font-semibold mb-4 text-white">
            Make Informed Decisions for Senior Secondary
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Connect with our academic coordinator to discuss your child’s Class 10 to 11 options, stream selection, and subject pairing strategies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              to="/request-guidance?type=stream-selection"
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
              <span>Direct WhatsApp Discussion</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
