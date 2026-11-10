import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Clock, Mail } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { SITE_METADATA } from '../data/content';

export const PrivacyPolicy: React.FC = () => {
  useDocumentTitle(
    'Privacy Policy | Spectre Education',
    'Spectre Education’s privacy practices: how we collect, handle, and protect personal and student information for private tutoring in Delhi.'
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
            <Shield className="w-3.5 h-3.5" />
            <span>Privacy Notice & Data Handling</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-dark">
            Last Updated: November 2026 · Applicable to Spectre Education Website & Coordination Services
          </p>
        </header>

        {/* Content Body */}
        <div className="space-y-10 text-sm sm:text-base text-slate-dark leading-relaxed font-body">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy flex items-center gap-2">
              <span>1. Overview & Service Architecture</span>
            </h2>
            <p>
              Spectre Education is an in-person, curated private tutoring and educational guidance service operating in Delhi, India. We connect families with thoughtfully matched, independent educators for Classes 6–12 across Mathematics, Science, and English, alongside academic mentorship and stream advisory services.
            </p>
            <p>
              Our intake system operates on a <strong>WhatsApp-first architecture</strong>. When you submit an enquiry or educator application on this website, your inputs are compiled into a structured message and transmitted directly via WhatsApp Click-to-Chat to our academic coordinator. We do not maintain an automated public database or user accounts on this website.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy flex items-center gap-2">
              <Eye className="w-5 h-5 text-academic shrink-0" />
              <span>2. Information We Collect</span>
            </h2>
            <p>
              Depending on the nature of your interaction, we collect the following personal information strictly for coordination purposes:
            </p>
            <div className="bg-white p-5 rounded-sm border border-border shadow-xs space-y-4 text-xs sm:text-sm">
              <div>
                <strong className="block text-navy font-semibold mb-1">A. Parent & Student Tutoring Enquiries:</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-dark pl-1">
                  <li>Parent or guardian's full name and mobile phone number</li>
                  <li>Student's academic grade level (Class 6 to Class 12) and school board (CBSE, ICSE, State Board)</li>
                  <li>Subject requirements, specific topics of concern, and primary learning objectives</li>
                  <li>Residential locality in Delhi (e.g., Preet Vihar, Rohini, Saket) and optional landmark or address details for home tuition feasibility</li>
                  <li>Preferred days of the week, session timings, and frequency</li>
                </ul>
              </div>
              <div className="pt-3 border-t border-border">
                <strong className="block text-navy font-semibold mb-1">B. Educator Applications:</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-dark pl-1">
                  <li>Full name, mobile phone number, and email address</li>
                  <li>Highest educational qualification and academic degrees</li>
                  <li>Teaching experience, preferred subjects, class stages taught, and locality availability</li>
                  <li>Pedagogical background summary and teaching methodology</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy flex items-center gap-2">
              <Lock className="w-5 h-5 text-academic shrink-0" />
              <span>3. Processing of Children's & Student Information</span>
            </h2>
            <p>
              Students receiving our tutoring services are typically minors under the age of 18. In alignment with the principles of the <em>Digital Personal Data Protection Act, 2023 (DPDP Act)</em>:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-1">
              <li>
                <strong>Parental / Guardian Authorization:</strong> Student information must only be submitted by a parent or legal guardian. Our tutoring enquiry form requires explicit, affirmative confirmation of parental authorization before an enquiry can be transmitted.
              </li>
              <li>
                <strong>Purpose Limitation:</strong> Student academic details are utilized strictly to assess tutoring suitability, recommend an appropriate curriculum pace, and propose a vetted educator.
              </li>
              <li>
                <strong>No Behavioral Profiling or Commercial Advertising:</strong> We do not track, profile, or display targeted advertising to children.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy">
              4. How Information Is Transmitted & Stored
            </h2>
            <p>
              When you submit a form on our website:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-1">
              <li>
                <strong>No Persistent Browser Storage:</strong> Our website does not retain your contact details, street address, or child's academic details in permanent browser cookies, localStorage, or sessionStorage.
              </li>
              <li>
                <strong>Direct WhatsApp Transmission:</strong> The formatted text is sent directly via WhatsApp to our official business coordination line (<code>+91 92206 38540</code>). Because the transmission occurs via WhatsApp, messages are retained on the sender's and recipient's WhatsApp accounts and devices subject to WhatsApp’s standard security policies.
              </li>
              <li>
                <strong>Operational Coordination:</strong> Our coordinator reviews enquiries manually on operational devices to organize introductory sessions.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy">
              5. Information Sharing with Educators
            </h2>
            <p>
              To propose and schedule an introductory session, Spectre Education shares preliminary academic requirements (student grade, subject, and general residential locality) with shortlisted educators in our network.
            </p>
            <p>
              Exact home addresses, landmarks, and parent direct contact numbers are only shared with the mutually agreed educator after the parent has confirmed their willingness to proceed with an in-home introduction. We never sell, rent, or trade personal data to third-party marketing brokers.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy flex items-center gap-2">
              <Clock className="w-5 h-5 text-academic shrink-0" />
              <span>6. Data Retention & Your Rights</span>
            </h2>
            <p>
              Enquiry messages and application records are retained for the duration of the educational engagement or as reasonably needed to provide coordination services.
            </p>
            <p>
              Under applicable Indian data protection frameworks, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>Request a summary of personal data held about you or your child.</li>
              <li>Request correction or updating of inaccurate details.</li>
              <li>Request erasure / deletion of your contact records and chat transcripts from our operational devices.</li>
              <li>Withdraw your consent to ongoing tutoring coordination.</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{' '}
              <a href={`mailto:${SITE_METADATA.supportEmail}`} className="text-academic font-semibold hover:underline">
                {SITE_METADATA.supportEmail}
              </a>{' '}
              with the subject line <em>"Data Privacy Request"</em>.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-navy flex items-center gap-2">
              <Mail className="w-5 h-5 text-academic shrink-0" />
              <span>7. Privacy Questions & Grievance Contact</span>
            </h2>
            <p>
              For questions regarding these privacy practices or to raise a data-related concern, please contact:
            </p>
            <div className="bg-white p-5 rounded-sm border border-border shadow-xs text-xs sm:text-sm space-y-1">
              <p className="font-bold text-navy">Spectre Education — Coordination & Privacy Team</p>
              <p>Email: <a href={`mailto:${SITE_METADATA.supportEmail}`} className="text-academic font-medium hover:underline">{SITE_METADATA.supportEmail}</a></p>
              <p>WhatsApp Coordinator: <span className="font-medium">{SITE_METADATA.displayPhone}</span></p>
              <p>Location: Delhi, India</p>
              <p className="text-[11px] text-slate pt-2 border-t border-border mt-3 leading-relaxed">
                <em>Note: Formal statutory Data Protection Officer (DPO) and Grievance Officer appointments under the DPDP Rules are being established as relevant procedural rules are notified by the Central Government.</em>
              </p>
            </div>
          </section>

        </div>

        {/* Footer CTA Back to Home */}
        <div className="mt-12 pt-6 border-t border-border flex items-center justify-between text-xs text-slate">
          <span>Spectre Education · Delhi, India</span>
          <Link to="/terms" className="text-academic font-semibold hover:underline">
            View Terms of Service →
          </Link>
        </div>

      </div>
    </div>
  );
};
