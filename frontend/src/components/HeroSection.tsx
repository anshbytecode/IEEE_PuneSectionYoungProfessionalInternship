import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides, featuredAchievement } from '../data/homePageData';

interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  imageAlt: string;
}

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const total = heroSlides.length;

  const goPrev = useCallback(
    () => setCurrent((c) => (c - 1 + total) % total),
    [total]
  );
  const goNext = useCallback(
    () => setCurrent((c) => (c + 1) % total),
    [total]
  );

  useEffect(() => {
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [goNext]);

  const slide = (heroSlides as HeroSlide[])[current];

  return (
    <section
      className="bg-transparent py-8 px-4 md:px-8 w-full"
      aria-label="Featured event and achievement"
    >
      {/* ── Framed glass container ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col lg:flex-row bg-[#0b0f19]/45 backdrop-blur-md border border-white/5">

        {/* ── LEFT: Carousel ─────────────────────────────────────── */}
        <div
          className="relative lg:w-3/5 w-full overflow-hidden"
          style={{ minHeight: '380px' }}
          aria-label="Event carousel"
          aria-roledescription="carousel"
        >
          {/* Slide images with crossfade */}
          {(heroSlides as HeroSlide[]).map((s, i: number) => (
            <img
              key={s.id}
              src={s.imageUrl}
              alt={s.imageAlt}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
                i === current ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              aria-hidden={i !== current}
            />
          ))}

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 pointer-events-none" />

          {/* Badge top-left */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-ieee-teal text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-[0_0_12px_rgba(0,178,169,0.3)]">
              {slide.badge}
            </span>
          </div>

          {/* Title + subtitle — bottom left */}
          <div className="absolute bottom-14 left-6 right-14 z-10">
            <h1 className="text-white text-2xl md:text-3xl font-extrabold leading-tight mb-2 font-display">
              {slide.title}
            </h1>
            <p className="text-white/80 text-xs md:text-sm leading-relaxed font-sans max-w-xl">
              {slide.subtitle}
            </p>
          </div>

          {/* Dot indicators */}
          <div
            className="absolute bottom-4 left-6 flex items-center gap-2 z-10"
            role="tablist"
            aria-label="Carousel slide indicators"
          >
            {(heroSlides as HeroSlide[]).map((_, i: number) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current
                    ? 'w-6 bg-ieee-teal shadow-[0_0_8px_rgba(0,178,169,0.8)]'
                    : 'w-1.5 bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

          {/* Prev arrow */}
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-slate-950/45 hover:bg-slate-950/75 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer hover:scale-105"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>

          {/* Next arrow */}
          <button
            onClick={goNext}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-slate-950/45 hover:bg-slate-950/75 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer hover:scale-105"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>

        {/* ── RIGHT: Achievement card ──────────────────────────── */}
        <div
          className="lg:w-2/5 w-full bg-slate-950/20 p-6 md:p-8 flex flex-col border-t lg:border-t-0 lg:border-l border-white/5 relative group"
          aria-label="Featured achievement"
        >
          {/* Subtle top border glow */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-ieee-teal to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Badge */}
          <span className="self-start text-[10px] font-bold text-ieee-teal bg-ieee-teal/15 border border-ieee-teal/25 px-2.5 py-1 rounded uppercase tracking-wider mb-4">
            {featuredAchievement.badge}
          </span>

          {/* Heading */}
          <h2 className="text-xl font-extrabold text-white mb-4 leading-snug font-display">
            {featuredAchievement.title}
          </h2>

          {/* Image Container with Zoom */}
          <div className="w-full h-40 overflow-hidden rounded-xl mb-4 border border-white/5 relative">
            <img
              src={featuredAchievement.imageUrl}
              alt={featuredAchievement.imageAlt}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="eager"
            />
          </div>

          {/* Body text */}
          <p className="text-xs md:text-sm text-gray-400 leading-relaxed flex-1 font-sans">
            {featuredAchievement.body}
          </p>

          {/* Read more */}
          <a
            href={featuredAchievement.linkHref}
            className="mt-5 text-xs font-bold text-ieee-teal hover:text-white transition-colors inline-flex items-center gap-1 group/link cursor-pointer uppercase tracking-wider"
            aria-label="Read more about this achievement"
          >
            <span>Learn about our journey</span>
            <span className="transform transition-transform duration-200 group-hover/link:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
