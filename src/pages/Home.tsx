import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  UserCheck, 
  BookOpen, 
  Sparkles, 
  ChevronDown,
  MapPin,
  Clock,
  Compass
} from 'lucide-react';
import { Button } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';
import { 
  TRUST_STRIP_ITEMS, 
  CHILD_NEED_CARDS, 
  SUBJECTS_DATA, 
  HOW_IT_WORKS_STEPS, 
  WHY_SPECTRE_PRINCIPLES, 
  FAQ_ITEMS 
} from '../data/content';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleNeedCardClick = (helpValue: string) => {
    navigate('/request-tutor', { state: { preselectedHelp: helpValue } });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 border-b border-border-subtle bg-parchment">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Headline and CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-trust-light border border-trust/20 text-xs font-semibold text-trust tracking-wide">
                <MapPin className="w-3.5 h-3.5" />
                <span>Delhi &middot; 1-on-1 Home Tuition &middot; Classes 6–12</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-navy leading-[1.18] tracking-tight">
                The right tutor can change how a child feels about learning.
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-xl">
                Find a trusted 1-on-1 home tutor for Mathematics, Science or English. Tell us what your child needs, and we’ll help you find a suitable tutor.
              </p>

              {/* Actions / CTAs */}
              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Button to="/request-tutor" variant="primary" size="lg" className="gap-2">
                  <span>Request a Tutor</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center font-medium text-navy hover:text-navy-dark bg-white hover:bg-slate-50 border border-border-subtle rounded-md px-5 py-3 text-base shadow-sm transition-colors text-center"
                >
                  How It Works
                </a>
              </div>

              {/* Subtle Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-ink-muted border-t border-border-subtle/80 w-full">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-trust" />
                  <span>No upfront fees to request</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-trust" />
                  <span>Human review for every request</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-trust" />
                  <span>In-home 1-on-1 sessions</span>
                </div>
              </div>
            </div>

            {/* Right Column: Authentic Education Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-lg overflow-hidden border border-border-card shadow-md bg-white">
                <img
                  src="/images/home_tutoring_hero.jpg"
                  alt="Student and tutor studying mathematics at home desk in Delhi"
                  className="w-full h-[340px] sm:h-[400px] object-cover"
                  loading="eager"
                />
                {/* Clean caption card */}
                <div className="p-4 bg-white border-t border-border-subtle flex items-start gap-3">
                  <div className="w-8 h-8 rounded-sm bg-trust-light flex items-center justify-center text-trust shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">
                      1-on-1 Learning at Home
                    </p>
                    <p className="text-xs text-ink-muted leading-normal mt-0.5">
                      Personalised attention, paced for your child's curriculum and learning style.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <section className="bg-white py-12 border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-navy">
              Focused on what actually matters.
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRUST_STRIP_ITEMS.map((item) => (
              <div
                key={item.title}
                className="bg-parchment p-6 rounded-md border border-border-subtle flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-heading font-bold text-lg text-navy mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHAT DOES YOUR CHILD NEED HELP WITH? */}
      <section className="py-16 bg-parchment border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Personalised Support"
            title="What does your child need help with right now?"
            subtitle="Every student starts from a different place. Select an area to share with us in your tutor request."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CHILD_NEED_CARDS.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => handleNeedCardClick(card.helpValue)}
                className="group text-left bg-white p-6 rounded-md border border-border-subtle hover:border-trust transition-all duration-150 shadow-xs hover:shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-sm bg-trust-light group-hover:bg-trust group-hover:text-white text-trust flex items-center justify-center mb-4 transition-colors">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-navy mb-2 group-hover:text-trust transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-trust">
                  <span>Specify this need</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SUBJECTS */}
      <section id="subjects" className="py-16 bg-white border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Deliberate Focus"
            title="Focused on the subjects that matter."
            subtitle="Rather than offering every possible subject, Spectre concentrates on the core academic disciplines for Classes 6–12."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUBJECTS_DATA.map((subject) => (
              <div
                key={subject.name}
                className="bg-parchment rounded-md border border-border-subtle p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading font-bold text-xl text-navy">
                      {subject.name}
                    </h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-sm bg-navy/5 text-navy border border-navy/10">
                      {subject.tag}
                    </span>
                  </div>
                  <p className="text-sm text-ink-muted mb-6 leading-relaxed">
                    {subject.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-border-subtle">
                    {subject.topics.map((topic) => (
                      <div key={topic} className="flex items-start gap-2 text-xs text-ink/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-trust mt-0.5 shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border-subtle">
                  <Link
                    to="/request-tutor"
                    className="text-xs font-semibold text-trust hover:text-trust-hover flex items-center gap-1.5"
                  >
                    <span>Request a {subject.name} tutor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="py-16 bg-parchment border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Simple Process"
            title="Getting started is simple."
            subtitle="No complex algorithms or bidding. We listen to your child’s needs and handle the coordination."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <div
                key={step.number}
                className="relative bg-white p-7 rounded-md border border-border-subtle flex flex-col justify-between"
              >
                <div>
                  <span className="font-heading font-extrabold text-2xl text-trust tracking-tight block mb-3">
                    {step.number}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button to="/request-tutor" variant="primary" size="md">
              Start with Step 1: Tell Us What Your Child Needs
            </Button>
          </div>
        </div>
      </section>

      {/* 6. WHY SPECTRE */}
      <section id="why-spectre" className="py-16 bg-white border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Philosophy"
            title="Tutoring should feel personal."
            subtitle="Education isn't an automated transaction. We believe students thrive when paired with thoughtful, patient educators."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {WHY_SPECTRE_PRINCIPLES.map((principle) => (
              <div
                key={principle.title}
                className="p-6 rounded-md bg-parchment border border-border-subtle"
              >
                <h3 className="font-heading font-bold text-lg text-navy mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-trust" />
                  <span>{principle.title}</span>
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed pl-4">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TRUST / SAFETY SECTION */}
      <section className="py-16 bg-parchment border-b border-border-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-8 sm:p-10 border border-border-subtle shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-md bg-trust-light flex items-center justify-center text-trust shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h2 className="font-heading font-bold text-2xl text-navy">
                  Your child's learning deserves care.
                </h2>
                <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                  We review tutor information before introducing tutors to families. Depending on the tutor and service requirements, this may include reviewing academic qualifications, teaching experience and conducting a phone or screening conversation.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs text-ink font-medium">
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-trust" />
                    Academic credentials reviewed
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-trust" />
                    Delhi locality alignment
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-trust" />
                    Consistent weekly scheduling
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. REQUEST TUTOR CTA SECTION */}
      <section className="py-16 bg-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Looking for the right tutor?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Tell us a little about your child and what you’re looking for. We’ll take it from there.
          </p>
          <div className="pt-2">
            <Button
              to="/request-tutor"
              variant="subtle"
              size="lg"
              className="bg-white text-navy hover:bg-slate-100 border-none font-semibold text-base"
            >
              Request a Tutor
            </Button>
          </div>
          <p className="text-xs text-slate-400">
            No account required &middot; For parents in Delhi &middot; Classes 6–12
          </p>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section id="faq" className="py-16 bg-parchment">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Frequently Asked Questions"
            title="Common questions from parents"
            subtitle="Straightforward answers about our home tutoring service in Delhi."
          />

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={item.question}
                  className="bg-white rounded-md border border-border-subtle overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading font-semibold text-base text-navy">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-ink-muted transition-transform duration-200 shrink-0 ${
                        isOpen ? 'transform rotate-180 text-trust' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-ink-muted leading-relaxed border-t border-slate-100 pt-3">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
