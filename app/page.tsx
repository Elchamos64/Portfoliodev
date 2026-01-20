import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import { SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiMongodb, SiNodedotjs, SiGit } from 'react-icons/si';
import { FaServer } from 'react-icons/fa';
import dbConnect from '@/lib/mongodb';
import Project from '@/lib/models/Project';

async function getFeaturedProjects() {
  try {
    await dbConnect();
    const projects = await Project.find({ featured: true }).sort({ order: 1, createdAt: -1 }).lean();
    // Convert MongoDB documents to plain objects and serialize _id
    return projects.map((project: any) => ({
      ...project,
      _id: project._id.toString(),
    }));
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
        <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">
          Featured <span className="dark:text-neon">Projects</span>
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

      <section className="bg-gray-50 dark:bg-black py-16 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-black dark:text-white">
            Skills & <span className="dark:text-neon">Technologies</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Next.js', icon: <SiNextdotjs className="text-5xl mb-3" /> },
              { name: 'React', icon: <SiReact className="text-5xl mb-3 text-blue-500 dark:text-neon" /> },
              { name: 'TypeScript', icon: <SiTypescript className="text-5xl mb-3 text-blue-600" /> },
              { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-5xl mb-3 text-teal-500 dark:text-neon" /> },
              { name: 'MongoDB', icon: <SiMongodb className="text-5xl mb-3 text-green-600" /> },
              { name: 'Node.js', icon: <SiNodedotjs className="text-5xl mb-3 text-green-500" /> },
              { name: 'Git', icon: <SiGit className="text-5xl mb-3 text-orange-600" /> },
              { name: 'REST APIs', icon: <FaServer className="text-5xl mb-3 text-gray-600 dark:text-neon" /> }
            ].map((skill) => (
              <div
                key={skill.name}
                className="bg-white dark:bg-black p-6 rounded-lg text-center border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-neon dark:hover:shadow-neon transition-all"
              >
                <div className="flex justify-center">
                  {skill.icon}
                </div>
                <h3 className="font-semibold text-black dark:text-white">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
