import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clubio.com.ar"),
  title: "CLUBIO — Tus cuotas se cobran solas",
  description:
    "Sistema de cobros automáticos para gimnasios en Argentina. Cuotas automáticas, avisos por WhatsApp, pago sin cuenta con MercadoPago. Sin setup fee. Alumnos ilimitados.",
  keywords: [
    "gimnasio",
    "gym",
    "cobros automáticos",
    "MercadoPago",
    "Argentina",
    "gestión gym",
  ],
  openGraph: {
    title: "CLUBIO — Tus cuotas se cobran solas",
    description: "Sistema de cobros automáticos para gimnasios en Argentina.",
    url: "https://clubio.com.ar",
    siteName: "CLUBIO",
    locale: "es_AR",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-dark text-white antialiased">{children}</body>
    </html>
  );
}
