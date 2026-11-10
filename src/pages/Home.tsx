import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  UserCheck, 
  BookOpen, 
  ChevronDown, 
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';
import { 
  CHILD_NEED_CARDS, 
  PERSONALISATION_POINTS, 
  EDUCATIONAL_SERVICES, 
  SPECTRE_APPROACH_STEPS, 
  SUBJECTS_DATA, 
  EDUCATOR_STANDARDS, 
  PARENT_DIAGNOSTIC_QUESTIONS, 
  FAQ_ITEMS,
  SITE_METADATA 
} from '../data/content';
import { ARTICLES } from '../data/articles';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleNeedCardClick = (helpValue: string) => {
    navigate('/request-tutor', { state: { preselectedHelp: helpValue } });
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('/#', '').replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-warm-white text-navy font-sans">
      
      {/* =========================================================================
          SECTION 1 — HERO
          Modern academic institutional presentation: clarity, competence, composure.
         ========================================================================= */}
      <section id="hero" className="relative pt-12 pb-16 md:pt-16 md:pb-24 border-b border-border bg-warm-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Academic Positioning */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              
              {/* Institutional Context Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-surface-blue border border-academic/20 text-[11px] font-semibold text-academic tracking-wider uppercase">
                <span>DELHI · PRIVATE ONE-TO-ONE EDUCATION · CLASSES 6–12</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-extrabold text-3xl sm:text-5xl lg:text-[52px] text-navy leading-[1.15] tracking-tight">
                The right education begins with understanding the student.
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-slate-dark leading-relaxed max-w-xl font-normal">
                Thoughtfully matched private educators, personalised academic support and mentorship for students who deserve individual attention.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Button to="/request-tutor" variant="primary" size="lg" className="gap-2">
                  <span>Request an Educator</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleScrollTo(e, '#how-it-works')}
                  className="inline-flex items-center justify-center text-xs sm:text-sm font-semibold text-navy hover:text-midnight px-4 py-2.5 rounded-sm border border-navy/30 bg-white hover:bg-surface transition-colors shadow-xs text-center"
                >
                  Explore Our Approach
                </a>
              </div>

              {/* Institutional Scope Bullet */}
              <div className="pt-4 border-t border-border w-full flex items-center gap-2 text-xs text-slate-dark">
                <div className="w-1.5 h-1.5 rounded-full bg-academic" />
                <span>One-to-one in-home instruction across Delhi for Mathematics, Science and English.</span>
              </div>
            </div>

            {/* Right Column: Authentic Learning Photography */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-sm overflow-hidden border border-border shadow-xs bg-white">
                <img
                  src="/images/home_tutoring_hero.jpg"
                  alt="Private educator mentoring a student in an in-home study in Delhi"
                  className="w-full h-[320px] sm:h-[400px] object-cover"
                  loading="eager"
                  fetchPriority="high"
                  width={1200}
                  height={896}
                />
                {/* Institutional Caption */}
                <div className="p-4 sm:p-5 bg-white border-t border-border flex items-start gap-3">
                  <div className="w-8 h-8 rounded-sm bg-surface-blue flex items-center justify-center text-academic shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy leading-snug">
                      Individual Academic Mentorship
                    </p>
                    <p className="text-xs text-slate-dark leading-normal mt-0.5">
                      Paced carefully around your child’s school curriculum, conceptual understanding and learning style.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — THE CENTRAL PHILOSOPHY / WHY SPECTRE
         ========================================================================= */}
      <section id="why-spectre" className="py-16 sm:py-20 bg-white border-b border-border scroll-mt-20">
        <span id="philosophy" className="sr-only" aria-hidden="true" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-academic bg-surface-blue border border-academic/20 px-2.5 py-0.5 rounded-sm mb-3">
              Institutional Principle
            </span>
            <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-navy tracking-tight leading-[1.2]">
              Not every good teacher is the right teacher for every student.
            </h2>
            <div className="h-0.5 w-12 bg-academic mx-auto my-6" />
            <div className="text-sm sm:text-base text-slate-dark leading-relaxed space-y-4 text-left sm:text-center">
              <p>
                In conventional schooling, an educator is assigned based on administrative schedules and room capacity. A student who learns through intuitive, multi-step problem solving is placed in the same room as one who requires patient arithmetic reinforcement.
              </p>
              <p className="font-semibold text-navy text-base sm:text-lg">
                Spectre Education begins with an opposite premise: instruction must bend around the cognitive pace of the learner.
              </p>
            </div>
          </div>

          {/* Three Foundational Principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {[
              {
                title: 'Subject Compatibility',
                desc: 'An educator who scored 99% in university physics may struggle to explain foundational algebra to a hesitant Class 8 student. We pair educators based on pedagogical communication style, not paper prestige alone.',
              },
              {
                title: 'Pedagogical Patience',
                desc: 'Confidence is rarely built through authoritative pressure. It develops when a student feels safe to ask the unasked question without fear of embarrassment.',
              },
              {
                title: 'Methodological Consistency',
                desc: 'Sporadic cramming before exams creates chronic academic anxiety. A structured weekly schedule builds sustainable mastery and calm exam temperament.',
              },
            ].map((principle) => (
              <div key={principle.title} className="p-6 rounded-sm bg-warm-white border border-border flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-sm bg-surface-blue text-academic flex items-center justify-center font-bold text-xs mb-3">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base text-navy mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-xs text-slate-dark leading-relaxed">
                    {principle.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — COMMON ACADEMIC NEEDS
         ========================================================================= */}
      <section className="py-16 sm:py-20 bg-warm-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Personalised Academic Support"
            title="What kind of support does your child need?"
            subtitle="Every student experiences friction differently. Select an area below to align your enquiry directly with our academic team."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CHILD_NEED_CARDS.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => handleNeedCardClick(card.helpValue)}
                className="group text-left bg-white p-5 rounded-sm border border-border hover:border-academic transition-colors shadow-xs flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-base text-navy mb-2 group-hover:text-academic transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-dark leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-navy">
                  <span>Enquire for this objective</span>
                  <ArrowRight className="w-3.5 h-3.5 text-academic transform group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — WHY INDIVIDUAL ATTENTION MATTERS
         ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Tailored Instruction"
            title="The structural advantages of one-to-one learning"
            subtitle="How individual academic mentorship resolves the systemic shortcomings of standard batch coaching."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PERSONALISATION_POINTS.map((pt) => (
              <div
                key={pt.number}
                className="p-6 rounded-sm bg-warm-white border border-border flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-academic uppercase tracking-widest block mb-2">
                    {pt.number}
                  </span>
                  <h3 className="font-bold text-base text-navy mb-2">
                    {pt.title}
                  </h3>
                  <p className="text-xs text-slate-dark leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 — OUR THREE PILLARS
         ========================================================================= */}
      <section id="services" className="py-16 sm:py-24 bg-warm-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Institutional Structure"
            title="Our Three Educational Services"
            subtitle="Designed to support students from daily conceptual clarity through senior school transitions."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {EDUCATIONAL_SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-border rounded-sm p-6 sm:p-7 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-academic bg-surface-blue border border-academic/20 px-2 py-0.5 rounded-sm mb-3">
                    {service.tag}
                  </span>
                  <h3 className="font-bold text-xl text-navy mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-dark font-medium mb-4">
                    {service.lead}
                  </p>
                  <p className="text-xs text-slate-dark leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <div className="space-y-2 border-t border-border pt-4 mb-5">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-dark">
                        <CheckCircle2 className="w-3.5 h-3.5 text-academic mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {service.note && (
                    <p className="text-[11px] text-slate italic border-l-2 border-academic/40 pl-3 py-1 mb-5">
                      {service.note}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <Link
                    to={service.detailLink || service.actionLink}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-navy hover:text-academic transition-colors"
                  >
                    <span>Read Overview</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  {service.isExternal ? (
                    <a
                      href={service.actionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-academic hover:underline"
                    >
                      <span>{service.actionText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      to={service.actionLink}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-academic hover:underline"
                    >
                      <span>{service.actionText} →</span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 — METHODOLOGY / HOW IT WORKS
         ========================================================================= */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-white border-b border-border scroll-mt-20">
        <span id="our-approach" className="sr-only" aria-hidden="true" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Methodology"
            title="How Spectre Considers Educator Suitability"
            subtitle="From initial intake to structured monthly reviews, every placement is human-curated."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECTRE_APPROACH_STEPS.map((step) => (
              <div
                key={step.number}
                className="bg-warm-white border border-border rounded-sm p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-7 h-7 rounded-sm bg-navy text-white text-xs font-bold flex items-center justify-center mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-base text-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-dark leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button to="/request-tutor" variant="primary" size="lg">
              Begin by Requesting an Educator
            </Button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 — DELIBERATE SPECIALISATION (SUBJECTS)
         ========================================================================= */}
      <section id="subjects" className="py-16 sm:py-20 bg-warm-white border-b border-border scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Deliberate Specialisation"
            title="Subjects We Support"
            subtitle="We do not attempt to be everything to everyone. We concentrate strictly on core academic disciplines across Classes 6–12 in Delhi."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUBJECTS_DATA.map((subject) => (
              <div
                key={subject.name}
                className="p-6 bg-white border border-border rounded-sm shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-xl text-navy">
                      {subject.name}
                    </h3>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-surface-blue text-academic border border-academic/20">
                      {subject.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-dark mb-5 leading-relaxed">
                    {subject.description}
                  </p>
                  <div className="space-y-1.5 border-t border-border pt-4 mb-5">
                    {subject.topics.map((t, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-dark">
                        <div className="w-1.5 h-1.5 rounded-full bg-academic mt-1.5 shrink-0" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Link
                    to="/private-tutoring"
                    className="text-xs font-semibold text-navy hover:text-academic flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Subject Curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8 — INSTITUTIONAL STANDARDS (VETTING)
         ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Vetting Standards"
            title="Educator Selection Standards"
            subtitle="Fewer than 12% of applicants are invited to represent Spectre Education. We evaluate character, clarity, and patience just as rigorously as degrees."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {EDUCATOR_STANDARDS.map((std) => (
              <div
                key={std.title}
                className="p-6 bg-warm-white border border-border rounded-sm"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-7 h-7 rounded-sm bg-navy text-white flex items-center justify-center text-xs">
                    <UserCheck className="w-3.5 h-3.5 text-academic-light" />
                  </div>
                  <h3 className="font-bold text-base text-navy">
                    {std.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-dark leading-relaxed">
                  {std.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-sm bg-surface border border-border flex items-start gap-3 text-xs text-slate-dark">
            <ShieldCheck className="w-4 h-4 text-academic shrink-0 mt-0.5" />
            <p>
              <strong className="text-navy font-semibold">Institutional Safety Protocol:</strong> All educators undergo address and identity verification, academic document checks, and adhere to a strict professional code of conduct in your home.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9 — PARENT DIAGNOSTIC REFLECTION
         ========================================================================= */}
      <section className="py-16 sm:py-20 bg-warm-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-academic bg-surface-blue border border-academic/20 px-2.5 py-0.5 rounded-sm mb-3">
              Diagnostic Reflection
            </span>
            <h2 className="font-bold text-2xl sm:text-3xl text-navy mb-3">
              Questions to consider before choosing an educator
            </h2>
            <p className="text-xs sm:text-sm text-slate-dark max-w-2xl mx-auto leading-relaxed">
              Before inviting an educator into your home, reflecting on these diagnostic questions helps clarify your child’s actual learning needs.
            </p>
          </div>

          <div className="space-y-4">
            {PARENT_DIAGNOSTIC_QUESTIONS.map((q, idx) => (
              <div
                key={idx}
                className="p-5 bg-white border border-border rounded-sm flex items-start gap-4 shadow-xs"
              >
                <span className="font-mono text-xs text-academic font-bold shrink-0 mt-0.5">
                  {`0${idx + 1}`}
                </span>
                <p className="text-xs sm:text-sm text-navy leading-relaxed font-medium">
                  {q}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-surface-blue border border-academic/20 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-navy">
                Unsure which approach matches your child?
              </p>
              <p className="text-xs text-slate-dark mt-0.5">
                Speak directly with our academic coordinator in Delhi for an objective conversation.
              </p>
            </div>
            <a
              href={`https://wa.me/${SITE_METADATA.coordinatorWhatsApp}?text=Hi%20Spectre%20Education!%20I%20would%20like%20to%20discuss%20my%20child's%20academic%20requirements.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-navy text-white text-xs font-semibold hover:bg-midnight transition-colors shrink-0 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-academic-light" />
              <span>Speak with an Advisor</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9.5 — PARENT PERSPECTIVES & EDITORIAL RESOURCES
         ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-sm bg-surface-blue text-academic text-[11px] font-semibold uppercase tracking-wider mb-2 border border-academic/20">
                Academic Perspectives
              </span>
              <h2 className="font-bold text-2xl sm:text-3xl text-navy">
                Guidance for Thoughtful Parents
              </h2>
              <p className="text-xs sm:text-sm text-slate-dark max-w-xl mt-1 leading-relaxed">
                Objective insights on private tutoring, study architecture, and curriculum transitions written for families in Delhi.
              </p>
            </div>
            <Link
              to="/parent-resources"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-academic hover:underline mt-4 sm:mt-0"
            >
              <span>View All Parent Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARTICLES.slice(0, 3).map((article) => (
              <article
                key={article.slug}
                className="p-6 bg-warm-white border border-border rounded-sm shadow-xs flex flex-col justify-between hover:border-academic transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-dark mb-3">
                    <span className="px-2 py-0.5 rounded-sm bg-surface-blue text-academic text-[11px] font-semibold border border-academic/20">
                      {article.category}
                    </span>
                    <span className="text-[11px]">{article.readTime}</span>
                  </div>

                  <h3 className="font-bold text-lg text-navy mb-2 group-hover:text-academic transition-colors leading-snug">
                    <Link to={`/parent-resources/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-dark leading-relaxed mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-[11px] text-slate">
                    {article.publishDate}
                  </span>
                  <Link
                    to={`/parent-resources/${article.slug}`}
                    className="inline-flex items-center text-xs font-semibold text-navy group-hover:text-academic transition-colors"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10 — FAQ
         ========================================================================= */}
      <section id="faq" className="py-16 sm:py-20 bg-warm-white border-b border-border scroll-mt-20">
        <span id="faqs" className="sr-only" aria-hidden="true" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Frequently Asked Questions"
            title="Common Questions from Parents"
            subtitle="Straightforward answers about our educators, home visit logistics, and matching standards in Delhi."
          />

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-border rounded-sm overflow-hidden bg-white shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-surface transition-colors"
                  >
                    <span className="font-bold text-sm sm:text-base text-navy">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate transition-transform duration-200 shrink-0 ml-3 ${
                        isOpen ? 'transform rotate-180 text-academic' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-dark leading-relaxed border-t border-border pt-3">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11 — FINAL INSTITUTIONAL CTA
         ========================================================================= */}
      <section className="py-16 sm:py-20 bg-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-academic-light bg-white/10 px-2.5 py-0.5 rounded-sm">
            Begin with a Considered Consultation
          </span>

          <h2 className="font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
            Every child’s education deserves individual consideration.
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Tell us about your child’s grade, specific subject challenges, and learning pace. We will introduce an educator thoughtfully suited to their needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Consultation</span>
            </a>
          </div>

          <p className="text-[11px] text-slate-400 pt-2">
            No long-term contracts &middot; Trial session before regular schedule &middot; Dedicated in Delhi
          </p>
        </div>
      </section>

    </div>
  );
};
