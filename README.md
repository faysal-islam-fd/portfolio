# Faysal Islam Fahad — Portfolio

Personal brand site for a full-stack AI engineer, built with Next.js 15
(App Router), Supabase and Tailwind, plus an admin panel for projects,
writing, certifications and contact messages.

## Brand in one line

**Models where they help. Code where it has to be right.** Every case
study shows an "anatomy" diagram with the same visual grammar —
solid = deterministic code, dashed = model output, filled = guardrail,
tinted = data — so visitors see how a system is engineered, not just
which tools it uses.

## Content model

| What | Where it lives | Edited by |
| --- | --- | --- |
| Positioning, principles, process, experience, stack, channels | `src/content/profile.ts` | code (git) |
| Case studies + "also built" index | `src/content/work.ts` | code (git) |
| Services | `src/content/services.ts` | code (git) |
| Extra projects, blog posts, certifications, profile photo, résumé PDF | Supabase | `/admin` |
| Contact messages | Supabase (+ Resend email) | `/admin/messages` |

The narrative lives in code on purpose: it is reviewed in git and every
claim in it is backed by a public link (live product, repository or CV).
**Do not add metrics or achievements that cannot be linked to evidence.**

Projects added in `/admin/projects` appear automatically on `/projects`
(and get a detail page) unless a hand-written case study with the same
slug exists in `src/content/work.ts`. The admin sections for hero,
about text, services ("research"), skills, experience and achievements
are no longer read by the public site.

`supabase/migrations/0004_remove_placeholder_content.sql` removes example
claims that the original seed inserted. Review it, then run it once.

## Design system

- Palette: warm paper, ink, one signal colour (`#C43E1A`), with an
  automatic dark variant. Tokens are RGB triplets in `src/app/globals.css`
  exposed to Tailwind as `paper`, `fg`, `line`, `signal`.
- Type: Instrument Serif (display), Geist (text), Geist Mono (labels),
  loaded with `next/font`.
- Public-site styles are scoped under `.site`; the admin panel keeps its
  own dark theme.
- Brand components: `src/components/brand/*`. OG images share one renderer
  in `src/lib/og.tsx`.

---

## Tech stack

| Layer       | Tools                                                                      |
| ----------- | -------------------------------------------------------------------------- |
| Framework   | Next.js 15 App Router · React 19 · TypeScript                              |
| Styling     | Tailwind CSS · tailwindcss-animate · custom design tokens                  |
| UI          | shadcn/ui primitives · Radix UI · Lucide icons                             |
| Backend     | Supabase (Postgres · Auth · Storage)                                       |
| Forms       | React Hook Form · Zod                                                      |
| MDX         | `@next/mdx` · `next-mdx-remote` · `@uiw/react-md-editor`                   |
| DnD         | `@dnd-kit/core` + `@dnd-kit/sortable`                                      |
| Email       | Resend                                                                     |
| SEO         | `generateMetadata` · `next-sitemap` · JSON-LD · OpenGraph                  |

---

## Folder structure

```
.
├── public/                          # Static assets (favicon, og)
├── supabase/
│   └── migrations/
│       ├── 0001_initial_schema.sql  # Tables, RLS, storage buckets
│       └── 0002_seed.sql            # Example data
├── src/
│   ├── app/
│   │   ├── (site)/                  # Public site (route group)
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx             # Home
│   │   │   ├── about/
│   │   │   ├── research/
│   │   │   ├── projects/
│   │   │   ├── publications/
│   │   │   ├── blog/
│   │   │   └── contact/
│   │   ├── admin/                   # Protected admin panel
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx             # Dashboard
│   │   │   ├── projects/
│   │   │   ├── research/
│   │   │   ├── publications/
│   │   │   ├── posts/
│   │   │   ├── experience/
│   │   │   ├── skills/
│   │   │   ├── achievements/
│   │   │   ├── contact-links/
│   │   │   ├── hero/
│   │   │   ├── about/
│   │   │   ├── messages/
│   │   │   └── settings/
│   │   ├── login/                   # Supabase auth
│   │   ├── api/resume/              # Resume redirect
│   │   ├── actions/                 # Server actions (admin · contact · upload)
│   │   ├── globals.css              # Brand tokens (public) + admin theme
│   │   ├── layout.tsx               # Root layout (fonts, metadata)
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── admin/                   # Admin-only components & forms
│   │   ├── brand/                   # Public-site components (nav, anatomy diagram, sections, form)
│   │   ├── site/                    # MDX renderer, JSON-LD helpers
│   │   └── ui/                      # shadcn primitives
│   ├── lib/
│   │   ├── supabase/                # Browser, server, middleware clients
│   │   ├── auth.ts                  # requireAdmin / isAdmin helpers
│   │   ├── queries.ts               # Cached SSR reads
│   │   ├── schemas.ts               # Zod schemas
│   │   ├── types.ts                 # DB row types
│   │   └── utils.ts                 # cn, formatters, slug
│   └── middleware.ts                # Refresh session + protect /admin
├── tailwind.config.ts
├── next.config.mjs
├── next-sitemap.config.js
├── components.json                  # shadcn config
├── tsconfig.json
└── package.json
```

---

## Getting started

### 1. Clone & install

```bash
git clone <your-repo>.git
cd portfolio
npm install
```

### 2. Create a Supabase project

1. Sign up at https://supabase.com and create a new project.
2. From **Project Settings → API**, copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` secret → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Run the migrations

Open the **SQL editor** in the Supabase dashboard and run, in order:

1. `supabase/migrations/0001_initial_schema.sql`
2. `supabase/migrations/0002_seed.sql` (optional, fills example content)

The first migration provisions:

- All tables (`projects`, `research`, `publications`, `posts`, `skills`,
  `experience`, `achievements`, `hero`, `about`, `contact_links`,
  `contact_messages`, `site_config`, `admins`).
- Enums for status / type fields.
- `updated_at` triggers.
- Row-Level Security policies (public reads on published rows, admin writes).
- Storage buckets (`avatars`, `projects`, `research`, `posts`, `resumes`,
  `site`) with public read + admin write policies.

### 4. Create your admin user

Two ways to flag a user as admin (either works):

- **Easiest** — add their email to the `ADMIN_EMAILS` env var (comma-separated).
- **DB-driven** — insert their email into `public.admins`:

  ```sql
  insert into public.admins (email) values ('you@yourdomain.com');
  ```

Then create a user via **Authentication → Users → Add user** in Supabase
with that same email and a password. (Email confirmation can be disabled in
**Authentication → Providers → Email** for solo use.)

### 5. Configure environment variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="AI Researcher Portfolio"

NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

RESEND_API_KEY=re_xxx
CONTACT_EMAIL_FROM="Portfolio <hello@yourdomain.com>"
CONTACT_EMAIL_TO=you@yourdomain.com

ADMIN_EMAILS=you@yourdomain.com
```

### 6. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign in at
`/login` with your admin credentials and start editing at `/admin`.

---

## Filling in your content

After signing in:

1. **`/admin/hero`** – set headline, eyebrow, CTAs, rotating titles, metrics.
2. **`/admin/about`** – name, bio, photo, resume PDF, highlights.
3. **`/admin/projects`** – create AI / DL case studies (problem, approach,
   results, metrics, MDX content).
4. **`/admin/research`** – ongoing investigations / thesis work.
5. **`/admin/publications`** – papers, workshops, preprints.
6. **`/admin/experience`** – work, research, education timeline.
7. **`/admin/skills`** – grouped by category with proficiency bars.
8. **`/admin/achievements`** – awards & recognitions.
9. **`/admin/posts`** – blog posts (MDX-powered).
10. **`/admin/contact-links`** – social / email / scholar (drag to reorder).
11. **`/admin/messages`** – inbox of contact form submissions.

All edits propagate to the public site in ≤ 60 s thanks to ISR. Use
the **Preview** link on saved entries for a quick check.

---

## Deployment

### Vercel (recommended)

1. Push the repo to GitHub.
2. Import into [Vercel](https://vercel.com/new) — Next.js is auto-detected.
3. Add the same env vars from `.env.local` to **Project Settings →
   Environment Variables**.
4. Deploy.

### Custom domain

In Vercel → **Project → Domains**, add your domain and update DNS as
instructed. Update `NEXT_PUBLIC_SITE_URL` to the production URL so OG /
sitemap / canonical links use it.

### Resend domain verification

For the contact form to send from a custom address, add and verify your
domain at https://resend.com/domains. Then set
`CONTACT_EMAIL_FROM="Your Name <hello@yourdomain.com>"`.

---

## Useful scripts

```bash
npm run dev          # Local dev server
npm run build        # Production build
npm run start        # Start production build
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
npm run postbuild    # Generate sitemap.xml + robots.txt (next-sitemap)
```

---

## Performance & SEO checklist

- [x] Server Components by default; client components only where interactive.
- [x] `unstable_cache` on every public read with ISR tags.
- [x] `next/image` with optimised remote patterns.
- [x] `next/font` with `display: swap` for Inter + JetBrains Mono.
- [x] `generateStaticParams` for projects / research / posts.
- [x] `generateMetadata` per dynamic route (OG + Twitter).
- [x] `Person` JSON-LD on the home page.
- [x] sitemap.xml + robots.txt with admin / api excluded.
- [x] Honeypot anti-spam on contact form.

---

## Security notes

- The `service_role` key is only ever imported from server-only code
  (`src/lib/supabase/server.ts`). Never expose it to a client component.
- `/admin/*` is protected at the middleware layer **and** at every
  server-action entrypoint via `requireAdmin()`.
- RLS policies enforce that only published rows are visible to anonymous
  users, regardless of API access.
- Storage buckets are public-read (so images load without signed URLs)
  but admin-only-write.

---

## License

MIT — feel free to adapt for your own portfolio.
