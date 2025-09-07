import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'IDE Negócios Digitais - CRM B2B, Vendas Digitais e Capacitação Comercial',
    short_name: 'IDE Negócios',
    description: 'Transforme seu negócio em uma máquina de vendas com CRM B2B estratégico, vendas digitais otimizadas e capacitação comercial.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#fbbf24',
    orientation: 'portrait-primary',
    categories: ['business', 'productivity', 'utilities'],
    lang: 'pt-BR',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    screenshots: [
      {
        src: '/screenshot-desktop.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'IDE Negócios Digitais - Desktop'
      },
      {
        src: '/screenshot-mobile.png',
        sizes: '390x844',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'IDE Negócios Digitais - Mobile'
      }
    ]
  }
}
