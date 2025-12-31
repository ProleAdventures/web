import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { WatchPage } from './pages/WatchPage';
import { MissionControlPage } from './pages/MissionControlPage';
import { GearPage } from './pages/GearPage';
import { StoriesPage } from './pages/StoriesPage';
import { CommunityPage } from './pages/CommunityPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { Footer } from './components/Footer';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navigation />
        <main className="relative">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<WatchPage />} />
            <Route path="/watch" element={<MissionControlPage />} />
            <Route path="/gear" element={<GearPage />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;