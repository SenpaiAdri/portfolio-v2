"use client";

import { useEffect, useRef } from "react";

type IntentDirection = "next" | "prev";

const WHEEL_THROTTLE_MS = 800;

/**
 * Global input wiring for the RevealScroll engine: wheel, ArrowUp/ArrowDown
 * and touch swipes all funnel into a single intent callback.
 * (Native page scroll is locked; this is the only way sections move.)
 */
export function useSectionInputs(
  handleIntent: (direction: IntentDirection) => void
) {
  const lastWheelRef = useRef(0);
  const touchStartY = useRef(0);

  // Wheel (throttled)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelRef.current < WHEEL_THROTTLE_MS) return;
      if (e.deltaY > 20) {
        lastWheelRef.current = now;
        handleIntent("next");
      } else if (e.deltaY < -20) {
        lastWheelRef.current = now;
        handleIntent("prev");
      }
    };

    const container = document.getElementById("reveal-scroll-container");
    if (!container) return;
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => container.removeEventListener("wheel", handleWheel);
  }, [handleIntent]);

  // Keyboard: ArrowDown / ArrowUp (skip when focus is in a form field)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target?.isContentEditable
      ) {
        return;
      }
      e.preventDefault();
      handleIntent(e.key === "ArrowDown" ? "next" : "prev");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleIntent]);

  // Touch: swipe up = next, swipe down = prev
  useEffect(() => {
    const container = document.getElementById("reveal-scroll-container");
    if (!container) return;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      const threshold = 50;
      if (delta > threshold) handleIntent("next");
      else if (delta < -threshold) handleIntent("prev");
    };
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleIntent]);
}
