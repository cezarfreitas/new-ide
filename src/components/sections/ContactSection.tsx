'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ContactForm } from '@/types';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useMetaPixel } from '@/hooks/useMetaPixel';

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { trackFormSubmission } = useAnalytics();
  const { trackContact, trackFormSubmission: trackMetaFormSubmission } = useMetaPixel();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // URL do webhook via API route (resolve CORS)
      const webhookUrl = '/api/contact';
      
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
        form_type: 'contact_form',
        lead_source: 'website',
        lead_quality: 'medium',
        source: 'IDE Negócios Digitais - Formulário de Contato',
        // Dados de conversão
        conversion_value: 50,
        currency: 'BRL',
      };
      
      // Log para debug
      console.log('Enviando dados para webhook de contato:', {
        url: webhookUrl,
        data: marketingData
      });

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(marketingData),
      });

      // Log da resposta
      console.log('Resposta do webhook de contato:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Track successful form submission
        trackFormSubmission('contact_form', true);
        trackContact();
        trackMetaFormSubmission('contact_form', true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        });
      } else {
        // Tentar fallback de email se webhook falhar
        console.log('Webhook falhou, tentando fallback de email...');
        
        try {
          const emailResponse = await fetch('/api/email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              ...marketingData,
              phone: marketingData.company || 'Não informado', // Usar company como phone para o template de email
              form_type: 'contact_form_fallback'
            }),
          });

          if (emailResponse.ok) {
            console.log('Fallback de email funcionou!');
            setSubmitStatus('success');
            // Track successful form submission
            trackFormSubmission('contact_form', true);
            trackContact();
            trackMetaFormSubmission('contact_form', true);
            
            // Reset form
            setFormData({
              name: '',
              email: '',
              company: '',
              message: ''
            });
            return; // Sair da função se email funcionou
          } else {
            console.error('Fallback de email também falhou');
          }
        } catch (emailError) {
          console.error('Erro no fallback de email:', emailError);
        }

        // Se chegou aqui, ambos falharam
        const errorData = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
        console.error('Erro do servidor de contato:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        
        // Mensagens de erro específicas
        let errorMsg = 'Erro ao enviar mensagem. Tente novamente.';
        
        if (response.status === 400) {
          errorMsg = 'Dados inválidos. Verifique os campos preenchidos.';
        } else if (response.status === 500) {
          errorMsg = 'Erro interno do servidor. Tente novamente em alguns minutos.';
        } else if (response.status === 503) {
          errorMsg = 'Serviços temporariamente indisponíveis. Tente novamente mais tarde.';
        } else if (errorData.error) {
          errorMsg = errorData.error;
        }
        
        setErrorMessage(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error('Erro ao enviar formulário de contato:', error);
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

  return (
    <section id="contato" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Fale Conosco
          </h2>
          <p className="text-lg sm:text-xl text-yellow-200 mb-3 sm:mb-4">
            Implemente CRM B2B em seu negócio
          </p>
          <p className="text-base sm:text-lg text-yellow-300 mb-6 sm:mb-8 px-4">
            Agende uma consultoria gratuita para avaliar como CRM B2B + Vendas Digitais + Capacitação podem beneficiar sua empresa
          </p>
          
          <div className="bg-black rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-yellow-500/30">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Nome Completo *"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 sm:py-4 rounded-lg border border-yellow-500/50 bg-black text-white placeholder-yellow-300/70 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-base"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail *"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 sm:py-4 rounded-lg border border-yellow-500/50 bg-black text-white placeholder-yellow-300/70 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-base"
                />
              </div>
              <input
                type="tel"
                name="company"
                placeholder="Telefone (11) 99999-9999"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 sm:py-4 rounded-lg border border-yellow-500/50 bg-black text-white placeholder-yellow-300/70 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-base"
              />
              <textarea
                name="message"
                placeholder="Mensagem * - Qual sua principal necessidade: CRM B2B, Vendas Digitais ou Capacitação?"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 sm:py-4 rounded-lg border border-yellow-500/50 bg-black text-white placeholder-yellow-300/70 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-base resize-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all duration-300 shadow-lg ${
                  isSubmitting 
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                    : 'bg-yellow-500 text-black hover:bg-yellow-400 hover:scale-105 shadow-yellow-500/25 active:scale-95 cursor-pointer'
                }`}
              >
                {isSubmitting ? 'Enviando...' : 'Agendar Consultoria Gratuita'}
              </button>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 sm:p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm sm:text-base"
                >
                  ✅ Mensagem enviada com sucesso! Entraremos em contato em breve.
                </motion.div>
              )}
              
              {submitStatus === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 sm:p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm sm:text-base"
                >
                  <div className="flex items-start space-x-2">
                    <span className="text-red-400">❌</span>
                    <div>
                      <p className="font-medium">Erro ao enviar mensagem</p>
                      <p className="text-xs mt-1 opacity-90">
                        {errorMessage || 'Tente novamente em alguns minutos.'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <div className="text-center p-4 rounded-lg bg-black/50 border border-yellow-500/20">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">E-mail</h3>
              <p className="text-yellow-200 text-sm sm:text-base break-all">contato@idenegociosdigitais.com.br</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-black/50 border border-yellow-500/20">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Telefone</h3>
              <p className="text-yellow-200 text-sm sm:text-base">+55 11 98988-2867</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-black/50 border border-yellow-500/20 sm:col-span-2 lg:col-span-1">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Localização</h3>
              <p className="text-yellow-200 text-xs sm:text-sm">
                R. Gen. Francisco Glicério, 1833 - Sala 4<br />
                1°andar - Centro, Suzano - SP<br />
                CEP: 08674-003
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
