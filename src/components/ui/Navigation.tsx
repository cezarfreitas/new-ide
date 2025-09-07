'use client';

import { motion } from 'framer-motion';
import { NavigationItem } from '@/types';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import MeetingModal from './MeetingModal';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useMetaPixel } from '@/hooks/useMetaPixel';

interface NavigationProps {
  items: NavigationItem[];
}

export default function Navigation({ items }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trackButtonClick } = useAnalytics();
  const { trackButtonClick: trackMetaButtonClick } = useMetaPixel();

  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-lg z-50 border-b border-yellow-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-lg">IDE</span>
            </div>
            <span className="text-xl font-bold text-white tracking-wide">| Negócios Digitais</span>
          </motion.div>
          
          {/* Desktop Navigation - Centered */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden lg:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2"
          >
            {items.map((item, index) => (
              <motion.a 
                key={index}
                href={item.href} 
                className="text-gray-300 hover:text-yellow-400 transition-all duration-300 font-medium relative group px-3 py-2"
                whileHover={{ y: -2 }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Button - Right aligned */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block"
          >
            <motion.button 
              onClick={() => {
                setIsModalOpen(true);
                trackButtonClick('marcar_reuniao', 'header_desktop');
                trackMetaButtonClick('marcar_reuniao', 'header_desktop');
              }}
              className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-8 py-3 rounded-xl hover:from-yellow-400 hover:to-yellow-300 transition-all duration-300 font-semibold shadow-lg hover:shadow-yellow-500/25 cursor-pointer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Marcar Reunião
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:hidden p-2 text-gray-300 hover:text-yellow-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden bg-black/98 backdrop-blur-lg border-t border-yellow-500/20"
        >
          <div className="px-4 py-6 space-y-4">
            {items.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className="block text-gray-300 hover:text-yellow-400 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.button 
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-6 py-3 rounded-xl font-semibold mt-4 cursor-pointer"
              onClick={() => {
                setIsMenuOpen(false);
                setIsModalOpen(true);
                trackButtonClick('marcar_reuniao', 'header_mobile');
                trackMetaButtonClick('marcar_reuniao', 'header_mobile');
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Marcar Reunião
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Meeting Modal */}
      <MeetingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </nav>
  );
}
