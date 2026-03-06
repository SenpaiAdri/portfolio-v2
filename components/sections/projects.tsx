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
      <div className="flex-1 flex flex-row border-b-4 border-dashed"
        style={{
          borderColor: projects[currentProject].color,
          transition: "all 0.7s ease-in-out"
        }}>
        <div className="w-[calc(13/21*100%)] h-full border-r-gray-600 border-r-4 border-dashed flex items-center justify-center">
          <span className="text-gray-500 text-3xl flex">
            [Projects Images Here]
          </span>
        </div>

        {/* Project Logo slider */}
        <div className="w-[calc(8/21*100%)] h-full flex items-center justify-center">
          <div className="relative w-[90%] h-[15%] overflow-hidden">
            {projects.map((project, index) => (
              <div
                key={project.name}
                className="absolute inset-0 flex items-center justify-center transition-transform duration-1000 ease-in-out"
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
        <div className="w-[calc(13/21*100%)] h-full flex flex-col  border-r-gray-600 border-r-4 border-dashed py-10 px-15">
          {/* Title slider */}
          <div className="relative flex-[.12] overflow-hidden">
            {projects.map((project, index) => (
              <div
                key={project.name}
                className="absolute inset-0 flex flex-col transition-transform ease-in-out duration-1000"
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
              </div>
            ))}
          </div>

          {/* Description slider */}
          <div className="relative flex-[.12] mt-5 overflow-hidden">
            {projects.map((project, index) => (
              <div
                key={project.name}
                className="absolute inset-0 flex flex-col transition-transform ease-in-out duration-1000"
                style={{
                  transform: `translateY(${(index - currentProject) * 100}%)`,
                  color: project.color,
                }}
              >
                <div className="flex justify-end">
                  <span className="text-gray-400 text-lg md:text-xl tracking-wide text-right leading-tight max-w-[90%]">
                    {project.description.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline slider */}
          <div className="relative h-8 overflow-hidden mt-auto">
            {projects.map((project, index) => {
              const [start, end] = project.date.split(" - ");
              return (
                <div
                  key={project.name}
                  className="absolute inset-0 flex justify-between items-center transition-transform duration-1000 ease-in-out"
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
          <div className="w-full h-full flex flex-row border-b-4 border-dashed"
            style={{
              borderColor: projects[currentProject].color,
              transition: "all 0.7s ease-in-out"
            }}>
            <div className="w-full h-full flex flex-4 flex-col border-r-gray-600 border-r-4 border-dashed">
              <div className={`w-full h-1/2 flex items-center justify-center border-b-4 border-dashed text-4xl font-black`}
                style={{
                  color: projects[currentProject].color,
                  transition: "all 0.7s ease-in-out",
                  borderColor: projects[currentProject].color
                }}>
                #
              </div>

              {/* Project number slider */}
              <div className="relative w-full h-1/2 overflow-hidden">
                {projects.map((project, index) => (
                  <div
                    key={project.name}
                    className={`absolute inset-0 flex items-center justify-center transition-transform text-4xl font-black`}
                    style={{
                      transform: `translateY(${(index - currentProject) * 100}%)`,
                      color: project.color,
                      transition: "all 0.7s ease-in-out",
                    }}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-content flex flex-5 flex-col text-center justify-center">
              <span
                className="text-4xl"
                style={{
                  WebkitTextStroke: `2px ${projects[currentProject].color}`,
                  color: "transparent",
                  transition: "all 0.7s ease-in-out",
                }}
              >
                PROJECT
              </span>
            </div>
          </div>

          {/* Role slider */}
          <div className="relative h-full overflow-hidden">
            <div className="h-10 w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden ">
              {projects.map((project, index) => (
                <div
                  key={project.name}
                  className="absolute inset-0 flex items-center justify-center transition-transform duration-1000 ease-in-out"
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
    </div>
  );
}
