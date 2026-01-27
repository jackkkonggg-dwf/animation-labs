'use client';

import { useRef, ReactNode } from 'react';
import { useGSAP } from '@gsap/react';

interface HorizontalScrollWrapperProps {
  children: ReactNode;
  sectionId?: string;
  onProgress?: (progress: number) => void;
}

export function HorizontalScrollWrapper({ children, sectionId, onProgress }: HorizontalScrollWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(async () => {
    const gsap = (await import('gsap')).default;
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');

    gsap.registerPlugin(useGSAP, ScrollTrigger);

    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const cards = container?.querySelectorAll('.horizontal-scroll-card');

    if (!container || !wrapper || !cards || cards.length === 0) return;

    // Calculate the scroll distance based on wrapper width minus viewport width
    const scrollDistance = wrapper.scrollWidth - window.innerWidth;

    // Set initial state for cards (invisible and offset from the right)
    gsap.set(cards, { opacity: 0, x: 100 });

    // Create staggered entry animation for cards
    gsap.to(cards, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });

    // Create the horizontal scroll animation
    gsap.to(wrapper, {
      x: () => -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        id: sectionId || 'horizontal-scroll',
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Dispatch custom event for progress tracking
          window.dispatchEvent(new CustomEvent('horizontal-scroll-progress', { detail: self.progress }));
          onProgress?.(self.progress);
        },
      },
    });
  }, { scope: containerRef });

  return (
    <section
      id={sectionId}
      ref={containerRef}
      className="horizontal-scroll-section h-screen w-full overflow-hidden bg-black"
    >
      <div
        ref={wrapperRef}
        className="horizontal-scroll-wrapper flex items-center h-full pl-[5vw] pr-[5vw] -ml-[10vw] -mr-[10vw]"
        style={{ gap: '-6vw' }}
      >
        {children}
      </div>
    </section>
  );
}
