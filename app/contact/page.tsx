import ContactForm from '@/components/ContactForm';
import ScrollReveal from '@/components/animations/ScrollReveal';

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <ScrollReveal variant="fade-up">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Get In Touch
        </h1>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delay={0.1}>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          Have a question or want to work together? Feel free to reach out!
        </p>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delay={0.2}>
        <ContactForm />
      </ScrollReveal>

      <ScrollReveal variant="fade-up" stagger={0.15}>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
            <p className="text-gray-600 dark:text-gray-400">oscar.ramos.andres@gmail.com</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">GitHub</h3>
            <a
              href="https://github.com/Elchamos64"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Elchamos64
            </a>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">LinkedIn</h3>
            <a
              href="https://www.linkedin.com/in/oscar-ramos-7aab1a237/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Oscar Ramos
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
