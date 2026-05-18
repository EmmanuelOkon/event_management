import React from "react";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/providers";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const appUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";

const meta = {
  title: "Evoria | Event Management Platform",
  description: "Discover, create, and manage events with Evoria.",
  robots: "follow, index",
  url: appUrl,
  keywords: [
    "Evoria",
    "event management",
    "events",
    "event planning",
    "event tickets",
    "conference management",
    "workshops",
    "meetups",
    "concerts",
  ],
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  applicationName: "Evoria",
  keywords: meta.keywords,
  robots: meta.robots,
  metadataBase: new URL(meta.url),
  openGraph: {
    url: meta.url,
    title: meta.title,
    description: meta.description,
    type: "website",
    siteName: "Evoria",
  },
  icons: {
    icon: [
      {
        url: "/favicon/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            suppressHydrationWarning={true}
            className={`${poppins.className} ${poppins.variable}`}
          >
            <Providers>{children}</Providers>
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
