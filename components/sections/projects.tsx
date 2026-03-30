"use client";

import Image from "next/image";
import { Github, Link } from "lucide-react";
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
      className="bg-[#0a0a0a] h-screen md:min-h-screen w-screen flex flex-col overflow-x-hidden"
    >
      {/* Mobile Row 1: Project Logo */}
      <div className="flex-[0.5] h-24 md:hidden flex items-center justify-center border-b-2 border-gray-600 border-dashed">
        <div className="relative w-fit h-16 max-w-full overflow-hidden flex items-center justify-center">
          <div className="invisible">
            <Image
              src={projects[currentProject].image}
              alt={projects[currentProject].name}
              width={250}
              height={100}
            />
          </div>

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

      {/* Mobile Row 2: Project Images (hidden on md+) */}
      <div className="flex-1 md:hidden flex items-center justify-center border-b-2 border-gray-600 border-dashed">
        <span className="text-gray-500 text-xl">
          [Projects Images Here]
        </span>
      </div>

      {/* Mobile Row 3: Website + GitHub Links | Project Number (hidden on md+) */}
      <div className="flex-[0.5] md:hidden flex flex-row border-b-2 border-dashed"
        style={{
          borderColor: projects[currentProject].color,
          transition: "all 0.7s ease-in-out"
        }}>
        <div className="flex-1 flex flex-col items-center justify-center py-4 gap-5 border-r-2 border-gray-600 border-dashed">
          <div className="flex items-center gap-2">
            <Link
              size={16}
              style={{
                color: projects[currentProject].color,
                transition: "all 0.7s ease-in-out"
              }}
            />
            <div className="relative min-h-6 min-w-20 overflow-hidden">
              {projects.map((project, index) => (
                <div
                  key={`${project.name}-website`}
                  className="absolute inset-0 flex items-center justify-center transition-transform"
                  style={{
                    transform: `translateY(${(index - currentProject) * 100}%)`,
                    transition: "all 0.7s ease-in-out",
                  }}
                >
                  {project.website ? (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:underline"
                    >
                      Website
                    </a>
                  ) : (
                    <span className="text-gray-600 select-none">Website</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Github
              size={16}
              style={{
                color: projects[currentProject].color,
                transition: "all 0.7s ease-in-out"
              }}
            />
            <div className="relative min-h-6 min-w-20 overflow-hidden">
              {projects.map((project, index) => (
                <div
                  key={`${project.name}-github`}
                  className="absolute inset-0 flex items-center justify-center transition-transform"
                  style={{
                    transform: `translateY(${(index - currentProject) * 100}%)`,
                    transition: "all 0.7s ease-in-out",
                  }}
                >
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:underline"
                    >
                      GitHub
                    </a>
                  ) : (
                    <span className="text-gray-600 select-none">GitHub</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-2 py-4">
          <span
            className="text-xl"
            style={{
              WebkitTextStroke: `1px ${projects[currentProject].color}`,
              color: "transparent",
              transition: "all 0.7s ease-in-out",
            }}
          >
            PROJECT
          </span>
          <div className="flex items-center justify-center">
            <span
              className="text-xl font-black"
              style={{
                color: projects[currentProject].color,
                transition: "all 0.7s ease-in-out",
              }}
            >
              #
            </span>
            <div className="relative inline-flex items-center justify-center overflow-hidden tabular-nums">
              <span className="invisible text-xl font-black">88</span>
              {projects.map((project, index) => (
                <div
                  key={project.name}
                  className="absolute inset-0 flex items-center justify-center transition-transform text-xl font-black"
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
        </div>
      </div>

      {/* Mobile Row 4: Title, Description, Timeline with Grid (hidden on md+) */}
      <div className="md:hidden relative flex-1 flex flex-col py-5 px-6 border-b-2 border-gray-600 border-dashed">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 pointer-events-none select-none"
          style={{
            '--grid-color': `${projects[currentProject].color}26`,
            backgroundImage: `
              linear-gradient(to right, var(--grid-color) 2px, transparent 2px),
              linear-gradient(to bottom, var(--grid-color) 2px, transparent 2px)
            `,
            backgroundSize: '60px 60px',
            transition: '--grid-color 0.7s ease-in-out',
          } as React.CSSProperties}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black/20" />

        <div className="relative flex-[.2] overflow-hidden">
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
                <span className="text-xl tracking-wider text-right font-black"
                  style={{ color: project.color }}>
                  {project.name.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="relative flex-[.2] mt-5 overflow-hidden">
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
                <span className="text-gray-400 text-sm tracking-wide text-right leading-tight max-w-[90%]">
                  {project.description.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="relative h-10 overflow-hidden mt-auto">
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
                <span className="text-gray-400 text-xs tracking-widest">
                  {start?.toUpperCase()}
                </span>
                <span className="text-gray-400 text-xs tracking-widest">--</span>
                <span className="text-gray-400 text-xs tracking-widest">
                  {end?.toUpperCase()}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Web Layout: Row 1 (md+) */}
      <div className="hidden md:flex flex-1 flex-row border-b-2 md:border-b-4 border-dashed"
        style={{
          borderColor: projects[currentProject].color,
          transition: "all 0.7s ease-in-out"
        }}>
        <div className="w-[calc(13/21*100%)] h-full border-r-gray-600 border-r-2 md:border-r-4 border-dashed flex items-center justify-center">
          <span className="text-gray-500 text-xl md:text-3xl flex">
            [Projects Images Here]
          </span>
        </div>

        <div className="w-[calc(8/21*100%)] h-full flex items-center justify-center p-2 md:p-4">
          <div className="relative w-fit h-16 md:h-20 lg:h-24 max-w-full overflow-hidden flex items-center justify-center">
            <div className="invisible">
              <Image
                src={projects[currentProject].image}
                alt={projects[currentProject].name}
                width={250}
                height={100}
              />
            </div>

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

      {/* Web Layout: Row 2 (md+) */}
      <div className="hidden md:flex flex-1 flex-row border-b-2 md:border-b-4 border-gray-600 border-dashed">
        <div className="relative w-[calc(13/21*100%)] h-full flex flex-col  border-r-gray-600 border-r-2 md:border-r-4 border-dashed py-5 md:py-10 px-8 md:px-12 lg:px-15">
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 pointer-events-none select-none"
            style={{
              '--grid-color': `${projects[currentProject].color}26`,
              backgroundImage: `
                linear-gradient(to right, var(--grid-color) 2px, transparent 2px),
                linear-gradient(to bottom, var(--grid-color) 2px, transparent 2px)
              `,
              backgroundSize: '60px 60px',
              transition: '--grid-color 0.7s ease-in-out',
            } as React.CSSProperties}
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black/20" />
          <div className="relative flex-[.2] overflow-hidden">
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
                  <span className="text-xl md:text-2xl lg:text-[2.2rem] tracking-wider text-right font-black"
                    style={{ color: project.color }}>
                    {project.name.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="relative flex-[.2] mt-5 overflow-hidden">
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
                  <span className="text-gray-400 text-sm md:text-lg lg:text-xl tracking-wide text-right leading-tight max-w-[90%]">
                    {project.description.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="relative h-10 md:h-12 lg:h-14 overflow-hidden mt-auto">
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
                  <span className="text-gray-400 text-xs md:text-sm lg:text-base tracking-widest">
                    {start?.toUpperCase()}
                  </span>
                  <span className="text-gray-400 text-xs md:text-sm lg:text-base tracking-widest">
                    --
                  </span>
                  <span className="text-gray-400 text-xs md:text-sm lg:text-base tracking-widest">
                    {end?.toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-[calc(8/21*100%)] h-full flex flex-col">
          <div className="w-full h-full flex flex-row border-b-2 md:border-b-4 border-dashed"
            style={{
              borderColor: projects[currentProject].color,
              transition: "all 0.7s ease-in-out"
            }}>

            <div className="w-full h-full flex flex-5 flex-col border-r-gray-600 border-r-2 md:border-r-4 border-dashed">
              <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden py-3 md:py-5 gap-3 md:gap-5 border-b-2 md:border-b-4 border-dashed"
                style={{
                  borderColor: projects[currentProject].color,
                  transition: "all 0.7s ease-in-out",
                }}>
                <div className="flex items-center justify-center gap-2">
                  <Link
                    size={16}
                    className="shrink-0"
                    style={{
                      color: projects[currentProject].color,
                      transition: "all 0.7s ease-in-out"
                    }}
                  />
                  <div className="relative min-h-6 md:min-h-8 min-w-20 flex-1 overflow-hidden">
                    {projects.map((project, index) => (
                      <div
                        key={`${project.name}-website`}
                        className="absolute inset-0 flex items-center justify-center transition-transform"
                        style={{
                          transform: `translateY(${(index - currentProject) * 100}%)`,
                          transition: "all 0.7s ease-in-out",
                        }}
                      >
                        {project.website ? (
                          <a
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:underline flex items-center gap-2"
                          >
                            Website
                          </a>
                        ) : (
                          <span className="text-gray-600 select-none">
                            Website
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden py-5 gap-5">
                <div className="flex items-center justify-center gap-2">
                  <Github
                    size={16}
                    className="shrink-0"
                    style={{
                      color: projects[currentProject].color,
                      transition: "all 0.7s ease-in-out"
                    }}
                  />
                  <div className="relative min-h-6 md:min-h-8 min-w-20 flex-1 overflow-hidden">
                    {projects.map((project, index) => (
                      <div
                        key={`${project.name}-github`}
                        className="absolute inset-0 flex items-center justify-center transition-transform"
                        style={{
                          transform: `translateY(${(index - currentProject) * 100}%)`,
                          transition: "all 0.7s ease-in-out",
                        }}
                      >
                        {project.github ? (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:underline flex items-center gap-2"
                          >
                            GitHub
                          </a>
                        ) : (
                          <span className="text-gray-600 select-none">
                            GitHub
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-5 flex-col text-center justify-center gap-5">
              <span
                className="text-2xl md:text-3xl lg:text-4xl"
                style={{
                  WebkitTextStroke: `2px ${projects[currentProject].color}`,
                  color: "transparent",
                  transition: "all 0.7s ease-in-out",
                }}
              >
                PROJECT
              </span>
              <div className="flex items-center justify-center">
                <div className={`text-2xl md:text-3xl lg:text-4xl font-black`}
                  style={{
                    color: projects[currentProject].color,
                    transition: "all 0.7s ease-in-out",
                    borderColor: projects[currentProject].color
                  }}>
                  #
                </div>
                <div className="relative inline-flex items-center justify-center overflow-hidden tabular-nums">
                  <span className="invisible text-2xl md:text-3xl lg:text-4xl font-black">88</span>
                  {projects.map((project, index) => (
                    <div
                      key={project.name}
                      className={`absolute inset-0 flex items-center justify-center transition-transform text-2xl md:text-3xl lg:text-4xl font-black`}
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
            </div>
          </div>

          <div className="relative h-full overflow-hidden">
            <div className="h-12 md:h-14 lg:h-16 w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden ">
              {projects.map((project, index) => (
                <div
                  key={project.name}
                  className="absolute inset-0 flex items-center justify-center transition-transform duration-1000 ease-in-out"
                  style={{
                    transform: `translateY(${(index - currentProject) * 100}%)`,
                  }}
                >
                  <span className="text-lg md:text-2xl lg:text-3xl text-gray-400">
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
