# train.cosmoverge.in — AI/ML Trainer Website

Production B2B website for Harshith, AI/ML trainer based in Bengaluru. Targets TPOs, HODs, and Principals of BCA/MCA/BE engineering colleges.

**Live URL:** https://train.cosmoverge.in

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS + shadcn/ui components |
| Content | MDX files in `/content` |
| Database | Supabase (Postgres) — lead capture |
| Email | Resend API |
| Deployment | Docker → EC2 → Nginx → Cloudflare → `train.cosmoverge.in` |

---

## Local Development

### Prerequisites

- Node.js 20+
- npm 9+
- Supabase project
- Resend account

### Setup

```bash
# 1. Enter the project
cd CosmoLearn

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Fill in all values in .env.local (see env var docs below)

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Full URL of the site (no trailing slash) |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key — **server-side only** |
| `RESEND_API_KEY` | Yes | Resend API key for email delivery |
| `RESEND_FROM_EMAIL` | Yes | Verified from-address (must be verified in Resend) |
| `TRAINER_NOTIFICATION_EMAIL` | Yes | Email address for lead notifications |

> **Security:** `SUPABASE_SERVICE_ROLE_KEY` is used only in `/app/api/leads/route.ts`. It must never be exposed to the client or included in `NEXT_PUBLIC_*` variables.

---

## Supabase Setup

Run the following SQL in the Supabase SQL editor:

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

---

## Content Management

### Adding a Program

1. Create `/content/programs/your-slug.mdx`
2. Add frontmatter (see existing programs for the schema)
3. The program appears automatically on `/programs` and `/programs/your-slug`

### Adding a Blog Post

1. Create `/content/blog/your-slug.mdx`
2. Add frontmatter (`title`, `slug`, `date`, `excerpt`, `tags`, `author`)
3. The post appears automatically on `/blog` and `/blog/your-slug`

### Replacing Placeholder Content

Search for `// TODO:` comments in the codebase:

```bash
grep -r "TODO:" app/ components/ content/
```

Key items:
- **Testimonials** in `components/home/SocialProof.tsx` — replace with real quotes from TPOs/HODs
- **Photo** in `app/about/page.tsx` — replace placeholder div with `<Image src="..." />`
- **Social links** in `components/layout/Footer.tsx` — update LinkedIn, GitHub, Twitter URLs
- **Brochure** — replace `public/brochure.pdf` with the actual program brochure

---

## Deployment to EC2 via Docker

### 1. Build the Docker image

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://train.cosmoverge.in \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=your-supabase-url \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key \
  -t cosmolearn-app:latest .
```

### 2. Push to a registry (Docker Hub or GHCR)

```bash
docker tag cosmolearn-app:latest your-registry/cosmolearn-app:latest
docker push your-registry/cosmolearn-app:latest
```

### 3. On the EC2 instance

```bash
# Copy docker-compose.yml and .env.local to server, then:
docker-compose pull
docker-compose up -d
```

### 4. Nginx setup

```bash
sudo cp nginx.conf /etc/nginx/sites-available/train.cosmoverge.in
sudo ln -s /etc/nginx/sites-available/train.cosmoverge.in /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# SSL
sudo certbot --nginx -d train.cosmoverge.in
```

### 5. Cloudflare DNS

- Add `A` record: `train` → EC2 public IP, **Proxied** (orange cloud)
- SSL/TLS mode: **Full (strict)**

---

## Project Structure

```
app/
  layout.tsx              Root layout (fonts, Navbar, Footer, metadata)
  page.tsx                Homepage
  about/page.tsx          About page
  programs/
    page.tsx              All programs list
    [slug]/page.tsx       Dynamic program page (with Course JSON-LD)
  blog/
    page.tsx              Blog list
    [slug]/page.tsx       Blog post (with share buttons)
  contact/
    page.tsx              Contact page
    LeadFormWrapper.tsx   Client wrapper (reads URL params for program pre-fill)
  api/leads/route.ts      POST handler (Supabase insert + Resend emails)

components/
  ui/                     Button, Card, Input, Textarea, Select, Accordion, Badge
  layout/                 Navbar, Footer
  home/                   Hero, WhyIndustry, ProgramsGrid, SocialProof, WhatCollegesGet, CtaSection
  programs/               ProgramCard, CurriculumAccordion
  blog/                   BlogCard
  contact/                LeadForm

content/
  programs/*.mdx          4 program MDX files
  blog/*.mdx              Blog posts

lib/
  utils.ts                cn() utility
  mdx.ts                  MDX file readers
  supabase.ts             Supabase clients (public + admin)
  resend.ts               Email templates + send functions
```

---

## Available Scripts

```bash
npm run dev        # Dev server at localhost:3000
npm run build      # Production build + generate sitemap/robots.txt
npm run start      # Start production server
npm run lint       # ESLint
```
