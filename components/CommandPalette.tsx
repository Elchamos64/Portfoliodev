'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import TerminalWindow from '@/components/TerminalWindow';

interface Command {
  id: string;
  label: string; // terminal-style command shown in the list
  hint: string; // short description, right-aligned
  keywords: string; // extra match terms
  run: () => void;
}

function isEditable(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  return (
    el.tagName === 'INPUT' ||
    el.tagName === 'TEXTAREA' ||
    el.tagName === 'SELECT' ||
    el.isContentEditable
  );
}

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const commands = useMemo<Command[]>(
    () => [
      { id: 'home', label: 'cd ~', hint: 'home', keywords: 'home main start', run: () => router.push('/') },
      { id: 'about', label: 'cd ~/about', hint: 'about me', keywords: 'about bio', run: () => router.push('/about') },
      { id: 'projects', label: 'cd ~/projects', hint: 'all projects', keywords: 'projects work portfolio', run: () => router.push('/projects') },
      { id: 'activity', label: 'cd ~/activity', hint: 'github activity', keywords: 'activity github commits graph', run: () => router.push('/activity') },
      { id: 'contact', label: 'cd ~/contact', hint: 'get in touch', keywords: 'contact message form', run: () => router.push('/contact') },
      {
        id: 'theme',
        label: 'toggle --theme',
        hint: 'light / dark',
        keywords: 'theme dark light mode toggle',
        run: () => {
          const next = !document.documentElement.classList.contains('dark');
          document.documentElement.classList.toggle('dark', next);
          localStorage.setItem('theme', next ? 'dark' : 'light');
        },
      },
      {
        id: 'resume',
        label: 'open resume.pdf',
        hint: 'download resume',
        keywords: 'resume cv pdf download',
        run: () => window.open('/Oscar_Ramos_Resume.pdf', '_blank'),
      },
      {
        id: 'github',
        label: 'open github',
        hint: 'github.com/Elchamos64',
        keywords: 'github code repos',
        run: () => window.open('https://github.com/Elchamos64', '_blank'),
      },
      {
        id: 'linkedin',
        label: 'open linkedin',
        hint: 'linkedin profile',
        keywords: 'linkedin social',
        run: () => window.open('https://www.linkedin.com/in/oscar-ramos-7aab1a237/', '_blank'),
      },
      {
        id: 'email',
        label: 'mail oscar',
        hint: 'send an email',
        keywords: 'email mail contact',
        run: () => {
          window.location.href = 'mailto:oscar.ramos.andres@gmail.com';
        },
      },
    ],
    [router]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.keywords.includes(q) || c.hint.toLowerCase().includes(q)
    );
  }, [commands, query]);

  // Global shortcuts: ⌘K / Ctrl+K toggles; "/" opens (outside inputs); Esc closes.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === '/' && !open && !isEditable(e.target)) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    const onOpenEvent = () => setOpen(true);

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('open-cmdk', onOpenEvent);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('open-cmdk', onOpenEvent);
    };
  }, [open]);

  // Reset + focus + scroll-lock on open.
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // focus after paint
      requestAnimationFrame(() => inputRef.current?.focus());
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => setSelected(0), [query]);

  // Keep the selected row in view.
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-selected="true"]')
      ?.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  const runCommand = (cmd: Command) => {
    setOpen(false);
    cmd.run();
  };

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === 'Enter' && filtered[selected]) {
      e.preventDefault();
      runCommand(filtered[selected]);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center px-4 pt-[15vh]"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <TerminalWindow title="~/oscar-ramos — cmd">
          {/* Prompt input */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-3 font-mono text-sm">
            <span className="text-accent">$</span>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="type a command…"
              className="flex-1 bg-transparent text-foreground placeholder:text-muted focus:outline-none"
              aria-label="Command input"
            />
          </div>

          {/* Results */}
          <ul ref={listRef} className="max-h-72 overflow-y-auto font-mono text-sm" role="listbox">
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-muted">
                zsh: command not found: {query}
              </li>
            )}
            {filtered.map((cmd, i) => (
              <li key={cmd.id} role="option" aria-selected={i === selected}>
                <button
                  type="button"
                  data-selected={i === selected}
                  onClick={() => runCommand(cmd)}
                  onMouseEnter={() => setSelected(i)}
                  className={`w-full flex items-baseline justify-between gap-4 px-4 py-2.5 text-left transition-colors ${
                    i === selected ? 'bg-surface-2 text-foreground' : 'text-muted'
                  }`}
                >
                  <span className="truncate">
                    <span className={`text-accent ${i === selected ? '' : 'invisible'}`}>&gt; </span>
                    {cmd.label}
                  </span>
                  <span className="text-xs text-muted shrink-0">{cmd.hint}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Hint bar */}
          <div className="border-t border-border px-4 py-2 font-mono text-xs text-muted">
            ↑↓ select · ↵ run · esc close
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}
