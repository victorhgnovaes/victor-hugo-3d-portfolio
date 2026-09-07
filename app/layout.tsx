import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Victor Hugo | Software Developer",
  description:
    "Portfólio de Victor Hugo — Software Developer, Full Stack e Agentic AI Development.",
  openGraph: {
    title: "Victor Hugo | Software Developer",
    description: "Software Developer · Full Stack · Agentic AI · Experiências Digitais",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Victor Hugo | Software Developer",
    description: "Software Developer · Full Stack · Agentic AI · Experiências Digitais",
  },
  icons: {
    icon: [{ url: "/victor-hugo-brand.png", type: "image/png" }],
    shortcut: "/victor-hugo-brand.png",
    apple: "/victor-hugo-brand.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
