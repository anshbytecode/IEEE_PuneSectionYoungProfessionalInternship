/**
 * CTABanner
 * "Join IEEE Young Professionals Pune Section" call-to-action.
 */
const CTABanner = () => (
  <section
    className="py-12 px-4 bg-transparent w-full"
    aria-labelledby="cta-heading"
  >
    {/* Contained glass card */}
    <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden bg-[#0b0f19]/45 backdrop-blur-md border border-white/5 py-16 px-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative group">
      {/* Dynamic hover overlay glow */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Hover border top glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-ieee-teal to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left" />
<h2
  id="cta-heading"
  className="text-3xl font-extrabold text-white leading-tight relative z-10 font-display"
>
  Join <span className="text-[#F59E0B]">IEEE Young Professionals</span>
  <br />
  Pune Section
</h2>

      <p className="text-gray-400 text-sm md:text-base mt-3 mb-8 max-w-lg mx-auto leading-relaxed relative z-10 font-sans">
        Connect with 500+ early-career engineers, access mentorship, attend technical events,
        and grow your career within the global IEEE ecosystem.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
        {/* Primary button */}
        <a
          href="https://www.ieee.org/membership/join/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-ieee-teal to-cyan-500 hover:shadow-[0_0_15px_rgba(0,178,169,0.5)] text-white font-bold px-8 py-3.5 rounded-full hover:scale-105 transition-all w-full sm:w-auto text-center cursor-pointer uppercase tracking-widest text-xs"
          aria-label="Join IEEE YP Pune now"
        >
          Join Now
        </a>

        {/* Secondary button */}
        <a
          href="/about"
          className="border border-white/15 hover:border-ieee-teal text-white hover:text-ieee-teal bg-white/5 font-bold px-8 py-3.5 rounded-full hover:scale-105 transition-all w-full sm:w-auto text-center cursor-pointer uppercase tracking-widest text-xs"
          aria-label="Learn more about IEEE YP Pune"
        >
          Learn More
        </a>
      </div>
    </div>
  </section>
);

export default CTABanner;
