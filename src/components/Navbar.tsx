import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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

  const navLinks = [
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Why Spectre', href: '/#why-spectre' },
    { label: 'Subjects', href: '/#subjects' },
    { label: 'FAQ', href: '/#faq' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-parchment/95 backdrop-blur-sm border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-md bg-navy flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-[1.02]">
                <svg className="w-5 h-5 text-trust" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg text-navy tracking-tight leading-tight">
                  Spectre Tutors Network
                </span>
                <span className="text-xs text-ink-muted font-medium tracking-normal">
                  Delhi · Classes 6–12
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-sm font-medium text-ink/80 hover:text-navy transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <Button to="/request-tutor" variant="primary" size="md">
                Request a Tutor
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-md text-ink hover:text-navy hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-navy"
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
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-Out Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 w-full max-w-xs h-full bg-parchment shadow-xl border-l border-border-subtle p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-border-subtle">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-md bg-navy flex items-center justify-center text-white">
                <svg className="w-4 h-4 text-trust" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <span className="font-heading font-bold text-base text-navy">Spectre Tutors</span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 flex flex-col space-y-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-ink hover:text-navy py-1.5"
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-base font-medium text-ink hover:text-navy py-1.5"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Drawer Footer CTA */}
        <div className="pt-6 border-t border-border-subtle flex flex-col space-y-3">
          <Button
            to="/request-tutor"
            variant="primary"
            size="lg"
            className="w-full flex items-center justify-center gap-2"
          >
            <span>Request a Tutor</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
          <p className="text-xs text-center text-ink-muted">
            1-on-1 Home Tuition in Delhi
          </p>
        </div>
      </aside>
    </>
  );
};
