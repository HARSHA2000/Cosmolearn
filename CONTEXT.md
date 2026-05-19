# CosmoLearn — Project Context & Handoff

## What This Is
A complete, production-ready B2B AI/ML trainer website for **Harshith** (Bengaluru), targeting TPOs/HODs/Principals of BCA/MCA/BE engineering colleges. The site's job is credibility validation — visitors land here from LinkedIn/referral to verify legitimacy before committing to a call.

**Live domain:** https://train.cosmoverge.in  
**Local dev:** http://localhost:3000  
**Build status:** `npm run build` passes clean (16 routes, 0 errors)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS + custom shadcn/ui components |
| Content | MDX files in `/content` via `next-mdx-remote` |
| Database | Supabase (Postgres) — `leads` table |
| Email | Resend API — dual emails on form submit |
| Deployment | Docker → EC2 → Nginx → Cloudflare |

---

## Project Location
```
C:\Users\Harsha\Desktop\personal\CosmoLearn
```

---

## All Pages Built

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Homepage — Hero, Why Industry, Programs grid, Social Proof, College Benefits, CTA |
| `/programs` | `app/programs/page.tsx` | All 4 program cards |
| `/programs/[slug]` | `app/programs/[slug]/page.tsx` | Full MDX curriculum + sidebar + Course JSON-LD |
| `/about` | `app/about/page.tsx` | Harshith's background, timeline, tech stack, philosophy |
| `/blog` | `app/blog/page.tsx` | Blog card grid with tags |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Full MDX post + LinkedIn/Twitter/WhatsApp share |
| `/contact` | `app/contact/page.tsx` | Lead form → `/api/leads` |
| `/api/leads` | `app/api/leads/route.ts` | POST: Supabase insert + Resend dual emails (server-only) |

---

## Full File Structure

```
app/
  layout.tsx                   Root layout (Plus Jakarta Sans + Inter fonts, Navbar, Footer, metadata)
  page.tsx                     Homepage
  about/page.tsx
  programs/page.tsx
  programs/[slug]/page.tsx
  blog/page.tsx
  blog/[slug]/page.tsx
  contact/page.tsx
  contact/LeadFormWrapper.tsx  Client wrapper — reads ?program= URL param for form pre-fill
  api/leads/route.ts           POST handler (server-only, uses SUPABASE_SERVICE_ROLE_KEY)

components/
  ui/
    button.tsx                 Variants: default, amber, outline, outline-amber, ghost, link
    card.tsx                   Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
    input.tsx
    textarea.tsx
    select.tsx                 Radix UI Select wrapper
    accordion.tsx              Radix UI Accordion wrapper
    badge.tsx                  Variants: default, amber, navy, green, outline
  layout/
    Navbar.tsx                 Sticky, scrolled state, mobile hamburger menu
    Footer.tsx                 4-column: brand, Programs, Company, Contact
  home/
    Hero.tsx                   Dark navy bg, amber CTA, credibility bar
    WhyIndustry.tsx            3-column: Problem → Gap → Solution
    ProgramsGrid.tsx           4 program cards with tools, badges, CTAs
    SocialProof.tsx            Stats strip + college names + 3 testimonial cards
    WhatCollegesGet.tsx        Dark bg, 5 deliverable items
    CtaSection.tsx             Amber bg, full-width CTA
  programs/
    ProgramCard.tsx
    CurriculumAccordion.tsx    Parses ### headings from MDX as accordion sections
  blog/
    BlogCard.tsx               Tag badges, excerpt, date, read link
  contact/
    LeadForm.tsx               Full controlled form with loading/success/error states

content/
  programs/
    generative-ai-prompt-engineering.mdx
    computer-vision-bootcamp.mdx
    fdp-ai-tools-education.mdx
    mlops-deployment-final-year.mdx
  blog/
    what-engineering-colleges-get-wrong-about-ai-curriculum.mdx
    how-we-ran-a-2-day-fdp-ai-tools-40-faculty.mdx

lib/
  utils.ts        cn() helper (clsx + tailwind-merge)
  mdx.ts          getAllPrograms(), getProgramBySlug(), getAllBlogPosts(), getBlogPostBySlug()
  supabase.ts     getSupabase() (public, lazy), getSupabaseAdmin() (service role, server-only, lazy)
  resend.ts       sendTrainerNotification(lead), sendAcknowledgementEmail(lead) — both lazy init

public/
  brochure.pdf    PLACEHOLDER — replace with real brochure

Dockerfile
docker-compose.yml
docker-compose.dev.yml
nginx.conf
next-sitemap.config.js
.env.example
.env.local        ← YOU NEED TO FILL THIS IN (see below)
README.md
CONTEXT.md        ← this file
```

---

## Design System

- **Primary background:** `slate-950` (dark navy — hero sections, footer, dark cards)
- **Accent:** `amber-500` / `amber-400` (CTAs, highlights, badges)
- **Body bg:** white (`#ffffff`)
- **Display font:** Plus Jakarta Sans (`--font-jakarta`) — headings
- **Body font:** Inter (`--font-inter`) — body text
- **Border radius:** `0.5rem` base
- **Key Tailwind classes in use:** `font-display` (Jakarta), `font-body` (Inter)

---

## Current Blocker — Form Not Working

`.env.local` exists but needs real credentials filled in. The API route throws if any of these are missing.

### Step 1 — Fill in `.env.local`

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# From: supabase.com → your project → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# From: resend.com → API Keys
RESEND_API_KEY=re_your_key_here
RESEND_FROM_EMAIL=noreply@cosmoverge.in
TRAINER_NOTIFICATION_EMAIL=harshith@cosmoverge.in
```

### Step 2 — Create the Supabase `leads` table

Run this in the Supabase SQL editor:

```sql
create table leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  designation text,
  college_name text not null,
  city text,
  email text not null,
  phone text,
  program_interest text,
  student_count text,
  preferred_month text,
  notes text,
  created_at timestamptz default now(),
  status text default 'new'
);

alter table leads enable row level security;

create policy "Service role full access" on leads
  for all using (auth.role() = 'service_role');
```

### Step 3 — Restart the dev server

```cmd
taskkill /f /im node.exe
npm run dev
```

---

## Remaining Content TODOs

Search `// TODO:` in the codebase to find all placeholders:

```cmd
grep -r "TODO:" app/ components/ content/
```

| File | What to replace |
|---|---|
| `components/home/SocialProof.tsx` | 3 testimonial cards — replace `[Name]` placeholders with real quotes from TPOs/HODs |
| `app/about/page.tsx` | Photo — replace the placeholder `<div>` with `<Image src="..." alt="Harshith" />` |
| `components/layout/Footer.tsx` | Social links — update LinkedIn, GitHub, Twitter/X URLs |
| `public/brochure.pdf` | Replace placeholder file with real program brochure PDF |

---

## Key Implementation Details

### How MDX content works
- `lib/mdx.ts` reads `.mdx` files from `/content/programs/` and `/content/blog/` at build time using `gray-matter` for frontmatter
- Program pages use `next-mdx-remote/rsc` to render MDX server-side
- `getAllPrograms()` sorts by `order` frontmatter field
- `getAllBlogPosts()` sorts by `date` descending

### How the lead form works
1. User fills `components/contact/LeadForm.tsx` (client component)
2. On submit → `POST /api/leads` with JSON body
3. `app/api/leads/route.ts` validates fields, calls `getSupabaseAdmin().from("leads").insert()`
4. Fires `Promise.allSettled([sendTrainerNotification(), sendAcknowledgementEmail()])` — email failures don't block the response
5. Returns `{ success: true }` → form shows success state

### Why Supabase/Resend clients are lazy
Both `getSupabaseAdmin()` and `getResend()` instantiate on-call (not at module level) so Next.js build-time page collection doesn't throw when env vars aren't set.

### Contact form URL pre-fill
`/contact?program=Computer+Vision+Bootcamp` pre-selects the program dropdown. All "Request a Proposal" buttons on program pages pass the program name as a query param.

---

## Commands

```cmd
cd "C:\Users\Harsha\Desktop\personal\CosmoLearn"

npm run dev        # dev server → localhost:3000
npm run build      # production build + generates sitemap.xml + robots.txt
npm run start      # serve production build locally
npm run lint       # ESLint
```

---

## Deployment (when ready)

```bash
# 1. Build Docker image (inject NEXT_PUBLIC_ vars at build time)
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://train.cosmoverge.in \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key \
  -t cosmolearn-app:latest .

# 2. Push to registry
docker tag cosmolearn-app:latest your-registry/cosmolearn-app:latest
docker push your-registry/cosmolearn-app:latest

# 3. On EC2 — copy docker-compose.yml + .env.local, then:
docker-compose pull && docker-compose up -d

# 4. Nginx
sudo cp nginx.conf /etc/nginx/sites-available/train.cosmoverge.in
sudo ln -s /etc/nginx/sites-available/train.cosmoverge.in /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d train.cosmoverge.in

# 5. Cloudflare DNS
# A record: train → EC2 public IP, Proxied (orange cloud)
# SSL/TLS mode: Full (strict)
```
