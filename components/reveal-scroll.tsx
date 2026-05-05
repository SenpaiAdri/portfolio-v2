"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const SECTION_TRANSITION_MS = 1000;
const WHEEL_THROTTLE_MS = 800;

export type ScrollDirection = "next" | "prev";
export type SectionScrollHandler = (direction: ScrollDirection) => boolean;

type ScrollContextValue = {
  registerHandler: (index: number, handler: SectionScrollHandler) => void;
  unregisterHandler: (index: number) => void;
  setSectionProgress: (index: number, step: number, totalSteps: number) => void;
  clearSectionProgress: (index: number) => void;
  currentIndex: number;
};

type RevealScrollNavItem = {
  label: string;
  index: number;
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

export function useSectionProgress(
  index: number,
  step: number,
  totalSteps: number
) {
  const ctx = React.useContext(ScrollContext);

  useEffect(() => {
    if (!ctx) return;
    ctx.setSectionProgress(index, step, totalSteps);
    return () => ctx.clearSectionProgress(index);
  }, [ctx, index, step, totalSteps]);
}

export default function RevealScroll({
  children,
  navItems = [],
}: {
  children: React.ReactNode;
  navItems?: RevealScrollNavItem[];
}) {
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
  const [sectionProgressMap, setSectionProgressMap] = useState<
    Record<number, { step: number; totalSteps: number }>
  >({});

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

  const setSectionProgress = useCallback(
    (index: number, step: number, totalSteps: number) => {
      const safeTotal = Math.max(1, totalSteps);
      const safeStep = Math.min(Math.max(0, step), safeTotal - 1);

      setSectionProgressMap((prev) => {
        const existing = prev[index];
        if (
          existing?.step === safeStep &&
          existing?.totalSteps === safeTotal
        ) {
          return prev;
        }
        return { ...prev, [index]: { step: safeStep, totalSteps: safeTotal } };
      });
    },
    []
  );

  const clearSectionProgress = useCallback((index: number) => {
    setSectionProgressMap((prev) => {
      if (!(index in prev)) return prev;
      const next = { ...prev };
      delete next[index];
      return next;
    });
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
      setSectionProgress,
      clearSectionProgress,
      currentIndex,
    }),
    [
      registerHandler,
      unregisterHandler,
      setSectionProgress,
      clearSectionProgress,
      currentIndex,
    ]
  );

  const sectionSteps = useMemo(
    () =>
      Array.from({ length: sectionCount }, (_, index) => {
        const sectionProgress = sectionProgressMap[index];
        return sectionProgress ? sectionProgress.totalSteps : 1;
      }),
    [sectionCount, sectionProgressMap]
  );

  const totalPositions = sectionSteps.reduce((sum, value) => sum + value, 0);
  const positionBeforeCurrent = sectionSteps
    .slice(0, currentIndex)
    .reduce((sum, value) => sum + value, 0);
  const currentSectionStep = Math.min(
    Math.max(sectionProgressMap[currentIndex]?.step ?? 0, 0),
    sectionSteps[currentIndex] - 1
  );
  const currentVirtualPosition = positionBeforeCurrent + currentSectionStep;
  const progressPercent =
    totalPositions > 1 ? (currentVirtualPosition / (totalPositions - 1)) * 100 : 0;
  const showTopNav = currentIndex > 0 && navItems.length > 0;
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [currentIndex]);

  return (
    <ScrollContext.Provider value={contextValue}>
      <div
        id="reveal-scroll-container"
        className="bg-[#0a0a0a] fixed inset-0 overflow-hidden touch-none"
        style={{ touchAction: "none" }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-50"
          aria-hidden="true"
        >
          <div className="h-1 w-full">
            <div
              className="h-full bg-red-500 transition-[width] duration-1000 ease-in-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Hamburger menu */}
        <div
          className={cn(
            "absolute right-4 top-4 z-50 transition-all duration-500 md:right-10 md:top-10",
            showTopNav ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <button
            type="button"
            aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileNavOpen}
            aria-controls="reveal-scroll-nav-menu"
            onClick={() => setMobileNavOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center border-b-2 border-r-2 border-dashed border-b-gray-600 border-r-gray-600 text-gray-300 backdrop-blur-md transition-colors hover:border-red-500 hover:text-red-500 rounded-lg"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Menu panel */}
        <div
          id="reveal-scroll-nav-menu"
          className={cn(
            "absolute inset-x-4 top-16 z-50 transition-all duration-300 md:inset-x-auto md:right-10 md:top-24 md:w-48",
            showTopNav && mobileNavOpen
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "-translate-y-2 opacity-0 pointer-events-none"
          )}
        >
          <div className="border-b-2 border-r-2 border-dashed border-b-gray-600 rounded-lg border-r-gray-600 backdrop-blur-md">
            <div className="flex flex-col py-2">
              {navItems.map((item) => {
                const isActive = currentIndex === item.index;

                return (
                  <RevealScrollTo
                    key={item.label}
                    to={item.index}
                    as="button"
                    onNavigate={() => setMobileNavOpen(false)}
                    className={cn(
                      "w-full px-4 py-3 text-right text-xs tracking-[0.32em] uppercase transition-colors md:text-right",
                      isActive ? "text-red-500" : "text-gray-400 hover:text-red-500"
                    )}
                  >
                    [{item.label}]
                  </RevealScrollTo>
                );
              })}
            </div>
          </div>
        </div>

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
                ? "transition-transform ease-in-out"
                // [cubic - bezier(0.33, 1, 0.68, 1)]
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
  onNavigate,
  as: Tag = "span",
}: {
  to: number;
  className?: string;
  children: React.ReactNode;
  onNavigate?: () => void;
  as?: "span" | "a" | "button";
}) {
  const go = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent("reveal-scroll-to", { detail: { index: to } })
    );
  }, [to]);
  return (
    <Tag
      {...(Tag === "button" ? { type: "button" as const } : {})}
      {...(Tag !== "button" ? { role: "link" } : {})}
      tabIndex={0}
      className={className}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        go();
        onNavigate?.();
      }}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          go();
          onNavigate?.();
        }
      }}
      {...(Tag === "a" ? { href: "#" } : {})}
    >
      {children}
    </Tag>
  );
}

