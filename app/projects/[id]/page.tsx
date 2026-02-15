import { notFound } from 'next/navigation';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Project from '@/lib/models/Project';
import ScrollReveal from '@/components/animations/ScrollReveal';

async function getProject(id: string) {
  try {
    await dbConnect();
    const project = await Project.findById(id).lean();
    if (!project) return null;
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/projects"
        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8 inline-block"
      >
        &larr; Back to Projects
      </Link>

      <ScrollReveal variant="fade-up">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          {project.title}
        </h1>
      </ScrollReveal>

      {project.imageUrl && (
        <ScrollReveal variant="fade-up" delay={0.1}>
          <div className="mb-8 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-96 object-cover"
            />
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal variant="fade-up" delay={0.15}>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string, index: number) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delay={0.2}>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Description
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {project.longDescription || project.description}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal variant="scale-up" delay={0.25}>
        <div className="flex gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-gray-200 dark:border-gray-800 rounded-lg font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
            >
              View on GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 dark:hover:bg-gray-200 transition-all"
            >
              View Live Demo
            </a>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}
