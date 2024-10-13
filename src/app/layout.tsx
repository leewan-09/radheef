import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata, type Viewport } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "ރަދީފް - Dhivehi Dictionary",
  description:
    "Explore the Dhivehi language with our comprehensive online dictionary. Find definitions, translations, and usage examples for Dhivehi words and phrases.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-muted">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
