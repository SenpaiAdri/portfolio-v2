"use client";

import { Code2 } from "lucide-react";
import { skillCategories } from "@/data/skills";

export default function Skills() {
  return (
    <div
      id="SKILLS"
      role="region"
      aria-label="Skills"
      className="bg-[#0a0a0a] h-dvh w-screen overflow-x-hidden"
    >
      <div className="relative h-full w-full">
        <div className="flex flex-col md:grid h-dvh w-full md:grid-cols-[1fr_1fr_.618fr] md:grid-rows-[0.618fr_1fr_.618fr] text-gray-400">
          {/* Header */}
          <div className="md:col-span-2 md:row-start-1 md:row-end-2 md:border-b-4 md:border-b-red-500 md:border-r-4 md:border-r-gray-600 md:border-dashed flex flex-[0.1] items-center justify-center gap-4 py-6 px-4 border-b-4 border-b-red-500 border-dashed">
            <h2 className="text-sm lg:text-2xl lg:font-black tracking-[0.5em] text-gray-500 uppercase text-center">
              Skills
            </h2>
          </div>

          {/* Right panel header */}
          <div className="hidden md:flex col-start-3 row-start-1 row-end-2 border-b-4 border-b-red-500 border-dashed items-center justify-center" aria-hidden="true">
            <Code2 className="w-6 h-6 md:w-10 md:h-10 text-red-500" />
          </div>

          {/* Main content - Skill categories */}
          <div className="md:col-start-1 md:col-end-4 md:row-start-2 md:row-end-3 md:border-b-4 md:border-dashed md:border-b-red-500 flex items-center justify-center px-6 py-6 md:px-10 md:py-8 flex-1 md:flex-auto overflow-y-auto">
            <div className="w-full mx-auto md:mx-10">
              {skillCategories.length === 0 ? (
                <p className="text-center text-gray-500 tracking-widest">No skills added yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-15">
                  {skillCategories.map((cat, i) => (
                    <div key={i} className="border-l-2 border-b-2 md:border-l-4 md:border-b-4 border-gray-600 border-dashed p-2 md:p-8">
                      <h3 className="text-red-500 text-sm md:text-md font-bold tracking-[0.3em] uppercase mb-2 ml-2 md:mb-4">{cat.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill, j) => (
                          <span key={j} className="text-gray-300 text-xs px-2 md:px-4 py-1 md:py-2 border md:border-2 border-dashed border-gray-600 ">
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

          {/* Bottom tagline */}
          <div className="col-span-1 md:col-start-2 md:col-end-4 row-start-3 md:row-start-3 md:row-end-4 flex items-center justify-center px-6 py-4 border-t-4 border-t-red-500 border-dashed md:border-t-0 flex-[0.1] md:flex-auto">
            <h2 className="text-xs lg:text-2xl lg:font-black tracking-[0.2em] text-gray-500 uppercase flex items-center gap-3">
              <Code2 className="w-4 h-4 sm:w-8 sm:h-8 text-red-500" aria-hidden="true" />
              Tech Stack
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
