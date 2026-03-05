"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { projects } from "@/data/projects";
import {
  type ScrollDirection,
  useSectionScroll,
} from "../reveal-scroll";

export default function Projects() {
  const [currentProject, setCurrentProject] = useState(0);
  const lastIndex = projects.length - 1;

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

  return (
    <div
      id="PROJECTS"
      className="bg-[#0a0a0a] h-screen w-screen flex flex-col overflow-x-hidden"
    >
      {/* row 1 */}
      <div className="flex-1 flex flex-row border-b-red-600 border-b-4 border-dashed">
        <div className="w-[calc(13/21*100%)] h-full border-r-gray-600 border-r-4 border-dashed flex items-center justify-center">
          <span className="text-gray-500 text-3xl flex">
            [Projects Images Here]
          </span>
        </div>

        {/* Project Logo slider */}
        <div className="w-[calc(8/21*100%)] h-full flex items-center justify-center">
          <div className="relative w-[90%] h-[60%] overflow-hidden">
            {projects.map((project, index) => (
              <div
                key={project.name}
                className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                style={{
                  transform: `translateY(${(index - currentProject) * 100}%)`,
                }}
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  width={250}
                  height={100}
                  className="object-cover mx-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* row 2 */}
      <div className="flex-1 flex flex-row border-b-gray-600 border-b-4 border-dashed">
        {/* Left: title, description, date */}
        <div className="w-[calc(13/21*100%)] h-full flex flex-col justify-between border-r-gray-600 border-r-4 border-dashed py-10 px-15">
          {/* Title + description slider */}
          <div className="relative flex-1 overflow-hidden">
            {projects.map((project, index) => (
              <div
                key={project.name}
                className="absolute inset-0 flex flex-col gap-10 transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                style={{
                  transform: `translateY(${(index - currentProject) * 100}%)`,
                  color: project.color,
                }}
              >
                <div className="flex justify-end">
                  <span className="text-[2.2rem] tracking-wider text-right font-black"
                    style={{ color: project.color }}>
                    {project.name.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-end mt-5">
                  <span className="text-gray-400 text-lg md:text-xl tracking-wide text-right leading-tight max-w-[90%]">
                    {project.description.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Date row slider */}
          <div className="relative h-[3rem] mt-6 overflow-hidden">
            {projects.map((project, index) => {
              const [start, end] = project.date.split(" - ");
              return (
                <div
                  key={project.name}
                  className="absolute inset-0 flex justify-between items-center px-2 transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                  style={{
                    transform: `translateY(${(index - currentProject) * 100}%)`,
                  }}
                >
                  <span className="text-gray-400 text-lg tracking-widest">
                    {start?.toUpperCase()}
                  </span>
                  <span className="text-gray-400 text-lg tracking-widest">
                    --
                  </span>
                  <span className="text-gray-400 text-lg tracking-widest">
                    {end?.toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: project index + role */}
        <div className="w-[calc(8/21*100%)] h-full flex flex-col">
          <div className="w-full h-full flex flex-row border-b-red-600 border-b-4 border-dashed">
            <div className="w-full h-full flex flex-4 flex-col border-r-gray-600 border-r-4 border-dashed">
              <div className={`w-full h-1/2 flex items-center justify-center border-b-red-600 border-b-4 border-dashed`}
                style={{ color: projects[currentProject].color }}>
                #
              </div>

              {/* Project number slider */}
              <div className="relative w-full h-1/2 overflow-hidden">
                {projects.map((project, index) => (
                  <div
                    key={project.name}
                    className={`absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]`}
                    style={{
                      transform: `translateY(${(index - currentProject) * 100}%)`,
                      color: project.color,
                    }}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-content flex flex-5 flex-col text-center justify-center">
              <span className="text-3xl text-gray-400 font-black">PROJECT</span>
            </div>
          </div>

          {/* Role slider */}
          <div className="relative h-full overflow-hidden">
            {projects.map((project, index) => (
              <div
                key={project.name}
                className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                style={{
                  transform: `translateY(${(index - currentProject) * 100}%)`,
                }}
              >
                <span className="text-3xl text-gray-400">
                  {project.role.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
