import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageSquare, BookOpen } from 'lucide-react';
import { SITE_METADATA } from '../data/content';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-slate-300 border-t border-midnight pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-sm bg-white/10 flex items-center justify-center text-white">
                <BookOpen className="w-4 h-4 text-academic-light" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight uppercase">
                Spectre Education
              </span>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm max-w-sm leading-relaxed">
              An institutional approach to private tutoring. Thoughtfully matched educators, personalised academic support and mentorship for Classes 6–12 across Delhi.
            </p>
            <div className="flex flex-col space-y-2 pt-2 text-xs text-slate-400 font-medium">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-academic-light" />
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
                <Mail className="w-4 h-4 text-academic-light" />
                <a href={`mailto:${SITE_METADATA.supportEmail}`} className="hover:text-white transition-colors">
                  {SITE_METADATA.supportEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Dedicated Services */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-xs tracking-wider uppercase">
              Curated Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/private-tutoring" className="hover:text-white transition-colors">
                  Private Tutoring
                </Link>
              </li>
              <li>
                <Link to="/mentorship" className="hover:text-white transition-colors">
                  Academic Mentorship
                </Link>
              </li>
              <li>
                <Link to="/career-guidance" className="hover:text-white transition-colors">
                  Educational & Stream Guidance
                </Link>
              </li>
              <li>
                <Link to="/parent-resources" className="hover:text-white transition-colors">
                  Parent Resources & Guides
                </Link>
              </li>
              <li>
                <Link to="/apply-educator" className="text-academic-light hover:text-white transition-colors font-medium">
                  Become an Educator
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Focus */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-xs tracking-wider uppercase">
              For Families
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <Link to="/request-tutor" className="text-white hover:underline font-semibold">
                  Request an Educator →
                </Link>
              </li>
              <li>
                <Link to="/private-tutoring" className="hover:text-white transition-colors">
                  Mathematics & Science (Classes 6–12)
                </Link>
              </li>
              <li>
                <Link to="/private-tutoring" className="hover:text-white transition-colors">
                  English Language & Literature
                </Link>
              </li>
              <li>
                <Link to="/mentorship" className="hover:text-white transition-colors">
                  Study Planning & Habit Mentorship
                </Link>
              </li>
              <li>
                <Link to="/career-guidance" className="hover:text-white transition-colors">
                  Class 10–11 Stream Planning
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and legal disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 space-y-3 sm:space-y-0">
          <p>© 2026 Spectre Education. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-slate-500 hidden sm:inline">·</span>
            <span>Delhi · Private One-to-One Education</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
