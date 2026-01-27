'use client';

import { memo } from 'react';
import type { ArtistCardProps } from './artist-cards-data';

// Hoist static arrays outside component to avoid recreation on every render
const BORDER_COLORS = [
  'border-[#ff3366]', // Hot pink
  'border-[#00ffff]', // Cyan
  'border-[#ffeb3b]', // Bright yellow
  'border-[#ff6b35]', // Orange
  'border-[#a855f7]', // Purple
  'border-[#22c55e]', // Green
  'border-[#f472b6]', // Pink
] as const;

const SHADOW_COLORS = [
  'rgba(255, 51, 102, 0.5)',
  'rgba(0, 255, 255, 0.5)',
  'rgba(255, 235, 59, 0.5)',
  'rgba(255, 107, 53, 0.5)',
  'rgba(168, 85, 247, 0.5)',
  'rgba(34, 197, 94, 0.5)',
  'rgba(244, 114, 182, 0.5)',
] as const;

const CARD_GRADIENTS = [
  'from-pink-500/40 via-purple-500/20 to-blue-500/40',
  'from-cyan-500/40 via-blue-500/20 to-purple-500/40',
  'from-yellow-500/40 via-orange-500/20 to-red-500/40',
  'from-orange-500/40 via-red-500/20 to-pink-500/40',
  'from-purple-500/40 via-pink-500/20 to-cyan-500/40',
  'from-green-500/40 via-cyan-500/20 to-blue-500/40',
  'from-pink-500/40 via-rose-500/20 to-orange-500/40',
] as const;

export const ArtistCard = memo(function ArtistCard({ id, name, description, image, yOffset, rotation, zIndex }: ArtistCardProps) {
  const borderColor = BORDER_COLORS[(id - 1) % BORDER_COLORS.length];
  const shadowColor = SHADOW_COLORS[(id - 1) % SHADOW_COLORS.length];
  const gradientClass = CARD_GRADIENTS[(id - 1) % CARD_GRADIENTS.length];

  return (
    <div
      className="horizontal-scroll-card group relative flex-shrink-0 w-[55vw] md:w-[45vw] lg:w-[35vw] aspect-[3/4]"
      style={{
        transform: `translateY(${yOffset}px) rotate(${rotation}deg)`,
        zIndex,
      }}
      data-card-id={id}
    >
      {/* Main card container with overlap effect */}
      <div
        className={`
          relative w-full h-full rounded-3xl overflow-hidden
          bg-gradient-to-br from-zinc-900 to-black
          border-4 ${borderColor}
          shadow-2xl transition-all duration-500 ease-out
          hover:shadow-[0_20px_60px_-10px_${shadowColor}]
          hover:scale-105 hover:rotate-0
          hover:-translate-y-2
        `}
      >
        {/* Image section */}
        <div className="w-full h-[55%] relative overflow-hidden rounded-t-3xl">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Multi-layer gradient overlay for depth */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} mix-blend-overlay`}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

          {/* Floating badge overlay */}
          <div className="absolute top-4 left-4">
            <div className="bg-black/60 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/20">
              <span className="text-xs font-semibold tracking-wider text-white/90">SOLO ARTIST</span>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="h-[45%] p-6 relative overflow-hidden">
          {/* Background texture */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}></div>
          </div>

          {/* Collection label */}
          <div className="relative z-10 mb-3">
            <div className="inline-flex items-center gap-2 text-white/50 text-xs tracking-[0.2em] uppercase">
              <span className="w-6 h-px bg-white/30"></span>
              <span>Collection 2024</span>
            </div>
          </div>

          {/* Artist name */}
          <h3 className={`
            relative z-10 text-3xl md:text-4xl font-bold text-white mb-2
            transition-colors duration-300
            group-hover:drop-shadow-[0_0_20px_${shadowColor}]
          `}>
            {name}
          </h3>

          {/* Description */}
          <p className="relative z-10 text-sm text-zinc-400 leading-relaxed">
            {description}
          </p>

          {/* Bottom accent line */}
          <div className={`absolute bottom-6 left-6 right-6 h-1 bg-gradient-to-r ${gradientClass} rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
        </div>

        {/* Hover shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
});
