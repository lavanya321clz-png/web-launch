import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Landmark, Award } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Education: React.FC = () => {
  const { data } = usePortfolio();
  const { educationData } = data;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
  };

  return (
    <section id="education" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#031040]/20 to-transparent">
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
            Education History
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-blue-500 mx-auto rounded-full"
          />
        </div>

        {/* Education grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {educationData.map((edu, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass-card rounded-2xl p-8 border border-blue-100 relative overflow-hidden group hover:border-blue-400/40 hover:bg-blue-50/60 transition-all duration-300 text-left flex flex-col justify-between"
            >
              {/* Backlight visual orb */}
              <div className="absolute -bottom-12 -left-12 w-28 h-28 rounded-full bg-blue-500/5 blur-xl group-hover:bg-blue-500/10 transition-colors" />

              <div className="space-y-4 relative z-10">
                {/* Visual Icon Badge */}
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    {edu.year}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] leading-snug">
                    {edu.degree}
                  </h3>
                </div>

                <div className="space-y-1 text-sm text-slate-600 font-medium">
                  <div className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-blue-400/80 shrink-0" />
                    <span>{edu.college}</span>
                  </div>
                  <div className="text-xs text-slate-500 pl-6">
                    {edu.university}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-blue-100 flex items-center gap-2 text-sm text-slate-600 relative z-10">
                <Award className="w-4.5 h-4.5 text-blue-500" />
                <span className="font-semibold text-slate-700">{edu.score}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Education;
