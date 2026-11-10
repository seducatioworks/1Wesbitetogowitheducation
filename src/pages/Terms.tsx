import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Mail } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { SITE_METADATA } from '../data/content';

export const Terms: React.FC = () => {
  useDocumentTitle(
    'Terms of Service | Spectre Education',
    'Terms and conditions governing Spectre Education’s private tutoring coordination, educator matching, and advisory services in Delhi.'
  );

  return (
    <div className="min-h-screen bg-warm-white py-12 sm:py-16 text-navy font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-xs font-semibold text-slate hover:text-navy transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            <span>Return to Homepage</span>
          </Link>
        </div>

        {/* Header */}
        <header className="border-b border-border pb-8 mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-surface-blue border border-academic/20 text-xs font-semibold text-academic uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Service Terms & Operating Principles</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-3">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-slate-dark">
            Last Updated: November 2026 · Governing Coordination Services in Delhi
          </p>
        </header>

        {/* Content Body */}
        <div className="space-y-10 text-sm sm:text-base text-slate-dark leading-relaxed font-body">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy">
              1. Nature of the Coordination Service
            </h2>
            <p>
              Spectre Education provides private education consultancy, bespoke educator matching, and academic guidance for families in Delhi. We act as a trusted introduction and quality-coordination intermediary between parents seeking tailored academic instruction and independent, qualified educators.
            </p>
            <p>
              By accessing this website, submitting an enquiry form, or initiating a WhatsApp conversation with our coordination line, you acknowledge and agree to these Terms of Service.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy">
              2. Educator Screening & Vetting Limitations
            </h2>
            <p>
              Spectre Education exercises diligence in evaluating educators before recommending them to families. Our curation process includes:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>Verification of declared academic credentials and qualifications.</li>
              <li>Subject-matter interviews and pedagogical assessment.</li>
              <li>Reference and professional teaching history checks.</li>
            </ul>
            <p className="text-xs sm:text-sm bg-surface p-4 rounded-sm border border-border">
              <strong>Supervisory Responsibility:</strong> While we curate educators rigorously, tutors operate as independent educational contractors. Private tutoring takes place within the student’s residence. Parents or legal guardians retain primary supervisory responsibility during in-home instruction. We advise parents to remain present on the premises during scheduled home sessions.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy">
              3. Parent & Family Responsibilities
            </h2>
            <p>Families utilizing our services agree to:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>Provide accurate information regarding the student’s academic grade, board, and specific subject requirements.</li>
              <li>Ensure a safe, quiet, and conducive learning environment in the home for scheduled tutoring sessions.</li>
              <li>Communicate schedule adjustments, cancellations, or illness with reasonable advance notice (minimum 12–24 hours).</li>
              <li>Treat educators with professional dignity and mutual courtesy.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy">
              4. Educator Responsibilities
            </h2>
            <p>Independent educators represented in our network agree to:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>Deliver disciplined, prepared, and punctual one-to-one instruction aligned with the student’s curriculum.</li>
              <li>Maintain the highest standards of professional ethics, student safeguarding, and academic integrity.</li>
              <li>Provide transparent feedback on student progress to the parent and academic coordinator.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy">
              5. Fees, Sessions & Scheduling
            </h2>
            <p>
              Tutoring engagement terms, hourly or monthly fee structures, and lesson frequencies are agreed upon following the initial academic diagnostic and educator introduction. Payment terms and coordination fee schedules are confirmed in writing between the family and Spectre Education prior to regular session commencement.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy">
              6. Academic Results & Limitation of Liability
            </h2>
            <p>
              Spectre Education is committed to thoughtful, high-calibre educational instruction and mentorship. However, academic performance, school examinations, and board grades depend on multiple factors, including student dedication, foundational skills, and individual effort.
            </p>
            <p>
              Spectre Education does not guarantee specific numerical examination scores, ranks, or board results. To the maximum extent permitted by applicable Indian law, Spectre Education’s total aggregate liability arising out of our coordination services shall be limited to the introduction or coordination fees received for the relevant engagement.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy flex items-center gap-2">
              <Mail className="w-5 h-5 text-academic shrink-0" />
              <span>7. Inquiries & Dispute Redressal</span>
            </h2>
            <p>
              If you have any questions, feedback, or concerns regarding your tutoring engagement or these Terms, please contact:
            </p>
            <div className="bg-white p-5 rounded-sm border border-border shadow-xs text-xs sm:text-sm space-y-1">
              <p className="font-bold text-navy">Spectre Education Coordination</p>
              <p>Email: <a href={`mailto:${SITE_METADATA.supportEmail}`} className="text-academic font-medium hover:underline">{SITE_METADATA.supportEmail}</a></p>
              <p>Coordinator Line: <span className="font-medium">{SITE_METADATA.displayPhone}</span></p>
              <p>Location: Delhi, India</p>
            </div>
          </section>

        </div>

        {/* Footer CTA Back to Home */}
        <div className="mt-12 pt-6 border-t border-border flex items-center justify-between text-xs text-slate">
          <span>Spectre Education · Delhi, India</span>
          <Link to="/privacy-policy" className="text-academic font-semibold hover:underline">
            View Privacy Policy →
          </Link>
        </div>

      </div>
    </div>
  );
};
