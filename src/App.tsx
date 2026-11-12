import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';

// Lazy-loaded secondary routes for optimal code-splitting and rapid initial load
const PrivateTutoring = lazy(() => import('./pages/PrivateTutoring').then((m) => ({ default: m.PrivateTutoring })));
const Mentorship = lazy(() => import('./pages/Mentorship').then((m) => ({ default: m.Mentorship })));
const CareerGuidance = lazy(() => import('./pages/CareerGuidance').then((m) => ({ default: m.CareerGuidance })));
const ParentResources = lazy(() => import('./pages/ParentResources').then((m) => ({ default: m.ParentResources })));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail').then((m) => ({ default: m.ArticleDetail })));
const RequestTutor = lazy(() => import('./pages/RequestTutor').then((m) => ({ default: m.RequestTutor })));
const ApplyEducator = lazy(() => import('./pages/ApplyEducator').then((m) => ({ default: m.ApplyEducator })));
const RequestGuidance = lazy(() => import('./pages/RequestGuidance').then((m) => ({ default: m.RequestGuidance })));
const Success = lazy(() => import('./pages/Success').then((m) => ({ default: m.Success })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then((m) => ({ default: m.PrivacyPolicy })));
const Terms = lazy(() => import('./pages/Terms').then((m) => ({ default: m.Terms })));

const RouteLoadingFallback: React.FC = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center py-20 bg-warm-white text-navy" aria-label="Loading page content">
    <div className="w-8 h-8 border-2 border-academic/20 border-t-academic rounded-full animate-spin mb-3" />
    <span className="text-xs font-semibold tracking-wider uppercase text-academic/80">
      Loading...
    </span>
  </div>
);

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<RouteLoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/private-tutoring" element={<PrivateTutoring />} />
              <Route path="/mentorship" element={<Mentorship />} />
              <Route path="/career-guidance" element={<CareerGuidance />} />
              <Route path="/parent-resources" element={<ParentResources />} />
              <Route path="/parent-resources/:slug" element={<ArticleDetail />} />
              <Route path="/request-tutor" element={<RequestTutor />} />
              <Route path="/apply-educator" element={<ApplyEducator />} />
              <Route path="/request-guidance" element={<RequestGuidance />} />
              <Route path="/request-success" element={<Success />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              {/* Catch-all unknown routes redirect to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
