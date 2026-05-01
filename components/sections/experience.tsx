"use client";

import { History, Briefcase } from "lucide-react";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <div
      id="EXPERIENCE"
      role="region"
      aria-label="Experience"
      className="bg-[#0a0a0a] h-dvh w-screen overflow-x-hidden"
    >
      <div className="relative h-full w-full">
        <div className="flex flex-col md:grid h-dvh w-full md:grid-cols-[1fr_1fr_.618fr] md:grid-rows-[0.618fr_1fr_.618fr] text-gray-400">
          {/* Header */}
          <div className="md:col-span-2 md:row-start-1 md:row-end-2 md:border-r-4 md:border-r-gray-600 md:border-dashed flex flex-[0.2] items-center justify-center gap-4 py-6 px-4 border-b-4 border-b-red-500 border-dashed">
            <h2 className="text-sm lg:text-2xl lg:font-black tracking-[0.5em] text-gray-500 uppercase text-center">
              Experience
            </h2>
          </div>

          {/* Right panel header */}
          <div className="hidden md:flex col-start-3 row-start-1 row-end-2 border-b-4 border-b-red-500 border-dashed items-center justify-center" aria-hidden="true">
            <Briefcase className="w-6 h-6 lg:w-10 lg:h-10 text-red-500" />
          </div>

          {/* Main content - Experience entries */}
          <div className="relative md:col-start-1 md:col-end-3 md:row-start-2 md:row-end-4 md:border-b-4 md:border-r-4 md:border-dashed md:border-b-red-500 md:border-r-gray-500 flex items-center justify-center px-6 py-6 md:px-10 md:py-8 flex-1 md:flex-auto overflow-y-auto">
            {/* Grid lines background */}
            <div
              aria-hidden="true"
              className="absolute inset-0 z-0 pointer-events-none select-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255,25,25,0.1) 2px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,25,25,0.1) 2px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
              }}
            />
            {/* Radial Gradient */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black/20" />
            
            <div className="w-full max-w-6xl mx-auto">
              {experiences.length === 0 ? (
                <p className="text-center text-gray-500 tracking-widest">No experience added yet.</p>
              ) : (
                <div className="space-y-10 md:space-y-20">
                  {experiences.map((exp, i) => (
                    <div key={i} className="border-l-4 border-b-4 border-gray-600 border-dashed p-4 md:p-6" style={{ borderColor: exp.color + '80' }}>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                        <h3 className="text-base md:text-lg font-bold tracking-[0.2em] uppercase" style={{ color: exp.color }}>{exp.company}</h3>
                        <span className="hidden md:block text-gray-400 text-xs md:text-sm tracking-wider uppercase">{exp.date}</span>
                      </div>
                      <p className="text-gray-400 text-sm md:text-base mb-2 uppercase">{exp.role}</p>
                      <span className="md:hidden text-gray-400 text-xs md:text-sm tracking-wider uppercase">{exp.date}</span>
                      {/* <p className="hidden md:block text-gray-400 text-xs leading-relaxed mb-3">{exp.description}</p> */}
                      {/* <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, j) => (
                          <span key={j} className="text-gray-300 text-xs px-2 md:px-4 py-1 md:py-2 border md:border-2 border-dashed border-gray-600 ">
                            {tech}
                          </span>
                        ))}
                      </div> */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom tagline */}
          <div className="col-span-1 md:col-start-3 md:col-end-3 row-start-2 md:row-start-2 md:row-end-4 flex items-center justify-center px-6 py-4 border-b-4 border-red-500 border-t-4 border-t-red-500 border-dashed md:border-t-0 flex-[0.2] md:flex-auto">
            <h2 className="text-xs lg:text-2xl lg:font-black tracking-[0.2em] text-gray-500 uppercase flex items-center gap-3">
              <History className="w-4 h-4 sm:w-8 sm:h-8 text-red-500" aria-hidden="true" />
              Work History
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
