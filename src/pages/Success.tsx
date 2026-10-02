import React from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';
import { Button } from '../components/Button';

export const Success: React.FC = () => {
  const location = useLocation();
  const requestDetails = (location.state as any)?.requestDetails;

  return (
    <div className="min-h-screen bg-parchment py-12 sm:py-20 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white rounded-lg border border-border-subtle p-8 sm:p-10 text-center shadow-sm">
          
          {/* Success Check Icon */}
          <div className="w-16 h-16 rounded-full bg-trust-light text-trust flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-9 h-9" />
          </div>

          {/* Heading per Section 39 */}
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-navy tracking-tight">
            We've received your request.
          </h1>

          {/* Supporting text per Section 39 */}
          <p className="mt-3 text-base text-ink-muted leading-relaxed">
            Thank you. Our team will review the details you shared and contact you regarding the next steps.
          </p>

          {/* Reassurance badge */}
          <div className="my-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-slate-50 border border-border-subtle text-xs text-ink-muted">
            <span>You don't need to create an account to continue.</span>
          </div>

          {/* Request summary if available */}
          {requestDetails && (
            <div className="bg-parchment rounded-md p-5 border border-border-subtle text-left text-xs sm:text-sm space-y-2 mb-8">
              <h3 className="font-heading font-bold text-navy text-xs uppercase tracking-wider mb-2">
                Summary of Your Request
              </h3>
              {requestDetails.parentName && (
                <div className="flex justify-between border-b border-border-subtle/60 pb-1.5">
                  <span className="text-ink-muted">Parent / Guardian:</span>
                  <span className="font-medium text-navy">{requestDetails.parentName}</span>
                </div>
              )}
              {requestDetails.studentClass && (
                <div className="flex justify-between border-b border-border-subtle/60 pb-1.5">
                  <span className="text-ink-muted">Student's Class:</span>
                  <span className="font-medium text-navy">{requestDetails.studentClass}</span>
                </div>
              )}
              {requestDetails.subjects && requestDetails.subjects.length > 0 && (
                <div className="flex justify-between border-b border-border-subtle/60 pb-1.5">
                  <span className="text-ink-muted">Subjects:</span>
                  <span className="font-medium text-navy">{requestDetails.subjects.join(', ')}</span>
                </div>
              )}
              {requestDetails.area && (
                <div className="flex justify-between border-b border-border-subtle/60 pb-1.5">
                  <span className="text-ink-muted">Location:</span>
                  <span className="font-medium text-navy">{requestDetails.area}, Delhi</span>
                </div>
              )}
              {requestDetails.phone && (
                <div className="flex justify-between pt-0.5">
                  <span className="text-ink-muted">Contact:</span>
                  <span className="font-medium text-navy">+91 {requestDetails.phone}</span>
                </div>
              )}
            </div>
          )}

          {/* What happens next steps */}
          <div className="border-t border-border-subtle pt-6 mb-8 text-left">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-navy mb-4">
              What Happens Next
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-ink-muted">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-navy shrink-0 mt-0.5">
                  1
                </div>
                <p>
                  A Spectre coordinator reviews your student’s requirements and locality in Delhi.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-navy shrink-0 mt-0.5">
                  2
                </div>
                <p>
                  We call you to confirm timings, tutor availability, and answer any questions.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-navy shrink-0 mt-0.5">
                  3
                </div>
                <p>
                  We coordinate the first 1-on-1 home session at your convenience.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button to="/" variant="primary" size="md" className="w-full sm:w-auto gap-2">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
            <Button to="/request-tutor" variant="secondary" size="md" className="w-full sm:w-auto">
              <span>Submit Another Request</span>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};
