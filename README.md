# Spectre Tutors Network

> **Learn better. With the right tutor.**  
> A parent-first home tutoring service for Delhi (Classes 6–12 &middot; Mathematics, Science, English).

---

## 1. Project Overview

**Spectre Tutors Network** is an MVP web application built for parents in Delhi seeking trusted 1-on-1 home tutors. The website is focused on one single primary conversion: **Request a Tutor**.

Parents do not need an account, do not browse a 100-tutor marketplace, and do not make upfront payments. Instead, they share their child's requirements, Spectre's team manually reviews them, and coordinates a suitable home tutor match.

---

## 2. Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS (custom warm palette: parchment `#FFFDF8`, navy `#172B4D`, trust blue `#3B6FF5`)
- **Typography**: Manrope (Headings), Inter (Body)
- **Icons**: Lucide React
- **Routing**: React Router DOM (v7)
- **Database & Persistence**: Supabase with built-in zero-config LocalStorage fallback

---

## 3. Quick Start (Run Locally)

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Open `http://localhost:5174/` (or the port shown in terminal) in your browser.

---

## 4. Key Pages & Routes

- `/`: **Homepage**
  - Hero with authentic home tutoring visual & clear value proposition
  - Trust strip ("1-on-1 attention", "Subject-focused", "Human matching")
  - "What does your child need help with right now?" interactive problem cards
  - Core subjects (Mathematics, Science, English for Classes 6–12)
  - 3-step truthful "How It Works"
  - "Why Spectre" personal tutoring principles
  - Trust & Safety policy
  - Frequently Asked Questions accordion
  - Minimalist navigation with smooth mobile drawer
- `/request-tutor`: **5-Step Guided Tutor Request Form**
  1. Student Class & Board (Classes 6–12, CBSE / ICSE / State Board)
  2. Subject & Learning Need (Mathematics, Science, English + Help goals)
  3. Locality in Delhi (e.g. Preet Vihar, Rohini, Saket, Dwarka)
  4. Preferred Schedule (Days of the week, morning/afternoon/evening timing, frequency)
  5. Parent Contact Info (Name, 10-digit phone, email, optional notes)
- `/request-success`: **Request Confirmation State**
  - Confirms request receipt without misleading claims
  - Outlines the 3-step review process
  - Displays request summary
- `/admin`: **Operator / Admin Portal**
  - Real-time list of all incoming parent requests
  - Status updates (`New` → `Contacted` → `Matched` → `Closed`)
  - Direct `tel:` phone call links for immediate outreach
  - Filter by status
  - 1-click **Export to CSV** for offline operations and spreadsheets

---

## 5. Deployment Guide (Publish in 5 Minutes)

### Option A: Vercel (Recommended)

1. Push this repository to GitHub or GitLab.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import this repository.
4. Set Build Command: `npm run build` and Output Directory: `dist`.
5. *(Optional)* Add your Supabase environment variables (see below).
6. Click **Deploy**. Vercel will build and assign an instant HTTPS domain (e.g. `spectre-tutors.vercel.app`).
   *Note: `vercel.json` is already configured for clean client-side routing.*

### Option B: Netlify

1. Drag-and-drop the `dist` folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or connect your Git repository.
2. Build command: `npm run build`, publish directory: `dist`.
   *Note: `public/_redirects` is already included to prevent 404s on page refresh.*

---

## 6. Supabase Database Setup (Optional)

The website works immediately out of the box with local storage persistence. To persist requests across all devices into a cloud database:

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in your Supabase dashboard.
3. Open `supabase/schema.sql` in this repo and run the SQL commands:
   ```sql
   create table if not exists public.tutor_requests (
     id uuid primary key default gen_random_uuid(),
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     parent_name text not null,
     phone text not null,
     email text,
     student_class text not null,
     board text,
     subjects text[] not null,
     help_needed text[] not null,
     area text not null,
     landmark text,
     preferred_days text[] not null,
     preferred_time text not null,
     frequency text,
     additional_message text,
     status text default 'new' not null
   );
   ```
4. Copy your project URL and `anon` public key from **Project Settings > API**.
5. Create a `.env` file in the project root:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
6. If deploying on Vercel or Netlify, add these two variables in the hosting dashboard settings.

---

## 7. File Structure

```text
├── public/
│   ├── favicon.svg              # Brand emblem favicon
│   ├── _redirects               # Netlify SPA routing rules
│   └── images/
│       └── home_tutoring_hero.jpg # Realistic Delhi home tuition visual
├── src/
│   ├── components/
│   │   ├── Button.tsx           # Standardized buttons with 6px radius
│   │   ├── Navbar.tsx           # Minimal nav with mobile slide drawer
│   │   ├── Footer.tsx           # Clean footer with local Delhi focus
│   │   ├── SectionHeading.tsx   # Typography helper for section headings
│   │   └── ScrollToTop.tsx      # Automatic top scroll on page navigation
│   ├── pages/
│   │   ├── Home.tsx             # Complete homepage with 9 core sections
│   │   ├── RequestTutor.tsx     # 5-step guided request conversation
│   │   ├── Success.tsx          # Reassuring submission confirmation
│   │   └── Admin.tsx            # Operator portal with status & CSV export
│   ├── lib/
│   │   └── supabase.ts          # Supabase client with local fallback
│   ├── data/
│   │   └── content.ts           # Curated copy, subjects, and FAQ data
│   ├── types/
│   │   └── index.ts             # TypeScript definitions
│   ├── App.tsx                  # Router configuration
│   ├── main.tsx                 # App mount
│   └── index.css                # Base Tailwind & typography setup
├── supabase/
│   └── schema.sql               # Ready-to-execute SQL table & RLS policies
├── vercel.json                  # Vercel SPA rewrite configuration
├── tailwind.config.js           # Warm color palette & font configuration
└── package.json
```

---

## 8. License

© 2026 Spectre Tutors Network. All rights reserved.
