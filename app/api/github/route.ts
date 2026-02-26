import { NextResponse } from 'next/server';

const USERNAME = 'Elchamos64';

export async function GET() {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const fetchOpts: RequestInit = {
    headers,
    next: { revalidate: 300 },
  };

  try {
    const [reposRes, eventsRes] = await Promise.all([
      fetch(
        `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=10`,
        fetchOpts
      ),
      fetch(
        `https://api.github.com/users/${USERNAME}/events?per_page=30`,
        fetchOpts
      ),
    ]);

    if (!reposRes.ok || !eventsRes.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch GitHub data' },
        { status: 502 }
      );
    }

    const repos = await reposRes.json();
    const allEvents = await eventsRes.json();
    const events = allEvents.filter(
      (e: { type: string }) => e.type === 'PushEvent'
    );

    return NextResponse.json({ repos, events });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
