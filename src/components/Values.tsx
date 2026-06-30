"use client";

import { ScrambleText } from "./ScrambleText";
import { useLanguage } from "./LanguageProvider";
import { useContent } from "./ContentProvider";
import { L } from "@/lib/content";

export function Values() {
  const { lang } = useLanguage();
  const { values } = useContent();

  return (
    <section
      id="values"
      className="relative overflow-hidden border-t border-foreground/15 px-5 py-24 md:px-6 md:py-40"
    >
      {/* Section label */}
      <p className="label-mono mb-10 text-[11px] uppercase md:mb-16">
        {L(values.label, lang)}
      </p>

      {/* Big statement */}
      <h3 className="display-pressura mb-16 max-w-[18ch] text-[9vw] leading-[0.95] md:mb-24 md:text-[clamp(2rem,4.5vw,4.25rem)]">
        <ScrambleText as="span" text={L(values.statement, lang)} className="block" />
      </h3>

      <div className="grid gap-12 md:grid-cols-[44%_1fr] md:gap-16">
        {/* Sticky video — the unused third video */}
        <figure className="relative aspect-square w-full overflow-hidden md:sticky md:top-24 md:self-start">
          <video
            className="h-full w-full object-cover"
            src="/videos/old-scenes.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </figure>

        {/* The flags / values list */}
        <ul className="flex flex-col border-t border-foreground/20">
          {values.items.map((item) => (
            <li
              key={item.id}
              className="group flex flex-col gap-3 border-b border-foreground/20 py-7 md:flex-row md:gap-10 md:py-9"
            >
              <span className="label-mono shrink-0 text-[12px] opacity-60 md:pt-2">
                {item.num}
              </span>
              <div className="flex flex-1 flex-col gap-3">
                <h4 className="display-pressura text-[8vw] leading-[0.9] md:text-[clamp(1.5rem,2.6vw,2.5rem)]">
                  {L(item.title, lang)}
                </h4>
                <p className="label-mono max-w-[46ch] text-[12px] uppercase leading-relaxed opacity-90 md:text-[13px]">
                  {L(item.body, lang)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
