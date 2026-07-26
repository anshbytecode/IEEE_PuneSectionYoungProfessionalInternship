import React, { useState, useEffect } from 'react';
import { teamService, TeamMemberItem } from '../services/teamService';
import { motion } from 'framer-motion';
import { Mail, Briefcase, Award, Users } from 'lucide-react';
import { Spin } from 'antd';

const LinkedinIcon: React.FC<{ size?: number; color?: string }> = ({ size = 12, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const PublicAbout: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMemberItem[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const res = await teamService.getTeam();
        if (res.success && res.teamMembers) {
          const sorted = res.teamMembers.sort((a, b) => a.orderIndex - b.orderIndex);
          setTeamMembers(sorted);
        }
      } catch (err) {
        console.error('Failed to load team members', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <div className="relative text-[#F8FAFC] pb-24 w-full">
      {/* ── 1. HERO HEADER ────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-16 px-4 md:px-8 text-center border-b border-white/5 bg-slate-950/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ieee-teal/15 border border-ieee-teal/25 rounded-full text-ieee-teal text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_12px_rgba(0,178,169,0.1)]">
              <Users size={12} />
              <span>About Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 font-display">
              Meet the{' '}
              <span className="bg-gradient-to-r from-ieee-teal via-cyan-400 to-indigo-500 bg-clip-text text-transparent filter drop-shadow-[0_0_15px_rgba(0,178,169,0.15)]">
                IEEE Pune YP Committee
              </span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-sans">
              Learn about our core focus, the values we stand for, and the committee members driving these initiatives in the Pune Section.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. MISSION & VALUES ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 font-display">Our Mission & Values</h2>
            <p className="text-gray-400 text-base leading-relaxed mb-4">
              IEEE Pune Section Young Professionals Affinity Group is dedicated to the professional development and networking of IEEE members who have graduated within the last decade.
            </p>
            <p className="text-gray-400 text-base leading-relaxed mb-6">
              We facilitate collaborative projects, educational forums, and industrial seminars. Our primary focus areas are:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-2 h-2 rounded-full bg-ieee-teal mt-2 shrink-0" />
                <span><strong className="text-white font-semibold">Professional Mentoring:</strong> Bridging the gap between corporate leaders and early career graduates.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-2 h-2 rounded-full bg-ieee-teal mt-2 shrink-0" />
                <span><strong className="text-white font-semibold">Continuous Learning:</strong> High-impact technical events on modern technology concepts.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-2 h-2 rounded-full bg-ieee-teal mt-2 shrink-0" />
                <span><strong className="text-white font-semibold">Networking Ecosystem:</strong> Building cross-border networks with global tech practitioners.</span>
              </li>
            </ul>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#0b0f19]/45 backdrop-blur-md rounded-2xl border border-white/5 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] space-y-8"
          >
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-ieee-teal/10 border border-ieee-teal/20 flex items-center justify-center text-ieee-teal shrink-0">
                <Award size={18} />
              </div>
              <div>
                <h3 className="font-bold text-white text-base font-display">Industry Impact</h3>
                <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                  Connecting local chapters directly to core technology platforms and firms.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-ieee-teal/10 border border-ieee-teal/20 flex items-center justify-center text-ieee-teal shrink-0">
                <Briefcase size={18} />
              </div>
              <div>
                <h3 className="font-bold text-white text-base font-display">Empowered Careers</h3>
                <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                  Leveraging resources to support career advancement and technical mastery.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. ACTIVE LEADERS ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="text-center mb-12">
          <span className="text-ieee-teal font-bold text-xs uppercase tracking-wider block mb-2">Active Leaders</span>
          <h2 className="text-3xl font-extrabold text-white font-display">Executive Committee</h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Spin size="large" />
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center py-12 bg-[#0b0f19]/45 border border-dashed border-white/10 rounded-2xl text-gray-400">
            <p>No team members added to the list yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member.id}
                className="bg-[#0b0f19]/45 backdrop-blur-md rounded-2xl border border-white/5 p-6 text-center flex flex-col items-center shadow-[0_8px_32px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_32px_rgba(0,178,169,0.15)] hover:border-ieee-teal/30 transition-all duration-300 group"
                initial={reduced ? {} : { opacity: 0, y: 15 }}
                whileInView={reduced ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                {/* Profile Image with neon highlight ring */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-ieee-teal shadow-[0_0_12px_rgba(0,178,169,0.3)] mb-4 shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={member.profileImageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200'}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name & Role */}
                <h3 className="font-bold text-white text-base font-display transition-colors group-hover:text-ieee-teal">
                  {member.name}
                </h3>
                <span className="text-ieee-teal text-xs font-semibold uppercase tracking-wider block mt-1">
                  {member.position}
                </span>

                {/* Affiliation */}
                {member.affiliation && (
                  <p className="text-gray-400 text-xs italic mt-2 min-h-[32px] line-clamp-2 leading-relaxed">
                    {member.affiliation}
                  </p>
                )}

                {/* Contact Email/Phone */}
                {member.contact && (
                  <div className="flex items-center gap-1 text-gray-500 text-xs mt-3 select-all">
                    <Mail size={12} className="shrink-0" />
                    <span>{member.contact}</span>
                  </div>
                )}

                {/* LinkedIn Link (Magnetic/gradient styling) */}
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-ieee-teal to-cyan-500 hover:shadow-[0_0_12px_rgba(0,178,169,0.4)] text-white text-xs font-bold py-2 rounded-full transition-all duration-200 shrink-0 cursor-pointer"
                  >
                    <LinkedinIcon size={12} />
                    <span>LinkedIn Profile</span>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
