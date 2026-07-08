import type { Lang } from "./site";

export const DEFAULT_OPEN_CALL_IMAGE = "/images/open-call-default.png?v=2";

export type Localized = { de: string; en: string };

export type EventItem = {
  id: string;
  date: string;
  day: Localized;
  title: Localized;
  category: Localized;
  status: Localized;
};

export type OpenCallItem = {
  id: string;
  num: string;
  title: Localized;
  deadline: Localized;
  description: Localized;
  status: Localized;
  applyHref: string;
  gradient: string;
  imageUrl?: string;
};

export type ValueItem = {
  id: string;
  num: string;
  title: Localized;
  body: Localized;
};

export type SiteContent = {
  theme: {
    foreground: string;
  };
  headerStatement: Localized;
  hero: {
    intro: Localized;
    headingLines: Localized;
    based: Localized;
    scroll: Localized;
  };
  about: {
    metaLeft: Localized;
    metaRight: Localized;
    headingLines: Localized;
    body: Localized;
  };
  feature: {
    headingLines: Localized;
    caption: Localized;
  };
  program: {
    heading: Localized;
    period: Localized;
    archiveLabel: Localized;
    archiveCta: Localized;
    events: EventItem[];
  };
  openCalls: {
    heading: Localized;
    items: OpenCallItem[];
  };
  values: {
    label: Localized;
    statement: Localized;
    items: ValueItem[];
  };
  contact: {
    heading: Localized;
    address: string;
    email: string;
    phone: string;
    instagram: string;
    linktree: string;
    mapsQuery: string;
  };
  footer: {
    headingLines: Localized;
  };
};

/** Pick the localized string for the active language. */
export function L(value: Localized, lang: Lang): string {
  return value[lang] || value.en;
}

/** Split a multi-line localized field into an array of lines. */
export function lines(value: Localized, lang: Lang): string[] {
  return L(value, lang).split("\n");
}

export const DEFAULT_CONTENT: SiteContent = {
  theme: {
    foreground: "#00ff0c",
  },
  headerStatement: {
    de: "Zemin Art Space: Ein unabhängiger Produktionsort in Kreuzberg, der interdisziplinäre künstlerische Praktiken beherbergt und unterstützt.",
    en: "Zemin Art Space: An independent production site in Kreuzberg, dedicated to hosting and supporting interdisciplinary artistic practices.",
  },
  hero: {
    intro: {
      de: "Ein unabhängiger Kunstraum",
      en: "An independent art space",
    },
    headingLines: {
      de: "Raum für\ninterdisziplinäre\nPraktiken",
      en: "Hosting\ninterdisciplinary\npractices",
    },
    based: {
      de: "Kreuzberg\nBerlin",
      en: "Kreuzberg\nBerlin",
    },
    scroll: {
      de: "Weiter scrollen ↓",
      en: "Scroll to view more ↓",
    },
  },
  about: {
    metaLeft: { de: "", en: "" },
    metaRight: { de: "", en: "" },
    headingLines: {
      de: "An independent Production site in Kreuzberg, dedicated to Hosting and Supporting interdisciplinary Artistic practices.",
      en: "An independent Production site in Kreuzberg, dedicated to Hosting and Supporting interdisciplinary Artistic practices.",
    },
    body: {
      de: "",
      en: "",
    },
  },
  feature: {
    headingLines: {
      de: "Ein Boden\nfür Ideen\ndie Raum\nfinden",
      en: "A ground\nfor ideas\nthat find\nspace",
    },
    caption: {
      de: "Wo Arbeit und\nGemeinschaft\nsich begegnen —",
      en: "Where work and\ncommunity\nmeet —",
    },
  },
  program: {
    heading: { de: "Programm", en: "Program" },
    period: { de: "Juli — August 2026", en: "July — August 2026" },
    archiveLabel: { de: "Archiv", en: "Archive" },
    archiveCta: {
      de: "Gesamten Kalender ansehen ↗",
      en: "View full calendar ↗",
    },
    events: [
      {
        id: "e1",
        date: "12.07",
        day: { de: "FR", en: "FRI" },
        title: {
          de: "Ground Noise — Live-Sound-Nacht",
          en: "Ground Noise — Live Sound Night",
        },
        category: { de: "Performance", en: "Performance" },
        status: { de: "Tickets", en: "Tickets" },
      },
      {
        id: "e2",
        date: "19.07",
        day: { de: "FR", en: "FRI" },
        title: {
          de: "Bodies in Space — Bewegungs-Workshop",
          en: "Bodies in Space — Movement Workshop",
        },
        category: { de: "Workshop", en: "Workshop" },
        status: { de: "Anmeldung", en: "RSVP" },
      },
      {
        id: "e3",
        date: "26.07",
        day: { de: "FR", en: "FRI" },
        title: {
          de: "Concrete Garden — Gruppenausstellung",
          en: "Concrete Garden — Group Exhibition",
        },
        category: { de: "Ausstellung", en: "Exhibition" },
        status: { de: "Eintritt frei", en: "Free entry" },
      },
      {
        id: "e4",
        date: "02.08",
        day: { de: "SA", en: "SAT" },
        title: {
          de: "Open Studio — Künstlergespräche",
          en: "Open Studio — Artist Talks",
        },
        category: { de: "Talk", en: "Talk" },
        status: { de: "Eintritt frei", en: "Free entry" },
      },
      {
        id: "e5",
        date: "09.08",
        day: { de: "SA", en: "SAT" },
        title: {
          de: "Night Shift — Audiovisuelles Set",
          en: "Night Shift — Audiovisual Set",
        },
        category: { de: "Performance", en: "Performance" },
        status: { de: "Tickets", en: "Tickets" },
      },
    ],
  },
  openCalls: {
    heading: { de: "Open Calls", en: "Open Calls" },
    items: [
      {
        id: "c1",
        num: "(01)",
        title: { de: "Organize your event at ZEMIN Berlin", en: "Organize your event at ZEMIN Berlin" },
        deadline: { de: "Bewerbung via Linktree", en: "Apply via Linktree" },
        description: {
          de: "Open Call für Veranstaltungen, künstlerische Formate und gemeinschaftliche Programme bei Zemin Berlin.",
          en: "Open call for events, artistic formats and community programs at Zemin Berlin.",
        },
        status: { de: "Offen", en: "Open" },
        applyHref:
          "https://docs.google.com/forms/d/e/1FAIpQLSfqi_AGBy1Pjq3axn2oMbO9cY4ZmNcbUIu7RoGMNdV1wDLtWA/viewform?usp=header",
        gradient: "linear-gradient(135deg, #2a6f5a, #0e3b32)",
        imageUrl: "/images/organize.png?v=3",
      },
      {
        id: "c2",
        num: "(02)",
        title: { de: "A|V Chemy", en: "A|V Chemy" },
        deadline: { de: "Bewerbung via Linktree", en: "Apply via Linktree" },
        description: {
          de: "Open Call für audiovisuelle Experimente, performative Formate und hybride künstlerische Beiträge.",
          en: "Open call for audiovisual experiments, performative formats and hybrid artistic contributions.",
        },
        status: { de: "Offen", en: "Open" },
        applyHref:
          "https://docs.google.com/forms/d/e/1FAIpQLSfo1EpMzaRZ2YMBGSMrY9n_HTcn21m3khUcuy_3LzKxC-AFfA/viewform?usp=header",
        gradient: "linear-gradient(135deg, #c2603f, #5e2516)",
        imageUrl: "/images/av.png?v=2",
      },
      {
        id: "c3",
        num: "(03)",
        title: { de: "Analog Flux", en: "Analog Flux" },
        deadline: { de: "Laufende Bewerbungen", en: "Rolling applications" },
        description: {
          de: "Open Call für analoge Prozesse, fluide Bildwelten und experimentelle künstlerische Praktiken.",
          en: "Open call for analog processes, fluid image worlds and experimental artistic practices.",
        },
        status: { de: "Offen", en: "Open" },
        applyHref:
          "https://docs.google.com/forms/d/e/1FAIpQLSdI0C4PFWsVN967dZDSveRkAd9FeUDitHoufgrIFgZHl2y32Q/viewform?usp=publish-editor",
        gradient: "linear-gradient(135deg, #6a4ea0, #2b1d4f)",
        imageUrl: "/images/analog.png?v=3",
      },
    ],
  },
  values: {
    label: {
      de: "Die Flaggen, für die wir stehen",
      en: "The flags we stand for",
    },
    statement: {
      de: "Wir sind ein lebendiger Ort — offen, eigensinnig und auf Vertrauen gebaut.",
      en: "We are a living space — open, intentional, and built on trust.",
    },
    items: [
      {
        id: "v1",
        num: "(01)",
        title: { de: "Unabhängigkeit", en: "Independence" },
        body: {
          de: "Wir arbeiten selbstorganisiert und frei von kommerziellem Druck. Der Raum gehört der Arbeit, die in ihm entsteht — nicht dem Markt.",
          en: "We work self-organized and free from commercial pressure. The space belongs to the work made within it — not to the market.",
        },
      },
      {
        id: "v2",
        num: "(02)",
        title: { de: "Experiment", en: "Experimentation" },
        body: {
          de: "Prozess vor Produkt. Wir machen Platz für das Unfertige, das Risiko und die Frage — dort, wo etwas Neues entstehen kann.",
          en: "Process before product. We make room for the unfinished, the risk and the question — where something new can take shape.",
        },
      },
      {
        id: "v3",
        num: "(03)",
        title: { de: "Gemeinschaft", en: "Community" },
        body: {
          de: "Kunst entsteht im Miteinander. Wir versammeln Menschen rund um die Arbeit und teilen den Boden, auf dem wir alle stehen.",
          en: "Art happens together. We gather people around the work and share the ground we all stand on.",
        },
      },
      {
        id: "v4",
        num: "(04)",
        title: { de: "Offenheit", en: "Openness" },
        body: {
          de: "Offene Türen, zugänglich für alle. Wir glauben an einen Ort, der einlädt statt ausschließt — über Disziplinen und Herkünfte hinweg.",
          en: "Open doors, accessible to all. We believe in a space that invites rather than excludes — across disciplines and origins.",
        },
      },
    ],
  },
  contact: {
    heading: { de: "Melde Dich", en: "Get in Touch" },
    address: "Urbanstr. 3, 10961 Berlin",
    email: "info@zeminberlin.de",
    phone: "+49 15569070168",
    instagram: "https://www.instagram.com/zeminberlin/",
    linktree:
      "https://linktr.ee/zeminberlin?utm_source=ig&utm_medium=social&utm_content=link_in_bio",
    mapsQuery: "Urbanstr.+3,+10961+Berlin",
  },
  footer: {
    headingLines: {
      de: "Lass uns\netwas\nhier —\nzusammen\nmachen.",
      en: "Let's Make Something - Together.",
    },
  },
};
