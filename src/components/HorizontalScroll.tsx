'use client';

import { useRef, useEffect } from 'react';

interface CardProps {
  id: number;
  name: string;
  description: string;
}

function Card({ id, name, description }: CardProps) {
  // Neon colors cycle through cyan, magenta, lime
  const neonColors = [
    'from-[#00ffff] to-[#00cccc]',
    'from-[#ff00ff] to-[#cc00cc]',
    'from-[#00ff00] to-[#00cc00]',
    'from-[#00ffff] to-[#00cccc]',
    'from-[#ff00ff] to-[#cc00cc]',
    'from-[#00ff00] to-[#00cc00]',
    'from-[#00ffff] to-[#00cccc]',
  ];
  const gradientClass = neonColors[(id - 1) % neonColors.length];

  return (
    <div
      className="horizontal-scroll-card group flex-shrink-0 w-[60vw] h-[70vh] bg-[#1a1a2e] rounded-2xl overflow-hidden border border-white/10 shadow-2xl hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] hover:border-cyan-400/50 transition-all duration-300"
      data-card-id={id}
    >
      <div className={`w-full h-1/2 bg-gradient-to-br ${gradientClass} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <span className="relative text-6xl text-black font-bold tracking-tighter">#{id}</span>
      </div>
      <div className="p-8 bg-[#1a1a2e]">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">{name}</h3>
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
      const cards = container?.querySelectorAll('.horizontal-scroll-card');

      if (!container || !wrapper || !cards || cards.length === 0) return;

      // Calculate the scroll distance based on wrapper width minus viewport width
      // This ensures all cards traverse fully across the viewport
      const scrollDistance = wrapper.scrollWidth - window.innerWidth;

      // Set initial state for cards (invisible and offset)
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
