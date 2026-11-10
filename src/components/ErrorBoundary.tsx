import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In production, suppress stack trace exposure to visitors
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught error:', error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FFFDF8] flex items-center justify-center p-4 text-[#172B4D] font-sans antialiased">
          <div className="max-w-md w-full bg-white border border-[#E8E2D5] rounded-sm p-6 sm:p-8 text-center shadow-xs">
            {/* Spectre Emblem */}
            <div className="w-12 h-12 mx-auto mb-4 rounded-sm bg-[#EBF1FA] border border-[#2B4C7E]/20 flex items-center justify-center text-[#172B4D]">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <span className="text-[10px] font-semibold tracking-widest uppercase text-[#2B4C7E] block mb-1">
              Spectre Education
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#172B4D] tracking-tight mb-2">
              An Unexpected Error Occurred
            </h1>
            <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed mb-6 font-normal">
              We encountered an unexpected interface issue while rendering this page. You can safely return to the homepage to continue your enquiry.
            </p>

            <button
              type="button"
              onClick={this.handleReset}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-sm bg-[#172B4D] hover:bg-[#0F1D33] text-[#FFF4E3] text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
