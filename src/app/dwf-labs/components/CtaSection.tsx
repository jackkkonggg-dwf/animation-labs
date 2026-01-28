/**
 * CTA Section (Call to Action + Footer)
 *
 * Section 6: Draggable Pattern Gallery + Footer
 * Features:
 * - US-020: CTA draggable pattern gallery
 * - US-021: Active card scale and progress indicator
 */

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, Draggable } from '@/lib/gsap-config';

interface CtaSectionProps {
  prefersReducedMotion: boolean;
}

export function CtaSection({ prefersReducedMotion }: CtaSectionProps) {
  const patternGalleryRef = useRef<HTMLDivElement>(null);

  // US-020: CTA draggable pattern gallery
  // US-021: Active card scale and progress indicator
  useGSAP(() => {
    // US-026: Skip all animations if reduced motion is preferred
    if (prefersReducedMotion) return;

    const gallery = patternGalleryRef.current;
    if (!gallery) return;

    // Get the draggable track element
    const track = gallery.querySelector('.pattern-gallery-track') as HTMLElement;
    if (!track) return;

    // Get all pattern cards to calculate snap points
    const cards = gallery.querySelectorAll('.pattern-card');
    if (cards.length === 0) return;

    // Calculate card width including gap for snap points
    // Card is w-40 (160px) + gap-4 (16px) = 176px per card
    const cardWidth = 176;

    // Generate snap points for each card position
    const snapPoints = Array.from(cards).map((_, index) => -index * cardWidth);

    // Get progress indicator elements
    const progressFill = gallery.querySelector('.pattern-progress-fill') as HTMLElement;
    const progressText = gallery.querySelector('.pattern-progress-text') as HTMLElement;

    // US-021: Helper function to update active card and progress
    const updateActiveCard = (xPosition: number) => {
      const galleryWidth = gallery.offsetWidth;
      const galleryCenter = galleryWidth / 2;

      // Calculate which card is centered
      // xPosition is negative when scrolled right, so we add offset to find centered card
      const centeredIndex = Math.round(-xPosition / cardWidth);
      const clampedIndex = Math.max(0, Math.min(centeredIndex, cards.length - 1));

      // Scale the active card to 1.1, reset others to 1.0
      cards.forEach((card, index) => {
        const isActive = index === clampedIndex;
        gsap.to(card, {
          scale: isActive ? 1.1 : 1.0,
          duration: 0.3,
          ease: 'power2.out',
          force3D: true, // GPU acceleration
        });
      });

      // Update progress bar width (0% to 100% based on position)
      const totalScrollWidth = (cards.length - 1) * cardWidth;
      const progress = Math.min(Math.max(-xPosition / totalScrollWidth, 0), 1);
      if (progressFill) {
        gsap.to(progressFill, {
          width: `${progress * 100}%`,
          duration: 0.3,
          ease: 'power2.out',
          force3D: true, // GPU acceleration
        });
      }

      // Update progress text "Pattern X/14"
      if (progressText) {
        progressText.textContent = `Pattern ${clampedIndex + 1}/${cards.length}`;
      }
    };

    // Create draggable instance with InertiaPlugin
    const draggableInstance = Draggable.create(track, {
      type: 'x', // Horizontal dragging only
      bounds: {
        // Allow dragging to show all cards (negative max = scroll left)
        minX: -(cards.length - 1) * cardWidth - 100, // Extra buffer at end
        maxX: 100, // Small buffer at start
      },
      inertia: true, // Enable InertiaPlugin for smooth momentum
      throwResistance: 2000, // Higher = more resistance (deceleration)
      edgeResistance: 0.8, // Resistance at bounds (0 = no resistance, 1 = no movement past edge)
      snap: {
        x: snapPoints, // Snap to nearest card position
      },
      zIndexBoost: false, // Don't change z-index during drag
      // US-021: Update active card and progress during drag
      onDrag: function() {
        updateActiveCard(this.x);
      },
      // US-021: Update active card and progress when drag ends
      onDragEnd: function() {
        updateActiveCard(this.x);
      },
      // US-021: Also update on throw update (inertia animation)
      onThrowUpdate: function() {
        updateActiveCard(this.x);
      },
    });

    // US-021: Initialize with first card active
    updateActiveCard(0);

    // Cleanup Draggable on unmount
    return () => {
      if (draggableInstance[0]) {
        draggableInstance[0].kill();
      }
      gsap.killTweensOf(cards);
      if (progressFill) gsap.killTweensOf(progressFill);
    };
  }, { scope: patternGalleryRef, dependencies: [prefersReducedMotion] });

  return (
    <section id="cta" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* CTA Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-6">
            Explore Our <span className="text-orange-500">Ecosystem</span>
          </h2>
          <p className="text-zinc-400 text-sm max-w-2xl mx-auto mb-8">
            Discover the full range of our services and portfolio companies
          </p>

          {/* CTA Button */}
          <a
            href="https://www.dwf-labs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange-500 text-black font-semibold px-8 py-4 rounded-lg hover:bg-orange-400 hover:scale-105 transition-all duration-200"
          >
            <span>View Ecosystem</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Pattern Gallery Preview */}
        <div ref={patternGalleryRef} className="pattern-gallery overflow-hidden mb-16">
          <div className="text-center mb-8">
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4">
              Animation Patterns Showcase
            </p>
            {/* US-021: Progress indicator text */}
            <p className="pattern-progress-text text-sm text-orange-500 font-semibold">
              Pattern 1/14
            </p>
          </div>
          {/* US-021: Progress bar */}
          <div className="pattern-progress-bar h-1 bg-zinc-800 rounded-full mb-6 overflow-hidden">
            <div className="pattern-progress-fill h-full bg-orange-500 rounded-full w-0 transition-all duration-300" style={{ willChange: 'width, transform' }} />
          </div>
          <div className="pattern-gallery-track flex gap-4 pb-4" style={{ width: 'max-content' }}>
            {[
              'Fade Reveal', 'Stagger', 'Parallax', 'Scrub', 'Pinned',
              'Count Up', 'Batch', 'Char Text', 'Word Text', 'SVG Draw',
              'Button Hover', 'Card Tilt', 'Multi-Layer', 'Draggable',
            ].map((pattern, i) => (
              <div
                key={pattern}
                className="pattern-card flex-shrink-0 w-40 h-32 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-center p-4 hover:border-orange-500/50 transition-colors duration-200"
                data-index={i}
                style={{ willChange: 'transform' }}
              >
                <div>
                  <div className="text-2xl font-black text-orange-500/40 mb-2">{String(i + 1).padStart(2, '0')}</div>
                  <span className="text-xs text-zinc-400 uppercase tracking-wider">{pattern}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-orange-500/20 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
                DWF <span className="text-orange-500">LABS</span>
              </h3>
              <p className="text-zinc-500 text-sm">
                New Generation Web3 Investor and Market Maker
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#services" className="text-sm text-zinc-500 hover:text-orange-500 transition-colors">Services</a></li>
                <li><a href="#stats" className="text-sm text-zinc-500 hover:text-orange-500 transition-colors">Stats</a></li>
                <li><a href="#portfolio" className="text-sm text-zinc-500 hover:text-orange-500 transition-colors">Portfolio</a></li>
                <li><a href="#news" className="text-sm text-zinc-500 hover:text-orange-500 transition-colors">News</a></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Connect</h4>
              <div className="flex gap-4">
                <a
                  href="https://twitter.com/dwflabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-500 hover:text-orange-500 hover:border-orange-500/50 transition-all duration-200"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/dwflabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-500 hover:text-orange-500 hover:border-orange-500/50 transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://t.me/dwflabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-500 hover:text-orange-500 hover:border-orange-500/50 transition-all duration-200"
                  aria-label="Telegram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-800">
            <p className="text-zinc-600 text-sm mb-4 md:mb-0">
              DWF Labs © 2025
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-zinc-600 hover:text-orange-500 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-zinc-600 hover:text-orange-500 transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-zinc-600 hover:text-orange-500 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
