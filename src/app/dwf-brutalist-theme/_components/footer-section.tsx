'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import {
  BRUTALIST_COLORS,
  BRUTALIST_FONTS,
} from '../_data';

/**
 * Footer Section - DWF Labs Brutalist Theme
 * Contact info, social links, quick links, and legal
 */
export function FooterSection() {
  const footerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const footer = footerRef.current;
    const header = headerRef.current;
    if (!footer || !header) return;

    const triggers: ScrollTrigger[] = [];

    // Header animation
    const title = header.querySelector('.footer-title');
    const divider = header.querySelector('.footer-divider');

    if (title && divider) {
      gsap.set([title, divider], { opacity: 0, x: -100 });

      triggers.push(
        ScrollTrigger.create({
          trigger: header,
          start: 'top 90%',
          onEnter: () => {
            gsap.to(title, {
              opacity: 1,
              x: 0,
              duration: 0.3,
              ease: 'power4.inOut',
            });
            gsap.to(divider, {
              opacity: 1,
              x: 0,
              scaleX: 1,
              duration: 0.4,
              delay: 0.15,
              ease: 'power4.inOut',
            });
          },
        })
      );
    }

    // Footer links - aggressive slide
    const linkGroups = footer.querySelectorAll('.footer-link-group');
    gsap.set(linkGroups, { opacity: 0, y: 30 });
    gsap.to(linkGroups, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: footer,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    // Contact items
    const contactItems = footer.querySelectorAll('.contact-item');
    gsap.set(contactItems, { opacity: 0, x: -20 });
    gsap.to(contactItems, {
      opacity: 1,
      x: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footer,
        start: 'top 80%',
      },
    });

    // Social icons
    const socialIcons = footer.querySelectorAll('.social-icon');
    gsap.set(socialIcons, { opacity: 0, scale: 0.8 });
    gsap.to(socialIcons, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      stagger: 0.05,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: footer,
        start: 'top 75%',
      },
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
      if (title) gsap.killTweensOf(title);
      if (divider) gsap.killTweensOf(divider);
      gsap.killTweensOf(linkGroups);
      gsap.killTweensOf(contactItems);
      gsap.killTweensOf(socialIcons);
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full py-16 px-4 sm:px-8 md:px-12 lg:px-20"
      style={{
        background: BRUTALIST_COLORS.background,
        borderTop: `3px solid ${BRUTALIST_COLORS.foreground}`,
      }}
    >
      <div className="max-w-8xl mx-auto">
        {/* Footer Header */}
        <div ref={headerRef} className="mb-12">
          <h2
            className="footer-title uppercase mb-6"
            style={{
              fontFamily: BRUTALIST_FONTS.display,
              fontWeight: 700,
              fontSize: 'clamp(36px, 6vw, 56px)',
              letterSpacing: '-0.03em',
              lineHeight: '1',
              color: BRUTALIST_COLORS.foreground,
            }}
          >
            CONTACT_DWF_LABS
          </h2>
          <div
            className="footer-divider h-2"
            style={{
              background: BRUTALIST_COLORS.accent,
              width: 'clamp(120px, 25%, 300px)',
              transformOrigin: 'left',
            }}
          />
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Contact Info */}
          <div className="footer-link-group">
            <h3
              className="mb-4 uppercase text-xs font-bold"
              style={{
                fontFamily: BRUTALIST_FONTS.mono,
                color: BRUTALIST_COLORS.accent,
                letterSpacing: '0.15em',
              }}
            >
              /// GET_IN_TOUCH
            </h3>
            <div className="space-y-3">
              <div className="contact-item">
                <div
                  className="text-xs uppercase mb-1"
                  style={{
                    fontFamily: BRUTALIST_FONTS.mono,
                    color: BRUTALIST_COLORS.secondary,
                    letterSpacing: '0.1em',
                  }}
                >
                  EMAIL
                </div>
                <a
                  href="mailto:contact@dwflabs.com"
                  className="text-sm font-bold uppercase hover:text-[#ccff00] transition-colors"
                  style={{
                    fontFamily: BRUTALIST_FONTS.display,
                    color: BRUTALIST_COLORS.foreground,
                    letterSpacing: '0.05em',
                  }}
                >
                  CONTACT@DWFLABS.COM
                </a>
              </div>
              <div className="contact-item">
                <div
                  className="text-xs uppercase mb-1"
                  style={{
                    fontFamily: BRUTALIST_FONTS.mono,
                    color: BRUTALIST_COLORS.secondary,
                    letterSpacing: '0.1em',
                  }}
                >
                  TG_SUPPORT
                </div>
                <a
                  href="https://t.me/dwflabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold uppercase hover:text-[#ccff00] transition-colors"
                  style={{
                    fontFamily: BRUTALIST_FONTS.display,
                    color: BRUTALIST_COLORS.foreground,
                    letterSpacing: '0.05em',
                  }}
                >
                  @DWFLABS
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-link-group">
            <h3
              className="mb-4 uppercase text-xs font-bold"
              style={{
                fontFamily: BRUTALIST_FONTS.mono,
                color: BRUTALIST_COLORS.accent,
                letterSpacing: '0.15em',
              }}
            >
              /// SERVICES
            </h3>
            <ul className="space-y-2">
              {['Market_Making', 'OTC_Trading', 'Venture_Capital', 'Liquidity_Services'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm font-bold uppercase hover:text-[#ccff00] transition-colors"
                    style={{
                      fontFamily: BRUTALIST_FONTS.display,
                      color: BRUTALIST_COLORS.foreground,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-link-group">
            <h3
              className="mb-4 uppercase text-xs font-bold"
              style={{
                fontFamily: BRUTALIST_FONTS.mono,
                color: BRUTALIST_COLORS.accent,
                letterSpacing: '0.15em',
              }}
            >
              /// COMPANY
            </h3>
            <ul className="space-y-2">
              {['About_Us', 'Portfolio', 'Partners', 'Careers'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm font-bold uppercase hover:text-[#ccff00] transition-colors"
                    style={{
                      fontFamily: BRUTALIST_FONTS.display,
                      color: BRUTALIST_COLORS.foreground,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="footer-link-group">
            <h3
              className="mb-4 uppercase text-xs font-bold"
              style={{
                fontFamily: BRUTALIST_FONTS.mono,
                color: BRUTALIST_COLORS.accent,
                letterSpacing: '0.15em',
              }}
            >
              /// LEGAL
            </h3>
            <ul className="space-y-2">
              {['Privacy_Policy', 'Terms_of_Service', 'Compliance', 'Risk_Disclosure'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm font-bold uppercase hover:text-[#ccff00] transition-colors"
                    style={{
                      fontFamily: BRUTALIST_FONTS.display,
                      color: BRUTALIST_COLORS.foreground,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-8" style={{ borderTop: `2px solid ${BRUTALIST_COLORS.foreground}20` }}>
          {/* Social Icons */}
          <div className="flex gap-4">
            {[
              { name: 'Twitter/X', url: 'https://twitter.com/DWFLabs' },
              { name: 'Telegram', url: 'https://t.me/dwflabs' },
              { name: 'LinkedIn', url: 'https://linkedin.com/company/dwflabs' },
              { name: 'Discord', url: 'https://discord.gg/dwflabs' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon relative px-4 py-2 border-2 text-xs font-bold uppercase transition-all hover:bg-[#ccff00] hover:text-black"
                style={{
                  fontFamily: BRUTALIST_FONTS.mono,
                  borderColor: BRUTALIST_COLORS.foreground,
                  color: BRUTALIST_COLORS.foreground,
                  background: 'transparent',
                  letterSpacing: '0.1em',
                  clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)',
                }}
              >
                {social.name.split('/')[0]}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div
            className="text-xs uppercase text-right"
            style={{
              fontFamily: BRUTALIST_FONTS.mono,
              color: BRUTALIST_COLORS.secondary,
              letterSpacing: '0.1em',
            }}
          >
            <div className="mb-1">©_2025_DWF_LABS</div>
            <div className="text-[10px]">ALL_RIGHTS_RESERVED</div>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className="mt-8 p-4 border-2 text-xs"
          style={{
            borderColor: `${BRUTALIST_COLORS.foreground}30`,
            background: `${BRUTALIST_COLORS.foreground}03`,
            clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)',
          }}
        >
          <p
            className="uppercase"
            style={{
              fontFamily: BRUTALIST_FONTS.mono,
              color: BRUTALIST_COLORS.secondary,
              letterSpacing: '0.05em',
              lineHeight: '1.6',
            }}
          >
            <span style={{ color: BRUTALIST_COLORS.warning }}>/// DISCLAIMER:</span> TRADING_CRYPTOCURRENCIES_CARRIES_SIGNIFICANT_RISK._
            PAST_PERFORMANCE_IS_NOT_INDICATIVE_OF_FUTURE_RESULTS._PLEASE_CONDUCT_YOUR_OWN_DUE_DILIGENCE_BEFORE_MAKING_ANY_INVESTMENT_DECISIONS._
          </p>
        </div>
      </div>
    </footer>
  );
}
