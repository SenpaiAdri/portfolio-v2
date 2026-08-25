"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { projects } from "@/data/projects";
import {
  type ScrollDirection,
  useSectionProgress,
  useSectionScroll,
} from "../reveal-scroll";
import ProjectCarousel from "./project-carousel";
import {
  ProjectCounter,
  ProjectInfoPanel,
  ProjectLinkField,
  ProjectLogoBox,
  ProjectRoleSlides,
  TRANSITION_THEME,
  TRANSITION_THEME_LONG,
} from "./project-blocks";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export default function Projects() {
  const [currentProject, setCurrentProject] = useState(0);
  const lastIndex = projects.length - 1;
  const prefersReducedMotion = usePrefersReducedMotion();
  const prevColorRef = useRef<string | null>(null);

  // Morph the entering slide's title/number color from the previous
  // project's color to its own (slides are separate colored elements,
  // so plain CSS transitions can't ease the swap)
  useEffect(() => {
    if (prefersReducedMotion) return;
    const from = prevColorRef.current ?? projects[currentProject].color;
    const to = projects[currentProject].color;
    prevColorRef.current = to;
    if (from === to) return;

    gsap.fromTo(
      document.querySelectorAll(`[data-project-color="${currentProject}"]`),
      { color: from },
      { color: to, duration: 0.7, ease: "power2.inOut", overwrite: "auto" }
    );
  }, [currentProject, prefersReducedMotion]);

  const handleSectionScroll = useCallback(
    (direction: ScrollDirection) => {
      if (direction === "next") {
        if (currentProject < lastIndex) {
          setCurrentProject((prev) => prev + 1);
          return true;
        }
        return false;
      }

      if (direction === "prev") {
        if (currentProject > 0) {
          setCurrentProject((prev) => prev - 1);
          return true;
        }
        return false;
      }

      return false;
    },
    [currentProject, lastIndex]
  );

  useSectionScroll(1, handleSectionScroll);
  useSectionProgress(1, currentProject, projects.length);

  return (
    <div
      id="PROJECTS"
      className="bg-surface pt-15 h-dvh md:min-h-screen w-screen flex flex-col overflow-hidden"
    >
      {/* Mobile Row 1: Project Logo */}
      <div className="flex-[0.5] h-24 md:hidden flex items-center justify-center border-b-2 border-gray-600 border-dashed">
        <ProjectLogoBox current={currentProject} className="h-16" />
      </div>

      {/* Mobile Row 2: Project Images (hidden on md+) */}
      <div className="flex-[0.9] md:hidden flex items-center justify-center border-b-2 border-gray-600 border-dashed">
        <ProjectCarousel
          projectName={projects[currentProject].name}
          accentColor={projects[currentProject].color}
          allImages={projects.map((p) => p.images)}
          currentProject={currentProject}
        />
      </div>

      {/* Mobile Row 3: Website + GitHub Links | Project Number (hidden on md+) */}
      <div className="flex-[0.5] md:hidden flex flex-row border-b-2 border-dashed"
        style={{
          borderColor: projects[currentProject].color,
          transition: TRANSITION_THEME
        }}>
        <div className="flex-1 flex flex-col items-center justify-center py-4 gap-5 border-r-2 border-gray-600 border-dashed">
          <ProjectLinkField
            current={currentProject}
            kind="website"
            boxClassName="min-h-6 min-w-20"
          />
          <ProjectLinkField
            current={currentProject}
            kind="github"
            boxClassName="min-h-6 min-w-20"
          />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-2 py-4">
          <ProjectCounter current={currentProject} sizeClassName="text-xl" />
        </div>
      </div>

      {/* Mobile Row 4: Title, Description, Timeline with Grid (hidden on md+) */}
      <ProjectInfoPanel
        current={currentProject}
        panelClassName="md:hidden relative flex-1 flex flex-col py-5 px-6 border-b-2 border-gray-600 border-dashed"
        titleBoxClassName="relative flex-[.25] overflow-hidden"
        titleTextClassName="text-xl"
        descBoxClassName="relative flex-[.5] mt-5 overflow-hidden"
        descTextClassName="text-xs sm:text-sm"
        dateBoxClassName="relative h-10"
        dateTextClassName="text-gray-400 text-xs tracking-widest"
      />

      {/* Web Layout: Row 1 (md+) */}
      <div className="hidden md:flex flex-1 flex-row border-b-2 md:border-b-4 border-dashed"
        style={{
          borderColor: projects[currentProject].color,
          transition: TRANSITION_THEME_LONG
        }}>
        <div className="w-[calc(13/21*100%)] h-full border-r-gray-600 border-r-2 md:border-r-4 border-dashed flex items-center justify-center">
          <ProjectCarousel
            projectName={projects[currentProject].name}
            accentColor={projects[currentProject].color}
            allImages={projects.map((p) => p.images)}
            currentProject={currentProject}
          />
        </div>

        <div className="w-[calc(8/21*100%)] h-full flex items-center justify-center p-2 md:p-4">
          <ProjectLogoBox
            current={currentProject}
            className="w-fit h-16 md:h-20 lg:h-24"
          />
        </div>
      </div>

      {/* Web Layout: Row 2 (md+) */}
      <div className="hidden md:flex flex-1 flex-row border-b-2 md:border-b-4 border-gray-600 border-dashed">
        <ProjectInfoPanel
          current={currentProject}
          panelClassName="relative w-[calc(13/21*100%)] h-full flex flex-col border-r-gray-600 border-r-2 md:border-r-4 border-dashed py-5 md:py-10 px-8 md:px-12 lg:px-15"
          titleBoxClassName="relative flex-[.2] overflow-hidden"
          titleTextClassName="text-xl md:text-2xl lg:text-[2.2rem]"
          descBoxClassName="relative flex-[.2] mt-5 overflow-hidden"
          descTextClassName="text-sm md:text-lg lg:text-xl"
          dateBoxClassName="relative h-10 md:h-12 lg:h-14"
          dateTextClassName="text-gray-400 text-xs md:text-sm lg:text-base tracking-widest"
        />

        <div className="w-[calc(8/21*100%)] h-full flex flex-col">
          <div className="w-full h-full flex flex-row border-b-2 md:border-b-4 border-dashed"
            style={{
              borderColor: projects[currentProject].color,
              transition: TRANSITION_THEME
            }}>

            <div className="w-full h-full flex flex-5 flex-col border-r-gray-600 border-r-2 md:border-r-4 border-dashed">
              <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden py-3 md:py-5 gap-3 md:gap-5 border-b-2 md:border-b-4 border-dashed"
                style={{
                  borderColor: projects[currentProject].color,
                  transition: TRANSITION_THEME,
                }}>
                <ProjectLinkField
                  current={currentProject}
                  kind="website"
                  boxClassName="min-h-6 md:min-h-8 min-w-20 flex-1"
                />
              </div>
              <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden py-5 gap-5">
                <ProjectLinkField
                  current={currentProject}
                  kind="github"
                  boxClassName="min-h-6 md:min-h-8 min-w-20 flex-1"
                />
              </div>
            </div>

            <div className="flex flex-5 flex-col text-center justify-center gap-5">
              <ProjectCounter
                current={currentProject}
                sizeClassName="text-2xl md:text-3xl lg:text-4xl"
                strokeWidth={2}
              />
            </div>
          </div>

          <div className="relative h-full overflow-hidden">
            <ProjectRoleSlides
              current={currentProject}
              boxClassName="h-12 md:h-14 lg:h-16 w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
              textClassName="text-lg md:text-2xl lg:text-3xl text-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
