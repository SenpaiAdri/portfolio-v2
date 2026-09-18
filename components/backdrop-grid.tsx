import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type BackdropGridProps = {
  /** Accent hex — enables the themed CSS-variable grid with color transition */
  color?: string;
  className?: string;
};

const STATIC_GRID_STYLE: CSSProperties = {
  backgroundImage: `
                linear-gradient(to right, var(--brand-grid) 2px, transparent 1px),
                linear-gradient(to bottom, var(--brand-grid) 2px, transparent 1px)
              `,
  backgroundSize: "60px 60px",
};

/**
 * Dashed grid-lines backdrop used across sections, optionally paired with
 * the radial vignette mask. Purely decorative (aria-hidden).
 */
export function BackdropGrid({
  color,
  className,
}: BackdropGridProps) {
  const style: CSSProperties = color
    ? ({
        "--grid-color": `${color}26`,
        backgroundImage: `
              linear-gradient(to right, var(--grid-color) 2px, transparent 2px),
              linear-gradient(to bottom, var(--grid-color) 2px, transparent 2px)
            `,
        backgroundSize: "60px 60px",
        transition: "--grid-color 0.7s ease-in-out",
      } as CSSProperties)
    : STATIC_GRID_STYLE;

  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 z-0 pointer-events-none select-none",
          className
        )}
        style={style}
      />
    </>
  );
}
