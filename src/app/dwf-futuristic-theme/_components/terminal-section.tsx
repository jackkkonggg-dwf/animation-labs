'use client';

import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap-config';
import { TERMINAL_DATA, NEON_COLORS } from '../_data';

/**
 * Terminal Section - Interactive Command Line Interface
 * Features: Typing commands, boot sequence, system status, real-time clock
 */
export function TerminalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    const section = sectionRef.current;
    const terminal = terminalRef.current;
    if (!section || !terminal) return;

    // Terminal boot sequence
    const outputElements = terminal.querySelectorAll('.terminal-output');

    gsap.set(outputElements, {
      opacity: 0,
      x: -20,
    });

    gsap.to(outputElements, {
      opacity: 1,
      x: 0,
      duration: 0.3,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
    });

    // Blinking cursor
    gsap.to('.cursor-blink', {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'none',
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <section ref={sectionRef} className="terminal-section relative w-full py-32 px-4 md:px-12 bg-black">
      {/* Section header */}
      <div className="relative z-10 text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: '"Courier New", monospace', textShadow: `0 0 20px ${NEON_COLORS.lime}` }}>
          <span className="text-green-400">$</span> TERMINAL_ACCESS
        </h2>
        <p className="text-gray-500">System interface v4.2.0</p>
      </div>

      {/* Terminal window */}
      <div ref={terminalRef} className="relative z-10 max-w-4xl mx-auto">
        {/* Terminal frame */}
        <div className="border border-green-500/50 rounded-lg overflow-hidden bg-black/95" style={{ boxShadow: `0 0 50px rgba(0, 255, 0, 0.2)` }}>
          {/* Terminal header */}
          <div className="flex items-center justify-between px-4 py-3 bg-green-500/10 border-b border-green-500/30">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center gap-4 text-xs text-green-400 font-mono">
              <span>dwf-labs@quantum-node</span>
              <span className="text-gray-500">~</span>
              <span>terminal</span>
            </div>
            <div className="text-xs text-gray-500 font-mono">{currentTime.toLocaleTimeString()}</div>
          </div>

          {/* Terminal body */}
          <div className="p-6 font-mono text-sm">
            {/* Boot sequence */}
            <div className="space-y-2 mb-6">
              {TERMINAL_DATA.commands.map((cmd, i) => (
                <div key={i} className="terminal-output text-green-400">
                  <span className="text-gray-500">{currentTime.toLocaleTimeString()} </span>
                  {cmd}
                </div>
              ))}
            </div>

            {/* System status */}
            <div className="border-t border-green-500/30 pt-4 mt-4">
              <div className="text-gray-400 mb-4">
                ╔═══════════════════════════════════════╗
                ║ SYSTEM_STATUS_MONITOR ║
                ╚═══════════════════════════════════════╝
              </div>

              {/* Status bars */}
              <div className="space-y-4">
                <StatusBar label="CPU_USAGE" value={TERMINAL_DATA.systemStatus.cpu} color={NEON_COLORS.cyan} />
                <StatusBar label="MEMORY_ALLOCATION" value={TERMINAL_DATA.systemStatus.memory} color={NEON_COLORS.magenta} />
                <StatusBar label="NETWORK_BANDWIDTH" value={TERMINAL_DATA.systemStatus.network} color={NEON_COLORS.lime} />
                <StatusBar label="CORE_TEMPERATURE" value={TERMINAL_DATA.systemStatus.temperature} color={NEON_COLORS.orange} />
                <StatusBar label="POWER_OUTPUT" value={TERMINAL_DATA.systemStatus.power} color={NEON_COLORS.purple} />
              </div>
            </div>

            {/* Command input */}
            <div className="mt-6 flex items-center">
              <span className="text-green-400 mr-2">➜</span>
              <span className="text-cyan-400 mr-2">~</span>
              <span className="text-white">awaiting_input...</span>
              <span className="cursor-blink inline-block w-2 h-4 bg-green-400 ml-1" />
            </div>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 blur-xl -z-10" />
      </div>

      {/* Footer note */}
      <div className="relative z-10 text-center mt-12">
        <p className="text-xs text-gray-600 font-mono">[ENCRYPTED_CONNECTION_ESTABLISHED] [QUANTUM_CHANNEL_ACTIVE]</p>
      </div>
    </section>
  );
}

// ============================================================================
// STATUS BAR COMPONENT
// ============================================================================

interface StatusBarProps {
  label: string;
  value: number;
  color: string;
}

function StatusBar({ label, value, color }: StatusBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const bar = barRef.current;
    if (!bar) return;

    gsap.fromTo(bar, { width: 0 }, { width: `${value}%`, duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: bar, start: 'top 90%' } });
  }, [value]);

  return (
    <div className="flex items-center gap-4">
      <span className="text-xs text-gray-500 w-40">{label}</span>
      <div className="flex-1 h-4 bg-gray-900 border border-gray-700 rounded overflow-hidden">
        <div ref={barRef} className="h-full transition-all duration-300" style={{ background: `linear-gradient(90deg, ${color}, ${color}40)`, boxShadow: `0 0 10px ${color}` }} />
      </div>
      <span className="text-xs font-mono w-12 text-right" style={{ color }}>{value}%</span>
    </div>
  );
}
