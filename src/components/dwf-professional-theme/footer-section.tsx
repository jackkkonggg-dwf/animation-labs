'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { PROFESSIONAL_FOOTER_DATA } from '@/data/dwf-professional-data';

/**
 * Footer Section - DWF Professional Theme
 * Professional footer with elegant layout
 */
export function ProfessionalFooterSection() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const footer = footerRef.current;
    const content = contentRef.current;

    if (!footer || !content) return;

    const sections = content.querySelectorAll('.footer-section');
    const bottomBar = content.querySelector('.footer-bottom');

    gsap.set([sections, bottomBar], { opacity: 0, y: 20 });

    const trigger = ScrollTrigger.create({
      trigger: footer,
      start: 'top 90%',
      onEnter: () => {
        gsap.to(sections, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        });
        gsap.to(bottomBar, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3,
          ease: 'power2.out',
        });
      },
    });

    ScrollTrigger.refresh();

    return () => {
      trigger.kill();
      gsap.killTweensOf(sections);
      gsap.killTweensOf(bottomBar);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative py-16 px-4 md:px-6 border-t border-slate-700/30"
      style={{
        background: '#0a192f',
      }}
    >
      <div ref={contentRef} className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand section */}
          <div className="footer-section lg:col-span-1">
            <div className="mb-4">
              <h3 className="text-2xl text-white font-semibold mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                DWF Labs
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                Institutional-grade digital asset solutions for the modern economy.
              </p>
            </div>
          </div>

          {/* Navigation sections */}
          {PROFESSIONAL_FOOTER_DATA.sections.map((section) => (
            <div key={section.title} className="footer-section">
              <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-slate-400 text-sm hover:text-amber-400 transition-colors duration-200"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom pt-8 border-t border-slate-700/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social links */}
            <div className="flex items-center gap-6">
              {PROFESSIONAL_FOOTER_DATA.socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-slate-500 hover:text-amber-400 transition-colors duration-200 text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label}
                </a>
              ))}
            </div>

            {/* Legal links */}
            <div className="flex items-center gap-6">
              {PROFESSIONAL_FOOTER_DATA.legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-slate-600 hover:text-slate-400 transition-colors duration-200 text-xs"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 text-center">
            <p className="text-slate-600 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
              {PROFESSIONAL_FOOTER_DATA.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
