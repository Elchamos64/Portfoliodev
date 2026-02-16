import ScrollReveal from '@/components/animations/ScrollReveal';
import HobbiesCarousel from '@/components/HobbiesCarousel';

const hobbies = [
  { src: '/images/hobbies/family.jpeg', alt: 'Hobby 1' },
  { src: '/images/hobbies/soccer.jpeg', alt: 'Hobby 2' },
  { src: '/images/hobbies/beach.jpeg', alt: 'Hobby 3'},
  { src: '/images/hobbies/travel.jpeg', alt: 'Hobby 4'},
];

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <ScrollReveal variant="fade-up">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">About Me</h1>
      </ScrollReveal>

      <div className="prose dark:prose-invert max-w-none">
        <ScrollReveal variant="fade-up">
          <section className="mb-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              I&apos;m a passionate software engineer. I have experience building full-stack web applications.
              When I&apos;m not coding, I also enjoy playing and watching soccer, hiking, and spending time with my family. I am currently a software engineer at DataThink.io.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Hobbies & Interests</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              When I&apos;m not coding, here are some things I enjoy.
            </p>
            <HobbiesCarousel items={hobbies} />
          </section>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Education</h2>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Software Engineer</h3>
              <p className="text-gray-600 dark:text-gray-400">Brigham Young University Idaho</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Bachelor of Science in Software Engineering, with a minor in Web Development.
              </p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Experience</h2>
          </section>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" stagger={0.15}>
          <div className="space-y-6 mb-12">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Full-Stack Web Developer</h3>
              <p className="text-gray-600 dark:text-gray-400">DataThink.io • September 2025 - Present</p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                <li>Built and maintain a full-stack order management platform using React, Python (FastAPI), and PostgreSQL</li>
                <li>Monitor and maintain production systems, rapidly deploying fixes and updates to improve performance</li>
                <li>Streamline ordering and patient management workflows</li>
                <li>Practice Agile development through bi-weekly sprint planning, weekly stand-ups, and regular code reviews</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Frontend Web Developer</h3>
              <p className="text-gray-600 dark:text-gray-400">Vorp Energy • May 2025 - September 2025</p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                <li>Maintain and update WordPress website content, including WooCommerce product pages</li>
                <li>Build and style new pages using WordPress and Visual Composer based on Canva design mockups</li>
                <li>Ensure all site updates are responsive and visually aligned with brand guidelines</li>
                <li>Collaborate with the Marketing Manager to prioritize and execute web content updates</li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Skills & Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Frontend</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                  <li>React & Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Responsive Design</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Backend</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Node.js</li>
                  <li>MongoDB</li>
                  <li>REST APIs</li>
                  <li>Database Design</li>
                </ul>
              </div>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal variant="scale-up">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Download Resume</h2>
            <a
              href="/Oscar_Ramos_Resume.pdf"
              download="Oscar_Ramos_Resume.pdf"
              className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 dark:hover:bg-gray-200 transition-all"
            >
              Download Resume (PDF)
            </a>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
