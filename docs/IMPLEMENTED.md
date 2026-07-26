# IEEE Pune Section — Homepage Implementation Log

> **⚠️ Mandatory reading for every agent.** Read this file fully before writing a single line of code in this codebase.

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2026-06-16 | Antigravity AI | **Activities page (`/activities` route):** [1] NEW: `ActivitiesPage.jsx` — full dashboard-style events page with: page header strip + inline stats (50+ Events / 500+ Members / 10+ Partners), interactive filter bar (Upcoming/Past toggle pills + category dropdown), featured event hero banner (gradient overlay, big date, CTA), responsive events grid with `ActivityCard` sub-component (cover image + category pill + date block + venue/time), right sidebar with category explorer card + "Host an Event" CTA + newsletter mini-CTA, and bottom past-moments gallery strip. [2] Data layer: added 5 new exports to `homePageData.js` — `activitiesPageStats`, `activitiesCategories`, `featuredActivity`, `activitiesList` (12 events across 7 categories with upcoming/past status), `pastMoments` (5 gallery items). [3] Route: wired `/activities` in `App.jsx`. [4] Nav links: updated HOME→`/`, ACTIVITIES→`/activities`, footer Activities→`/activities`. |
| 2026-06-16 | Antigravity AI | **YP Pune rebrand (9 changes):** [1] Navbar: replaced Title.png with IeePuneYP_logo.png + IEEE/Young Professionals/Pune Section text + 2016–2026 badge. [2] StatsBar: replaced generic section stats with YP stats (500+ YP Members, 23+ Activities 2025, 10 Years, 9 OUs). [3] HeroSection data: all 5 slides replaced with real YP Pune activities (CODEBhoomi, YP Meet, Innoverse, M&M, CPDS). featuredAchievement updated to 10-year milestone. [4] UpcomingEvents: replaced 3 placeholder events with real 2026 planned events from PDF (CODEBhoomi Hackathon, Congress 2026, CPDS Revival). [5] ExploreSection: replaced 4 generic cards with YP programmes (CODEBhoomi, M&M, CPDS, EU-REKA); added BookOpen/Users/Award icon imports. [6] NEW: AboutSection.jsx — two-column section (PDF About text + 2×2 highlight cards) inserted between HeroSection and StatsBar. [7] NEW: HighlightsSection.jsx — 4-card 2025 Impact section inserted between UpcomingEvents and ExploreSection. [8] Footer: updated to IEEE/Young Professionals/Pune Section, YP description, real LinkedIn+Instagram links, YP quick links and resources, YP email (ieeepunesectionyp@gmail.com), © 2026 IEEE YP Pune Section. [9] NEW: YPScoopStrip.jsx — newsletter subscription strip with localStorage persistence, placed just above Footer. CTABanner heading/subtext updated to YP. HomePage.jsx updated with all new section ordering. |
| 2026-06-08 | Antigravity AI | Navbar redesign: non-sticky, Title.png brand image, Logo.png IEEE diamond, Lucide icons replacing emojis, light utility bar, SVG dot-network pattern. HeroSection framed with outer py-6 px-4 bg-gray-50 padding. Section spacing tightened to py-12. Asset folder structure established. |
| 2026-06-08 | Antigravity AI | Initial homepage build — all 10 components created |

---

## Tech Stack

| Concern | Package | Version |
|---------|---------|---------|
| Framework | React | 19.x (project-installed) |
| Build tool | Vite | 8.x (project-installed) |
| Styling | Tailwind CSS v4 + `@tailwindcss/vite` | 4.3.x |
| Routing | react-router-dom | 7.x |
| Icons | lucide-react | latest |
| Animation | framer-motion | 12.x |

> **Tailwind CSS v4 note:** Colors are defined in `src/index.css` inside `@theme { }` as `--color-ieee-blue`, etc. They are consumed as utility classes `bg-ieee-blue`, `text-ieee-blue`, `border-ieee-blue`. **Never hardcode hex values in JSX.**

---

## Asset Folder Structure

All static media lives under `frontend/src/assets/`. Use subfolders for organisation:

```
frontend/src/assets/
├── Logo.png          ← IEEE diamond icon (used in Navbar right side)
├── Title.png         ← "IEEE Pune Section" banner image (used in Navbar brand bar)
├── hero.png          ← (placeholder — future: hero background if needed)
│
├── images/           ← ✅ Recommended: general-purpose images
│   ├── events/       ←    event cover photos (when served locally)
│   └── team/         ←    committee / team member photos
│
├── icons/            ← ✅ Recommended: SVG icon files (if brand icons needed beyond Lucide)
│
└── backgrounds/      ← ✅ Recommended: section background images / textures
```

**Import pattern in components:**
```js
import titleImg from '../assets/Title.png';   // relative from src/components/
import logoImg  from '../assets/Logo.png';
```

> Vite automatically handles asset imports and adds content-hash to the filename in production builds.
> For public assets that need a **fixed URL** (e.g. `og:image`, sitemap), place them in `frontend/public/` and reference as `/filename.png`.



| Token | Utility class | Hex | Usage |
|-------|--------------|-----|-------|
| `--color-ieee-blue` | `bg-ieee-blue` / `text-ieee-blue` | `#006699` | Buttons, headers, CTAs |
| `--color-ieee-teal` | `bg-ieee-teal` / `text-ieee-teal` | `#00B2A9` | Badges, icon boxes, accents |
| `--color-ieee-dark` | `bg-ieee-dark` / `text-ieee-dark` | `#003D5C` | Footer, navbar utility bar |
| `--color-ieee-light` | `bg-ieee-light` | `#E8F4F8` | Card tint backgrounds |
| `--color-ieee-gray` | `text-ieee-gray` | `#6B7280` | Secondary text |

---

## File Map

```
frontend/src/
├── data/
│   └── homePageData.js          ← All static data — swap for API here
├── pages/
│   ├── HomePage.jsx             ← Root page, wires all homepage sections
│   └── ActivitiesPage.jsx       ← NEW: Events & Activities dashboard (/activities)
└── components/
    ├── AnnouncementBanner.jsx
    ├── Navbar.jsx
    ├── HeroSection.jsx
    ├── AboutSection.jsx          ← Two-column About section
    ├── StatsBar.jsx
    ├── EventCard.jsx
    ├── UpcomingEvents.jsx
    ├── HighlightsSection.jsx     ← 2025 Impact highlights grid
    ├── ExploreSection.jsx
    ├── CTABanner.jsx
    ├── YPScoopStrip.jsx          ← Newsletter subscription strip
    └── Footer.jsx
```

---

## Component Reference

### `src/pages/HomePage.jsx`
**Purpose:** Assembles all homepage sections in the correct order.  
**Section order:** `AnnouncementBanner → Navbar → HeroSection → AboutSection → StatsBar → UpcomingEvents → HighlightsSection → ExploreSection → CTABanner → YPScoopStrip → Footer`  
**Props:** None — page-level component.  
**Notes:** Wrap with `<main id="main-content">` for skip-nav accessibility.

### `src/pages/ActivitiesPage.jsx`
**Purpose:** Full dashboard-style Events & Activities page at the `/activities` route.  
**Route:** `/activities` (wired in `App.jsx`)  
**Layout sections:**
1. **Page header strip** — title + subtitle (left) + 3 inline stat chips (right) + dot mesh bg
2. **Filter bar** — Upcoming/Past pill toggle (`activeTab` state) + category dropdown (`selectedCategory` state)
3. **Main content 3+1 grid:**
   - **Col 3 (left):** Featured event hero banner (gradient overlay, big date display, CTA) + responsive event card grid (`ActivityCard` sub-component)
   - **Col 1 (right):** Explore by Category sidebar card + "Want to host an event?" CTA card + "Stay Updated" newsletter mini-CTA
4. **Moments gallery** — 5-col photo grid from `pastMoments` data

**Data imports:** `activitiesPageStats`, `activitiesCategories`, `featuredActivity`, `activitiesList`, `pastMoments`  
**State:** `activeTab` (upcoming/past), `selectedCategory` (All/category name), `dropdownOpen`  
**Sub-component:** `ActivityCard` — inline component (cover image + category pill + date block + venue/time row)  
**Notes:** All events filter client-side via `useMemo`. Ready for `GET /api/events` API swap.

---

### `src/components/AnnouncementBanner.jsx`
**Purpose:** Full-width dismissible blue banner at the very top of the page.  
**Props:** None (reads from `homePageData.announcement`).  
**Behaviour:**
- On mount, checks `sessionStorage.getItem('banner_dismissed')`. If set, returns `null`.
- X button sets `sessionStorage.setItem('banner_dismissed', 'true')` and hides banner.
- Banner does NOT reappear within the same browser session.

**Hardcoded data:**
```js
announcement = { id, text: "🎉 SAMPARK 2026 registrations are now open! ..." }
```
**TODO:** `GET /api/announcements` → replace `announcement` import.

---

### `src/components/Navbar.jsx`
**Purpose:** Three-layer sticky navigation header.  
**Props:** None.  
**Layers:**
1. **Utility bar** — `h-8 bg-ieee-dark`, 5 global IEEE site links separated by `|`
2. **Brand bar** — `h-16 bg-white`, IEEE logo text + Search + Diamond icons
3. **Primary nav** — `bg-ieee-blue`, 9 section links with emoji prefixes

**Mobile:** Layers 1 & 2 always visible. Layer 3 collapses into a hamburger drawer (controlled by `mobileOpen` state).  
**Active item:** First item (`PUNE SECTION`) has `bg-ieee-dark` applied — hardcoded for now.

**Hardcoded data:**
```js
navLinks[]     // 9 nav items with emoji + label
utilityLinks[] // 5 global IEEE site links
```
**TODO:** Active link detection should use `useLocation()` from react-router-dom when pages are added.

---

### `src/components/HeroSection.jsx`
**Purpose:** Two-column hero (60/40 desktop, stacked mobile).  
**Props:** None (reads from `homePageData`).

**Left column — Carousel:**
- 5 slides, crossfade transition (`opacity-0`/`opacity-100`)
- Auto-advances every 5 seconds via `setInterval`
- `goPrev` / `goNext` reset the timer on manual navigation
- Dot indicators (active dot = wider `w-4 bg-ieee-blue`, inactive = `w-2 bg-white/50`)
- Prev/Next chevron buttons

**Right column — Achievement card:**
- Static: badge, heading, image, body text, "Read more →" link
- Full-height white card matching carousel height on desktop

**Hardcoded data:**
```js
heroSlides[5]         // 5 carousel slides
featuredAchievement   // single achievement object
```
**TODO:**
- `GET /api/carousel-slides` → replace `heroSlides`
- `GET /api/achievements?featured=true` → replace `featuredAchievement`

---

### `src/components/StatsBar.jsx`
**Purpose:** Full-width `bg-ieee-dark` bar with 4 animated statistics.  
**Props:** None.

**Animation:**
- Uses `framer-motion`'s `useInView` to detect when section enters viewport
- Custom `useCounter(target, duration, started)` hook drives count-up via `requestAnimationFrame`
- `cubic ease-out` easing: `1 - (1 - progress)³`
- Members stat: raw value `12000`, displayed as `${Math.floor(count/1000)}K+`
- Other stats: raw value + `suffix` appended
- Respects `prefers-reduced-motion` — shows final value immediately

**Layout:** `grid-cols-2` mobile → `flex-row` on `sm+` with `border-l border-white/20` dividers (skipped on first item).

**Hardcoded data:**
```js
stats = [
  { id: 'members',  value: 12000, suffix: 'K+', display: '12K+', label: 'MEMBERS' },
  { id: 'branches', value: 85,    suffix: '+',  display: '85+',  label: 'STUDENT BRANCHES' },
  { id: 'chapters', value: 24,    suffix: '',   display: '24',   label: 'CHAPTERS & AGs' },
  { id: 'events',   value: 150,   suffix: '+',  display: '150+', label: 'ANNUAL EVENTS' },
]
```
**TODO:** `GET /api/stats` → replace `stats`.

---

### `src/components/EventCard.jsx`
**Purpose:** Reusable event card. Used by `UpcomingEvents`.  
**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `string` | ✅ | Category badge (e.g. `"WORKSHOP"`) |
| `date` | `string` | ✅ | Display date (e.g. `"Mar 14, 2026"`) |
| `title` | `string` | ✅ | Event title |
| `description` | `string` | ✅ | Description (clamped to 3 lines) |
| `location` | `string` | ✅ | Venue string |
| `imageUrl` | `string` | ✅ | Cover image URL |
| `animationDelay` | `number` | ❌ | Framer-motion stagger delay in seconds (default `0`) |

**Animation:** `whileInView` entrance — `opacity: 0, y: 20` → `opacity: 1, y: 0`. Skipped if `prefers-reduced-motion`.

---

### `src/components/UpcomingEvents.jsx`
**Purpose:** Section wrapper for 3 event cards in a responsive grid.  
**Props:** None.  
**Layout:** 1-col mobile → 2-col md → 3-col lg.  
**Header:** Left — title + subtitle. Right — "View All Events" outlined button.

**Hardcoded data:**
```js
upcomingEvents[3] // Robotics Bootcamp, YP Summit, Innovate Hackathon
```
**TODO:** `GET /api/events?limit=3&type=upcoming`

---

### `src/components/ExploreSection.jsx`
**Purpose:** `bg-gray-50` section with centred heading and 4 feature cards.  
**Props:** None.

**Card structure:**
- Teal icon box (`w-12 h-12 rounded-lg bg-ieee-teal`)
- Icons: `GraduationCap`, `Network`, `Briefcase`, `Zap` from lucide-react
- Hover: `-translate-y-1 shadow-lg`
- Entrance animation: staggered `whileInView` (same pattern as EventCard)

**Layout:** 1-col → 2-col sm → 4-col lg.

**Hardcoded data:**
```js
exploreCards[4] // Student Branches, Chapters & AGs, Opportunities, STEP Program
```
**TODO:** Static — no API needed (fixed navigation sections).

---

### `src/components/CTABanner.jsx`
**Purpose:** Full-width "Become an IEEE Pune Section Member" CTA.  
**Props:** None.  
**Background:** `bg-gradient-to-r from-ieee-dark to-ieee-blue`.  
**Buttons:** "Join Now" (white bg) + "Learn More" (outlined white), stack vertically on mobile.  
**TODO:** Wire button `href` values to the actual membership sign-up URL.

---

### `src/components/Footer.jsx`
**Purpose:** Dark navy footer with 4-column grid + bottom legal bar.  
**Props:** None.

**Columns:**
1. Brand (IEEE teal logo + description + social icons)
2. Quick Links (4 items)
3. Resources (4 items)
4. Contact (address, email `mailto:`, phone `tel:`)

**Social icons:** LinkedIn, Instagram, Twitter, YouTube from lucide-react.  
**Mandatory links:** Privacy Policy | Terms of Use | Accessibility (IEEE requirement).

**Hardcoded data:**
```js
footerQuickLinks[4]
footerResourceLinks[4]
```

---

## Static Data Location

All hardcoded data lives in **`src/data/homePageData.js`**.  
Each export is annotated with the API endpoint that will replace it.  
When integrating the backend, import from the API instead of this file.

| Export | Replaces with |
|--------|--------------|
| `announcement` | `GET /api/announcements` |
| `heroSlides` | `GET /api/carousel-slides` |
| `featuredAchievement` | `GET /api/achievements?featured=true` |
| `stats` | `GET /api/stats` |
| `upcomingEvents` | `GET /api/events?limit=3&type=upcoming` |
| `exploreCards` | Static — no API |
| `navLinks` | Static — no API |
| `utilityLinks` | Static — no API |
| `footerQuickLinks` | Static — no API |
| `footerResourceLinks` | Static — no API |

---

## Accessibility Checklist

- [x] All images have `alt` text
- [x] Interactive elements have `aria-label`
- [x] Semantic HTML (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`)
- [x] Carousel has `role="tablist"` + `aria-selected` on dots
- [x] Mobile hamburger has `aria-expanded` + `aria-controls`
- [x] Focus ring via `:focus-visible` in `index.css`
- [x] `prefers-reduced-motion` respected in all animations
- [x] Mandatory IEEE links in footer (Privacy Policy, Terms of Use, Accessibility)

---

## Responsive Breakpoints

| Screen | Behaviour |
|--------|-----------|
| `< 640px` (mobile) | Single-column everything; stats 2×2; hero stacks vertically; CTA buttons stack |
| `640px–1023px` (tablet) | 2-col cards; hamburger nav |
| `≥ 1024px` (desktop) | Full layout matching 1440px design reference |
