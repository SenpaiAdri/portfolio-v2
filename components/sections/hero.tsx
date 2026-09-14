"use client";

import { RevealScrollTo } from "../reveal-scroll";
import { Activity, Github, Linkedin } from "lucide-react";
import { useRef } from "react";
import TextType from "../TextType";
import { LogoAnimated } from "../LogoAnimated";
import { GithubContributionGraph } from "../github-contribution-graph";
import { MarqueeStrip } from "@/components/marquee-strip";
import { BackdropGrid } from "@/components/backdrop-grid";
import {
  INTRO_DURATION_S,
  INTRO_REDUCED_DURATION_S,
} from "@/components/intro-overlay";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export default function Hero() {
  const logoRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Start hero entrance animations only after the intro overlay has faded out
  const introDelayS = prefersReducedMotion
    ? INTRO_REDUCED_DURATION_S
    : INTRO_DURATION_S - 0.4;
  const introDelayMs = introDelayS * 1000;

  return (
    <section
      id="HOME"
      role="region"
      aria-label="Home"
      className="bg-surface h-dvh w-screen flex flex-col overflow-hidden"
    >
      <h1 className="sr-only">Adrian M. De Guzman — Full Stack Developer</h1>

      {/* Fibonacci field (21) + spiral overlay */}
      <div className="relative flex-21 min-h-0 flex flex-col">
        {/* row 1 — 8 */}
        <div className="flex-5 md:flex-8 min-h-0 flex flex-col-reverse md:grid md:grid-cols-[13fr_8fr] border-b-red-600 border-b-4 border-dashed">
          {/* Welcome message */}
          <div className="shrink-0 h-12 sm:h-14 md:h-auto flex justify-center items-center md:items-end md:pb-10 lg:pb-15 md:pr-0 lg:pr-15 md:border-r-gray-600 md:border-r-4 border-dashed">
            <span className="relative flex items-center text-gray-500 font-medium tracking-widest whitespace-nowrap md:ml-auto text-left my-5 gap-2 md:gap-4">
              <Activity
                className="text-red-500 w-5 md:w-7 lg:w-9 h-full"
                strokeWidth={2}
              />
              <TextType
                text={[
                  "WELCOME TO MY PORTFOLIO!",
                  "I'M ADRIAN",
                  "A COMPUTER SCIENCE STUDENT",
                  "Full-Stack Developer",
                ]}
                typingSpeed={200}
                initialDelay={introDelayMs}
                pauseDuration={2100}
                showCursor
                cursorCharacter="▎"
                deletingSpeed={30}
                variableSpeed={{ min: 55, max: 125 }}
                cursorBlinkDuration={0.5}
                className="text-sm sm:text-lg lg:text-3xl"
              />
            </span>
          </div>

          {/* Profile image / Logo with DrawSVG animation */}
          <div
            className="flex-1 min-h-0 flex items-center justify-center"
            ref={logoRef}
          >
            <div className="flex items-center justify-center w-full h-full">
              <LogoAnimated
                width={{ base: 150, md: 250, lg: 350 }}
                delay={introDelayS}
              />
            </div>
          </div>
        </div>

        {/* row 2 — 13 */}
        <div className="flex-13 min-h-0 flex flex-col-reverse md:grid md:grid-cols-[13fr_8fr] border-b-gray-600 border-b-4 border-dashed">
          {/* Introduction */}
          <div className="flex-8 min-h-0 flex flex-row items-end justify-end gap-10 p-10 border-dashed relative overflow-hidden md:border-r-gray-600 md:border-r-4">
            {/* Grid lines background + radial vignette */}
            <BackdropGrid masked />

            {/* Path/Education Background */}
            <div className="flex flex-row items-start justify-end gap-3 md:gap-10 z-10">
              <span className="text-red-500 text-xl text-nowrap md:text-2xl">
                ---
              </span>
              <div className="flex flex-col ">
                <TextType
                  text="[PATH]"
                  loop={false}
                  typingSpeed={200}
                  initialDelay={introDelayMs}
                  className="text-red-500 text-xl md:text-2xl mb-2"
                />
                <span className="text-gray-500 text-base md:text-xl lg:text-2xl">
                  Computer Science Student
                </span>
                <span className="text-gray-500 text-base md:text-xl lg:text-2xl">
                  Specialized in Mobile Programming
                </span>
              </div>
            </div>
          </div>

          {/* Navigation and Socials */}
          <div className="flex-5 min-h-0 flex flex-col">
            <div className="flex-8 min-h-0 grid grid-cols-[3fr_5fr] border-b-red-600 border-b-4 border-dashed">
              {/* Socials */}
              <div className="grid grid-rows-2 overflow-hidden border-r-gray-600 border-r-4 border-dashed">
                <div className="min-h-0 flex items-center justify-center border-b-red-600 border-b-4 border-dashed">
                  <a
                    href="https://github.com/SenpaiAdri"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                  >
                    <Github
                      className="text-red-500 hover:text-red-400 hover:scale-110 transition-[transform,color] cursor-pointer"
                      size={35}
                      aria-hidden="true"
                    />
                  </a>
                </div>
                <div className="min-h-0 flex items-center justify-center">
                  <a
                    href="https://www.linkedin.com/in/eydriannn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                  >
                    <Linkedin
                      className="text-red-500 hover:text-red-400 hover:scale-110 transition-[transform,color] cursor-pointer"
                      size={35}
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>

              {/* Navigation */}
              <section className="min-h-0 flex flex-col items-end justify-center overflow-hidden gap-5">
                <div className="w-full h-full flex flex-col items-end justify-center overflow-hidden gap-2 pr-5 lg:pr-10 text-base md:lg xl:text-xl">
                  <TextType
                    text="[ HOME ]"
                    loop={false}
                    typingSpeed={200}
                    initialDelay={introDelayMs}
                    className="text-red-500"
                  />
                  <RevealScrollTo
                    to={1}
                    className="text-gray-500 hover:text-red-500 hover:-translate-x-4 transition-[transform,color] cursor-pointer"
                  >
                    [ PROJECTS ]
                  </RevealScrollTo>
                  <RevealScrollTo
                    to={2}
                    className="text-gray-500 hover:text-red-500 hover:-translate-x-4 transition-[transform,color]"
                  >
                    [ EXPERIENCE ]
                  </RevealScrollTo>
                  <RevealScrollTo
                    to={3}
                    className="text-gray-500 hover:text-red-500 hover:-translate-x-4 transition-[transform,color]"
                  >
                    [ ABOUT ]
                  </RevealScrollTo>
                  <RevealScrollTo
                    to={4}
                    className="text-gray-500 hover:text-red-500 hover:-translate-x-4 transition-[transform,color]"
                  >
                    [ CONTACT ]
                  </RevealScrollTo>
                </div>
              </section>
            </div>
            <div className="hidden md:flex flex-9 min-h-0 flex-col items-center justify-center">
              <a
                href="https://github.com/SenpaiAdri"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SenpaiAdri's GitHub contribution graph — opens GitHub profile"
                title="Open SenpaiAdri's GitHub profile"
                className="block rounded-sm outline-none transition-opacity  focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <GithubContributionGraph />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee — 3 */}
      <MarqueeStrip className="flex-3 min-h-[3.5rem] md:min-h-[7rem] shrink-0 md:leading-snug" />
    </section>
  );
}
