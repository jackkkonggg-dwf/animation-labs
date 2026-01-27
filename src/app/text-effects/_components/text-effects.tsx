'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap-config';
import { TEXT_SECTIONS, type LayoutType } from '../_data';
import type { TextSection } from '../_data';

// ============================================================================
// UTILITY FUNCTIONS - Vanilla JS Text Splitting
// ============================================================================

/**
 * Split text into character spans for character-level animation
 * Preserves spaces as non-breaking spaces
 */
function splitToChars(element: HTMLElement): void {
  const text = element.textContent ?? '';
  const chars = text.split('').map((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.className = 'char';
    span.style.display = 'inline-block';
    span.style.position = 'relative';
    return span;
  });
  element.innerHTML = '';
  chars.forEach((char) => element.appendChild(char));
}

/**
 * Split text into word spans for word-level animation
 * Preserves spacing between words
 */
function splitToWords(element: HTMLElement): void {
  const text = element.textContent ?? '';
  const words = text.split(' ').map((word) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.className = 'word';
    span.style.display = 'inline-block';
    return span;
  });
  element.innerHTML = '';
  words.forEach((word, i) => {
    element.appendChild(word);
    if (i < words.length - 1) {
      const space = document.createElement('span');
      space.innerHTML = '&nbsp;';
      space.style.display = 'inline-block';
      element.appendChild(space);
    }
  });
}

// ============================================================================
// ANIMATION CREATORS
// ============================================================================

interface AnimationResult {
  triggers: ScrollTrigger[];
}

function createSlideAnimation(
  container: HTMLElement,
  imageEl: HTMLElement | null
): AnimationResult {
  const triggers: ScrollTrigger[] = [];
  const textLines = container.querySelectorAll('.text-line');

  // Set initial state - more dramatic
  gsap.set(textLines, { opacity: 0, x: 200 });
  if (imageEl) {
    gsap.set(imageEl, { opacity: 0, scale: 1.15, x: 100 });
  }

  // Image reveal on scroll
  if (imageEl) {
    const imageAnim = gsap.to(imageEl, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1,
      },
    });
    triggers.push(imageAnim.scrollTrigger!);
  }

  // Text lines staggered slide-in
  textLines.forEach((line) => {
    const anim = gsap.to(line, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: line,
        start: 'top 85%',
        end: 'bottom 60%',
        scrub: 1,
      },
    });
    triggers.push(anim.scrollTrigger!);
  });

  return { triggers };
}

function createScaleAnimation(
  container: HTMLElement,
  imageEl: HTMLElement | null
): AnimationResult {
  const triggers: ScrollTrigger[] = [];
  const textLines = Array.from(container.querySelectorAll('.text-line'));

  // Split text into words for stagger effect
  textLines.forEach((line) => {
    splitToWords(line as HTMLElement);
  });
  const words = container.querySelectorAll('.word');

  // Set initial state
  gsap.set(words, { opacity: 0, scale: 0.5, filter: 'blur(10px)' });
  if (imageEl) {
    gsap.set(imageEl, { opacity: 0, x: -50 });
  }

  // Image reveal on scroll
  if (imageEl) {
    const imageAnim = gsap.to(imageEl, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1,
      },
    });
    triggers.push(imageAnim.scrollTrigger!);
  }

  // Words scale and blur reveal - sped up by 50%
  const wordsAnim = gsap.to(words, {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    duration: 0.4,
    stagger: 0.065,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: container,
      start: 'top 70%',
      end: 'top 35%',
      scrub: 1,
    },
  });
  triggers.push(wordsAnim.scrollTrigger!);

  return { triggers };
}

function createBlurAnimation(
  container: HTMLElement,
  imageEl: HTMLElement | null
): AnimationResult {
  const triggers: ScrollTrigger[] = [];
  const textLines = container.querySelectorAll('.text-line');

  // Set initial state
  gsap.set(textLines, { opacity: 0.3, filter: 'blur(20px)', y: 50 });
  if (imageEl) {
    gsap.set(imageEl, { opacity: 0, scale: 1.1 });
  }

  // Image reveal on scroll
  if (imageEl) {
    const imageAnim = gsap.to(imageEl, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'top 40%',
        scrub: 0.8,
      },
    });
    triggers.push(imageAnim.scrollTrigger!);
  }

  // Text blur reveal - delayed by 50%
  const blurAnim = gsap.to(textLines, {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: container,
      start: 'top 50%',
      end: 'top 10%',
      scrub: 0.8,
    },
  });
  triggers.push(blurAnim.scrollTrigger!);

  return { triggers };
}

function createCharStaggerAnimation(
  container: HTMLElement,
  imageEl: HTMLElement | null
): AnimationResult {
  const triggers: ScrollTrigger[] = [];
  const textLines = container.querySelectorAll('.text-line');

  if (textLines.length === 0) return { triggers };

  // Add perspective to each text line for 3D transforms
  textLines.forEach((line) => {
    (line as HTMLElement).style.perspective = '500px';
  });

  // Split each line into characters
  textLines.forEach((line) => {
    splitToChars(line as HTMLElement);
  });
  const chars = container.querySelectorAll('.char');

  // Set initial state
  gsap.set(chars, {
    opacity: 0,
    y: 60,
    rotationX: -30,
    transformOrigin: 'center center',
  });
  if (imageEl) {
    gsap.set(imageEl, { opacity: 0, scale: 1.05 });
  }

  // Image reveal on scroll
  if (imageEl) {
    const imageAnim = gsap.to(imageEl, {
      opacity: 1,
      scale: 1,
      duration: 1,
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'top 40%',
        scrub: 1,
      },
    });
    triggers.push(imageAnim.scrollTrigger!);
  }

  // Character wave animation - delayed by 50%
  const charAnim = gsap.to(chars, {
    opacity: 1,
    y: 0,
    rotationX: 0,
    duration: 0.6,
    stagger: {
      each: 0.02,
      from: 'start',
    },
    ease: 'power3.out',
    scrollTrigger: {
      trigger: container,
      start: 'top 50%',
      end: 'top 10%',
      scrub: 1,
    },
  });
  triggers.push(charAnim.scrollTrigger!);

  return { triggers };
}

function createWordRevealAnimation(
  container: HTMLElement,
  imageEl: HTMLElement | null
): AnimationResult {
  const triggers: ScrollTrigger[] = [];
  const textLines = Array.from(container.querySelectorAll('.text-line'));

  // Split text into words
  textLines.forEach((line) => {
    splitToWords(line as HTMLElement);
  });
  const words = container.querySelectorAll('.word');

  // Set initial state - more dramatic/obvious
  gsap.set(words, { opacity: 0, x: -80, skewX: -25, scale: 0.8 });
  if (imageEl) {
    gsap.set(imageEl, { opacity: 0, x: 80 });
  }

  // Image reveal on scroll
  if (imageEl) {
    const imageAnim = gsap.to(imageEl, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'top 40%',
        scrub: 0.8,
      },
    });
    triggers.push(imageAnim.scrollTrigger!);
  }

  // Word reveal with skew - slowed down by another 20%, more obvious
  const wordAnim = gsap.to(words, {
    opacity: 1,
    x: 0,
    skewX: 0,
    scale: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
      end: 'top 20%',
      scrub: 0.8,
    },
  });
  triggers.push(wordAnim.scrollTrigger!);

  return { triggers };
}

// ============================================================================
// SECTION COMPONENTS
// ============================================================================

interface TextEffectSectionProps {
  section: TextSection;
  index: number;
}

function TextEffectSection({ section }: TextEffectSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = sectionRef.current;
    if (!container) return;

    const imageEl = imageRef.current?.querySelector('.section-image') as HTMLElement | null;
    let result: AnimationResult = { triggers: [] };

    switch (section.animationType) {
      case 'slide':
        result = createSlideAnimation(container, imageEl);
        break;
      case 'scale':
        result = createScaleAnimation(container, imageEl);
        break;
      case 'blur':
        result = createBlurAnimation(container, imageEl);
        break;
      case 'char-stagger':
        result = createCharStaggerAnimation(container, imageEl);
        break;
      case 'word-reveal':
        result = createWordRevealAnimation(container, imageEl);
        break;
    }

    ScrollTrigger.refresh();

    return () => {
      result.triggers.forEach((t) => t.kill());
      gsap.killTweensOf('.text-line');
      gsap.killTweensOf('.word');
      gsap.killTweensOf('.char');
    };
  }, [section.animationType]);

  const getLayoutClasses = (layout: LayoutType): string => {
    switch (layout) {
      case 'text-left':
        return 'flex-row';
      case 'text-right':
        return 'flex-row-reverse';
      case 'centered':
        return 'items-center justify-center text-center';
      case 'full-width':
        return 'relative';
      default:
        return 'flex-row';
    }
  };

  const isFullWidth = section.layout === 'full-width';
  const isCentered = section.layout === 'centered';

  return (
    <section
      ref={sectionRef}
      className={`h-screen w-full flex ${
        isFullWidth || isCentered ? '' : getLayoutClasses(section.layout)
      } relative overflow-hidden`}
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none noise-texture" />

      {/* Full-width background image for blur gallery */}
      {isFullWidth && (
        <div
          ref={imageRef}
          className="absolute inset-0 section-image gpu-accelerated"
        >
          <img
            src={section.imageUrl}
            alt={section.imageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      )}

      {/* Text Content */}
      <div
        className={`relative z-10 ${
          isFullWidth
            ? 'w-full flex flex-col justify-center items-center px-6 md:px-12 lg:px-24'
            : isCentered
              ? 'w-full max-w-5xl px-6 md:px-12 lg:px-24'
              : 'w-full lg:w-[50vw] flex flex-col justify-center px-6 md:px-12 lg:px-24 py-12'
        }`}
      >
        {isCentered ? (
          // Centered layout with background image
          <>
            <div
              ref={imageRef}
              className="absolute inset-0 -z-10 section-image gpu-accelerated"
            >
              <img
                src={section.imageUrl}
                alt={section.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60"></div>
            </div>
            <h2
              className="stagger-text text-white"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 700,
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
              }}
            >
              {section.lines[0]}
            </h2>
          </>
        ) : (
          // Standard text layout
          <div className="space-y-4 md:space-y-5">
            {section.lines.map((line, i) => (
              <p
                key={i}
                className="text-line text-white"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                  fontWeight: 500,
                  lineHeight: 1.05,
                }}
              >
                {line}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Side Image */}
      {!isFullWidth && !isCentered && (
        <div className="hidden lg:flex lg:w-[50vw] h-screen items-center justify-center">
          <div
            ref={imageRef}
            className="relative w-full h-full section-image gpu-accelerated"
          >
            <img
              src={section.imageUrl}
              alt={section.imageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>
      )}
    </section>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const title = hero.querySelector('.hero-title');
    const subtitle = hero.querySelector('.hero-subtitle');
    const scrollIndicator = hero.querySelector('.scroll-indicator');

    if (title && subtitle && scrollIndicator) {
      gsap.set([title, subtitle, scrollIndicator], { opacity: 0, y: 30 });
      gsap.to([title, subtitle, scrollIndicator], {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }

    return () => {
      gsap.killTweensOf('.hero-title, .hero-subtitle, .scroll-indicator');
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="h-screen w-full flex items-center justify-center relative overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#ff6b35] rounded-full blur-[200px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-zinc-800 rounded-full blur-[150px]"></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5 grid-pattern-overlay-xl" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p className="hero-subtitle text-[#ff6b35] text-sm font-semibold tracking-[0.3em] uppercase mb-6">
          Exhibition
        </p>
        <h1
          className="hero-title text-white mb-4 leading-[0.9]"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            fontWeight: 700,
          }}
        >
          Text Effects
        </h1>
        <p
          className="hero-subtitle text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Scroll to experience kinetic typography inspired by museum exhibition
          design
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-white/40 text-xs tracking-[0.2em] uppercase">
          Scroll
        </span>
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-0.5 h-2 bg-[#ff6b35] rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// END SECTION
// ============================================================================

function EndSection() {
  return (
    <section className="h-screen w-full flex items-center justify-center px-6">
      <div className="text-center">
        <p
          className="text-white/60 text-lg mb-8"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Explore more animation demos
        </p>
        <a
          href="/"
          className="inline-block px-8 py-4 bg-[#ff6b35] text-white font-semibold rounded-full hover:bg-[#e55a2b] transition-colors"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Back to Home
        </a>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function TextEffects() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="bg-black min-h-screen">
      <HeroSection />
      {TEXT_SECTIONS.map((section, index) => (
        <TextEffectSection key={section.id} section={section} index={index} />
      ))}
      <EndSection />
    </div>
  );
}
