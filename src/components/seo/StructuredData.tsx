'use client';

interface StructuredDataProps {
  type?: 'organization' | 'website' | 'service' | 'contact';
}

export default function StructuredData({ type = 'organization' }: StructuredDataProps) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "IDE Negócios Digitais",
    "alternateName": "IDE",
    "url": "https://idenegociosdigitais.com.br",
    "logo": "https://idenegociosdigitais.com.br/logo.png",
    "description": "Especialistas em CRM B2B, vendas digitais e capacitação comercial para empresas que querem resultados exponenciais.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "R. Gen. Francisco Glicério, 1833 - Sala 4 1°andar",
      "addressLocality": "Suzano",
      "addressRegion": "SP",
      "postalCode": "08674-003",
      "addressCountry": "BR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-11-99999-9999",
      "contactType": "customer service",
      "email": "contato@idenegociosdigitais.com.br",
      "availableLanguage": "Portuguese"
    },
    "sameAs": [
      "https://www.linkedin.com/company/ide-negocios-digitais",
      "https://www.instagram.com/idenegociosdigitais",
      "https://www.facebook.com/idenegociosdigitais"
    ],
    "service": [
      {
        "@type": "Service",
        "name": "CRM B2B Estratégico",
        "description": "Sistema estruturado para empresas B2B organizarem leads, oportunidades e processos de vendas",
        "provider": {
          "@type": "Organization",
          "name": "IDE Negócios Digitais"
        }
      },
      {
        "@type": "Service",
        "name": "Vendas B2B Digitais",
        "description": "Desenvolva processos de vendas digitais estruturados para converter prospects em clientes B2B",
        "provider": {
          "@type": "Organization",
          "name": "IDE Negócios Digitais"
        }
      },
      {
        "@type": "Service",
        "name": "Capacitação Comercial",
        "description": "Capacite sua equipe com técnicas de vendas B2B e metodologias comprovadas",
        "provider": {
          "@type": "Organization",
          "name": "IDE Negócios Digitais"
        }
      }
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "IDE Negócios Digitais",
    "url": "https://idenegociosdigitais.com.br",
    "description": "Transforme seu negócio em uma máquina de vendas com CRM B2B estratégico, vendas digitais otimizadas e capacitação comercial.",
    "publisher": {
      "@type": "Organization",
      "name": "IDE Negócios Digitais"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://idenegociosdigitais.com.br/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Consultoria CRM B2B",
    "description": "Implementação de CRM B2B estratégico com vendas digitais e capacitação comercial",
    "provider": {
      "@type": "Organization",
      "name": "IDE Negócios Digitais"
    },
    "areaServed": "Brazil",
    "serviceType": "Business Consulting",
    "offers": {
      "@type": "Offer",
      "description": "Implementação em 30 dias com ROI garantido +50%",
      "price": "0",
      "priceCurrency": "BRL",
      "availability": "https://schema.org/InStock"
    }
  };

  const contactData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contato - IDE Negócios Digitais",
    "description": "Entre em contato para implementar CRM B2B em seu negócio",
    "mainEntity": {
      "@type": "Organization",
      "name": "IDE Negócios Digitais",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+55-11-99999-9999",
        "contactType": "customer service",
        "email": "contato@idenegociosdigitais.com.br"
      }
    }
  };

  const getData = () => {
    switch (type) {
      case 'website':
        return websiteData;
      case 'service':
        return serviceData;
      case 'contact':
        return contactData;
      default:
        return organizationData;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getData()),
      }}
    />
  );
}
