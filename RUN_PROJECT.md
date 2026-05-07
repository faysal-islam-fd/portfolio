# Run This Project (Local)

## 1) Prerequisites

- Node.js `22+`
- npm `10+`
- A Supabase project
- (Optional) Resend API key for contact emails

## 2) Install dependencies

```bash
npm install --legacy-peer-deps
```

## 3) Configure environment variables

Copy example env:

```bash
cp .env.example .env.local
```

Then fill `.env.local`:

- `NEXT_PUBLIC_SITE_URL`
- ``
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAILS`
- Optional email settings (`RESEND_API_KEY`, `CONTACT_EMAIL_FROM`, `CONTACT_EMAIL_TO`)

## 4) Setup Supabase database

In Supabase SQL Editor, run these in order:
NEXT_PUBLIC_SUPABASE_URL
1. `supabase/migrations/0001_initial_schema.sql`
2. `supabase/migrations/0002_seed.sql` (optional sample content)

## 5) Create admin user

- Add your admin email in `.env.local` under `ADMIN_EMAILS`
- In Supabase Auth, create a user with that same email/password

## 6) Run development server

```bash
npm run dev
```

Open:

- Public site: `http://localhost:3000`
- Admin login: `http://localhost:3000/login`
- Admin panel: `http://localhost:3000/admin`

## 7) Production build check

```bash
npm run type-check
npm run build
npm run start
```

---

## Quick Troubleshooting

### Dependency conflict during install
Use:

```bash
npm install --legacy-peer-deps
```

### Admin route redirects to login repeatedly
- Confirm `ADMIN_EMAILS` contains your login email
- Confirm that user exists in Supabase Auth
- Confirm `NEXT_PUBLIC_SUPABASE_URL` and keys are correct

### Contact form saves but no email
- DB save works without Resend
- Add valid `RESEND_API_KEY` and `CONTACT_EMAIL_TO` to enable email sending
