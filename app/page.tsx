import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import HeroAnimation from '@/components/animations/HeroAnimation';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiMongodb, SiGooglecloud, SiGit } from 'react-icons/si';
import { BiLogoPostgresql } from 'react-icons/bi';
import dbConnect from '@/lib/mongodb';
import Project from '@/lib/models/Project';

export const dynamic = 'force-dynamic';

async function getFeaturedProjects() {
  try {
    await dbConnect();
    const projects = await Project.find({ featured: true }).sort({ order: 1, createdAt: -1 }).lean();
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
      <HeroAnimation>
        <Hero />
      </HeroAnimation>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ScrollReveal variant="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10">
            Featured Projects
          </h2>
        </ScrollReveal>
        {featuredProjects.length > 0 ? (
          <ScrollReveal variant="fade-up" stagger={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project: any) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </ScrollReveal>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No featured projects yet. Check back soon!
          </p>
        )}
      </section>

      <section className="bg-gray-50 dark:bg-black py-16 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10">
              Skills & Technologies
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" stagger={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Next.js', icon: <SiNextdotjs className="text-5xl mb-3" /> },
                { name: 'React', icon: <SiReact className="text-5xl mb-3 text-blue-500" /> },
                { name: 'TypeScript', icon: <SiTypescript className="text-5xl mb-3 text-blue-600" /> },
                { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-5xl mb-3 text-teal-500" /> },
                { name: 'MongoDB', icon: <SiMongodb className="text-5xl mb-3 text-green-600" /> },
                { name: 'GCP', icon: <SiGooglecloud className="text-5xl mb-3" /> },
                { name: 'Git', icon: <SiGit className="text-5xl mb-3 text-orange-600" /> },
                { name: 'PostgreSQL', icon: <BiLogoPostgresql className="text-5xl mb-3 text-blue-800" /> },
              ].map((skill) => (
                <div
                  key={skill.name}
                  className="bg-white dark:bg-gray-900 p-6 rounded-lg text-center border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex justify-center">{skill.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
