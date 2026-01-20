import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gray-50 dark:bg-black py-20 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold mb-6 text-black dark:text-white">
          Welcome to My <span className="dark:text-neon">Portfolio</span>
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          My name is Oscar Ramos and I am a Full Stack Developer and software engineer.
          Explore my projects and get in touch!
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/projects"
            className="bg-black dark:bg-neon text-white dark:text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:shadow-neon transition-all"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="bg-transparent border-2 border-black dark:border-neon text-black dark:text-neon px-8 py-3 rounded-lg font-semibold hover:bg-black hover:text-white dark:hover:bg-neon dark:hover:text-black transition-all"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
}
