'use client';

import { motion } from 'framer-motion';
import { 
  CheckCircleIcon,
  CodeBracketIcon, 
  DevicePhoneMobileIcon, 
  GlobeAltIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { Service } from '@/types';

interface ServicesSectionProps {
  services: Service[];
}

// Icon mapping for string identifiers to React components
const iconMap = {
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  UserGroupIcon
} as const;

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="servicos" className="py-16 px-4 sm:px-6 lg:px-8 bg-black relative">
      {/* Standard gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/3 via-transparent to-yellow-600/2"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nossas Soluções
          </h2>
          <p className="text-xl text-yellow-200 max-w-3xl mx-auto">
            Soluções que otimizam negócios
          </p>
          <p className="text-lg text-yellow-300 max-w-4xl mx-auto mt-4">
            Consultoria, implementação e operação em CRM B2B, Vendas Digitais e Capacitação Comercial
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-black p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-yellow-500/30 hover:border-yellow-500"
            >
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-6">
                {(() => {
                  const IconComponent = iconMap[service.icon as keyof typeof iconMap];
                  return IconComponent ? <IconComponent className="w-6 h-6 text-yellow-500" /> : null;
                })()}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
              <p className="text-yellow-200 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-yellow-300">
                    <CheckCircleIcon className="w-4 h-4 text-yellow-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
