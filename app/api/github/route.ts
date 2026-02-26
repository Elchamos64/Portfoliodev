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

  const since = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  try {
    const [reposRes, commitsRes] = await Promise.all([
      fetch(
        `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=30`,
        fetchOpts
      ),
      fetch(
        `https://api.github.com/search/commits?q=author:${USERNAME}+committer-date:>${since}&sort=committer-date&order=desc&per_page=100`,
        fetchOpts
      ),
    ]);

    if (!reposRes.ok || !commitsRes.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch GitHub data' },
        { status: 502 }
      );
    }

    const repos = await reposRes.json();
    const commitsData = await commitsRes.json();

    return NextResponse.json({ repos, commits: commitsData.items ?? [] });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
