import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-black mt-16 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Oscar Ramos
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:oscar.ramos.andres@gmail.com"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:scale-125 hover:-translate-y-1 transition-all duration-200"
              aria-label="Email"
            >
              <HiOutlineMail className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/Elchamos64"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:scale-125 hover:-translate-y-1 transition-all duration-200"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/oscar-ramos-7aab1a237/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:scale-125 hover:-translate-y-1 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
