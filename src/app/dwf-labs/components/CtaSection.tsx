/**
 * CTA Section (Call to Action + Footer)
 *
 * Section 6: Draggable Pattern Gallery + Footer
 * Features:
 * - US-020: CTA draggable pattern gallery
 * - US-021: Active card scale and progress indicator
 */

'use client';

interface CtaSectionProps {
  prefersReducedMotion: boolean;
}

export function CtaSection({ prefersReducedMotion }: CtaSectionProps) {

  return (
    <section id="cta" className="relative py-24 px-4 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-zinc-950" />

        {/* Subtle ambient orange glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/6 rounded-full blur-[180px] animate-pulse" style={{ animationDuration: '20s' }} />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            linear-gradient(rgba(249, 115, 22, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249, 115, 22, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* CTA Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-6" style={{ textShadow: '0 0 40px rgba(249,115,22,0.3)' }}>
            Explore Our <span className="text-orange-500" style={{ textShadow: '0 0 50px rgba(249,115,22,0.5)' }}>Ecosystem</span>
          </h2>
          <p className="text-zinc-400 text-sm max-w-2xl mx-auto mb-8">
            Discover the full range of our services and portfolio companies
          </p>

          {/* CTA Button */}
          <a
            href="https://www.dwf-labs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-500 text-black font-semibold px-8 py-4 rounded-lg hover:from-orange-500 hover:to-orange-400 hover:scale-105 hover:shadow-[0_0_30px_-8px_rgba(249,115,22,0.5)] transition-all duration-300"
          >
            <span>View Ecosystem</span>
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Footer */}
        <footer className="border-t border-orange-500/20 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4" style={{ textShadow: '0 0 30px rgba(249,115,22,0.3)' }}>
                DWF <span className="text-orange-500" style={{ textShadow: '0 0 40px rgba(249,115,22,0.5)' }}>LABS</span>
              </h3>
              <p className="text-zinc-500 text-sm">
                New Generation Web3 Investor and Market Maker
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#services" className="text-sm text-zinc-500 hover:text-orange-500 transition-colors duration-300">Services</a></li>
                <li><a href="#stats" className="text-sm text-zinc-500 hover:text-orange-500 transition-colors duration-300">Stats</a></li>
                <li><a href="#portfolio" className="text-sm text-zinc-500 hover:text-orange-500 transition-colors duration-300">Portfolio</a></li>
                <li><a href="#news" className="text-sm text-zinc-500 hover:text-orange-500 transition-colors duration-300">News</a></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Connect</h4>
              <div className="flex gap-4">
                <a
                  href="https://twitter.com/dwflabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-500 hover:text-orange-500 hover:border-orange-500/50 hover:shadow-[0_0_20px_-5px_rgba(249,115,22,0.4)] transition-all duration-300"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/dwflabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-500 hover:text-orange-500 hover:border-orange-500/50 hover:shadow-[0_0_20px_-5px_rgba(249,115,22,0.4)] transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://t.me/dwflabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-500 hover:text-orange-500 hover:border-orange-500/50 hover:shadow-[0_0_20px_-5px_rgba(249,115,22,0.4)] transition-all duration-300"
                  aria-label="Telegram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-800">
            <p className="text-zinc-600 text-sm mb-4 md:mb-0">
              DWF Labs © 2025
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-zinc-600 hover:text-orange-500 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-sm text-zinc-600 hover:text-orange-500 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-sm text-zinc-600 hover:text-orange-500 transition-colors duration-300">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
