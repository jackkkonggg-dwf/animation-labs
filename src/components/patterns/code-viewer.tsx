// ============================================================================
// CODE VIEWER COMPONENT
// ============================================================================

'use client';

import { useState } from 'react';

interface CodeViewerProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeViewer({ code, language = 'tsx', filename = 'tsx' }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative border-b border-zinc-800 bg-zinc-900/30">
      {/* Diagonal stripe decoration */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-4">
              <span className="w-3 h-8 bg-orange-500" />
              Code
            </h2>
            <p className="text-zinc-500 mt-3 ml-7">Copy and paste into your project</p>
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="group relative px-6 py-3 bg-zinc-800 border border-zinc-700 hover:border-orange-500 rounded transition-all duration-300 flex items-center gap-3"
          >
            <span className="text-zinc-400 group-hover:text-orange-500 transition-colors text-sm font-bold uppercase tracking-wider">
              {copied ? 'Copied!' : 'Copy Code'}
            </span>
            <svg
              className={`w-5 h-5 text-zinc-500 group-hover:text-orange-500 transition-all duration-300 ${copied ? 'scale-110' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {copied ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              )}
            </svg>
            {/* Scan line effect */}
            <div className="absolute inset-0 overflow-hidden rounded">
              <div className="w-1 h-full bg-white/10 -skew-x-12 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-700 ease-in-out" />
            </div>
          </button>
        </div>

        {/* Code block */}
        <div className="relative bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-orange-500 z-10" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-orange-500 z-10" />

          {/* Language badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-zinc-400 uppercase z-10">
            {filename}
          </div>

          {/* Code content with syntax highlighting */}
          <pre className="p-6 pt-8 overflow-x-auto text-sm">
            <code
              className="font-mono leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
            />
          </pre>

          {/* Bottom scan line */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
        </div>
      </div>
    </section>
  );
}

// Simple syntax highlighter for TSX/TypeScript
// This is a lightweight client-side solution
function highlightCode(code: string, language: string): string {
  // Escape HTML first
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Keywords (purple)
  const keywords = [
    'import', 'export', 'from', 'default', 'const', 'let', 'var', 'function',
    'return', 'if', 'else', 'for', 'while', 'class', 'extends', 'new',
    'this', 'super', 'typeof', 'instanceof', 'try', 'catch', 'finally',
    'throw', 'async', 'await', 'yield', 'interface', 'type', 'enum',
    'implements', 'private', 'public', 'protected', 'readonly', 'static',
    'abstract', 'declare', 'namespace', 'module', 'as', 'is', 'in', 'of'
  ];

  // React/TSX keywords (blue)
  const reactKeywords = ['useRef', 'useEffect', 'useState', 'useCallback', 'useMemo', 'useGSAP'];

  // GSAP keywords (blue)
  const gsapKeywords = ['gsap', 'ScrollTrigger', 'Draggable'];

  // Build patterns
  const keywordPattern = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  const reactPattern = new RegExp(`\\b(${reactKeywords.join('|')})\\b`, 'g');
  const gsapPattern = new RegExp(`\\b(${gsapKeywords.join('|')})\\b`, 'g');

  // Strings (cyan)
  html = html.replace(/(['"`])((?:\\.|[^\\])*?)\1/g, '<span class="text-cyan-400">$1$2$1</span>');

  // Comments (zinc/gray)
  html = html.replace(/(\/\/.*$)/gm, '<span class="text-zinc-500">$1</span>');
  html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-zinc-500">$1</span>');

  // Keywords (purple)
  html = html.replace(keywordPattern, '<span class="text-purple-400">$1</span>');

  // React hooks (blue)
  html = html.replace(reactPattern, '<span class="text-blue-400">$1</span>');

  // GSAP (blue)
  html = html.replace(gsapPattern, '<span class="text-blue-400">$1</span>');

  // Numbers (orange)
  html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="text-orange-400">$1</span>');

  // Function calls (yellow)
  html = html.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="text-yellow-300">$1</span>(');

  // JSX tags (white)
  html = html.replace(/(&lt;\/?)([\w]+)/g, '$1<span class="text-white">$2</span>');

  return html;
}
