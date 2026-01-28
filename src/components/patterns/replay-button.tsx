// ============================================================================
// REPLAY BUTTON COMPONENT
// ============================================================================

'use client';

interface ReplayButtonProps {
  onReplay: () => void;
  label?: string;
  variant?: 'orange' | 'emerald' | 'cyan';
}

export function ReplayButton({ onReplay, label = 'Replay Animation', variant = 'orange' }: ReplayButtonProps) {
  const colorClasses = {
    orange: {
      hoverBorder: 'hover:border-orange-500',
      hoverText: 'group-hover:text-orange-500',
    },
    emerald: {
      hoverBorder: 'hover:border-emerald-500',
      hoverText: 'group-hover:text-emerald-500',
    },
    cyan: {
      hoverBorder: 'hover:border-cyan-500',
      hoverText: 'group-hover:text-cyan-500',
    },
  };

  const colors = colorClasses[variant];

  return (
    <div className="flex justify-center mt-12">
      <button
        onClick={onReplay}
        className={`group relative px-6 py-3 bg-zinc-800 border border-zinc-700 ${colors.hoverBorder} rounded transition-all duration-300 flex items-center gap-3`}
      >
        <svg
          className={`w-5 h-5 text-zinc-500 ${colors.hoverText} transition-colors group-hover:rotate-180 transition-transform duration-500`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span className={`text-zinc-400 ${colors.hoverText} transition-colors text-sm font-bold uppercase tracking-wider`}>
          {label}
        </span>
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden rounded">
          <div className="w-1 h-full bg-white/10 -skew-x-12 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-700 ease-in-out" />
        </div>
      </button>
    </div>
  );
}
