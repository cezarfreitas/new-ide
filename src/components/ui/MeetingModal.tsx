'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useMetaPixel } from '@/hooks/useMetaPixel';

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MeetingModal({ isOpen, onClose }: MeetingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { trackFormSubmission, trackButtonClick } = useAnalytics();
  const { trackLead, trackContact, trackFormSubmission: trackMetaFormSubmission } = useMetaPixel();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // URL do webhook - você pode configurar esta URL
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL || 'https://hooks.zapier.com/hooks/catch/your-webhook-url';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'IDE Negócios Digitais - Formulário de Contato'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Track successful form submission
        trackFormSubmission('contact_form', true);
        trackMetaFormSubmission('contact_form', true);
        // Track lead and contact events
        trackLead();
        trackContact();
        // Limpa o formulário após sucesso
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        });
        // Fecha o modal após 2 segundos
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        throw new Error('Erro ao enviar formulário');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus('error');
      // Track failed form submission
      trackFormSubmission('contact_form', false);
      trackMetaFormSubmission('contact_form', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 min-h-screen"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh'
          }}
          onClick={onClose}
        >
          {/* Enhanced modal overlay with gradient */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-lg"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-yellow-600/3"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 bg-black border border-yellow-500/30 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-yellow-500/10 mx-auto"
            style={{
              maxHeight: '90vh',
              margin: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Agendar Reunião</h2>
                <p className="text-gray-400 text-sm mt-1">Vamos conversar sobre seu projeto</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-yellow-400 transition-colors p-2"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-green-400 font-medium">Formulário enviado com sucesso!</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-red-400 font-medium">Erro ao enviar formulário. Tente novamente.</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors"
                  placeholder="Nome da sua empresa"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors resize-none"
                  placeholder="Conte-nos sobre seu projeto ou necessidade..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:border-yellow-500 hover:text-yellow-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black rounded-lg hover:from-yellow-400 hover:to-yellow-300 transition-all font-semibold shadow-lg hover:shadow-yellow-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    'Agendar'
                  )}
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-xs text-gray-500 text-center">
                Seus dados estão seguros conosco. Não compartilhamos informações pessoais.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
