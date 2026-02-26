import { NextResponse } from 'next/server';

const USERNAME = 'Elchamos64';

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  if (!process.env.GITHUB_TOKEN) {
    return NextResponse.json({ error: 'token_required' }, { status: 401 });
  }

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: QUERY, variables: { login: USERNAME } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'fetch_failed' }, { status: 502 });
    }

    const data = await res.json();
    const calendar =
      data?.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return NextResponse.json({ error: 'no_data' }, { status: 404 });
    }

    return NextResponse.json(calendar);
  } catch {
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
