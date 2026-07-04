"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { useLanguage } from "./LanguageProvider";
import { useContent } from "./ContentProvider";
import { ScrambleText } from "./ScrambleText";
import { lines } from "@/lib/content";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function Feature() {
  const { lang } = useLanguage();
  const { feature } = useContent();

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

  // Valiente-style cursor-following reel button
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const pressedRef = useRef(false);

  const applyRing = () => {
    const ring = ringRef.current;
    if (!ring) return;
    const { x, y } = posRef.current;
    ring.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${
      pressedRef.current ? 0.86 : 1
    })`;
  };

  const handleMove = (e: ReactMouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    posRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    applyRing();
    if (ringRef.current) ringRef.current.style.opacity = "1";
    document.documentElement.classList.add("reel-hover");
  };

  const handleLeave = () => {
    pressedRef.current = false;
    if (ringRef.current) ringRef.current.style.opacity = "0";
    document.documentElement.classList.remove("reel-hover");
  };

  const handleDown = () => {
    pressedRef.current = true;
    applyRing();
  };

  const handleUp = () => {
    pressedRef.current = false;
    applyRing();
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
      ref={sectionRef}
      id="feature"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      className="relative h-screen min-h-[600px] w-full overflow-hidden border-t border-foreground/15 md:cursor-none"
    >
      {/* Full-screen video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/feedback.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Legibility scrims (top + bottom) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/60" />

      {/* Click anywhere on the video to play / pause */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playLabel}
        className="absolute inset-0 z-10 md:cursor-none"
      />

      {/* Valiente-style cursor-following reel button (desktop) */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 hidden h-28 w-28 items-center justify-center rounded-full border-[1.5px] border-[#ff1a00] text-[#ff1a00] opacity-0 mix-blend-difference will-change-transform md:flex"
        style={{
          transition:
            "transform 0.5s cubic-bezier(0.19,1,0.22,1), opacity 0.3s ease",
        }}
      >
        {playing ? (
          <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor" aria-hidden>
            <rect x="6" y="4" width="4.5" height="18" />
            <rect x="15.5" y="4" width="4.5" height="18" />
          </svg>
        ) : (
          <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor" aria-hidden>
            <path d="M9 5v20l16-10z" />
          </svg>
        )}
      </div>

      {/* Overlaid content */}
      <div className="pointer-events-none relative z-30 flex h-full flex-col justify-between pt-36 pb-6 text-foreground md:pt-52">
        {/* Headline — hidden for now */}
        {false && (
          <h2 className="display-pressura pointer-events-none px-5 text-foreground mix-blend-difference md:px-6">
            {lines(feature.headingLines, lang).map((line, i) => (
              <ScrambleText
                key={`${lang}-${i}`}
                text={line}
                as="span"
                delay={i * 80}
                className="block text-[15vw] leading-[0.82] md:text-[12.5vw]"
              />
            ))}
          </h2>
        )}

        {/* Spacer keeps controls pinned to the bottom */}
        <div className="flex-1" />

        {/* Bottom controls */}
        <div className="flex flex-col gap-3 px-5 md:px-6">
          <div className="label-mono flex items-center justify-between border-t border-foreground/25 pt-3 text-[11px]">
            <div className="pointer-events-auto flex items-center gap-4 md:cursor-none">
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
      </div>
    </section>
  );
}
