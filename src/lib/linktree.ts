import "server-only";
import { DEFAULT_OPEN_CALL_IMAGE, type OpenCallItem, type SiteContent } from "./content";

const OPEN_CALL_GRADIENTS = [
  "linear-gradient(135deg, #2a6f5a, #0e3b32)",
  "linear-gradient(135deg, #c2603f, #5e2516)",
  "linear-gradient(135deg, #6a4ea0, #2b1d4f)",
  "linear-gradient(135deg, #284b7a, #111d36)",
];

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripTags(value: string) {
  return decodeEntities(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function titleToDescription(title: string) {
  const normalized = title.replace(/\s*\|\s*Open Call\s*$/i, "").trim();
  if (/organize your event/i.test(normalized)) {
    return {
      de: "Open Call für Veranstaltungen, künstlerische Formate und gemeinschaftliche Programme bei Zemin Berlin.",
      en: "Open call for events, artistic formats and community programs at Zemin Berlin.",
    };
  }
  return {
    de: `Open Call für ${normalized} bei Zemin Berlin. Bewerbungen laufen über das offizielle Formular.`,
    en: `Open call for ${normalized} at Zemin Berlin. Applications run through the official form.`,
  };
}

function parseOpenCalls(html: string): OpenCallItem[] {
  const seen = new Set<string>();
  const calls: OpenCallItem[] = [];

  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)) {
    const href = decodeEntities(match[1]);
    const title = stripTags(match[2]);
    if (!title || !/open call/i.test(title) || seen.has(href)) continue;

    seen.add(href);
    const index = calls.length;
    calls.push({
      id: `linktree-open-call-${index + 1}`,
      num: `(${String(index + 1).padStart(2, "0")})`,
      title: { de: title.toUpperCase(), en: title.toUpperCase() },
      deadline: { de: "BEWERBUNG VIA LINKTREE", en: "APPLY VIA LINKTREE" },
      description: titleToDescription(title),
      status: { de: "OFFEN", en: "OPEN" },
      applyHref: href,
      gradient: OPEN_CALL_GRADIENTS[index % OPEN_CALL_GRADIENTS.length],
      imageUrl: DEFAULT_OPEN_CALL_IMAGE,
    });
  }

  return calls;
}

export async function withLinktreeOpenCalls(content: SiteContent): Promise<SiteContent> {
  const url = content.contact.linktree;
  if (!url) return content;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, {
      headers: { "user-agent": "Mozilla/5.0" },
      signal: controller.signal,
      next: { revalidate: 300 },
    });
    if (!response.ok) return content;

    const calls = parseOpenCalls(await response.text());
    if (calls.length === 0) return content;

    return {
      ...content,
      openCalls: {
        ...content.openCalls,
        items: calls,
      },
    };
  } catch {
    return content;
  } finally {
    clearTimeout(timeout);
  }
}