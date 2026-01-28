'use client';

import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';
import { HamburgerButton } from './hamburger-button';
import { MenuItem } from './menu-item';
import { NAVIGATION_DATA } from '@/lib/navigation-data';
import type { NavigationRoute } from '@/types/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileMenu({ isOpen, onToggle }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const gridPatternRef = useRef<HTMLDivElement>(null);

  const routes: NavigationRoute[] = [
    NAVIGATION_DATA.homeRoute,
    ...NAVIGATION_DATA.routes,
  ];

  useGSAP(() => {
    if (isOpen) {
      // Animate overlay in with scan effect
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.2,
        ease: 'power2.out',
      });

      // Animate grid pattern
      gsap.fromTo(
        gridPatternRef.current,
        { opacity: 0, scale: 1.2 },
        { opacity: 0.03, scale: 1, duration: 0.6, ease: 'power2.out' }
      );

      // Animate content slide from right with more aggressive easing
      gsap.fromTo(
        contentRef.current,
        { x: '100%' },
        {
          x: 0,
          duration: 0.35,
          ease: 'power4.out',
        }
      );

      // Stagger animate menu items with aggressive entrance
      const items = menuItemsRef.current?.querySelectorAll('.menu-item');
      if (items) {
        gsap.fromTo(
          items,
          { x: 80, opacity: 0, skewX: -5 },
          {
            x: 0,
            opacity: 1,
            skewX: 0,
            duration: 0.35,
            stagger: 0.06,
            ease: 'power3.out',
            delay: 0.15,
          }
        );
      }
    } else {
      // Animate overlay out
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.2,
        ease: 'power2.in',
      });

      // Animate content slide to right
      gsap.to(contentRef.current, {
        x: '100%',
        duration: 0.25,
        ease: 'power4.in',
      });
    }
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <HamburgerButton isOpen={isOpen} onToggle={onToggle} />

      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black z-40 opacity-0 pointer-events-none"
        onClick={onToggle}
      >
        {/* Industrial grid pattern overlay */}
        <div
          ref={gridPatternRef}
          className="absolute inset-0 opacity-0 grid-pattern-overlay"
        />

        <div
          ref={contentRef}
          className="absolute inset-y-0 right-0 w-full md:w-[480px] bg-zinc-950 border-l-2 border-orange-500/30 shadow-[-20px_0_60px_rgba(0,0,0,0.8)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Industrial stripe accent */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-600 via-orange-500 to-orange-600" />

          {/* Menu content */}
          <div className="h-full flex flex-col p-6 md:p-10">
            {/* Header with industrial design */}
            <div className="flex items-end justify-between mb-10 border-b border-orange-500/20 pb-4">
              <div>
                <span className="text-[10px] text-orange-500 uppercase tracking-[0.3em] block mb-1">
                  System
                </span>
                <h2 className="text-white text-2xl font-black uppercase tracking-tight">
                  Menu
                </h2>
              </div>
              {/* Decorative element */}
              <div className="flex gap-1">
                <span className="w-1 h-1 bg-orange-500/50" />
                <span className="w-1 h-1 bg-orange-500/30" />
                <span className="w-1 h-1 bg-orange-500/10" />
              </div>
            </div>

            {/* Menu items */}
            <nav ref={menuItemsRef} className="flex flex-col gap-2 flex-1">
              {routes.map((route) => (
                <MenuItem
                  key={route.id}
                  route={route}
                  onClose={onToggle}
                />
              ))}
            </nav>

            {/* Footer with industrial aesthetics */}
            <div className="pt-6 border-t border-orange-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-zinc-600 uppercase tracking-[0.2em] block">
                    Status
                  </span>
                  <p className="text-orange-500 text-xs font-semibold uppercase tracking-wider">
                    Online
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-zinc-600 uppercase tracking-[0.2em] block">
                    Version
                  </span>
                  <p className="text-zinc-400 text-xs font-mono">
                    1.0.0
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
