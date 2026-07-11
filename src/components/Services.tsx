import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Layout, Server, Cpu, CloudLightning, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

// Map icon string identifier to corresponding Lucide icons
const iconMap: { [key: string]: any } = {
  Globe: Globe,
  Layout: Layout,
  Server: Server,
  Cpu: Cpu,
  CloudLightning: CloudLightning
};

export const Services: React.FC = () => {
  const { data } = usePortfolio();
  const { servicesData } = data;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#05001a]/25 to-transparent">
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
            My Services
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-purple-500 mx-auto rounded-full"
          />
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {servicesData.map((service, idx) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glass-card rounded-2xl p-8 border border-white/5 relative overflow-hidden group hover:border-purple-500/25 hover:bg-[#10102b]/40 hover:shadow-[0_8px_32px_rgba(139,92,246,0.1)] transition-all duration-300 flex flex-col justify-between text-left h-full"
              >
                {/* Backlight glow orb inside the card */}
                <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gradient-to-tr from-purple-500/10 to-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="space-y-6 relative z-10">
                  {/* Glowing icon badge */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500/10 to-blue-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:text-white transition-all duration-300 relative shadow-inner">
                    <Icon className="w-7 h-7" />
                    <div className="absolute inset-0 rounded-2xl bg-purple-500/10 opacity-0 group-hover:opacity-100 blur-[8px] transition-opacity" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wide group-hover:text-white transition-colors duration-300 relative z-10">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Services;
