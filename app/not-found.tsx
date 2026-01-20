import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-black dark:text-neon mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-black dark:bg-neon text-white dark:text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:shadow-neon transition-all"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
