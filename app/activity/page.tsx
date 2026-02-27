'use client';

import { useState } from 'react';
import { FiGithub, FiStar, FiGitBranch, FiCode } from 'react-icons/fi';
import ScrollReveal from '@/components/animations/ScrollReveal';
import GitHubContributionGraph from '@/components/GitHubContributionGraph';
import { useEffect } from 'react';

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface CommitResult {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: { date: string };
  };
  repository: {
    name: string;
    html_url: string;
  };
}

type Tab = 'repos' | 'commits';

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function ActivityPage() {
  const [tab, setTab] = useState<Tab>('repos');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [commits, setCommits] = useState<CommitResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/github')
      .then((res) => {
        if (!res.ok) throw new Error('fetch failed');
        return res.json();
      })
      .then((data) => {
        setRepos(data.repos);
        setCommits(data.commits);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const tabClass = (t: Tab) =>
    `px-4 py-2 rounded-lg font-semibold transition-all ${
      tab === t
        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
        : 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600'
    }`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <ScrollReveal variant="fade-up">
        <div className="flex items-center gap-3 mb-2">
          <FiGithub className="w-8 h-8 text-gray-900 dark:text-white" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            GitHub Activity
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Public repositories and commits from the last 60 days for{' '}
          <a
            href="https://github.com/Elchamos64"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Elchamos64
          </a>
        </p>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delay={0.1}>
        <div className="mb-8 p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
          <GitHubContributionGraph />
        </div>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delay={0.15}>
        <div className="flex gap-2 mb-8">
          <button className={tabClass('repos')} onClick={() => setTab('repos')}>
            Repositories
          </button>
          <button className={tabClass('commits')} onClick={() => setTab('commits')}>
            Commits
          </button>
        </div>
      </ScrollReveal>

      {loading && (
        <p className="text-center text-gray-600 dark:text-gray-400">
          Loading GitHub data...
        </p>
      )}

      {error && (
        <p className="text-center text-gray-600 dark:text-gray-400">
          Failed to load GitHub data. Please try again later.
        </p>
      )}

      {/* ── Repos tab ── */}
      {!loading && !error && tab === 'repos' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, i) => (
              <ScrollReveal
                key={repo.id}
                variant="fade-up"
                delay={(i % 3) * 0.08}
                className="h-full"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-full flex flex-col p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:border-gray-400 dark:hover:border-gray-600 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h2 className="font-semibold text-gray-900 dark:text-white group-hover:underline break-all">
                      {repo.name}
                    </h2>
                    <FiGithub className="shrink-0 w-4 h-4 text-gray-400" />
                  </div>

                  {repo.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-1">
                      {repo.description}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-auto">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <FiCode className="w-3 h-3" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <FiStar className="w-3 h-3" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiGitBranch className="w-3 h-3" />
                      {repo.forks_count}
                    </span>
                    <span className="ml-auto">{timeAgo(repo.updated_at)}</span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>

        </>
      )}

      {/* ── Commits tab ── */}
      {!loading && !error && tab === 'commits' && (
        <>
          <div className="flex flex-col gap-3">
            {commits.length === 0 && (
              <p className="text-center text-gray-600 dark:text-gray-400">
                No commits found in the last 60 days.
              </p>
            )}
            {commits.map((c, i) => (
              <ScrollReveal key={c.sha} variant="fade-up" delay={i * 0.08}>
                <a
                  href={c.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:border-gray-400 dark:hover:border-gray-600 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 group"
                >
                  <span className="font-mono text-xs text-gray-400 shrink-0 pt-0.5 w-16">
                    {c.sha.slice(0, 7)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white group-hover:underline line-clamp-2">
                      {c.commit.message.split('\n')[0]}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {c.repository.name}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">
                    {timeAgo(c.commit.author.date)}
                  </span>
                </a>
              </ScrollReveal>
            ))}
          </div>

        </>
      )}
    </div>
  );
}
