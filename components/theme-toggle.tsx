"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  size?: number;
  className?: string;
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
  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        style={{ width: size, height: size }}
        className={cn("inline-block", className)}
      />
    );
  }

  const current = theme ?? resolvedTheme ?? "dark";
  const isDark = current === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
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
