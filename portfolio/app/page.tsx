import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import { SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiMongodb, SiNodedotjs, SiGit } from 'react-icons/si';
import { FaServer } from 'react-icons/fa';

async function getFeaturedProjects() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/projects?featured=true`, {
      cache: 'no-store'
    });
    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div>
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Featured Projects
        </h2>
        {featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project: any) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No featured projects yet. Check back soon!
          </p>
        )}
      </section>

      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Next.js', icon: <SiNextdotjs className="text-5xl mb-3" /> },
              { name: 'React', icon: <SiReact className="text-5xl mb-3 text-blue-500" /> },
              { name: 'TypeScript', icon: <SiTypescript className="text-5xl mb-3 text-blue-600" /> },
              { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-5xl mb-3 text-teal-500" /> },
              { name: 'MongoDB', icon: <SiMongodb className="text-5xl mb-3 text-green-600" /> },
              { name: 'Node.js', icon: <SiNodedotjs className="text-5xl mb-3 text-green-500" /> },
              { name: 'Git', icon: <SiGit className="text-5xl mb-3 text-orange-600" /> },
              { name: 'REST APIs', icon: <FaServer className="text-5xl mb-3 text-gray-600" /> }
            ].map((skill) => (
              <div
                key={skill.name}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center">
                  {skill.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
