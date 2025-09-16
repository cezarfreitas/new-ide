'use client';

import { motion } from 'framer-motion';

interface Client {
  name: string;
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
              <h3 className="text-lg font-semibold text-white">{client.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
