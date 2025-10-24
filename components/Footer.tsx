"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUp, Github, Linkedin, Mail, ExternalLink, Music2 } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com/smooth-glitch", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arjun-sridhar-6466751b7/", icon: Linkedin },
  { label: "Email", href: "mailto:arjunsridhar445@gmail.com", icon: Mail },
];

export default function Footer() {
  const { scrollYProgress } = useScroll();
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.25, 0.6]);

  return (
    <footer
      id="footer"
      role="contentinfo"
      className="relative mx-auto mt-20 w-full max-w-5xl px-4 pb-6 pt-10 text-white"
      aria-labelledby="footer-title"
    >
      {/* Outer glow aura (magenta) */}
      <motion.div
        aria-hidden
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute inset-0 -z-10 rounded-3xl blur-2xl"
      >
        <div className="absolute -inset-4 rounded-3xl bg-fuchsia-500/10 ring-1 ring-fuchsia-400/20" />
      </motion.div>

      {/* Fixed magenta theme class if your CSS uses it */}
      <div className="relative footer-shell pixel-border neon-magenta">
        <div className="footer-grid items-start md:grid-cols-2">
          {/* Brand */}
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2
              id="footer-title"
              className="pixel-heading pixel-heading-rgb text-lg tracking-widest md:text-xl"
            >
              {"<Smooth-Glitch />"}
            </h2>
            <p className="footer-desc mt-3 max-w-xs">
              Full-stack developer crafting elegant, performance-driven digital experiences.
            </p>
          </motion.div>

          {/* Socials & Now Playing */}
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col justify-between gap-3 md:items-end"
          >
            <div className="text-right md:text-end">
              <h3 className="text-xs font-semibold tracking-widest text-fuchsia-200/90">
                CONNECT
              </h3>
              <div className="mt-2 flex flex-wrap justify-end gap-1.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="social-chip group text-xs px-2.5 py-1.5"
                  >
                    <s.icon className="size-3 shrink-0" />
                    <span>{s.label}</span>
                    <ExternalLink className="size-2.5 opacity-70 transition group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl border border-fuchsia-300/30 bg-white/[0.03] p-2 text-[10px] text-white/80">
              <Music2 className="size-3" />
              <span className="truncate">
                <strong className="text-white/90">ambient synthwave</strong> — now playing
              </span>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-5">
          <div className="pixel-divider" />
        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <p className="footer-muted text-[10px] md:text-xs">
            © {new Date().getFullYear()} Arjun Sridhar • Built with Next.js, ReactBits & ☕
          </p>
          <BackToTop />
        </div>

        <div aria-hidden className="footer-scanlines" />

        <CornerAccent position="top-left" />
        <CornerAccent position="top-right" />
      </div>
    </footer>
  );
}

function CornerAccent({ position }: { position: "top-left" | "top-right" }) {
  const align = position.includes("left") ? "left-2" : "right-2";
  return (
    <motion.div
      aria-hidden
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 140, damping: 20 }}
      viewport={{ once: true }}
      className={`corner-accent absolute top-2 ${align}`}
    >
      <div className="bar-1" />
      <div className="bar-2" />
    </motion.div>
  );
}

function BackToTop() {
  const handleClick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <motion.button
      onClick={handleClick}
      aria-label="Back to top"
      className="group relative inline-flex items-center gap-1.5 rounded-xl border border-fuchsia-300/40 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
      initial={{ y: 6, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true }}
    >
      <ArrowUp className="size-3" />
      <span>Top</span>
    </motion.button>
  );
}
