export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">About Me</h1>

      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Professional Bio</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            I&apos;m a passionate web developer with expertise in building modern, responsive, and scalable web applications.
            With a strong foundation in both frontend and backend technologies, I create seamless digital experiences
            that solve real-world problems.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            My journey in web development started with a curiosity about how websites work, and has evolved into a
            career focused on creating innovative solutions using cutting-edge technologies.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Education</h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Software Engineer</h3>
            <p className="text-gray-600 dark:text-gray-400">Brigham Young University Idaho</p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Software engineering major and web development minor with a focus on full-stack development.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Experience</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Full-Stack Web Developer</h3>
              <p className="text-gray-600 dark:text-gray-400">DataThink.io • September 2025 - Present</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Description of your role and key achievements.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Previous Job Title</h3>
              <p className="text-gray-600 dark:text-gray-400">Previous Company • Duration</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Description of your role and key achievements.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Frontend</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                <li>React & Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Responsive Design</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Backend</h3>
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
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Download Resume</h2>
          <a
            href="/resume.pdf"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Download Resume (PDF)
          </a>
        </section>
      </div>
    </div>
  );
}
