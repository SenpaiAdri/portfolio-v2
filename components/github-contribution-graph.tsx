"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Level = 0 | 1 | 2 | 3 | 4;

type ContributionDay = {
  date: string;
  count: number;
  level: Level;
};

type ApiPayload = {
  username: string;
  total: number;
  contributions: ContributionDay[];
};

/** Show the most recent N weeks so the grid fits the narrow hero cell. */
const VISIBLE_WEEKS = 26;

const LEVEL_STYLES: Record<Level, string> = {
  0: "bg-track",
  1: "bg-brand/15",
  2: "bg-brand/40",
  3: "bg-brand/70",
  4: "bg-brand",
};

/** Deterministic sparse pattern used for loading / offline fallback. */
function fallbackLevel(week: number, day: number): Level {
  const v = (week * 7 + day * 13) % 10;
  if (v < 5) return 0;
  if (v < 7) return 1;
  if (v < 8) return 2;
  if (v < 9) return 3;
  return 4;
}

function toWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  const weeks: (ContributionDay | null)[][] = [];
  let current: (ContributionDay | null)[] = [];

  if (days.length > 0) {
    // Pad the first column so weeks always start on Sunday.
    const firstWeekday = new Date(days[0].date + "T00:00:00").getDay();
    for (let i = 0; i < firstWeekday; i++) current.push(null);
  }

  for (const day of days) {
    current.push(day);
    if (current.length === 7) {
      weeks.push(current);
      current = [];
    }
  }
  if (current.length > 0) {
    while (current.length < 7) current.push(null);
    weeks.push(current);
  }
  return weeks;
}

function formatTooltip(day: ContributionDay): string {
  const label = new Date(day.date + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return `${day.count} contribution${day.count === 1 ? "" : "s"} on ${label}`;
}

function ContributionGrid({
  weeks,
  interactive,
}: {
  weeks: (ContributionDay | null)[][];
  interactive: boolean;
}) {
  return (
    <div
      role="img"
      aria-label="GitHub contribution activity"
      className="flex gap-0.75 lg:gap-1.5 "
    >
      {weeks.map((week, w) => (
        <div key={w} className="flex flex-col gap-0.75 lg:gap-1.5">
          {week.map((day, d) =>
            day === null ? (
              <span
                key={d}
                aria-hidden="true"
                className="h-2 w-2 rounded-xs opacity-0 lg:h-2.5 lg:w-2.5"
              />
            ) : (
              <span
                key={d}
                title={interactive ? formatTooltip(day) : undefined}
                aria-hidden="true"
                className={cn(
                  "h-2 w-2 rounded-xs lg:h-3 lg:w-3",
                  LEVEL_STYLES[day.level],
                  interactive &&
                    "transition-transform duration-150 motion-safe:hover:scale-125 motion-safe:hover:ring-1 motion-safe:hover:ring-brand-hover",
                )}
              />
            ),
          )}
        </div>
      ))}
    </div>
  );
}

export function GithubContributionGraph({ className }: { className?: string }) {
  const [data, setData] = useState<ApiPayload | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github/contributions", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("contributions fetch failed");
        return res.json() as Promise<ApiPayload>;
      })
      .then(setData)
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setFailed(true);
      });
    return () => controller.abort();
  }, []);

  const weeks = useMemo(() => {
    if (data) return toWeeks(data.contributions).slice(-VISIBLE_WEEKS);
    // Loading / offline: deterministic placeholder grid.
    const placeholder: (ContributionDay | null)[][] = Array.from(
      { length: VISIBLE_WEEKS },
      (_, w) =>
        Array.from({ length: 7 }, (_, d) => ({
          date: `placeholder-${w}-${d}`,
          count: 0,
          level: fallbackLevel(w, d),
        })),
    );
    return placeholder;
  }, [data]);

  const loading = !data && !failed;

  return (
    <div className={cn("flex flex-col items-end gap-2", className)}>
      <span className="sr-only">
        {data
          ? `${data.total} GitHub contributions in the last year`
          : failed
            ? "GitHub contribution graph unavailable"
            : "Loading GitHub contribution graph"}
      </span>

      <div className={cn(loading && "animate-pulse", failed && "opacity-60")}>
        <ContributionGrid weeks={weeks} interactive={!!data} />
      </div>
      {/* Label row — mirrors the hero "[ PATH ]" treatment */}
      <div className="flex items-baseline gap-3 text-[10px] tracking-widest whitespace-nowrap lg:text-xs">
        <span className="text-ink-muted">
          {data
            ? `${data.total} CONTRIBUTION${data.total === 1 ? "" : "S"} IN THE LAST YEAR`
            : failed
              ? "OFFLINE"
              : "LOADING..."}
        </span>
      </div>

      {/* Legend */}
      {/* <div className="flex items-center gap-1.5 text-[9px] tracking-widest text-gray-500 lg:text-[10px]">
        <span>LESS</span>
        {([0, 1, 2, 3, 4] as Level[]).map((level) => (
          <span
            key={level}
            aria-hidden="true"
            className={cn(
              "h-2 w-2 rounded-[2px]",
              LEVEL_STYLES[level],
              !data && "opacity-60",
            )}
          />
        ))}
        <span>MORE</span>
      </div> */}
    </div>
  );
}
