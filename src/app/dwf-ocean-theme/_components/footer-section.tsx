'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { FOOTER_DATA } from '../_data';

/**
 * Footer Section - Mobile Responsive
 */
export function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const sections = footer.querySelectorAll('.footer-section');
    const links = footer.querySelectorAll('.footer-link');

    gsap.set([...sections, ...links], {
      opacity: 0,
      y: 15,
    });

    const revealAnim = gsap.to([...sections, ...links], {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.03,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
      },
    });

    return () => {
      revealAnim.kill();
      gsap.killTweensOf(sections);
      gsap.killTweensOf(links);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-slate-900 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12 px-4 sm:px-6 md:px-12 lg:px-24 border-t border-slate-800"
    >
      {/* Wave Decoration at Top */}
      <svg
        className="absolute top-0 left-0 w-full h-12 -translate-y-full opacity-15"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
      >
        <path
          d="M0,30 Q240,0 480,30 T960,30 T1440,30 L1440,60 L0,60 Z"
          fill="#ff6b00"
        />
      </svg>

      {/* Animated Wave SVG */}
      <div className="absolute top-0 left-0 w-full h-12 -translate-y-full opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
        >
          <path
            d="M0,30 Q360,10 720,30 T1440,30"
            fill="none"
            stroke="#ff6b00"
            strokeWidth="1.5"
          >
            <animate
              attributeName="d"
              dur="4s"
              repeatCount="indefinite"
              values="
                M0,30 Q360,10 720,30 T1440,30;
                M0,30 Q360,50 720,30 T1440,30;
                M0,30 Q360,10 720,30 T1440,30
              "
            />
          </path>
        </svg>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.01]" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.3) 1px, transparent 0)',
        backgroundSize: '24px 24px',
      }} />

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Logo and Tagline */}
        <div className="footer-section text-center mb-8 sm:mb-10 md:mb-12">
          <h3
            className="text-white text-2xl sm:text-3xl font-bold mb-1.5 sm:mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            DWF Labs
          </h3>
          <p
            className="text-slate-400 text-xs sm:text-sm"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Digital Wave Finance - New Generation Web3 Investor
          </p>
        </div>

        {/* Footer Links Grid - responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          {FOOTER_DATA.sections.map((section) => (
            <div key={section.title} className="footer-section text-center sm:text-left">
              <h4
                className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="footer-link text-slate-400 hover:text-orange-400 transition-colors duration-300 text-xs sm:text-sm inline-block"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="footer-section flex justify-center gap-4 sm:gap-6 mb-8 sm:mb-10">
          {FOOTER_DATA.socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="footer-link w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-orange-500 hover:text-white transition-all duration-300 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="footer-section text-center pt-6 sm:pt-8 border-t border-slate-800">
          <p
            className="text-slate-500 text-[10px] sm:text-xs"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {FOOTER_DATA.copyright}
          </p>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <svg
        className="absolute bottom-0 left-0 w-full h-12 sm:h-16 opacity-5"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 Q360,70 720,40 T1440,40 L1440,80 L0,80 Z"
          fill="url(#footer-bottom-gradient)"
        />
        <defs>
          <linearGradient id="footer-bottom-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6b00" stopOpacity="0" />
            <stop offset="50%" stopColor="#ff6b00" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ff6b00" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </footer>
  );
}
