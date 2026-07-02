import Image from 'next/image';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import TerminalWindow from '@/components/TerminalWindow';

const SOCIALS = [
  {
    href: 'https://github.com/Elchamos64',
    label: 'github',
    icon: FaGithub,
    external: true,
  },
  {
    href: 'https://www.linkedin.com/in/oscar-ramos-7aab1a237/',
    label: 'linkedin',
    icon: FaLinkedin,
    external: true,
  },
  {
    href: 'mailto:oscar.ramos.andres@gmail.com',
    label: 'email',
    icon: HiOutlineMail,
    external: false,
  },
];

export default function Hero() {
  return (
    <section className="hero-enter min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 py-16">
      <div className="w-full max-w-3xl">
        <TerminalWindow title="~/oscar-ramos — zsh">
          {/* Body */}
          <div className="p-8 sm:p-12 space-y-8">
            {/* whoami + avatar */}
            <div className="flex items-start gap-5 sm:gap-7">
              <div className="flex-shrink-0 h-20 w-20 sm:h-28 sm:w-28 border border-border overflow-hidden">
                <Image
                  src="/profile.jpeg"
                  alt="Oscar Ramos"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover object-[center_20%]"
                  priority
                />
              </div>
              <div className="pt-1">
                <p className="text-sm sm:text-base text-muted">
                  <span className="text-accent">$</span> whoami
                </p>
                <h1 className="font-pixel pixel-3d [--p3d-gap:var(--surface)] text-foreground text-[1.75rem] sm:text-[2.5rem] md:text-[3.25rem] leading-[1.35] mt-3">
                  OSCAR
                  <br />
                  RAMOS
                  <span className="caret ml-2" aria-hidden="true" />
                </h1>
              </div>
            </div>

            {/* role */}
            <div>
              <p className="text-sm sm:text-base text-muted">
                <span className="text-accent">$</span> cat role.txt
              </p>
              <p className="text-foreground text-lg sm:text-xl mt-1.5">Software Engineer</p>
            </div>

            {/* links */}
            <div>
              <p className="text-sm sm:text-base text-muted">
                <span className="text-accent">$</span> ./connect
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2.5">
                {SOCIALS.map(({ href, label, icon: Icon, external }) => (
                  <a
                    key={label}
                    href={href}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm sm:text-base text-foreground hover:bg-foreground hover:text-background transition-colors"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}
