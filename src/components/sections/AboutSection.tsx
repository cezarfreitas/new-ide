'use client';

import { motion } from 'framer-motion';
import { 
  StarIcon,
  UserGroupIcon,
  ClockIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { Feature, Statistic } from '@/types';

interface AboutSectionProps {
  features: Feature[];
  statistics: Statistic[];
}

// Icon mapping for string identifiers to React components
const iconMap = {
  StarIcon,
  UserGroupIcon,
  ClockIcon,
  ShieldCheckIcon
} as const;

export default function AboutSection({ features, statistics }: AboutSectionProps) {
  return (
    <section id="sobre" className="py-16 px-4 sm:px-6 lg:px-8 bg-black relative">
      {/* Standard gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/3 via-transparent to-yellow-600/2"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Sobre Nós
            </h2>
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">
              IDE | Negócios Digitais
            </h3>
            <p className="text-lg text-yellow-200 mb-8">
              Especialistas em CRM B2B, Vendas Digitais e Capacitação Comercial para empresas B2B que buscam crescimento sustentável
            </p>
            
            <div className="space-y-6">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    {(() => {
                      const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                      return IconComponent ? <IconComponent className="w-5 h-5 text-yellow-500" /> : null;
                    })()}
                  </div>
                  <span className="text-yellow-200">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-8 text-black"
          >
            <h3 className="text-2xl font-bold mb-6">Nossos Números</h3>
            <div className="grid grid-cols-2 gap-6">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-gray-800">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
