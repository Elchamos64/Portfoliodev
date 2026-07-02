import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col border border-border bg-surface font-mono transition-colors hover:border-foreground">
      {project.imageUrl && (
        <div className="h-56 bg-surface-2 overflow-hidden border-b border-border">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={400}
            height={224}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-foreground mb-2">
          {/* Stretched link: makes the whole card clickable without nesting anchors */}
          <Link
            href={`/projects/${project._id}`}
            className="hover:text-accent after:absolute after:inset-0 after:content-['']"
          >
            <span className="text-muted">&gt; </span>
            {project.title}
          </Link>
        </h3>
        <p className="text-sm text-muted mb-4 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-surface-2 text-muted text-xs border border-border"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-auto">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-2 px-3 py-1.5 border border-border text-sm text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              <FaGithub className="w-4 h-4" />
              code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-2 px-3 py-1.5 bg-foreground text-background text-sm hover:bg-accent transition-colors"
            >
              <FaExternalLinkAlt className="w-3.5 h-3.5" />
              live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
