"use client";

import { useState } from "react";
import Link from "next/link";
import { ScrambleText } from "./ScrambleText";
import { useLanguage } from "./LanguageProvider";
import { useContent } from "./ContentProvider";
import { lines } from "@/lib/content";
import { SITE } from "@/lib/site";

export function Footer() {
  const { lang, t } = useLanguage();
  const { footer, contact } = useContent();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <footer
      id="footer"
      className="relative mt-20 flex min-h-screen flex-col justify-between px-5 pb-8 pt-24 md:px-6 md:pt-32"
    >
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <h2 className="display-pressura text-[12vw] leading-[0.9] md:text-[clamp(2.5rem,6vw,6rem)]">
          {lines(footer.headingLines, lang).map((line, i) => (
            <ScrambleText
              key={`${lang}-${i}`}
              as="span"
              text={line}
              className="block"
              delay={i * 100}
            />
          ))}
        </h2>

        <div className="flex flex-col gap-8 self-end">
          {/* Newsletter */}
          <div className="flex flex-col gap-3">
            <span className="label-mono text-[12px]">{t.newsletterTitle}</span>
            <form
              onSubmit={handleSubscribe}
              className="flex items-center border-b border-foreground/30"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletterPlaceholder}
                className="label-mono w-full bg-transparent py-2 text-[14px] uppercase outline-none placeholder:text-foreground/40"
              />
              <button
                type="submit"
                className="label-mono shrink-0 py-2 pl-4 text-[12px] transition-opacity hover:opacity-60"
              >
                {submitted ? "✓ DONE" : `${t.subscribe} ↗`}
              </button>
            </form>
          </div>

          {/* Contact */}
          <div className="label-mono flex flex-col gap-3 text-[14px] normal-case md:text-[16px]">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center justify-between border-b border-foreground/30 pb-2 transition-opacity hover:opacity-60"
            >
              {contact.email}
            </a>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="flex items-center justify-between border-b border-foreground/30 pb-2 transition-opacity hover:opacity-60"
            >
              {contact.phone}
            </a>
            <div className="flex gap-6 pt-2">
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep"
              >
                INSTAGRAM ↗
              </a>
              <a
                href={contact.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep"
              >
                LINKTREE ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="my-12 flex justify-center md:my-0">
        <span className="display-pressura text-[18vw] leading-none font-medium tracking-tight">
          ZEMIN BERLIN
        </span>
      </div>

      <div className="label-mono flex items-end justify-between text-[11px]">
        <span>{contact.address.toUpperCase()}</span>
        <span className="flex items-center gap-4">
          <span>©2026 {SITE.name}</span>
          <Link href="/impressum" className="link-sweep">
            {t.impressum}
          </Link>
          <Link href="/datenschutz" className="link-sweep">
            {t.privacy}
          </Link>
        </span>
      </div>
    </footer>
  );
}
