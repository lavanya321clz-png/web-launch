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
    <footer className="relative bg-[#e8f0fe]/90 border-t border-blue-100 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo and copyright */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <button 
            onClick={() => handleScrollTo('hero')}
            className="text-lg font-bold tracking-tight cursor-pointer"
          >
            <span className="text-[#0f172a] font-semibold">Lavanya</span>
            <span className="text-blue-600">Ponnusamy.</span>
          </button>
          <p className="text-xs text-slate-500">
            &copy; {currentYear} Lavanya Ponnusamy. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScrollTo(link.id)}
              className="text-xs font-semibold text-slate-500 hover:text-blue-700 cursor-pointer transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Social and scroll to top */}
        <div className="flex items-center space-x-6 text-slate-500">
          <div className="flex items-center space-x-4">
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={personalInfo.twitter} target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 hover:text-blue-700 border border-blue-100 cursor-pointer flex items-center justify-center transition-all duration-300"
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
