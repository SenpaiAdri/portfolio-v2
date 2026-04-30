# AGENTS.md

## Commands

- `npm run dev` — Start Next.js dev server (http://localhost:3000)
- `npm run build` — Production build
- `npm run lint` — ESLint (next/core-web-vitals + typescript configs)
- No test framework configured; no `typecheck` script (relies on TS incremental compilation)

## Architecture

- Next.js 16 App Router with `app/` as entrypoint
- Page sections live in `components/sections/` (Hero, Projects, About, Contact)
- `app/page.tsx` wraps all sections in a single `<RevealScroll>` component
- `data/projects.ts` — single source of project data; each project's `color` (hex) drives accent colors in UI
- Email: `app/actions/send-email.ts` (Server Action) + `app/emails/contact-template.tsx` (react-email + Resend)
- Project carousel: `components/sections/project-carousel.tsx` uses Embla Carousel with Autoplay (3s delay, non-stop)

## Environment

- Requires `.env` with `RESEND_API_KEY` and optional `CONTACT_EMAIL` (defaults to `eydriannn@gmail.com`)
- `.env` is gitignored — never commit API keys
- Resend sends from `onboarding@resend.dev`, replies to visitor's email

## Conventions & Quirks

- **shadcn/ui** configured with `radix-nova` style; uses `@react-bits` registry (`components.json`)
- **Tailwind CSS v4** with `@tailwindcss/postcss` (not `tailwind.config.ts`)
- **Path aliases**: `@/*` maps to `./*` (see `tsconfig.json`)
- **Fonts**: Bruno Ace SC (headings/body), Geist (sans variable) — loaded via `next/font/google`
- **Scroll design**: `app/globals.css` sets `overflow: hidden` + `height: 100%` on `html, body` — intentional for GSAP scroll-reveal
- **Colors**: oklch format, dark theme default with red accent (`--primary: oklch(0.87 0.00 0)` in dark)
- **Hooks directory** exists but is currently empty
- **No CI workflows**, no pre-commit hooks, no tests
