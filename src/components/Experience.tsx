import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Experience: React.FC = () => {
  const { data } = usePortfolio();
  const { experienceData } = data;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent to-[#05001a]/20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2"
          >
            Professional Experience
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-purple-500 mx-auto rounded-full"
          />
        </div>

        {/* Vertical Timeline container */}
        <div className="relative max-w-4xl mx-auto timeline-line">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            {experienceData.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row items-stretch ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline point indicator */}
                  <div className="absolute left-4 md:left-1/2 top-4 -translate-y-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-dark-bg border-2 border-purple-500 z-20 flex items-center justify-center shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                    <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                  </div>

                  {/* Empty spatial balancer for medium screens */}
                  <div className="hidden md:block w-1/2" />

                  {/* Timeline Card */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-purple-500/20 hover:bg-[#10102b]/40 transition-all duration-300 shadow-lg text-left">
                      
                      {/* Gradient accents */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500" />
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                            {exp.role}
                          </h3>
                          <span className="text-sm font-semibold text-purple-300">
                            {exp.company}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium bg-white/5 border border-white/5 px-2.5 py-1 rounded-full w-fit">
                          <Calendar className="w-3.5 h-3.5 text-purple-400" />
                          {exp.duration}
                        </div>
                      </div>

                      {/* Bullet Responsibilities */}
                      <ul className="space-y-2 mb-5 list-none">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="text-xs sm:text-sm text-gray-400 flex items-start gap-2.5 leading-relaxed">
                            <span className="text-purple-500 shrink-0 mt-1">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Technologies summary */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-semibold text-blue-300 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
