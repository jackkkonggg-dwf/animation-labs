'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { DebugModeProvider, DebugModeToggle } from '@/components/DebugModeToggle';

export default function TestDebugModePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.test-card');

    // Set initial state
    gsap.set(cards, { opacity: 0, y: 50 });

    // Animate cards in with stagger - basic trigger
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse',
      },
    });

    // Section 1: Scrub animation
    if (section1Ref.current) {
      gsap.fromTo(
        section1Ref.current,
        { rotation: 0, scale: 1 },
        {
          rotation: 360,
          scale: 1.5,
          scrollTrigger: {
            trigger: section1Ref.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        }
      );
    }

    // Section 2: Pinned section
    if (section2Ref.current) {
      gsap.to(section2Ref.current.querySelector('.pin-content'), {
        x: 200,
        rotation: 180,
        scrollTrigger: {
          trigger: section2Ref.current,
          start: 'top top',
          end: '+=500',
          pin: true,
          scrub: true,
        },
      });
    }

    // Section 3: Timeline with callbacks
    if (section3Ref.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section3Ref.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play complete reverse reset',
        },
      });

      tl.to(section3Ref.current, { backgroundColor: '#27272a', duration: 0.5 })
        .to(section3Ref.current.querySelector('.timeline-box'), { scale: 1.5, duration: 0.5 }, '<')
        .to(section3Ref.current.querySelector('.timeline-box'), { rotation: 90, duration: 0.5 });
    }

    ScrollTrigger.refresh();

    return () => {
      gsap.killTweensOf(cards);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, { scope: containerRef });

  return (
    <DebugModeProvider>
      <main className="min-h-screen bg-zinc-950">
        <DebugModeToggle position="bottom-right" />

        <div className="max-w-4xl mx-auto px-6 py-20">
          <h1 className="text-4xl font-black text-white uppercase tracking-tight mb-4">
            Debug <span className="text-orange-500">Mode</span> Test
          </h1>
          <p className="text-zinc-400 mb-12">
            Test page for the DebugModeToggle component. Click the debug icon in the bottom-right
            corner to enable debug mode and see ScrollTrigger markers.
          </p>

          <div ref={containerRef} className="space-y-4 mb-20">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="test-card p-6 bg-zinc-900 border border-zinc-800 rounded-lg"
              >
                <h2 className="text-xl font-bold text-white mb-2">Card {i + 1}</h2>
                <p className="text-zinc-400">
                  This card animates in with a stagger effect. Enable debug mode to see the
                  ScrollTrigger markers showing start/end positions.
                </p>
              </div>
            ))}
          </div>

          {/* Section 1: Scrub animation */}
          <div
            ref={section1Ref}
            className="h-80 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-lg mb-20"
          >
            <div className="w-32 h-32 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-center">SCRUB<br/>ANIMATION</span>
            </div>
          </div>

          {/* Section 2: Pinned section */}
          <div
            ref={section2Ref}
            className="h-96 bg-zinc-900 border border-zinc-800 rounded-lg mb-20 flex items-center justify-center relative overflow-hidden"
          >
            <div className="pin-content w-24 h-24 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-center">PIN<br/>+ MOVE</span>
            </div>
          </div>

          {/* Section 3: Timeline with callbacks */}
          <div
            ref={section3Ref}
            className="h-80 p-8 bg-zinc-800 border border-zinc-700 rounded-lg mb-20 flex items-center justify-center"
          >
            <div className="timeline-box w-20 h-20 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-center">TL<br/>BOX</span>
            </div>
          </div>

          <div className="p-6 bg-zinc-900 border border-orange-500/30 rounded-lg">
            <h3 className="text-lg font-bold text-orange-500 mb-4">Debug Mode Features:</h3>
            <ul className="space-y-2 text-zinc-400">
              <li>• Toggle ScrollTrigger markers on/off</li>
              <li>• View current scroll position and velocity</li>
              <li>• See all active ScrollTriggers with details</li>
              <li>• Monitor trigger start/end positions and scrub status</li>
              <li>• Track animation progress percentage</li>
            </ul>
          </div>
        </div>
      </main>
    </DebugModeProvider>
  );
}
