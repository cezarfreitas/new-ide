import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ParticleBackground from "@/components/ui/ParticleBackground";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import MetaPixel from "@/components/analytics/MetaPixel";
import StructuredData from "@/components/seo/StructuredData";
import { env } from "@/lib/env";

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
    default: "IDE Negócios Digitais - CRM B2B Estratégico, Vendas Digitais e Capacitação Comercial | Suzano SP",
    template: "%s | IDE Negócios Digitais"
  },
  description: "Especialistas em CRM B2B estratégico, vendas digitais e capacitação comercial. Transformamos empresas B2B em máquinas de vendas eficientes com +50% de melhoria em vendas. Localizados em Suzano - SP.",
  keywords: [
    "CRM B2B estratégico",
    "vendas digitais B2B",
    "capacitação comercial",
    "automação comercial",
    "pipeline de vendas B2B",
    "leads qualificados",
    "melhoria em vendas",
    "consultoria CRM B2B",
    "implementação CRM",
    "vendas B2B consultivas",
    "negócios digitais",
    "marketing digital B2B",
    "funil de vendas B2B",
    "métricas comerciais",
    "prospecção digital",
    "negociação avançada",
    "performance comercial",
    "Suzano SP",
    "Grande São Paulo",
    "consultoria empresarial"
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
    title: "IDE Negócios Digitais - CRM B2B Estratégico, Vendas Digitais e Capacitação Comercial | Suzano SP",
    description: "Especialistas em CRM B2B estratégico, vendas digitais e capacitação comercial. Transformamos empresas B2B em máquinas de vendas eficientes com +50% de melhoria em vendas. Localizados em Suzano - SP.",
    url: 'https://idenegociosdigitais.com.br',
    siteName: 'IDE Negócios Digitais',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'IDE Negócios Digitais - CRM B2B Estratégico, Vendas Digitais e Capacitação Comercial | Suzano SP',
        type: 'image/jpeg',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
    countryName: 'Brazil',
  },
  twitter: {
    card: 'summary_large_image',
    title: "IDE Negócios Digitais - CRM B2B Estratégico, Vendas Digitais e Capacitação Comercial | Suzano SP",
    description: "Especialistas em CRM B2B estratégico, vendas digitais e capacitação comercial. Transformamos empresas B2B em máquinas de vendas eficientes com +50% de melhoria em vendas.",
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
    google: 'G-G1YXN755WQ', // Google verification hardcoded
    ...(env.YANDEX_VERIFICATION && { yandex: env.YANDEX_VERIFICATION }),
    ...(env.YAHOO_VERIFICATION && { yahoo: env.YAHOO_VERIFICATION }),
    other: {
      ...(env.FACEBOOK_VERIFICATION && { 'facebook-domain-verification': env.FACEBOOK_VERIFICATION }),
      ...(env.PINTEREST_VERIFICATION && { 'pinterest-site-verification': env.PINTEREST_VERIFICATION }),
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
  const gaMeasurementId = 'G-G1YXN755WQ'; // GA4 ID hardcoded
  const metaPixelId = '703558478389535'; // Meta Pixel ID hardcoded

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
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
