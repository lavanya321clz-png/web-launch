import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router } from 'react-router-dom';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

// Base visuals
import BackgroundEffect from './components/BackgroundEffect';
import ScrollProgress from './components/ScrollProgress';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';

// Sections
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function AppContent() {
  const { loading } = usePortfolio();
  const [visualLoading, setVisualLoading] = useState(true);

  // Show loader until both visual loader progress completes and backend API fetch completes
  const showLoader = visualLoading || loading;

  return (
    <div className="relative min-h-screen text-gray-100 overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
      <AnimatePresence mode="wait">
        {showLoader && (
          <LoadingScreen onComplete={() => setVisualLoading(false)} />
        )}
      </AnimatePresence>

      {!showLoader && (
        <>
          <BackgroundEffect />
          <ScrollProgress />
          <Navbar />
          
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Certifications />
            <Services />
            <Testimonials />
            <Contact />
          </main>

          <Footer />
          <ScrollToTop />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <PortfolioProvider>
        <AppContent />
      </PortfolioProvider>
    </Router>
  );
}

export default App;
