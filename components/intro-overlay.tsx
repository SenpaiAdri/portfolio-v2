"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export const INTRO_HOLD_S = 1.4;
export const INTRO_FADE_S = 0.45;
export const INTRO_DURATION_S = INTRO_HOLD_S + INTRO_FADE_S;
export const INTRO_REDUCED_DURATION_S = 0.35;

const HOLD_SECONDS = INTRO_HOLD_S;

export default function IntroOverlay() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: () => setDone(true) });

      if (prefersReducedMotion) {
        tl.to(root, { opacity: 0, duration: 0.15, delay: 0.2 });
      } else {
        tl.to(root, {
          opacity: 0,
          duration: INTRO_FADE_S,
          ease: "none",
          delay: HOLD_SECONDS,
        });
      }
    }, root);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
    >
      <p className="px-6 text-center text-base uppercase tracking-[0.32em] text-gray-100 sm:text-2xl">
        ADRIAN M. DE GUZMAN
      </p>
    </div>
  );
}
