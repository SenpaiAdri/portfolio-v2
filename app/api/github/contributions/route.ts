import { NextResponse } from "next/server";

const USERNAME = "SenpaiAdri";
const UPSTREAM = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`;

/** Cache upstream for 12h on the server (ISR-style) + CDN. */
export const revalidate = 43200;

type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type UpstreamResponse = {
  total: Record<string, number>;
  contributions: ContributionDay[];
};

export async function GET() {
  try {
    const res = await fetch(UPSTREAM, {
      next: { revalidate: 43200 },
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Upstream contributions fetch failed" },
        { status: 502 },
      );
    }

    const data = (await res.json()) as UpstreamResponse;

    // Sanitize untrusted upstream shape so a malformed day can't break the grid.
    const contributions: ContributionDay[] = Array.isArray(data.contributions)
      ? data.contributions
          .filter(
            (day): day is ContributionDay =>
              !!day &&
              typeof day.date === "string" &&
              /^\d{4}-\d{2}-\d{2}$/.test(day.date),
          )
          .map((day) => ({
            date: day.date,
            count:
              Number.isFinite(day.count) && day.count > 0
                ? Math.floor(day.count)
                : 0,
            level:
              Number.isFinite(day.level as number) && (day.level as number) >= 0
                ? (Math.min(4, Math.floor(day.level as number)) as ContributionDay["level"])
                : 0,
          }))
      : [];
    const total =
      Number.isFinite(data.total?.lastYear) && data.total.lastYear > 0
        ? Math.floor(data.total.lastYear)
        : 0;

    return NextResponse.json(
      {
        username: USERNAME,
        total,
        contributions,
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=43200, stale-while-revalidate=86400",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to load contributions" },
      { status: 502 },
    );
  }
}
