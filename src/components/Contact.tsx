"use client";

import { ScrambleText } from "./ScrambleText";
import { useLanguage } from "./LanguageProvider";
import { useContent } from "./ContentProvider";
import { L } from "@/lib/content";

export function Contact() {
  const { lang } = useLanguage();
  const { contact } = useContent();

  return (
    <section id="contact" className="relative px-5 py-24 md:px-6 md:py-40">
      <h3 className="display-pressura mb-12 text-[14vw] leading-[0.85] md:mb-20 md:text-[clamp(2.5rem,8vw,8rem)]">
        <ScrambleText
          as="span"
          text={L(contact.heading, lang)}
          className="block"
        />
      </h3>

      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        {/* Map */}
        <div className="aspect-[4/3] w-full overflow-hidden rounded-sm border border-foreground/30 md:aspect-auto md:min-h-[420px]">
          <iframe
            title="Zemin Berlin location"
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${contact.mapsQuery}&output=embed`}
          />
        </div>

        {/* Details */}
        <div className="label-mono flex flex-col gap-6 self-center text-[14px] normal-case md:text-[16px]">
          <div>
            <p className="mb-1 opacity-60">{lang === "de" ? "Adresse" : "Address"}</p>
            <p>{contact.address}</p>
          </div>
          <div>
            <p className="mb-1 opacity-60">{lang === "de" ? "E-Mail" : "Email"}</p>
            <a href={`mailto:${contact.email}`} className="link-sweep">
              {contact.email}
            </a>
          </div>
          <div>
            <p className="mb-1 opacity-60">{lang === "de" ? "Telefon" : "Phone"}</p>
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="link-sweep">
              {contact.phone}
            </a>
          </div>
          <a
            href={`https://www.google.com/maps?q=${contact.mapsQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block w-fit border-b border-foreground/30 pb-1 transition-opacity hover:opacity-60"
          >
            {lang === "de" ? "In Google Maps öffnen ↗" : "Open in Google Maps ↗"}
          </a>
        </div>
      </div>
    </section>
  );
}
