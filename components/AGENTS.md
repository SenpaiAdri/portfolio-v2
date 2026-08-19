# Components Directory

## RevealScroll System

- **Native scroll disabled**: `reveal-scroll.tsx` sets `overflow: hidden` on `html, body` and locks scroll to section-by-section navigation
- **Transitions**: GSAP pair tweens (1000ms, `power4.inOut`) — only the leaving/entering sections animate; every other section sits at a rest transform (`gsap.set`), tracked in `currentIndexRef`. GSAP owns all transforms; React only renders z-index
- **Parallax layers**: Any `[data-parallax]` element inside a section drifts at half speed in the opposite direction and fades to 0.2 during exit (Richard Mille-style). Sections rest: below viewport → `y: 50% / opacity 0.2`, elsewhere → `0% / 1`
- **Footer strip**: `<RevealScroll footer={...}>` renders a `h-[50vh]` strip; scrolling "next" at the last section slides the whole stack up past it (and back down on "prev"). Must match `FOOTER_HEIGHT` in `reveal-scroll.tsx`
- **Input methods**: Wheel (800ms throttle, 20px delta), ArrowUp/ArrowDown, touch swipes (50px threshold, swipe up = next)
- **Section registration**: Use `useSectionScroll(index, handler)` hook — sections can return `true` from handler to consume scroll intents (e.g., internal scrollable content)
- **Programmatic navigation**: Use `<RevealScrollTo to={index}>` component or dispatch `reveal-scroll-to` custom event with `{ detail: { index: number } }`
- **z-index stacking**: Sections use `zIndex: sectionCount - i` — higher index sections stack on top

## Animation Tools

- **GSAP**: Used for component-level animations (TextType cursor blink, LogoAnimated SVG draw) and all RevealScroll section transitions
  - TextType: Cursor blink via `gsap.to()` with `yoyo: true`, typing controlled by React state
  - LogoAnimated: DrawSVGPlugin for stroke animation, then fill fade-in via GSAP timeline
  - RevealScroll: `gsap.timeline()` pair tweens + `power4.inOut`, `gsap.context()` scoped cleanup, `gsap.set()` for rest states
- **CSS Transitions**: Only used for theme/interaction polish inside sections (borders, colors, carousel slides) — never for section-to-section navigation
- **No CSS-in-JS**: All styling via Tailwind classes + `app/globals.css`

## Design System

- **Colors**: oklch format, dark theme default (`--primary: oklch(0.87 0.00 0)` red accent in dark)
- **Borders**: Dashed borders in gray-600 (dividers) or red-500 (section accents), typically `border-4 border-dashed`
- **Grid backgrounds**: Hero section uses `backgroundImage` with `linear-gradient` for dashed grid effect
- **Responsive breakpoints**: Custom (`base`, `sm`, `md`, `lg`, `xl`) — LogoAnimated handles responsive sizing via window resize listener
- **Fonts**: Bruno Ace SC (headings/body, loaded via next/font/google), Geist (sans variable)

## Projects Section Pattern

- **Internal scroll consumption**: Projects section (index=1) uses `useSectionScroll` to navigate projects internally before releasing to RevealScroll (returns `true` to consume intent until first/last project reached)
- **Project color theming**: Each project's `color` field (hex) drives dynamic styling — borders, text, grid backgrounds, carousel accents (CSS transitions: `0.7s ease-in-out`)
- **Image transitions**: All project elements use `translateY((index - currentProject) * 100%)` for synchronized slide transitions (1000ms duration)
- **ProjectCarousel**: Uses Embla Carousel + Autoplay plugin; only autoplays for active project (`isActive` check); click to expand image in modal

## Component Conventions

- **Sections** (`sections/`): Page sections wrapped by `RevealScroll` in `app/page.tsx`, order determines index (Hero=0, Projects=1, Experience=2, About=3, Contact=4); `FooterStrip` is passed via the `footer` prop (index sheet / title-block aesthetic, reuses `SOCIALS` exported from `contact.tsx`)
- **Path alias**: `@/components` maps to this directory (see `tsconfig.json` and `components.json`)
- **shadcn/ui**: Configured with `radix-nova` style, uses `@react-bits` registry — components in `ui/` subdirectory (currently empty, uses `@/components/ui` alias)
- **"use client"**: Required on all interactive components (RevealScroll, TextType, LogoAnimated, sections with hooks)
