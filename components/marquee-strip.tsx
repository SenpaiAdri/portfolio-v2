"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Seamless infinite horizontal loop: two identical copies tiled via
 * rAF + gsap transforms. Attach one ref to each of the two copies.
 */
export function useMarqueeLoop(
  firstRef: RefObject<HTMLSpanElement | null>,
  secondRef: RefObject<HTMLSpanElement | null>,
  speed = 0.1
) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const first = firstRef.current;
    const second = secondRef.current;
    if (!first || !second || prefersReducedMotion) return;

    // Position the second copy just past the first so the loop is seamless
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
      xPercent += speed;
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [firstRef, secondRef, prefersReducedMotion, speed]);
}

/**
 * Outlined big-text marquee strip (hero bottom band).
 * For custom presentations, use `useMarqueeLoop` directly.
 */
export function MarqueeStrip({
  text = "ADRIAN ",
  repeat = 4,
  className,
}: {
  text?: string;
  repeat?: number;
  className?: string;
}) {
  const firstTextRef = useRef<HTMLSpanElement>(null);
  const secondTextRef = useRef<HTMLSpanElement>(null);
  useMarqueeLoop(firstTextRef, secondTextRef);

  const content = text.repeat(repeat);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex flex-col border-b-gray-600 border-b-4 border-dashed overflow-hidden relative",
        className
      )}
    >
      <div
        className="absolute whitespace-nowrap text-[3rem] md:text-[6rem] text-[#18181c] select-none will-change-transform"
        style={{
          WebkitTextStroke: "2px #333",
          color: "transparent",
          left: 0,
          minWidth: "100%",
        }}
      >
        <span ref={firstTextRef} className="inline-block">
          {content}
        </span>
        <span ref={secondTextRef} className="absolute top-0 left-0 inline-block">
          {content}
        </span>
      </div>
    </div>
  );
}
