"use client";

import Link from "next/link";
import { ScrambleText } from "./ScrambleText";
import { useLanguage } from "./LanguageProvider";
import { useContent } from "./ContentProvider";
import { L } from "@/lib/content";

export function Program() {
  const { lang } = useLanguage();
  const { program } = useContent();

  return (
    <section id="program" className="relative px-5 py-24 md:px-6 md:py-40">
      <div className="mb-12 flex items-end justify-between md:mb-20">
        <h3 className="display-pressura text-[14vw] leading-[0.85] md:text-[clamp(2.5rem,8vw,8rem)]">
          <ScrambleText
            as="span"
            text={L(program.heading, lang)}
            className="block"
          />
        </h3>
        <span className="label-mono text-[12px]">{L(program.period, lang)}</span>
      </div>

      <div className="flex flex-col">
        {program.events.map((event) => (
          <div
            key={event.id}
            className="group grid grid-cols-12 items-center gap-3 border-t border-foreground/30 py-6 md:py-8"
          >
            <div className="label-mono col-span-3 text-[12px] md:col-span-2">
              <span className="block text-[15px] md:text-[18px]">{event.date}</span>
              <span className="opacity-60">{L(event.day, lang)}</span>
            </div>
            <h4 className="display-pressura col-span-9 text-[5vw] leading-[0.95] md:col-span-6 md:text-[clamp(1.2rem,2.2vw,2rem)]">
              {L(event.title, lang)}
            </h4>
            <span className="label-mono col-span-6 col-start-4 text-[11px] opacity-70 md:col-span-2 md:col-start-auto">
              {L(event.category, lang)}
            </span>
            <span className="label-mono col-span-6 col-start-10 text-right text-[11px] md:col-span-2">
              {L(event.status, lang)} ↗
            </span>
          </div>
        ))}
      </div>

      <div className="label-mono mt-8 flex items-center justify-between border-t border-foreground/30 pt-8 text-[12px]">
        <span>{L(program.archiveLabel, lang)}</span>
        <Link href="/#program" className="link-sweep">
          {L(program.archiveCta, lang)}
        </Link>
      </div>
    </section>
  );
}
