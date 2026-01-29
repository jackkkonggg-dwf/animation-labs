'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

const CAROUSEL_ITEMS = [
  { id: 1, title: 'Timeline', description: 'Sequence animations with precision timing' },
  { id: 2, title: 'Easing', description: 'Custom easing functions for natural motion' },
  { id: 3, title: 'Stagger', description: 'Cascading delays create visual rhythm' },
  { id: 4, title: 'Scrub', description: 'Link animations directly to scroll position' },
  { id: 5, title: 'Pin', description: 'Fix elements while scroll continues' },
  { id: 6, title: 'Callback', description: 'Execute code at specific animation points' },
];

export function HorizontalCarouselSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const panels = container?.querySelectorAll('.carousel-panel');

    if (!container || !wrapper || !panels || panels.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    // Calculate scroll distance
    const scrollDistance = (panels.length - 1) * window.innerWidth;

    // Set initial state for panels
    gsap.set(panels, { opacity: 0, x: 50 });

    // Animate panels in
    gsap.to(panels, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    });

    // Create horizontal scroll animation
    const horizontalTrigger = ScrollTrigger.create({
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
    });

    triggers.push(horizontalTrigger);

    // Panel-specific animations on scroll
    panels.forEach((panel, i) => {
      const title = panel.querySelector('.panel-title');
      const desc = panel.querySelector('.panel-desc');
      const number = panel.querySelector('.panel-number');

      const panelTrigger = ScrollTrigger.create({
        trigger: panel,
        containerAnimation: gsap.getTweensOf(wrapper)[0],
        start: 'left center',
        end: 'right center',
        onEnter: () => {
          gsap.fromTo(title,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
          );
          gsap.fromTo(desc,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: 'power2.out' }
          );
          gsap.fromTo(number,
            { scale: 0, rotation: -180 },
            { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)' }
          );
        },
        onLeaveBack: () => {
          gsap.set([title, desc], { opacity: 0 });
          gsap.set(number, { scale: 0, rotation: -180 });
        },
      });

      triggers.push(panelTrigger);
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(panels);
      gsap.killTweensOf(wrapper);
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="horizontal-carousel-section h-screen w-full overflow-hidden bg-zinc-950"
    >
      <div
        ref={wrapperRef}
        className="horizontal-carousel-wrapper flex h-full"
      >
        {CAROUSEL_ITEMS.map((item) => (
          <div
            key={item.id}
            className="carousel-panel flex-shrink-0 w-screen h-screen flex items-center justify-center px-6 md:px-12 relative"
          >
            {/* Background accent */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-orange-500/20" />
              <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-orange-500/20" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <div className="panel-number text-[180px] md:text-[240px] font-black text-orange-500/10 leading-none mb-8">
                0{item.id}
              </div>
              <h3 className="panel-title text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
                {item.title}
              </h3>
              <p className="panel-desc text-xl md:text-2xl text-zinc-400 font-mono uppercase tracking-widest">
                {item.description}
              </p>
            </div>

            {/* Progress indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {CAROUSEL_ITEMS.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    i === item.id - 1 ? 'bg-orange-500' : 'bg-zinc-700'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
