import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import PixelClock from '@/components/PixelClock';

const SOCIALS = [
  { href: 'mailto:oscar.ramos.andres@gmail.com', label: 'Email', icon: HiOutlineMail, external: false },
  { href: 'https://github.com/Elchamos64', label: 'GitHub', icon: FaGithub, external: true },
  { href: 'https://www.linkedin.com/in/oscar-ramos-7aab1a237/', label: 'LinkedIn', icon: FaLinkedin, external: true },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted sm:flex-1">
            <span className="text-accent">$</span> echo &quot;&copy; {new Date().getFullYear()} Oscar Ramos&quot;
          </p>
          <PixelClock className="text-sm sm:text-base" />
          <div className="flex items-center gap-2 sm:flex-1 sm:justify-end">
            {SOCIALS.map(({ href, label, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="p-2 border border-border text-muted hover:bg-foreground hover:text-background transition-colors"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
