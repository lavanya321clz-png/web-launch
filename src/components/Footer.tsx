import React from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin, TwitterIcon as Twitter } from './SocialIcons';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const { personalInfo } = data;
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

  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Services', id: 'services' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="relative bg-[#02000d]/90 border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo and copyright */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <button 
            onClick={() => handleScrollTo('hero')}
            className="text-lg font-bold tracking-tight cursor-pointer"
          >
            <span className="text-white font-semibold">Alex</span>
            <span className="text-purple-500">Morgan.</span>
          </button>
          <p className="text-xs text-gray-500">
            &copy; {currentYear} Alex Morgan. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScrollTo(link.id)}
              className="text-xs font-semibold text-gray-400 hover:text-white cursor-pointer transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Social and scroll to top */}
        <div className="flex items-center space-x-6 text-gray-400">
          <div className="flex items-center space-x-4">
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={personalInfo.twitter} target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white border border-white/5 cursor-pointer flex items-center justify-center transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
