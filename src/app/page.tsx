import Navigation from '@/components/ui/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import ClientsSection from '@/components/sections/ClientsSection';
import ContactSection from '@/components/sections/ContactSection';
import FooterSection from '@/components/sections/FooterSection';
import { 
  navigationItems, 
  services, 
  features, 
  statistics, 
  clients,
  companyInfo, 
  footerServices, 
  footerCompanyLinks 
} from '@/utils/data';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation items={navigationItems} />
      <HeroSection />
      
      <ServicesSection services={services} />
      <AboutSection features={features} statistics={statistics} />
      <ClientsSection clients={clients} />
      <ContactSection />
      
      <FooterSection 
        companyInfo={companyInfo}
        services={footerServices}
        companyLinks={footerCompanyLinks}
      />
      
    </div>
  );
}