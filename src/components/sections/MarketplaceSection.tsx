'use client';

import { motion } from 'framer-motion';
import ProductForm from '@/components/marketplace/ProductForm';
import ProductTable from '@/components/marketplace/ProductTable';
import { Product } from '@/types/marketplace';
import { useState } from 'react';

export default function MarketplaceSection() {
  const [, setProducts] = useState<Product[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleProductCreated = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <section id="marketplace" className="py-16 px-4 sm:px-6 lg:px-8 bg-black relative">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/3 via-transparent to-yellow-600/2"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Marketplace de Roupas
          </h2>
          <p className="text-lg text-yellow-200 max-w-3xl mx-auto">
            Sistema inteligente que analisa automaticamente o tipo de roupa e manga usando IA
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário de Cadastro */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ProductForm onProductCreated={handleProductCreated} />
          </motion.div>

          {/* Tabela de Produtos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ProductTable refreshTrigger={refreshTrigger} />
          </motion.div>
        </div>

        {/* Informações sobre a IA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="text-center p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-xl border border-yellow-500/20">
            <h4 className="text-lg font-bold text-yellow-500 mb-3">Análise Automática</h4>
            <p className="text-yellow-200 text-sm">
              A IA analisa automaticamente o texto e detecta se é Camiseta ou Camiseta Polo
            </p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-xl border border-yellow-500/20">
            <h4 className="text-lg font-bold text-yellow-500 mb-3">Detecção de Manga</h4>
            <p className="text-yellow-200 text-sm">
              Identifica automaticamente se a manga é Curta ou Longa baseado na descrição
            </p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-xl border border-yellow-500/20">
            <h4 className="text-lg font-bold text-yellow-500 mb-3">Campo Modelo</h4>
            <p className="text-yellow-200 text-sm">
              Adicione palavras-chave para facilitar a busca: básica, casual, esportiva, algodão...
            </p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-xl border border-yellow-500/20">
            <h4 className="text-lg font-bold text-yellow-500 mb-3">Busca Inteligente</h4>
            <p className="text-yellow-200 text-sm">
              Busque por título, descrição ou palavras-chave do modelo para encontrar produtos
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
