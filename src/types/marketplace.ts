export interface Product {
  id: string;
  title: string;
  description: string;
  clothingType: 'Camiseta' | 'Camiseta Polo';
  sleeveType: 'Curta' | 'Longa';
  model: string; // Palavras-chave para busca
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductAnalysis {
  title: string;
  description: string;
  clothingType: 'Camiseta' | 'Camiseta Polo';
  sleeveType: 'Curta' | 'Longa';
  confidence: number;
}

export interface ProductFormData {
  title: string;
  description: string;
  clothingType: 'Camiseta' | 'Camiseta Polo';
  sleeveType: 'Curta' | 'Longa';
  model: string;
}
