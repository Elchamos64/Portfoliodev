'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Project } from '@/types';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { gsap } from 'gsap';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) {
      router.push(`/projects/${project._id}`);
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const diameter = Math.max(card.offsetWidth, card.offsetHeight) * 2.5;
    const isDark = document.documentElement.classList.contains('dark');

    // Primary fill ripple
    const ripple = document.createElement('span');
    Object.assign(ripple.style, {
      position: 'absolute',
      borderRadius: '50%',
      width: `${diameter}px`,
      height: `${diameter}px`,
      left: `${x - diameter / 2}px`,
      top: `${y - diameter / 2}px`,
      background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.07)',
      pointerEvents: 'none',
      zIndex: '10',
    });
    card.appendChild(ripple);

    // Secondary ring ripple (slightly smaller, delayed)
    const ring = document.createElement('span');
    Object.assign(ring.style, {
      position: 'absolute',
      borderRadius: '50%',
      width: `${diameter * 0.6}px`,
      height: `${diameter * 0.6}px`,
      left: `${x - (diameter * 0.6) / 2}px`,
      top: `${y - (diameter * 0.6) / 2}px`,
      border: isDark ? '2px solid rgba(255,255,255,0.25)' : '2px solid rgba(0,0,0,0.1)',
      background: 'transparent',
      pointerEvents: 'none',
      zIndex: '10',
    });
    card.appendChild(ring);

    const tl = gsap.timeline({ onComplete: () => { ripple.remove(); ring.remove(); } });

    tl.fromTo(ripple,
      { scale: 0, opacity: 1 },
      { scale: 1, opacity: 0, duration: 0.55, ease: 'power2.out' }
    ).fromTo(ring,
      { scale: 0, opacity: 0.8 },
      { scale: 1, opacity: 0, duration: 0.5, ease: 'power2.out' },
      '<0.05'
    );

    // Navigate mid-animation for a snappy feel
    setTimeout(() => router.push(`/projects/${project._id}`), 180);
  };

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      className="relative cursor-pointer bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {project.imageUrl && (
        <div className="h-56 bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={400}
            height={224}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <FaGithub className="w-4 h-4" />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <FaExternalLinkAlt className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
