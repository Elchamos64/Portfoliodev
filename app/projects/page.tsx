'use client';

import { useState, useEffect, useCallback } from 'react';
import ProjectCard from '@/components/ProjectCard';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { Project } from '@/types';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = useCallback(() => {
    let filtered = projects;

    if (selectedTech !== 'all') {
      filtered = filtered.filter((project) =>
        project.technologies.includes(selectedTech)
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [projects, selectedTech, searchQuery]);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [filterProjects]);

  const allTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <ScrollReveal variant="fade-up">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">All Projects</h1>
      </ScrollReveal>

      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-gray-900 dark:focus:border-white bg-white dark:bg-black text-gray-900 dark:text-white"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTech('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedTech === 'all'
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600'
            }`}
          >
            All
          </button>
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedTech === tech
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-400">Loading projects...</p>
      ) : filteredProjects.length > 0 ? (
        <ScrollReveal key={`${selectedTech}-${searchQuery}`} variant="fade-up" stagger={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </ScrollReveal>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No projects found. Try adjusting your filters.
        </p>
      )}
    </div>
  );
}
