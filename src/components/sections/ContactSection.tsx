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
        const errorText = await response.text();
        console.error('Erro do servidor de contato:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Erro ao enviar formulário de contato:', error);
      setSubmitStatus('error');
      // Track failed form submission
      trackFormSubmission('contact_form', false);
      trackMetaFormSubmission('contact_form', false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Fale Conosco
          </h2>
          <p className="text-xl text-yellow-200 mb-4">
            Implemente CRM B2B em seu negócio
          </p>
          <p className="text-lg text-yellow-300 mb-8">
            Agende uma consultoria gratuita para avaliar como CRM B2B + Vendas Digitais + Capacitação podem beneficiar sua empresa
          </p>
          
          <div className="bg-black rounded-2xl p-8 border border-yellow-500/30">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Nome Completo *"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-yellow-500/50 bg-black text-white placeholder-yellow-300/70 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail *"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-yellow-500/50 bg-black text-white placeholder-yellow-300/70 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <input
                type="text"
                name="company"
                placeholder="Telefone"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <textarea
                name="message"
                placeholder="Mensagem * - Qual sua principal necessidade: CRM B2B, Vendas Digitais ou Capacitação?"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg ${
                  isSubmitting 
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                    : 'bg-yellow-500 text-black hover:bg-yellow-400 shadow-yellow-500/25'
                }`}
              >
                {isSubmitting ? 'Enviando...' : 'Agendar Consultoria Gratuita'}
              </button>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
                  ✅ Mensagem enviada com sucesso! Entraremos em contato em breve.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
                  ❌ Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.
                </div>
              )}
            </form>
          </div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 grid md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">E-mail</h3>
              <p className="text-yellow-200">contato@idenegociosdigitais.com.br</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Telefone</h3>
              <p className="text-yellow-200">(11) 9 9999-9999</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Localização</h3>
              <p className="text-yellow-200 text-sm">
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
