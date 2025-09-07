import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ParticleBackground from "@/components/ui/ParticleBackground";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import MetaPixel from "@/components/analytics/MetaPixel";
import StructuredData from "@/components/seo/StructuredData";

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
    default: "IDE Negócios Digitais - CRM B2B, Vendas Digitais e Capacitação Comercial",
    template: "%s | IDE Negócios Digitais"
  },
  description: "Transforme seu negócio em uma máquina de vendas com CRM B2B estratégico, vendas digitais otimizadas e capacitação comercial. Implementação em 30 dias com ROI garantido +50%.",
  keywords: [
    "CRM B2B",
    "vendas digitais",
    "capacitação comercial",
    "automação comercial",
    "pipeline de vendas",
    "leads qualificados",
    "ROI vendas",
    "consultoria CRM",
    "implementação CRM",
    "vendas B2B",
    "negócios digitais",
    "marketing digital B2B"
  ],
  authors: [{ name: "IDE Negócios Digitais", url: "https://idenegociosdigitais.com.br" }],
  creator: "IDE Negócios Digitais",
  publisher: "IDE Negócios Digitais",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://idenegociosdigitais.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "IDE Negócios Digitais - CRM B2B, Vendas Digitais e Capacitação Comercial",
    description: "Transforme seu negócio em uma máquina de vendas com CRM B2B estratégico, vendas digitais otimizadas e capacitação comercial. Implementação em 30 dias com ROI garantido +50%.",
    url: 'https://idenegociosdigitais.com.br',
    siteName: 'IDE Negócios Digitais',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'IDE Negócios Digitais - CRM B2B, Vendas Digitais e Capacitação Comercial',
        type: 'image/jpeg',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
    countryName: 'Brazil',
  },
  twitter: {
    card: 'summary_large_image',
    title: "IDE Negócios Digitais - CRM B2B, Vendas Digitais e Capacitação Comercial",
    description: "Transforme seu negócio em uma máquina de vendas com CRM B2B estratégico, vendas digitais otimizadas e capacitação comercial.",
    images: ['/og-image.jpg'],
    creator: '@idenegociosdigitais',
    site: '@idenegociosdigitais',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
    other: {
      'facebook-domain-verification': process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION,
      'pinterest-site-verification': process.env.NEXT_PUBLIC_PINTEREST_VERIFICATION,
    },
  },
  category: 'Business',
  classification: 'Business Services',
  other: {
    'application-name': 'IDE Negócios Digitais',
    'apple-mobile-web-app-title': 'IDE Negócios Digitais',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#fbbf24',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#fbbf24',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {gaMeasurementId && <GoogleAnalytics measurementId={gaMeasurementId} />}
        {metaPixelId && <MetaPixel pixelId={metaPixelId} />}
        <StructuredData type="organization" />
        <StructuredData type="website" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ParticleBackground />
        {children}
      </body>
    </html>
  );
}
