import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageSquare } from 'lucide-react';
import { SITE_METADATA } from '../data/content';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-slate-300 border-t border-navy-dark pt-14 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-navy-light/40">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center text-trust">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <span className="font-heading font-bold text-xl text-white tracking-tight">
                {SITE_METADATA.name}
              </span>
            </div>
            <p className="text-slate-300 text-sm max-w-sm leading-relaxed">
              {SITE_METADATA.tagline} Focused 1-on-1 home tutoring for Classes 6–12 across Delhi.
            </p>
            <div className="flex flex-col space-y-2 pt-2 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-trust" />
                <span>Delhi, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <a 
                  href={`https://wa.me/${SITE_METADATA.coordinatorWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {SITE_METADATA.displayPhone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-trust" />
                <a href={`mailto:${SITE_METADATA.supportEmail}`} className="hover:text-white transition-colors">
                  {SITE_METADATA.supportEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white text-sm tracking-wide uppercase">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/#why-spectre" className="hover:text-white transition-colors">
                  Why Spectre
                </a>
              </li>
              <li>
                <a href="/#subjects" className="hover:text-white transition-colors">
                  Subjects Covered
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Service Focus */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white text-sm tracking-wide uppercase">
              Parent Service
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/request-tutor" className="text-trust hover:underline font-medium">
                  Request a Tutor →
                </Link>
              </li>
              <li>Mathematics (Classes 6–12)</li>
              <li>Science (Classes 6–12)</li>
              <li>English (Classes 6–12)</li>
              <li>In-Person Home Sessions</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and legal disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 space-y-3 sm:space-y-0">
          <p>© 2026 Spectre Tutors Network. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/admin" className="text-slate-500 hover:text-slate-400 transition-colors">
              Operator Portal
            </Link>
            <span>Delhi Home Tutoring</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
