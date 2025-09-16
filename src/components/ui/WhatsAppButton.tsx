'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from './Tooltip';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  showOnScroll?: boolean;
  scrollThreshold?: number;
  showDiagnosticBalloon?: boolean;
  diagnosticScrollThreshold?: number;
  diagnosticDelay?: number;
}

export default function WhatsAppButton({
  phoneNumber = '+5511989882867',
  message = 'Olá! Gostaria de saber mais sobre os serviços da IDE Negócios Digitais.',
  position = 'bottom-right',
  showOnScroll = true,
  scrollThreshold = 300,
  showDiagnosticBalloon = true,
  diagnosticScrollThreshold = 800,
  diagnosticDelay = 2000
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(!showOnScroll);
  const [isHovered, setIsHovered] = useState(false);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const [hasShownDiagnostic, setHasShownDiagnostic] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!showOnScroll) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showOnScroll, scrollThreshold]);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Effect para o balão de diagnóstico
  useEffect(() => {
    if (!showDiagnosticBalloon || hasShownDiagnostic) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > diagnosticScrollThreshold && !hasShownDiagnostic) {
        setTimeout(() => {
          setShowDiagnostic(true);
          setHasShownDiagnostic(true);
        }, diagnosticDelay);
      }
    };

    // Verificar scroll inicial
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > diagnosticScrollThreshold && !hasShownDiagnostic) {
      setTimeout(() => {
        setShowDiagnostic(true);
        setHasShownDiagnostic(true);
      }, diagnosticDelay);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showDiagnosticBalloon, diagnosticScrollThreshold, diagnosticDelay, hasShownDiagnostic]);

  const formatPhoneNumber = (phone: string) => {
    // Remove todos os caracteres não numéricos
    return phone.replace(/\D/g, '');
  };

  const generateWhatsAppURL = () => {
    const formattedPhone = formatPhoneNumber(phoneNumber);
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  const handleClick = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'floating_button',
        value: 1
      });
    }

    // Meta Pixel tracking
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Contact', {
        content_name: 'WhatsApp Button',
        content_category: 'engagement'
      });
    }
  };

  const handleDiagnosticAccept = () => {
    setShowDiagnostic(false);
    
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'diagnostic_balloon_accept', {
        event_category: 'engagement',
        event_label: 'whatsapp_balloon',
        value: 1
      });
    }

    // Meta Pixel tracking
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Diagnóstico Estratégico - WhatsApp Balloon',
        content_category: 'engagement'
      });
    }

    // Scroll para a seção de contato
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDiagnosticClose = () => {
    setShowDiagnostic(false);
    
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'diagnostic_balloon_close', {
        event_category: 'engagement',
        event_label: 'whatsapp_balloon',
        value: 1
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`fixed ${positionClasses[position]} z-50`}
        >
          {/* Tooltip de Diagnóstico - aparece automaticamente */}
          {showDiagnostic && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-16 right-0 bg-white text-gray-900 text-xs px-3 py-2 rounded-lg shadow-lg border border-gray-200 max-w-xs z-50"
            >
              {/* Botão de fechar - posicionado absolutamente no canto superior direito */}
              <button
                onClick={handleDiagnosticClose}
                className="absolute top-1 right-1 text-black hover:text-gray-600 text-xs transition-colors"
              >
                ✕
              </button>
              
              Que tal fazer um diagnóstico estratégico agora?
              <div className="absolute top-full right-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
            </motion.div>
          )}


          {/* WhatsApp Button */}
          <motion.a
            href={generateWhatsAppURL()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              y: [0, -5, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`group relative flex items-center justify-center ${isMobile ? 'w-10 h-10' : 'w-12 h-12'} bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
            aria-label="WhatsApp"
          >
            {/* WhatsApp Icon */}
            <svg
              className={`${isMobile ? 'w-6 h-6' : 'w-7 h-7'} text-white`}
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>


          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
