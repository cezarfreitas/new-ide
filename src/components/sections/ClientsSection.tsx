'use client';

import { motion } from 'framer-motion';

interface Client {
  name: string;
  industry: string;
}

interface ClientsSectionProps {
  clients: Client[];
}

export default function ClientsSection({ clients }: ClientsSectionProps) {
  return (
    <section id="clientes" className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nossos Clientes
          </h2>
          <p className="text-xl text-yellow-200 max-w-3xl mx-auto">
            Empresas que melhoraram vendas com CRM B2B
          </p>
          <p className="text-lg text-yellow-300 max-w-4xl mx-auto mt-4">
            Empresas B2B que implementaram nosso ecossistema CRM + Vendas Digitais + Capacitação e obtiveram resultados consistentes
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-black p-6 rounded-lg text-center hover:bg-yellow-500/10 transition-all duration-300 border border-yellow-500/30 hover:border-yellow-500"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{client.name}</h3>
              <p className="text-sm text-yellow-300">{client.industry}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 text-black"
        >
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-2xl">★</span>
              ))}
            </div>
            <blockquote className="text-lg font-medium mb-4 max-w-3xl mx-auto">
              "Em 4 meses tivemos CRM B2B funcionando adequadamente. A automação comercial melhorou nossa qualificação de leads e aumentou nossa conversão. ROI positivo no primeiro ano."
            </blockquote>
            <cite className="text-gray-800 font-semibold">
              CEO - Empresa B2B que implementou CRM completo
            </cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
