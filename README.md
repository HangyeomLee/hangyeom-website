# hangyeom.dev — Portfolio

Recruiter-optimized portfolio built with Next.js 15 (App Router). Server-rendered
pages, real routes, and a Supabase-backed blog with an authenticated admin area.

## Routes

- `/` — one-page home (hero, metrics, projects, experience, contact)
- `/projects/[slug]` — project case studies (SSG)
- `/blog`, `/blog/[slug]` — blog, server-rendered with ISR (60s)
- `/resume` — print-optimized HTML resume ("Download PDF" = browser print)
- `/admin` — password-protected post editor (create/edit/delete, categories, image upload)

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`

## Environment variables (`.env.local` locally, same names on Vercel)

- `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — blog database/storage
- `ADMIN_PASSWORD` — /admin login password
- `AUTH_SECRET` — HMAC key for the admin session cookie (32+ random bytes)
- `NEXT_PUBLIC_SITE_URL` — canonical site URL (used by metadata + sitemap)

## Files you will edit most often

- `components/portfolioData.ts` — profile, metrics, experience, projects
- `app/resume/page.tsx` — resume content
- `app/globals.css` — design tokens (colors, fonts)

## Build

```bash
npm run build
npm run start
```
