"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SOCIALS } from "./contact";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type TitleBlockRow = {
  label: string;
  value: string;
  accent?: boolean;
};

const TITLE_BLOCK_ROWS: TitleBlockRow[] = [
  { label: "Project", value: "Portfolio V2" },
  { label: "Drawn By", value: "Adrian M. De Guzman" },
  { label: "Role", value: "Full-Stack Developer" },
  { label: "Status", value: "Open To Work", accent: true },
];

export default function FooterStrip() {
  const firstTextRef = useRef<HTMLSpanElement>(null);
  const secondTextRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Infinite marquee: two identical copies tiling seamlessly via rAF + gsap.set
  useEffect(() => {
    const first = firstTextRef.current;
    const second = secondTextRef.current;
    if (!first || !second || prefersReducedMotion) return;

    gsap.set(second, {
      left: second.getBoundingClientRect().width,
    });

    let xPercent = 0;
    let raf = 0;

    const animate = () => {
      if (xPercent > 0) xPercent = -100;
      gsap.set(first, { xPercent });
      gsap.set(second, { xPercent });
      raf = requestAnimationFrame(animate);
      xPercent += 0.1;
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion]);

  return (
    <footer className="relative flex h-full w-screen flex-col overflow-hidden ">
      <h2 className="sr-only">Footer — index sheet</h2>

      {/* Grid lines background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,25,25,0.08) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(255,25,25,0.08) 2px, transparent 2px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* EOF watermark */}
      {/* <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 z-0 -translate-y-1/2 translate-x-[12%] select-none whitespace-nowrap text-[4.5rem] font-bold md:text-[9rem]"
        style={{
          WebkitTextStroke: "2px rgba(255,25,25,0.16)",
          color: "transparent",
        }}
      >
        [ EOF ]
      </span> */}

      {/* Top strip — name marquee */}
      <div className="relative z-10 flex items-center overflow-hidden border-b-2 md:border-b-4 border-dashed border-gray-600 py-2.5 md:py-4">
        <div className="relative whitespace-nowrap text-[10px] md:text-xs tracking-[0.35em] uppercase text-red-500 select-none will-change-transform w-full">
          <span ref={firstTextRef} className="inline-block">
            {"ADRIAN ADRIAN ".repeat(10)}
          </span>
          <span ref={secondTextRef} className="absolute top-0 left-0 inline-block">
            {"ADRIAN ADRIAN ".repeat(10)}
          </span>
        </div>
      </div>

      {/* Middle: info rows | channels */}
      <div className="relative z-10 grid flex-1 min-h-0 grid-cols-1 md:grid-cols-[13fr_8fr]">
        <dl className="flex flex-col justify-center px-6 py-2 md:px-12 md:py-6 md:border-r-4 md:border-dashed md:border-r-red-500 lg:px-15">
          {TITLE_BLOCK_ROWS.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-4 border-b-2 border-dashed border-gray-600 py-1.5 last:border-b-0 md:py-2.5"
            >
              <dt className="text-gray-500 text-[10px] md:text-xs tracking-[0.35em] uppercase">
                {row.label}
              </dt>
              <dd
                className={
                  row.accent
                    ? "text-red-500 text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold"
                    : "text-gray-200 text-[10px] md:text-xs tracking-[0.25em] uppercase"
                }
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col items-center justify-center gap-2 border-t-2 border-dashed border-gray-600 px-6 py-3 md:border-t-0 md:py-0">
          <span className="text-red-500 text-[10px] md:text-xs tracking-[0.35em] uppercase">
            [ Channels ]
          </span>
          <ul className="flex items-center gap-2 md:gap-3">
            {SOCIALS.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group inline-flex h-9 w-9 items-center justify-center border-2 border-dashed border-gray-600 text-red-500 transition-colors hover:border-red-500 hover:text-red-400 focus-visible:border-red-500 focus:outline-none md:h-11 md:w-11"
                >
                  <Icon
                    className="h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:scale-110"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 border-t-2 md:border-t-4 border-dashed border-gray-600 px-6 py-2.5 md:justify-between md:px-12 md:py-4 lg:px-15">
        <p className="text-gray-500 text-[9px] md:text-xs tracking-[0.3em] uppercase">
          © 2026 Adrian M. De Guzman — All Rights Reserved
        </p>
        <p className="inline-flex items-center gap-2 text-gray-400 text-[9px] md:text-xs tracking-[0.3em] uppercase">
          <ArrowUp className="h-3.5 w-3.5 text-red-500" aria-hidden="true" />
          Scroll up to close
        </p>
      </div>
    </footer>
  );
}