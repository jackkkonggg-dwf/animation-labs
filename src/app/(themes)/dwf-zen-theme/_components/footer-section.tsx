'use client';

import { FOOTER_DATA, ZEN_COLORS } from '../_data';

/**
 * Footer Section - Links, social, disclaimer
 */
export function FooterSection() {
  return (
    <footer
      className="footer-section relative py-20 px-6 border-t"
      style={{
        backgroundColor: ZEN_COLORS.backgroundAlt,
        borderColor: `${ZEN_COLORS.shadow}`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3
              className="text-2xl font-normal mb-5 tracking-tight"
              style={{
                fontFamily: "'Noto Serif JP', serif",
                color: ZEN_COLORS.primaryText,
                fontWeight: 400,
              }}
            >
              DWF Labs
            </h3>
            <p
              className="text-sm leading-relaxed font-light"
              style={{ color: ZEN_COLORS.secondaryText, fontWeight: 300 }}
            >
              Digital Wave Finance - Pioneering the future of decentralized finance through market making, OTC trading, venture capital, and liquidity services.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-xs uppercase tracking-widest mb-6 font-light"
              style={{ color: ZEN_COLORS.accent, letterSpacing: '0.2em' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {FOOTER_DATA.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-normal hover:opacity-60 transition-opacity duration-300"
                    style={{ color: ZEN_COLORS.secondaryText, fontWeight: 400 }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4
              className="text-xs uppercase tracking-widest mb-6 font-light"
              style={{ color: ZEN_COLORS.accent, letterSpacing: '0.2em' }}
            >
              Connect
            </h4>
            <ul className="space-y-3">
              {FOOTER_DATA.social.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="text-sm font-normal hover:opacity-60 transition-opacity duration-300"
                    style={{ color: ZEN_COLORS.secondaryText, fontWeight: 400 }}
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Decorative line */}
        <div
          className="w-full h-px mb-10"
          style={{ backgroundColor: ZEN_COLORS.shadow }}
        />

        {/* Disclaimer */}
        <p
          className="text-xs text-center font-light"
          style={{ color: ZEN_COLORS.secondaryText, fontWeight: 300 }}
        >
          {FOOTER_DATA.disclaimer}
        </p>
      </div>
    </footer>
  );
}
