import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  MessageSquare
} from 'lucide-react';
import { Button } from '../components/Button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ARTICLES } from '../data/articles';
import { SITE_METADATA } from '../data/content';

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const article = ARTICLES.find((a) => a.slug === slug);

  useDocumentTitle(
    article ? article.title : 'Article Not Found',
    article ? article.excerpt : undefined
  );

  if (!article) {
    return <Navigate to="/parent-resources" replace />;
  }

  const relatedArticles = ARTICLES.filter((a) => article.relatedSlugs.includes(a.slug));

  const contextualCTA = (() => {
    if (article.category === 'Academic Mentorship') {
      return {
        label: 'Looking to build structured study habits for your child?',
        actionText: 'Enquire About Mentorship',
        link: '/request-guidance?type=mentorship',
      };
    }
    if (article.category === 'Educational Guidance') {
      return {
        label: 'Facing Class 10–11 stream decisions or subject choices?',
        actionText: 'Request Guidance Advisory',
        link: '/request-guidance?type=stream-selection',
      };
    }
    return {
      label: 'Looking for an educator who matches your child’s learning temperament?',
      actionText: 'Request an Educator',
      link: '/request-tutor',
    };
  })();

  const whatsappInquiryUrl = `https://wa.me/${SITE_METADATA.coordinatorWhatsApp}?text=Hi%20Spectre%20Education!%20I%20just%20read%20your%20article%20on%20"${encodeURIComponent(article.title)}"%20and%20would%20like%20to%20discuss%20my%20child's%20education.`;

  return (
    <div className="bg-warm-white min-h-screen text-navy font-sans">
      {/* Article Header & Breadcrumbs */}
      <section className="pt-8 pb-12 sm:pt-14 sm:pb-16 border-b border-border bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-slate mb-6">
            <Link to="/" className="hover:text-navy transition-colors">Home</Link>
            <span>/</span>
            <Link to="/parent-resources" className="hover:text-navy transition-colors">Parent Resources</Link>
            <span>/</span>
            <span className="text-navy font-semibold truncate max-w-[200px] sm:max-w-xs">{article.category}</span>
          </nav>

          {/* Category & Read Time */}
          <div className="flex items-center space-x-3 mb-4">
            <span className="px-2.5 py-0.5 rounded-sm text-xs font-semibold uppercase tracking-wider bg-surface-blue text-academic border border-academic/20">
              {article.category}
            </span>
            <div className="flex items-center space-x-1.5 text-xs text-slate">
              <Clock className="w-3.5 h-3.5 text-academic" />
              <span>{article.readTime}</span>
            </div>
            <span className="text-xs text-slate hidden sm:inline">
              · Published {article.publishDate}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-navy leading-[1.2] mb-4 tracking-tight">
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-dark leading-relaxed mb-6 font-normal">
            {article.subtitle}
          </p>

          {/* Author Attribution */}
          <div className="flex items-center justify-between pt-5 border-t border-border text-xs text-slate">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-sm bg-navy flex items-center justify-center text-white font-bold text-xs">
                SE
              </div>
              <div>
                <p className="font-bold text-navy">Spectre Education Academic Team</p>
                <p className="text-[11px] text-slate">Curated for Parents & Families in Delhi</p>
              </div>
            </div>
            <Link
              to="/parent-resources"
              className="inline-flex items-center text-xs text-academic hover:underline font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Back to Resources</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Article Body Content */}
      <article className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Key Takeaways Callout Box */}
          <div className="p-6 rounded-sm bg-surface-blue border-l-4 border-l-academic border-y border-r border-border shadow-xs mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-academic block mb-3">
              Key Academic Takeaways
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-dark">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-academic mt-0.5 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content Sections */}
          <div className="space-y-10 text-slate-dark text-base sm:text-base leading-relaxed">
            {article.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="font-bold text-xl sm:text-2xl text-navy mt-8 mb-3 border-b border-border pb-2 tracking-tight">
                  {sec.heading}
                </h2>
                {sec.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className="leading-[1.7] text-slate-dark text-sm sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Contextual Consultation Callout */}
          <div className="mt-12 p-6 rounded-sm bg-surface border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-academic uppercase tracking-wider block mb-1">
                Parent Consultation
              </span>
              <p className="text-xs sm:text-sm text-navy font-semibold">
                {contextualCTA.label}
              </p>
            </div>
            <Button to={contextualCTA.link} variant="primary" size="sm" className="shrink-0">
              {contextualCTA.actionText}
            </Button>
          </div>

          {/* Article Specific FAQ Section */}
          {article.faqs && article.faqs.length > 0 && (
            <div className="mt-14 pt-10 border-t border-border">
              <h3 className="font-bold text-xl text-navy mb-6">
                Related Questions from Parents
              </h3>
              <div className="space-y-3">
                {article.faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={index} className="border border-border rounded-sm overflow-hidden bg-white shadow-xs">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full text-left px-5 py-3.5 flex items-center justify-between text-navy font-bold text-xs sm:text-sm hover:bg-surface transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate transition-transform duration-200 shrink-0 ml-3 ${
                            isOpen ? 'transform rotate-180 text-academic' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-dark leading-relaxed border-t border-border">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Direct WhatsApp Consultation Box */}
          <div className="mt-12 p-6 rounded-sm bg-navy text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div>
              <h4 className="font-bold text-base sm:text-lg mb-1">Have a specific question about your child?</h4>
              <p className="text-xs text-slate-300">Speak directly with our academic coordinator in Delhi.</p>
            </div>
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-sm bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs transition-colors shrink-0 shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>
        </div>
      </article>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="py-14 border-t border-border bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-bold text-xl text-navy mb-6">
              Recommended Perspectives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div key={rel.slug} className="p-5 bg-warm-white border border-border rounded-sm flex flex-col justify-between hover:border-academic transition-colors">
                  <div>
                    <span className="text-[10px] text-academic uppercase font-bold tracking-wider block mb-2">
                      {rel.category}
                    </span>
                    <h4 className="font-bold text-base text-navy mb-2 leading-snug">
                      <Link to={`/parent-resources/${rel.slug}`} className="hover:text-academic transition-colors">
                        {rel.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-slate-dark line-clamp-2 mb-4">
                      {rel.excerpt}
                    </p>
                  </div>
                  <Link
                    to={`/parent-resources/${rel.slug}`}
                    className="inline-flex items-center text-xs font-semibold text-academic hover:underline pt-3 border-t border-border"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
