'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';
import { PatternHeader, CodeViewer, ReplayButton } from '@/components/patterns';
import { RelatedPatterns } from '@/components/patterns/related-patterns';
import { PatternNavigation } from '@/components/patterns/pattern-navigation';

// ============================================================================
// CODE EXAMPLE
// ============================================================================

const CODE_EXAMPLE = `// ============================================================================
// BUTTON HOVER MICRO-INTERACTION PATTERNS
// ============================================================================

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';

// ----------------------------------------------------------------------------
// PATTERN 1: SCALE + SHADOW (Elastic Easing)
// ----------------------------------------------------------------------------

export function ScaleShadowButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(249, 115, 22, 0.4)',
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(button);
    };
  }, { scope: buttonRef });

  return (
    <button ref={buttonRef} className="px-8 py-4 bg-orange-500 ...">
      Scale + Shadow
    </button>
  );
}

// ----------------------------------------------------------------------------
// PATTERN 2: MAGNETIC EFFECT (Follows Cursor)
// ----------------------------------------------------------------------------

export function MagneticButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    const area = areaRef.current;
    if (!button || !area) return;

    // quickTo() creates performant, cached tweens
    let xTo = gsap.quickTo(button, 'x', { duration: 0.4, ease: 'power3.out' });
    let yTo = gsap.quickTo(button, 'y', { duration: 0.4, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = area.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Move button towards cursor (0.3 = magnetic strength)
      xTo(x * 0.3);
      yTo(y * 0.3);
    };

    const handleMouseLeave = () => {
      xTo(0);  // Return to center
      yTo(0);
    };

    area.addEventListener('mousemove', handleMouseMove);
    area.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      area.removeEventListener('mousemove', handleMouseMove);
      area.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(button);
    };
  });

  return (
    <div ref={areaRef}>
      <button ref={buttonRef} className="px-8 py-4 bg-cyan-500 ...">
        Magnetic
      </button>
    </div>
  );
}

// ----------------------------------------------------------------------------
// PATTERN 3: ICON ANIMATION (Translate + Rotate)
// ----------------------------------------------------------------------------

export function IconAnimationButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    const icon = iconRef.current;
    if (!button || !icon) return;

    const handleMouseEnter = () => {
      // Subtle button scale
      gsap.to(button, {
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out',
      });

      // Icon flies out with rotation
      gsap.fromTo(icon,
        { x: 0, rotate: 0 },
        {
          x: 8,
          rotate: 45,
          duration: 0.3,
          ease: 'back.out(1.7)',
        }
      );
    };

    const handleMouseLeave = () => {
      gsap.to(button, { scale: 1, duration: 0.2, ease: 'power2.out' });
      gsap.to(icon, {
        x: 0,
        rotate: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(button);
      gsap.killTweensOf(icon);
    };
  });

  return (
    <button ref={buttonRef} className="flex items-center gap-3 ...">
      Get Started
      <svg ref={iconRef} className="w-5 h-5">...</svg>
    </button>
  );
}`;

// ============================================================================
// LIVE DEMO SECTION - BUTTON 1: SCALE + SHADOW
// ============================================================================

function ScaleShadowButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Hover enter animation
    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(249, 115, 22, 0.4)',
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
    };

    // Hover leave animation
    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(button);
    };
  }, { scope: buttonRef });

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        ref={buttonRef}
        className="px-8 py-4 bg-orange-500 text-black font-black text-sm uppercase tracking-wider rounded transition-colors"
        style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
      >
        Scale + Shadow
      </button>
      <span className="text-zinc-500 text-xs font-mono">back.out(1.7) elastic easing</span>
    </div>
  );
}

// ============================================================================
// LIVE DEMO SECTION - BUTTON 2: MAGNETIC EFFECT
// ============================================================================

function MagneticButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    const area = areaRef.current;
    if (!button || !area) return;

    let xTo = gsap.quickTo(button, 'x', { duration: 0.4, ease: 'power3.out' });
    let yTo = gsap.quickTo(button, 'y', { duration: 0.4, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = area.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      xTo(x * 0.3);
      yTo(y * 0.3);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    area.addEventListener('mousemove', handleMouseMove);
    area.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      area.removeEventListener('mousemove', handleMouseMove);
      area.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(button);
    };
  }, { scope: buttonRef });

  return (
    <div className="flex flex-col items-center gap-4">
      <div ref={areaRef} className="relative inline-block">
        <button
          ref={buttonRef}
          className="px-8 py-4 bg-cyan-500 text-black font-black text-sm uppercase tracking-wider rounded"
        >
          Magnetic
        </button>
      </div>
      <span className="text-zinc-500 text-xs font-mono">follows cursor with quickTo()</span>
    </div>
  );
}

// ============================================================================
// LIVE DEMO SECTION - BUTTON 3: ICON ANIMATION
// ============================================================================

function IconAnimationButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    const icon = iconRef.current;
    if (!button || !icon) return;

    const handleMouseEnter = () => {
      // Button scale
      gsap.to(button, {
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out',
      });

      // Icon animation - fly out and back
      gsap.fromTo(
        icon,
        { x: 0, rotate: 0 },
        {
          x: 8,
          rotate: 45,
          duration: 0.3,
          ease: 'back.out(1.7)',
        }
      );
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      });

      gsap.to(icon, {
        x: 0,
        rotate: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(button);
      gsap.killTweensOf(icon);
    };
  }, { scope: buttonRef });

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        ref={buttonRef}
        className="px-8 py-4 bg-emerald-500 text-black font-black text-sm uppercase tracking-wider rounded flex items-center gap-3"
      >
        Get Started
        <svg
          ref={iconRef}
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </button>
      <span className="text-zinc-500 text-xs font-mono">icon translates and rotates</span>
    </div>
  );
}

// ============================================================================
// LIVE DEMO SECTION
// ============================================================================

function LiveDemo() {
  return (
    <section className="relative border-b border-zinc-800">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 grid-pattern-overlay" />

      {/* Section header */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-8">
        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-4">
          <span className="w-3 h-8 bg-orange-500" />
          Live Demo
        </h2>
        <p className="text-zinc-500 mt-3 ml-7">Hover over each button to see the micro-interaction</p>
      </div>

      {/* Demo buttons grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Scale + Shadow Card */}
          <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg p-8 flex flex-col items-center justify-center min-h-[240px]">
            <div className="text-4xl mb-6">📏</div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6 text-center">
              Scale + Shadow
            </h3>
            <ScaleShadowButton />
          </div>

          {/* Magnetic Effect Card */}
          <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg p-8 flex flex-col items-center justify-center min-h-[240px]">
            <div className="text-4xl mb-6">🧲</div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6 text-center">
              Magnetic
            </h3>
            <MagneticButton />
          </div>

          {/* Icon Animation Card */}
          <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg p-8 flex flex-col items-center justify-center min-h-[240px]">
            <div className="text-4xl mb-6">✨</div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6 text-center">
              Icon Animation
            </h3>
            <IconAnimationButton />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ButtonHoverPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader
        category="Interactions"
        difficulty="Beginner"
        title="Hover"
        titleHighlight="Button"
        description="Add engaging micro-interactions to buttons with smooth hover effects. Scale, color, and icon animations create delightful feedback."
        features={[
          { label: 'scale: 1.05' },
          { label: 'Icon animation' },
          { label: 'Fast duration' }]}
      />
      <LiveDemo />
      <CodeViewer code={CODE_EXAMPLE} language="tsx" filename="tsx" />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="button-hover" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="button-hover" />

      {/* Footer CTA */}
      <section className="relative border-t border-orange-500/20 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
            Ready to <span className="text-orange-500">Animate</span>?
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            This is just the beginning. Explore 50+ GSAP animation patterns in our complete collection.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-4 bg-orange-500 text-black font-black text-sm uppercase tracking-wider rounded hover:bg-orange-400 transition-colors duration-300"
          >
            View All Patterns
          </a>
        </div>
      </section>
    </div>
  );
}
