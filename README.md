# Ahmmed MD Nayeem — Portfolio

[![Live](https://img.shields.io/badge/live-nayeemahmmed.com-00ff88?style=flat-square)](https://nayeemahmmed.com)
[![Stack](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Stack](https://img.shields.io/badge/Supabase-postgres-3ecf8e?style=flat-square&logo=supabase)](https://supabase.com)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

Personal portfolio for **Ahmmed MD Nayeem** — a Top 1% Upwork freelancer from Bangladesh pivoting into software engineering. Trilingual (Bangla · English · 中文). Open to internship & entry-level roles.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion · Supabase (Postgres + Auth)

## Live

🌐 https://nayeemahmmed.com

---

## Quick start

```bash
git clone https://github.com/ahmmedmdnayeem/portfolio.git
cd portfolio
npm install
cp .env.local.example .env.local   # fill in your own Supabase keys
npm run dev                        # → http://localhost:3000
```

> The app runs even without Supabase configured — it falls back to seed data in [lib/constants/fallback-data.ts](lib/constants/fallback-data.ts) and an in-memory store, so first-run preview "just works."

---

## Features

### Public site
- 🚀 Hero with glitch text + matrix background + typewriter subtitle
- 👤 Circular profile photo with neon-glow ring
- 📜 About, Skills, Projects, Experience, Certifications, Languages, Testimonials, Contact sections
- 📧 Contact form persisting to Supabase (or local store) + rate-limited
- 🌐 Trilingual language showcase (Bangla · English · 中文)
- 🎨 Cyberpunk aesthetic — scanlines, glitch animation, terminal cards

### Admin CMS (`/admin`)
- 🔐 Supabase Auth login (primary) + HMAC-signed cookie session (fallback)
- 📦 CRUD for projects, skills, experience, certifications, testimonials
- 📥 Inbox for contact form submissions (mark read/replied/archived)
- 📊 Dashboard with stats overview

### SEO
- 📑 Rich JSON-LD (Person, WebSite, ProfilePage, BreadcrumbList)
- 🖼 Dynamic Open Graph image generated at `/opengraph-image`
- 🗺 Sitemap + robots.txt via Next.js metadata routes
- 📲 PWA manifest

### Security
- 🛡 HSTS, CSP, X-Frame-Options DENY, no-fingerprint headers
- 🔒 Timing-safe credential check
- 🔑 Supabase RLS restricts writes to admin email allowlist
- 🚫 No `X-Powered-By` header

---

## Architecture

```
Portfolio/
├── app/
│   ├── layout.tsx                  # Root layout + metadata + fonts
│   ├── page.tsx                    # Public homepage (Server Component)
│   ├── globals.css                 # CSS vars + glitch + scanline + noise
│   ├── opengraph-image.tsx         # Dynamic OG image (1200x630)
│   ├── icon.tsx                    # Dynamic favicon
│   ├── sitemap.ts / robots.ts / manifest.ts
│   ├── not-found.tsx               # Custom 404 page
│   ├── login/page.tsx              # Admin login
│   ├── admin/                      # Auth-protected admin pages
│   └── api/
│       ├── contact/                # Public contact form handler
│       ├── auth/{login,logout}/    # Local session endpoints
│       └── admin/[resource]/       # Admin CRUD (Supabase or local store)
├── components/
│   ├── layout/                     # Navbar, Footer
│   ├── sections/                   # Hero, About, Skills, ... , Languages, Contact
│   ├── ui/                         # GlitchText, TerminalCard, NeonButton, ProfileAvatar, ...
│   ├── admin/                      # ProjectsManager, MessageList, SkillsManager, ...
│   └── seo/JsonLd.tsx              # Structured data
├── lib/
│   ├── supabase/                   # client / server / middleware / queries
│   ├── store/local.ts              # JSON-file store (offline fallback)
│   ├── auth/                       # local.ts (HMAC sessions) + check.ts (isAdmin)
│   ├── admin/api.ts                # Admin REST client
│   ├── types/database.ts           # All row types
│   ├── utils/ + constants/         # Helpers, navigation, fallback seed data
├── hooks/useScrollSpy.ts
├── middleware.ts                   # Protects /admin/*
├── scripts/                        # Supabase setup helpers
└── supabase/migrations/            # SQL schema + RLS policies
```

---

## Supabase setup

If you want a real backend:

1. Create a project at https://supabase.com
2. Run [supabase/migrations/001_initial_schema.sql](supabase/migrations/001_initial_schema.sql) in the SQL Editor — creates 7 tables + RLS policies
3. Run [supabase/migrations/002_extend_skill_categories.sql](supabase/migrations/002_extend_skill_categories.sql)
4. Run [supabase/migrations/003_restrict_admin_to_specific_user.sql](supabase/migrations/003_restrict_admin_to_specific_user.sql) — locks admin writes to a specific email (edit the file to use yours)
5. Fill `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://<proj>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<eyJ...>
   SUPABASE_SERVICE_ROLE_KEY=<eyJ...>
   ADMIN_SESSION_SECRET=<random 64-hex-char string>
   ADMIN_EMAIL=you@example.com
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
6. Seed data + create admin user:
   ```bash
   npm run setup:supabase
   ```
7. **Disable public sign-ups** in Supabase: Authentication → Providers → Email → toggle "Enable Sign Up" off

---

## Deploy to Vercel

1. Push to GitHub
2. Vercel → New Project → Import the repo
3. Add the env vars from `.env.local` (except `ADMIN_PASSWORD` — leave it out)
4. Deploy
5. After deploy, set `NEXT_PUBLIC_SITE_URL` to your production URL → redeploy
6. Add your domain in **Vercel → Settings → Domains** + update Supabase **Authentication → URL Configuration**

---

## Scripts

```bash
npm run dev               # Dev server
npm run build             # Production build
npm run start             # Serve production build
npm run type-check        # tsc --noEmit
npm run lint              # next lint

npm run apply:schema      # Apply schema via direct DB connection (needs SUPABASE_DB_URL)
npm run migrate:supabase  # Push data/portfolio.json → Supabase
npm run create:admin      # Create / update the Supabase admin auth user
npm run setup:supabase    # migrate:supabase && create:admin
```

---

## License

MIT — see [LICENSE](LICENSE).
