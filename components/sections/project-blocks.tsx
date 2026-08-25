"use client";

import Image from "next/image";
import { Github, Link } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";
import { SlideStack } from "@/components/slide-stack";
import { BackdropGrid } from "@/components/backdrop-grid";

export const TRANSITION_THEME =
  "border-color 0.7s ease-in-out, color 0.7s ease-in-out, transform 0.7s ease-in-out";
export const TRANSITION_THEME_LONG =
  "border-color 1s ease-in-out, color 1s ease-in-out, transform 1s ease-in-out";
// OUTLINED "PROJECT" text: visible color is -webkit-text-stroke-color,
// not `color` (fill is transparent) — so the stroke longhand must be
// explicitly transitioned, or the color snaps instantly
export const TRANSITION_STROKE =
  "color 0.7s ease-in-out, -webkit-text-stroke-color 0.7s ease-in-out";

/** Invisible-sizer box holding the sliding project logos. */
export function ProjectLogoBox({
  current,
  className,
}: {
  current: number;
  className?: string;
}) {
  const active = projects[current];
  return (
    <div
      className={cn(
        "relative w-fit max-w-full overflow-hidden flex items-center justify-center",
        className
      )}
    >
      <div className="invisible">
        <Image src={active.logo} alt={active.name} width={250} height={100} />
      </div>
      <SlideStack
        items={projects}
        current={current}
        getKey={(p) => p.name}
        itemClassName="absolute inset-0 flex items-center justify-center"
        renderItem={(p) => (
          <Image
            src={p.logo}
            alt={p.name}
            width={250}
            height={100}
            className="object-contain max-h-full max-w-full"
          />
        )}
      />
    </div>
  );
}

/** Icon + sliding link (website or GitHub); renders a muted placeholder when empty. */
export function ProjectLinkField({
  current,
  kind,
  boxClassName,
}: {
  current: number;
  kind: "website" | "github";
  boxClassName?: string;
}) {
  const Icon = kind === "website" ? Link : Github;
  const label = kind === "website" ? "Website" : "GitHub";

  return (
    <div className="flex items-center gap-2">
      <Icon
        size={16}
        className="shrink-0"
        style={{
          color: projects[current].color,
          transition: TRANSITION_THEME,
        }}
      />
      <SlideStack
        items={projects}
        current={current}
        getKey={(p) => `${p.name}-${kind}`}
        className={cn("relative overflow-hidden", boxClassName)}
        itemClassName="absolute inset-0 flex items-center justify-center"
        transition={TRANSITION_THEME}
        renderItem={(p) =>
          p[kind] ? (
            <a
              href={p[kind]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:underline flex items-center gap-2"
            >
              {label}
            </a>
          ) : (
            <span className="text-gray-600 select-none">{label}</span>
          )
        }
      />
    </div>
  );
}

/** Outlined "PROJECT #n" counter with color-morphing slides. */
export function ProjectCounter({
  current,
  sizeClassName,
  strokeWidth = 1,
}: {
  current: number;
  sizeClassName: string;
  strokeWidth?: number;
}) {
  const color = projects[current].color;

  return (
    <>
      <span
        className={sizeClassName}
        style={{
          WebkitTextStroke: `${strokeWidth}px ${color}`,
          color: "transparent",
          transition: TRANSITION_STROKE,
        }}
      >
        PROJECT
      </span>
      <div className="flex items-center justify-center">
        <div
          className={cn("font-black", sizeClassName)}
          style={{
            color,
            transition: TRANSITION_THEME,
            borderColor: color,
          }}
        >
          #
        </div>
        <div className="relative inline-flex items-center justify-center overflow-hidden tabular-nums">
          <span className={cn("invisible font-black", sizeClassName)}>88</span>
          <SlideStack
            items={projects}
            current={current}
            getKey={(p) => p.name}
            className="absolute inset-0"
            itemClassName={cn(
              "absolute inset-0 flex items-center justify-center font-black",
              sizeClassName
            )}
            transition="transform 0.7s ease-in-out"
            getItemProps={(_, index) => ({
              "data-project-color": index,
              style: { color: projects[index].color },
            })}
            renderItem={(_, index) => index + 1}
          />
        </div>
      </div>
    </>
  );
}

/** Sliding project titles; wrappers carry data-project-color for the GSAP color morph. */
export function ProjectTitleSlides({
  current,
  boxClassName,
  textClassName,
}: {
  current: number;
  boxClassName?: string;
  textClassName?: string;
}) {
  return (
    <SlideStack
      items={projects}
      current={current}
      getKey={(p) => p.name}
      className={boxClassName}
      itemClassName="absolute inset-0 flex flex-col"
      getItemProps={(p, index) => ({
        "data-project-color": index,
        style: { color: p.color },
      })}
      renderItem={(p) => (
        <div className="flex justify-end">
          <span
            className={cn("tracking-wider text-right font-black", textClassName)}
            style={{ color: p.color }}
          >
            {p.name.toUpperCase()}
          </span>
        </div>
      )}
    />
  );
}

/** Sliding project descriptions. */
export function ProjectDescSlides({
  current,
  boxClassName,
  textClassName,
}: {
  current: number;
  boxClassName?: string;
  textClassName?: string;
}) {
  return (
    <SlideStack
      items={projects}
      current={current}
      getKey={(p) => p.name}
      className={boxClassName}
      itemClassName="absolute inset-0 flex flex-col"
      renderItem={(p) => (
        <div className="flex justify-end">
          <span
            className={cn(
              "text-gray-400 tracking-wide text-right leading-tight max-w-[90%]",
              textClassName
            )}
          >
            {p.description.toUpperCase()}
          </span>
        </div>
      )}
    />
  );
}

/** Sliding start/end date row. */
export function ProjectDateSlides({
  current,
  boxClassName,
  textClassName,
}: {
  current: number;
  boxClassName?: string;
  textClassName?: string;
}) {
  return (
    <SlideStack
      items={projects}
      current={current}
      getKey={(p) => p.name}
      className={cn("overflow-hidden mt-auto", boxClassName)}
      itemClassName="absolute inset-0 flex justify-between items-center"
      renderItem={(p) => {
        const [start, end] = p.date.split(" - ");
        return (
          <>
            <span className={textClassName}>{start?.toUpperCase()}</span>
            <span className={textClassName}>--</span>
            <span className={textClassName}>{end?.toUpperCase()}</span>
          </>
        );
      }}
    />
  );
}

/** Sliding role label (desktop layout). */
export function ProjectRoleSlides({
  current,
  boxClassName,
  textClassName,
}: {
  current: number;
  boxClassName?: string;
  textClassName?: string;
}) {
  return (
    <SlideStack
      items={projects}
      current={current}
      getKey={(p) => p.name}
      className={boxClassName}
      itemClassName="absolute inset-0 flex items-center justify-center"
      renderItem={(p) => <span className={textClassName}>{p.role.toUpperCase()}</span>}
    />
  );
}

/**
 * Themed info panel shared by the mobile bottom sheet and the desktop
 * left column: grid backdrop, vignette, title / description / date stacks.
 * Layout + responsive sizing are injected via the class-name props.
 */
export function ProjectInfoPanel({
  current,
  panelClassName,
  titleBoxClassName,
  titleTextClassName,
  descBoxClassName,
  descTextClassName,
  dateBoxClassName,
  dateTextClassName,
}: {
  current: number;
  panelClassName?: string;
  titleBoxClassName?: string;
  titleTextClassName?: string;
  descBoxClassName?: string;
  descTextClassName?: string;
  dateBoxClassName?: string;
  dateTextClassName?: string;
}) {
  return (
    <div className={panelClassName}>
      <BackdropGrid color={projects[current].color} masked parallax />

      <ProjectTitleSlides
        current={current}
        boxClassName={titleBoxClassName}
        textClassName={titleTextClassName}
      />

      <ProjectDescSlides
        current={current}
        boxClassName={descBoxClassName}
        textClassName={descTextClassName}
      />

      <ProjectDateSlides
        current={current}
        boxClassName={dateBoxClassName}
        textClassName={dateTextClassName}
      />
    </div>
  );
}
