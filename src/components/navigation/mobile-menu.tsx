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

  const routes: NavigationRoute[] = [
    NAVIGATION_DATA.homeRoute,
    ...NAVIGATION_DATA.routes,
  ];

  useGSAP(() => {
    if (isOpen) {
      // Animate overlay in
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.3,
        ease: 'power2.out',
      });

      // Animate content slide from right
      gsap.fromTo(
        contentRef.current,
        { x: '100%' },
        {
          x: 0,
          duration: 0.4,
          ease: 'power3.out',
        }
      );

      // Stagger animate menu items
      const items = menuItemsRef.current?.querySelectorAll('.menu-item');
      if (items) {
        gsap.fromTo(
          items,
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: 'power2.out',
            delay: 0.2,
          }
        );
      }
    } else {
      // Animate overlay out
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power2.in',
      });

      // Animate content slide to right
      gsap.to(contentRef.current, {
        x: '100%',
        duration: 0.3,
        ease: 'power3.in',
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
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 opacity-0 pointer-events-none"
        onClick={onToggle}
      >
        <div
          ref={contentRef}
          className="absolute inset-y-0 right-0 w-full md:w-[450px] bg-black border-l border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Menu content */}
          <div className="h-full flex flex-col p-8 md:p-12">
            {/* Close button in top right */}
            <div className="flex justify-end mb-12">
              <span className="text-white/40 text-sm tracking-wider uppercase">
                Navigation
              </span>
            </div>

            {/* Menu items */}
            <nav ref={menuItemsRef} className="flex flex-col gap-8 flex-1">
              {routes.map((route) => (
                <MenuItem
                  key={route.id}
                  route={route}
                  onClose={onToggle}
                />
              ))}
            </nav>

            {/* Footer */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-zinc-500 text-sm">
                GSAP Animations Showcase
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
