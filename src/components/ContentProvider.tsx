"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import type { SiteContent } from "@/lib/content";

const ContentContext = createContext<SiteContent | null>(null);

export function ContentProvider({
  content,
  children,
}: {
  content: SiteContent;
  children: ReactNode;
}) {
  useEffect(() => {
    const foreground = content.theme?.foreground || "#ff1a00";
    const root = document.documentElement;
    root.style.setProperty("--foreground", foreground);
    root.style.setProperty("--valiente-red", foreground);
    root.style.setProperty("--card-foreground", foreground);
    root.style.setProperty("--popover-foreground", foreground);
    root.style.setProperty("--primary", foreground);
    root.style.setProperty("--secondary-foreground", foreground);
    root.style.setProperty("--muted-foreground", foreground);
    root.style.setProperty("--accent", foreground);
    root.style.setProperty("--ring", foreground);
    root.style.setProperty("--border", `color-mix(in oklab, ${foreground} 25%, transparent)`);
    root.style.setProperty("--input", `color-mix(in oklab, ${foreground} 25%, transparent)`);
  }, [content.theme?.foreground]);

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent(): SiteContent {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return ctx;
}
