"use client";

import Link from "next/link";
import { ScrambleText } from "./ScrambleText";
import { useLanguage } from "./LanguageProvider";
import { useContent } from "./ContentProvider";
import { L } from "@/lib/content";

export function OpenCalls() {
  const { lang } = useLanguage();
  const { openCalls } = useContent();
  const useSlider = openCalls.items.length > 3;

  return (
    <section id="open-calls" className="relative px-5 py-24 md:px-6 md:py-40">
      <h3 className="display-pressura mb-12 text-[14vw] leading-[0.85] md:mb-20 md:text-[clamp(2.5rem,8vw,8rem)]">
        <ScrambleText
          as="span"
          text={L(openCalls.heading, lang)}
          className="block"
        />
      </h3>

      <div
        className={
          useSlider
            ? "open-calls-slider -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 md:-mx-6 md:gap-8 md:px-6"
            : "grid gap-x-8 gap-y-12 md:grid-cols-3"
        }
      >
        {openCalls.items.map((call) => (
          <article
            key={call.id}
            className={`group flex flex-col ${useSlider ? "w-[82vw] shrink-0 snap-start md:w-[calc((100vw-6rem)/3)]" : ""}`}
          >
            {call.imageUrl ? (
              <img
                src={call.imageUrl}
                alt=""
                className="mb-5 aspect-square w-full rounded-sm object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              />
            ) : (
              <div
                className="mb-5 aspect-square w-full overflow-hidden rounded-sm bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.01]"
                style={{ backgroundImage: call.gradient }}
              />
            )}
            <div className="mb-3 flex items-center justify-between">
              <span className="label-mono text-[11px]">{call.num}</span>
              <span className="label-mono text-[11px]">
                ● {L(call.status, lang)}
              </span>
            </div>
            <h4 className="display-pressura mb-2 text-[7vw] leading-[0.9] md:text-[clamp(1.4rem,2.2vw,2rem)]">
              {L(call.title, lang)}
            </h4>
            <p className="label-mono mb-4 text-[12px] normal-case leading-relaxed opacity-90">
              {L(call.description, lang)}
            </p>
            <div className="mt-auto flex items-center justify-between border-t border-foreground/30 pt-3">
              <span className="label-mono text-[11px]">{L(call.deadline, lang)}</span>
              <Link
                href={call.applyHref}
                target={call.applyHref.startsWith("http") ? "_blank" : undefined}
                rel={call.applyHref.startsWith("http") ? "noopener noreferrer" : undefined}
                className="link-sweep label-mono text-[11px]"
              >
                {lang === "de" ? "Bewerben ↗" : "Apply ↗"}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
