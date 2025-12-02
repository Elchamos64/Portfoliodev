import { notFound } from 'next/navigation';
import Link from 'next/link';

async function getProject(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/projects/${id}`, {
      cache: 'no-store'
    });
    if (!response.ok) return null;
    return response.json();
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
        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 mb-8 inline-block"
      >
        ← Back to Projects
      </Link>

      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        {project.title}
      </h1>

      {project.imageUrl && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-96 object-cover"
          />
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Technologies Used
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech: string, index: number) => (
            <span
              key={index}
              className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Description
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {project.longDescription || project.description}
        </p>
      </div>

      <div className="flex gap-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            View on GitHub
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
