"use client";

import { ArrowUp } from "lucide-react";
import { useRef } from "react";
import { SOCIALS } from "@/components/site-primitives";
import { Button } from "@/components/button";
import { useMarqueeLoop } from "@/components/marquee-strip";
import { BackdropGrid } from "@/components/backdrop-grid";

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

  // Infinite name marquee: two identical copies tiling seamlessly
  useMarqueeLoop(firstTextRef, secondTextRef);

  return (
    <footer className="relative flex h-full w-screen flex-col overflow-hidden bg-surface">
      <h2 className="sr-only">Footer — index sheet</h2>

      {/* Top strip — name marquee */}
      <div className="relative z-10 flex items-center overflow-hidden border-b-2 md:border-b-4 border-dashed border-line py-2.5 md:py-4">
        <div className="relative whitespace-nowrap text-[10px] md:text-xs tracking-[0.35em] uppercase text-brand select-none will-change-transform w-full">
          <span ref={firstTextRef} className="inline-block">
            {"ADRIAN ADRIAN\u00A0".repeat(10)}
          </span>
          <span
            ref={secondTextRef}
            className="absolute top-0 left-0 inline-block"
          >
            {"ADRIAN ADRIAN\u00A0".repeat(10)}
          </span>
        </div>
      </div>

      {/* Middle: info rows | channels */}
      <div className="relative z-10 grid flex-1 min-h-0 grid-cols-1 md:grid-cols-[13fr_8fr]">
        <BackdropGrid />

        <dl className="flex flex-col justify-center px-6 py-2 md:px-12 md:py-6 md:border-r-4 md:border-dashed md:border-r-brand lg:px-15">
          {TITLE_BLOCK_ROWS.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-4 border-b-2 border-dashed border-line py-1.5 last:border-b-0 md:py-2.5"
            >
              <dt className="text-ink-muted text-[10px] md:text-xs tracking-[0.35em] uppercase">
                {row.label}
              </dt>
              <dd
                className={
                  row.accent
                    ? "text-brand text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold"
                    : "text-ink-bright text-[10px] md:text-xs tracking-[0.25em] uppercase"
                }
              >
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col items-center justify-center gap-2 border-t-2 border-dashed border-line px-6 py-3 md:border-t-0 md:py-0">
          <span className="text-brand text-[10px] md:text-xs tracking-[0.35em] uppercase">
            [ Channels ]
          </span>
          <ul className="flex items-center gap-2 md:gap-3">
            {SOCIALS.map(({ href, label, Icon }) => (
              <li key={label}>
                <Button>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group inline-flex h-9 w-9 items-center justify-center border-2 border-dashed border-line text-brand transition-colors hover:border-brand hover:text-brand-hover focus-visible:border-brand focus:outline-none md:h-11 md:w-11"
                  >
                    <Icon
                      className="h-4 w-4 md:h-5 md:w-5"
                      aria-hidden="true"
                    />
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 border-t-2 md:border-t-4 border-dashed border-line px-6 py-2.5 md:justify-between md:px-12 md:py-4 lg:px-15">
        <p className="text-ink-muted text-[9px] md:text-xs tracking-[0.3em] uppercase">
          © 2026 Adrian M. De Guzman — All Rights Reserved
        </p>
        <p className="inline-flex items-center gap-2 text-ink-body text-[9px] md:text-xs tracking-[0.3em] uppercase">
          <ArrowUp className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
          Scroll up to close
        </p>
      </div>
    </footer>
  );
}
