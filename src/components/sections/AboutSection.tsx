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

export default function AboutSection({ features }: AboutSectionProps) {
  return (
    <section id="sobre" className="py-16 px-4 sm:px-6 lg:px-8 bg-black relative">
      {/* Standard gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/3 via-transparent to-yellow-600/2"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Sobre Nós
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              IDE | Negócios Digitais
            </h3>
            <p className="text-lg md:text-xl text-yellow-200 max-w-4xl mx-auto leading-relaxed">
              Especialistas em CRM B2B, Vendas Digitais e Capacitação Comercial para empresas B2B que buscam crescimento sustentável
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex items-center space-x-4 bg-black/50 rounded-xl p-6 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:bg-black/70"
              >
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  {(() => {
                    const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                    return IconComponent ? <IconComponent className="w-6 h-6 text-yellow-500" /> : null;
                  })()}
                </div>
                <span className="text-yellow-200 text-left font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission, Vision, Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="text-center p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-xl border border-yellow-500/20">
              <h4 className="text-xl font-bold text-yellow-500 mb-4">Nossa Missão</h4>
              <p className="text-yellow-200 text-sm leading-relaxed">
                Implementar ecossistemas integrados (CRM + Vendas Digitais + Capacitação) que ajudam empresas B2B a crescer de forma sustentável.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-xl border border-yellow-500/20">
              <h4 className="text-xl font-bold text-yellow-500 mb-4">Nossa Visão</h4>
              <p className="text-yellow-200 text-sm leading-relaxed">
                Ser a referência nacional em soluções integradas B2B: CRM + Vendas Digitais + Capacitação para empresas digitais.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-xl border border-yellow-500/20">
              <h4 className="text-xl font-bold text-yellow-500 mb-4">Nossos Valores</h4>
              <p className="text-yellow-200 text-sm leading-relaxed">
                Resultados mensuráveis, integração de tecnologias e foco em melhoria contínua da performance comercial.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
