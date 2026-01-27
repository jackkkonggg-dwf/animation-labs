// Hoist SVG texture to module level to avoid recreation on every render
const NOISE_TEXTURE_URL = 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")';

export function Hero() {
  return (
    <section
      className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center"
      suppressHydrationWarning
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ff3366] rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#00ffff] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a855f7] rounded-full blur-[200px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid texture overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }}></div>

      {/* Noise grain texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: NOISE_TEXTURE_URL,
      }}></div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Small label above */}
        <div
          className="
            inline-flex items-center gap-3 mb-8 overflow-hidden
            animate-in fade-in slide-in-from-top-4 duration-1000 ease-out
          "
          style={{ animationDelay: '200ms' }}
        >
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#ff3366]"></span>
          <span className="text-[#ff3366] text-sm font-bold tracking-[0.3em] uppercase">New Collection 2024</span>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#ff3366]"></span>
        </div>

        {/* Main title - brutalist stacked */}
        <h1
          className="
            font-black text-white leading-[0.85] tracking-tight mb-6
            animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out
          "
          style={{
            animationDelay: '400ms',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(4rem, 15vw, 12rem)',
          }}
        >
          <div className="overflow-hidden">
            <span className="inline-block hover:text-[#ff3366] transition-colors duration-300">SOUND</span>
          </div>
          <div className="overflow-hidden">
            <span className="inline-block hover:text-[#00ffff] transition-colors duration-300">ARCHIVE</span>
          </div>
        </h1>

        {/* Subtitle with glow */}
        <p
          className="
            text-xl md:text-2xl text-zinc-400 font-light mb-12 max-w-2xl mx-auto
            animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out
          "
          style={{ animationDelay: '600ms' }}
        >
          Discover <span className="text-[#00ffff] font-semibold">7 groundbreaking artists</span> redefining{' '}
          <span className="text-[#ffeb3b] font-semibold">electronic music</span>
        </p>

        {/* CTA buttons */}
        <div
          className="
            flex flex-col sm:flex-row items-center justify-center gap-4
            animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out
          "
          style={{ animationDelay: '800ms' }}
        >
          <a
            href="#collection"
            className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
          >
            <span className="relative z-10">Explore Artists</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff3366] via-[#a855f7] to-[#00ffff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          <a
            href="#about"
            className="px-8 py-4 border-2 border-white/30 text-white font-semibold text-lg rounded-full hover:bg-white/10 hover:border-white transition-all"
          >
            About the Collection
          </a>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#ff3366]/50"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#00ffff]/50"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#a855f7]/50"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#ffeb3b]/50"></div>

      {/* Scroll indicator */}
      <div
        className="
          absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
          animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out
        "
        style={{ animationDelay: '1000ms' }}
      >
        <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-[#ff3366] rounded-full animate-bounce"></div>
        </div>
      </div>

      {/* Floating stats */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6">
        <div className="text-right">
          <div className="text-4xl font-black text-[#ff3366]">7</div>
          <div className="text-xs text-white/50 uppercase tracking-wider">Artists</div>
        </div>
        <div className="w-12 h-px bg-white/20 ml-auto"></div>
        <div className="text-right">
          <div className="text-4xl font-black text-[#00ffff]">2024</div>
          <div className="text-xs text-white/50 uppercase tracking-wider">Collection</div>
        </div>
        <div className="w-12 h-px bg-white/20 ml-auto"></div>
        <div className="text-right">
          <div className="text-4xl font-black text-[#ffeb3b]">∞</div>
          <div className="text-xs text-white/50 uppercase tracking-wider">Possibilities</div>
        </div>
      </div>
    </section>
  );
}
