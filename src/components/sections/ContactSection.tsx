'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ContactForm } from '@/types';

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica de envio do formulário
    console.log('Form data:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      message: ''
    });
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
                className="w-full bg-yellow-500 text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/25"
              >
                Agendar Consultoria Gratuita
              </button>
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
