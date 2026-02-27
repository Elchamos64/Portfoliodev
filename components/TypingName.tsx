'use client';

import { useState, useEffect } from 'react';

interface TypingNameProps {
  text: string;
  className?: string;
  /** ms before typing starts — use to sync with page entrance animations */
  delay?: number;
  /** base ms per character (slight random variance is added automatically) */
  speed?: number;
}

export default function TypingName({
  text,
  className,
  delay = 400,
  speed = 90,
}: TypingNameProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const [cursorGone, setCursorGone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const startTyping = () => {
      let i = 0;

      const typeNext = () => {
        if (cancelled) return;
        if (i >= text.length) {
          setDone(true);
          return;
        }
        setDisplayed(text.slice(0, i + 1));
        i++;
        // slight random variance for a realistic feel
        const jitter = Math.random() * 50 - 25;
        timeoutId = setTimeout(typeNext, speed + jitter);
      };

      typeNext();
    };

    timeoutId = setTimeout(startTyping, delay);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [text, delay, speed]);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setCursorGone(true), 3000);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <span className={className}>
      {displayed}
      {!cursorGone && (
        <span
          className={`inline-block w-[5px] h-[0.8em] bg-current align-middle ml-1 rounded-sm ${
            done ? 'cursor-blink' : 'opacity-100'
          }`}
        />
      )}
    </span>
  );
}
