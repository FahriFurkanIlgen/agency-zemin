import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Spline_Sans_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { ContentProvider } from "@/components/ContentProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { Intro } from "@/components/Intro";
import { CookieNotice } from "@/components/CookieNotice";
import { getContent } from "@/lib/store";
import { SITE } from "@/lib/site";
import type { EventItem, SiteContent } from "@/lib/content";

// GT Pressura (mono grotesque, all-caps display) → Spline Sans Mono
const splineMono = Spline_Sans_Mono({
  variable: "--font-pressura",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Monument Grotesk (clean grotesque sans) → Space Grotesk
const spaceGrotesk = Space_Grotesk({
  variable: "--font-monument",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: "%s | ZEMIN BERLIN",
  },
  description:
    "Zemin Art Space: An independent production site in Kreuzberg, dedicated to hosting and supporting interdisciplinary artistic practices.",
  applicationName: "ZEMIN BERLIN",
  keywords: [
    "Zemin Berlin",
    "Zemin Art Space",
    "Berlin art space",
    "Kreuzberg art space",
    "independent production site Berlin",
    "interdisciplinary art Berlin",
    "event space Kreuzberg",
    "artistic practices Berlin",
    "open calls Berlin",
  ],
  authors: [{ name: "ZEMIN BERLIN", url: SITE.url }],
  creator: "ZEMIN BERLIN",
  publisher: "ZEMIN BERLIN",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      de: "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: SITE.title,
    description:
      "An independent production site in Kreuzberg, dedicated to hosting and supporting interdisciplinary artistic practices.",
    url: SITE.url,
    siteName: "ZEMIN BERLIN",
    locale: "en_US",
    alternateLocale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description:
      "An independent production site in Kreuzberg, dedicated to hosting and supporting interdisciplinary artistic practices.",
  },
  category: "arts and culture",
};

const organizationStructuredData = {
  "@type": ["ArtGallery", "EventVenue", "LocalBusiness"],
  "@id": `${SITE.url}/#venue`,
  name: "ZEMIN BERLIN",
  alternateName: "Zemin Art Space",
  url: SITE.url,
  description:
    "An independent production site in Kreuzberg, dedicated to hosting and supporting interdisciplinary artistic practices.",
  email: SITE.email,
  telephone: SITE.phone,
  sameAs: [SITE.instagram, SITE.linktree],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Urbanstr. 3",
    postalCode: "10961",
    addressLocality: "Berlin",
    addressRegion: "Berlin",
    addressCountry: "DE",
  },
  areaServed: {
    "@type": "City",
    name: "Berlin",
  },
  keywords: [
    "art space",
    "Kreuzberg",
    "Berlin",
    "interdisciplinary art",
    "open calls",
    "event venue",
  ],
};

function eventDateToIsoDate(date: string) {
  const [day, month] = date.split(".");
  return `2026-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function eventDescription(event: EventItem) {
  return `${event.title.en} at ZEMIN BERLIN, an independent art space and production site in Kreuzberg.`;
}

function eventStructuredData(events: SiteContent["program"]["events"]) {
  return events.map((event) => ({
    "@type": "Event",
    "@id": `${SITE.url}/#event-${event.id}`,
    name: event.title.en,
    description: eventDescription(event),
    startDate: eventDateToIsoDate(event.date),
    endDate: eventDateToIsoDate(event.date),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: `${SITE.url}/#event-${event.id}`,
    organizer: {
      "@id": `${SITE.url}/#venue`,
      name: "ZEMIN BERLIN",
      url: SITE.url,
    },
    location: {
      "@type": "Place",
      "@id": `${SITE.url}/#venue`,
      name: "ZEMIN BERLIN",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Urbanstr. 3",
        postalCode: "10961",
        addressLocality: "Berlin",
        addressRegion: "Berlin",
        addressCountry: "DE",
      },
    },
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/#event-${event.id}`,
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "EUR",
    },
    performer: {
      "@type": "PerformingGroup",
      name: event.title.en,
    },
    keywords: [event.category.en, "ZEMIN BERLIN", "Kreuzberg", "Berlin art event"],
  }));
}

function themeStyle(foreground: string): CSSProperties {
  return {
    "--foreground": foreground,
    "--valiente-red": foreground,
    "--card-foreground": foreground,
    "--popover-foreground": foreground,
    "--primary": foreground,
    "--secondary-foreground": foreground,
    "--muted-foreground": foreground,
    "--accent": foreground,
    "--ring": foreground,
    "--border": `color-mix(in oklab, ${foreground} 25%, transparent)`,
    "--input": `color-mix(in oklab, ${foreground} 25%, transparent)`,
  } as CSSProperties;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [organizationStructuredData, ...eventStructuredData(content.program.events)],
  };
  const foreground = content.theme?.foreground || "#ff1a00";

  return (
    <html
      lang="en"
      className={`${splineMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        style={themeStyle(foreground)}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ContentProvider content={content}>
          <LanguageProvider>
            <Intro />
            <CustomCursor />
            {children}
            <CookieNotice />
          </LanguageProvider>
        </ContentProvider>
      </body>
    </html>
  );
}
