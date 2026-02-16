'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

interface HobbyItem {
  src: string;
  alt: string;
  caption?: string;
}

export default function HobbiesCarousel({ items }: { items: HobbyItem[] }) {
  const [current, setCurrent] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating.current || index === current) return;
      isAnimating.current = true;

      const direction = index > current ? 1 : -1;

      gsap.to(imageRef.current, {
        opacity: 0,
        x: -40 * direction,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setCurrent(index);
          gsap.set(imageRef.current, { x: 40 * direction });
          gsap.to(imageRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.35,
            ease: 'power2.out',
            onComplete: () => {
              isAnimating.current = false;
            },
          });
        },
      });
    },
    [current]
  );

  const next = useCallback(
    () => goTo(current === items.length - 1 ? 0 : current + 1),
    [current, items.length, goTo]
  );
  const prev = () => goTo(current === 0 ? items.length - 1 : current - 1);

  // Auto-advance every 3 seconds
  useEffect(() => {
    timerRef.current = setInterval(next, 3000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next]);

  // Reset timer on manual interaction
  const handleManual = (action: () => void) => {
    if (timerRef.current) clearInterval(timerRef.current);
    action();
    timerRef.current = setInterval(next, 3000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Main image */}
      <div className="relative w-full max-w-lg aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src={items[current].src}
            alt={items[current].alt}
            fill
            className="object-cover"
          />
          {items[current].caption && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <span className="text-white font-medium text-lg px-4 py-3">
                {items[current].caption}
              </span>
            </div>
          )}
        </div>

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
