"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/site";
import { useLanguage } from "./LanguageProvider";
import { useContent } from "./ContentProvider";
import { L } from "@/lib/content";

export function Nav() {
  const { lang, toggle, t } = useLanguage();
  const { headerStatement } = useContent();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideChrome, setHideChrome] = useState(false);

  // Hide logo + statement strip when scrolling down, reveal on scroll up (mobile)
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY && y > 80) setHideChrome(true);
      else if (y < lastY) setHideChrome(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll lock + Escape to close while the mobile overlay is open
  useEffect(() => {
    const root = document.documentElement;
    if (menuOpen) {
      root.classList.add("menu-open");
    } else {
      root.classList.remove("menu-open");
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.classList.remove("menu-open");
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 md:bg-transparent md:mix-blend-multiply ${
          hideChrome ? "bg-transparent mix-blend-multiply" : "bg-background"
        }`}
      >
        <div className="px-5 py-4 md:px-6 md:py-5">
          <nav className="flex items-center justify-between md:items-start">
            {/* Left menu */}
            <div className="hidden flex-col gap-3 md:flex">
            <ul className="label-mono flex flex-col gap-[3px] text-[15px] font-medium leading-tight">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className="link-sweep">
                    {link[lang]}
                  </Link>
                </li>
              ))}
            </ul>
            <div
              className="label-mono flex items-center gap-1 text-[11px]"
              role="group"
              aria-label="Language"
            >
              <button
                type="button"
                onClick={() => lang !== "en" && toggle()}
                aria-pressed={lang === "en"}
                className={
                  lang === "en"
                    ? "underline underline-offset-2"
                    : "opacity-50 transition-opacity hover:opacity-100"
                }
              >
                EN
              </button>
              <span aria-hidden>/</span>
              <button
                type="button"
                onClick={() => lang !== "de" && toggle()}
                aria-pressed={lang === "de"}
                className={
                  lang === "de"
                    ? "underline underline-offset-2"
                    : "opacity-50 transition-opacity hover:opacity-100"
                }
              >
                DE
              </button>
            </div>
          </div>

          {/* Center logo */}
          <Link
            href="/"
            aria-label="ZEMIN"
            className={`display-pressura text-[26px] font-medium tracking-tight transition-[opacity,transform] duration-300 md:absolute md:left-1/2 md:top-5 md:-translate-x-1/2 md:text-[30px] md:!translate-y-0 md:!opacity-100 ${
              hideChrome
                ? "-translate-y-3 opacity-0 pointer-events-none"
                : "translate-y-0 opacity-100"
            }`}
          >
            ZEMIN<sup className="text-[10px] align-super">®</sup>
          </Link>

          {/* Right: vertical CTA (desktop) */}
          <Link
            href="/#contact"
            className="group hidden flex-col items-center gap-4 md:flex"
            aria-label="Get in touch"
          >
            <span className="label-mono whitespace-pre text-center text-[15px] font-medium uppercase leading-[1.05] [writing-mode:vertical-rl] rotate-180">
              {t.getInTouch}
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="rotate-[135deg]"
              >
                <path
                  d="M3 7h8M7 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </span>
          </Link>

          {/* Right: mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Menü öffnen"
            aria-expanded={menuOpen}
            className="ml-auto flex h-9 w-9 items-center justify-center md:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3v18M3 12h18"
                stroke="currentColor"
                strokeWidth="2.75"
                strokeLinecap="square"
              />
            </svg>
          </button>
        </nav>
      </div>

      {/* Site-wide header statement strip */}
      <p
        className={`label-mono border-y border-foreground/20 px-5 py-1.5 text-[10px] uppercase leading-tight transition-opacity duration-300 md:px-6 md:text-[11px] md:!opacity-100 ${
          hideChrome ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {L(headerStatement, lang)}
      </p>
    </header>

      {/* Full-screen mobile overlay menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-foreground px-5 py-4 text-background md:hidden">
          {/* Top row: logo + close */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              aria-label="ZEMIN"
              className="display-pressura text-[26px] font-medium tracking-tight"
            >
              ZEMIN<sup className="text-[10px] align-super">®</sup>
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Menü schließen"
              className="flex h-10 w-10 items-center justify-center"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M4 4l14 14M18 4L4 18"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="square"
                />
              </svg>
            </button>
          </div>

          {/* Links */}
          <nav className="mt-10 flex flex-1 flex-col justify-center">
            <ul className="display-pressura flex flex-col gap-1 uppercase">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-[11vw] leading-[1.05] tracking-tight transition-opacity hover:opacity-60"
                  >
                    {link[lang]}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Language toggle */}
            <div
              className="label-mono mt-8 flex items-center gap-2 text-[13px]"
              role="group"
              aria-label="Language"
            >
              <button
                type="button"
                onClick={() => lang !== "en" && toggle()}
                aria-pressed={lang === "en"}
                className={lang === "en" ? "underline underline-offset-2" : "opacity-50"}
              >
                EN
              </button>
              <span aria-hidden>/</span>
              <button
                type="button"
                onClick={() => lang !== "de" && toggle()}
                aria-pressed={lang === "de"}
                className={lang === "de" ? "underline underline-offset-2" : "opacity-50"}
              >
                DE
              </button>
            </div>
          </nav>

          {/* Oversized wordmark */}
          <div
            aria-hidden
            className="display-pressura -mb-2 select-none text-[26vw] font-medium leading-[0.8] tracking-tight"
          >
            ZEMIN<sup className="text-[0.35em] align-super">®</sup>
          </div>

          {/* Footer row */}
          <div className="label-mono mt-4 flex items-center justify-between text-[10px] uppercase">
            <span>BERLIN</span>
            <span>©2026 ZEMIN</span>
            <Link href="/datenschutz" onClick={() => setMenuOpen(false)}>
              {t.privacy}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
