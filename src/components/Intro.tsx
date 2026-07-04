"use client";

import { useEffect, useRef, useState } from "react";

const WORD = "ZEMIN BERLIN";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DURATION = 1500; // ms until reveal starts

/**
 * Valiente-style opening sequence: a full-screen panel that scrambles the
 * ZEMIN BERLIN wordmark while a counter runs to 100, then slides up to reveal the
 * page. Plays once per browser session.
 */
export function Intro() {
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const [display, setDisplay] = useState(WORD);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const seen =
      typeof window !== "undefined" &&
      window.sessionStorage.getItem("zemin-intro") === "1";
    if (seen) {
      const id = requestAnimationFrame(() => setDone(true));
      return () => cancelAnimationFrame(id);
    }

    document.documentElement.classList.add("intro-active");

    let start = 0;
    let raf = 0;
    let first = true;

    const tick = (now: number) => {
      if (first) {
        first = false;
        start = now;
        setMounted(true);
      }
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      setCount(Math.round(progress * 100));

      const revealed = Math.floor(progress * WORD.length);
      let out = "";
      for (let i = 0; i < WORD.length; i++) {
        out +=
          i < revealed
            ? WORD[i]
            : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setDisplay(out);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(WORD);
        window.setTimeout(() => setLeaving(true), 220);
        window.setTimeout(() => {
          setDone(true);
          document.documentElement.classList.remove("intro-active");
          window.sessionStorage.setItem("zemin-intro", "1");
        }, 220 + 850);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("intro-active");
    };
  }, []);

  if (done || !mounted) return null;

  return (
    <div className={`intro ${leaving ? "is-leaving" : ""}`} aria-hidden>
      <div className="intro-inner">
        <span className="intro-word display-pressura">
          {display}
        </span>
      </div>
      <div className="intro-meta label-mono">
        <span>BERLIN — KREUZBERG</span>
        <span className="intro-count">{String(count).padStart(3, "0")}</span>
      </div>
      <div className="intro-bar">
        <span style={{ transform: `scaleX(${count / 100})` }} />
      </div>
    </div>
  );
}
