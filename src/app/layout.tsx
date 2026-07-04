import type { Metadata } from "next";
import { Spline_Sans_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { ContentProvider } from "@/components/ContentProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { Intro } from "@/components/Intro";
import { CookieNotice } from "@/components/CookieNotice";
import { getContent } from "@/lib/store";

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
  title: "ZEMIN BERLIN — Art Space",
  description:
    "Zemin Art Space: An independent production site in Kreuzberg, dedicated to hosting and supporting interdisciplinary artistic practices.",
  openGraph: {
    title: "ZEMIN BERLIN — Art Space",
    description:
      "An independent production site in Kreuzberg, dedicated to hosting and supporting interdisciplinary artistic practices.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();
  return (
    <html
      lang="en"
      className={`${splineMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
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
