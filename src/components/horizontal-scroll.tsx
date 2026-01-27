'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Hero } from '@/components/hero';
import { ArtistCard } from '@/components/artist-card';
import { ARTIST_CARDS } from '@/components/artist-cards-data';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

interface HorizontalScrollProps {
  routeId?: string;
}

export function HorizontalScroll({ routeId = 'horizontal-scroll' }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const cards = container?.querySelectorAll('.horizontal-scroll-card');

    if (!container || !wrapper || !cards || cards.length === 0) return;

    // Track all ScrollTriggers created for cleanup
    const triggers: ScrollTrigger[] = [];

    // Calculate the scroll distance (scrollWidth already includes padding)
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
    const horizontalScrollTrigger = ScrollTrigger.create({
      id: routeId,
      trigger: container,
      start: 'top top',
      end: () => `+=${scrollDistance}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      animation: gsap.to(wrapper, {
        x: () => -scrollDistance,
        ease: 'none',
      }),
      onUpdate: (self) => {
        // Dispatch custom event for progress tracking
        window.dispatchEvent(new CustomEvent(`${routeId}-scroll-progress`, { detail: self.progress }));
      },
    });

    triggers.push(horizontalScrollTrigger);

    // Important: Call refresh after all animations are created
    ScrollTrigger.refresh();

    // Cleanup function - kill only the ScrollTriggers we created
    return () => {
      triggers.forEach((trigger) => trigger.kill());
      gsap.killTweensOf(cards);
    };
  }, { scope: containerRef });

  return (
    <>
      <Hero />
      <section
        id="collection"
        ref={containerRef}
        className="horizontal-scroll-section h-screen w-full overflow-hidden bg-black"
      >
        <div
          ref={wrapperRef}
          className="horizontal-scroll-wrapper flex items-center h-full pl-[15vw] pr-[5vw] -ml-[10vw] -mr-[10vw]"
          style={{ gap: '-6vw' }}
        >
          {ARTIST_CARDS.map((card) => (
            <ArtistCard key={card.id} {...card} />
          ))}
        </div>
      </section>
    </>
  );
}
