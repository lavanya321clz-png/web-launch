import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, Languages } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

// Simple lightweight count-up hook/component utilizing Framer Motion's useInView
const AnimatedCounter: React.FC<{ value: number; suffix?: string; duration?: number }> = ({ value, suffix = '', duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export const About: React.FC = () => {
  const { data } = usePortfolio();
  const { aboutMe } = data;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
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
            About Me
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-purple-500 mx-auto rounded-full"
          />
        </div>

        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {aboutMe.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass-card rounded-2xl p-6 text-center border border-white/5 relative overflow-hidden group hover:border-purple-500/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-3xl sm:text-4xl font-extrabold text-purple-400 mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Main Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-left"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-white">
              My Journey & Goal
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              {aboutMe.intro}
            </p>
            <div className="glass-card rounded-2xl p-6 border border-white/5 relative overflow-hidden bg-gradient-to-r from-purple-500/5 to-transparent">
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-purple-500" />
              <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-2">Career Objective</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                {aboutMe.objective}
              </p>
            </div>

            {/* Languages known */}
            <div className="space-y-3 pt-2">
              <h4 className="text-base font-semibold text-white flex items-center gap-2">
                <Languages className="w-5 h-5 text-purple-400" />
                Languages Known
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {aboutMe.languages.map((lang, idx) => (
                  <div key={idx} className="glass-card rounded-xl p-3 border border-white/5 flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-200">{lang.name}</span>
                    <span className="text-xs text-gray-400">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-left"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-white">
              Personal Strengths
            </h3>
            <div className="space-y-4">
              {aboutMe.strengths.map((strength, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl glass-card border border-white/5 hover:border-purple-500/10 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {strength}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
