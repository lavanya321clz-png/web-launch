import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ListChecks } from 'lucide-react';
import { GithubIcon as Github } from './SocialIcons';
import { type Project } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

export const Projects: React.FC = () => {
  const { data } = usePortfolio();
  const { projectsData } = data;
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Full Stack', 'Web Development', 'E-Commerce', 'Frontend', 'Productivity'];

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto'; // Release background scrolling
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#05001a]/30 to-transparent">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2"
          >
            My Projects
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-purple-500 mx-auto rounded-full"
          />
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border cursor-pointer transition-all duration-300 ${
                filter === cat
                  ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_10px_rgba(139,92,246,0.25)]'
                  : 'glass-card border-white/5 text-gray-400 hover:text-white hover:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-2xl border border-white/5 overflow-hidden flex flex-col group hover:border-purple-500/20 transition-all duration-300"
              >
                {/* Image panel */}
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-purple-950/20 z-10" />
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 z-20 px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase bg-[#02000f]/80 text-purple-400 rounded-full border border-purple-500/20 backdrop-blur-sm">
                    {project.category}
                  </div>
                </div>

                {/* Card description */}
                <div className="p-6 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                    {/* Tech list */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-semibold text-purple-300/90 bg-purple-500/10 px-2 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="text-xs font-semibold text-purple-400 hover:text-white cursor-pointer transition-colors"
                    >
                      View Details &rarr;
                    </button>
                    <div className="flex items-center space-x-3 text-gray-400">
                      <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors" aria-label="GitHub">
                        <Github className="w-4 h-4" />
                      </a>
                      <a href={project.demo} target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors" aria-label="Live Demo">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseModal}
                className="absolute inset-0 bg-[#02000f]/80 backdrop-blur-md"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="relative w-full max-w-3xl glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-10 flex flex-col max-h-[85vh]"
              >
                {/* Header image & close button */}
                <div className="relative h-48 sm:h-64 shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02000f] to-transparent z-10" />
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#02000f]/80 text-gray-400 hover:text-white border border-white/5 cursor-pointer backdrop-blur-sm transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-6 z-20 text-left">
                    <span className="text-[10px] font-bold tracking-wide uppercase bg-purple-600/90 text-white px-2.5 py-1 rounded-full">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                      {selectedProject.name}
                    </h3>
                  </div>
                </div>

                {/* Content body (Scrollable) */}
                <div className="p-6 overflow-y-auto space-y-6 text-left">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Overview</h4>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                      <ListChecks className="w-4 h-4" />
                      Key Features
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-400 list-none">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-purple-500 mt-0.5">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Technologies Employed</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-medium text-gray-300 bg-white/5 border border-white/5 px-3 py-1 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer action buttons */}
                <div className="p-4 border-t border-white/5 flex items-center justify-end gap-3 bg-[#05001a]/40 shrink-0">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 border border-white/10 text-gray-300 hover:text-white rounded-lg text-sm flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg text-sm flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Projects;
