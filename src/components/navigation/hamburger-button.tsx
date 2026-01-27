'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';

interface HamburgerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function HamburgerButton({ isOpen, onToggle }: HamburgerButtonProps) {
  const topLineRef = useRef<HTMLSpanElement>(null);
  const middleLineRef = useRef<HTMLSpanElement>(null);
  const bottomLineRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (isOpen) {
      // Animate to X
      gsap.to(topLineRef.current, {
        rotate: 45,
        y: 8,
        duration: 0.3,
        ease: 'power2.inOut',
      });
      gsap.to(middleLineRef.current, {
        opacity: 0,
        duration: 0.2,
      });
      gsap.to(bottomLineRef.current, {
        rotate: -45,
        y: -8,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    } else {
      // Animate back to hamburger
      gsap.to(topLineRef.current, {
        rotate: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
      gsap.to(middleLineRef.current, {
        opacity: 1,
        duration: 0.2,
      });
      gsap.to(bottomLineRef.current, {
        rotate: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    }
  }, [isOpen]);

  return (
    <button
      onClick={onToggle}
      className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <span
        ref={topLineRef}
        className="w-7 h-0.5 bg-white rounded-full origin-center"
      />
      <span
        ref={middleLineRef}
        className="w-7 h-0.5 bg-white rounded-full origin-center"
      />
      <span
        ref={bottomLineRef}
        className="w-7 h-0.5 bg-white rounded-full origin-center"
      />
    </button>
  );
}
