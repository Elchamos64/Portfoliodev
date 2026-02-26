'use client';

import { useState, useEffect } from 'react';

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

function getColorClass(count: number): string {
  if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
  if (count <= 3) return 'bg-green-200 dark:bg-green-900';
  if (count <= 6) return 'bg-green-400 dark:bg-green-700';
  if (count <= 9) return 'bg-green-600 dark:bg-green-500';
  return 'bg-green-800 dark:bg-green-300';
}

function getMonthLabels(
  weeks: ContributionWeek[]
): { label: string; index: number }[] {
  const labels: { label: string; index: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const firstDay = week.contributionDays[0];
    if (firstDay) {
      const month = new Date(firstDay.date).getUTCMonth();
      if (month !== lastMonth) {
        labels.push({
          label: new Date(firstDay.date).toLocaleDateString('en-US', {
            month: 'short',
            timeZone: 'UTC',
          }),
          index: i,
        });
        lastMonth = month;
      }
    }
  });
  return labels;
}

export default function GitHubContributionGraph() {
  const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);
  const [loading, setLoading] = useState(true);
  const [tokenRequired, setTokenRequired] = useState(false);
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    fetch('/api/github/contributions')
      .then((res) => {
        if (res.status === 401) {
          setTokenRequired(true);
          return null;
        }
        if (!res.ok) throw new Error('failed');
        return res.json();
      })
      .then((data) => {
        if (data) setCalendar(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse h-28 rounded-xl bg-gray-100 dark:bg-gray-900" />
    );
  }

  if (tokenRequired) {
    return (
      <p className="text-sm text-center text-gray-500 dark:text-gray-400 py-2">
        Add{' '}
        <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">
          GITHUB_TOKEN
        </code>{' '}
        to{' '}
        <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">
          .env.local
        </code>{' '}
        to enable the contribution graph.
      </p>
    );
  }

  if (!calendar) return null;

  const monthLabels = getMonthLabels(calendar.weeks);
  const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  return (
    <div>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">
            {calendar.totalContributions.toLocaleString()}
          </span>{' '}
          contributions in the last year
        </span>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <span>Less</span>
          {[0, 2, 5, 8, 11].map((n) => (
            <div
              key={n}
              className={`w-3 h-3 rounded-sm ${getColorClass(n)}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="w-full">
          {/* Month labels */}
          <div className="flex mb-1 pl-7 gap-[3px]">
            {calendar.weeks.map((_, i) => {
              const label = monthLabels.find((m) => m.index === i);
              return (
                <div key={i} className="flex-1 min-w-0 overflow-visible">
                  {label && (
                    <span className="text-[10px] text-gray-400 whitespace-nowrap">
                      {label.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Day labels + grid */}
          <div className="flex gap-[3px]">
            <div className="w-7 shrink-0 flex flex-col justify-around pb-[3px]">
              {DAY_LABELS.map((d, i) => (
                <span
                  key={i}
                  className="text-[10px] text-gray-400 text-right pr-1 leading-none"
                >
                  {d}
                </span>
              ))}
            </div>

            <div className="flex flex-1 gap-[3px]">
            {calendar.weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col flex-1 gap-[3px]">
                {Array.from({ length: 7 }).map((_, di) => {
                  const day = week.contributionDays[di];
                  if (!day) {
                    return <div key={di} className="w-full aspect-square" />;
                  }
                  return (
                    <div
                      key={di}
                      className={`w-full aspect-square rounded-sm cursor-default transition-opacity hover:opacity-75 ${getColorClass(day.contributionCount)}`}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltip({
                          text: `${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''} on ${new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}`,
                          x: rect.left + rect.width / 2,
                          y: rect.top,
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 px-2 py-1 text-xs bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded shadow-lg pointer-events-none whitespace-nowrap"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, calc(-100% - 8px))',
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
