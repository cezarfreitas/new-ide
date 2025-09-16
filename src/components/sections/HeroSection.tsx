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
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/3 via-transparent to-yellow-600/2"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-500/20 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
        
        {/* Animated circles */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-yellow-500/10 rounded-full"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                left: `${10 + i * 30}%`,
                top: `${20 + i * 25}%`,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1,
              }}
            />
          ))}
        </div>
        
        {/* Moving lines */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Horizontal moving lines */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"
              style={{
                width: '100vw',
                top: `${25 + i * 25}%`,
                left: '-100%',
              }}
              animate={{
                x: ['100vw', '-100vw'],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1.5,
              }}
            />
          ))}
          
          {/* Vertical moving lines */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute w-px bg-gradient-to-b from-transparent via-yellow-500/20 to-transparent"
              style={{
                height: '100vh',
                left: `${30 + i * 40}%`,
                top: '-100%',
              }}
              animate={{
                y: ['100vh', '-100vh'],
              }}
              transition={{
                duration: 12 + i * 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 2,
              }}
            />
          ))}
          
          {/* Diagonal moving lines */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`d-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-yellow-500/15 to-transparent"
              style={{
                width: '200px',
                top: `${20 + i * 20}%`,
                left: '-200px',
                transform: `rotate(${15 + i * 15}deg)`,
              }}
              animate={{
                x: ['100vw', '-200px'],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1,
              }}
            />
          ))}
        </div>
      </div>
      
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
              className="group relative bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-bold text-sm sm:text-lg lg:text-xl px-3 sm:px-10 lg:px-14 xl:px-18 py-2 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl lg:rounded-3xl transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 lg:space-x-4 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/50 overflow-hidden cursor-pointer w-auto max-w-xs sm:max-w-sm lg:max-w-md whitespace-nowrap border border-yellow-300/20 hover:border-yellow-200/30"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              {/* Efeito de brilho sutil */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              />
              <span className="relative z-10">Implementar CRM Agora</span>
              <ArrowRightIcon className="w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10 flex-shrink-0" />
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