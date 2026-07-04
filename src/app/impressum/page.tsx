"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import { SITE } from "@/lib/site";

const RESPONSIBLE = "Halil Ibrahim Solmaz";

export default function ImpressumPage() {
  const { t } = useLanguage();

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

        <h1 className="display-pressura mb-12 text-[14vw] leading-[0.85] md:text-[clamp(3rem,9vw,9rem)]">
          IMPRESSUM
        </h1>

        <div className="grid max-w-3xl gap-10 text-[14px] leading-relaxed md:text-[15px]">
          <section className="flex flex-col gap-2">
            <h2 className="label-mono mb-2 text-[12px]">Angaben gemäß § 5 TMG</h2>
            <p>{RESPONSIBLE}</p>
            <p>{SITE.address}</p>
            <p>Deutschland</p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="label-mono mb-2 text-[12px]">Kontakt</h2>
            <p>
              Telefon:{" "}
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="underline">
                {SITE.phone}
              </a>
            </p>
            <p>
              E-Mail:{" "}
              <a href={`mailto:${SITE.email}`} className="underline">
                {SITE.email}
              </a>
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="label-mono mb-2 text-[12px]">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p>{RESPONSIBLE}</p>
            <p>{SITE.address}</p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="label-mono mb-2 text-[12px]">Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucher­schlichtungsstelle
              teilzunehmen.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
