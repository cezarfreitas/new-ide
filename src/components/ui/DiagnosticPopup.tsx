'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ChartBarIcon, LightBulbIcon } from '@heroicons/react/24/outline';

interface DiagnosticPopupProps {
  showOnScroll?: boolean;
  scrollThreshold?: number;
  delay?: number;
  onClose?: () => void;
  onAccept?: () => void;
}

export default function DiagnosticPopup({
  showOnScroll = true,
  scrollThreshold = 800,
  delay = 2000,
  onClose,
  onAccept
}: DiagnosticPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (!showOnScroll || hasShown) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > scrollThreshold && !hasShown) {
        // Delay antes de mostrar
        setTimeout(() => {
          setIsVisible(true);
          setHasShown(true);
        }, delay);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showOnScroll, scrollThreshold, delay, hasShown]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
    
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'diagnostic_popup_close', {
        event_category: 'engagement',
        event_label: 'popup_dismissed',
        value: 1
      });
    }
  };

  const handleAccept = () => {
    setIsVisible(false);
    onAccept?.();
    
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'diagnostic_popup_accept', {
        event_category: 'engagement',
        event_label: 'popup_accepted',
        value: 1
      });
    }

    // Meta Pixel tracking
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Diagnóstico Estratégico',
        content_category: 'engagement'
      });
    }

    // Scroll para a seção de contato
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full mx-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="p-4 pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <LightBulbIcon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-black font-bold text-lg">💡 Ideia Estratégica!</h3>
                      <p className="text-gray-700 text-sm">Que tal fazer um diagnóstico estratégico agora?</p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                    aria-label="Fechar"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-4 pb-4">

                <div className="space-y-3">
                  
                  <button
                    onClick={handleClose}
                    className="w-full text-gray-500 hover:text-gray-700 transition-colors text-sm py-2"
                  >
                    Talvez mais tarde
                  </button>
                </div>

                {/* Benefits */}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <span>✅</span>
                      <span>Gratuito</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>⚡</span>
                      <span>5 minutos</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>📊</span>
                      <span>Relatório</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>🎯</span>
                      <span>Personalizado</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pulse animation */}
              <motion.div
                className="absolute inset-0 bg-gray-100 rounded-2xl"
                animate={{ 
                  scale: [1, 1.01, 1], 
                  opacity: [0.1, 0.05, 0.1] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                style={{ zIndex: -1 }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
