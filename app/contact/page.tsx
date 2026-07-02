import ContactForm from '@/components/ContactForm';
import TerminalWindow from '@/components/TerminalWindow';
import ScrollReveal from '@/components/animations/ScrollReveal';

const CHANNELS = [
  {
    label: 'email',
    value: 'oscar.ramos.andres@gmail.com',
    href: 'mailto:oscar.ramos.andres@gmail.com',
    external: false,
  },
  {
    label: 'github',
    value: 'Elchamos64',
    href: 'https://github.com/Elchamos64',
    external: true,
  },
  {
    label: 'linkedin',
    value: 'Oscar Ramos',
    href: 'https://www.linkedin.com/in/oscar-ramos-7aab1a237/',
    external: true,
  },
];

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <ScrollReveal variant="fade-up">
        <div className="mb-8 sm:mb-10">
          <p className="font-mono text-sm text-muted">
            <span className="text-accent">$</span> cd ~/contact
          </p>
          <h1 className="font-pixel pixel-3d text-foreground text-lg sm:text-xl mt-3">
            Get In Touch
          </h1>
          <p className="font-mono text-sm text-muted mt-4">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delay={0.1}>
        <TerminalWindow title="~/contact — zsh">
          <div className="p-6 sm:p-10">
            <ContactForm />
          </div>
        </TerminalWindow>
      </ScrollReveal>

      <ScrollReveal variant="fade-up" delay={0.15}>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {CHANNELS.map(({ label, value, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group border border-border bg-surface px-4 py-3 font-mono text-sm transition-colors hover:border-foreground"
            >
              <span className="block text-muted">
                <span className="text-accent">$</span> {label}:
              </span>
              <span className="block text-foreground mt-1 truncate group-hover:underline">
                {value}
              </span>
            </a>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
