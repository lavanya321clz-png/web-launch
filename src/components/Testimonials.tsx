import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Testimonials: React.FC = () => {
  const { data } = usePortfolio();
  const { testimonialsData } = data;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef<number | null>(null);

  const slideNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const resetTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }
    timerRef.current = window.setInterval(slideNext, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeInOut' as const }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeInOut' as const }
    })
  };

  const currentTestimonial = testimonialsData[currentIndex];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
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
            Client Reviews
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-blue-500 mx-auto rounded-full"
          />
        </div>

        {/* Carousel Slider */}
        <div className="max-w-4xl mx-auto relative min-h-[380px] sm:min-h-[320px] flex items-center justify-center">
          
          {/* Navigation Arrows */}
          <button
            onClick={() => { slidePrev(); resetTimer(); }}
            className="absolute left-0 z-20 p-2 rounded-full glass-card border border-white/5 text-gray-400 hover:text-white hover:border-blue-500/20 cursor-pointer hidden md:flex items-center justify-center transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => { slideNext(); resetTimer(); }}
            className="absolute right-0 z-20 p-2 rounded-full glass-card border border-white/5 text-gray-400 hover:text-white hover:border-blue-500/20 cursor-pointer hidden md:flex items-center justify-center transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Testimonial card */}
          <div className="w-full md:px-16 overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="glass-card rounded-3xl p-8 sm:p-10 border border-white/5 relative flex flex-col justify-between text-left h-full w-full select-none"
              >
                {/* Quote details indicator */}
                <Quote className="absolute top-8 right-8 w-16 h-16 text-blue-500/5 pointer-events-none" />

                <div className="space-y-6">
                  {/* Stars list */}
                  <div className="flex gap-1">
                    {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>

                  {/* Main review content */}
                  <p className="text-gray-300 text-sm sm:text-base md:text-lg italic leading-relaxed font-medium">
                    "{currentTestimonial.content}"
                  </p>
                </div>

                {/* Profile card metadata */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-blue-500/20">
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      {currentTestimonial.name}
                    </h3>
                    <div className="text-xs text-blue-400 font-medium">
                      {currentTestimonial.role} at <span className="text-gray-400">{currentTestimonial.company}</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel indicators/dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonialsData.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); resetTimer(); }}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                currentIndex === i 
                  ? 'bg-blue-500 w-6' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
