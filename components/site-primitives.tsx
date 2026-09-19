"use client";

import type { ReactNode } from "react";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  type LucideIcon,
} from "lucide-react";
import { RevealScrollTo } from "./reveal-scroll";
import { Button } from "./button";

/**
 * Shared site primitives — single source for the repeated Tailwind
 * combos across sections (dashed dividers, bracket labels, nav links,
 * social icons). Colors resolve to the palette in `app/globals.css`
 * (`--line`, `--ink-*`, `--brand`) — tweak there, not here.
 *
 * Accent red is `brand` site-wide (unified); hover/focus states
 * lighten one step to `brand-hover` to preserve feedback contrast.
 */

/* ------------------------------------------------------------------ */
/* Hero divider tokens — dashed grid language                          */
/* ------------------------------------------------------------------ */

export const HERO_DIVIDER_BOTTOM_RED =
  "border-b-brand border-b-4 border-dashed";

export const HERO_DIVIDER_BOTTOM_GRAY =
  "border-b-line border-b-4 border-dashed";

export const HERO_DIVIDER_RIGHT_GRAY = "border-r-line border-r-4 border-dashed";

export const HERO_DIVIDER_RIGHT_GRAY_MD =
  "md:border-r-line md:border-r-4 border-dashed";

/* ------------------------------------------------------------------ */
/* Hero text tokens — bracket / label treatments (Bruno Ace SC)        */
/* ------------------------------------------------------------------ */

/** Red accent label, e.g. "---" and "[PATH]". */
export const HERO_ACCENT_TEXT = "text-brand text-xl md:text-2xl";

/** Muted gray body lines, e.g. under [PATH]. */
export const HERO_MUTED_TEXT =
  "text-ink-muted text-base md:text-xl lg:text-2xl";

/** Side-nav link: muted → red with left nudge on hover. */
export const HERO_NAV_LINK_CLASS =
  "text-ink-muted hover:text-brand hover:-translate-x-4 transition-[transform,color] cursor-pointer";

/* ------------------------------------------------------------------ */
/* Section text tokens — shared by about / experience / skills         */
/* ------------------------------------------------------------------ */

/** Centered section heading, e.g. Experience / Skills titles. */
export const SECTION_HEADING =
  "text-base sm:text-xl lg:text-2xl lg:font-black tracking-[0.5em] text-ink-muted uppercase text-center";

/** Muted icon tagline row, e.g. "Work History" / "Full Stack Developer". */
export const SECTION_TAGLINE =
  "text-xs lg:text-2xl lg:font-black tracking-[0.2em] text-ink-muted uppercase flex items-center gap-3";

/* ------------------------------------------------------------------ */
/* Hero socials                                                        */
/* ------------------------------------------------------------------ */

export const HERO_SOCIALS: readonly {
  href: string;
  label: string;
  Icon: LucideIcon;
}[] = [
  {
    href: "https://www.linkedin.com/in/eydriannn/",
    label: "LinkedIn profile",
    Icon: Linkedin,
  },
];

/** All site social profiles — contact grid, footer channels. */
export const SOCIALS = [
  {
    href: "https://github.com/SenpaiAdri",
    label: "GitHub",
    Icon: Github,
  },
  {
    href: "https://www.facebook.com/eydriannnnnn",
    label: "Facebook",
    Icon: Facebook,
  },
  {
    href: "https://www.instagram.com/_eydriannn/",
    label: "Instagram",
    Icon: Instagram,
  },
  {
    href: "https://www.linkedin.com/in/eydriannn/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
] as const;

/* ------------------------------------------------------------------ */
/* Shared interactive primitives                                       */
/* ------------------------------------------------------------------ */

/** Side-nav link to a RevealScroll section, e.g. [ PROJECTS ]. */
export function HeroNavLink({
  to,
  children,
}: {
  to: number;
  children: ReactNode;
}) {
  return (
    <RevealScrollTo to={to} className={HERO_NAV_LINK_CLASS}>
      <Button underline>
        {children}
      </Button>
    </RevealScrollTo>
  );
}

/** Bare red social icon link with GSAP draw hover. */
export function SocialIconLink({
  href,
  label,
  Icon,
  size = 35,
}: {
  href: string;
  label: string;
  Icon: LucideIcon;
  size?: number;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <Icon
        className="text-brand hover:text-brand-hover transition-colors cursor-pointer"
        size={size}
        aria-hidden="true"
      />
    </a>
  );
}
