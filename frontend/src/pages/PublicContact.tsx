import React, { useState } from 'react';
import { contactService } from '../services/contactService';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Send } from 'lucide-react';
import { Spin } from 'antd';

export const PublicContact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      const res = await contactService.submitContact(formData);
      if (res.success) {
        setSuccessMsg(res.message || 'Thank you! Your message was submitted successfully.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data?.message || 'Failed to send message. Please try again.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

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
              <Mail size={12} />
              <span>Support &amp; Inquiry</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 font-display">
              Get In{' '}
              <span className="bg-gradient-to-r from-ieee-teal via-cyan-400 to-indigo-500 bg-clip-text text-transparent filter drop-shadow-[0_0_15px_rgba(0,178,169,0.15)]">
                Touch With Us
              </span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-sans">
              Have questions about upcoming events, blogs, memberships, or partnerships? Send us a message below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. TWO COLUMN LAYOUT ──────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Details (col-span-5) */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4 font-display">Contact Information</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Fill out the form and our committee members will reach out to you within 2 business days.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-ieee-teal/10 border border-ieee-teal/20 flex items-center justify-center text-ieee-teal shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email Inquiry</span>
                    <span className="text-white font-semibold text-sm select-all">ieeepunesectionyp@gmail.com</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-ieee-teal/10 border border-ieee-teal/20 flex items-center justify-center text-ieee-teal shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Affiliation Hub</span>
                    <span className="text-white font-semibold text-sm">IEEE Pune Section, Pune, MH, India</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-ieee-teal/10 border border-ieee-teal/20 flex items-center justify-center text-ieee-teal shrink-0">
                    <Clock size={16} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Office Hours</span>
                    <span className="text-white font-semibold text-sm">Monday - Friday, 10:00 AM - 6:00 PM IST</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Contact Form (col-span-7) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <form
                onSubmit={handleSubmit}
                className="bg-[#0b0f19]/45 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] space-y-6"
              >
                {/* Alert Messages */}
                {successMsg && (
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold">
                    {successMsg}
                  </div>
                )}
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold">
                    {errorMsg}
                  </div>
                )}

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="E.g. Dr. Ramesh Kumar"
                    required
                    className="w-full px-4 py-2.5 bg-slate-950/60 border border-white/10 focus:border-ieee-teal focus:ring-1 focus:ring-ieee-teal rounded-xl text-sm text-white focus:outline-none transition-all placeholder-gray-600"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="E.g. ramesh@example.com"
                    required
                    className="w-full px-4 py-2.5 bg-slate-950/60 border border-white/10 focus:border-ieee-teal focus:ring-1 focus:ring-ieee-teal rounded-xl text-sm text-white focus:outline-none transition-all placeholder-gray-600"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="E.g. Inquiring about partnership opportunities"
                    className="w-full px-4 py-2.5 bg-slate-950/60 border border-white/10 focus:border-ieee-teal focus:ring-1 focus:ring-ieee-teal rounded-xl text-sm text-white focus:outline-none transition-all placeholder-gray-600"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write details of your inquiry here..."
                    required
                    className="w-full px-4 py-2.5 bg-slate-950/60 border border-white/10 focus:border-ieee-teal focus:ring-1 focus:ring-ieee-teal rounded-xl text-sm text-white focus:outline-none transition-all placeholder-gray-600 resize-none"
                  />
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-ieee-teal to-cyan-500 hover:shadow-[0_0_15px_rgba(0,178,169,0.5)] text-white font-bold py-3 rounded-xl text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer uppercase tracking-widest hover:scale-[1.01]"
                >
                  {loading ? (
                    <Spin size="small" />
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};
