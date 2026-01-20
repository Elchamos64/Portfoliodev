import { notFound } from 'next/navigation';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Project from '@/lib/models/Project';

async function getProject(id: string) {
  try {
    await dbConnect();
    const project = await Project.findById(id).lean();
    if (!project) return null;
    // Convert MongoDB document to plain object with string _id
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
        className="text-gray-600 dark:text-neon hover:underline mb-8 inline-block"
      >
        ← Back to Projects
      </Link>

      <h1 className="text-4xl font-bold text-black dark:text-white mb-6">
        {project.title}
      </h1>

      {project.imageUrl && (
        <div className="mb-8 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-neon shadow-md dark:shadow-neon">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-96 object-cover"
          />
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
          Technologies Used
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech: string, index: number) => (
            <span
              key={index}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-neon rounded-full border border-gray-300 dark:border-neon"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
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
            className="bg-white dark:bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:shadow-neon transition-all border border-gray-300"
          >
            View on GitHub
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black dark:bg-neon text-white dark:text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:shadow-neon transition-all"
          >
            View Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
