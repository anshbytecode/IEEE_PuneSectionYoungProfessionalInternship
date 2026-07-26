import { useState } from 'react';

/**
 * YPScoopStrip
 * Newsletter subscription strip — placed just above Footer.
 */
const YPScoopStrip = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(
    () => typeof window !== 'undefined' && localStorage.getItem('yp_scoop_subscribed') === 'true'
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    localStorage.setItem('yp_scoop_subscribed', 'true');
    setSubscribed(true);
  };

  return (
    <section
      className="py-12 px-4 bg-slate-950/20 border-t border-b border-white/5 relative overflow-hidden w-full"
      aria-labelledby="ypscoop-heading"
    >
      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Label */}
        <p className="text-xs font-bold tracking-widest text-ieee-teal uppercase mb-2">
          YP SCOOP
        </p>

        {/* Heading */}
        <h2
          id="ypscoop-heading"
          className="text-2xl font-extrabold text-white font-display"
        >
          Stay Connected with IEEE YP Pune
        </h2>

        {/* Subtext */}
        <p className="text-gray-400 text-sm mt-2 mb-6 leading-relaxed font-sans">
          Subscribe to YP Scoop — our quarterly e-newsletter keeping members informed about
          activities, opportunities, and developments within the affinity group.
        </p>

        {subscribed ? (
          <p className="text-ieee-teal font-bold text-base">
            ✓ You're subscribed!
          </p>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            aria-label="Subscribe to YP Scoop newsletter"
          >
            <label htmlFor="ypscoop-email" className="sr-only">
              Enter your email address
            </label>
            <input
              id="ypscoop-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="px-5 py-2.5 rounded-full bg-slate-900/60 text-white text-sm w-72 border border-white/10 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-ieee-teal transition-all font-semibold"
              aria-label="Email address for YP Scoop subscription"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-ieee-teal to-cyan-500 hover:shadow-[0_0_15px_rgba(0,178,169,0.5)] text-white font-bold px-6 py-2.5 rounded-full hover:scale-105 transition-all text-sm whitespace-nowrap cursor-pointer uppercase tracking-widest text-[11px]"
            >
              Subscribe
            </button>
          </form>
        )}

        {/* Note */}
        <p className="text-gray-500 text-xs mt-3">
          First edition released January 2026. Quarterly cadence.
        </p>
      </div>
    </section>
  );
};

export default YPScoopStrip;
