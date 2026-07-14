import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundEffect: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#f0f6ff]">
      {/* Background glow orbs */}
      <motion.div 
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -60, 50, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-300/20 blur-[130px]"
      />
      <motion.div 
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 70, -60, 0],
          scale: [1.1, 0.85, 1.05, 1.1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-sky-200/30 blur-[130px]"
      />
      <motion.div 
        animate={{
          x: [0, 30, -20, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[40%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-blue-200/15 blur-[100px]"
      />

      {/* Subtle grid line overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(29,78,216,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(29,78,216,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]"
        style={{ 
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 60%, transparent 100%)', 
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 60%, transparent 100%)' 
        }}
      />
    </div>
  );
};

export default BackgroundEffect;
