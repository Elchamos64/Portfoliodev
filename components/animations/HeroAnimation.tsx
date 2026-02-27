'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface HeroAnimationProps {
  children: React.ReactNode;
}

export default function HeroAnimation({ children }: HeroAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.from('[data-hero-photo]', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          '[data-hero-title]',
          { y: 20, opacity: 0, duration: 0.5 },
          '-=0.2'
        )
        .from(
          '[data-hero-socials] a',
          { y: 15, opacity: 0, duration: 0.4, stagger: 0.1 },
          '-=0.1'
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
