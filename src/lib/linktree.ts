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

function titleCase(value: string) {
  return value
    .toLowerCase()
    .replace(/(^|[\s|:—-])([a-zäöüß])/g, (_, prefix: string, letter: string) => {
      return `${prefix}${letter.toLocaleUpperCase("de-DE")}`;
    })
    .replace(/\bA\|V\b/g, "A|V")
    .replace(/\bZemin\b/g, "ZEMIN");
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
    const displayTitle = titleCase(title);
    calls.push({
      id: `linktree-open-call-${index + 1}`,
      num: `(${String(index + 1).padStart(2, "0")})`,
      title: { de: displayTitle, en: displayTitle },
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

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function findStoredCall(call: OpenCallItem, items: OpenCallItem[]) {
  return items.find((item) => {
    if (item.applyHref && item.applyHref === call.applyHref) return true;
    if (item.id && item.id === call.id) return true;
    return normalize(item.title.de) === normalize(call.title.de);
  });
}

function isDefaultImage(imageUrl: string) {
  return (
    imageUrl === DEFAULT_OPEN_CALL_IMAGE ||
    imageUrl.startsWith("/images/open-call-default.")
  );
}

function mergeStoredImages(calls: OpenCallItem[], storedCalls: OpenCallItem[]) {
  return calls.map((call) => {
    const stored = findStoredCall(call, storedCalls);
    const imageUrl = stored?.imageUrl?.trim();
    if (!imageUrl || isDefaultImage(imageUrl)) return call;
    return { ...call, imageUrl };
  });
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

    const calls = mergeStoredImages(
      parseOpenCalls(await response.text()),
      content.openCalls.items,
    );
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