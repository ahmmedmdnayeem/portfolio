# Ahmmed MD Nayeem — Portfolio

Personal portfolio for a marketer-turned-engineer: Top 1% Upwork freelancer ($100K+ in marketing revenue) pivoting into software engineering — Python, full-stack, blockchain fundamentals. Trilingual (Bangla · English · 中文).
**Next.js 14 (App Router) · TypeScript · Supabase · Tailwind CSS · Framer Motion**

Cyberpunk / terminal hacker aesthetic — deep blacks, neon green/cyan accents, glitch text, scanlines, matrix background.

---

## Quick Start

```bash
cd Portfolio
npm install
cp .env.local.example .env.local   # fill in Supabase keys (optional for first run)
npm run dev
```

Site runs at http://localhost:3000.

> The app ships with **fallback seed data** in [`lib/constants/fallback-data.ts`](lib/constants/fallback-data.ts), so it renders fully even with no Supabase credentials. Admin routes require Supabase auth and will be unavailable until configured.

---

## Project Structure

```
Portfolio/
├── app/
│   ├── layout.tsx              # Root layout + metadata + fonts
│   ├── page.tsx                # Public homepage (Server Component)
│   ├── globals.css             # CSS variables + glitch / scanline / noise
│   ├── login/page.tsx          # Admin login
│   ├── admin/                  # Auth-protected admin (dashboard, projects, messages, skills)
│   └── api/
│       ├── contact/route.ts    # Contact form handler (rate-limited)
│       └── revalidate/route.ts # ISR revalidation webhook
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── sections/               # Hero, About, Skills, Projects, Experience, Certifications, Testimonials, Contact
│   ├── ui/                     # GlitchText, TerminalCard, NeonButton, ProjectCard, SkillBadge, MatrixBackground, Typewriter, StatCounter, SectionHeading
│   └── admin/                  # ProjectsManager, MessageList, SkillsManager, LogoutButton
├── lib/
│   ├── supabase/               # client.ts, server.ts, middleware.ts, queries.ts
│   ├── types/database.ts       # All table row types + Database type
│   ├── utils/                  # cn, formatDate
│   └── constants/              # navigation + fallback seed data
├── hooks/useScrollSpy.ts       # Active nav section detection
├── middleware.ts               # Protects /admin/* routes
└── supabase/
    ├── migrations/001_initial_schema.sql
    └── seed.sql
```

---

## Supabase Setup

1. Create a project at https://supabase.com.
2. In **SQL Editor**, run `supabase/migrations/001_initial_schema.sql`.
3. Optionally run `supabase/seed.sql` for sample data.
4. Copy the project URL + anon key into `.env.local`.
5. Create an admin user in **Authentication → Users** (email + password).
6. Restart the dev server. `/admin` will now be live after login.

### Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...           # optional, for server-side admin tools
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATE_SECRET=long-random-string    # for /api/revalidate webhook
RESEND_API_KEY=                          # optional, for email notifications
```

---

## Tables

| Table | Purpose |
|---|---|
| `projects` | Portfolio entries with category, tech stack, featured flag |
| `skills` | Categorized skill list with proficiency 0–100 |
| `experience` | Career timeline with responsibilities + tech |
| `certifications` | Industry credentials |
| `testimonials` | Client feedback with platform + rating |
| `contact_messages` | Inbound form submissions |
| `site_stats` | Optional analytics counters |

Row Level Security: public read on portfolio tables, public insert on `contact_messages`, full access for `authenticated` role.

---

## Admin

- Login: `/login`
- Dashboard: `/admin`
- Projects CRUD: `/admin/projects`
- Messages: `/admin/messages` — status workflow (unread → read → replied → archived)
- Skills CRUD: `/admin/skills`

Auth uses Supabase email/password. Create the user via Supabase dashboard.

---

## Customizing

- **Personal info / social links**: [`lib/constants/navigation.ts`](lib/constants/navigation.ts)
- **Color palette**: [`tailwind.config.ts`](tailwind.config.ts) + CSS vars in [`app/globals.css`](app/globals.css)
- **Fallback / seed content**: [`lib/constants/fallback-data.ts`](lib/constants/fallback-data.ts) + [`supabase/seed.sql`](supabase/seed.sql)
- **Glitch / scanline animations**: [`app/globals.css`](app/globals.css)

---

## Deploy to Vercel

1. Push to GitHub.
2. Import into Vercel.
3. Add env vars in Project Settings.
4. Deploy.

ISR is configured with `export const revalidate = 3600` on the home page, plus a `/api/revalidate` webhook you can call from a Supabase trigger to invalidate on data changes.

---

## Scripts

```bash
npm run dev          # dev server
npm run build        # production build
npm run start        # serve production build
npm run type-check   # tsc --noEmit
npm run lint         # next lint
```