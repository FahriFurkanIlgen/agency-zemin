"use client";

import { MapPin } from "lucide-react";
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
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-foreground/30 md:aspect-auto md:min-h-[420px]">
          <iframe
            title="Zemin Berlin location"
            className="h-full w-full grayscale invert hue-rotate-180 contrast-125"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${contact.mapsQuery}&output=embed`}
          />
          <MapPin
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-12 w-12 -translate-x-1/2 -translate-y-full fill-[#e1192d] text-[#e1192d] drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] md:h-14 md:w-14"
            strokeWidth={2.5}
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
