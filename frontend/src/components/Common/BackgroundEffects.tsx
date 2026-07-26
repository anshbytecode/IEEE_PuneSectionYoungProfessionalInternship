import React from 'react';
import { motion } from 'framer-motion';
import { ParticleCanvas } from './ParticleCanvas';

export const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 bg-[#050816]">
      {/* ── 1. Cyber Grid Texture Overlay ────────────────────────────── */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.07]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── 2. Aurora Glow Blobs (Animated) ─────────────────────────── */}
      {/* Top Left - Cyan Blob */}
      <motion.div
        className="absolute w-[45vw] h-[45vw] md:w-[500px] md:h-[500px] rounded-full bg-cyan-500/10 blur-[120px] top-[-10%] left-[-10%]"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Bottom Right - Purple Blob */}
      <motion.div
        className="absolute w-[50vw] h-[50vw] md:w-[600px] md:h-[600px] rounded-full bg-purple-600/10 blur-[130px] bottom-[-15%] right-[-10%]"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Middle Center - IEEE Blue Blob */}
      <motion.div
        className="absolute w-[40vw] h-[40vw] md:w-[450px] md:h-[450px] rounded-full bg-blue-600/5 blur-[110px] top-[30%] left-[25%]"
        animate={{
          x: [0, 30, -30, 0],
          y: [0, 20, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* ── 3. Starry Constellation Nodes Grid ──────────────────────── */}
      <ParticleCanvas />
      
      {/* Subtle bottom gradient shadow */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050816] to-transparent" />
    </div>
  );
};
