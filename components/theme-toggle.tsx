"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  size?: number;
  className?: string;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
    updateCallbackDone: Promise<void>;
  };
};

/**
 * Theme toggle — Sun in dark mode (click → light), Moon in light mode
 * (click → dark). Styled to match SocialIconLink so it can swap into
 * the Hero socials grid without shifting layout.
 */
export function ThemeToggle({ size = 35, className }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  // False on server + during hydration, true after mount. next-themes only
  // resolves the stored theme on the client, so theme-dependent output must
  // wait — otherwise the server's default ("dark") mismatches the client's
  // stored value and React throws a hydration error.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // Deterministic placeholder (same footprint) until hydrated.
  const current = theme ?? resolvedTheme ?? "dark";
  const isDark = current === "dark";

  const handleToggle = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      const next = isDark ? "light" : "dark";
      const doc = document as ViewTransitionDocument;

      // Fall back to an instant swap without the API or for reduced motion.
      if (
        !doc.startViewTransition ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setTheme(next);
        return;
      }

      // Keyboard activation reports 0,0 — fall back to the button center.
      const rect = e.currentTarget.getBoundingClientRect();
      const x =
        e.clientX || e.clientY ? e.clientX : rect.left + rect.width / 2;
      const y =
        e.clientX || e.clientY ? e.clientY : rect.top + rect.height / 2;

      const transition = doc.startViewTransition(() => {
        flushSync(() => setTheme(next));
      });

      try {
        await transition.ready;
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y),
        );
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 700,
            easing: "ease-out",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      } catch {
        // Transition aborted — theme is already applied, nothing to do.
      }
    },
    [isDark, setTheme],
  );

  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        style={{ width: size, height: size }}
        className={cn("inline-block", className)}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "text-brand hover:text-brand-hover hover:scale-110 transition-[transform,color] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm",
        className,
      )}
    >
      {isDark ? (
        <Moon size={size} aria-hidden="true" />
      ) : (
        <Sun size={size} aria-hidden="true" />
      )}
    </button>
  );
}
