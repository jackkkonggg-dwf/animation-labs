'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap-config';

// ============================================================================
// HERO SECTION - Auto-playing timeline with SplitText choreography
// ============================================================================

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container || !titleRef.current || !subtitleRef.current) return;

    // Split text into characters and words
    const titleSplit = new SplitText(titleRef.current, { type: 'chars, words' });
    const subtitleSplit = new SplitText(subtitleRef.current, { type: 'words' });

    // Auto-playing master timeline with complex choreography
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Character cascade wave effect - creates a ripple from left to right
    tl.from(titleSplit.chars, {
      y: 100,
      opacity: 0,
      rotationX: -90,
      stagger: {
        each: 0.03,
        from: 'start',
      },
      duration: 0.8,
      ease: 'back.out(1.7)',
    }, 0);

    // Word-based subtitle reveal with elastic bounce
    tl.from(subtitleSplit.words, {
      y: 50,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    }, 0.4);

    // Character color wave effect
    tl.to(titleSplit.chars, {
      color: (i) => {
        const colors = ['#f97316', '#fb923c', '#fdba74', '#ffffff'];
        return colors[i % colors.length];
      },
      stagger: {
        each: 0.05,
        from: 'center',
      },
      duration: 0.5,
      ease: 'power2.out',
    }, 1);

    // Pulse animation on characters
    tl.to(titleSplit.chars, {
      scale: 1.2,
      stagger: {
        each: 0.02,
        from: 'random',
      },
      duration: 0.3,
      ease: 'power1.out',
      yoyo: true,
      repeat: 1,
    }, 1.5);

    return () => {
      tl.kill();
      titleSplit.revert();
      subtitleSplit.revert();
      gsap.killTweensOf([...titleSplit.chars, ...subtitleSplit.words]);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-zinc-950">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-orange-950" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(to right, #f97316 1px, transparent 1px),
            linear-gradient(to bottom, #f97316 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter text-center mb-8"
        >
          Text Symphony
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-zinc-400 font-mono uppercase tracking-widest text-center"
        >
          Advanced SplitText choreography
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// CHARACTER CASCADE SECTION - Scroll-triggered character wave
// ============================================================================

function CharacterCascadeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container || !textRef.current) return;

    const split = new SplitText(textRef.current, { type: 'chars' });

    // Scroll-triggered character cascade
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=2000',
        scrub: 1,
        pin: true,
      },
    });

    // Wave effect - each character animates based on its position
    tl.from(split.chars, {
      y: (i) => 50 + Math.sin(i * 0.3) * 30,
      opacity: 0,
      rotation: (i) => Math.sin(i * 0.2) * 20,
      stagger: {
        each: 0.05,
        from: 'start',
      },
      duration: 1,
      ease: 'power2.out',
    }, 0);

    // Color blend on scroll progress
    tl.to(split.chars, {
      color: (i) => {
        const colors = ['#f97316', '#ea580c', '#c2410c', '#9a3412'];
        return colors[i % colors.length];
      },
      stagger: {
        each: 0.03,
        from: 'start',
      },
      duration: 0.8,
      ease: 'none',
    }, 0.3);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
      split.revert();
      gsap.killTweensOf(split.chars);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-zinc-900 flex items-center justify-center">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-orange-500/30" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-orange-500/30" />

      {/* Content */}
      <div className="relative z-10 px-6 text-center max-w-5xl">
        <p className="text-orange-500 text-sm font-mono uppercase tracking-[0.3em] mb-6">
          Character Cascade
        </p>
        <h2
          ref={textRef}
          className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-tight"
        >
          Every character dances to its own rhythm in this wave cascade animation
        </h2>
      </div>
    </section>
  );
}

// ============================================================================
// WORD REVEAL SECTION - Word-based reveals with different timings
// ============================================================================

function WordRevealSection() {
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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=3000',
        scrub: 1,
        pin: true,
      },
    });

    // Line 1 - Fast stagger (0.1s)
    tl.from(split1.words, {
      y: 80,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'back.out(1.5)',
    }, 0);

    // Line 2 - Medium stagger (0.2s)
    tl.from(split2.words, {
      y: 80,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'back.out(1.5)',
    }, 0.3);

    // Line 3 - Slow stagger (0.3s)
    tl.from(split3.words, {
      y: 80,
      opacity: 0,
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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
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

// ============================================================================
// LINE BY LINE SECTION - Line-by-line reveals with custom easing
// ============================================================================

function LineByLineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container || !textRef.current) return;

    const split = new SplitText(textRef.current, {
      type: 'lines',
      linesClass: 'overflow-hidden', // Class to add to line wrappers
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=1200',
        pin: true,
        toggleActions: 'play none none reverse',
      },
    });

    // Line-by-line reveal with elastic easing
    tl.from(split.lines, {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'elastic.out(1, 0.6)',
    }, 0);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
      split.revert();
      gsap.killTweensOf(split.lines);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-zinc-900 flex items-center justify-center">
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(249, 115, 22, 0.1) 2px, rgba(249, 115, 22, 0.1) 4px)',
      }} />

      <div className="relative z-10 px-6 max-w-3xl">
        <p className="text-orange-500 text-sm font-mono uppercase tracking-[0.3em] mb-8 text-center">
          Line by Line
        </p>
        <div
          ref={textRef}
          className="text-2xl md:text-3xl text-white font-medium leading-relaxed text-center space-y-4"
        >
          <p>Each line reveals with custom easing</p>
          <p>From back bounce to elastic spring</p>
          <p>Creating a dynamic reading experience</p>
          <p>That guides the eye through content</p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SCROLL SCRUB SECTION - Text animates as user scrolls
// ============================================================================

function ScrollScrubSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container || !textRef.current) return;

    const split = new SplitText(textRef.current, { type: 'chars' });

    // Scrub animation - text follows scroll position exactly
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=2000',
        scrub: 1,
        pin: true,
      },
    });

    // Character rotation and scale based on scroll
    tl.to(split.chars, {
      rotation: (i) => i * 15,
      scale: (i) => 1 + Math.sin(i * 0.3) * 0.3,
      color: (i) => {
        const progress = i / split.chars.length;
        return `hsl(${25 + progress * 20}, 90%, ${60 + progress * 20}%)`;
      },
      stagger: {
        each: 0.02,
        from: 'center',
      },
      duration: 1,
      ease: 'none',
    }, 0);

    // 3D rotation effect on scroll
    tl.to(split.chars, {
      rotationY: 360,
      rotationX: (i) => Math.sin(i * 0.5) * 180,
      z: (i) => 100 + Math.abs(i - split.chars.length / 2) * 10,
      transformOrigin: 'center center -100px',
      stagger: {
        each: 0.01,
        from: 'center',
      },
      duration: 1,
      ease: 'none',
    }, 0.5);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
      split.revert();
      gsap.killTweensOf(split.chars);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-gradient-to-br from-zinc-950 via-orange-950 to-zinc-900 flex items-center justify-center">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 50%, #f97316 1px, transparent 1px),
          radial-gradient(circle at 80% 50%, #f97316 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 px-6 text-center max-w-4xl">
        <p className="text-orange-500 text-sm font-mono uppercase tracking-[0.3em] mb-8">
          Scroll Scrub
        </p>
        <h2
          ref={textRef}
          className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight"
          style={{ perspective: '1000px' }}
        >
          Scroll to animate
        </h2>
      </div>
    </section>
  );
}

// ============================================================================
// GRADIENT BLEND SECTION - Text color/gradient on scroll progress
// ============================================================================

function GradientBlendSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container || !textRef.current) return;

    const split = new SplitText(textRef.current, { type: 'words' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=2000',
        scrub: 1,
        pin: true,
      },
    });

    // Gradient color blend on scroll progress
    tl.to(split.words, {
      backgroundImage: (i) => {
        const colors = [
          'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
          'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
          'linear-gradient(135deg, #fdba74 0%, #fb923c 100%)',
          'linear-gradient(135deg, #ffffff 0%, #f97316 100%)',
        ];
        return colors[i % colors.length];
      },
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      stagger: 0.15,
      duration: 1,
      ease: 'none',
    }, 0);

    // Scale effect
    tl.to(split.words, {
      scale: (i) => 1 + (i % 3) * 0.1,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
    }, 0.2);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
      split.revert();
      gsap.killTweensOf(split.words);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-zinc-950 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-950/20 via-zinc-900 to-zinc-950" />

      <div className="relative z-10 px-6 text-center max-w-4xl">
        <p className="text-orange-500 text-sm font-mono uppercase tracking-[0.3em] mb-8">
          Gradient Blend
        </p>
        <h2
          ref={textRef}
          className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight"
        >
          Colors shift and blend through every word as you progress
        </h2>
      </div>
    </section>
  );
}

// ============================================================================
// REDUCED MOTION SUPPORT - Respects user preferences
// ============================================================================

// CSS for reduced motion
const reducedMotionStyles = `
  @media (prefers-reduced-motion: reduce) {
    .split-text-reduced * {
      transition: none !important;
      animation: none !important;
      transform: none !important;
      opacity: 1 !important;
    }
  }
`;

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function TextSymphonyPage() {
  return (
    <>
      <style>{reducedMotionStyles}</style>
      <main className="min-h-screen">
        {/* Info banner */}
        <div className="sticky top-[72px] z-40 bg-zinc-900/95 backdrop-blur border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase">
                Advanced Pattern
              </span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400 text-sm">SplitText showcase</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-zinc-500 text-xs font-mono">6 SECTIONS</span>
            </div>
          </div>
        </div>

        {/* Text symphony sections */}
        <HeroSection />
        <CharacterCascadeSection />
        <WordRevealSection />
        <LineByLineSection />
        <ScrollScrubSection />
        <GradientBlendSection />

        {/* Footer */}
        <footer className="bg-zinc-900/50 border-t border-zinc-800 py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-zinc-500 text-sm font-mono mb-4">
              Featuring: SplitText, character/word/line splits, stagger animations, scroll scrub
            </p>
            <p className="text-zinc-600 text-xs">
              Supports prefers-reduced-motion for accessibility
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
