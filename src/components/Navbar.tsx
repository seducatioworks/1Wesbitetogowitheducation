import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface NavLinkItem {
  id: string;
  label: string;
  href: string;
}

const navLinks: NavLinkItem[] = [
  { id: 'hero', label: 'Home', href: '/#hero' },
  { id: 'how-it-works', label: 'How It Works', href: '/#how-it-works' },
  { id: 'why-spectre', label: 'Why Spectre', href: '/#why-spectre' },
  { id: 'subjects', label: 'Subjects', href: '/#subjects' },
  { id: 'faq', label: 'FAQs', href: '/#faq' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const isScrollingRef = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Reset mobile drawer on route change during render without cascading effect passes
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Scroll to section with sticky navbar offset
  const scrollToSection = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 76; // Header height offset
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const targetPosition = elementPosition - navHeight;
      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth',
      });
    }
  };

  // Scroll-aware IntersectionObserver for active section tracking on Home page
  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }

    const sectionIds = ['hero', 'how-it-works', 'why-spectre', 'subjects', 'faq'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;

        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-76px 0px -40% 0px',
        threshold: [0, 0.2, 0.4, 0.6, 0.8],
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Handle boundary edges (top & bottom of page)
    const handleScroll = () => {
      if (isScrollingRef.current) return;
      if (window.scrollY < 100) {
        setActiveSection('hero');
      } else if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveSection('faq');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname === '/') {
      isScrollingRef.current = true;
      setActiveSection(id);
      scrollToSection(id);

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 850);
    } else {
      navigate('/#' + id);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F7F4EC]/95 backdrop-blur-sm border-b border-[#E8E2D5] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px] sm:h-20">
            {/* Brand Identity: Emblem + Typographic Wordmark */}
            <Link
              to="/"
              className="flex items-center gap-2.5 sm:gap-3 shrink-0 focus:outline-none focus:ring-2 focus:ring-academic rounded-sm py-1 transition-opacity hover:opacity-95"
              aria-label="Spectre Education Home"
            >
              <img
                src="/images/mainlogospectresvg.svg"
                alt="Spectre Education Emblem"
                className="h-[48px] sm:h-[54px] lg:h-[63px] w-auto object-contain shrink-0"
              />
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-[19px] sm:text-[20px] lg:text-[22px] text-[#1B325F] tracking-tight leading-none uppercase">
                  SPECTRE
                </span>
                <span className="font-semibold text-[8.5px] sm:text-[9px] text-[#1B325F] tracking-[2.8px] leading-tight mt-1 uppercase">
                  EDUCATION
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1.5 xl:space-x-3">
              {navLinks.map((link) => {
                const isActive = location.pathname === '/' && activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-[4px] transition-all duration-250 ease-out hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none focus:outline-none focus-visible:ring-2 focus-visible:ring-academic ${
                      isActive
                        ? 'bg-[#172B4D] text-[#FFF4E3] shadow-xs'
                        : 'bg-transparent text-[#172B4D] hover:bg-[#172B4D] hover:text-[#FFF4E3]'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center space-x-3 shrink-0">
              <Button to="/apply-educator" variant="secondary" size="sm" className="hidden xl:inline-flex">
                Become an Educator
              </Button>
              <Button to="/request-tutor" variant="primary" size="sm">
                Request an Educator
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -mr-1 rounded-sm text-navy hover:bg-[#EFE8DA] focus:outline-none focus:ring-2 focus:ring-academic"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-Out Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 w-full max-w-xs h-full bg-[#F7F4EC] shadow-xl border-l border-[#E8E2D5] p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#E8E2D5]">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 shrink-0 focus:outline-none"
              aria-label="Spectre Education Home"
            >
              <img
                src="/images/mainlogospectresvg.svg"
                alt="Spectre Education Emblem"
                className="h-[48px] w-auto object-contain shrink-0"
              />
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-[19px] text-[#1B325F] tracking-tight leading-none uppercase">
                  SPECTRE
                </span>
                <span className="font-semibold text-[8.5px] text-[#1B325F] tracking-[2.8px] leading-tight mt-1 uppercase">
                  EDUCATION
                </span>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-sm text-slate hover:text-navy hover:bg-[#EFE8DA]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === '/' && activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`text-sm font-semibold px-4 py-2.5 rounded-[4px] transition-all duration-250 ease-out block ${
                    isActive
                      ? 'bg-[#172B4D] text-[#FFF4E3]'
                      : 'bg-transparent text-[#172B4D] hover:bg-[#172B4D] hover:text-[#FFF4E3]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Drawer Footer CTAs */}
        <div className="pt-6 border-t border-border flex flex-col space-y-2.5 mt-6">
          <Button
            to="/request-tutor"
            variant="primary"
            size="md"
            className="w-full flex items-center justify-center gap-2"
          >
            <span>Request an Educator</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            to="/apply-educator"
            variant="secondary"
            size="md"
            className="w-full flex items-center justify-center gap-2"
          >
            <span>Become an Educator</span>
          </Button>
          <p className="text-[11px] text-center text-slate pt-1">
            Private 1-on-1 Education in Delhi
          </p>
        </div>
      </aside>
    </>
  );
};
