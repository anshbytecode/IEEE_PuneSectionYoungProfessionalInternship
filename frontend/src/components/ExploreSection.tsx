import { motion } from 'framer-motion';
import { GraduationCap, Network, Briefcase, Zap, BookOpen, Users, Award } from 'lucide-react';
import { exploreCards } from '../data/homePageData';

const ICON_MAP = {
  GraduationCap,
  Network,
  Briefcase,
  Zap,
  BookOpen,
  Users,
  Award,
};

interface ExploreCard {
  id: string | number;
  href: string;
  icon: keyof typeof ICON_MAP;
  title: string;
  description: string;
}

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ExploreSection = () => (
  <section
    className="py-16 px-4 bg-transparent w-full"
    aria-labelledby="explore-heading"
  >
    <div className="max-w-7xl mx-auto">
      {/* ── Centred header ──────────────────────────────────────── */}
      <div className="text-center mb-12">
       <h2
  id="explore-heading"
  className="text-3xl font-extrabold text-[#00629B] font-display"
>
  Explore YP Programmes
</h2>

<div className="w-24 h-1 bg-[#F59E0B] rounded-full mx-auto mt-3"></div>
        <p className="text-gray-400 text-sm mt-2 leading-relaxed font-sans max-w-xl mx-auto">
          Discover the flagship initiatives that drive IEEE YP Pune's mission of connecting and empowering early-career engineers.
        </p>
      </div>

      {/* ── 4-column feature card grid ──────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {(exploreCards as ExploreCard[]).map((card, i) => {
          const Icon = ICON_MAP[card.icon] || GraduationCap;
          return (
            <motion.a
              key={card.id}
              href={card.href}
              className="bg-[#0b0f19]/45 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-lg hover:shadow-[0_0_20px_rgba(0,178,169,0.15)] hover:border-ieee-teal/30 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer block relative overflow-hidden group"
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              whileInView={reduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              aria-label={card.title}
            >
              {/* Hover border top glow */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-ieee-teal to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left" />

              {/* Icon box wrapper */}
              <div className="w-11 h-11 rounded-xl bg-ieee-teal/10 border border-ieee-teal/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 text-ieee-teal">
                <Icon size={20} aria-hidden="true" />
              </div>

              {/* Card text */}
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-ieee-teal transition-colors duration-250 font-display">
                {card.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans">
                {card.description}
              </p>

              {/* Action indicator at bottom */}
              <div className="mt-5 flex items-center gap-1 text-[10px] font-bold text-ieee-teal tracking-widest uppercase opacity-85 group-hover:opacity-100 transition-opacity duration-200">
                <span>Explore Programme</span>
                <span className="transform transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  </section>
);

export default ExploreSection;
