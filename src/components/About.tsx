"use client";

import { ScrambleText } from "./ScrambleText";
import { useLanguage } from "./LanguageProvider";
import { useContent } from "./ContentProvider";
import { L, lines } from "@/lib/content";

export function About() {
  const { lang } = useLanguage();
  const { about } = useContent();
  const body = L(about.body, lang).trim();
  const metaLeft = L(about.metaLeft, lang).trim();
  const metaRight = L(about.metaRight, lang).trim();

  return (
    <section
      id="about"
      className="relative px-5 pt-28 pb-32 md:px-6 md:pt-40 md:pb-48"
    >
      {(metaLeft || metaRight) && (
        <div className="label-mono mb-16 flex items-start justify-between text-[11px] md:mb-28">
          {metaLeft && <span className="whitespace-pre">{metaLeft}</span>}
          {metaRight && <span className="whitespace-pre text-right">{metaRight}</span>}
        </div>
      )}

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        {/* Big headline */}
        <h2 className="display-pressura text-[12vw] leading-[0.9] [overflow-wrap:anywhere] md:text-[clamp(2.5rem,5vw,5.5rem)]">
          {lines(about.headingLines, lang).map((line, i) => (
            <ScrambleText
              key={`${lang}-${i}`}
              as="span"
              text={line}
              className="block"
              delay={i * 120}
            />
          ))}
        </h2>

        {body && (
          <div className="label-mono self-end text-[13px] leading-relaxed md:max-w-md md:text-[15px]">
            <p className="uppercase">{body}</p>
          </div>
        )}
      </div>
    </section>
  );
}
