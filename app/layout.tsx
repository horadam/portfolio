import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import { Contours } from "@/components/contours";
import { Spotlight } from "@/components/spotlight";
import { profile } from "@/lib/content";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} · ${profile.title}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.pitch,
  openGraph: { type: "website", siteName: profile.name },
};

export const viewport: Viewport = { themeColor: "#0c1611" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans leading-relaxed antialiased">
        <a
          href="#content"
          className="sr-only z-50 rounded-md bg-mint px-4 py-2 font-medium text-page focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Contours />
        <Spotlight />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
