export type Lang = "en" | "de";

export const SITE = {
  name: "ZEMIN",
  city: "BERLIN",
  est: "(2025)",
  address: "Urbanstr. 3, 10961 Berlin",
  email: "info@zeminberlin.de",
  phone: "+49 15569070168",
  instagram: "https://www.instagram.com/zeminberlin/",
  linktree:
    "https://linktr.ee/zeminberlin?utm_source=ig&utm_medium=social&utm_content=link_in_bio",
  mapsQuery: "Urbanstr.+3,+10961+Berlin",
} as const;

export const HEADER_STATEMENT =
  "Zemin Art Space: An independent production site in Kreuzberg, dedicated to hosting and supporting interdisciplinary artistic practices.";

export const NAV_LINKS: { id: string; href: string; en: string; de: string }[] = [
  { id: "program", href: "/#program", en: "Program", de: "Programm" },
  { id: "open-calls", href: "/#open-calls", en: "Open Calls", de: "Open Calls" },
  { id: "booking", href: "/booking", en: "Booking", de: "Buchung" },
  { id: "contact", href: "/#contact", en: "Contact", de: "Kontakt" },
];

export const BOOKING_CATEGORIES: { id: string; en: string; de: string }[] = [
  {
    id: "performance",
    en: "Artistic Performance / Exhibition",
    de: "Künstlerische Performance / Ausstellung",
  },
  { id: "workshop", en: "Workshop", de: "Workshop" },
  {
    id: "private",
    en: "Private Event (Birthday, party, etc.)",
    de: "Private Veranstaltung (Geburtstag, Feier usw.)",
  },
  {
    id: "corporate",
    en: "Corporate Launch / Meeting",
    de: "Firmen-Launch / Meeting",
  },
  { id: "other", en: "Other", de: "Andere" },
];

export const DICT = {
  en: {
    getInTouch: "Get in\ntouch",
    bravery: "An independent art space",
    scroll: "Scroll to view more ↓",
    based: "Kreuzberg\nBerlin",
    newsletterTitle: "Stay in the loop",
    newsletterPlaceholder: "Your email",
    subscribe: "Subscribe",
    bookingIntro:
      "Plan Your Event: Zemin Berlin is available for a wide range of creative and private projects. Select your event category below to get started and share your requirements with us.",
    bookCall: "Book a call",
    privacy: "Privacy",
    impressum: "Impressum",
    backHome: "← Back home",
  },
  de: {
    getInTouch: "Kontakt\naufnehmen",
    bravery: "Ein unabhängiger Kunstraum",
    scroll: "Weiter scrollen ↓",
    based: "Kreuzberg\nBerlin",
    newsletterTitle: "Bleib auf dem Laufenden",
    newsletterPlaceholder: "Deine E-Mail",
    subscribe: "Abonnieren",
    bookingIntro:
      "Plane deine Veranstaltung: Zemin Berlin steht für eine Vielzahl kreativer und privater Projekte zur Verfügung. Wähle unten deine Kategorie und teile uns deine Anforderungen mit.",
    bookCall: "Termin buchen",
    privacy: "Datenschutz",
    impressum: "Impressum",
    backHome: "← Zurück",
  },
} as const;
