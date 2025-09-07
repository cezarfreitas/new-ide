import { 
  CodeBracketIcon, 
  DevicePhoneMobileIcon, 
  GlobeAltIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  StarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { Service, NavigationItem, Feature, Statistic } from '@/types';

export const navigationItems: NavigationItem[] = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Contato', href: '#contato' }
];

export const services: Service[] = [
  {
    icon: "CodeBracketIcon",
    title: "CRM B2B Estratégico",
    description: "Sistema estruturado para empresas B2B organizarem leads, oportunidades e processos de vendas.",
    features: ["Pipeline de vendas B2B", "Gestão de leads qualificados", "Automação comercial"]
  },
  {
    icon: "DevicePhoneMobileIcon",
    title: "Vendas B2B Digitais",
    description: "Desenvolva processos de vendas digitais estruturados para converter prospects em clientes B2B.",
    features: ["Funil de vendas B2B", "Métricas comerciais", "Prospecção digital"]
  },
  {
    icon: "UserGroupIcon",
    title: "Capacitação Comercial",
    description: "Capacite sua equipe com técnicas de vendas B2B e metodologias comprovadas.",
    features: ["Vendas B2B consultivas", "Negociação avançada", "Performance comercial"]
  }
];

export const features: Feature[] = [
  { icon: "StarIcon", text: "3 Soluções Integradas para B2B" },
  { icon: "ClockIcon", text: "CRM Integrado em 30 Dias" },
  { icon: "UserGroupIcon", text: "Ecossistema Completo B2B" },
  { icon: "ShieldCheckIcon", text: "Implementação + Operação" }
];

export const statistics: Statistic[] = [
  { value: "+50%", label: "Melhoria em Vendas" },
  { value: "3", label: "Soluções Integradas" },
  { value: "90%", label: "Taxa de Satisfação" }
];

export const companyInfo = {
  name: "IDE | Negócios Digitais",
  description: "Especialistas em CRM B2B, vendas digitais, automação comercial e capacitação de equipes. Transformamos empresas B2B em máquinas de vendas eficientes.",
  email: "contato@idenegociosdigitais.com.br",
  phone: "(11) 9 9999-9999",
  address: "R. Gen. Francisco Glicério, 1833 - Sala 4, 1°andar - Centro, Suzano - SP, CEP: 08674-003"
};

export const footerServices = [
  "CRM B2B Estratégico",
  "Vendas B2B Digitais", 
  "Capacitação Comercial",
  "Consultoria Gratuita"
];

export const footerCompanyLinks = [
  "Início",
  "Serviços",
  "Sobre Nós",
  "Clientes",
  "Contato"
];

// New data for clients section
export const clients = [
  { name: "Stance", industry: "Moda & Lifestyle" },
  { name: "Vega Sports", industry: "Esportes" },
  { name: "Mad Rats", industry: "Entretenimento" },
  { name: "Brustec", industry: "Tecnologia" },
  { name: "Grupo Inteli", industry: "Inteligência" },
  { name: "Colégio Ícone", industry: "Educação" },
  { name: "Completa Telecom", industry: "Telecomunicações" },
  { name: "Grupo NTK", industry: "Corporativo" },
  { name: "Movim Seguros", industry: "Seguros" },
  { name: "Loja São Silvestre", industry: "Varejo" },
  { name: "Hurley", industry: "Surf & Lifestyle" },
  { name: "WG", industry: "Corporativo" }
];

// Mission, Vision, Values
export const mission = "Implementar ecossistemas integrados (CRM + Vendas Digitais + Capacitação) que ajudam empresas B2B a crescer de forma sustentável.";

export const vision = "Ser a referência nacional em soluções integradas B2B: CRM + Vendas Digitais + Capacitação para empresas digitais.";

export const values = "Resultados mensuráveis, integração de tecnologias e foco em melhoria contínua da performance comercial.";
