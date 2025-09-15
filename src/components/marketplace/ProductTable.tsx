'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/marketplace';
import ProductModal from './ProductModal';

interface ProductTableProps {
  refreshTrigger?: number;
}

export default function ProductTable({ refreshTrigger }: ProductTableProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<{
    clothingType: string;
    sleeveType: string;
    searchTerm: string;
  }>({
    clothingType: 'all',
    sleeveType: 'all',
    searchTerm: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (refreshTrigger) {
      fetchProducts();
    }
  }, [refreshTrigger]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const result = await response.json();
      
      if (result.success) {
        setProducts(result.data);
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    // Filtro por tipo de roupa
    if (filter.clothingType !== 'all' && product.clothingType !== filter.clothingType) {
      return false;
    }
    
    // Filtro por tipo de manga
    if (filter.sleeveType !== 'all' && product.sleeveType !== filter.sleeveType) {
      return false;
    }
    
    // Filtro por termo de busca (título, descrição, modelo)
    if (filter.searchTerm) {
      const searchLower = filter.searchTerm.toLowerCase();
      const searchableText = `${product.title} ${product.description} ${product.model}`.toLowerCase();
      if (!searchableText.includes(searchLower)) {
        return false;
      }
    }
    
    return true;
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="bg-black rounded-xl p-6 border border-yellow-500/30">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black rounded-xl p-6 border border-yellow-500/30">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-xl font-bold text-white">Produtos Cadastrados</h3>
        
        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={filter.searchTerm}
            onChange={(e) => setFilter(prev => ({ ...prev, searchTerm: e.target.value }))}
            className="px-3 py-2 rounded-lg border border-yellow-500/50 bg-black text-white text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 placeholder-yellow-300/70 min-w-48"
          />
          
          <select
            value={filter.clothingType}
            onChange={(e) => setFilter(prev => ({ ...prev, clothingType: e.target.value }))}
            className="px-3 py-2 rounded-lg border border-yellow-500/50 bg-black text-white text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 cursor-pointer"
          >
            <option value="all">Todos os tipos</option>
            <option value="Camiseta">Camiseta</option>
            <option value="Camiseta Polo">Camiseta Polo</option>
          </select>
          
          <select
            value={filter.sleeveType}
            onChange={(e) => setFilter(prev => ({ ...prev, sleeveType: e.target.value }))}
            className="px-3 py-2 rounded-lg border border-yellow-500/50 bg-black text-white text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 cursor-pointer"
          >
            <option value="all">Todos os tipos</option>
            <option value="Curta">Manga Curta</option>
            <option value="Longa">Manga Longa</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">Nenhum produto encontrado</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-yellow-500/20">
                <th className="text-left py-3 px-4 text-yellow-200 font-medium">Título</th>
                <th className="text-left py-3 px-4 text-yellow-200 font-medium">Modelo</th>
                <th className="text-left py-3 px-4 text-yellow-200 font-medium">Tipo de Roupa</th>
                <th className="text-left py-3 px-4 text-yellow-200 font-medium">Tipo de Manga</th>
                <th className="text-left py-3 px-4 text-yellow-200 font-medium">Data</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <td className="py-3 px-4 text-white">
                    <div>
                      <div className="font-medium">{product.title}</div>
                      <div className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {product.description}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-yellow-300">
                      {product.model ? (
                        <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs">
                          {product.model}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs">Sem modelo</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.clothingType === 'Camiseta Polo' 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {product.clothingType}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.sleeveType === 'Longa' 
                        ? 'bg-purple-500/20 text-purple-400' 
                        : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {product.sleeveType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-sm">
                    {new Date(product.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-400">
        Total: {filteredProducts.length} produto(s)
      </div>

      {/* Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
