"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { useContent } from "./ContentProvider";
import { ScrambleText } from "./ScrambleText";
import { L, lines } from "@/lib/content";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function Hero() {
  const { lang } = useLanguage();
  const { hero } = useContent();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setTime(v.currentTime);
    const onMeta = () => setDuration(v.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    // sync initial state in case events already fired (cached/fast load)
    const sync = requestAnimationFrame(() => {
      if (Number.isFinite(v.duration)) setDuration(v.duration);
      setTime(v.currentTime);
      setPlaying(!v.paused);
    });
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("durationchange", onMeta);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      cancelAnimationFrame(sync);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("durationchange", onMeta);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const soundLabel = muted
    ? lang === "de"
      ? "Ton an"
      : "Sound on"
    : lang === "de"
      ? "Ton aus"
      : "Sound off";
  const playLabel = playing
    ? "Pause"
    : lang === "de"
      ? "Abspielen"
      : "Play";

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-40 pb-6 md:pt-56"
    >
      {/* Top headline block */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-5 text-center md:gap-8">
        <h2 className="grotesk text-[7vw] font-medium leading-none tracking-tight md:text-[clamp(1.5rem,3.4vw,3rem)]">
          {L(hero.intro, lang)}
        </h2>
        <h1 className="display-pressura leading-[0.82] text-foreground">
          {lines(hero.headingLines, lang).map((line, i) => (
            <ScrambleText
              key={`${lang}-${i}`}
              text={line}
              as="span"
              delay={i * 90}
              className="block text-[12vw] leading-[0.82] [overflow-wrap:anywhere] md:text-[9vw]"
            />
          ))}
        </h1>
      </div>

      {/* Bottom label row */}
      <div className="label-mono grid grid-cols-2 items-end gap-2 px-5 text-[11px] md:grid-cols-3 md:px-6">
        <span className="whitespace-pre">{L(hero.based, lang)}</span>
        <span className="hidden text-center md:block">{L(hero.scroll, lang)}</span>
        <span className="text-right">©2026</span>
      </div>

      {/* Full-bleed cinematic video */}
      <div className="relative mt-6 h-[58vh] w-full overflow-hidden md:h-[78vh]">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/homepage.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Subtle gradient only at the bottom for control legibility */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Center play / pause ring button */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playLabel}
          className="group absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-background/80 text-background backdrop-blur-[2px] transition-all duration-300 hover:scale-105 hover:bg-foreground hover:text-background hover:border-foreground md:h-24 md:w-24"
        >
          {playing ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
              <rect x="4" y="3" width="4" height="14" />
              <rect x="12" y="3" width="4" height="14" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor" aria-hidden>
              <path d="M5 3v16l13-8z" />
            </svg>
          )}
        </button>

        {/* Bottom control bar */}
        <div className="label-mono absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-3 text-[11px] text-background md:px-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={togglePlay}
              className="link-sweep uppercase"
            >
              {playLabel}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              className="link-sweep uppercase"
            >
              {soundLabel}
            </button>
          </div>
          <span className="tabular-nums tracking-tight">
            {formatTime(time)} / {formatTime(duration)}
          </span>
        </div>
      </div>
    </section>
  );
}

