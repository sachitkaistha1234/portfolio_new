import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components
import Hero from './components/Hero';
import EnhancedAbout from './components/EnhancedAbout';
import AnimatedSkillBars from './components/AnimatedSkillBars';
import Education from './components/Education';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import EnhancedProjects from './components/EnhancedProjects';
import TestimonialsSection from './components/TestimonialsSection';
import RecentUpdates from './components/RecentUpdates';
import EnhancedContactForm from './components/EnhancedContactForm';
import Footer from './components/Footer';
import TerminalLoader from './components/TerminalLoader';
import ThemeToggle from './components/ThemeToggle';

// Hooks
import { useTheme } from './hooks/useTheme';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    });

    // Apply theme class to body
    document.body.className = theme === 'dark' ? 'dark' : '';
    
    // Update CSS custom properties based on theme
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);

    // Cleanup AOS on unmount
    return () => {
      AOS.refresh();
    };
  }, [theme]);

  // Preload critical resources
  useEffect(() => {
    const preloadImages = () => {
      // Add any critical images here
      const imageUrls = [
        // Add your image URLs here
      ];
      
      imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    };

    if (!isLoading) {
      preloadImages();
    }
  }, [isLoading]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-slate-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Terminal Loader */}
      <AnimatePresence>
        {isLoading && <TerminalLoader onComplete={handleLoadingComplete} />}
      </AnimatePresence>
      
      {/* Theme Toggle - Fixed Position */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.8 : 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="fixed top-6 right-6 z-40 no-print"
      >
        <ThemeToggle />
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        {/* Hero Section */}
        <section data-aos="fade-up">
          <Hero />
        </section>

        {/* About Section */}
        <section data-aos="fade-up" data-aos-delay="100">
          <EnhancedAbout />
        </section>

        {/* Skills Section */}
        <section data-aos="fade-up" data-aos-delay="200">
          <AnimatedSkillBars />
        </section>

        {/* Education Section */}
        <section data-aos="fade-up" data-aos-delay="100">
          <Education />
        </section>

        {/* Experience Section */}
        <section data-aos="fade-up" data-aos-delay="200">
          <Experience />
        </section>

        {/* Certifications Section */}
        <section data-aos="fade-up" data-aos-delay="100">
          <Certifications />
        </section>

        {/* Projects Section */}
        <section data-aos="fade-up" data-aos-delay="200">
          <EnhancedProjects />
        </section>

        {/* Testimonials Section */}
        <section data-aos="fade-up" data-aos-delay="100">
          <TestimonialsSection />
        </section>

        {/* Recent Updates Section */}
        <section data-aos="fade-up" data-aos-delay="200">
          <RecentUpdates />
        </section>

        {/* Contact Section */}
        <section data-aos="fade-up" data-aos-delay="100">
          <EnhancedContactForm />
        </section>

        {/* Footer */}
        <section data-aos="fade-up" data-aos-delay="200">
          <Footer />
        </section>
      </motion.div>

      {/* Performance Monitoring (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-black/80 text-white text-xs p-2 rounded no-print">
          Theme: {theme} | Loaded: {!isLoading ? '✓' : '⏳'}
        </div>
      )}
    </div>
  );
}

export default App;