"use client";

import { useCallback, useRef, type ReactNode, type Ref } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(DrawSVGPlugin);

const SHAPE_SELECTOR = "path, circle, line, polyline, polygon, rect, ellipse";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  /** Render as a `div` instead of a `span` (for wrapping block children). */
  as?: "span" | "div";
  /** Redraw the inner SVG strokes via DrawSVGPlugin on hover. */
  draw?: boolean;
  /** Animated brand underline for text links. */
  underline?: boolean;
};

/**
 * Button — SVG draw hover micro-interaction for clickable icons/buttons.
 *
 * On hover, re-traces the inner Lucide `<svg>` strokes via GSAP DrawSVG.
 * Text links can additionally get an animated brand underline.
 *
 * Rendered as a `<span>` (or `div` via `as`) so it can wrap any `<a>` /
 * `<button>` without changing the host element. Respects
 * prefers-reduced-motion (existing CSS transitions remain as fallback).
 */
export function Button({
  children,
  className,
  as: Tag = "span",
  draw = true,
  underline = false,
}: ButtonProps) {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const handleEnter = useCallback(() => {
    const root = rootRef.current;
    if (!root || reduced || !draw) return;
    root.classList.add("is-button-hover");
    const svg = root.querySelector("svg");
    if (!svg) return;
    const shapes = svg.querySelectorAll(SHAPE_SELECTOR);
    if (shapes.length > 0) {
      gsap.fromTo(
        shapes,
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    }
  }, [reduced, draw]);

  const handleLeave = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.remove("is-button-hover");
    if (reduced) return;
    // A killed mid-draw tween would freeze strokes half-drawn —
    // always settle them back to fully drawn.
    const shapes = root.querySelectorAll(SHAPE_SELECTOR);
    if (shapes.length > 0) {
      gsap.killTweensOf(shapes);
      gsap.set(shapes, { drawSVG: "100%" });
    }
  }, [reduced]);

  return (
    <Tag
      ref={rootRef as Ref<HTMLSpanElement & HTMLDivElement>}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={cn(
        "button-hover relative inline-flex items-center justify-center",
        underline && "button-underline",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
