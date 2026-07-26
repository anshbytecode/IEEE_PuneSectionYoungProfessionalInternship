import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks, utilityLinks } from '../data/homePageData';
import { useAuth } from '../context/AuthContext';

// Resolved asset imports
import ypLogoImg from '../assets/IeePuneYP_logo.png';
import logoImg from '../assets/Logo.png';

/**
 * Navbar
 * Modern, futuristic sticky glassmorphic navigation bar with spring-animated sliding active outlines.
 */
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, admin, logout } = useAuth();

  const isIEEEAdmin = isAuthenticated && admin && (
    admin.email.toLowerCase().endsWith('@ieee.org') ||
    admin.email.toLowerCase().endsWith('@ieeepune.org')
  );

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050816]/75 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
      {/* ── Layer 1: Utility bar (Global IEEE Links) ────────────────────── */}
      <div className="bg-slate-950/60 border-b border-white/5 w-full">
        <div className="max-w-7xl mx-auto h-7 flex items-center px-4 md:px-8">
          <nav
            className="flex items-center flex-wrap text-gray-500 text-[10px] font-bold gap-0"
            aria-label="Global IEEE sites"
          >
            {utilityLinks.map((link, i) => (
              <span key={link.id} className="flex items-center">
                {i > 0 && (
                  <span className="mx-2 text-white/10 select-none font-normal">|</span>
                )}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ieee-teal transition-colors duration-150 py-0.5 tracking-wider uppercase"
                >
                  {link.label}
                </a>
              </span>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-5 pb-3.5 flex items-center justify-between">
        
        {/* Left: Logo brand */}
        <a href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity duration-200" aria-label="IEEE YP Pune — go to homepage">
          <img
            src={ypLogoImg}
            alt="IEEE YP Pune"
            className="h-10 md:h-12 w-auto object-contain brightness-110 filter"
          />
        </a>

        {/* Center: Desktop Navigation Links with spring-sliding active lines */}
        <nav className="hidden md:flex items-center gap-1.5" aria-label="Main site navigation">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <a
                key={link.id}
                href={link.href}
                className={`text-xs font-bold px-4 py-2 transition-all duration-200 uppercase tracking-wider relative group ${
                  active ? 'text-ieee-teal' : 'text-gray-300 hover:text-white'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <span>{link.label}</span>
                {active && (
                  <motion.span
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-ieee-teal shadow-[0_0_12px_rgba(0,178,169,0.8)] rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {!active && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: IEEE global logo and auth controls */}
        <div className="flex items-center gap-4">
          <a href="https://www.ieee.org" target="_blank" rel="noopener noreferrer" className="hidden sm:block" aria-label="IEEE global website">
            <img
              src={logoImg}
              alt="IEEE"
              className="h-8 w-auto object-contain brightness-110 filter hover:scale-105 transition-transform duration-200"
            />
          </a>

          {/* Desktop Auth Controls */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {isIEEEAdmin && (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="text-xs font-bold px-4 py-1.5 rounded-full bg-gradient-to-r from-ieee-teal to-purple-600 text-white hover:shadow-[0_0_15px_rgba(0,178,169,0.5)] hover:scale-105 transition-all duration-200 cursor-pointer"
                  >
                    DASHBOARD
                  </button>
                )}
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="text-xs font-bold px-4 py-1.5 rounded-full text-white/80 hover:text-white bg-red-600/30 hover:bg-red-600/70 border border-red-600/20 hover:scale-105 transition-all duration-200 cursor-pointer"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <a
                href="https://www.ieee.org/membership/join/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold px-4 py-1.5 rounded-full border border-white/10 hover:border-ieee-teal text-white hover:text-ieee-teal hover:shadow-[0_0_12px_rgba(0,178,169,0.25)] transition-all hover:scale-105"
              >
                JOIN IEEE
              </a>
            )}
          </div>

          {/* Hamburger Menu (Mobile) */}
          <button
            className="md:hidden text-gray-300 hover:text-ieee-teal transition-colors duration-150 p-1"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Nav Capsule Overlay ─────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-4 right-4 bg-slate-950/95 backdrop-blur-lg border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-1 md:hidden z-50"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`text-sm font-bold uppercase tracking-wider px-4 py-3 rounded-xl transition-all duration-150 flex items-center ${
                  isActive(link.href)
                    ? 'bg-ieee-teal/20 text-ieee-teal'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => setMobileOpen(false)}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
            {/* Mobile Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-white/10">
                {isIEEEAdmin && (
                  <button
                    onClick={() => { setMobileOpen(false); navigate('/dashboard'); }}
                    className="w-full text-center text-sm font-bold px-4 py-2.5 rounded-xl bg-gradient-to-r from-ieee-teal to-purple-600 text-white cursor-pointer"
                  >
                    ADMIN DASHBOARD
                  </button>
                )}
                <button
                  onClick={() => { setMobileOpen(false); logout(); navigate('/'); }}
                  className="w-full text-center text-sm font-bold px-4 py-2.5 rounded-xl bg-red-600/30 text-white border border-red-600/20 cursor-pointer"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <a
                href="https://www.ieee.org/membership/join/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center text-sm font-bold px-4 py-2.5 rounded-xl border border-white/10 text-white hover:bg-white/5 mt-2"
                onClick={() => setMobileOpen(false)}
              >
                JOIN IEEE
              </a>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
