'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/app/lib/gsap-config';
import type { NavigationRoute } from '@/app/types/navigation';

interface MenuItemProps {
  route: NavigationRoute;
  onClose: () => void;
}

export function MenuItem({ route, onClose }: MenuItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hover effect with aggressive motion
    const link = itemRef.current?.querySelector('a');
    if (!link) return;

    const handleMouseEnter = () => {
      // Sharp, aggressive movement
      gsap.to(itemRef.current, {
        x: 16,
        duration: 0.2,
        ease: 'power3.out',
      });
      gsap.to(link, {
        color: '#f97316', // orange-500
        duration: 0.15,
      });
      gsap.to(barRef.current, {
        scaleX: 1,
        duration: 0.3,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(itemRef.current, {
        x: 0,
        duration: 0.2,
        ease: 'power3.out',
      });
      gsap.to(link, {
        color: '#ffffff',
        duration: 0.15,
      });
      gsap.to(barRef.current, {
        scaleX: 0,
        duration: 0.2,
        ease: 'power3.in',
      });
    };

    link.addEventListener('mouseenter', handleMouseEnter);
    link.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      link.removeEventListener('mouseenter', handleMouseEnter);
      link.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={itemRef} className="menu-item relative py-3 border-b border-white/5">
      <Link
        href={route.path}
        onClick={onClose}
        className="block text-4xl md:text-5xl font-black text-white uppercase tracking-tight relative z-10"
      >
        {route.title}
      </Link>
      {/* Animated accent bar */}
      <div
        ref={barRef}
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-orange-600 to-orange-400 origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
      {/* Category label with industrial styling */}
      {route.category && (
        <span className="inline-block mt-1 text-[10px] text-orange-500/70 uppercase tracking-[0.25em] font-semibold">
          [{route.category}]
        </span>
      )}
    </div>
  );
}
