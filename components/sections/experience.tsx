"use client";

import { History } from "lucide-react";
import { useCallback, useRef } from "react";
import { experiences } from "@/data/experience";
import { skillCategories } from "@/data/skills";
import { useSectionScroll, type ScrollDirection } from "../reveal-scroll";
import { BackdropGrid } from "@/components/backdrop-grid";
import { cn } from "@/lib/utils";
import {
  SECTION_HEADING,
  SECTION_TAGLINE,
} from "@/components/site-primitives";

export default function Experience() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSectionScroll = useCallback((direction: ScrollDirection) => {
    const el = scrollRef.current;
    if (!el) return false;

    if (direction === "next") {
      if (el.scrollTop + el.clientHeight < el.scrollHeight - 1) {
        el.scrollBy({ top: 90, behavior: "smooth" });
        return true;
      }
      return false;
    }

    if (el.scrollTop > 1) {
      el.scrollBy({ top: -90, behavior: "smooth" });
      return true;
    }
    return false;
  }, []);

  useSectionScroll(2, handleSectionScroll);

  return (
    <div
      id="EXPERIENCE"
      role="region"
      aria-label="Experience"
      className="bg-surface pt-15 h-dvh w-screen overflow-hidden"
    >
      <div className="relative h-full w-full">
        <div className="flex flex-col md:grid h-full w-full md:grid-cols-[13fr_8fr] md:grid-rows-[1fr_4fr_.618fr] text-ink-body">
          {/* Header */}
          <div className="md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2 flex flex-[0.2] items-center justify-center gap-4 py-6 px-4 border-b-2 md:border-b-4 border-b-brand border-dashed md:border-r-4 md:border-r-line">
            <h2 className={SECTION_HEADING}>Experience</h2>
          </div>

          {/* Top-right dead space — keeps the 13/21 vertical divider connected top to bottom */}
          <div
            className="hidden md:flex md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2 border-b-4 border-b-brand border-dashed items-center justify-center"
            aria-hidden="true"
          >
            <h2 className={SECTION_HEADING}> Skills </h2>
          </div>

          {/* Main content - Experience entries */}
          <div
            ref={scrollRef}
            className="relative md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-4 md:border-b-4 md:border-r-4 md:border-dashed md:border-b-brand md:border-r-line flex items-center justify-center px-6 py-6 md:px-10 md:py-8 flex-1 md:flex-auto overflow-y-auto"
          >
            <BackdropGrid />

            <div className="w-full mx-auto">
              {experiences.length === 0 ? (
                <p className="text-center text-ink-muted tracking-widest">
                  No experience added yet.
                </p>
              ) : (
                <div className="space-y-10 md:space-y-20">
                  {experiences.map((exp, i) => (
                    <div
                      key={i}
                      className="border-l-2 border-brand md:border-l-4 border-b-2 md:border-b-4 border-dashed p-4 md:p-6"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                        <h3
                          className="text-base md:text-lg text-brand font-bold tracking-[0.2em] uppercase"
                        >
                          {exp.role}
                        </h3>
                        <span className="hidden md:block text-ink-body text-xs md:text-sm tracking-widest uppercase">
                          {exp.date}
                        </span>
                      </div>
                      <p className="text-ink-body text-sm md:text-base mb-2 uppercase">
                        {exp.company}
                      </p>
                      <span className="md:hidden text-ink-body text-xs md:text-sm tracking-widest uppercase">
                        {exp.date}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom tagline */}
          <div className="md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-4 flex items-center justify-center px-6 py-4 border-b-2 md:border-b-4 border-brand border-t-2 border-t-brand border-dashed md:border-t-0 flex-[0.2] md:flex-col md:min-h-0 md:overflow-y-hidden">
            <h2 className={cn(SECTION_TAGLINE, "md:hidden")}>
              <History
                className="w-4 h-4 sm:w-8 sm:h-8 text-brand"
                aria-hidden="true"
              />
              Work History
            </h2>
            {/* skills section */}
            <div className="hidden md:block w-full mx-auto ">
              {skillCategories.length === 0 ? (
                <p className="text-center text-ink-muted tracking-widest">
                  No skills added yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-5 md:gap-6">
                  {skillCategories.map((cat, i) => (
                    <div
                      key={i}
                      className="w-full border-l-2 border-b-2 md:border-l-4 md:border-b-4 border-line border-dashed pl-4 pb-4 lg:pl-8 lg:pb-6 rounded"
                    >
                      <h3 className="text-brand text-xs font-bold tracking-[0.3em] uppercase mb-2 ml-2 lg:mb-4">
                        {cat.category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill, j) => (
                          <span
                            key={j}
                            className="text-ink-strong tracking-widest text-[11px] lg:text-xs px-2 lg:px-2.5 py-1 lg:py-1.5 border md:border-2 border-dashed border-line rounded wrap-break-words"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
