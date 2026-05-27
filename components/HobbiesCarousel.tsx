'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HobbyItem {
  src: string;
  alt: string;
  caption?: string;
}

const TRANSITION_MS = 500;

export default function HobbiesCarousel({ items }: { items: HobbyItem[] }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % items.length) + items.length) % items.length;
      setCurrent(next);
    },
    [items.length]
  );

  const next = useCallback(
    () => goTo(current === items.length - 1 ? 0 : current + 1),
    [current, items.length, goTo]
  );
  const prev = () => goTo(current === 0 ? items.length - 1 : current - 1);

  useEffect(() => {
    timerRef.current = setInterval(next, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 4000);
  };

  const handleManual = (action: () => void) => {
    action();
    resetTimer();
  };

  // Touch swipe support
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      handleManual(diff < 0 ? next : prev);
    }
    touchStartX.current = null;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Main image */}
      <div
        className="relative w-full max-w-lg aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* All slides stacked and preloaded; toggle opacity for a clean crossfade */}
        {items.map((item, i) => (
          <div
            key={item.src}
            className="absolute inset-0"
            style={{
              opacity: i === current ? 1 : 0,
              transition: `opacity ${TRANSITION_MS}ms ease-in-out`,
              pointerEvents: i === current ? 'auto' : 'none',
            }}
            aria-hidden={i !== current}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 100vw, 512px"
              className="object-cover"
              priority={i === 0}
            />
            {item.caption && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <span className="text-white font-medium text-base sm:text-lg px-4 py-3">
                  {item.caption}
                </span>
              </div>
            )}
          </div>
        ))}

        {/* Arrows */}
        <button
          onClick={() => handleManual(prev)}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors z-10"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => handleManual(next)}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors z-10"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => handleManual(() => goTo(i))}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === current
                ? 'bg-gray-900 dark:bg-white'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
