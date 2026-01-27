'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from '@/app/lib/gsap-config';
import { HeroSection } from './hero-section';
import dynamic from 'next/dynamic';

// Lazy load sections below the fold for performance
const ServicesSection = dynamic(
  () => import('./services-section').then(mod => ({ default: mod.ServicesSection })),
  {
    loading: () => <div className="h-screen bg-black animate-pulse flex items-center justify-center"><div className="text-cyan-400 text-xl font-mono">LOADING MODULE...</div></div>,
  }
);

const StatsSection = dynamic(
  () => import('./stats-section').then(mod => ({ default: mod.StatsSection })),
  {
    loading: () => <div className="h-screen bg-black animate-pulse flex items-center justify-center"><div className="text-cyan-400 text-xl font-mono">LOADING METRICS...</div></div>,
  }
);

const ProtocolsSection = dynamic(
  () => import('./protocols-section').then(mod => ({ default: mod.ProtocolsSection })),
  {
    loading: () => <div className="h-screen bg-black animate-pulse flex items-center justify-center"><div className="text-cyan-400 text-xl font-mono">LOADING PROTOCOLS...</div></div>,
  }
);

const TerminalSection = dynamic(
  () => import('./terminal-section').then(mod => ({ default: mod.TerminalSection })),
  {
    loading: () => <div className="h-64 bg-black animate-pulse flex items-center justify-center"><div className="text-cyan-400 text-xl font-mono">LOADING TERMINAL...</div></div>,
  }
);

/**
 * DWF Futuristic Theme - Main Orchestration Component
 * Cyberpunk/Sci-Fi interface with maximalist animations
 */
export function DWFFuturisticTheme() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Refresh ScrollTrigger after all sections are mounted
    ScrollTrigger.refresh();

    // Create ambient cursor trail effect
    const createCursorTrail = (e: MouseEvent) => {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, rgba(0, 255, 255, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
      `;
      document.body.appendChild(trail);

      const { gsap } = require('@/app/lib/gsap-config');
      gsap.to(trail, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => trail.remove(),
      });
    };

    let throttleTimer: NodeJS.Timeout;
    const throttledCursorTrail = (e: MouseEvent) => {
      if (!throttleTimer) {
        createCursorTrail(e);
        throttleTimer = setTimeout(() => { throttleTimer = undefined as any; }, 50);
      }
    };

    window.addEventListener('mousemove', throttledCursorTrail);

    return () => {
      window.removeEventListener('mousemove', throttledCursorTrail);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="dwf-futuristic-theme relative min-h-screen bg-black overflow-x-hidden"
      style={{
        fontFamily: "'Courier New', monospace",
      }}
    >
      {/* Global overlay effects */}
      <div className="global-overlays pointer-events-none fixed inset-0 z-50">
        {/* Scanlines overlay */}
        <div className="scanlines absolute inset-0 opacity-10" style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px)',
          animation: 'scanline 8s linear infinite',
        }} />

        {/* Vignette */}
        <div className="vignette absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.8) 100%)',
        }} />

        {/* Film grain */}
        <div className="grain absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          animation: 'grain 0.5s steps(10) infinite',
        }} />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Lazy-loaded sections */}
      <ServicesSection />
      <StatsSection />
      <ProtocolsSection />
      <TerminalSection />

      {/* Global styles */}
      <style jsx global>{`
        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }

        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }

        .glitch-text {
          position: relative;
          animation: glitch-skew 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch-text::before {
          left: 2px;
          text-shadow: -2px 0 #ff00ff;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
        }

        .glitch-text::after {
          left: -2px;
          text-shadow: -2px 0 #00ffff;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim2 5s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim {
          0% { clip: rect(31px, 9999px, 94px, 0); }
          5% { clip: rect(70px, 9999px, 71px, 0); }
          10% { clip: rect(29px, 9999px, 83px, 0); }
          15% { clip: rect(95px, 9999px, 11px, 0); }
          20% { clip: rect(20px, 9999px, 26px, 0); }
          25% { clip: rect(2px, 9999px, 90px, 0); }
          30% { clip: rect(59px, 9999px, 23px, 0); }
          35% { clip: rect(67px, 9999px, 42px, 0); }
          40% { clip: rect(23px, 9999px, 74px, 0); }
          45% { clip: rect(49px, 9999px, 36px, 0); }
          50% { clip: rect(51px, 9999px, 3px, 0); }
          55% { clip: rect(49px, 9999px, 92px, 0); }
          60% { clip: rect(20px, 9999px, 74px, 0); }
          65% { clip: rect(6px, 9999px, 63px, 0); }
          70% { clip: rect(56px, 9999px, 85px, 0); }
          75% { clip: rect(48px, 9999px, 28px, 0); }
          80% { clip: rect(89px, 9999px, 81px, 0); }
          85% { clip: rect(62px, 9999px, 14px, 0); }
          90% { clip: rect(17px, 9999px, 5px, 0); }
          95% { clip: rect(11px, 9999px, 100px, 0); }
          100% { clip: rect(35px, 9999px, 14px, 0); }
        }

        @keyframes glitch-anim2 {
          0% { clip: rect(65px, 9999px, 100px, 0); }
          5% { clip: rect(52px, 9999px, 74px, 0); }
          10% { clip: rect(79px, 9999px, 85px, 0); }
          15% { clip: rect(75px, 9999px, 5px, 0); }
          20% { clip: rect(67px, 9999px, 61px, 0); }
          25% { clip: rect(14px, 9999px, 79px, 0); }
          30% { clip: rect(1px, 9999px, 66px, 0); }
          35% { clip: rect(86px, 9999px, 30px, 0); }
          40% { clip: rect(23px, 9999px, 98px, 0); }
          45% { clip: rect(85px, 9999px, 72px, 0); }
          50% { clip: rect(71px, 9999px, 75px, 0); }
          55% { clip: rect(2px, 9999px, 48px, 0); }
          60% { clip: rect(30px, 9999px, 16px, 0); }
          65% { clip: rect(59px, 9999px, 50px, 0); }
          70% { clip: rect(41px, 9999px, 62px, 0); }
          75% { clip: rect(2px, 9999px, 82px, 0); }
          80% { clip: rect(47px, 9999px, 73px, 0); }
          85% { clip: rect(3px, 9999px, 27px, 0); }
          90% { clip: rect(26px, 9999px, 55px, 0); }
          95% { clip: rect(42px, 9999px, 97px, 0); }
          100% { clip: rect(38px, 9999px, 49px, 0); }
        }

        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          20% { transform: skew(-2deg); }
          40% { transform: skew(2deg); }
          60% { transform: skew(-1deg); }
          80% { transform: skew(1deg); }
          100% { transform: skew(0deg); }
        }

        .neon-border {
          box-shadow:
            0 0 5px #00ffff,
            0 0 10px #00ffff,
            0 0 20px #00ffff,
            0 0 40px #00ffff;
        }

        .neon-text {
          text-shadow:
            0 0 5px #00ffff,
            0 0 10px #00ffff,
            0 0 20px #00ffff,
            0 0 40px #00ffff;
        }

        .hologram-effect {
          background: linear-gradient(
            135deg,
            rgba(0, 255, 255, 0.1) 0%,
            rgba(255, 0, 255, 0.1) 50%,
            rgba(0, 255, 255, 0.1) 100%
          );
          backdrop-filter: blur(10px);
        }
      `}</style>
    </div>
  );
}
