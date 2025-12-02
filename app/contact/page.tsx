import ContactForm from '@/components/ContactForm';

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Get In Touch
      </h1>

      <p className="text-center text-gray-600 dark:text-gray-300 mb-12 text-lg">
        Have a question or want to work together? Feel free to reach out!
      </p>

      <ContactForm />

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
          <p className="text-gray-600 dark:text-gray-300">oscar.ramos.andres@gmail.com</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">GitHub</h3>
          <a
            href="https://github.com/Elchamos64"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Elchamos64
          </a>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">LinkedIn</h3>
          <a
            href="https://www.linkedin.com/in/oscar-ramos-7aab1a237/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Oscar Ramos
          </a>
        </div>
      </div>
    </div>
  );
}
