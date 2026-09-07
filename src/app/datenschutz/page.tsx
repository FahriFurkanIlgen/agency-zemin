"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/components/LanguageProvider";
import { SITE } from "@/lib/site";

export default function DatenschutzPage() {
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
          DATENSCHUTZ
        </h1>

        <div className="grid max-w-3xl gap-10 text-[14px] leading-relaxed md:text-[15px]">
          <section className="flex flex-col gap-2">
            <h2 className="label-mono mb-2 text-[12px]">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
              jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die
              auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="label-mono mb-2 text-[12px]">Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren
              Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
              fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
              der Seiten verantwortlich.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="label-mono mb-2 text-[12px]">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="label-mono mb-2 text-[12px]">Datenschutz</h2>
            <p>
              Die Nutzung unserer Website ist in der Regel ohne Angabe
              personenbezogener Daten möglich. Soweit auf unseren Seiten
              personenbezogene Daten (beispielsweise Name, Anschrift oder
              E-Mail-Adressen) erhoben werden, erfolgt dies stets auf
              freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche
              Zustimmung nicht an Dritte weitergegeben.
            </p>
            <p>
              Bei Anfragen über unser Buchungs- oder Kontaktformular nutzen wir
              die übermittelten Daten ausschließlich zur Bearbeitung Ihres
              Anliegens.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="label-mono mb-2 text-[12px]">
              Widerspruch Werbe-Mails
            </h2>
            <p>
              Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten
              Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter
              Werbung und Informationsmaterialien wird hiermit widersprochen.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="label-mono mb-2 text-[12px]">Verantwortliche Stelle</h2>
            <p>{SITE.address}</p>
            <p>
              <a href={`mailto:${SITE.email}`} className="underline">
                {SITE.email}
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
