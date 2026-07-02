'use client';

import { useEffect, useState } from 'react';

/**
 * Live HH:MM clock in the pixel face with the 3D echo — an homage to the
 * digital-clock reference the site's design is based on. Updates once a
 * minute; renders --:-- until mounted to avoid hydration mismatch.
 */
export default function PixelClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(
        `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
      );
    };
    update();

    // Re-sync at the top of each minute, then tick every 60s.
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      update();
      interval = setInterval(update, 60_000);
    }, 60_000 - (Date.now() % 60_000));

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <span
      className={`font-pixel pixel-3d text-foreground ${className ?? ''}`}
      suppressHydrationWarning
    >
      {time ?? '--:--'}
    </span>
  );
}
