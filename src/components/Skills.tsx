import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Server, Database, Cloud, Terminal, Wrench } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

type SkillCategory = 'frontend' | 'backend' | 'database' | 'cloud' | 'devops' | 'tools';

export const Skills: React.FC = () => {
  const { data } = usePortfolio();
  const { skillsData } = data;
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('frontend');

  const categories = [
    { id: 'frontend' as SkillCategory, label: 'Frontend', icon: Layout },
    { id: 'backend' as SkillCategory, label: 'Backend', icon: Server },
    { id: 'database' as SkillCategory, label: 'Database', icon: Database },
    { id: 'cloud' as SkillCategory, label: 'Cloud', icon: Cloud },
    { id: 'devops' as SkillCategory, label: 'DevOps', icon: Terminal },
    { id: 'tools' as SkillCategory, label: 'Tools', icon: Wrench },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent to-[#031040]/30">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f172a] mb-2"
          >
            Technical Skills
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-blue-500 mx-auto rounded-full"
          />
        </div>

        {/* Tab Headers */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold tracking-wide transition-all cursor-pointer duration-300 border ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-700 to-blue-500 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                    : 'glass-card border-white/5 text-gray-400 hover:text-white hover:border-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            >
              {skillsData[activeCategory].map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  className="glass-card rounded-2xl p-5 border border-white/5 relative overflow-hidden group hover:border-blue-500/20 transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-[#0f172a] transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-xs font-bold text-blue-400">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress track */}
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.05 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-sky-400 rounded-full"
                    />
                  </div>

                  {/* Subtly glows under the bar on hover */}
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-blue-500 to-sky-400 opacity-0 group-hover:opacity-60 transition-opacity duration-300 shadow-[0_-2px_10px_#3b82f6]" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Skills;
