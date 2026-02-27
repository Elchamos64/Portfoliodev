'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <nav className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              Oscar Ramos
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 hover:-translate-y-0.5 transition-all duration-200"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 hover:-translate-y-0.5 transition-all duration-200"
            >
              About
            </Link>
            <Link
              href="/projects"
              className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 hover:-translate-y-0.5 transition-all duration-200"
            >
              Projects
            </Link>
            <Link
              href="/activity"
              className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 hover:-translate-y-0.5 transition-all duration-200"
            >
              Activity
            </Link>
            <Link
              href="/contact"
              className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 hover:-translate-y-0.5 transition-all duration-200"
            >
              Contact
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 hover:scale-110 active:scale-95 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
