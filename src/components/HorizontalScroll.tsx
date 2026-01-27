'use client';

import { useRef, useEffect } from 'react';

interface CardProps {
  id: number;
  name: string;
  description: string;
}

function Card({ id, name, description }: CardProps) {
  return (
    <div
      className="horizontal-scroll-card flex-shrink-0 w-[60vw] h-[70vh] bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700"
      data-card-id={id}
    >
      <div className="w-full h-1/2 bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
        <span className="text-6xl text-zinc-600 font-bold">#{id}</span>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
        <p className="text-zinc-400">{description}</p>
      </div>
    </div>
  );
}

const cards: CardProps[] = [
  { id: 1, name: 'Artist 1', description: 'Description for artist 1' },
  { id: 2, name: 'Artist 2', description: 'Description for artist 2' },
  { id: 3, name: 'Artist 3', description: 'Description for artist 3' },
  { id: 4, name: 'Artist 4', description: 'Description for artist 4' },
  { id: 5, name: 'Artist 5', description: 'Description for artist 5' },
  { id: 6, name: 'Artist 6', description: 'Description for artist 6' },
  { id: 7, name: 'Artist 7', description: 'Description for artist 7' },
];

export function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initAnimation = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);

      const container = containerRef.current;
      const wrapper = wrapperRef.current;

      if (!container || !wrapper) return;

      // Calculate the scroll distance based on wrapper width minus viewport width
      // This ensures all cards traverse fully across the viewport
      const scrollDistance = wrapper.scrollWidth - window.innerWidth;

      // Create the horizontal scroll animation
      gsap.to(wrapper, {
        x: () => -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    };

    initAnimation();

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="horizontal-scroll-section h-screen w-full overflow-hidden bg-black"
    >
      <div
        ref={wrapperRef}
        className="horizontal-scroll-wrapper flex items-center h-full pl-[10vw] gap-8"
      >
        {cards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </section>
  );
}
