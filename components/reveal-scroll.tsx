"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useSectionInputs } from "@/hooks/use-section-inputs";

const SECTION_TRANSITION_MS = 1000;
const SECTION_EASE = "power4.inOut";
// Must match the footer strip's own height (see footer-strip.tsx)
const FOOTER_HEIGHT = "50vh";

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
  footer,
}: {
  children: React.ReactNode;
  navItems?: RevealScrollNavItem[];
  footer?: React.ReactNode;
}) {
  const sections = React.Children.toArray(children);
  const sectionCount = sections.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [footerOpen, setFooterOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const setSectionRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      sectionRefs.current[i] = el;
    },
    []
  );
  const stackRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLElement>(null);
  const currentIndexRef = useRef(0);
  const footerOpenRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const handlersRef = useRef<Record<number, SectionScrollHandler>>({});
  const [sectionProgressMap, setSectionProgressMap] = useState<
    Record<number, { step: number; totalSteps: number }>
  >({});

  // Rest positions: sections are stacked above/below the viewport.
  // GSAP owns all transforms (React only renders z-index).
  const snapRest = useCallback(() => {
    const ci = currentIndexRef.current;
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const rel = i < ci ? -1 : i > ci ? 1 : 0;
      gsap.set(el, { y: `${rel * 100}%`, overwrite: "auto" });
      const media = el.querySelector<HTMLElement>("[data-parallax]");
      if (media) {
        gsap.set(media, {
          y: `${rel === 1 ? 50 : 0}%`,
          opacity: rel === 1 ? 0.2 : 1,
          overwrite: "auto",
        });
      }
    });
    // Section nav bar rests off-screen on the hero, pinned everywhere else
    if (navBarRef.current) {
      gsap.set(navBarRef.current, {
        y: ci === 0 ? "-100%" : "0%",
        overwrite: "auto",
      });
    }
  }, []);

  // Initial layout + GSAP cleanup (kill tweens, restore transforms)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      snapRest();
    }, "#reveal-scroll-container");
    return () => {
      ctx.revert();
    };
  }, [snapRest]);

  const goToSection = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex >= sectionCount) return;
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      if (footerOpenRef.current) {
        footerOpenRef.current = false;
        setFooterOpen(false);
        gsap.set(stackRef.current, { y: "0%" });
      }

      const from = currentIndexRef.current;
      if (nextIndex === from) {
        isAnimatingRef.current = false;
        return;
      }
      const dir: "down" | "up" = nextIndex > from ? "down" : "up";
      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);

      const leaving = sectionRefs.current[from];
      const entering = sectionRefs.current[nextIndex];
      if (!leaving || !entering) {
        snapRest();
        isAnimatingRef.current = false;
        return;
      }

      if (prefersReducedMotion) {
        snapRest();
        isAnimatingRef.current = false;
        return;
      }

      const mediaShift = dir === "down" ? 50 : -50;
      const outY = dir === "down" ? "-100%" : "100%";
      const inY = dir === "down" ? "100%" : "-100%";

      const leavingMedia =
        leaving.querySelector<HTMLElement>("[data-parallax]");
      const enteringMedia =
        entering.querySelector<HTMLElement>("[data-parallax]");

      const tl = gsap.timeline({
        defaults: { duration: SECTION_TRANSITION_MS / 1000, ease: SECTION_EASE },
        onComplete: () => {
          snapRest();
          isAnimatingRef.current = false;
        },
      });

      tl.fromTo(leaving, { y: "0%" }, { y: outY }, 0);
      tl.fromTo(entering, { y: inY }, { y: "0%" }, 0);
      if (leavingMedia) {
        tl.fromTo(
          leavingMedia,
          { y: "0%", opacity: 1 },
          { y: `${mediaShift}%`, opacity: 0.2 },
          0
        );
      }
      if (enteringMedia) {
        tl.fromTo(
          enteringMedia,
          { y: `${mediaShift}%`, opacity: 0.2 },
          { y: "0%", opacity: 1 },
          0
        );
      }
      // Slide the section nav bar in/out only when entering/leaving the hero,
      // so it stays pinned during transitions between the other sections
      if (navBarRef.current && (from === 0) !== (nextIndex === 0)) {
        const showBar = nextIndex !== 0;
        tl.fromTo(
          navBarRef.current,
          { y: showBar ? "-100%" : "0%" },
          { y: showBar ? "0%" : "-100%" },
          0
        );
      }
    },
    [sectionCount, prefersReducedMotion, snapRest]
  );

  const goNextSection = useCallback(() => {
    goToSection(currentIndexRef.current + 1);
  }, [goToSection]);

  const goPrevSection = useCallback(() => {
    goToSection(currentIndexRef.current - 1);
  }, [goToSection]);

  const openFooter = useCallback(() => {
    if (footerOpenRef.current || isAnimatingRef.current) return;
    if (!stackRef.current) return;
    footerOpenRef.current = true;
    setFooterOpen(true);
    isAnimatingRef.current = true;

    if (prefersReducedMotion) {
      gsap.set(stackRef.current, { y: `-${FOOTER_HEIGHT}` });
      isAnimatingRef.current = false;
      return;
    }
    gsap.fromTo(
      stackRef.current,
      { y: "0%" },
      {
        y: `-${FOOTER_HEIGHT}`,
        duration: SECTION_TRANSITION_MS / 1000,
        ease: SECTION_EASE,
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      }
    );
  }, [prefersReducedMotion]);

  const closeFooter = useCallback(() => {
    if (!footerOpenRef.current || isAnimatingRef.current) return;
    if (!stackRef.current) return;
    footerOpenRef.current = false;
    setFooterOpen(false);
    isAnimatingRef.current = true;

    if (prefersReducedMotion) {
      gsap.set(stackRef.current, { y: "0%" });
      isAnimatingRef.current = false;
      return;
    }
    gsap.to(stackRef.current, {
      y: "0%",
      duration: SECTION_TRANSITION_MS / 1000,
      ease: SECTION_EASE,
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
  }, [prefersReducedMotion]);

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
      const handler = handlersRef.current[currentIndexRef.current];
      if (handler) {
        const consumed = handler(intentDirection);
        if (consumed) return;
      }

      if (intentDirection === "next") {
        if (currentIndexRef.current === sectionCount - 1) {
          openFooter();
        } else {
          goNextSection();
        }
      } else if (footerOpenRef.current) {
        closeFooter();
      } else {
        goPrevSection();
      }
    },
    [sectionCount, goNextSection, goPrevSection, openFooter, closeFooter]
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
    };
  }, []);

  // Wheel, ArrowUp/ArrowDown and touch swipes all route into handleIntent
  useSectionInputs(handleIntent);

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

  return (
    <ScrollContext.Provider value={contextValue}>
      <div
        id="reveal-scroll-container"
        className="bg-[#0a0a0a] fixed inset-0 overflow-hidden touch-none"
        style={{ touchAction: "none" }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-100"
          aria-hidden="true"
        >
          <div className="h-1 w-full">
            <div
              className="h-full bg-red-500 transition-[width] duration-1000 ease-in-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Section navigation bar — slides in with the hero transition, pinned afterwards */}
        <nav
          ref={navBarRef}
          className="absolute inset-x-0 top-0 z-50"
          inert={!showTopNav}
        >
          <div className="h-15 bg-[#0a0a0a] border-b-2 md:border-b-4 border-dashed border-gray-600 flex items-center justify-center gap-2 sm:gap-4 md:gap-8 pr-4 sm:pr-5 md:pr-10">
            {navItems
              .filter((item) => item.index > 0)
              .map((item) => {
                const isActive = currentIndex === item.index;

                return (
                  <RevealScrollTo
                    key={item.label}
                    to={item.index}
                    as="button"
                    className={cn(
                      "whitespace-nowrap text-[0.625rem] tracking-wide sm:text-sm md:text-lg md:tracking-widest transition-colors cursor-pointer",
                      isActive
                        ? "text-red-500"
                        : "text-gray-500 hover:text-red-500",
                    )}
                  >
                    [ {item.label.toUpperCase()} ]
                  </RevealScrollTo>
                );
              })}
          </div>
        </nav>

        {/* Section stack — translated to reveal the footer strip */}
        <div ref={stackRef} className="absolute inset-0 z-10">
          {sections.map((section, i) => (
            <div
              key={i}
              ref={setSectionRef(i)}
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: sectionCount - i }}
            >
              {section}
            </div>
          ))}
        </div>

        {/* Footer strip — revealed when the stack slides up past the last section */}
        {footer && (
          <div
            className="absolute inset-x-0 bottom-0 z-0 h-[50vh]"
            inert={!footerOpen}
          >
            {footer}
          </div>
        )}
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