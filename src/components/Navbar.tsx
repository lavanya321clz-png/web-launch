import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useScrollSpy } from '../hooks/useScrollSpy';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Services', id: 'services' },
    { label: 'Reviews', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ];

  const sectionIds = navItems.map(item => item.id);
  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-4 glass-navbar shadow-lg' 
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => handleNavClick('hero')} 
          className="text-xl font-bold tracking-tight cursor-pointer flex items-center gap-1 group"
        >
          <span className="text-white font-semibold">Alex</span>
          <span className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">Morgan.</span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition-colors duration-300 ${
                activeSection === item.id 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {activeSection === item.id && (
                <motion.span
                  layoutId="activeNavBackground"
                  className="absolute inset-0 bg-blue-500/10 rounded-full border border-blue-500/20"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => handleNavClick('contact')}
            className="glow-btn px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-sky-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 flex items-center gap-1.5 cursor-pointer z-10"
          >
            Hire Me
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="md:hidden p-2 text-gray-400 hover:text-white cursor-pointer"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-navbar border-t border-white/5 absolute top-full left-0 right-0 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id 
                      ? 'text-white bg-blue-500/10 border-l-2 border-blue-500 pl-3' 
                      : 'text-gray-400 hover:text-white pl-2'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full text-center py-3 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-700 to-blue-500 text-white cursor-pointer"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
