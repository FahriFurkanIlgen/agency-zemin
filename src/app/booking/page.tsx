"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import { BOOKING_CATEGORIES, SITE } from "@/lib/site";

export default function BookingPage() {
  const { lang, t } = useLanguage();
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function toggleCategory(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Nav />
      <main className="px-5 pb-24 pt-44 md:px-6 md:pt-52">
        <Link
          href="/"
          className="label-mono mb-12 inline-block text-[12px] transition-opacity hover:opacity-60"
        >
          {t.backHome}
        </Link>

        <h1 className="display-pressura mb-8 text-[14vw] leading-[0.85] md:text-[clamp(3rem,9vw,9rem)]">
          {lang === "de" ? "BUCHUNG" : "BOOKING"}
        </h1>

        <p className="label-mono mb-14 max-w-2xl text-[13px] leading-relaxed md:text-[15px]">
          {t.bookingIntro}
        </p>

        {submitted ? (
          <div className="label-mono border border-foreground/30 p-8 text-[14px]">
            {lang === "de"
              ? "Danke! Wir haben deine Anfrage erhalten und melden uns in Kürze."
              : "Thank you! We received your request and will be in touch shortly."}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-12 md:grid-cols-2 md:gap-16">
            {/* Categories */}
            <fieldset className="flex flex-col gap-4">
              <legend className="label-mono mb-4 text-[12px]">
                {lang === "de" ? "Kategorie wählen" : "Select category"}
              </legend>
              {BOOKING_CATEGORIES.map((cat) => {
                const active = selected.includes(cat.id);
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    aria-pressed={active}
                    className={
                      "label-mono flex items-center justify-between border border-foreground/30 px-4 py-3 text-left text-[12px] transition-colors " +
                      (active
                        ? "bg-foreground text-background"
                        : "hover:bg-foreground/5")
                    }
                  >
                    <span>{cat[lang]}</span>
                    <span aria-hidden>{active ? "✓" : "+"}</span>
                  </button>
                );
              })}
            </fieldset>

            {/* Details */}
            <div className="flex flex-col gap-5">
              <label className="flex flex-col gap-2">
                <span className="label-mono text-[12px]">
                  {lang === "de" ? "Name" : "Name"}
                </span>
                <input
                  type="text"
                  required
                  className="label-mono border-b border-foreground/30 bg-transparent py-2 text-[14px] outline-none focus:border-foreground"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="label-mono text-[12px]">E-Mail</span>
                <input
                  type="email"
                  required
                  className="label-mono border-b border-foreground/30 bg-transparent py-2 text-[14px] outline-none focus:border-foreground"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="label-mono text-[12px]">
                  {lang === "de" ? "Wunschdatum" : "Preferred date"}
                </span>
                <input
                  type="date"
                  className="label-mono border-b border-foreground/30 bg-transparent py-2 text-[14px] outline-none focus:border-foreground"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="label-mono text-[12px]">
                  {lang === "de" ? "Deine Nachricht" : "Your message"}
                </span>
                <textarea
                  rows={4}
                  required
                  className="label-mono resize-none border border-foreground/30 bg-transparent p-3 text-[14px] outline-none focus:border-foreground"
                />
              </label>

              <button
                type="submit"
                className="label-mono mt-2 border border-foreground bg-foreground px-6 py-4 text-[13px] text-background transition-opacity hover:opacity-80"
              >
                {lang === "de" ? "Anfrage senden ↗" : "Send request ↗"}
              </button>

              <p className="label-mono text-[11px] opacity-60">
                {lang === "de" ? "Oder schreib uns: " : "Or email us: "}
                <a href={`mailto:${SITE.email}`} className="underline">
                  {SITE.email}
                </a>
              </p>
            </div>
          </form>
        )}
      </main>
      <Footer />
    </>
  );
}
