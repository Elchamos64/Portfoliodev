import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          I&apos;m a passionate web developer specializing in building exceptional digital experiences.
          Explore my projects and get in touch!
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/projects"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
}
