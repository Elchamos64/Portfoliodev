'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Variant = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade-in' | 'scale-up';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
}

const variantConfig: Record<Variant, gsap.TweenVars> = {
  'fade-up': { y: 40, opacity: 0 },
  'fade-down': { y: -40, opacity: 0 },
  'fade-left': { x: -40, opacity: 0 },
  'fade-right': { x: 40, opacity: 0 },
  'fade-in': { opacity: 0 },
  'scale-up': { scale: 0.85, opacity: 0 },
};

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.7,
  stagger,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const targets = stagger ? el.children : el;
      gsap.from(targets, {
        ...variantConfig[variant],
        duration,
        delay,
        stagger: stagger || 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, el);

    return () => ctx.revert();
  }, [variant, delay, duration, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
