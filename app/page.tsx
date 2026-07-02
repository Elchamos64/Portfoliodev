import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiMongodb, SiGooglecloud, SiGit } from 'react-icons/si';
import { BiLogoPostgresql } from 'react-icons/bi';
import dbConnect from '@/lib/mongodb';
import Project from '@/lib/models/Project';

export const dynamic = 'force-dynamic';

const SKILLS = [
  { name: 'next.js', icon: SiNextdotjs },
  { name: 'react', icon: SiReact },
  { name: 'typescript', icon: SiTypescript },
  { name: 'tailwind', icon: SiTailwindcss },
  { name: 'mongodb', icon: SiMongodb },
  { name: 'gcp', icon: SiGooglecloud },
  { name: 'git', icon: SiGit },
  { name: 'postgresql', icon: BiLogoPostgresql },
];

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
      <Hero />

      {/* Featured Projects */}
      <section id="featured-projects" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <ScrollReveal variant="fade-up">
          <div className="mb-8 sm:mb-10">
            <p className="font-mono text-sm text-muted">
              <span className="text-accent">$</span> ls ~/featured-projects
            </p>
            <h2 className="font-pixel pixel-3d text-foreground text-base sm:text-lg mt-3">
              Featured Projects
            </h2>
          </div>
        </ScrollReveal>
        {featuredProjects.length > 0 ? (
          <ScrollReveal variant="fade-up" stagger={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {featuredProjects.map((project: any) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </ScrollReveal>
        ) : (
          <p className="font-mono text-sm text-muted">
            {'// nothing here yet — check back soon'}
          </p>
        )}
      </section>

      {/* ASCII divider — trial: dotted mono rule instead of a border line */}
      <div aria-hidden="true" className="select-none overflow-hidden">
        <p className="font-mono text-xs text-muted text-center tracking-[0.75em] whitespace-nowrap">
          ··············
        </p>
      </div>

      {/* Skills */}
      <section id="skills" className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal variant="fade-up">
            <div className="mb-8 sm:mb-10">
              <p className="font-mono text-sm text-muted">
                <span className="text-accent">$</span> cat skills.txt
              </p>
              <h2 className="font-pixel pixel-3d text-foreground text-base sm:text-lg mt-3">
                Skills &amp; Tech
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" stagger={0.06}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {SKILLS.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="group flex items-center gap-3 border border-border bg-surface px-4 py-3 transition-colors hover:border-foreground"
                  >
                    <Icon className="text-2xl text-muted group-hover:text-foreground transition-colors" />
                    <span className="font-mono text-sm text-foreground">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
