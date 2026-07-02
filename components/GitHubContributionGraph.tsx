'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

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
  if (count === 0) return 'contrib-0';
  if (count <= 3) return 'contrib-1';
  if (count <= 6) return 'contrib-2';
  if (count <= 9) return 'contrib-3';
  return 'contrib-4';
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
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Clamp tooltip horizontally so it never overflows the viewport
  useEffect(() => {
    if (!tooltip || !tooltipRef.current) return;
    const el = tooltipRef.current;
    const rect = el.getBoundingClientRect();
    const padding = 8;
    if (rect.left < padding) {
      el.style.left = `${tooltip.x + (padding - rect.left)}px`;
    } else if (rect.right > window.innerWidth - padding) {
      el.style.left = `${tooltip.x - (rect.right - (window.innerWidth - padding))}px`;
    }
  }, [tooltip]);

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
      <p className="font-mono text-sm text-muted py-10">
        <span className="text-accent">$</span> gh contributions --last-year
        <span className="caret ml-2" aria-hidden="true" />
      </p>
    );
  }

  if (tokenRequired) {
    return (
      <p className="font-mono text-sm text-center text-muted py-2">
        {'// add '}
        <code className="bg-surface-2 border border-border px-1">GITHUB_TOKEN</code>
        {' to '}
        <code className="bg-surface-2 border border-border px-1">.env.local</code>
        {' to enable the contribution graph'}
      </p>
    );
  }

  if (!calendar) return null;

  const monthLabels = getMonthLabels(calendar.weeks);
  const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  return (
    <div>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2 font-mono">
        <span className="text-sm text-muted">
          <span className="text-accent">$</span>{' '}
          <span className="font-bold text-foreground">
            {calendar.totalContributions.toLocaleString()}
          </span>{' '}
          contributions in the last year
        </span>
        <div className="flex items-center gap-1 text-xs text-muted">
          <span>less</span>
          {[0, 2, 5, 8, 11].map((n) => (
            <div key={n} className={`w-3 h-3 ${getColorClass(n)}`} />
          ))}
          <span>more</span>
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
                    <span className="font-mono text-[10px] text-muted whitespace-nowrap">
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
                  className="font-mono text-[10px] text-muted text-right pr-1 leading-none"
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
                      className={`w-full aspect-square cursor-default transition-opacity hover:opacity-75 ${getColorClass(day.contributionCount)}`}
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

      {/* Tooltip — rendered in document.body via portal to escape stacking contexts */}
      {tooltip && createPortal(
        <div
          ref={tooltipRef}
          className="fixed z-[9999] px-2 py-1 font-mono text-xs bg-foreground text-background pointer-events-none whitespace-nowrap"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, calc(-100% - 8px))',
          }}
        >
          {tooltip.text}
        </div>,
        document.body
      )}
    </div>
  );
}
