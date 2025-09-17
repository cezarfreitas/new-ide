'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useMetaPixel } from '@/hooks/useMetaPixel';
import { validatePhone, validateEmail, validateName, validateMessage, phoneMask } from '@/utils/validation';

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
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const { trackFormSubmission } = useAnalytics();
  const { trackLead, trackContact, trackFormSubmission: trackMetaFormSubmission } = useMetaPixel();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    setValidationErrors({});

    // Validar campos obrigatórios
    const errors: {[key: string]: string} = {};
    
    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid) {
      errors.name = nameValidation.message || 'Nome inválido';
    }
    
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.message || 'Email inválido';
    }
    
    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.message || 'Telefone inválido';
    }
    
    const messageValidation = validateMessage(formData.message);
    if (!messageValidation.isValid) {
      errors.message = messageValidation.message || 'Mensagem inválida';
    }
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Dados de marketing para envio
      const marketingData = {
        ...formData,
        // Dados de marketing UTM
        utm_source: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('utm_source') || 'direct' : 'direct',
        utm_medium: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('utm_medium') || 'website' : 'website',
        utm_campaign: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('utm_campaign') || 'organic' : 'organic',
        utm_term: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('utm_term') || '' : '',
        utm_content: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('utm_content') || '' : '',
        // Dados da sessão
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        referrer: typeof window !== 'undefined' ? document.referrer : '',
        user_agent: typeof window !== 'undefined' ? navigator.userAgent : '',
        timestamp: new Date().toISOString(),
        // Dados do formulário
        form_type: 'meeting_request',
        lead_source: 'website',
        lead_quality: 'high',
        source: 'IDE Negócios Digitais - Formulário de Contato',
        // Dados de conversão
        conversion_value: 100,
        currency: 'BRL',
      };
      
      // Log para debug
      console.log('Enviando dados do formulário:', marketingData);

      // Enviar para webhook e email em paralelo
      const [webhookResponse, emailResponse] = await Promise.allSettled([
        // Envio para webhook
        fetch('/api/webhook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(marketingData),
        }),
        // Envio para email
        fetch('/api/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(marketingData),
        })
      ]);

      // Verificar resultados
      const webhookSuccess = webhookResponse.status === 'fulfilled' && webhookResponse.value.ok;
      const emailSuccess = emailResponse.status === 'fulfilled' && emailResponse.value.ok;

      // Log dos resultados
      console.log('Resultados do envio:', {
        webhook: {
          status: webhookResponse.status,
          success: webhookSuccess,
          error: webhookResponse.status === 'rejected' ? webhookResponse.reason : null
        },
        email: {
          status: emailResponse.status,
          success: emailSuccess,
          error: emailResponse.status === 'rejected' ? emailResponse.reason : null
        }
      });

      // Considerar sucesso se pelo menos um dos envios funcionou
      if (webhookSuccess || emailSuccess) {
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
        // Se ambos falharam, mostrar erro
        // const webhookError = webhookResponse.status === 'rejected' ? webhookResponse.reason : 
        //   (webhookResponse.status === 'fulfilled' ? `Webhook: ${webhookResponse.value.status}` : 'Webhook: Erro desconhecido');
        // const emailError = emailResponse.status === 'rejected' ? emailResponse.reason : 
        //   (emailResponse.status === 'fulfilled' ? `Email: ${emailResponse.value.status}` : 'Email: Erro desconhecido');
        
        // Mensagem de erro mais amigável
        let errorMsg = 'Erro ao enviar solicitação. Tente novamente.';
        
        if (webhookResponse.status === 'rejected' && emailResponse.status === 'rejected') {
          errorMsg = 'Serviços temporariamente indisponíveis. Tente novamente mais tarde.';
        } else if (webhookResponse.status === 'rejected') {
          errorMsg = 'Erro no sistema de contato. Tente novamente em alguns minutos.';
        } else if (emailResponse.status === 'rejected') {
          errorMsg = 'Erro no envio de email. Tente novamente.';
        }
        
        setErrorMessage(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus('error');
      
      // Definir mensagem de erro se não foi definida anteriormente
      if (!errorMessage) {
        const errorMsg = error instanceof Error ? error.message : 'Erro de conexão. Verifique sua internet e tente novamente.';
        setErrorMessage(errorMsg);
      }
      
      // Track failed form submission
      trackFormSubmission('contact_form', false);
      trackMetaFormSubmission('contact_form', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    
    // Aplicar máscara de telefone
    if (name === 'phone') {
      processedValue = phoneMask(value);
    }
    
    setFormData({
      ...formData,
      [name]: processedValue
    });
    
    // Limpar erro de validação quando usuário digita
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
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
            className="relative z-10 bg-black border border-yellow-500/30 rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-yellow-500/10 mx-auto"
            style={{
              maxHeight: '90vh',
              margin: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-bold text-white">Agendar Reunião</h2>
                <p className="text-gray-400 text-xs mt-1">Vamos conversar sobre seu projeto</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-yellow-400 transition-colors p-1 cursor-pointer"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-green-400 text-sm font-medium">Enviado com sucesso!</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-red-400 text-sm font-medium">Erro ao enviar solicitação</p>
                    <p className="text-red-300 text-xs mt-1 opacity-90">
                      {errorMessage || 'Tente novamente em alguns minutos.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-gray-300 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors text-sm"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors text-sm"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-gray-300 mb-1">
                  Telefone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors text-sm"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-xs font-medium text-gray-300 mb-1">
                  Empresa
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors text-sm"
                  placeholder="Nome da sua empresa"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-gray-300 mb-1">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors resize-none text-sm"
                  placeholder="Conte-nos sobre seu projeto..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:border-yellow-500 hover:text-yellow-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black rounded-lg hover:from-yellow-400 hover:to-yellow-300 transition-all font-semibold shadow-lg hover:shadow-yellow-500/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center text-sm"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    'Agendar'
                  )}
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500 text-center">
                Seus dados estão seguros conosco.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
