// components/reactbits/PillNav.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

type NavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

type SocialItem = {
  type: "github" | "linkedin" | "cv";
  href: string;
  ariaLabel?: string;
};

type PillNavProps = {
  logo?: string; // ← now optional
  logoAlt?: string;
  items: NavItem[];
  socials?: SocialItem[]; // ← new
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
};

const PillNav = ({
  logo,
  logoAlt = "Logo",
  items,
  socials = [], // ← default empty
  activeHref = "/",
  className = "",
  ease = "power3.easeOut",
  baseColor = "#000000", // ← default to black
  pillColor = "#060010",
  hoveredPillTextColor = "#ffffff",
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
}: PillNavProps) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const circleRefs = useRef<HTMLSpanElement[]>([]);
  const tlRefs = useRef<gsap.core.Timeline[]>([]);
  const activeTweenRefs = useRef<gsap.core.Tween[]>([]);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // respect reduced motion
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const layout = () => {
      // build (or rebuild) hover timelines per pill
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;

        // circle geometry for the "splash" effect
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta =
          Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector(".pill-label") as HTMLElement | null;
        const white = pill.querySelector(
          ".pill-label-hover"
        ) as HTMLElement | null;

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        // kill & rebuild timeline for this index
        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(
          circle,
          { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" },
          0
        );

        if (label) {
          tl.to(
            label,
            { y: -(h + 8), duration: 2, ease, overwrite: "auto" },
            0
          );
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(
            white,
            { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" },
            0
          );
        }

        tlRefs.current[index] = tl;
      });

      // init mobile popover hidden
      if (mobileMenuRef.current) {
        gsap.set(mobileMenuRef.current, {
          visibility: "hidden",
          opacity: 0,
          scaleY: 1,
        });
      }

      // initial load animation (logo or socials + nav items)
      if (initialLoadAnimation && !prefersReduced) {
        const logoEl = logoRef.current;
        const navItems = navItemsRef.current;

        if (logoEl) {
          gsap.set(logoEl, { scale: 0 });
          gsap.to(logoEl, { scale: 1, duration: 0.6, ease });
        }

        if (navItems) {
          gsap.set(navItems, { width: 0, overflow: "hidden" });
          gsap.to(navItems, { width: "auto", duration: 0.6, ease });
        }
      }
    };

    // build after paint so refs & sizes are ready
    const raf = requestAnimationFrame(layout);

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    // if fonts swap, re-measure
    (document as any).fonts?.ready?.then(layout).catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      // cleanup tweens/timelines
      tlRefs.current.forEach((t) => t?.kill());
      activeTweenRefs.current.forEach((t) => t?.kill());
    };
  }, [items, ease, initialLoadAnimation]);

  // --- helpers (icons) ---
  const Icon = ({ type }: { type: SocialItem["type"] }) => {
    if (type === "github") {
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
          <path
            fill="currentColor"
            d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58V21.2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.74.08-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.86 2.84 1.32 3.53 1.01.11-.79.42-1.32.76-1.63-2.66-.3-5.46-1.33-5.46-5.9 0-1.3.47-2.36 1.24-3.19-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.22a11.5 11.5 0 0 1 6 0c2.29-1.54 3.3-1.22 3.3-1.22.66 1.65.24 2.87.12 3.17.77.83 1.24 1.9 1.24 3.19 0 4.58-2.8 5.6-5.47 5.9.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .5Z"
          />
        </svg>
      );
    }
    if (type === "linkedin") {
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
          <path
            fill="currentColor"
            d="M20.45 20.45h-3.56v-5.54c0-1.32-.02-3.01-1.84-3.01-1.84 0-2.12 1.43-2.12 2.91v5.64H9.37V9h3.42v1.56h.05c.48-.91 1.65-1.87 3.4-1.87 3.64 0 4.31 2.4 4.31 5.51v6.25zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z"
          />
        </svg>
      );
    }
    // CV icon (simple document)
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
        <path
          fill="currentColor"
          d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm1 7h5l-5-5v5ZM8 13h8v2H8v-2Zm0 4h8v2H8v-2Zm0-8h4v2H8V9Z"
        />
      </svg>
    );
  };

  const isExternalLink = (href: string) =>
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#");

  const isRouterLink = (href: string) => href && !isExternalLink(href);

  const cssVars = {
    ["--base" as any]: baseColor, // navbar & hover circle color
    ["--pill-bg" as any]: pillColor, // pill background
    ["--hover-text" as any]: hoveredPillTextColor, // hover text
    ["--pill-text" as any]: resolvedPillTextColor, // normal text
  };

  return (
    <div className="pill-nav-container">
      <nav
        className={`pill-nav ${className}`}
        aria-label="Primary"
        style={cssVars as any}
      >
        {/* Left: logo OR socials */}
        {logo ? (
          <a
            className="pill-logo"
            href={items?.[0]?.href || "#"}
            aria-label="Home"
            onMouseEnter={() => {
              const img = logoImgRef.current;
              if (!img) return;
              logoTweenRef.current?.kill();
              gsap.set(img, { rotate: 0 });
              logoTweenRef.current = gsap.to(img, {
                rotate: 360,
                duration: 0.2,
                ease,
                overwrite: "auto",
              });
            }}
            ref={(el) => {
              logoRef.current = el;
            }}
          >
            <img src={logo} alt={logoAlt} ref={logoImgRef} />
          </a>
        ) : (
          <div
            className="pill-socials"
            ref={(el) => {
              logoRef.current = el;
            }} // ⬅️ make socials the animation target
          >
            {socials.map((s) => (
              <a
                key={`${s.type}-${s.href}`}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-social-btn"
                aria-label={s.ariaLabel || s.type}
                title={s.ariaLabel || s.type}
              >
                <Icon type={s.type} />
              </a>
            ))}
          </div>
        )}

        {/* Desktop items */}
        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => (
              <li key={item.href || `item-${i}`} role="none">
                {isRouterLink(item.href) ? (
                  <Link
                    role="menuitem"
                    href={item.href}
                    className={`pill${
                      activeHref === item.href ? " is-active" : ""
                    }`}
                    aria-label={item.ariaLabel || item.label}
                    onMouseEnter={() => {
                      const tl = tlRefs.current[i];
                      if (!tl) return;
                      activeTweenRefs.current[i]?.kill();
                      activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
                        duration: 0.3,
                        ease,
                        overwrite: "auto",
                      });
                    }}
                    onMouseLeave={() => {
                      const tl = tlRefs.current[i];
                      if (!tl) return;
                      activeTweenRefs.current[i]?.kill();
                      activeTweenRefs.current[i] = tl.tweenTo(0, {
                        duration: 0.2,
                        ease,
                        overwrite: "auto",
                      });
                    }}
                  >
                    <span
                      className="hover-circle"
                      aria-hidden="true"
                      ref={(el) => {
                        if (el) circleRefs.current[i] = el;
                      }}
                    />
                    <span className="label-stack">
                      <span className="pill-label">{item.label}</span>
                      <span className="pill-label-hover" aria-hidden="true">
                        {item.label}
                      </span>
                    </span>
                  </Link>
                ) : (
                  <a
                    role="menuitem"
                    href={item.href}
                    className={`pill${
                      activeHref === item.href ? " is-active" : ""
                    }`}
                    aria-label={item.ariaLabel || item.label}
                    onMouseEnter={() => {
                      const tl = tlRefs.current[i];
                      if (!tl) return;
                      activeTweenRefs.current[i]?.kill();
                      activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
                        duration: 0.3,
                        ease,
                        overwrite: "auto",
                      });
                    }}
                    onMouseLeave={() => {
                      const tl = tlRefs.current[i];
                      if (!tl) return;
                      activeTweenRefs.current[i]?.kill();
                      activeTweenRefs.current[i] = tl.tweenTo(0, {
                        duration: 0.2,
                        ease,
                        overwrite: "auto",
                      });
                    }}
                  >
                    <span
                      className="hover-circle"
                      aria-hidden="true"
                      ref={(el) => {
                        if (el) circleRefs.current[i] = el;
                      }}
                    />
                    <span className="label-stack">
                      <span className="pill-label">{item.label}</span>
                      <span className="pill-label-hover" aria-hidden="true">
                        {item.label}
                      </span>
                    </span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-button mobile-only"
          onClick={() => {
            const newState = !isMobileMenuOpen;
            setIsMobileMenuOpen(newState);
            const lines =
              hamburgerRef.current?.querySelectorAll(".hamburger-line");
            const menu = mobileMenuRef.current;
            if (lines) {
              if (newState) {
                gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
                gsap.to(lines[1], {
                  rotation: -45,
                  y: -3,
                  duration: 0.3,
                  ease,
                });
              } else {
                gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
                gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
              }
            }
            if (menu) {
              if (newState) {
                gsap.set(menu, { visibility: "visible" });
                gsap.fromTo(
                  menu,
                  { opacity: 0, y: 10, scaleY: 1 },
                  {
                    opacity: 1,
                    y: 0,
                    scaleY: 1,
                    duration: 0.3,
                    ease,
                    transformOrigin: "top center",
                  }
                );
              } else {
                gsap.to(menu, {
                  opacity: 0,
                  y: 10,
                  scaleY: 1,
                  duration: 0.2,
                  ease,
                  transformOrigin: "top center",
                  onComplete: () => {
                    void gsap.set(menu, { visibility: "hidden" });
                  },
                });
              }
            }
            onMobileMenuClick?.();
          }}
          aria-label="Toggle menu"
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className="mobile-menu-popover mobile-only"
        ref={mobileMenuRef}
        style={cssVars as any}
      >
        <ul className="mobile-menu-list">
          {items.map((item, i) => (
            <li key={item.href || `mobile-item-${i}`}>
              {isRouterLink(item.href) ? (
                <Link
                  href={item.href}
                  className={`mobile-menu-link${
                    activeHref === item.href ? " is-active" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className={`mobile-menu-link${
                    activeHref === item.href ? " is-active" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
