import type { Metadata, Viewport } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MiniPlayer from "@/components/MiniPlayer";
import { PlayerProvider } from "@/components/PlayerProvider";
import { SITE } from "@/lib/config";

const display = Orbitron({ subsets: ["latin"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website"
  },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: "#05030a",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body className="font-body bg-deep text-white antialiased min-h-screen bg-anime-gradient">
        <PlayerProvider>
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
          <MiniPlayer />
        </PlayerProvider>
      </body>
    </html>
  );
}
