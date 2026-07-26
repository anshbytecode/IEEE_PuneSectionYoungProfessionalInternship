import React, { useState, useEffect } from 'react';
import AnnouncementBanner from '../AnnouncementBanner';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { BackgroundEffects } from '../Common/BackgroundEffects';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('yp_splash_seen');
    }
    return true;
  });

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('yp_splash_seen', 'true');
        }
      }, 2500); // 2.5 seconds cinematic loading
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const titleText = "IEEE PUNE SECTION";
  const subtitleText = "YOUNG PROFESSIONALS";

  return (
    <div className="min-h-screen flex flex-col font-sans bg-page-bg text-body-text dark relative overflow-hidden">
      {/* ── 1. CINEMATIC SPLASH LOADER ────────────────────────────────── */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.85, ease: [0.85, 0, 0.15, 1] }}
            className="fixed inset-0 bg-[#02040a] z-[9999] flex flex-col items-center justify-center select-none overflow-hidden"
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,178,169,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,178,169,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            {/* Glowing blur auroras */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-ieee-teal/5 blur-[80px] pointer-events-none" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-purple-650/5 blur-[60px] pointer-events-none animate-pulse" />

            {/* Rotating Logo Scanner */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative flex items-center justify-center mb-10"
            >
              {/* Outer fast spinning ring */}
              <div className="absolute w-28 h-28 rounded-full border border-dashed border-ieee-teal/35 border-t-ieee-teal animate-spin" style={{ animationDuration: '4s' }} />
              {/* Inner slower reverse spinning ring */}
              <div className="absolute w-24 h-24 rounded-full border border-double border-cyan-400/20 border-b-cyan-400/60 animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }} />
              {/* Pulsing glow layer */}
              <div className="absolute w-20 h-20 rounded-full bg-ieee-teal/10 animate-ping" style={{ animationDuration: '2s' }} />
              
              {/* Logo Core */}
              <div className="w-16 h-16 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center text-ieee-teal shadow-[0_0_35px_rgba(0,178,169,0.3)] relative z-10">
                <Sparkles size={26} className="animate-pulse" />
              </div>
            </motion.div>

            {/* Character Staggered Heading */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05, delayChildren: 0.2 }
                }
              }}
              className="flex gap-[0.15em] justify-center items-center"
            >
              {Array.from(titleText).map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
                    visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className={`text-white text-xl md:text-2xl font-extrabold font-display tracking-widest ${char === ' ' ? 'w-2 md:w-3' : ''}`}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* Subtitle letter fade in */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.04, delayChildren: 0.85 }
                }
              }}
              className="flex gap-[0.2em] justify-center items-center mt-3"
            >
              {Array.from(subtitleText).map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 0.55 }
                  }}
                  className={`text-[9px] md:text-xs font-bold text-gray-400 font-mono tracking-widest ${char === ' ' ? 'w-1.5 md:w-2.5' : ''}`}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* Futuristic Progress Tracker */}
            <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden mt-10 relative">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-transparent via-ieee-teal to-cyan-400 shadow-[0_0_8px_rgba(0,178,169,0.5)]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 2. MAIN WEBSITE LAYOUT ────────────────────────────────────── */}
      <BackgroundEffects />
      <div className="relative z-10 flex flex-col min-h-screen w-full">
        <AnnouncementBanner />
        <Navbar />
        <motion.main 
          id="main-content" 
          className="flex-grow flex flex-col"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: loading ? 0.3 : 0 }}
        >
          {children}
        </motion.main>
        <Footer />
      </div>
    </div>
  );
};
