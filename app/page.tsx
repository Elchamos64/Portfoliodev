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
          <ScrollReveal variant="fade-up" stagger={0.08}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                {
                  name: 'Next.js',
                  icon: <SiNextdotjs className="text-4xl text-gray-900 dark:text-white" />,
                  accent: '#a1a1aa',
                  bg: 'rgba(161,161,170,0.12)',
                },
                {
                  name: 'React',
                  icon: <SiReact className="text-4xl text-[#61DAFB]" />,
                  accent: '#61DAFB',
                  bg: 'rgba(97,218,251,0.12)',
                },
                {
                  name: 'TypeScript',
                  icon: <SiTypescript className="text-4xl text-[#3178C6]" />,
                  accent: '#3178C6',
                  bg: 'rgba(49,120,198,0.12)',
                },
                {
                  name: 'Tailwind CSS',
                  icon: <SiTailwindcss className="text-4xl text-[#06B6D4]" />,
                  accent: '#06B6D4',
                  bg: 'rgba(6,182,212,0.12)',
                },
                {
                  name: 'MongoDB',
                  icon: <SiMongodb className="text-4xl text-[#47A248]" />,
                  accent: '#47A248',
                  bg: 'rgba(71,162,72,0.12)',
                },
                {
                  name: 'GCP',
                  icon: <SiGooglecloud className="text-4xl text-[#4285F4]" />,
                  accent: '#4285F4',
                  bg: 'rgba(66,133,244,0.12)',
                },
                {
                  name: 'Git',
                  icon: <SiGit className="text-4xl text-[#F05032]" />,
                  accent: '#F05032',
                  bg: 'rgba(240,80,50,0.12)',
                },
                {
                  name: 'PostgreSQL',
                  icon: <BiLogoPostgresql className="text-4xl text-[#336791]" />,
                  accent: '#336791',
                  bg: 'rgba(51,103,145,0.12)',
                },
              ].map((skill) => (
                <div
                  key={skill.name}
                  className="group relative bg-white dark:bg-gray-900 pt-5 pb-4 px-4 rounded-2xl text-center border border-gray-200 dark:border-gray-800 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Top accent bar — visible by default, fades out on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl group-hover:opacity-0 transition-opacity duration-300 pointer-events-none"
                    style={{ background: skill.accent }}
                  />
                  {/* Full colored border — fades in on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ border: `2px solid ${skill.accent}` }}
                  />

                  {/* Icon container with brand tint */}
                  <div
                    className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: skill.bg }}
                  >
                    {skill.icon}
                  </div>

                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                    {skill.name}
                  </h3>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
