# AI Researcher Portfolio

A cinematic, production-ready personal-portfolio platform for a Deep Learning
Engineer & AI Researcher. Built with Next.js 15 (App Router), Supabase,
Tailwind, Framer Motion and shadcn/ui — every section is dynamic and editable
from a built-in admin panel.

## Highlights

- **Cinematic hero** with an animated neural-network canvas, parallax glow,
  and a typewriter rotator.
- **Dark luxury aesthetic** inspired by OpenAI / Vercel / Apple / Linear —
  glassmorphism panels, glow borders, grain overlay, layered radial gradients.
- **Public sections**: Hero · About · Research · Projects · Skills ·
  Publications · Experience · Achievements · Blog · Contact.
- **Detail pages** for projects, research, and blog posts with MDX content
  rendering.
- **Admin panel** at `/admin/*` with full CRUD for every entity, MDX editor,
  drag-and-drop reorder, image uploads to Supabase Storage, message inbox,
  and analytics-style dashboard.
- **Auth**: Supabase email/password + admin allow-list (via env var or
  `public.admins` table).
- **SEO**: `generateMetadata`, OG / Twitter cards, JSON-LD `Person`, sitemap,
  robots.
- **Email**: contact form persists to DB and sends via Resend.
- **Storage**: avatars, projects, research, posts, resumes, site assets — all
  served through Supabase Storage public buckets.

---

## Tech stack

| Layer       | Tools                                                                      |
| ----------- | -------------------------------------------------------------------------- |
| Framework   | Next.js 15 App Router · React 19 · TypeScript                              |
| Styling     | Tailwind CSS · tailwindcss-animate · custom design tokens                  |
| UI          | shadcn/ui primitives · Radix UI · Lucide icons                             |
| Motion      | Framer Motion · canvas-based neural network · IntersectionObserver         |
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
│   │   ├── globals.css              # Theme tokens + cinematic effects
│   │   ├── layout.tsx               # Root layout (fonts, metadata)
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── admin/                   # Admin-only components & forms
│   │   ├── fx/                      # Neural network, grid backdrop, reveal, spotlight, typewriter
│   │   ├── sections/                # Public site sections
│   │   ├── site/                    # Public layout (nav, footer, MDX, JSON-LD)
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

## Customising the design

All design tokens live in two places:

- `src/app/globals.css` – CSS variables, glass / glow / grain utilities,
  cinematic backgrounds, MDX prose tuning.
- `tailwind.config.ts` – `ink-*` and `accent-*` colour scales, custom
  keyframes, glow shadows, fonts.

The hero's neural-network animation lives in
`src/components/fx/neural-network.tsx` — tweak `density`, `linkDistance`,
`maxNodes`, `speed` for different vibes. It honours
`prefers-reduced-motion`.

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
