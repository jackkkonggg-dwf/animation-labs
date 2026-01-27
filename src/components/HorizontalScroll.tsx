'use client';

import { useRef, memo } from 'react';
import { useGSAP } from '@gsap/react';

interface CardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  yOffset: number;
  rotation: number;
  zIndex: number;
}

// Hoist static arrays outside component to avoid recreation on every render
const BORDER_COLORS = [
  'border-[#ff3366]', // Hot pink
  'border-[#00ffff]', // Cyan
  'border-[#ffeb3b]', // Bright yellow
  'border-[#ff6b35]', // Orange
  'border-[#a855f7]', // Purple
  'border-[#22c55e]', // Green
  'border-[#f472b6]', // Pink
] as const;

const SHADOW_COLORS = [
  'rgba(255, 51, 102, 0.5)',
  'rgba(0, 255, 255, 0.5)',
  'rgba(255, 235, 59, 0.5)',
  'rgba(255, 107, 53, 0.5)',
  'rgba(168, 85, 247, 0.5)',
  'rgba(34, 197, 94, 0.5)',
  'rgba(244, 114, 182, 0.5)',
] as const;

const CARD_GRADIENTS = [
  'from-pink-500/40 via-purple-500/20 to-blue-500/40',
  'from-cyan-500/40 via-blue-500/20 to-purple-500/40',
  'from-yellow-500/40 via-orange-500/20 to-red-500/40',
  'from-orange-500/40 via-red-500/20 to-pink-500/40',
  'from-purple-500/40 via-pink-500/20 to-cyan-500/40',
  'from-green-500/40 via-cyan-500/20 to-blue-500/40',
  'from-pink-500/40 via-rose-500/20 to-orange-500/40',
] as const;

// Hoist SVG texture to module level to avoid recreation on every render
const NOISE_TEXTURE_URL = 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")';

const Card = memo(function Card({ id, name, description, image, yOffset, rotation, zIndex }: CardProps) {
  const borderColor = BORDER_COLORS[(id - 1) % BORDER_COLORS.length];
  const shadowColor = SHADOW_COLORS[(id - 1) % SHADOW_COLORS.length];
  const gradientClass = CARD_GRADIENTS[(id - 1) % CARD_GRADIENTS.length];

  return (
    <div
      className="horizontal-scroll-card group relative flex-shrink-0 w-[55vw] md:w-[45vw] lg:w-[35vw] aspect-[3/4]"
      style={{
        transform: `translateY(${yOffset}px) rotate(${rotation}deg)`,
        zIndex,
      }}
      data-card-id={id}
    >
      {/* Main card container with overlap effect */}
      <div
        className={`
          relative w-full h-full rounded-3xl overflow-hidden
          bg-gradient-to-br from-zinc-900 to-black
          border-4 ${borderColor}
          shadow-2xl transition-all duration-500 ease-out
          hover:shadow-[0_20px_60px_-10px_${shadowColor}]
          hover:scale-105 hover:rotate-0
          hover:-translate-y-2
        `}
      >
        {/* Image section */}
        <div className="w-full h-[55%] relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Multi-layer gradient overlay for depth */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} mix-blend-overlay`}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

          {/* Floating badge overlay */}
          <div className="absolute top-4 left-4">
            <div className="bg-black/60 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/20">
              <span className="text-xs font-semibold tracking-wider text-white/90">SOLO ARTIST</span>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="h-[45%] p-6 relative overflow-hidden">
          {/* Background texture */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}></div>
          </div>

          {/* Collection label */}
          <div className="relative z-10 mb-3">
            <div className="inline-flex items-center gap-2 text-white/50 text-xs tracking-[0.2em] uppercase">
              <span className="w-6 h-px bg-white/30"></span>
              <span>Collection 2024</span>
            </div>
          </div>

          {/* Artist name */}
          <h3 className={`
            relative z-10 text-3xl md:text-4xl font-bold text-white mb-2
            transition-colors duration-300
            group-hover:drop-shadow-[0_0_20px_${shadowColor}]
          `}>
            {name}
          </h3>

          {/* Description */}
          <p className="relative z-10 text-sm text-zinc-400 leading-relaxed">
            {description}
          </p>

          {/* Bottom accent line */}
          <div className={`absolute bottom-6 left-6 right-6 h-1 bg-gradient-to-r ${gradientClass} rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
        </div>

        {/* Hover shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
});

// Card data with organic randomness baked in
const cards: CardProps[] = [
  {
    id: 1,
    name: 'NEON DREAMS',
    description: 'Electronic soundscapes that transport you to digital realms. Creating sonic experiences since 2019.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    yOffset: -40,
    rotation: -3,
    zIndex: 1,
  },
  {
    id: 2,
    name: 'CYBERPULSE',
    description: 'Futuristic beats and synthwave rhythms. The pulse of tomorrow\'s music scene today.',
    image: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&q=80',
    yOffset: 25,
    rotation: 2.5,
    zIndex: 3,
  },
  {
    id: 3,
    name: 'MIDNIGHT WAVE',
    description: 'Dark electronic atmospheres meets infectious melodies. Soundtracking your late night drives.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    yOffset: -15,
    rotation: -1.5,
    zIndex: 2,
  },
  {
    id: 4,
    name: 'DIGITAL ECHO',
    description: 'Ambient textures and glitch-influenced production. Where nature meets technology.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    yOffset: 35,
    rotation: 4,
    zIndex: 4,
  },
  {
    id: 5,
    name: 'VOLTAGE',
    description: 'High-energy electronic ensemble pushing boundaries of live performance and production.',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80',
    yOffset: -25,
    rotation: -2,
    zIndex: 2,
  },
  {
    id: 6,
    name: 'SYNTH HORIZON',
    description: 'Retro-futuristic sounds with modern production. The past reimagined for the future.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
    yOffset: 10,
    rotation: 1,
    zIndex: 3,
  },
  {
    id: 7,
    name: 'QUANTUM BEATS',
    description: 'Experimental electronic music exploring the intersection of science and sound.',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80',
    yOffset: -30,
    rotation: 3.5,
    zIndex: 1,
  },
];

// Hero section with brutalist concert poster aesthetic
function Hero() {
  return (
    <section
      className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center"
      suppressHydrationWarning
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ff3366] rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#00ffff] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a855f7] rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid texture overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }}></div>

      {/* Noise grain texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: NOISE_TEXTURE_URL,
      }}></div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Small label above */}
        <div
          className="
            inline-flex items-center gap-3 mb-8 overflow-hidden
            animate-in fade-in slide-in-from-top-4 duration-1000 ease-out
          "
          style={{ animationDelay: '200ms' }}
        >
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#ff3366]"></span>
          <span className="text-[#ff3366] text-sm font-bold tracking-[0.3em] uppercase">New Collection 2024</span>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#ff3366]"></span>
        </div>

        {/* Main title - brutalist stacked */}
        <h1
          className="
            font-black text-white leading-[0.85] tracking-tight mb-6
            animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out
          "
          style={{
            animationDelay: '400ms',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(4rem, 15vw, 12rem)',
          }}
        >
          <div className="overflow-hidden">
            <span className="inline-block hover:text-[#ff3366] transition-colors duration-300">SOUND</span>
          </div>
          <div className="overflow-hidden">
            <span className="inline-block hover:text-[#00ffff] transition-colors duration-300">ARCHIVE</span>
          </div>
        </h1>

        {/* Subtitle with glow */}
        <p
          className="
            text-xl md:text-2xl text-zinc-400 font-light mb-12 max-w-2xl mx-auto
            animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out
          "
          style={{ animationDelay: '600ms' }}
        >
          Discover <span className="text-[#00ffff] font-semibold">7 groundbreaking artists</span> redefining{' '}
          <span className="text-[#ffeb3b] font-semibold">electronic music</span>
        </p>

        {/* CTA buttons */}
        <div
          className="
            flex flex-col sm:flex-row items-center justify-center gap-4
            animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out
          "
          style={{ animationDelay: '800ms' }}
        >
          <a
            href="#collection"
            className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
          >
            <span className="relative z-10">Explore Artists</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff3366] via-[#a855f7] to-[#00ffff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          <a
            href="#about"
            className="px-8 py-4 border-2 border-white/30 text-white font-semibold text-lg rounded-full hover:bg-white/10 hover:border-white transition-all"
          >
            About the Collection
          </a>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#ff3366]/50"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#00ffff]/50"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#a855f7]/50"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#ffeb3b]/50"></div>

      {/* Scroll indicator */}
      <div
        className="
          absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
          animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out
        "
        style={{ animationDelay: '1000ms' }}
      >
        <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-[#ff3366] rounded-full animate-bounce"></div>
        </div>
      </div>

      {/* Floating stats */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6">
        <div className="text-right">
          <div className="text-4xl font-black text-[#ff3366]">7</div>
          <div className="text-xs text-white/50 uppercase tracking-wider">Artists</div>
        </div>
        <div className="w-12 h-px bg-white/20 ml-auto"></div>
        <div className="text-right">
          <div className="text-4xl font-black text-[#00ffff]">2024</div>
          <div className="text-xs text-white/50 uppercase tracking-wider">Collection</div>
        </div>
        <div className="w-12 h-px bg-white/20 ml-auto"></div>
        <div className="text-right">
          <div className="text-4xl font-black text-[#ffeb3b]">∞</div>
          <div className="text-xs text-white/50 uppercase tracking-wider">Possibilities</div>
        </div>
      </div>
    </section>
  );
}

export function HorizontalScroll() {
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
        id: 'horizontal-scroll',
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Dispatch custom event for progress tracking
          window.dispatchEvent(new CustomEvent('horizontal-scroll-progress', { detail: self.progress }));
        },
      },
    });
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
          className="horizontal-scroll-wrapper flex items-center h-full pl-[5vw] pr-[5vw] -ml-[10vw] -mr-[10vw]"
          style={{ gap: '-6vw' }}
        >
          {cards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      </section>
    </>
  );
}
