"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

const SECTION_TRANSITION_MS = 700;
const WHEEL_THROTTLE_MS = 800;

export type ScrollDirection = "next" | "prev";
export type SectionScrollHandler = (direction: ScrollDirection) => boolean;

type ScrollContextValue = {
  registerHandler: (index: number, handler: SectionScrollHandler) => void;
  unregisterHandler: (index: number) => void;
  currentIndex: number;
};

const ScrollContext = React.createContext<ScrollContextValue | null>(null);

export function useSectionScroll(index: number, handler: SectionScrollHandler) {
  const ctx = React.useContext(ScrollContext);

  useEffect(() => {
    if (!ctx) return;
    ctx.registerHandler(index, handler);
    return () => ctx.unregisterHandler(index);
  }, [ctx, index, handler]);
}

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
  const handlersRef = useRef<Record<number, SectionScrollHandler>>({});

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

  const goNextSection = useCallback(() => {
    goToSection(currentIndex + 1);
  }, [currentIndex, goToSection]);

  const goPrevSection = useCallback(() => {
    goToSection(currentIndex - 1);
  }, [currentIndex, goToSection]);

  const registerHandler = useCallback((index: number, handler: SectionScrollHandler) => {
    handlersRef.current[index] = handler;
  }, []);

  const unregisterHandler = useCallback((index: number) => {
    delete handlersRef.current[index];
  }, []);

  const handleIntent = useCallback(
    (intentDirection: ScrollDirection) => {
      const handler = handlersRef.current[currentIndex];
      if (handler) {
        const consumed = handler(intentDirection);
        if (consumed) return;
      }
      if (intentDirection === "next") {
        goNextSection();
      } else {
        goPrevSection();
      }
    },
    [currentIndex, goNextSection, goPrevSection]
  );

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

  // Keyboard: ArrowDown / ArrowUp
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        handleIntent("next");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        handleIntent("prev");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleIntent]);

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

  const contextValue = useMemo(
    () => ({
      registerHandler,
      unregisterHandler,
      currentIndex,
    }),
    [registerHandler, unregisterHandler, currentIndex]
  );

  return (
    <ScrollContext.Provider value={contextValue}>
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
              className={`absolute inset-0 w-full h-full ${isAnimating
                  ? "transition-transform ease-[cubic-bezier(0.33,1,0.68,1)]"
                  : ""
                }`}
              style={{
                transform: `translateY(${translateY})`,
                transitionDuration: isAnimating
                  ? `${SECTION_TRANSITION_MS}ms`
                  : "0ms",
                zIndex: sectionCount - i,
              }}
            >
              {section}
            </div>
          );
        })}
      </div>
    </ScrollContext.Provider>
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

