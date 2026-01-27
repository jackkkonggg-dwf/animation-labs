'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';
import type { NavigationRoute } from '@/types/navigation';

interface MenuItemProps {
  route: NavigationRoute;
  onClose: () => void;
}

export function MenuItem({ route, onClose }: MenuItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hover effect
    const link = itemRef.current?.querySelector('a');
    if (!link) return;

    const handleMouseEnter = () => {
      gsap.to(itemRef.current, {
        scale: 1.05,
        x: 10,
        duration: 0.2,
        ease: 'power2.out',
      });
      gsap.to(link, {
        textShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
        duration: 0.2,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(itemRef.current, {
        scale: 1,
        x: 0,
        duration: 0.2,
        ease: 'power2.out',
      });
      gsap.to(link, {
        textShadow: 'none',
        duration: 0.2,
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
    <div ref={itemRef} className="menu-item">
      <Link
        href={route.path}
        onClick={onClose}
        className="block text-4xl md:text-5xl font-bold text-white hover:text-cyan-400 transition-colors duration-300"
      >
        {route.title}
      </Link>
      {route.category && (
        <span className="inline-block mt-2 text-sm text-zinc-500 uppercase tracking-wider">
          {route.category}
        </span>
      )}
    </div>
  );
}
