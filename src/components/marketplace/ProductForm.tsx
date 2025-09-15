'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProductFormData, Product } from '@/types/marketplace';

interface ProductFormProps {
  onProductCreated?: (product: Product) => void;
}

export default function ProductForm({ onProductCreated }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    description: '',
    clothingType: 'Camiseta',
    sleeveType: 'Curta',
    model: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [analysisResult, setAnalysisResult] = useState<{
    confidence: number;
    detectedClothingType: string;
    detectedSleeveType: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setAnalysisResult(result.analysis);
        onProductCreated?.(result.data);
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          clothingType: 'Camiseta',
          sleeveType: 'Curta',
          model: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black rounded-xl p-6 border border-yellow-500/30">
      <h3 className="text-xl font-bold text-white mb-6">Cadastrar Produto</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-yellow-200 text-sm font-medium mb-2">
            Título do Produto *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-yellow-500/50 bg-black text-white placeholder-yellow-300/70 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-base"
            placeholder="Ex: Camiseta Básica Masculina"
          />
        </div>

        <div>
          <label className="block text-yellow-200 text-sm font-medium mb-2">
            Descrição *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-yellow-500/50 bg-black text-white placeholder-yellow-300/70 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-base resize-none"
            placeholder="Descreva o produto... A IA irá analisar e detectar automaticamente o tipo de roupa e manga"
          />
        </div>

        <div>
          <label className="block text-yellow-200 text-sm font-medium mb-2">
            Modelo / Palavras-chave
          </label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-yellow-500/50 bg-black text-white placeholder-yellow-300/70 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-base"
            placeholder="Ex: básica, casual, esportiva, social, algodão, malha..."
          />
          <p className="text-xs text-yellow-300/70 mt-1">
            Palavras-chave para facilitar a busca do produto
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-yellow-200 text-sm font-medium mb-2">
              Tipo de Roupa
            </label>
            <select
              name="clothingType"
              value={formData.clothingType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-yellow-500/50 bg-black text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-base"
            >
              <option value="Camiseta">Camiseta</option>
              <option value="Camiseta Polo">Camiseta Polo</option>
            </select>
          </div>

          <div>
            <label className="block text-yellow-200 text-sm font-medium mb-2">
              Tipo de Manga
            </label>
            <select
              name="sleeveType"
              value={formData.sleeveType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-yellow-500/50 bg-black text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-base"
            >
              <option value="Curta">Curta</option>
              <option value="Longa">Longa</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 shadow-lg ${
            isSubmitting 
              ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
              : 'bg-yellow-500 text-black hover:bg-yellow-400 hover:scale-105 shadow-yellow-500/25 active:scale-95 cursor-pointer'
          }`}
        >
          {isSubmitting ? 'Analisando com IA...' : 'Cadastrar Produto'}
        </button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm"
          >
            ✅ Produto cadastrado com sucesso!
            {analysisResult && (
              <div className="mt-2 text-xs">
                <p>IA detectou: {analysisResult.detectedClothingType} - Manga {analysisResult.detectedSleeveType}</p>
                <p>Confiança: {Math.round(analysisResult.confidence * 100)}%</p>
              </div>
            )}
          </motion.div>
        )}
        
        {submitStatus === 'error' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm"
          >
            ❌ Erro ao cadastrar produto. Tente novamente.
          </motion.div>
        )}
      </form>
    </div>
  );
}
