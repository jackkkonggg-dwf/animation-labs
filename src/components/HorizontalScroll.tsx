'use client';

import { useRef, useEffect } from 'react';

interface CardProps {
  id: number;
  name: string;
  description: string;
  image: string;
}

function Card({ id, name, description, image }: CardProps) {
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
      <div className="w-full h-1/2 relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-30`}></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      <div className="p-8 bg-[#1a1a2e]">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">{name}</h3>
        <p className="text-zinc-400">{description}</p>
      </div>
    </div>
  );
}

const cards: CardProps[] = [
  {
    id: 1,
    name: 'Neon Dreams',
    description: 'Electronic soundscapes that transport you to digital realms. Creating sonic experiences since 2019.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
  },
  {
    id: 2,
    name: 'Cyberpulse',
    description: 'Futuristic beats and synthwave rhythms. The pulse of tomorrow\'s music scene today.',
    image: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&q=80',
  },
  {
    id: 3,
    name: 'Midnight Wave',
    description: 'Dark electronic atmospheres meets infectious melodies. Soundtracking your late night drives.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
  },
  {
    id: 4,
    name: 'Digital Echo',
    description: 'Ambient textures and glitch-influenced production. Where nature meets technology.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
  },
  {
    id: 5,
    name: 'Voltage Collective',
    description: 'High-energy electronic ensemble pushing boundaries of live performance and production.',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80',
  },
  {
    id: 6,
    name: 'Synth Horizon',
    description: 'Retro-futuristic sounds with modern production. The past reimagined for the future.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
  },
  {
    id: 7,
    name: 'Quantum Beats',
    description: 'Experimental electronic music exploring the intersection of science and sound.',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80',
  },
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
