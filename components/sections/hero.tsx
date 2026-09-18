"use client";

import { Activity } from "lucide-react";
import { useRef } from "react";
import TextType from "../TextType";
import { LogoAnimated } from "../LogoAnimated";
import { GithubContributionGraph } from "../github-contribution-graph";
import {
  HERO_ACCENT_TEXT,
  HERO_DIVIDER_BOTTOM_GRAY,
  HERO_DIVIDER_BOTTOM_RED,
  HERO_DIVIDER_RIGHT_GRAY,
  HERO_DIVIDER_RIGHT_GRAY_MD,
  HERO_MUTED_TEXT,
  HERO_SOCIALS,
  HeroNavLink,
  SocialIconLink,
} from "../site-primitives";
import { cn } from "@/lib/utils";
import { MarqueeStrip } from "@/components/marquee-strip";
import { BackdropGrid } from "@/components/backdrop-grid";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/button";
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
        <div
          className={cn(
            "flex-5 md:flex-8 min-h-0 flex flex-col-reverse md:grid md:grid-cols-[13fr_8fr]",
            HERO_DIVIDER_BOTTOM_RED,
          )}
        >
          {/* Welcome message */}
          <div
            className={cn(
              "shrink-0 h-12 sm:h-14 md:h-auto flex justify-center items-center md:items-end md:pb-10 lg:pb-15 md:pr-0 lg:pr-15",
              HERO_DIVIDER_RIGHT_GRAY_MD,
            )}
          >
            <span className="relative flex items-center text-ink-muted font-medium tracking-widest whitespace-nowrap md:ml-auto text-left my-5 gap-2 md:gap-4">
              <Activity
                className="text-brand w-5 md:w-7 lg:w-9 h-full"
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
        <div
          className={cn(
            "flex-13 min-h-0 flex flex-col-reverse md:grid md:grid-cols-[13fr_8fr]",
            HERO_DIVIDER_BOTTOM_GRAY,
          )}
        >
          {/* Introduction */}
          <div
            className={cn(
              "flex-8 min-h-0 flex flex-row items-end justify-end gap-10 p-10 relative overflow-hidden",
              HERO_DIVIDER_RIGHT_GRAY_MD,
            )}
          >
            {/* Grid lines background + radial vignette */}
            <BackdropGrid />

            {/* Path/Education Background */}
            <div className="flex flex-row items-start justify-end gap-3 md:gap-10 z-10">
              <span className={cn(HERO_ACCENT_TEXT, "text-nowrap")}>---</span>
              <div className="flex flex-col ">
                <TextType
                  text="[PATH]"
                  loop={false}
                  typingSpeed={200}
                  initialDelay={introDelayMs}
                  className={cn(HERO_ACCENT_TEXT, "mb-2")}
                />
                <span className={HERO_MUTED_TEXT}>
                  Computer Science Student
                </span>
                <span className={HERO_MUTED_TEXT}>
                  Specialized in Mobile Programming
                </span>
              </div>
            </div>
          </div>

          {/* Navigation and Socials */}
          <div className="flex-5 min-h-0 flex flex-col">
            <div
              className={cn(
                "flex-8 min-h-0 grid grid-cols-[3fr_5fr]",
                HERO_DIVIDER_BOTTOM_RED,
              )}
            >
              {/* Socials — row 1 is the theme toggle (replaces the old GitHub icon), row 2 is LinkedIn */}
              <div
                className={cn(
                  "grid grid-rows-2 overflow-hidden",
                  HERO_DIVIDER_RIGHT_GRAY,
                )}
              >
                <Button
                  as="div"
                  className={cn(
                    "min-h-0 flex items-center justify-center",
                    HERO_DIVIDER_BOTTOM_RED,
                  )}
                >
                  <ThemeToggle />
                </Button>
                {HERO_SOCIALS.map(({ href, label, Icon }) => (
                  <Button
                    as="div"
                    key={label}
                    className="min-h-0 flex items-center justify-center"
                  >
                    <SocialIconLink href={href} label={label} Icon={Icon} />
                  </Button>
                ))}
              </div>

              {/* Navigation */}
              <section className="min-h-0 flex flex-col items-end justify-center overflow-hidden gap-5">
                <div className="w-full h-full flex flex-col items-end justify-center overflow-hidden gap-2 pr-5 lg:pr-10 text-base xl:text-xl">
                  <TextType
                    text="[ HOME ]"
                    loop={false}
                    typingSpeed={200}
                    initialDelay={introDelayMs}
                    className="text-brand"
                  />
                  <HeroNavLink to={1}>[ PROJECTS ]</HeroNavLink>
                  <HeroNavLink to={2}>[ EXPERIENCE ]</HeroNavLink>
                  <HeroNavLink to={3}>[ ABOUT ]</HeroNavLink>
                  <HeroNavLink to={4}>[ CONTACT ]</HeroNavLink>
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
                className="block rounded-sm outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-brand"
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
