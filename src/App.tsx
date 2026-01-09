import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { SkipLink } from './components/SkipLink';
import { CookieConsent } from './components/CookieConsent';
import { Loader2 } from 'lucide-react';
import './index.css';

// Code-split routes for performance
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const WatchPage = lazy(() => import('./pages/WatchPage').then(module => ({ default: module.WatchPage })));
const MissionControlPage = lazy(() => import('./pages/MissionControlPage').then(module => ({ default: module.MissionControlPage })));
const GearPage = lazy(() => import('./pages/GearPage').then(module => ({ default: module.GearPage })));
const StoriesPage = lazy(() => import('./pages/StoriesPage').then(module => ({ default: module.StoriesPage })));
const CommunityPage = lazy(() => import('./pages/CommunityPage').then(module => ({ default: module.CommunityPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(module => ({ default: module.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(module => ({ default: module.TermsPage })));

// Loading fallback component
const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading page">
    <div className="text-center">
      <Loader2 className="w-12 h-12 text-green-400 animate-spin mx-auto mb-4" />
      <p className="text-neutral-100">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <SkipLink />
        <Navigation />
        <main id="main-content" className="relative" role="main" aria-label="Main content">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/watch" element={<WatchPage />} />
              <Route path="/prole-control" element={<MissionControlPage />} />
              <Route path="/gear" element={<GearPage />} />
              <Route path="/stories" element={<StoriesPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;
