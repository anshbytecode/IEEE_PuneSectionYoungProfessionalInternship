import { motion } from 'framer-motion';

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const highlights = [
  { value: '2016', label: 'Year Established' },
  { value: '500+', label: 'Active Members' },
  { value: '10',   label: 'Years of Excellence' },
  { value: '23+',  label: 'Activities in 2025' },
];

const AboutSection = () => (
  <section
    className="py-16 px-4 bg-transparent w-full"
    aria-labelledby="about-heading"
  >
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

      {/* ── LEFT: Text column ───────────────────────────────────── */}
      <motion.div
        initial={reduced ? {} : { opacity: 0, x: -24 }}
        whileInView={reduced ? {} : { opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
{/* Small Orange Badge */}
<div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/15 border border-orange-400/30 mb-3">
  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
    ABOUT US
  </span>
</div>

{/* Heading */}
<h2
  id="about-heading"
  className="text-2xl md:text-3xl font-bold text-white leading-snug mb-4 font-display"
>
  A Decade of{" "}
  <span className="text-orange-400">Connecting Engineers</span>
</h2>

{/* Body paragraph */}
<p className="text-gray-300 text-lg leading-8 max-w-3xl mb-6 font-sans">
  The IEEE Pune Section Young Professionals Affinity Group (YP AG) is a
  dynamic community that connects students, early-career professionals, and
  experienced technologists to foster professional growth and collaboration.
  Established in <span className="font-semibold text-white">2016</span>, the
  affinity group proudly celebrates{" "}
  <span className="font-semibold text-orange-400">
    10 years of continuous impact
  </span>{" "}
  in 2026.
</p>

        {/* Body paragraph 2 */}
        <p className="text-gray-400 text-sm leading-relaxed mb-8 font-sans">
          With 500+ members spanning industry, academia, and government, IEEE YP Pune serves as a
          bridge between education and profession — through technical workshops, career sessions,
          research initiatives, and industry collaborations.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/activities"
            className="bg-gradient-to-r from-[#005B99] to-[#0077B6] hover:from-[#004C80] hover:to-[#006699] hover:shadow-[0_0_20px_rgba(0,102,153,0.45)] text-white px-6 py-2.5 rounded-full font-semibold hover:scale-105 transition-all duration-300 text-sm text-center cursor-pointer tracking-wide"
            aria-label="Explore IEEE YP Pune activities"
          >
            OUR ACTIVITIES
          </a>
          <a
            href="#"
            className="border border-white/10 hover:border-ieee-teal text-white hover:text-ieee-teal px-6 py-2.5 rounded-full font-bold hover:scale-[1.02] transition-all text-sm text-center cursor-pointer uppercase tracking-widest"
            aria-label="Join IEEE YP Pune"
          >
            Join IEEE YP
          </a>
        </div>
      </motion.div>

      {/* ── RIGHT: Stats highlight grid ─────────────────────────── */}
      <div className="grid grid-cols-2 gap-4">
        {highlights.map((item, i) => (
          <motion.div
            key={item.label}
            className="bg-[#0b0f19]/45 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-lg hover:shadow-[0_0_20px_rgba(0,178,169,0.15)] hover:border-ieee-teal/30 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            whileInView={reduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            {/* Hover sliding border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-ieee-teal to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left" />

            <div className="text-3xl font-extrabold text-white leading-none group-hover:text-ieee-teal transition-colors duration-200 font-display">
              {item.value}
            </div>
            <div className="text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-widest">{item.label}</div>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);

export default AboutSection;
