import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats } from '../data/homePageData';

// TODO: Replace static `stats` with GET /api/stats

interface Stat {
  id: string;
  value: number;
  suffix: string;
  display: string;
  label: string;
}

/**
 * useCounter — counts from 0 to `target` over `duration` ms.
 * Only starts when `started` is true. Respects prefers-reduced-motion.
 */
const useCounter = (target: number, duration: number = 2000, started: boolean): number => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let raf: number;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, started]);

  return count;
};

/**
 * Formats a raw counter value into the display string for each stat.
 */
const formatCount = (stat: Stat, count: number): string => {
  return `${count}${stat.suffix}`;
};

interface StatItemProps {
  stat: Stat;
  index: number;
  started: boolean;
}

/**
 * Single stat item with entrance animation and count-up.
 */
const StatItem = ({ stat, index, started }: StatItemProps) => {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const count = useCounter(stat.value, 2000, started && !reduced);
  const display = reduced ? stat.display : formatCount(stat, count);

  return (
    <motion.div
      className={`flex-1 text-center py-16 px-6 relative group ${
        index > 0 ? 'border-l-0 sm:border-l border-white/10' : ''
      }`}
      initial={reduced ? {} : { opacity: 0, y: 20 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div
        className="text-5xl font-extrabold text-white text-glow-teal tracking-tight leading-none mb-3 group-hover:scale-105 transition-transform duration-300"
        aria-label={stat.display}
      >
        {display}
      </div>
      <div className="text-xs text-ieee-teal uppercase tracking-widest font-bold">
        {stat.label}
      </div>
    </motion.div>
  );
};

/**
 * StatsBar
 * Full-width dark navy bar with 4 animated stats.
 * Mobile: 2×2 grid. Desktop: single horizontal row with vertical dividers.
 */
const StatsBar = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="w-full bg-[#0b0f19]/35 border-t border-b border-white/5 relative overflow-hidden"
      aria-label="IEEE YP Pune key statistics"
    >
      {/* Dynamic Network / Grid background effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none select-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stats-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 178, 169, 0.1)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stats-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:flex sm:flex-row relative z-10">
        {stats.map((stat, i) => (
          <StatItem key={stat.id} stat={stat} index={i} started={inView} />
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
