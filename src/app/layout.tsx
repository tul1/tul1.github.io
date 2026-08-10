import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { JsonLdPerson } from "@/components/JsonLdPerson";
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
    default: `${profile.name} — ${profile.title}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.summary,
  metadataBase: new URL(profile.social.website),
  alternates: {
    canonical: "/",
  },
  keywords: [
    profile.name,
    profile.fullName,
    profile.title,
    "Go",
    "distributed systems",
    "Kubernetes",
    "OVHcloud",
    "Brest",
    "software engineer",
  ],
  authors: [{ name: profile.fullName, url: profile.social.website }],
  creator: profile.fullName,
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
    url: profile.social.website,
    siteName: profile.name,
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: profile.headshot,
        width: 800,
        height: 800,
        alt: `${profile.name} headshot`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${profile.name} — ${profile.title}`,
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
      <body className="min-h-full bg-paper text-ink font-sans">
        <JsonLdPerson />
        {children}
      </body>
    </html>
  );
}
