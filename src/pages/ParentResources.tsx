import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Search
} from 'lucide-react';
import { Button } from '../components/Button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ARTICLES } from '../data/articles';

export const ParentResources: React.FC = () => {
  useDocumentTitle(
    'Parent Resources & Academic Perspectives',
    'Curated educational perspectives for parents on private home tutoring, academic mentorship, study habits, and stream selection in Delhi.'
  );

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const cats = ['All'];
    ARTICLES.forEach((a) => {
      if (!cats.includes(a.category)) {
        cats.push(a.category);
      }
    });
    return cats;
  }, []);

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      const matchesQuery = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = ARTICLES[0]; // "How to Choose the Right Home Tutor for Your Child"

  return (
    <div className="bg-warm-white min-h-screen text-navy font-sans">
      {/* Header */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 border-b border-border bg-warm-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-semibold bg-surface-blue text-academic border border-academic/20 uppercase tracking-wider">
              Academic Perspectives & Guides
            </span>
          </div>

          <h1 className="font-extrabold text-3xl sm:text-5xl md:text-5xl text-navy tracking-tight leading-[1.18] mb-4">
            Parent Resources & Guides
          </h1>

          <p className="text-base sm:text-lg text-slate-dark mb-6 max-w-3xl leading-relaxed">
            Thoughtful, objective perspectives to support parents navigating private education, study habits, and curricular transitions.
          </p>

          <p className="text-sm sm:text-base text-slate-dark max-w-2xl leading-relaxed mb-8">
            Authored by educators and academic advisors with deep familiarity with Indian school curricula (CBSE, ICSE), these articles provide practical, unvarnished guidance without marketing hyperbole.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2 max-w-2xl">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-slate absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-white border border-border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-academic text-navy shadow-xs"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-navy text-white shadow-xs'
                    : 'bg-white border border-border text-slate-dark hover:text-navy hover:bg-surface'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article Section */}
      {selectedCategory === 'All' && !searchQuery && featuredArticle && (
        <section className="py-12 border-b border-border bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border border-border rounded-sm bg-warm-white p-6 sm:p-8 relative overflow-hidden shadow-xs">
              <div className="flex items-center space-x-3 mb-3">
                <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider bg-surface-blue text-academic border border-academic/20">
                  Featured Reading
                </span>
                <span className="text-xs text-slate font-medium">
                  {featuredArticle.category} · {featuredArticle.readTime}
                </span>
              </div>

              <h2 className="font-bold text-2xl sm:text-3xl text-navy mb-3 leading-tight">
                <Link to={`/parent-resources/${featuredArticle.slug}`} className="hover:text-academic transition-colors">
                  {featuredArticle.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-slate-dark leading-relaxed mb-6 max-w-3xl">
                {featuredArticle.excerpt}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-border text-xs text-slate">
                <div>
                  Published {featuredArticle.publishDate} · By Spectre Academic Team
                </div>
                <Link
                  to={`/parent-resources/${featuredArticle.slug}`}
                  className="inline-flex items-center text-xs sm:text-sm font-semibold text-academic hover:underline group"
                >
                  <span>Read Complete Article</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-16 md:py-20 border-b border-border bg-warm-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-bold text-xl sm:text-2xl text-navy">
              {selectedCategory === 'All' ? 'All Editorial Articles' : `${selectedCategory} Articles`}
            </h2>
            <span className="text-xs text-slate font-medium">
              Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="p-12 text-center bg-white border border-border rounded-sm">
              <BookOpen className="w-10 h-10 text-slate mx-auto mb-3 opacity-40" />
              <h3 className="font-bold text-lg text-navy mb-1">No articles found</h3>
              <p className="text-xs text-slate-dark">
                Try clearing your search terms or selecting a different category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 rounded-sm bg-navy text-white text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <article
                  key={article.slug}
                  className="p-6 bg-white border border-border rounded-sm shadow-xs flex flex-col justify-between hover:border-academic transition-colors group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-dark mb-3">
                      <span className="px-2 py-0.5 rounded-sm bg-surface-blue text-academic text-[11px] font-semibold border border-academic/20">
                        {article.category}
                      </span>
                      <div className="flex items-center space-x-1.5 text-slate">
                        <Clock className="w-3.5 h-3.5 text-academic" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-lg sm:text-xl text-navy mb-2 group-hover:text-academic transition-colors leading-snug">
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
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Advisory Banner */}
      <section className="py-16 md:py-20 bg-navy text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-wider text-academic-light block mb-2 font-semibold">
            In-Home Education in Delhi
          </span>
          <h2 className="font-extrabold text-2xl sm:text-4xl font-semibold mb-4 text-white">
            Have Questions About Your Child’s Education?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Our academic coordinator is available to discuss your child’s current grade, school curriculum, and specific subject requirements.
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
            <Button
              to="/private-tutoring"
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10 w-full sm:w-auto font-semibold"
            >
              Explore Private Tutoring
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
