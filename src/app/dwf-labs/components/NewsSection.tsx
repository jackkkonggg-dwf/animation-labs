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

import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { NewsThumbnail } from './NewsThumbnail';
import { newsArticles } from '../lib/news-data';

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

    // Track all ScrollTriggers for cleanup
    const triggers: ScrollTrigger[] = [];

    // Get all news cards for staggered reveal
    const newsCards = news.querySelectorAll('.news-card');

    // Set initial state for staggered reveal
    gsap.set(newsCards, { y: 60, opacity: 0, force3D: true });

    // Create staggered reveal animation
    gsap.to(newsCards, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
      force3D: true, // GPU acceleration
      scrollTrigger: {
        trigger: news,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });

    // Collect ScrollTriggers for cleanup
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === news || news.contains(trigger.trigger as Element)) {
        triggers.push(trigger);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(newsCards);
    };
  }, { scope: newsRef, dependencies: [prefersReducedMotion] });

  // US-018: News card 3D tilt on mouse move
  // US-019: News shine effect and thumbnail zoom
  useEffect(() => {
    // US-026: Skip mouse move effects if reduced motion is preferred
    if (prefersReducedMotion) return;

    const news = newsRef.current;
    if (!news) return;

    const cards = news.querySelectorAll('.news-card');
    const cleanupFunctions: Array<() => void> = [];

    cards.forEach((card) => {
      const shine = card.querySelector('.news-shine') as HTMLElement;
      const thumbnail = card.querySelector('.news-thumbnail > div') as HTMLElement;

      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = (mouseEvent.clientX - rect.left) / rect.width; // Normalize to 0-1
        const y = (mouseEvent.clientY - rect.top) / rect.height; // Normalize to 0-1

        // US-018: RotateX: (y - 0.5) * -30deg (max ±15deg)
        // US-018: RotateY: (x - 0.5) * 30deg (max ±15deg)
        const rotateX = (y - 0.5) * -30;
        const rotateY = (x - 0.5) * 30;

        gsap.to(card, {
          rotateX,
          rotateY,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000,
          force3D: true, // GPU acceleration
        });

        // US-019: Shine effect follows mouse
        // Position the radial gradient at mouse coordinates
        const xPos = (mouseEvent.clientX - rect.left) / 1; // Pixel position
        const yPos = (mouseEvent.clientY - rect.top) / 1;
        if (shine) {
          gsap.to(shine, {
            opacity: 0.3,
            duration: 0.3,
            ease: 'power2.out',
            force3D: true, // GPU acceleration
            background: `radial-gradient(circle 100px at ${xPos}px ${yPos}px, rgba(255, 255, 255, 0.3), transparent)`,
          });
        }

        // US-019: Thumbnail zoom to 1.1 on hover
        if (thumbnail) {
          gsap.to(thumbnail, {
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out',
            force3D: true, // GPU acceleration
            transformOrigin: 'center center',
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000,
          force3D: true, // GPU acceleration
        });

        // US-019: Reset shine opacity
        if (shine) {
          gsap.to(shine, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
            force3D: true, // GPU acceleration
          });
        }

        // US-019: Reset thumbnail scale
        if (thumbnail) {
          gsap.to(thumbnail, {
            scale: 1.0,
            duration: 0.3,
            ease: 'power2.out',
            transformOrigin: 'center center',
            force3D: true, // GPU acceleration
          });
        }
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      // Store cleanup function for this card
      cleanupFunctions.push(() => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
        gsap.killTweensOf(card);
        if (shine) gsap.killTweensOf(shine);
        if (thumbnail) gsap.killTweensOf(thumbnail);
      });
    });

    // Cleanup all event listeners and tweens on unmount
    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={newsRef}
      id="news"
      className="relative py-24 px-4 bg-zinc-900/50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-4">
            Latest <span className="text-orange-500">News</span>
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
              className="news-card group relative bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-orange-500/50 transition-all duration-200"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              {/* Shine effect overlay */}
              <div className="news-shine absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ willChange: 'opacity, background' }} />

              {/* Thumbnail with lazy loading */}
              <NewsThumbnail article={article} />

              {/* Content */}
              <div className="p-6">
                {/* Date badge */}
                <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1 mb-4">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  <span className="text-xs text-orange-500 uppercase tracking-wider">{article.date}</span>
                </div>

                {/* Category badge */}
                <div className="mb-3">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">{article.badge}</span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors duration-200 leading-relaxed">
                  {article.title}
                </h3>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
