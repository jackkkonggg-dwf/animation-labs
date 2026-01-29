'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap-config';

export function WordRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container || !line1Ref.current || !line2Ref.current || !line3Ref.current) return;

    const split1 = new SplitText(line1Ref.current, { type: 'words' });
    const split2 = new SplitText(line2Ref.current, { type: 'words' });
    const split3 = new SplitText(line3Ref.current, { type: 'words' });

    // Set initial state
    gsap.set([...split1.words, ...split2.words, ...split3.words], { opacity: 0, y: 80 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=3000',
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Line 1 - Fast stagger (0.1s)
    tl.to(split1.words, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.6,
      ease: 'back.out(1.5)',
    }, 0);

    // Line 2 - Medium stagger (0.2s)
    tl.to(split2.words, {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 0.8,
      ease: 'back.out(1.5)',
    }, 0.3);

    // Line 3 - Slow stagger (0.3s)
    tl.to(split3.words, {
      y: 0,
      opacity: 1,
      stagger: 0.3,
      duration: 1,
      ease: 'back.out(1.5)',
    }, 0.6);

    // Word exit animation
    tl.to([split1.words, split2.words, split3.words], {
      y: -50,
      opacity: 0,
      stagger: {
        each: 0.05,
        from: 'end',
      },
      duration: 0.6,
      ease: 'power2.in',
    }, 1.5);

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    // Track the specific ScrollTrigger for cleanup
    const scrollTrigger = tl.scrollTrigger;

    return () => {
      // Only kill the ScrollTrigger we created, not all global triggers
      if (scrollTrigger) {
        scrollTrigger.kill();
      }
      tl.kill();
      split1.revert();
      split2.revert();
      split3.revert();
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-zinc-950 flex items-center justify-center">
      <div className="relative z-10 px-6 text-center max-w-4xl space-y-6">
        <h2 ref={line1Ref} className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
          Different timings create visual hierarchy
        </h2>
        <h2 ref={line2Ref} className="text-3xl md:text-4xl font-bold text-zinc-300 uppercase tracking-wide">
          Each line reveals at its own pace
        </h2>
        <h2 ref={line3Ref} className="text-2xl md:text-3xl font-semibold text-zinc-500 uppercase tracking-wider">
          Controlling the rhythm of information
        </h2>
      </div>
    </section>
  );
}
