"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const isSnappingRef = useRef(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on("scroll", ({ velocity }: { velocity: number }) => {
      if (isSnappingRef.current) return;

      const sections = document.querySelectorAll(
        ".snap-section",
      ) as NodeListOf<HTMLElement>;
      const windowHeight = window.innerHeight;
      const scrollTop = lenis.scroll;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        const scrollProgress = scrollTop - sectionTop;
        const threshold = windowHeight * 0.1;

        if (
          velocity > 0.5 &&
          scrollProgress > threshold &&
          i < sections.length - 1
        ) {
          isSnappingRef.current = true;
          lenis.scrollTo(sections[i + 1].offsetTop, {
            duration: 0.6,
            easing: (t) => 1 - Math.pow(1 - t, 3),
          });
          setTimeout(() => {
            isSnappingRef.current = false;
          }, 700);
          break;
        } else if (velocity < -0.5 && scrollProgress < -threshold && i > 0) {
          isSnappingRef.current = true;
          lenis.scrollTo(sections[i - 1].offsetTop, {
            duration: 0.6,
            easing: (t) => 1 - Math.pow(1 - t, 3),
          });
          setTimeout(() => {
            isSnappingRef.current = false;
          }, 700);
          break;
        }
      }
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
