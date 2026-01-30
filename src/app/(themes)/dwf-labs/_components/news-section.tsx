/**
 * News Section
 *
 * Section 5: Staggered Reveal + Card Tilt
 * Features:
 * - US-017: News staggered list reveal
 * - US-018: News card 3D tilt on mouse move
 * - US-019: News shine effect and thumbnail zoom
 */

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';
import { NewsThumbnail } from './news-thumbnail';
import { newsArticles } from '../_lib/news-data';

interface NewsSectionProps {
  prefersReducedMotion: boolean;
}

export function NewsSection({ prefersReducedMotion }: NewsSectionProps) {
  const newsRef = useRef<HTMLDivElement>(null);

  // US-017: News staggered list reveal
  useGSAP(() => {
    // US-026: Skip all animations if reduced motion is preferred
    if (prefersReducedMotion) return;

    const news = newsRef.current;
    if (!news) return;

    // Get all news cards for staggered reveal
    const newsCards = news.querySelectorAll('.news-card');

    // Set initial state for staggered reveal
    gsap.set(newsCards, { y: 60, opacity: 0 });

    // Create staggered reveal animation
    gsap.to(newsCards, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: news,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });

    // Cleanup is automatic with useGSAP
  }, { scope: newsRef, dependencies: [prefersReducedMotion] });

  // US-018: News card 3D tilt on mouse move
  // US-019: News shine effect and thumbnail zoom
  // CRITICAL: Using contextSafe() ensures GSAP tweens created in event handlers
  // are bound to the GSAP context for automatic cleanup on unmount/navigation
  useGSAP((context, contextSafe) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const safe = contextSafe!;
    // US-026: Skip mouse move effects if reduced motion is preferred
    if (prefersReducedMotion) return;

    const news = newsRef.current;
    if (!news) return;

    const cards = news.querySelectorAll('.news-card');
    const cleanupFunctions: Array<() => void> = [];

    cards.forEach((card) => {
      const shine = card.querySelector('.news-shine') as HTMLElement;
      const thumbnailImg = card.querySelector('.news-thumbnail img') as HTMLElement | null;

      // High-performance hover: avoid layout reads + tween creation on every mousemove.
      // - Cache bounds on enter/resize
      // - rAF-throttle pointer updates
      // - use quickTo/quickSetter for transform/CSS vars
      const cardEl = card as HTMLElement;
      let rect = cardEl.getBoundingClientRect();
      let rafId: number | null = null;
      let pendingX = rect.width / 2;
      let pendingY = rect.height / 2;

      const rotateXTo = gsap.quickTo(cardEl, 'rotateX', { duration: 0.25, ease: 'power2.out' });
      const rotateYTo = gsap.quickTo(cardEl, 'rotateY', { duration: 0.25, ease: 'power2.out' });

      const thumbScaleTo = thumbnailImg
        ? gsap.quickTo(thumbnailImg, 'scale', { duration: 0.25, ease: 'power2.out' })
        : null;

      // Use CSS vars for shine so we don't rebuild gradients on every move
      const setShineX = shine ? gsap.quickSetter(shine, '--mx', 'px') : null;
      const setShineY = shine ? gsap.quickSetter(shine, '--my', 'px') : null;
      const shineOpacityTo = shine ? gsap.quickTo(shine, 'opacity', { duration: 0.25, ease: 'power2.out' }) : null;

      gsap.set(cardEl, { transformPerspective: 1000, transformStyle: 'preserve-3d' });
      if (shine) {
        gsap.set(shine, { opacity: 0 });
        // Initialize shine position to center (prevents first-hover "jump")
        if (setShineX && setShineY) {
          setShineX(rect.width / 2);
          setShineY(rect.height / 2);
        }
      }

      const update = () => {
        rafId = null;
        const x = pendingX / rect.width;
        const y = pendingY / rect.height;

        rotateXTo((y - 0.5) * -24);
        rotateYTo((x - 0.5) * 24);

        if (setShineX && setShineY && shineOpacityTo) {
          setShineX(pendingX);
          setShineY(pendingY);
          shineOpacityTo(0.35);
        }

        if (thumbScaleTo) {
          thumbScaleTo(1.08);
        }
      };

      const handleMouseEnter = safe(() => {
        rect = cardEl.getBoundingClientRect();
      });

      // CRITICAL: Wrap handlers in contextSafe() so they are cleaned up properly
      const handleMouseMove = safe((e: Event) => {
        const mouseEvent = e as MouseEvent;
        pendingX = mouseEvent.clientX - rect.left;
        pendingY = mouseEvent.clientY - rect.top;
        if (rafId === null) {
          rafId = window.requestAnimationFrame(update);
        }
      });

      const handleMouseLeave = safe(() => {
        if (rafId !== null) {
          window.cancelAnimationFrame(rafId);
          rafId = null;
        }
        rotateXTo(0);
        rotateYTo(0);
        if (shineOpacityTo) shineOpacityTo(0);
        if (thumbScaleTo) thumbScaleTo(1);
      });

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      cleanupFunctions.push(() => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    });

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, { scope: newsRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={newsRef}
      id="news"
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-zinc-900/60 to-zinc-950" />

        {/* Subtle orange ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[200px] animate-pulse" style={{ animationDuration: '18s' }} />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-8" style={{
          backgroundImage: `
            linear-gradient(rgba(249, 115, 22, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249, 115, 22, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '90px 90px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-4" style={{ textShadow: '0 0 40px rgba(249,115,22,0.3)' }}>
            Latest <span className="text-orange-500" style={{ textShadow: '0 0 50px rgba(249,115,22,0.5)' }}>News</span>
          </h2>
          <p className="text-zinc-500 text-sm uppercase tracking-[0.15em]">
            Stay updated with our latest developments
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.map((article) => (
            <article
              key={article.id}
              className="news-card group relative bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 overflow-hidden hover:border-orange-500/50 transition-all duration-300"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Shine effect overlay */}
              <div
                className="news-shine absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-200"
                style={{
                  // CSS-var-driven shine: cheaper than rebuilding the gradient string each mousemove
                  background: 'radial-gradient(circle 120px at var(--mx) var(--my), rgba(249, 115, 22, 0.4), transparent)',
                }}
              />

              {/* Thumbnail with lazy loading */}
              <NewsThumbnail article={article} />

              {/* Content */}
              <div className="p-6 relative">
                {/* Date badge */}
                <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1 mb-4">
                  <div className="relative">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    <div className="absolute inset-0 w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping opacity-30" />
                  </div>
                  <span className="text-xs text-orange-500 uppercase tracking-wider">{article.date}</span>
                </div>

                {/* Category badge */}
                <div className="mb-3">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider group-hover:text-zinc-400 transition-colors duration-300">{article.badge}</span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors duration-300 leading-relaxed">
                  {article.title}
                </h3>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-orange-500 transition-all duration-500 ease-out group-hover:w-8 group-hover:h-8" />
              <div className="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-orange-500 transition-all duration-500 ease-out group-hover:w-8 group-hover:h-8" />

              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-linear-to-br from-orange-500/0 to-orange-500/0 transition-all duration-500 group-hover:from-orange-500/5 group-hover:to-orange-500/0 pointer-events-none" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
