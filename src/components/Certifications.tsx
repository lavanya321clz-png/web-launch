import React from 'react';
import { motion } from 'framer-motion';
import { Award, Cloud, FileCode2, Code2, Database, Terminal, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

// Map icon string identifier to corresponding Lucide SVG components
const iconMap: { [key: string]: any } = {
  Cloud: Cloud,
  React: FileCode2,
  Code: Code2,
  Award: Award,
  Database: Database,
  Terminal: Terminal
};

export const Certifications: React.FC = () => {
  const { data } = usePortfolio();
  const { certificationsData } = data;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2"
          >
            Certifications & Credentials
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-purple-500 mx-auto rounded-full"
          />
        </div>

        {/* Certifications Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {certificationsData.map((cert, idx) => {
            const Icon = iconMap[cert.icon] || Award;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-purple-500/20 hover:bg-[#10102b]/40 transition-all duration-300 flex items-start gap-4 text-left"
              >
                {/* Visual Icon panel */}
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 shrink-0 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/15 px-2 py-0.5 rounded uppercase tracking-wider">
                      Verified
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      {cert.year}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-purple-300 transition-colors">
                    {cert.name}
                  </h3>

                  <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
                    <span>{cert.issuer}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Certifications;
