import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Calendar, Users, Building2, MapPin, Clock, ChevronRight,
  ChevronLeft, ChevronDown, ArrowRight, Sparkles, UserPlus,
  X, Filter
} from 'lucide-react';

import { eventService, EventItem } from '../services/eventService';
import { mediaService } from '../services/mediaService';

import {
  activitiesPageStats,
  pastMoments,
} from '../data/homePageData';

/* ── Icon map for dynamic stat icons ─────────────────────────── */
const ICON_MAP = { Calendar, Users, Building2 };

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Category pill colors ────────────────────────────────────── */
const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  Networking: { bg: 'bg-emerald-100 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-400', dot: 'bg-emerald-500' },
  'Tech Talk': { bg: 'bg-blue-100 dark:bg-blue-950/40', text: 'text-blue-700 dark:text-blue-400', dot: 'bg-blue-500' },
  Workshop: { bg: 'bg-amber-100 dark:bg-amber-950/40', text: 'text-amber-700 dark:text-amber-400', dot: 'bg-amber-500' },
  'Industry Connect': { bg: 'bg-purple-100 dark:bg-purple-950/40', text: 'text-purple-700 dark:text-purple-400', dot: 'bg-purple-500' },
  Flagship: { bg: 'bg-ieee-light dark:bg-ieee-blue/20', text: 'text-ieee-blue dark:text-ieee-teal', dot: 'bg-ieee-teal' },
  Leadership: { bg: 'bg-rose-100 dark:bg-rose-950/40', text: 'text-rose-700 dark:text-rose-400', dot: 'bg-rose-500' },
  Technical: { bg: 'bg-sky-100 dark:bg-sky-950/40', text: 'text-sky-700 dark:text-sky-400', dot: 'bg-sky-500' },
};

interface ActivityCardProps {
  event: {
    id: string;
    category: string;
    status: string;
    day: string;
    month: string;
    year: string;
    title: string;
    subtitle: string;
    venue: string;
    time: string;
    imageUrl: string;
    imageAlt: string;
  };
  index: number;
  onClick: () => void;
}

/* ══════════════════════════════════════════════════════════════════
   ACTIVITY CARD (Standard Grid Card with Hover Lift)
   ══════════════════════════════════════════════════════════════════ */
const ActivityCard = ({ event, index, onClick }: ActivityCardProps) => {
  const catStyle = CATEGORY_COLORS[event.category] || {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-700 dark:text-gray-300',
    dot: 'bg-gray-500'
  };

  return (
    <motion.article
      onClick={onClick}
      className="bg-white dark:bg-[#0b0f19]/60 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-200 group cursor-pointer hover-lift flex flex-col justify-between"
      initial={reduced ? {} : { opacity: 0, y: 20 }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      aria-label={`Event: ${event.title}`}
    >
      <div>
        {/* Cover Image */}
        <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-gray-900">
          <img
            src={event.imageUrl}
            alt={event.imageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {/* Category Pill */}
          <span className={`absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm ${catStyle.bg} ${catStyle.text}`}>
            {event.category}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <div className="flex items-start gap-3">
            {/* Date Box */}
            <div className="flex flex-col items-center justify-center bg-ieee-light dark:bg-ieee-blue/20 rounded-lg px-3 py-2 shrink-0 border border-ieee-blue/10 dark:border-ieee-teal/20 text-center">
              <span className="text-xl font-extrabold text-ieee-blue dark:text-ieee-teal leading-none">{event.day}</span>
              <span className="text-[10px] font-bold text-ieee-blue dark:text-white/80 uppercase tracking-wider mt-0.5">{event.month}</span>
              <span className="text-[9px] text-ieee-gray dark:text-gray-400">{event.year}</span>
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold text-ieee-dark dark:text-white leading-snug line-clamp-2 group-hover:text-ieee-blue dark:group-hover:text-ieee-teal transition-colors">
                {event.title}
              </h3>
              <p className="text-xs text-ieee-gray dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                {event.subtitle}
              </p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/5 space-y-1.5 text-xs text-ieee-gray dark:text-gray-400">
            <div className="flex items-center gap-2 truncate">
              <MapPin size={14} className="shrink-0 text-ieee-blue dark:text-ieee-teal" />
              <span className="truncate">{event.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="shrink-0 text-ieee-blue dark:text-ieee-teal" />
              <span>{event.time}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

interface MomentUIItem {
  id: string | number;
  label: string;
  imageUrl: string;
  imageAlt: string;
}

interface ActivityPageStat {
  id: string;
  icon: 'Calendar' | 'Users' | 'Building2';
  value: string | number;
  label: string;
}

/* ══════════════════════════════════════════════════════════════════
   ACTIVITIES PAGE
   ══════════════════════════════════════════════════════════════════ */
const ActivitiesPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dbEvents, setDbEvents] = useState<EventItem[]>([]);
  const [moments, setMoments] = useState<MomentUIItem[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentCalendarDate, setCurrentCalendarDate] = useState<Date>(new Date());
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch events and gallery on load
  useEffect(() => {
    const loadPageData = async () => {
      try {
        setLoading(true);
        const [eventsRes, mediaRes] = await Promise.all([
          eventService.getEvents(),
          mediaService.getMedia({ file_type: 'image', limit: 5 })
        ]);

        if (eventsRes.success && eventsRes.events) {
          setDbEvents(eventsRes.events.filter(e => !e.isDeleted));
        }

        if (mediaRes.success && mediaRes.media && mediaRes.media.length > 0) {
          setMoments(mediaRes.media.map(m => ({
            id: m.id,
            label: m.event_title || m.fileName.split('.')[0],
            imageUrl: m.fileUrl,
            imageAlt: m.fileName
          })));
        } else {
          setMoments(pastMoments as MomentUIItem[]);
        }
      } catch (err) {
        console.error('Failed to load activities page data:', err);
        setMoments(pastMoments as MomentUIItem[]);
      } finally {
        setLoading(false);
      }
    };
    loadPageData();
  }, []);

  // Format events to standard UI structure
  const activitiesList = useMemo(() => {
    return dbEvents.map(event => {
      const dateObj = new Date(event.eventDate);
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      const year = String(dateObj.getFullYear());

      let formattedTime = 'All Day';
      if (event.eventDate.includes('T')) {
        const timePart = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        if (timePart !== '12:00 AM') {
          formattedTime = timePart;
        }
      }

      return {
        id: event.id,
        rawDate: dateObj,
        category: event.category || 'Technical',
        status: event.status === 'Upcoming' ? 'upcoming' : 'past',
        day,
        month,
        year,
        title: event.title,
        subtitle: event.shortDescription,
        venue: event.venue,
        time: formattedTime,
        imageUrl: event.bannerUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
        imageAlt: `${event.title} cover`,
      };
    });
  }, [dbEvents]);

  // Compute categories with counts dynamically
  const activitiesCategories = useMemo(() => {
    const counts: Record<string, number> = {};
    activitiesList.forEach(e => {
      counts[e.category] = (counts[e.category] || 0) + 1;
    });

    const sidebarCategories = [
      { id: "cat-all", label: "All Activities", count: activitiesList.length, color: "bg-ieee-blue dark:bg-ieee-teal" }
    ];

    Object.keys(counts).forEach((cat, index) => {
      const style = CATEGORY_COLORS[cat] || { dot: 'bg-gray-500' };
      sidebarCategories.push({
        id: `cat-${index}`,
        label: cat,
        count: counts[cat],
        color: style.dot
      });
    });

    return sidebarCategories;
  }, [activitiesList]);

  // Calendar Day Computation
  const calendarGridDays = useMemo(() => {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Monday-based indexing: 0 = Mon, ..., 6 = Sun
    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const days: Array<{
      date: Date;
      dayNumber: number;
      isCurrentMonth: boolean;
      isToday: boolean;
      hasEvent: boolean;
      eventCount: number;
    }> = [];

    const today = new Date();
    const isSameDay = (d1: Date, d2: Date) =>
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear();

    // Previous month padding days
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({
        date: d,
        dayNumber: d.getDate(),
        isCurrentMonth: false,
        isToday: isSameDay(d, today),
        hasEvent: false,
        eventCount: 0
      });
    }

    // Current month days
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const d = new Date(year, month, i);
      const matchingEvents = activitiesList.filter(e => isSameDay(e.rawDate, d));
      days.push({
        date: d,
        dayNumber: i,
        isCurrentMonth: true,
        isToday: isSameDay(d, today),
        hasEvent: matchingEvents.length > 0,
        eventCount: matchingEvents.length
      });
    }

    // Next month padding days to fill grid
    const remainingCells = (7 - (days.length % 7)) % 7;
    for (let i = 1; i <= remainingCells; i++) {
      const d = new Date(year, month + 1, i);
      days.push({
        date: d,
        dayNumber: i,
        isCurrentMonth: false,
        isToday: isSameDay(d, today),
        hasEvent: false,
        eventCount: 0
      });
    }

    return days;
  }, [currentCalendarDate, activitiesList]);

  // Featured activity determination
  const featured = useMemo(() => {
    let feat = null;
    if (activeTab === 'upcoming') {
      feat = activitiesList.find(e => e.status === 'upcoming' && e.category.toLowerCase() === 'flagship');
      if (!feat) feat = activitiesList.find(e => e.status === 'upcoming');
    } else {
      feat = activitiesList.find(e => e.status === 'past' && e.category.toLowerCase() === 'flagship');
      if (!feat) feat = activitiesList.find(e => e.status === 'past');
    }

    if (feat) {
      return {
        id: feat.id,
        badge: feat.status === 'upcoming' ? 'UPCOMING FEATURED' : 'HIGHLIGHTED EVENT',
        category: feat.category.toUpperCase(),
        day: feat.day,
        month: feat.month,
        year: feat.year,
        title: feat.title,
        description: feat.subtitle,
        venue: feat.venue,
        time: feat.time,
        ctaText: feat.status === 'upcoming' ? 'Register Now' : 'View Details',
        ctaHref: `/public-events/${feat.id}`,
        imageUrl: feat.imageUrl,
        imageAlt: feat.imageAlt,
      };
    }
    return null;
  }, [activitiesList, activeTab]);

  // Filtered & sorted events list
  const filteredEvents = useMemo(() => {
    let list = activitiesList.filter((e) => e.status === activeTab);

    if (selectedCategory !== 'All') {
      list = list.filter((e) => e.category === selectedCategory);
    }

    if (selectedDate) {
      list = list.filter((e) =>
        e.rawDate.getDate() === selectedDate.getDate() &&
        e.rawDate.getMonth() === selectedDate.getMonth() &&
        e.rawDate.getFullYear() === selectedDate.getFullYear()
      );
    }

    list.sort((a, b) => {
      const timeA = a.rawDate.getTime();
      const timeB = b.rawDate.getTime();
      return activeTab === 'upcoming' ? timeA - timeB : timeB - timeA;
    });

    return list;
  }, [activitiesList, activeTab, selectedCategory, selectedDate]);

  // Mini timeline cards (upcoming events this month)
  const upcomingTimelineCards = useMemo(() => {
    return activitiesList
      .filter(e => e.status === 'upcoming')
      .slice(0, 2);
  }, [activitiesList]);

  // Unique categories list for dropdown selector
  const categoryOptions = useMemo(() => {
    return ['All', ...new Set(activitiesList.map((e) => e.category))];
  }, [activitiesList]);

  // Month navigation handlers
  const handlePrevMonth = () => {
    setCurrentCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  return (
    <div className="flex-grow flex flex-col font-sans bg-page-bg dark:bg-[#050816] text-body-text dark:text-gray-100 min-h-screen">
      <main id="main-content" tabIndex={-1} className="flex-grow">

        {/* ════════════════════════════════════════════════════════════
            1. HERO HEADER STRIP WITH QUICK STATS
            ════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-white dark:bg-[#0b0f19]/80 border-b border-gray-200 dark:border-white/10 pt-12 pb-14 transition-colors">
          {/* Dot Pattern Background Overlay */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-15 pointer-events-none grid-pattern-bg"></div>

          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              {/* Heading Text */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-ieee-light dark:bg-ieee-teal/15 border border-ieee-blue/20 dark:border-ieee-teal/30 rounded-full text-ieee-blue dark:text-ieee-teal text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                  <Sparkles size={14} />
                  <span>IEEE Young Professionals Pune</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-ieee-blue dark:text-white mb-4 leading-tight tracking-tight font-display">
                  Events &amp; Activities
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                  Discover opportunities to learn, connect and grow with fellow young professionals across Pune and beyond. Join our technical workshops, networking meetups, and leadership summits.
                </p>
              </div>

              {/* Quick Stats Counter Cards */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 shrink-0">
                {(activitiesPageStats as ActivityPageStat[]).map((stat) => {
                  const Icon = ICON_MAP[stat.icon] || Calendar;
                  return (
                    <div
                      key={stat.id}
                      className="flex items-center space-x-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-3.5 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-ieee-light dark:bg-ieee-teal/20 text-ieee-blue dark:text-ieee-teal flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="text-lg sm:text-xl font-bold text-ieee-blue dark:text-white font-display leading-none">
                          {stat.value}
                        </div>
                        <div className="text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            2. MAIN SECTION: SIDEBAR + CONTENT AREA
            ════════════════════════════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ────────────────────────────────────────────────────────
                LEFT SIDEBAR (Compact Calendar + Categories + CTA)
                ──────────────────────────────────────────────────────── */}
            <aside className="w-full lg:w-80 shrink-0 space-y-6 order-2 lg:order-1">

              {/* A. COMPACT MONTHLY CALENDAR WIDGET */}
              <section className="bg-white dark:bg-[#0b0f19]/70 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="p-4 bg-ieee-blue dark:bg-ieee-dark text-white flex items-center justify-between">
                  <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2 text-white">
                    <Calendar size={16} />
                    {currentCalendarDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <div className="flex space-x-1">
                    <button
                      onClick={handlePrevMonth}
                      className="p-1 hover:bg-white/20 rounded transition-colors"
                      title="Previous Month"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={handleNextMonth}
                      className="p-1 hover:bg-white/20 rounded transition-colors"
                      title="Next Month"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Calendar Body */}
                <div className="p-4">
                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d) => (
                      <span key={d} className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase">
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* Date Grid */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {calendarGridDays.map((cell, idx) => {
                      const isSelected = selectedDate &&
                        cell.date.getDate() === selectedDate.getDate() &&
                        cell.date.getMonth() === selectedDate.getMonth() &&
                        cell.date.getFullYear() === selectedDate.getFullYear();

                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedDate(null);
                            } else {
                              setSelectedDate(cell.date);
                            }
                          }}
                          className={`py-2 text-xs rounded-lg relative transition-all flex flex-col items-center justify-center cursor-pointer ${!cell.isCurrentMonth
                              ? 'text-gray-300 dark:text-gray-600'
                              : isSelected
                                ? 'bg-ieee-teal text-white font-bold shadow-md'
                                : cell.isToday
                                  ? 'border-2 border-ieee-blue dark:border-ieee-teal font-bold text-ieee-blue dark:text-ieee-teal'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-ieee-light dark:hover:bg-white/10'
                            }`}
                        >
                          <span>{cell.dayNumber}</span>

                          {/* Event Indicator Dot */}
                          {cell.hasEvent && (
                            <span
                              className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isSelected ? 'bg-white' : 'bg-ieee-teal animate-pulse'
                                }`}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Reset Selected Date Button */}
                  {selectedDate && (
                    <button
                      onClick={() => setSelectedDate(null)}
                      className="mt-3 w-full py-1.5 text-xs text-ieee-blue dark:text-ieee-teal font-semibold flex items-center justify-center gap-1 hover:underline"
                    >
                      <X size={14} /> Clear date selection ({selectedDate.toLocaleDateString()})
                    </button>
                  )}
                </div>
              </section>

              {/* B. EXPLORE CATEGORIES SIDEBAR */}
              <section className="bg-white dark:bg-[#0b0f19]/70 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm p-5">
                <h3 className="font-bold text-base text-ieee-blue dark:text-white mb-4 flex items-center gap-2">
                  <Filter size={16} /> Explore Categories
                </h3>
                <ul className="space-y-2">
                  {activitiesCategories.map((cat) => {
                    const isSelected = (selectedCategory === 'All' && cat.label === 'All Activities') || selectedCategory === cat.label;
                    return (
                      <li key={cat.id}>
                        <button
                          onClick={() => {
                            setSelectedCategory(cat.label === 'All Activities' ? 'All' : cat.label);
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold transition-all group ${isSelected
                              ? 'bg-ieee-light dark:bg-ieee-blue/30 text-ieee-blue dark:text-ieee-teal font-bold'
                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                            }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                            <span>{cat.label}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] ${isSelected ? 'bg-ieee-blue dark:bg-ieee-teal text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400'
                            }`}>
                            {cat.count}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>

              {/* C. CALL TO ACTION BANNER */}
              <section className="bg-gradient-to-br from-ieee-blue to-ieee-dark dark:from-[#004d75] dark:to-[#002840] rounded-xl p-6 text-white relative overflow-hidden shadow-lg group">
                <div className="absolute -right-4 -bottom-4 opacity-10 transform group-hover:rotate-12 transition-transform duration-500">
                  <UserPlus size={120} />
                </div>
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-4 text-white">
                    <Users size={20} />
                  </div>
                  <h4 className="font-bold text-base mb-1.5 text-white">Want to host an event?</h4>
                  <p className="text-xs text-white/80 mb-5 leading-relaxed">
                    Collaborate with like-minded professionals to organize impactful technical sessions and webinars.
                  </p>
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full py-2.5 bg-ieee-teal text-white font-bold rounded-lg text-xs btn-glow flex items-center justify-center gap-2 hover:bg-teal-500 transition-all"
                  >
                    <span>Partner With Us</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </section>

              {/* D. NEWSLETTER BOX */}
              <section className="bg-white dark:bg-[#0b0f19]/70 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-ieee-teal" />
                  <h3 className="text-sm font-bold text-ieee-blue dark:text-white">Stay Updated</h3>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                  Subscribe to our channel to get instant updates about workshops, guest talks and meetups.
                </p>
                <button
                  onClick={() => navigate('/contact')}
                  className="text-xs font-bold text-ieee-blue dark:text-ieee-teal hover:underline flex items-center gap-1"
                >
                  Get Involved <ArrowRight size={12} />
                </button>
              </section>

            </aside>

            {/* ────────────────────────────────────────────────────────
                RIGHT MAIN CONTENT AREA
                ──────────────────────────────────────────────────────── */}
            <div className="flex-1 space-y-6 order-1 lg:order-2">

              {/* VIEW SWITCHER AND FILTER BAR */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#0b0f19]/70 p-4 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                {/* Segmented Pill Toggles */}
                <div className="inline-flex p-1 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
                  <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'upcoming'
                        ? 'bg-ieee-blue text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:text-ieee-blue dark:hover:text-white'
                      }`}
                  >
                    Upcoming Events
                  </button>
                  <button
                    onClick={() => setActiveTab('past')}
                    className={`px-5 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'past'
                        ? 'bg-ieee-blue text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:text-ieee-blue dark:hover:text-white'
                      }`}
                  >
                    Past Activities
                  </button>
                </div>

                {/* Dropdown Filter + Active Date Badge */}
                <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                  {selectedDate && (
                    <span className="text-xs bg-ieee-teal/15 text-ieee-teal px-3 py-1.5 rounded-lg border border-ieee-teal/30 font-semibold flex items-center gap-1.5">
                      <Calendar size={12} />
                      {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      <button onClick={() => setSelectedDate(null)} className="hover:opacity-75">
                        <X size={12} />
                      </button>
                    </span>
                  )}

                  {/* Category Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen((o) => !o)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-xs text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 transition-colors font-semibold min-w-[160px] justify-between cursor-pointer"
                    >
                      <span>{selectedCategory === 'All' ? 'All Categories' : selectedCategory}</span>
                      <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {dropdownOpen && (
                      <ul className="absolute right-0 top-full mt-1.5 w-48 bg-white dark:bg-[#0b0f19] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl z-30 py-1 max-h-60 overflow-y-auto">
                        {categoryOptions.map((cat) => (
                          <li key={cat}>
                            <button
                              onClick={() => { setSelectedCategory(cat); setDropdownOpen(false); }}
                              className={`w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer ${selectedCategory === cat ? 'text-ieee-blue dark:text-ieee-teal font-bold bg-ieee-light dark:bg-white/5' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                                }`}
                            >
                              {cat === 'All' ? 'All Categories' : cat}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* FEATURED EVENT SHOWCASE (If Available) */}
              {!selectedDate && featured && (
                <motion.div
                  className="bg-white dark:bg-[#0b0f19]/70 rounded-2xl border border-gray-200 dark:border-white/10 shadow-md overflow-hidden hover-lift flex flex-col md:flex-row group"
                  initial={reduced ? {} : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-full md:w-72 h-60 md:h-auto relative bg-gray-100 dark:bg-gray-900 shrink-0">
                    <img
                      src={featured.imageUrl}
                      alt={featured.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-lg border border-gray-200 dark:border-white/10 flex items-center space-x-2 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-ieee-teal animate-pulse" />
                      <span className="text-[10px] font-bold text-ieee-blue dark:text-ieee-teal uppercase tracking-wider">
                        {featured.badge}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-ieee-light dark:bg-ieee-teal/20 text-ieee-blue dark:text-ieee-teal rounded-full text-[11px] font-bold uppercase tracking-wider">
                          {featured.category}
                        </span>
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Clock size={12} /> {featured.time}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-ieee-dark dark:text-white mb-2 group-hover:text-ieee-blue dark:group-hover:text-ieee-teal transition-colors leading-snug">
                        {featured.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed mb-4">
                        {featured.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 dark:border-white/10 pt-4">
                      <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-300">
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1 text-ieee-blue dark:text-ieee-teal" />
                          <span className="font-medium">{featured.venue}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate(featured.ctaHref)}
                        className="px-6 py-2.5 bg-ieee-blue dark:bg-ieee-teal text-white font-bold text-xs rounded-lg btn-glow flex items-center gap-2"
                      >
                        <span>{featured.ctaText}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* UPCOMING TIMELINE HIGHLIGHTS (Mini Cards Section) */}
              {activeTab === 'upcoming' && !selectedDate && upcomingTimelineCards.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                    Upcoming Highlights
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {upcomingTimelineCards.map((card) => (
                      <div
                        key={card.id}
                        onClick={() => navigate(`/public-events/${card.id}`)}
                        className="bg-white dark:bg-[#0b0f19]/60 p-4 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm hover-lift flex items-center space-x-4 cursor-pointer group"
                      >
                        <div className="w-14 h-14 shrink-0 bg-ieee-light dark:bg-ieee-teal/15 border border-ieee-blue/20 dark:border-ieee-teal/30 rounded-xl flex flex-col items-center justify-center text-ieee-blue dark:text-ieee-teal">
                          <span className="text-[10px] font-bold uppercase">{card.month}</span>
                          <span className="text-lg font-extrabold leading-none">{card.day}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-ieee-dark dark:text-white truncate group-hover:text-ieee-blue dark:group-hover:text-ieee-teal transition-colors">
                            {card.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                            {card.venue} · {card.time}
                          </p>
                        </div>
                        <ChevronRight size={16} className="text-gray-400 group-hover:text-ieee-blue dark:group-hover:text-ieee-teal transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MAIN EVENTS GRID */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-ieee-dark dark:text-white">
                    {activeTab === 'upcoming' ? 'All Upcoming Events' : 'Past Activities Record'}
                  </h2>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {loading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="spinner spinner-lg"></div>
                  </div>
                ) : filteredEvents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredEvents.map((event, i) => (
                      <ActivityCard
                        key={event.id}
                        event={event}
                        index={i}
                        onClick={() => navigate(`/public-events/${event.id}`)}
                      />
                    ))}
                  </div>
                ) : (
                  /* EMPTY STATE CONTAINER */
                  <div className="bg-gray-50 dark:bg-white/5 rounded-2xl border-2 border-dashed border-gray-300 dark:border-white/10 p-12 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-white/10 flex items-center justify-center text-gray-400 mb-4 shadow-sm">
                      <Calendar size={32} />
                    </div>
                    <h5 className="text-lg font-bold text-ieee-dark dark:text-white mb-1">
                      No events found for this filter
                    </h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 max-w-sm leading-relaxed">
                      Try selecting a different category or adjusting the date range from the calendar.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory('All');
                        setSelectedDate(null);
                      }}
                      className="px-5 py-2 bg-ieee-blue dark:bg-ieee-teal text-white font-bold text-xs rounded-lg flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                    >
                      <X size={14} />
                      <span>Clear all filters</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            3. MOMENTS FROM PAST ACTIVITIES (PHOTO GALLERY)
            ════════════════════════════════════════════════════════════ */}
        <section className="bg-white dark:bg-[#0b0f19]/90 py-12 border-t border-gray-200 dark:border-white/10 transition-colors">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-ieee-blue dark:text-white font-display">
                  Moments from Past Activities
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Highlights and memories from our recent workshops and gatherings.
                </p>
              </div>
              <button
                onClick={() => navigate('/public-gallery')}
                className="text-xs font-bold text-ieee-blue dark:text-ieee-teal hover:underline flex items-center gap-1"
              >
                <span>View all photos</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {moments.map((moment, i) => (
                <motion.div
                  key={moment.id}
                  className="group cursor-pointer"
                  onClick={() => navigate('/public-gallery')}
                  initial={reduced ? {} : { opacity: 0, scale: 0.95 }}
                  whileInView={reduced ? {} : { opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-white/10 shadow-sm">
                    <img
                      src={moment.imageUrl}
                      alt={moment.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-ieee-dark/0 group-hover:bg-ieee-dark/40 transition-colors duration-300 flex items-center justify-center">
                      <Sparkles size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-2 text-center truncate group-hover:text-ieee-blue dark:group-hover:text-ieee-teal transition-colors">
                    {moment.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default ActivitiesPage;
