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
  headerStatement: {
    de: "Zemin Art Space: Ein unabhängiger Produktionsort in Kreuzberg, der interdisziplinäre künstlerische Praktiken beherbergt und unterstützt.",
    en: "Zemin Art Space: An independent production site in Kreuzberg, dedicated to hosting and supporting interdisciplinary artistic practices.",
  },
  hero: {
    intro: {
      de: "EIN UNABHÄNGIGER KUNSTRAUM",
      en: "AN INDEPENDENT ART SPACE",
    },
    headingLines: {
      de: "RAUM FÜR\nINTERDISZIPLINÄRE\nPRAKTIKEN",
      en: "HOSTING\nINTERDISCIPLINARY\nPRACTICES",
    },
    based: {
      de: "KREUZBERG\nBERLIN",
      en: "KREUZBERG\nBERLIN",
    },
    scroll: {
      de: "WEITER SCROLLEN ↓",
      en: "SCROLL TO VIEW MORE ↓",
    },
  },
  about: {
    metaLeft: { de: "", en: "" },
    metaRight: { de: "", en: "" },
    headingLines: {
      de: "An independent production site in Kreuzberg, dedicated to hosting\nand supporting interdisciplinary artistic practices.",
      en: "An independent production site in Kreuzberg, dedicated to hosting\nand supporting interdisciplinary artistic practices.",
    },
    body: {
      de: "",
      en: "",
    },
  },
  feature: {
    headingLines: {
      de: "EIN BODEN\nFÜR IDEEN\nDIE RAUM\nFINDEN",
      en: "A GROUND\nFOR IDEAS\nTHAT FIND\nSPACE",
    },
    caption: {
      de: "WO ARBEIT UND\nGEMEINSCHAFT\nSICH BEGEGNEN —",
      en: "WHERE WORK AND\nCOMMUNITY\nMEET —",
    },
  },
  program: {
    heading: { de: "PROGRAMM", en: "PROGRAM" },
    period: { de: "JULI — AUGUST 2026", en: "JULY — AUGUST 2026" },
    archiveLabel: { de: "ARCHIV", en: "ARCHIVE" },
    archiveCta: {
      de: "GESAMTEN KALENDER ANSEHEN ↗",
      en: "VIEW FULL CALENDAR ↗",
    },
    events: [
      {
        id: "e1",
        date: "12.07",
        day: { de: "FR", en: "FRI" },
        title: {
          de: "GROUND NOISE — LIVE-SOUND-NACHT",
          en: "GROUND NOISE — LIVE SOUND NIGHT",
        },
        category: { de: "PERFORMANCE", en: "PERFORMANCE" },
        status: { de: "TICKETS", en: "TICKETS" },
      },
      {
        id: "e2",
        date: "19.07",
        day: { de: "FR", en: "FRI" },
        title: {
          de: "BODIES IN SPACE — BEWEGUNGS-WORKSHOP",
          en: "BODIES IN SPACE — MOVEMENT WORKSHOP",
        },
        category: { de: "WORKSHOP", en: "WORKSHOP" },
        status: { de: "ANMELDUNG", en: "RSVP" },
      },
      {
        id: "e3",
        date: "26.07",
        day: { de: "FR", en: "FRI" },
        title: {
          de: "CONCRETE GARDEN — GRUPPENAUSSTELLUNG",
          en: "CONCRETE GARDEN — GROUP EXHIBITION",
        },
        category: { de: "AUSSTELLUNG", en: "EXHIBITION" },
        status: { de: "EINTRITT FREI", en: "FREE ENTRY" },
      },
      {
        id: "e4",
        date: "02.08",
        day: { de: "SA", en: "SAT" },
        title: {
          de: "OPEN STUDIO — KÜNSTLERGESPRÄCHE",
          en: "OPEN STUDIO — ARTIST TALKS",
        },
        category: { de: "TALK", en: "TALK" },
        status: { de: "EINTRITT FREI", en: "FREE ENTRY" },
      },
      {
        id: "e5",
        date: "09.08",
        day: { de: "SA", en: "SAT" },
        title: {
          de: "NIGHT SHIFT — AUDIOVISUELLES SET",
          en: "NIGHT SHIFT — AUDIOVISUAL SET",
        },
        category: { de: "PERFORMANCE", en: "PERFORMANCE" },
        status: { de: "TICKETS", en: "TICKETS" },
      },
    ],
  },
  openCalls: {
    heading: { de: "OPEN CALLS", en: "OPEN CALLS" },
    items: [
      {
        id: "c1",
        num: "(01)",
        title: { de: "ORGANIZE YOUR EVENT AT ZEMIN BERLIN", en: "ORGANIZE YOUR EVENT AT ZEMIN BERLIN" },
        deadline: { de: "BEWERBUNG VIA LINKTREE", en: "APPLY VIA LINKTREE" },
        description: {
          de: "Open Call für Veranstaltungen, künstlerische Formate und gemeinschaftliche Programme bei Zemin Berlin.",
          en: "Open call for events, artistic formats and community programs at Zemin Berlin.",
        },
        status: { de: "OFFEN", en: "OPEN" },
        applyHref:
          "https://docs.google.com/forms/d/e/1FAIpQLSfqi_AGBy1Pjq3axn2oMbO9cY4ZmNcbUIu7RoGMNdV1wDLtWA/viewform?usp=header",
        gradient: "linear-gradient(135deg, #2a6f5a, #0e3b32)",
        imageUrl: DEFAULT_OPEN_CALL_IMAGE,
      },
      {
        id: "c2",
        num: "(02)",
        title: { de: "A|V CHEMY", en: "A|V CHEMY" },
        deadline: { de: "BEWERBUNG VIA LINKTREE", en: "APPLY VIA LINKTREE" },
        description: {
          de: "Open Call für audiovisuelle Experimente, performative Formate und hybride künstlerische Beiträge.",
          en: "Open call for audiovisual experiments, performative formats and hybrid artistic contributions.",
        },
        status: { de: "OFFEN", en: "OPEN" },
        applyHref:
          "https://docs.google.com/forms/d/e/1FAIpQLSfo1EpMzaRZ2YMBGSMrY9n_HTcn21m3khUcuy_3LzKxC-AFfA/viewform?usp=header",
        gradient: "linear-gradient(135deg, #c2603f, #5e2516)",
        imageUrl: DEFAULT_OPEN_CALL_IMAGE,
      },
      {
        id: "c3",
        num: "(03)",
        title: { de: "ANALOG FLUX", en: "ANALOG FLUX" },
        deadline: { de: "LAUFENDE BEWERBUNGEN", en: "ROLLING APPLICATIONS" },
        description: {
          de: "Open Call für analoge Prozesse, fluide Bildwelten und experimentelle künstlerische Praktiken.",
          en: "Open call for analog processes, fluid image worlds and experimental artistic practices.",
        },
        status: { de: "OFFEN", en: "OPEN" },
        applyHref:
          "https://docs.google.com/forms/d/e/1FAIpQLSdI0C4PFWsVN967dZDSveRkAd9FeUDitHoufgrIFgZHl2y32Q/viewform?usp=publish-editor",
        gradient: "linear-gradient(135deg, #6a4ea0, #2b1d4f)",
        imageUrl: DEFAULT_OPEN_CALL_IMAGE,
      },
    ],
  },
  values: {
    label: {
      de: "DIE FLAGGEN, FÜR DIE WIR STEHEN",
      en: "THE FLAGS WE STAND FOR",
    },
    statement: {
      de: "Wir sind ein lebendiger Ort — offen, eigensinnig und auf Vertrauen gebaut.",
      en: "We are a living space — open, intentional, and built on trust.",
    },
    items: [
      {
        id: "v1",
        num: "(01)",
        title: { de: "UNABHÄNGIGKEIT", en: "INDEPENDENCE" },
        body: {
          de: "Wir arbeiten selbstorganisiert und frei von kommerziellem Druck. Der Raum gehört der Arbeit, die in ihm entsteht — nicht dem Markt.",
          en: "We work self-organized and free from commercial pressure. The space belongs to the work made within it — not to the market.",
        },
      },
      {
        id: "v2",
        num: "(02)",
        title: { de: "EXPERIMENT", en: "EXPERIMENTATION" },
        body: {
          de: "Prozess vor Produkt. Wir machen Platz für das Unfertige, das Risiko und die Frage — dort, wo etwas Neues entstehen kann.",
          en: "Process before product. We make room for the unfinished, the risk and the question — where something new can take shape.",
        },
      },
      {
        id: "v3",
        num: "(03)",
        title: { de: "GEMEINSCHAFT", en: "COMMUNITY" },
        body: {
          de: "Kunst entsteht im Miteinander. Wir versammeln Menschen rund um die Arbeit und teilen den Boden, auf dem wir alle stehen.",
          en: "Art happens together. We gather people around the work and share the ground we all stand on.",
        },
      },
      {
        id: "v4",
        num: "(04)",
        title: { de: "OFFENHEIT", en: "OPENNESS" },
        body: {
          de: "Offene Türen, zugänglich für alle. Wir glauben an einen Ort, der einlädt statt ausschließt — über Disziplinen und Herkünfte hinweg.",
          en: "Open doors, accessible to all. We believe in a space that invites rather than excludes — across disciplines and origins.",
        },
      },
    ],
  },
  contact: {
    heading: { de: "MELDE DICH", en: "GET IN TOUCH" },
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
      en: "Let's make something together.",
    },
  },
};
