import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin, TwitterIcon as Twitter } from './SocialIcons';
import { usePortfolio } from '../context/PortfolioContext';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const { personalInfo } = data;
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const roles = [
    "Full Stack Developer",
    "React & TypeScript Specialist",
    "Cloud Integration Enthusiast",
    "Clean Code Practitioner"
  ];

  useEffect(() => {
    let timer: number;
    const currentFullRole = roles[roleIndex];
    
    if (isDeleting) {
      timer = window.setTimeout(() => {
        setTypedText(prev => prev.slice(0, -1));
      }, 40);
    } else {
      timer = window.setTimeout(() => {
        setTypedText(currentFullRole.slice(0, typedText.length + 1));
      }, 80);
    }

    if (!isDeleting && typedText === currentFullRole) {
      timer = window.setTimeout(() => setIsDeleting(true), 2500); // pause before deleting
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }

    return () => window.clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Intro text */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for new opportunities
          </motion.div>

          <div className="space-y-3">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
            >
              Hi, I'm <span className="text-glow-gradient">{personalInfo.fullName}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300 h-10 flex items-center"
            >
              <span>A&nbsp;</span>
              <span className="gradient-text-purple-blue">{typedText}</span>
              <span className="inline-block w-[3px] h-[1.1em] bg-blue-400 ml-1 animate-[pulse_1s_infinite]" />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed"
          >
            {personalInfo.description}
          </motion.p>

          {/* Call to actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo('contact')}
              className="glow-btn px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-sky-400 text-white rounded-full font-semibold text-sm shadow-[0_0_15px_rgba(59,130,246,0.35)] flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
            >
              Contact Me
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={personalInfo.resumeUrl}
              className="px-8 py-4 glass-card border border-white/10 hover:border-blue-500/40 text-gray-200 hover:text-white rounded-full font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
            >
              Download Resume
              <Download className="w-4 h-4 text-blue-400" />
            </a>
          </motion.div>

          {/* Social connections */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center space-x-4 pt-4 text-gray-400"
          >
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={personalInfo.twitter} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* Profile visual placeholder */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96"
          >
            {/* Ambient gradients */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-700 to-blue-400 blur-[30px] opacity-30 animate-pulse-slow" />
            
            {/* Visual borders frame */}
            <div className="absolute inset-2 rounded-3xl bg-gradient-to-tr from-blue-600 to-sky-400 opacity-20" />
            
            <div className="absolute inset-0 rounded-3xl overflow-hidden glass-card border border-white/10 p-3">
              <img
                src={personalInfo.avatar}
                alt={personalInfo.fullName}
                className="w-full h-full object-cover rounded-2xl filter brightness-95 contrast-105 hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            
            {/* Floating visual items */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 glass-card border border-blue-500/30 px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-lg"
            >
              <span className="text-xl">💻</span>
              <span className="text-xs font-semibold text-white/95">Full-Stack dev</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 glass-card border border-blue-500/30 px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-lg"
            >
              <span className="text-xl">🚀</span>
              <span className="text-xs font-semibold text-white/95">Fast performance</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
