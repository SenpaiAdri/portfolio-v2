import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

type ResponsiveSize = number | { base?: number; sm?: number; md?: number; lg?: number; xl?: number };

type LogoAnimatedProps = {
  width?: ResponsiveSize;
  height?: ResponsiveSize;
  className?: string;
};

function getSizeValue(size: ResponsiveSize | undefined, defaultValue: number): number {
  if (size === undefined) return defaultValue;
  if (typeof size === "number") return size;
  return size.base ?? size.sm ?? size.md ?? size.lg ?? size.xl ?? defaultValue;
}

function useResponsiveSize(size: ResponsiveSize | undefined, defaultValue: number): number {
  const [responsiveWidth, setResponsiveWidth] = useState(() => getSizeValue(size, defaultValue));

  useEffect(() => {
    const updateSize = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1024;
      if (typeof size === "number") {
        setResponsiveWidth(size);
      } else if (size) {
        if (w >= 1280 && size.xl) setResponsiveWidth(size.xl);
        else if (w >= 1024 && size.lg) setResponsiveWidth(size.lg);
        else if (w >= 768 && size.md) setResponsiveWidth(size.md);
        else if (w >= 640 && size.sm) setResponsiveWidth(size.sm);
        else setResponsiveWidth(size.base ?? defaultValue);
      } else {
        setResponsiveWidth(defaultValue);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [size, defaultValue]);

  return responsiveWidth;
}

export function LogoAnimated({ width, height, className }: LogoAnimatedProps) {
  const defaultWidth = 350;
  const defaultHeight = 128;
  const currentWidth = useResponsiveSize(width, defaultWidth);
  const currentHeight = useResponsiveSize(height, defaultHeight);
  const containerRef = useRef<HTMLDivElement>(null);
  const [logoSvg, setLogoSvg] = useState<string>("");
  const strokeColor = "#FF0000";
  const strokeWidth = 3;
  const svgUrl = useMemo(() => "/logo.svg", []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(svgUrl, { cache: "no-cache" });
        if (!res.ok) return;
        const text = await res.text();
        if (!cancelled) setLogoSvg(text);
      } catch {
        // ignore (logo just won't render/animate)
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [svgUrl]);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!logoSvg) return;

    const root = containerRef.current;
    const svg = root.querySelector("svg");
    if (!svg) return;

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path"));
    if (paths.length === 0) return;

    const strokePaths: SVGPathElement[] = [];
    const fillPaths: SVGPathElement[] = [];

    for (const p of paths) {
      const origFill = p.getAttribute("fill") ?? "";
      const origStroke = p.getAttribute("stroke") ?? "";
      const origStrokeWidth = p.getAttribute("stroke-width") ?? "";
      const origOpacity = p.getAttribute("opacity") ?? "";
      const origFillOpacity = p.getAttribute("fill-opacity") ?? "";

      p.dataset.origFill = origFill;
      p.dataset.origStroke = origStroke;
      p.dataset.origStrokeWidth = origStrokeWidth;
      p.dataset.origOpacity = origOpacity;
      p.dataset.origFillOpacity = origFillOpacity;

      // Treat "filled" paths as fills to reveal later (including white highlights)
      if (origFill && origFill.toLowerCase() !== "none") {
        fillPaths.push(p);
      }

      // Force stroke appearance for drawing
      p.setAttribute("fill", "none");
      p.setAttribute("stroke", strokeColor);
      p.setAttribute("stroke-width", String(strokeWidth));
      p.setAttribute("stroke-linejoin", "round");
      p.setAttribute("stroke-linecap", "round");

      // If the SVG had fill-opacity, keep it but we'll animate overall opacity on reveal
      p.style.opacity = "1";
      strokePaths.push(p);
    }

    const tl = gsap.timeline();

    tl.from(strokePaths, {
      delay: 0.2,
      duration: 2,
      stagger: 0.06,
      drawSVG: 0,
      ease: "power1.inOut",
    });

    tl.add(() => {
      // Switch from pure stroke-drawing to filled logo while KEEPING the stroke visible.
      for (const p of paths) {
        const of = p.dataset.origFill ?? "";
        const os = p.dataset.origStroke ?? "";
        const osw = p.dataset.origStrokeWidth ?? "";
        const oo = p.dataset.origOpacity ?? "";
        const ofo = p.dataset.origFillOpacity ?? "";

        // Restore fills so they can fade in.
        if (of) p.setAttribute("fill", of);
        else p.removeAttribute("fill");

        // Keep the drawing stroke on all stroked paths until after the fill fade finishes.
        // We'll restore the original stroke attributes in a later timeline callback.
        if (!strokePaths.includes(p)) {
          if (os) p.setAttribute("stroke", os);
          else p.removeAttribute("stroke");

          if (osw) p.setAttribute("stroke-width", osw);
          else p.removeAttribute("stroke-width");
        }

        // Clear opacity attribute to avoid attr * style mixing during the fade.
        p.removeAttribute("opacity");

        // Start fills from 0 so we can fade them in without affecting the stroke.
        const baseFillOpacity = ofo || "1";
        p.setAttribute("fill-opacity", baseFillOpacity);
        if (fillPaths.includes(p)) {
          p.style.fillOpacity = "0";
        } else {
          p.style.fillOpacity = baseFillOpacity;
        }
      }
    });

    // Slowly fade the fills in AFTER the stroke drawing finishes.
    // Stroke remains visible the entire time.
    tl.to(fillPaths, {
      fillOpacity: 1,
      duration: 1.6,
      ease: "power2.out",
    });

    tl.add(() => {
      // Final cleanup: restore original stroke attributes and opacity.
      for (const p of paths) {
        const os = p.dataset.origStroke ?? "";
        const osw = p.dataset.origStrokeWidth ?? "";
        const oo = p.dataset.origOpacity ?? "";
        const ofo = p.dataset.origFillOpacity ?? "";

        if (os) p.setAttribute("stroke", os);
        else p.removeAttribute("stroke");

        if (osw) p.setAttribute("stroke-width", osw);
        else p.removeAttribute("stroke-width");

        if (oo) p.setAttribute("opacity", oo);
        else p.removeAttribute("opacity");

        if (ofo) {
          p.setAttribute("fill-opacity", ofo);
          p.style.fillOpacity = "";
        }
      }
    });

    return () => {
      tl.kill();
    };
  }, [logoSvg, strokeColor, strokeWidth]);

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-center ${className ?? ""}`}
      style={{ width: currentWidth, height: currentHeight }}
      aria-label="profile logo"
      // SVG is loaded from /public/logo.svg so updates auto-apply
      dangerouslySetInnerHTML={logoSvg ? { __html: logoSvg } : undefined}
    />
  );
}

