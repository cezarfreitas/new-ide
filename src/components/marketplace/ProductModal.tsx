'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/marketplace';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-black border border-yellow-500/30 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-white">Detalhes do Produto</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {/* Título */}
              <div>
                <label className="block text-yellow-200 text-sm font-medium mb-2">Título</label>
                <div className="text-white text-lg font-semibold">{product.title}</div>
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-yellow-200 text-sm font-medium mb-2">Descrição</label>
                <div className="text-white bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  {product.description}
                </div>
              </div>

              {/* Modelo */}
              <div>
                <label className="block text-yellow-200 text-sm font-medium mb-2">Modelo / Palavras-chave</label>
                <div className="text-white">
                  {product.model ? (
                    <div className="flex flex-wrap gap-2">
                      {product.model.split(',').map((keyword, index) => (
                        <span
                          key={index}
                          className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm"
                        >
                          {keyword.trim()}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-500 italic">Sem palavras-chave definidas</span>
                  )}
                </div>
              </div>

              {/* Informações da IA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-yellow-200 text-sm font-medium mb-2">Tipo de Roupa</label>
                  <span className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    product.clothingType === 'Camiseta Polo' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {product.clothingType}
                  </span>
                </div>

                <div>
                  <label className="block text-yellow-200 text-sm font-medium mb-2">Tipo de Manga</label>
                  <span className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    product.sleeveType === 'Longa' 
                      ? 'bg-purple-500/20 text-purple-400' 
                      : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {product.sleeveType}
                  </span>
                </div>
              </div>

              {/* Data de Criação */}
              <div>
                <label className="block text-yellow-200 text-sm font-medium mb-2">Data de Cadastro</label>
                <div className="text-white">
                  {new Date(product.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>

              {/* ID do Produto */}
              <div>
                <label className="block text-yellow-200 text-sm font-medium mb-2">ID do Produto</label>
                <div className="text-gray-400 text-sm font-mono bg-gray-900/50 rounded-lg p-2 border border-gray-700">
                  {product.id}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end mt-8 pt-6 border-t border-gray-700">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

