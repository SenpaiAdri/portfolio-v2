# Portfolio v2 — Adrian

A personal portfolio website built with Next.js, featuring animated typography, scroll-reveal sections, and an interactive project showcase.

## ✨ Features

- **Animated typing effect** — cycling through roles and greetings in the hero section
- **Scroll-reveal transitions** — smooth section-by-section reveal powered by GSAP
- **Project showcase slider** — scroll through projects with animated logo, title, description, and timeline transitions
- **Social links** — direct links to GitHub and LinkedIn
- **Responsive dark design** — dark theme with a red accent color system and dashed-border grid aesthetic

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 |
| Animation | [GSAP](https://gsap.com) |
| Icons | [Lucide React](https://lucide.dev) |
| Components | [shadcn/ui](https://ui.shadcn.com) + Radix UI |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn / pnpm / bun)

### Installation

```bash
# Clone the repository
git clone https://github.com/SenpaiAdri/portfolio-v2.git
cd portfolio-v2

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## 📁 Project Structure

```
portfolio-v2/
├── app/               # Next.js App Router (layout, page, global styles)
├── components/
│   ├── sections/      # Page sections (Hero, Projects, About)
│   ├── TextType.tsx   # Animated typing component
│   └── reveal-scroll.tsx  # GSAP scroll-reveal wrapper & hooks
├── data/
│   └── projects.ts    # Project data (name, description, links, etc.)
└── public/            # Static assets (logos, images)
```

## 🔗 Links

- **GitHub:** [github.com/SenpaiAdri](https://github.com/SenpaiAdri)
- **LinkedIn:** [linkedin.com/in/eydriannn](https://www.linkedin.com/in/eydriannn/)
