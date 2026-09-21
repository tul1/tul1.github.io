import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { JsonLdPerson } from "@/components/JsonLdPerson";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { profile } from "@/content/profile";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — blog`,
    template: `%s · ${profile.name}`,
  },
  description: profile.tagline,
  metadataBase: new URL(profile.social.website),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  keywords: [
    profile.name,
    "blog",
    "software",
    "distributed systems",
    "infrastructure",
    "technology",
  ],
  authors: [{ name: profile.fullName, url: profile.social.website }],
  creator: profile.fullName,
  openGraph: {
    title: `${profile.name} — blog`,
    description: profile.tagline,
    url: profile.social.website,
    siteName: profile.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: profile.headshot,
        width: 800,
        height: 800,
        alt: `${profile.name}`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${profile.name} — blog`,
    description: profile.tagline,
    images: [profile.headshot],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink font-sans">
        <JsonLdPerson />
        <SiteNav />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
