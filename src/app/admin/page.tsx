"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type {
  SiteContent,
  Localized,
  EventItem,
  OpenCallItem,
  ValueItem,
} from "@/lib/content";

type Status = { kind: "idle" | "saving" | "ok" | "error"; msg?: string };

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  // Check existing session + load content
  useEffect(() => {
    (async () => {
      const [s, c] = await Promise.all([
        fetch("/api/admin/login").then((r) => r.json()),
        fetch("/api/content").then((r) => r.json()),
      ]);
      setAuthed(Boolean(s.authenticated));
      setContent(c);
    })();
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      setPassword("");
    } else {
      const data = await res.json().catch(() => ({}));
      setLoginError(data.error || "Login fehlgeschlagen");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
  }

  async function handleSave() {
    if (!content) return;
    setStatus({ kind: "saving" });
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    if (res.ok) {
      setStatus({ kind: "ok", msg: "Gespeichert ✓" });
      setTimeout(() => setStatus({ kind: "idle" }), 2500);
    } else {
      const data = await res.json().catch(() => ({}));
      setStatus({ kind: "error", msg: data.error || "Fehler beim Speichern" });
    }
  }

  if (authed === null) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5">
        <p className="label-mono text-[12px]">LÄDT…</p>
      </main>
    );
  }

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5">
        <form
          onSubmit={handleLogin}
          className="flex w-full max-w-sm flex-col gap-4"
        >
          <h1 className="display-pressura mb-2 text-[12vw] leading-none md:text-[3rem]">
            ADMIN
          </h1>
          <label className="flex flex-col gap-2">
            <span className="label-mono text-[12px]">PASSWORT</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="label-mono border-b border-foreground/30 bg-transparent py-2 text-[14px] outline-none focus:border-foreground"
              autoFocus
            />
          </label>
          {loginError && (
            <p className="label-mono text-[12px] text-foreground">{loginError}</p>
          )}
          <button
            type="submit"
            className="label-mono mt-2 border border-foreground bg-foreground px-6 py-3 text-[13px] text-background transition-opacity hover:opacity-80"
          >
            ANMELDEN ↗
          </button>
          <Link href="/" className="label-mono mt-4 text-[11px] opacity-60">
            ← ZURÜCK ZUR SEITE
          </Link>
        </form>
      </main>
    );
  }

  if (!content) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5">
        <p className="label-mono text-[12px]">LÄDT INHALT…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-16 md:px-6">
      {/* Header */}
      <div className="mb-12 flex items-center justify-between border-b border-foreground/30 pb-6">
        <h1 className="display-pressura text-[10vw] leading-none md:text-[3rem]">
          ADMIN
        </h1>
        <div className="flex items-center gap-4">
          <Link href="/" className="label-mono text-[11px] opacity-60">
            SEITE ANSEHEN ↗
          </Link>
          <button
            onClick={handleLogout}
            className="label-mono text-[11px] underline-offset-2 hover:underline"
          >
            ABMELDEN
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-14">
        {/* Header statement */}
        <Section title="HEADER STATEMENT">
          <LocalizedField
            label="Statement"
            value={content.headerStatement}
            multiline
            onChange={(v) => setContent({ ...content, headerStatement: v })}
          />
        </Section>

        {/* Hero */}
        <Section title="HERO">
          <LocalizedField
            label="Intro"
            value={content.hero.intro}
            onChange={(v) =>
              setContent({ ...content, hero: { ...content.hero, intro: v } })
            }
          />
          <LocalizedField
            label="Überschrift (eine Zeile pro Umbruch)"
            value={content.hero.headingLines}
            multiline
            onChange={(v) =>
              setContent({
                ...content,
                hero: { ...content.hero, headingLines: v },
              })
            }
          />
          <LocalizedField
            label="Standort-Label"
            value={content.hero.based}
            multiline
            onChange={(v) =>
              setContent({ ...content, hero: { ...content.hero, based: v } })
            }
          />
          <LocalizedField
            label="Scroll-Hinweis"
            value={content.hero.scroll}
            onChange={(v) =>
              setContent({ ...content, hero: { ...content.hero, scroll: v } })
            }
          />
        </Section>

        {/* About */}
        <Section title="ÜBER UNS">
          <LocalizedField
            label="Meta links"
            value={content.about.metaLeft}
            multiline
            onChange={(v) =>
              setContent({ ...content, about: { ...content.about, metaLeft: v } })
            }
          />
          <LocalizedField
            label="Meta rechts"
            value={content.about.metaRight}
            multiline
            onChange={(v) =>
              setContent({
                ...content,
                about: { ...content.about, metaRight: v },
              })
            }
          />
          <LocalizedField
            label="Überschrift (eine Zeile pro Umbruch)"
            value={content.about.headingLines}
            multiline
            onChange={(v) =>
              setContent({
                ...content,
                about: { ...content.about, headingLines: v },
              })
            }
          />
          <LocalizedField
            label="Fließtext"
            value={content.about.body}
            multiline
            onChange={(v) =>
              setContent({ ...content, about: { ...content.about, body: v } })
            }
          />
        </Section>

        {/* Feature */}
        <Section title="FEATURE (VIDEO-BLOCK)">
          <LocalizedField
            label="Überschrift (eine Zeile pro Umbruch)"
            value={content.feature.headingLines}
            multiline
            onChange={(v) =>
              setContent({
                ...content,
                feature: { ...content.feature, headingLines: v },
              })
            }
          />
          <LocalizedField
            label="Bildunterschrift (eine Zeile pro Umbruch)"
            value={content.feature.caption}
            multiline
            onChange={(v) =>
              setContent({
                ...content,
                feature: { ...content.feature, caption: v },
              })
            }
          />
        </Section>

        {/* Program */}
        <Section title="PROGRAMM">
          <LocalizedField
            label="Überschrift"
            value={content.program.heading}
            onChange={(v) =>
              setContent({
                ...content,
                program: { ...content.program, heading: v },
              })
            }
          />
          <LocalizedField
            label="Zeitraum"
            value={content.program.period}
            onChange={(v) =>
              setContent({
                ...content,
                program: { ...content.program, period: v },
              })
            }
          />
          <div className="flex flex-col gap-6">
            {content.program.events.map((ev, i) => (
              <EventEditor
                key={ev.id}
                event={ev}
                onChange={(next) => {
                  const events = [...content.program.events];
                  events[i] = next;
                  setContent({
                    ...content,
                    program: { ...content.program, events },
                  });
                }}
                onRemove={() => {
                  const events = content.program.events.filter(
                    (_, idx) => idx !== i,
                  );
                  setContent({
                    ...content,
                    program: { ...content.program, events },
                  });
                }}
              />
            ))}
            <button
              onClick={() =>
                setContent({
                  ...content,
                  program: {
                    ...content.program,
                    events: [...content.program.events, blankEvent()],
                  },
                })
              }
              className="label-mono w-fit border border-foreground/30 px-4 py-2 text-[11px] hover:bg-foreground/5"
            >
              + EVENT HINZUFÜGEN
            </button>
          </div>
        </Section>

        {/* Open Calls */}
        <Section title="OPEN CALLS">
          <LocalizedField
            label="Überschrift"
            value={content.openCalls.heading}
            onChange={(v) =>
              setContent({
                ...content,
                openCalls: { ...content.openCalls, heading: v },
              })
            }
          />
          <div className="flex flex-col gap-6">
            {content.openCalls.items.map((call, i) => (
              <CallEditor
                key={call.id}
                call={call}
                onChange={(next) => {
                  const items = [...content.openCalls.items];
                  items[i] = next;
                  setContent({
                    ...content,
                    openCalls: { ...content.openCalls, items },
                  });
                }}
                onRemove={() => {
                  const items = content.openCalls.items.filter(
                    (_, idx) => idx !== i,
                  );
                  setContent({
                    ...content,
                    openCalls: { ...content.openCalls, items },
                  });
                }}
              />
            ))}
            <button
              onClick={() =>
                setContent({
                  ...content,
                  openCalls: {
                    ...content.openCalls,
                    items: [...content.openCalls.items, blankCall()],
                  },
                })
              }
              className="label-mono w-fit border border-foreground/30 px-4 py-2 text-[11px] hover:bg-foreground/5"
            >
              + OPEN CALL HINZUFÜGEN
            </button>
          </div>
        </Section>

        {/* Values */}
        <Section title="DIE FLAGGEN (WERTE)">
          <LocalizedField
            label="Label (klein, über der Aussage)"
            value={content.values.label}
            onChange={(v) =>
              setContent({
                ...content,
                values: { ...content.values, label: v },
              })
            }
          />
          <LocalizedField
            label="Aussage (große Überschrift)"
            value={content.values.statement}
            multiline
            onChange={(v) =>
              setContent({
                ...content,
                values: { ...content.values, statement: v },
              })
            }
          />
          <div className="flex flex-col gap-4">
            {content.values.items.map((item, i) => (
              <ValueEditor
                key={item.id}
                item={item}
                onChange={(next) => {
                  const items = [...content.values.items];
                  items[i] = next;
                  setContent({
                    ...content,
                    values: { ...content.values, items },
                  });
                }}
                onRemove={() => {
                  const items = content.values.items.filter(
                    (_, idx) => idx !== i,
                  );
                  setContent({
                    ...content,
                    values: { ...content.values, items },
                  });
                }}
              />
            ))}
            <button
              onClick={() =>
                setContent({
                  ...content,
                  values: {
                    ...content.values,
                    items: [...content.values.items, blankValue()],
                  },
                })
              }
              className="label-mono w-fit border border-foreground/30 px-4 py-2 text-[11px] hover:bg-foreground/5"
            >
              + FLAGGE HINZUFÜGEN
            </button>
          </div>
        </Section>

        {/* Contact */}
        <Section title="KONTAKT">
          <LocalizedField
            label="Überschrift"
            value={content.contact.heading}
            onChange={(v) =>
              setContent({
                ...content,
                contact: { ...content.contact, heading: v },
              })
            }
          />
          <PlainField
            label="Adresse"
            value={content.contact.address}
            onChange={(v) =>
              setContent({
                ...content,
                contact: { ...content.contact, address: v },
              })
            }
          />
          <PlainField
            label="E-Mail"
            value={content.contact.email}
            onChange={(v) =>
              setContent({
                ...content,
                contact: { ...content.contact, email: v },
              })
            }
          />
          <PlainField
            label="Telefon"
            value={content.contact.phone}
            onChange={(v) =>
              setContent({
                ...content,
                contact: { ...content.contact, phone: v },
              })
            }
          />
          <PlainField
            label="Instagram URL"
            value={content.contact.instagram}
            onChange={(v) =>
              setContent({
                ...content,
                contact: { ...content.contact, instagram: v },
              })
            }
          />
          <PlainField
            label="Facebook URL"
            value={content.contact.facebook}
            onChange={(v) =>
              setContent({
                ...content,
                contact: { ...content.contact, facebook: v },
              })
            }
          />
          <PlainField
            label="Google Maps Query"
            value={content.contact.mapsQuery}
            onChange={(v) =>
              setContent({
                ...content,
                contact: { ...content.contact, mapsQuery: v },
              })
            }
          />
        </Section>

        {/* Footer */}
        <Section title="FOOTER">
          <LocalizedField
            label="Überschrift (eine Zeile pro Umbruch)"
            value={content.footer.headingLines}
            multiline
            onChange={(v) =>
              setContent({
                ...content,
                footer: { ...content.footer, headingLines: v },
              })
            }
          />
        </Section>
      </div>

      {/* Sticky save bar */}
      <div className="sticky bottom-0 mt-16 flex items-center justify-between border-t border-foreground/30 bg-background/95 py-4 backdrop-blur">
        <span className="label-mono text-[11px]">
          {status.kind === "ok" && status.msg}
          {status.kind === "error" && status.msg}
          {status.kind === "saving" && "SPEICHERT…"}
        </span>
        <button
          onClick={handleSave}
          disabled={status.kind === "saving"}
          className="label-mono border border-foreground bg-foreground px-8 py-3 text-[13px] text-background transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          ÄNDERUNGEN SPEICHERN ↗
        </button>
      </div>
    </main>
  );
}

/* ---------- Helpers ---------- */

function blankEvent(): EventItem {
  return {
    id: `e${Date.now()}`,
    date: "",
    day: { de: "", en: "" },
    title: { de: "", en: "" },
    category: { de: "", en: "" },
    status: { de: "", en: "" },
  };
}

function blankCall(): OpenCallItem {
  return {
    id: `c${Date.now()}`,
    num: "",
    title: { de: "", en: "" },
    deadline: { de: "", en: "" },
    description: { de: "", en: "" },
    status: { de: "", en: "" },
    applyHref: "/booking",
    gradient: "linear-gradient(135deg, #2a6f5a, #0e3b32)",
  };
}

function blankValue(): ValueItem {
  return {
    id: `v${Date.now()}`,
    num: "",
    title: { de: "", en: "" },
    body: { de: "", en: "" },
  };
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="label-mono text-[13px] opacity-60">{title}</h2>
      {children}
    </section>
  );
}

function LocalizedField({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: Localized;
  onChange: (v: Localized) => void;
  multiline?: boolean;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Field
        label={`${label} (DE)`}
        value={value.de}
        multiline={multiline}
        onChange={(de) => onChange({ ...value, de })}
      />
      <Field
        label={`${label} (EN)`}
        value={value.en}
        multiline={multiline}
        onChange={(en) => onChange({ ...value, en })}
      />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="label-mono text-[10px] opacity-50">{label}</span>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="label-mono resize-y border border-foreground/30 bg-transparent p-2 text-[13px] normal-case outline-none focus:border-foreground"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="label-mono border-b border-foreground/30 bg-transparent py-1.5 text-[13px] normal-case outline-none focus:border-foreground"
        />
      )}
    </label>
  );
}

function PlainField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return <Field label={label} value={value} onChange={onChange} />;
}

function EventEditor({
  event,
  onChange,
  onRemove,
}: {
  event: EventItem;
  onChange: (e: EventItem) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 border border-foreground/30 p-4">
      <div className="flex items-center justify-between">
        <span className="label-mono text-[11px] opacity-60">EVENT</span>
        <button
          onClick={onRemove}
          className="label-mono text-[11px] underline-offset-2 hover:underline"
        >
          ENTFERNEN ✕
        </button>
      </div>
      <Field
        label="Datum (z. B. 12.07)"
        value={event.date}
        onChange={(date) => onChange({ ...event, date })}
      />
      <LocalizedField
        label="Tag"
        value={event.day}
        onChange={(day) => onChange({ ...event, day })}
      />
      <LocalizedField
        label="Titel"
        value={event.title}
        onChange={(title) => onChange({ ...event, title })}
      />
      <LocalizedField
        label="Kategorie"
        value={event.category}
        onChange={(category) => onChange({ ...event, category })}
      />
      <LocalizedField
        label="Status"
        value={event.status}
        onChange={(status) => onChange({ ...event, status })}
      />
    </div>
  );
}

function CallEditor({
  call,
  onChange,
  onRemove,
}: {
  call: OpenCallItem;
  onChange: (c: OpenCallItem) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 border border-foreground/30 p-4">
      <div className="flex items-center justify-between">
        <span className="label-mono text-[11px] opacity-60">OPEN CALL</span>
        <button
          onClick={onRemove}
          className="label-mono text-[11px] underline-offset-2 hover:underline"
        >
          ENTFERNEN ✕
        </button>
      </div>
      <Field
        label="Nummer (z. B. (01))"
        value={call.num}
        onChange={(num) => onChange({ ...call, num })}
      />
      <LocalizedField
        label="Titel"
        value={call.title}
        onChange={(title) => onChange({ ...call, title })}
      />
      <LocalizedField
        label="Beschreibung"
        value={call.description}
        multiline
        onChange={(description) => onChange({ ...call, description })}
      />
      <LocalizedField
        label="Frist"
        value={call.deadline}
        onChange={(deadline) => onChange({ ...call, deadline })}
      />
      <LocalizedField
        label="Status"
        value={call.status}
        onChange={(status) => onChange({ ...call, status })}
      />
      <Field
        label="Bewerbungs-Link"
        value={call.applyHref}
        onChange={(applyHref) => onChange({ ...call, applyHref })}
      />
      <Field
        label="Hintergrund (CSS gradient)"
        value={call.gradient}
        onChange={(gradient) => onChange({ ...call, gradient })}
      />
    </div>
  );
}

function ValueEditor({
  item,
  onChange,
  onRemove,
}: {
  item: ValueItem;
  onChange: (v: ValueItem) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 border border-foreground/30 p-4">
      <div className="flex items-center justify-between">
        <span className="label-mono text-[11px] opacity-60">FLAGGE</span>
        <button
          onClick={onRemove}
          className="label-mono text-[11px] underline-offset-2 hover:underline"
        >
          ENTFERNEN ✕
        </button>
      </div>
      <Field
        label="Nummer (z. B. (01))"
        value={item.num}
        onChange={(num) => onChange({ ...item, num })}
      />
      <LocalizedField
        label="Titel"
        value={item.title}
        onChange={(title) => onChange({ ...item, title })}
      />
      <LocalizedField
        label="Text"
        value={item.body}
        multiline
        onChange={(body) => onChange({ ...item, body })}
      />
    </div>
  );
}
