import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const logMessages = [
    "git clone portfolio-lavanya-ponnusamy...",
    "npm install --silent",
    "Initializing TypeScript compilers...",
    "Injecting Tailwind CSS tokens...",
    "Generating glassmorphism elements...",
    "Ready for launch!"
  ];

  useEffect(() => {
    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < logMessages.length) {
        setLogs(prev => [...prev, logMessages[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 350);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete();
          }, 450);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -100, 
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f0f6ff] text-slate-600 font-mono p-4"
    >
      <div className="w-full max-w-md glass-card rounded-lg p-6 border border-blue-900/20 shadow-2xl relative overflow-hidden">
        {/* Terminal window buttons */}
        <div className="flex items-center gap-2 mb-4 border-b border-blue-100 pb-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-[10px] text-slate-500 ml-2">lavanya_portfolio_loader.sh</span>
        </div>

        {/* Logs */}
        <div className="h-36 overflow-hidden text-[11px] space-y-1 mb-6 flex flex-col justify-end">
          {logs.map((log, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={idx === logs.length - 1 ? "text-blue-600" : "text-slate-500"}
            >
              <span className="text-blue-600 mr-2">$</span>
              {log}
            </motion.div>
          ))}
        </div>

        {/* Progress tracking */}
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>COMPILING PORTFOLIO</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-1 bg-blue-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-sky-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Backdrop glows */}
        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
