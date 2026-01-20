export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-black dark:text-white mb-8">About <span className="dark:text-neon">Me</span></h1>

      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Professional Bio</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            I&apos;m a passionate web developer with expertise in building modern, responsive, and scalable web applications.
            With a strong foundation in both frontend and backend technologies.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Education</h2>
          <div className="bg-white dark:bg-black p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-neon transition-colors mb-4">
            <h3 className="text-xl font-semibold text-black dark:text-white">Software Engineer</h3>
            <p className="text-gray-600 dark:text-neon">Brigham Young University Idaho</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Software engineering major and web development minor with a focus on full-stack development.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Experience</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-black p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-neon transition-colors">
              <h3 className="text-xl font-semibold text-black dark:text-white">Full-Stack Web Developer</h3>
              <p className="text-gray-600 dark:text-neon">DataThink.io • September 2025 - Present</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Description of your role and key achievements.
              </p>
            </div>
            <div className="bg-white dark:bg-black p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-neon transition-colors">
              <h3 className="text-xl font-semibold text-black dark:text-white">Previous Job Title</h3>
              <p className="text-gray-600 dark:text-neon">Previous Company • Duration</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Description of your role and key achievements.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-black dark:text-neon mb-3">Frontend</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                <li>React & Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Responsive Design</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black dark:text-neon mb-3">Backend</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                <li>Node.js</li>
                <li>MongoDB</li>
                <li>REST APIs</li>
                <li>Database Design</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Download Resume</h2>
          <a
            href="/resume.pdf"
            download="Oscar_Ramos_Resume.pdf"
            className="inline-block bg-black dark:bg-neon text-white dark:text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:shadow-neon transition-all"
          >
            Download Resume (PDF)
          </a>
        </section>
      </div>
    </div>
  );
}
