import Image from 'next/image';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

export default function Hero() {
  return (
    <section className="bg-gray-50 dark:bg-black min-h-screen flex items-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Profile Photo */}
          <div className="flex-shrink-0" data-hero-photo>
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
              <Image
                src="/profile.jpeg"
                alt="Oscar Ramos"
                width={256}
                height={256}
                className="w-full h-full object-cover object-[center_20%]"
                priority
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left">
            <h1 data-hero-name className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-3">
              Oscar Ramos
            </h1>
            <p data-hero-title className="text-xl text-gray-500 dark:text-gray-400 mb-6">
              Software Engineer
            </p>

            {/* Social Icons */}
            <div data-hero-socials className="flex items-center gap-5 justify-center md:justify-start">
              <a
                href="https://github.com/Elchamos64"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/oscar-ramos-7aab1a237/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:oscar.ramos.andres@gmail.com"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Email"
              >
                <HiOutlineMail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
