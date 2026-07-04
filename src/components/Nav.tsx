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

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

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
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.classList.remove("menu-open");
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-black/80">
        <div aria-hidden className="absolute inset-x-0 top-[14px] h-px bg-foreground" />
        <div aria-hidden className="absolute inset-x-0 bottom-[14px] h-px bg-foreground" />
        <div className="px-5 py-4 md:px-6 md:py-5">
          <nav className="flex items-center justify-between">
            {/* Left menu (hidden — replaced by the overlay menu on all sizes) */}
            <div className="hidden">
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

          {/* Logo (left) */}
          <Link
            href="/"
            aria-label="ZEMIN BERLIN"
            className={`display-pressura text-[26px] font-semibold tracking-tight transition-[opacity,transform] duration-300 md:text-[30px] md:!translate-y-0 md:!opacity-100 ${
              hideChrome
                ? "-translate-y-3 opacity-0 pointer-events-none"
                : "translate-y-0 opacity-100"
            }`}
          >
            ZEMIN BERLIN
          </Link>

          {/* Right: vertical CTA (hidden — replaced by the overlay menu) */}
          <Link
            href="/#contact"
            className="group hidden"
            aria-label="Get in touch"
          >
            <span className="label-mono whitespace-pre text-center text-[15px] font-medium leading-[1.05] [writing-mode:vertical-rl] rotate-180">
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

          {/* Right: menu trigger (all sizes) */}
          <button
            type="button"
            onClick={openMenu}
            aria-label="Menü öffnen"
            aria-expanded={menuOpen}
            className="ml-auto flex h-9 w-9 items-center justify-center"
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

      {/* Site-wide header statement strip — hidden for now */}
      {false && (
        <p
          className={`label-mono border-y border-foreground/20 px-5 py-1.5 text-[10px] leading-tight transition-opacity duration-300 md:px-6 md:text-[11px] md:!opacity-100 ${
            hideChrome ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {L(headerStatement, lang)}
        </p>
      )}
    </header>

      {/* Full-screen overlay menu (all sizes) */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex min-h-0 flex-col overflow-hidden bg-foreground px-5 py-4 text-background md:px-6 md:py-5">
          {/* Top row: close */}
          <div className="menu-chrome flex items-center justify-end">
            <button
              type="button"
              onClick={closeMenu}
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
          <nav className="mt-6 flex min-h-0 flex-1 flex-col justify-center md:mt-10">
            <ul className="menu-links display-pressura flex flex-col gap-0.5 uppercase md:gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block text-[clamp(42px,10vw,86px)] leading-[0.95] tracking-tight transition-opacity hover:opacity-60 md:text-[clamp(56px,7vw,118px)]"
                  >
                    {link[lang]}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Language toggle */}
            <div
              className="menu-chrome label-mono mt-5 flex items-center gap-2 text-[13px] md:mt-8"
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
            className="menu-wordmark display-pressura -mb-1 shrink-0 select-none text-[clamp(60px,20vw,120px)] font-semibold leading-[0.78] tracking-tight md:-mb-2 md:text-[clamp(110px,15vw,220px)]"
          >
            ZEMIN BERLIN
          </div>

          {/* Footer row */}
          <div className="menu-chrome label-mono mt-3 flex shrink-0 items-center justify-between text-[10px] md:mt-4">
            <span>Berlin</span>
            <span>©2026 ZEMIN</span>
            <Link href="/datenschutz" onClick={closeMenu}>
              {t.privacy}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
