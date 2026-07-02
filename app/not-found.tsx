'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TerminalWindow from '@/components/TerminalWindow';

export default function NotFound() {
  const pathname = usePathname();

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 py-16">
      <div className="w-full max-w-2xl">
        <TerminalWindow title="~/oscar-ramos — zsh">
          <div className="p-8 sm:p-12 space-y-8 font-mono">
            <div>
              <p className="text-sm sm:text-base text-muted break-all">
                <span className="text-accent">$</span> cd {pathname}
              </p>
              <p className="text-foreground mt-1.5 break-all">
                cd: no such file or directory: {pathname}
              </p>
            </div>

            <h1 className="font-pixel pixel-3d [--p3d-gap:var(--surface)] text-foreground text-[3rem] sm:text-[4.5rem] leading-none">
              404
            </h1>

            <div>
              <p className="text-sm sm:text-base text-muted">
                <span className="text-accent">$</span> cd ~
                <span className="caret ml-2" aria-hidden="true" />
              </p>
              <Link
                href="/"
                className="mt-4 inline-flex items-center border border-border px-4 py-2 text-sm sm:text-base text-foreground hover:bg-foreground hover:text-background transition-colors"
              >
                take me home
              </Link>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}
