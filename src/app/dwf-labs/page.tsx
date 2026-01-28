/**
 * DWF Labs Page
 *
 * Production-ready DWF Labs website featuring advanced GSAP animation patterns
 * with Animation Labs visual theme (industrial orange-500 + dark zinc-950).
 *
 * Preserves all original DWF content (Web3 investor, market maker, portfolio, news).
 */

'use client';

import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, Draggable, InertiaPlugin } from '@/lib/gsap-config';

export default function DWFLabsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const marqueeRowRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const patternGalleryRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Track all ScrollTriggers for cleanup
    const triggers: ScrollTrigger[] = [];

    // US-004: Hero character text reveal animation
    const titleChars = hero.querySelectorAll('.hero-title span');
    gsap.set(titleChars, { y: 100, opacity: 0, rotation: -5, force3D: true });

    gsap.to(titleChars, {
      y: 0,
      opacity: 1,
      rotation: 0,
      duration: 0.8,
      stagger: 0.03,
      ease: 'back.out(1.7)',
      delay: 0.2,
      force3D: true, // GPU acceleration
    });

    // US-005: Hero tagline word reveal animation
    const taglineWords = hero.querySelectorAll('.hero-tagline span');
    gsap.set(taglineWords, { y: 50, opacity: 0, force3D: true });

    gsap.to(taglineWords, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      delay: 0.3, // Delay after character reveal
      force3D: true, // GPU acceleration
    });

    // US-006: Hero multi-layer parallax background
    const layer1 = hero.querySelector('.parallax-layer-1');
    const layer2 = hero.querySelector('.parallax-layer-2');
    const layer3 = hero.querySelector('.parallax-layer-3');
    const layer4 = hero.querySelector('.parallax-layer-4');

    // Layer 1: Grid pattern - slowest (speed: 0.2)
    if (layer1) {
      gsap.to(layer1, {
        y: 100,
        ease: 'none',
        force3D: true, // GPU acceleration
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Layer 2: Crypto symbols (circles, hexagons, lines) - slow (speed: 0.5)
    if (layer2) {
      gsap.to(layer2, {
        y: 250,
        ease: 'none',
        force3D: true, // GPU acceleration
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Layer 3: Data particles - medium (speed: 0.8)
    if (layer3) {
      gsap.to(layer3, {
        y: 400,
        ease: 'none',
        force3D: true, // GPU acceleration
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Layer 4: Text/content - fastest (speed: 1.0)
    if (layer4) {
      gsap.to(layer4, {
        y: 500,
        ease: 'none',
        force3D: true, // GPU acceleration
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // US-007: Hero SVG corner accents drawing animation
    const cornerPaths = hero.querySelectorAll('.corner-draw-path');
    cornerPaths.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    gsap.to(cornerPaths, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.5,
      force3D: true, // GPU acceleration
    });

    // Collect ScrollTriggers for cleanup
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === hero || hero.contains(trigger.trigger as Element)) {
        triggers.push(trigger);
      }
    });

    return () => {
      gsap.killTweensOf(titleChars);
      gsap.killTweensOf(taglineWords);
      gsap.killTweensOf(cornerPaths);
      triggers.forEach((t) => t.kill());
    };
  }, { scope: heroRef });

  // US-008: Services pinned section with progress bar
  useGSAP(() => {
    const services = servicesRef.current;
    if (!services) return;

    // Track all ScrollTriggers for cleanup
    const triggers: ScrollTrigger[] = [];

    // US-009: Services staggered card reveal
    const serviceCards = services.querySelectorAll('.service-card');
    gsap.set(serviceCards, { y: 100, opacity: 0, scale: 0.9, force3D: true });

    const cardTimeline = gsap.to(serviceCards, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.3,
      ease: 'back.out(1.2)',
      force3D: true, // GPU acceleration
      scrollTrigger: {
        trigger: services,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });

    // US-010: Services icon animations with color transform
    const serviceIcons = services.querySelectorAll('.service-icon svg');
    gsap.set(serviceIcons, { color: '#3f3f46' }); // zinc-700

    gsap.to(serviceIcons, {
      scale: 1.2,
      rotation: 360,
      color: '#f97316', // orange-500
      duration: 0.6,
      stagger: 0.2,
      ease: 'back.out(1)',
      force3D: true, // GPU acceleration
      scrollTrigger: {
        trigger: services,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });

    // Pin the services section for 3000px of scroll
    const pinTrigger = ScrollTrigger.create({
      trigger: services,
      start: 'top center',
      end: '+=3000',
      pin: true,
      scrub: 1,
      // Toggle the PINNED badge state
      onToggle: (self) => {
        const badgeText = services.querySelector('.services-pin-badge span');
        if (badgeText) {
          badgeText.textContent = self.isActive ? 'PINNED' : 'Pinned Section';
        }
      },
    });
    triggers.push(pinTrigger);

    // Animate progress bar from 0% to 100% during pin
    const progressFill = services.querySelector('.services-progress-fill');
    if (progressFill) {
      gsap.to(progressFill, {
        width: '100%',
        ease: 'none',
        force3D: true, // GPU acceleration
        scrollTrigger: {
          trigger: services,
          start: 'top center',
          end: '+=3000',
          scrub: 1,
        },
      });
    }

    // Collect ScrollTriggers for cleanup
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === services || services.contains(trigger.trigger as Element)) {
        if (!triggers.includes(trigger)) {
          triggers.push(trigger);
        }
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(progressFill);
      gsap.killTweensOf(serviceCards);
      gsap.killTweensOf(serviceIcons);
    };
  }, { scope: servicesRef });

  // US-011: Stats count up animation
  useGSAP(() => {
    const stats = statsRef.current;
    if (!stats) return;

    // Track all ScrollTriggers for cleanup
    const triggers: ScrollTrigger[] = [];

    // Get all stat value elements with their data-target attributes
    const statValues = stats.querySelectorAll('.stat-value');

    // US-013: Get all stat progress circles for circular animation
    const progressCircles = stats.querySelectorAll('.stat-progress-circle');

    statValues.forEach((statValue, index) => {
      const target = parseInt((statValue as HTMLElement).dataset.target || '0', 10);
      const counterObj = { value: 0 };
      const circle = progressCircles[index] as SVGCircleElement;

      // Count up animation from 0 to target
      gsap.to(counterObj, {
        value: target,
        duration: 2,
        ease: 'power2.out',
        snap: { value: 1 }, // Snap to whole integers
        scrollTrigger: {
          trigger: stats,
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
        onUpdate: () => {
          // Update the element text with current value
          (statValue as HTMLElement).textContent = Math.round(counterObj.value).toString();
        },
        force3D: true, // GPU acceleration
      });

      // US-013: Animate circular progress indicator
      // Circle circumference = 2 * PI * 56 ≈ 351.86
      const circumference = 351.86;
      if (circle) {
        gsap.to(circle, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.out',
          force3D: true, // GPU acceleration
          scrollTrigger: {
            trigger: stats,
            start: 'top center',
            toggleActions: 'play none none reverse',
          },
        });
      }
    });

    // Collect ScrollTriggers for cleanup
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === stats || stats.contains(trigger.trigger as Element)) {
        triggers.push(trigger);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(statValues);
      gsap.killTweensOf(progressCircles);
    };
  }, { scope: statsRef });

  // US-012: Stats scrub timeline and icon transforms
  useGSAP(() => {
    const stats = statsRef.current;
    if (!stats) return;

    // Track all ScrollTriggers for cleanup
    const triggers: ScrollTrigger[] = [];

    // Get all stat icon SVG elements
    const statIcons = stats.querySelectorAll('.stat-icon svg');

    // Create timeline with scrub linked to scroll position
    const iconTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: stats,
        start: 'top center',
        end: 'bottom center',
        scrub: 1, // Smooth catch-up to scroll position
      },
    });

    // Animate icons: scale 1.0 → 1.3, rotation 0deg → 45deg, zinc-700 → orange-500
    iconTimeline.to(statIcons, {
      scale: 1.3,
      rotation: 45,
      color: '#f97316', // orange-500
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      force3D: true, // GPU acceleration
    });

    // Collect ScrollTriggers for cleanup
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === stats || stats.contains(trigger.trigger as Element)) {
        if (!triggers.includes(trigger)) {
          triggers.push(trigger);
        }
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(statIcons);
    };
  }, { scope: statsRef });

  // US-014: Portfolio grid batch reveal
  useGSAP(() => {
    const portfolio = portfolioRef.current;
    if (!portfolio) return;

    // Track all ScrollTriggers for cleanup
    const triggers: ScrollTrigger[] = [];

    // Get all portfolio cards for batch animation
    const portfolioCards = portfolio.querySelectorAll('.portfolio-card');

    // Set initial state for batch animation
    gsap.set(portfolioCards, { y: 60, opacity: 0, scale: 0.95, force3D: true });

    // Register ScrollTrigger batch
    const batchTrigger = ScrollTrigger.batch(portfolioCards, {
      onEnter: (batch) =>
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          force3D: true, // GPU acceleration
        }),
      onLeave: (batch) =>
        gsap.to(batch, {
          y: -60,
          opacity: 0,
          scale: 0.95,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.in',
          force3D: true, // GPU acceleration
        }),
      onEnterBack: (batch) =>
        gsap.to(batch, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          force3D: true, // GPU acceleration
        }),
      onLeaveBack: (batch) =>
        gsap.to(batch, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.in',
          force3D: true, // GPU acceleration
        }),
      start: 'top center',
    });
    triggers.push(...batchTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(portfolioCards);
    };
  }, { scope: portfolioRef });

  // US-015: Portfolio infinite horizontal marquee
  useGSAP(() => {
    const marqueeRow = marqueeRowRef.current;
    if (!marqueeRow) return;

    // Animate xPercent from 0 to -50 for seamless infinite loop
    // The marquee contains duplicated content, so moving -50% creates perfect loop
    gsap.to(marqueeRow, {
      xPercent: -50,
      duration: 20,
      ease: 'none',
      repeat: -1,
      force3D: true, // GPU acceleration
    });

    return () => {
      gsap.killTweensOf(marqueeRow);
    };
  }, { scope: marqueeRowRef });

  // US-017: News staggered list reveal
  useGSAP(() => {
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
  }, { scope: newsRef });

  // US-018: News card 3D tilt on mouse move
  // US-019: News shine effect and thumbnail zoom
  useEffect(() => {
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
  }, [newsRef]);

  // US-020: CTA draggable pattern gallery
  // US-021: Active card scale and progress indicator
  useGSAP(() => {
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
  }, { scope: patternGalleryRef });

  return (
    <main className="min-h-screen bg-zinc-950 overflow-x-hidden">
      {/* Section 1: Hero - Kinetic Text Reveal + Multi-Layer Parallax */}
      <section
        ref={heroRef}
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Parallax background layers */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Layer 1: Grid Pattern */}
          <div className="parallax-layer-1 absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

          {/* Layer 2: Floating Geometric Shapes */}
          <div className="parallax-layer-2 absolute inset-0" aria-hidden="true">
            {/* Circles representing coins */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border-2 border-zinc-800 opacity-20" />
            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full border-2 border-zinc-800 opacity-20" />
            <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full border-2 border-zinc-800 opacity-20" />

            {/* Hexagons representing blocks */}
            <svg className="absolute top-1/3 right-1/4 w-20 h-20 opacity-10" viewBox="0 0 100 100">
              <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="currentColor" className="text-zinc-700" strokeWidth="2" />
            </svg>
            <svg className="absolute bottom-1/4 left-1/3 w-16 h-16 opacity-10" viewBox="0 0 100 100">
              <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="currentColor" className="text-zinc-700" strokeWidth="2" />
            </svg>

            {/* Lines representing charts */}
            <svg className="absolute top-1/2 left-1/4 w-48 h-24 opacity-10" viewBox="0 0 200 100">
              <polyline points="0,80 40,60 80,70 120,30 160,40 200,10" fill="none" stroke="currentColor" className="text-orange-500" strokeWidth="2" />
            </svg>
          </div>

          {/* Layer 3: Data Particles */}
          <div className="parallax-layer-3 absolute inset-0" aria-hidden="true">
            <div className="absolute top-1/4 left-1/2 w-1 h-1 bg-orange-500 rounded-full opacity-30" />
            <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-zinc-700 rounded-full opacity-40" />
            <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-zinc-700 rounded-full opacity-40" />
            <div className="absolute bottom-1/4 right-1/2 w-1 h-1 bg-orange-500 rounded-full opacity-30" />
          </div>
        </div>

        {/* Content Layer */}
        <div className="parallax-layer-4 relative z-10 text-center px-4 max-w-6xl mx-auto">
          {/* Character reveal: DWF LABS */}
          <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter uppercase mb-6">
            <span className="inline-block" style={{ willChange: 'transform, opacity' }}>D</span>
            <span className="inline-block" style={{ willChange: 'transform, opacity' }}>W</span>
            <span className="inline-block" style={{ willChange: 'transform, opacity' }}>F</span>
            <span className="inline-block" style={{ willChange: 'transform, opacity' }}>&nbsp;</span>
            <span className="inline-block text-orange-500" style={{ willChange: 'transform, opacity' }}>L</span>
            <span className="inline-block text-orange-500" style={{ willChange: 'transform, opacity' }}>A</span>
            <span className="inline-block text-orange-500" style={{ willChange: 'transform, opacity' }}>B</span>
            <span className="inline-block text-orange-500" style={{ willChange: 'transform, opacity' }}>S</span>
          </h1>

          {/* Word reveal: Tagline */}
          <p className="hero-tagline text-lg md:text-xl lg:text-2xl text-zinc-400 uppercase tracking-[0.2em] mb-4">
            <span className="inline-block" style={{ willChange: 'transform, opacity' }}>New</span>
            <span className="inline-block" style={{ willChange: 'transform, opacity' }}>Generation</span>
            <span className="inline-block" style={{ willChange: 'transform, opacity' }}>Web3</span>
            <span className="inline-block" style={{ willChange: 'transform, opacity' }}>Investor</span>
            <span className="inline-block" style={{ willChange: 'transform, opacity' }}>&</span>
            <span className="inline-block" style={{ willChange: 'transform, opacity' }}>Market</span>
            <span className="inline-block" style={{ willChange: 'transform, opacity' }}>Maker</span>
          </p>

          {/* Description */}
          <p className="hero-description text-sm md:text-base text-zinc-500 max-w-2xl mx-auto">
            One of the world&apos;s largest high-frequency cryptocurrency trading entities
          </p>

          {/* SVG Corner Accents - smaller on mobile */}
          <svg className="absolute top-4 left-4 w-10 h-10 sm:top-8 sm:left-8 sm:w-16 sm:h-16 text-orange-500 opacity-50" viewBox="0 0 60 60">
            <path className="corner-draw-path" style={{ willChange: 'stroke-dashoffset' }} d="M5,5 L55,5 L55,55" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="absolute top-4 right-4 w-10 h-10 sm:top-8 sm:right-8 sm:w-16 sm:h-16 text-orange-500 opacity-50" viewBox="0 0 60 60">
            <path className="corner-draw-path" style={{ willChange: 'stroke-dashoffset' }} d="M55,5 L5,5 L5,55" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="absolute bottom-4 left-4 w-10 h-10 sm:bottom-8 sm:left-8 sm:w-16 sm:h-16 text-orange-500 opacity-50" viewBox="0 0 60 60">
            <path className="corner-draw-path" style={{ willChange: 'stroke-dashoffset' }} d="M5,55 L55,55 L55,5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="absolute bottom-4 right-4 w-10 h-10 sm:bottom-8 sm:right-8 sm:w-16 sm:h-16 text-orange-500 opacity-50" viewBox="0 0 60 60">
            <path className="corner-draw-path" style={{ willChange: 'stroke-dashoffset' }} d="M55,55 L5,55 L5,5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* Section 2: Services - Pinned Sequence with Animated Cards */}
      <section
        ref={servicesRef}
        id="services"
        className="services-section relative min-h-screen flex items-center py-24 px-4"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-4">
              Adding Real Value as <span className="text-orange-500">Partners</span>
            </h2>
            <p className="text-zinc-500 text-sm uppercase tracking-[0.15em]">
              Comprehensive crypto solutions
            </p>
          </div>

          {/* Pin Indicator Badge */}
          <div className="services-pin-badge flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-xs text-zinc-400 uppercase tracking-wider">Pinned Section</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="services-progress-bar max-w-md mx-auto mb-12">
            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div className="services-progress-fill h-full bg-orange-500 rounded-full w-0" style={{ willChange: 'width, transform' }} />
            </div>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1: Market Making */}
            <div className="service-card group relative bg-zinc-900 border border-zinc-800 p-8 hover:border-orange-500/50 transition-colors duration-200" style={{ willChange: 'transform, opacity' }}>
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

              {/* Number badge */}
              <div className="service-number text-5xl font-black text-orange-500/20 mb-4">01</div>

              {/* Icon */}
              <div className="service-icon w-16 h-16 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 text-zinc-400 group-hover:bg-orange-500 group-hover:text-black transition-colors duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">Market Making</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Empower your project with innovative crypto market making solutions
              </p>
            </div>

            {/* Card 2: OTC Trading */}
            <div className="service-card group relative bg-zinc-900 border border-zinc-800 p-8 hover:border-orange-500/50 transition-colors duration-200" style={{ willChange: 'transform, opacity' }}>
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

              {/* Number badge */}
              <div className="service-number text-5xl font-black text-orange-500/20 mb-4">02</div>

              {/* Icon */}
              <div className="service-icon w-16 h-16 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 text-zinc-400 group-hover:bg-orange-500 group-hover:text-black transition-colors duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">OTC Trading</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Tailored OTC crypto trading solutions for the digital asset market
              </p>
            </div>

            {/* Card 3: Ventures */}
            <div className="service-card group relative bg-zinc-900 border border-zinc-800 p-8 hover:border-orange-500/50 transition-colors duration-200" style={{ willChange: 'transform, opacity' }}>
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

              {/* Number badge */}
              <div className="service-number text-5xl font-black text-orange-500/20 mb-4">03</div>

              {/* Icon */}
              <div className="service-icon w-16 h-16 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 text-zinc-400 group-hover:bg-orange-500 group-hover:text-black transition-colors duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">Ventures</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Backing visionary founders with strategic crypto venture investments
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Stats - Count Up + Scrub Timeline */}
      <section
        ref={statsRef}
        id="stats"
        className="relative py-24 px-4 bg-zinc-900/50"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-4">
              Our <span className="text-orange-500">Impact</span>
            </h2>
            <p className="text-zinc-400 text-sm max-w-2xl mx-auto">
              With a portfolio of 1000+, we proudly support over 20% of CMC&apos;s Top 100 projects and 35% of CMC&apos;s Top 1000 crypto projects.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Stat 1: 800+ Projects */}
            <div className="stat-item text-center">
              {/* Circular progress indicator */}
              <div className="relative inline-flex items-center justify-center mb-6">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" fill="none" className="text-zinc-800" strokeWidth="4" />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    className="text-orange-500 stat-progress-circle"
                    strokeWidth="4"
                    strokeDasharray="351.86"
                    strokeDashoffset="351.86"
                    strokeLinecap="round"
                    style={{ willChange: 'stroke-dashoffset, transform' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="stat-icon w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400" style={{ willChange: 'transform, color' }}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Counter */}
              <div className="stat-counter text-5xl md:text-6xl font-black text-orange-500 mb-2">
                <span className="stat-value" data-target="800">0</span>+
              </div>
              <p className="text-zinc-400 text-sm uppercase tracking-wider">Projects in Portfolio</p>
            </div>

            {/* Stat 2: 10%+ CMC Top 100 */}
            <div className="stat-item text-center">
              {/* Circular progress indicator */}
              <div className="relative inline-flex items-center justify-center mb-6">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" fill="none" className="text-zinc-800" strokeWidth="4" />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    className="text-orange-500 stat-progress-circle"
                    strokeWidth="4"
                    strokeDasharray="351.86"
                    strokeDashoffset="351.86"
                    strokeLinecap="round"
                    style={{ willChange: 'stroke-dashoffset, transform' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="stat-icon w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400" style={{ willChange: 'transform, color' }}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Counter */}
              <div className="stat-counter text-5xl md:text-6xl font-black text-orange-500 mb-2">
                <span className="stat-value" data-target="10">0</span>%
              </div>
              <p className="text-zinc-400 text-sm uppercase tracking-wider">CMC Top 100</p>
            </div>

            {/* Stat 3: 20%+ CMC Top 1000 */}
            <div className="stat-item text-center">
              {/* Circular progress indicator */}
              <div className="relative inline-flex items-center justify-center mb-6">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" fill="none" className="text-zinc-800" strokeWidth="4" />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    className="text-orange-500 stat-progress-circle"
                    strokeWidth="4"
                    strokeDasharray="351.86"
                    strokeDashoffset="351.86"
                    strokeLinecap="round"
                    style={{ willChange: 'stroke-dashoffset, transform' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="stat-icon w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400" style={{ willChange: 'transform, color' }}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Counter */}
              <div className="stat-counter text-5xl md:text-6xl font-black text-orange-500 mb-2">
                <span className="stat-value" data-target="20">0</span>%
              </div>
              <p className="text-zinc-400 text-sm uppercase tracking-wider">CMC Top 1000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Portfolio - Batch Reveal + Infinite Marquee */}
      <section
        ref={portfolioRef}
        id="portfolio"
        className="relative py-24 px-4"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-4">
              <span className="text-orange-500">Portfolio</span>
            </h2>
            <p className="text-zinc-400 text-sm max-w-2xl mx-auto">
              With a portfolio of 1000+, we proudly support over 20% of CMC&apos;s Top 100 projects and 35% of CMC&apos;s Top 1000 crypto projects.
            </p>
          </div>

          {/* Portfolio Grid - 1 col mobile, 2 col tablet, 3 col desktop, 5 col wide */}
          <div className="portfolio-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
            {[
              { name: 'TRON', num: '01' },
              { name: 'Algorand', num: '02' },
              { name: 'Notcoin', num: '03' },
              { name: 'Mantle', num: '04' },
              { name: 'Jupiter', num: '05' },
              { name: 'TON', num: '06' },
              { name: 'Gala', num: '07' },
              { name: 'Celo', num: '08' },
              { name: 'Fetch.ai', num: '09' },
              { name: 'YGG', num: '10' },
              { name: 'Beam', num: '11' },
              { name: 'Sonic', num: '12' },
              { name: 'WLFI', num: '13' },
              { name: 'Vaultek', num: '14' },
              { name: 'Floki', num: '15' },
            ].map((item) => (
              <div
                key={item.name}
                className="portfolio-card group relative aspect-square bg-zinc-900 border border-zinc-800 p-4 flex flex-col items-center justify-center hover:border-orange-500 hover:scale-105 transition-all duration-200 cursor-pointer"
                style={{ willChange: 'transform, opacity' }}
              >
                {/* Corner accent */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                {/* Number badge */}
                <div className="absolute top-3 right-3 text-xs font-mono text-orange-500/40">{item.num}</div>

                {/* Logo placeholder - grayscale to orange-500 on hover */}
                <div className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-200">
                  <span className="text-xs font-bold text-zinc-600 group-hover:text-orange-500 transition-colors duration-200">{item.name.slice(0, 2)}</span>
                </div>

                {/* Name */}
                <span className="mt-3 text-sm font-medium text-zinc-400 group-hover:text-white transition-colors duration-200">
                  {item.name}
                </span>
              </div>
            ))}
          </div>

          {/* Infinite Marquee */}
          <div className="portfolio-marquee overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10" />
            <div ref={marqueeRowRef} className="marquee-row flex items-center gap-8 whitespace-nowrap py-8" style={{ willChange: 'transform' }}>
              {[
                'TRON', 'Algorand', 'Notcoin', 'Mantle', 'Jupiter', 'TON', 'Gala', 'Celo',
                'Fetch.ai', 'YGG', 'Beam', 'Sonic', 'WLFI', 'Vaultek', 'Floki',
                // Duplicate for seamless loop
                'TRON', 'Algorand', 'Notcoin', 'Mantle', 'Jupiter', 'TON', 'Gala', 'Celo',
                'Fetch.ai', 'YGG', 'Beam', 'Sonic', 'WLFI', 'Vaultek', 'Floki',
              ].map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-full"
                >
                  <span className="text-sm font-medium text-zinc-400">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: News - Staggered Reveal + Card Tilt */}
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
            {[
              {
                title: 'October 2025 Recap: New Partnerships, Conferences, and Community Events',
                date: 'Oct 31, 2025',
                badge: 'Recap',
              },
              {
                title: 'DWF Labs Participates in Block Street\'s Funding Round',
                date: 'Oct 12, 2025',
                badge: 'Investment',
              },
              {
                title: 'September 2025 Highlights: Partnerships, Events, and Research',
                date: 'Oct 01, 2025',
                badge: 'Monthly',
              },
              {
                title: 'DWF Labs Backs MemeCore: Building the First Blockchain for Meme 2.0',
                date: 'Sep 18, 2025',
                badge: 'Ventures',
              },
              {
                title: 'DWF Labs Joins as Strategic Crypto Liquidity Provider in Coincall\'s Enhanced Market Ecosystem',
                date: 'Sep 07, 2025',
                badge: 'Partnership',
              },
              {
                title: 'RICE AI Secures Series A Funding with Support from DWF Labs',
                date: 'Aug 18, 2025',
                badge: 'Ventures',
              },
            ].map((article, index) => (
              <article
                key={index}
                className="news-card group relative bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-orange-500/50 transition-all duration-200"
                style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
              >
                {/* Shine effect overlay */}
                <div className="news-shine absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ willChange: 'opacity, background' }} />

                {/* Thumbnail placeholder */}
                <div className="news-thumbnail aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center overflow-hidden">
                  <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-600 group-hover:scale-110 transition-transform duration-300" style={{ willChange: 'transform' }}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                </div>

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

      {/* Section 6: CTA/Footer - Draggable Pattern Gallery */}
      <section
        id="cta"
        className="relative py-24 px-4"
      >
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
    </main>
  );
}
