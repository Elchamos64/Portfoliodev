'use client';

import { useState } from 'react';
import ProjectForm from '@/components/ProjectForm';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
}

function formatRepoName(name: string): string {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function NewProject() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [showImport, setShowImport] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);

  const handleToggleImport = async () => {
    if (!showImport && repos.length === 0) {
      setLoadingRepos(true);
      try {
        const res = await fetch('/api/github');
        if (res.ok) {
          const data = await res.json();
          setRepos(data.repos);
        }
      } finally {
        setLoadingRepos(false);
      }
    }
    setShowImport((prev) => !prev);
  };

  const handleSelectRepo = (repo: GitHubRepo) => {
    setSelectedRepo(repo);
    setShowImport(false);
  };

  const prefilledProject = selectedRepo
    ? {
        title: formatRepoName(selectedRepo.name),
        description: selectedRepo.description || '',
        technologies: selectedRepo.language ? [selectedRepo.language] : [],
        githubUrl: selectedRepo.html_url,
        liveUrl: selectedRepo.homepage || '',
        featured: false,
        order: 0,
      }
    : undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
        {/* Import from GitHub */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <button
            onClick={handleToggleImport}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="font-medium text-gray-900">Import from GitHub</span>
              {selectedRepo && (
                <span className="text-sm text-blue-600 ml-1">
                  — {formatRepoName(selectedRepo.name)} selected
                </span>
              )}
            </div>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${showImport ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showImport && (
            <div className="border-t border-gray-100 px-6 py-4">
              {loadingRepos ? (
                <p className="text-sm text-gray-500 py-2">Loading repositories...</p>
              ) : repos.length === 0 ? (
                <p className="text-sm text-gray-500 py-2">No repositories found.</p>
              ) : (
                <ul className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                  {repos.map((repo) => (
                    <li key={repo.id}>
                      <button
                        onClick={() => handleSelectRepo(repo)}
                        className="w-full text-left py-3 px-1 hover:bg-gray-50 rounded transition-colors"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-medium text-sm text-gray-900">
                            {formatRepoName(repo.name)}
                          </span>
                          {repo.language && (
                            <span className="text-xs text-gray-400 shrink-0">{repo.language}</span>
                          )}
                        </div>
                        {repo.description && (
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                            {repo.description}
                          </p>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Project form — re-mounts with new key when a repo is selected */}
        <div className="bg-white shadow rounded-lg p-6">
          <ProjectForm key={selectedRepo?.id ?? 'empty'} project={prefilledProject} />
        </div>
      </main>
    </div>
  );
}
