/**
 * Exemplos de uso dos componentes da landing page
 * Este arquivo demonstra como usar cada componente individualmente
 */

import { 
  Navigation, 
  HeroSection, 
  ServicesSection, 
  AboutSection, 
  ContactSection, 
  FooterSection 
} from '@/components';
import { 
  navigationItems, 
  services, 
  features, 
  statistics, 
  companyInfo, 
  footerServices, 
  footerCompanyLinks 
} from '@/utils/data';

// Exemplo de uso individual de cada componente
export function NavigationExample() {
  return <Navigation items={navigationItems} />;
}

export function HeroExample() {
  return <HeroSection />;
}

export function ServicesExample() {
  return <ServicesSection services={services} />;
}

export function AboutExample() {
  return (
    <AboutSection 
      features={features} 
      statistics={statistics} 
    />
  );
}

export function ContactExample() {
  return <ContactSection />;
}

export function FooterExample() {
  return (
    <FooterSection 
      companyInfo={companyInfo}
      services={footerServices}
      companyLinks={footerCompanyLinks}
    />
  );
}

// Exemplo de página completa
export function CompletePageExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation items={navigationItems} />
      <HeroSection />
      <ServicesSection services={services} />
      <AboutSection features={features} statistics={statistics} />
      <ContactSection />
      <FooterSection 
        companyInfo={companyInfo}
        services={footerServices}
        companyLinks={footerCompanyLinks}
      />
    </div>
  );
}
