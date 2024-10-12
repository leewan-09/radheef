import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "ރަދީފް - Dhivehi Dictionary",
  description:
    "Explore the Dhivehi language with our comprehensive online dictionary. Find definitions, translations, and usage examples for Dhivehi words and phrases.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
