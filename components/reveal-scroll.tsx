"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

const SECTION_TRANSITION_MS = 700;
const WHEEL_THROTTLE_MS = 800;

export default function RevealScroll({ children }: { children: React.ReactNode }) {
  const sections = React.Children.toArray(children);
  const sectionCount = sections.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  const [enteringIndex, setEnteringIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"down" | "up">("down");
  const [phase, setPhase] = useState<"idle" | "enter">("idle");
  const isAnimatingRef = useRef(false);
  const lastWheelRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToSection = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex >= sectionCount) return;
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      
      const dir = nextIndex > currentIndex ? "down" : "up";
      setDirection(dir);
      setLeavingIndex(currentIndex);
      setEnteringIndex(nextIndex);
      setCurrentIndex(nextIndex);
      setPhase("idle");
      
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setLeavingIndex(null);
        setEnteringIndex(null);
        isAnimatingRef.current = false;
      }, SECTION_TRANSITION_MS);
    },
    [sectionCount, currentIndex]
  );

  useEffect(() => {
    if (enteringIndex !== null && direction === "up") {
      const timer = setTimeout(() => {
        setPhase("enter");
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [enteringIndex, direction]);

  const goNext = useCallback(() => {
    goToSection(currentIndex + 1);
  }, [currentIndex, goToSection]);

  const goPrev = useCallback(() => {
    goToSection(currentIndex - 1);
  }, [currentIndex, goToSection]);

  // Lock body scroll so only section reveal is used
  useEffect(() => {
    const prevOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      document.body.style.overflow = prevBodyOverflow;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelRef.current < WHEEL_THROTTLE_MS) return;
      if (e.deltaY > 20) {
        lastWheelRef.current = now;
        goNext();
      } else if (e.deltaY < -20) {
        lastWheelRef.current = now;
        goPrev();
      }
    };

    const container = document.getElementById("reveal-scroll-container");
    if (!container) return;
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => container.removeEventListener("wheel", handleWheel);
  }, [goNext, goPrev]);

  // Keyboard: ArrowDown / ArrowUp
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  // Touch: swipe up = next, swipe down = prev
  const touchStartY = useRef(0);
  useEffect(() => {
    const container = document.getElementById("reveal-scroll-container");
    if (!container) return;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimatingRef.current) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      const threshold = 50;
      if (delta > threshold) goNext();
      else if (delta < -threshold) goPrev();
    };
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev]);

  // Allow sections to request navigation (e.g. nav links)
  useEffect(() => {
    const handler = (e: CustomEvent<{ index: number }>) => {
      goToSection(e.detail.index);
    };
    window.addEventListener(
      "reveal-scroll-to" as keyof WindowEventMap,
      handler as EventListener
    );
    return () =>
      window.removeEventListener(
        "reveal-scroll-to" as keyof WindowEventMap,
        handler as EventListener
      );
  }, [goToSection]);

  return (
    <div
      id="reveal-scroll-container"
      className="bg-[#0a0a0a] fixed inset-0 overflow-hidden touch-none"
      style={{ touchAction: "none" }}
    >
      {sections.map((section, i) => {
        let translateY = "0%";

        if (i === enteringIndex && direction === "up") {
          translateY = phase === "enter" ? "0%" : "-100%";
        } else if (i === leavingIndex && direction === "down") {
          translateY = "-100%";
        } else if (i < currentIndex) {
          translateY = "-100%";
        }

        const isAnimating = 
          (i === leavingIndex && direction === "down") || 
          (i === enteringIndex && direction === "up" && phase === "enter");

        return (
          <div
            key={i}
            className={`absolute inset-0 w-full h-full ${isAnimating ? 'transition-transform ease-[cubic-bezier(0.33,1,0.68,1)]' : ''}`}
            style={{
              transform: `translateY(${translateY})`,
              transitionDuration: isAnimating ? `${SECTION_TRANSITION_MS}ms` : '0ms',
              zIndex: sectionCount - i,
            }}
          >
            {section}
          </div>
        );
      })}
    </div>
  );
}

/** Use inside RevealScroll to navigate to a section by index (e.g. nav links). */
export function RevealScrollTo({
  to,
  className,
  children,
  as: Tag = "span",
}: {
  to: number;
  className?: string;
  children: React.ReactNode;
  as?: "span" | "a" | "button";
}) {
  const go = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent("reveal-scroll-to", { detail: { index: to } })
    );
  }, [to]);
  return (
    <Tag
      role="link"
      tabIndex={0}
      className={className}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        go();
      }}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          go();
        }
      }}
      {...(Tag === "a" ? { href: "#" } : {})}
    >
      {children}
    </Tag>
  );
}
