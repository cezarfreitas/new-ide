'use client';

import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import MeetingModal from '@/components/ui/MeetingModal';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useMetaPixel } from '@/hooks/useMetaPixel';

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trackButtonClick } = useAnalytics();
  const { trackButtonClick: trackMetaButtonClick } = useMetaPixel();
  return (
    <section id="inicio" className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden pt-20">
      {/* Simple gradient overlay for hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/3 via-transparent to-yellow-600/2"></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-20"
        >

          {/* Hero Headline - Clear Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-12"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.88] tracking-tight max-w-7xl mx-auto">
              Transforme seu negócio em uma{' '}
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                máquina de vendas
              </span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl sm:text-2xl lg:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light"
            >
              <span className="text-yellow-400 font-semibold">CRM B2B estratégico</span> + 
              <span className="text-yellow-400 font-semibold"> Vendas Digitais</span> + 
              <span className="text-yellow-400 font-semibold"> Capacitação Comercial</span>
              <br />
              <span className="text-gray-400">para empresas que querem resultados exponenciais</span>
            </motion.p>
          </motion.div>

          {/* Primary CTA - Clear Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center space-y-8"
          >
            <motion.button
              onClick={() => {
                setIsModalOpen(true);
                trackButtonClick('implementar_crm_agora', 'hero_section');
                trackMetaButtonClick('implementar_crm_agora', 'hero_section');
              }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-bold text-xl px-20 py-6 rounded-2xl transition-all duration-300 flex items-center space-x-4 shadow-2xl hover:shadow-yellow-500/40 overflow-hidden cursor-pointer"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10">Implementar CRM B2B Agora</span>
              <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
            </motion.button>
          </motion.div>


        </motion.div>
        
      </div>
      
      {/* Meeting Modal */}
      <MeetingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}