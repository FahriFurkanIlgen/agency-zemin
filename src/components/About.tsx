"use client";

import { ScrambleText } from "./ScrambleText";
import { useLanguage } from "./LanguageProvider";
import { useContent } from "./ContentProvider";
import { L, lines } from "@/lib/content";

const ANIMATED_HEADING_WORDS = new Set([
  "Production",
  "Kreuzberg",
  "Hosting",
  "Supporting",
  "Artistic",
]);

function renderHeadingLine(line: string, lineIndex: number) {
  return line.split(/(\s+)/).map((part, partIndex) => {
    if (/^\s+$/.test(part)) return part;

    const word = part.replace(/[^A-Za-z|]+$/g, "");
    if (!ANIMATED_HEADING_WORDS.has(word)) {
      return <span key={`${lineIndex}-${partIndex}`}>{part}</span>;
    }

    return (
      <ScrambleText
        key={`${lineIndex}-${partIndex}`}
        as="span"
        text={part}
        className="inline-block"
        delay={lineIndex * 120 + partIndex * 35}
        speed={0.8}
        stableWidth
      />
    );
  });
}

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
        <h2 className={`display-pressura text-[clamp(2.6rem,10vw,6rem)] leading-[0.9] break-words hyphens-auto md:text-[clamp(2.5rem,5vw,5.5rem)] ${body ? "" : "md:col-span-2 md:text-[clamp(3rem,6.5vw,7rem)]"}`}>
          {lines(about.headingLines, lang).map((line, i) => (
            <span key={`${lang}-${i}`} className="block">
              {renderHeadingLine(line, i)}
            </span>
          ))}
        </h2>

        {body && (
          <div className="label-mono self-end text-[13px] leading-relaxed md:max-w-md md:text-[15px]">
            <p className="normal-case">{body}</p>
          </div>
        )}
      </div>
    </section>
  );
}
