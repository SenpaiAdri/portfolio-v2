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
        <div className="flex flex-col md:grid h-full w-full md:grid-cols-[1fr_1fr_.618fr] md:grid-rows-[1fr_4fr_.618fr] text-ink-body">
          {/* Header */}
          <div className="md:col-span-2 md:row-start-1 md:row-end-2 md:border-r-4 md:border-r-line md:border-dashed flex flex-[0.2] items-center justify-center gap-4 py-6 px-4 border-b-2 md:border-b-4 border-b-brand border-dashed">
            <h2 className={SECTION_HEADING}>
              Experience
            </h2>
          </div>

          {/* Right panel header */}
          <div className="hidden md:flex col-start-3 row-start-1 row-end-2 border-b-4 border-b-brand border-dashed items-center justify-center" aria-hidden="true" />

          {/* Main content - Experience entries */}
          <div ref={scrollRef} className="relative md:col-start-1 md:col-end-3 md:row-start-2 md:row-end-4 md:border-b-4 md:border-r-4 md:border-dashed md:border-b-brand md:border-r-line flex items-center justify-center px-6 py-6 md:px-10 md:py-8 flex-1 md:flex-auto overflow-y-auto">
            <BackdropGrid />

            <div className="w-full max-w-6xl mx-auto">
              {experiences.length === 0 ? (
                <p className="text-center text-ink-muted tracking-widest">No experience added yet.</p>
              ) : (
                <div className="space-y-10 md:space-y-20">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border-l-2 md:border-l-4 border-b-2 md:border-b-4 border-line border-dashed p-4 md:p-6" style={{ borderColor: exp.color + '80' }}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                        <h3 className="text-base md:text-lg font-bold tracking-[0.2em] uppercase" style={{ color: exp.color }}>{exp.company}</h3>
                        <span className="hidden md:block text-ink-body text-xs md:text-sm tracking-wider uppercase">{exp.date}</span>
                      </div>
                      <p className="text-ink-body text-sm md:text-base mb-2 uppercase">{exp.role}</p>
                      <span className="md:hidden text-ink-body text-xs md:text-sm tracking-wider uppercase">{exp.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom tagline */}
          <div className="col-span-1 md:col-start-3 md:col-end-3 row-start-2 md:row-start-2 md:row-end-4 flex items-center justify-center px-6 py-4 border-b-2 md:border-b-4 border-brand border-t-2 border-t-brand border-dashed md:border-t-0 flex-[0.2] md:flex-col md:min-h-0 md:overflow-y-hidden">
            <h2 className={cn(SECTION_TAGLINE, "md:hidden")}>
              <History className="w-4 h-4 sm:w-8 sm:h-8 text-brand" aria-hidden="true" />
              Work History
            </h2>
            {/* skills section */}
            <div className="hidden md:block w-full mx-auto md:px-4">
              {skillCategories.length === 0 ? (
                <p className="text-center text-ink-muted tracking-widest">No skills added yet.</p>
              ) : (
                <div className="grid grid-cols-1 gap-5 md:gap-6">
                  {skillCategories.map((cat, i) => (
                    <div key={i} className="w-full border-l-2 border-b-2 md:border-l-4 md:border-b-4 border-line border-dashed p-2 md:pl-6 md:pb-6 rounded">
                      <h3 className="text-brand text-xs font-bold tracking-[0.3em] uppercase mb-2 ml-2 md:mb-4">{cat.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill, j) => (
                          <span key={j} className="text-ink-strong text-[10px] px-2 md:px-2 py-[0.2rem] md:py-[0.3rem] border md:border-2 border-dashed border-line rounded break-words">
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
