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
  title: {
    default: "CLUBIO — Tus cuotas se cobran solas",
    template: "%s | CLUBIO",
  },
  description:
    "Sistema de cobros automáticos para gimnasios en Argentina. Cuotas automáticas, avisos por WhatsApp y email, pago sin cuenta con MercadoPago. Sin setup fee. Alumnos ilimitados.",

  keywords: [
    "software para gimnasios",
    "sistema de gestión de gym",
    "cobros automáticos gimnasio",
    "administración gimnasio argentina",
    "control de cuotas gimnasio",
    "sistema gym Resistencia",
    "sistema gym Chaco",
    "software gym interior argentina",
    "MercadoPago gimnasio",
    "cobro cuotas automático",
    "gestión alumnos gimnasio",
    "CLUBIO",
  ],

  authors: [{ name: "CLUBIO", url: "https://clubio.com.ar" }],
  creator: "CLUBIO",
  publisher: "CLUBIO",

  metadataBase: new URL("https://clubio.com.ar"),
  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://clubio.com.ar",
    siteName: "CLUBIO",
    title: "CLUBIO — Tus cuotas se cobran solas",
    description:
      "Sistema de cobros automáticos para gimnasios en Argentina. Cuotas automáticas, avisos por WhatsApp, pago sin cuenta con MercadoPago.",
  },

  twitter: {
    card: "summary_large_image",
    title: "CLUBIO — Tus cuotas se cobran solas",
    description: "Sistema de cobros automáticos para gimnasios en Argentina.",
  },

  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },

  verification: {
    google: "qZoYdyrKYsKTNtk4qkvpbR1gRqtrnsj_Ng1PD",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CLUBIO",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://clubio.com.ar",
  description:
    "Sistema de cobros automáticos para gimnasios en Argentina. Cuotas automáticas, avisos por WhatsApp, pago con MercadoPago sin cuenta.",
  offers: [
    {
      "@type": "Offer",
      name: "Plan Basic",
      price: "28",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "28",
        priceCurrency: "USD",
        unitText: "MONTH",
      },
    },
    {
      "@type": "Offer",
      name: "Plan Plus",
      price: "45",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "45",
        priceCurrency: "USD",
        unitText: "MONTH",
      },
    },
    {
      "@type": "Offer",
      name: "Plan Multi",
      price: "75",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "75",
        priceCurrency: "USD",
        unitText: "MONTH",
      },
    },
  ],
  provider: {
    "@type": "Organization",
    name: "CLUBIO",
    url: "https://clubio.com.ar",
    email: "contacto@clubio.com.ar",
    areaServed: "AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-dark text-white antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
        />
      </body>
    </html>
  );
}
