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

  const handleNavClick = (href: string) => {
    console.log('Navigating to:', href);
    setIsMenuOpen(false);
    
    // Wait for menu animation to complete, then scroll
    setTimeout(() => {
      const element = document.querySelector(href);
      console.log('Element found:', element);
      
      if (element) {
        // Get the header height to offset the scroll
        const headerHeight = 80;
        const elementPosition = (element as HTMLElement).offsetTop - headerHeight;
        console.log('Scrolling to position:', elementPosition);
        
        // Use requestAnimationFrame for better performance
        requestAnimationFrame(() => {
          window.scrollTo({
            top: Math.max(0, elementPosition),
            behavior: 'smooth'
          });
        });
      } else {
        // Fallback: try to find element by ID without #
        const id = href.replace('#', '');
        const fallbackElement = document.getElementById(id);
        console.log('Fallback element found:', fallbackElement);
        
        if (fallbackElement) {
          const headerHeight = 80;
          const elementPosition = fallbackElement.offsetTop - headerHeight;
          
          requestAnimationFrame(() => {
            window.scrollTo({
              top: Math.max(0, elementPosition),
              behavior: 'smooth'
            });
          });
        } else {
          console.error('Element not found:', href);
        }
      }
    }, 300); // Increased timeout for mobile
  };

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
              <motion.button 
                key={index}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-300 hover:text-yellow-400 transition-all duration-300 font-medium relative group px-3 py-2 cursor-pointer"
                whileHover={{ y: -2 }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
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
            className="lg:hidden p-3 text-gray-300 hover:text-yellow-400 transition-all duration-300 rounded-lg hover:bg-yellow-500/10 border border-transparent hover:border-yellow-500/20 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="lg:hidden overflow-hidden bg-black/98 backdrop-blur-lg border-t border-yellow-500/20 shadow-2xl"
        >
          <div className="px-6 py-8 space-y-1">
            {items.map((item, index) => (
              <motion.button
                key={index}
                onClick={() => handleNavClick(item.href)}
                className="block text-gray-200 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all duration-300 font-medium py-4 px-4 text-left w-full rounded-lg border border-transparent hover:border-yellow-500/20 group cursor-pointer"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-between">
                  {item.label}
                  <motion.span 
                    className="text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            ))}
            
            <motion.div 
              className="pt-4 border-t border-yellow-500/20 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <motion.button 
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-yellow-500/25 cursor-pointer flex items-center justify-center space-x-2"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsModalOpen(true);
                  trackButtonClick('marcar_reuniao', 'header_mobile');
                  trackMetaButtonClick('marcar_reuniao', 'header_mobile');
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Marcar Reunião</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  🚀
                </motion.span>
              </motion.button>
            </motion.div>
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
