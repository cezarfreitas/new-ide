import { Product } from '@/types/marketplace';

export const sampleProducts: Product[] = [
  {
    id: '1',
    title: 'Camiseta Urbana Ecko Branca com Estampa Exclusiva',
    description: 'Descubra a Camiseta Urbana Ecko Branca com Estampa Exclusiva, uma peça essencial para os amantes do estilo urbano moderno. Feita com tecido de qualidade selecionada, oferece durabilidade e conforto excepcionais. Seu design moderno garante que você se destaque em qualquer ocasião.',
    clothingType: 'Camiseta',
    sleeveType: 'Curta',
    model: 'camiseta ecko, moda urbana, camiseta estampada, estilo moderno, camiseta branca',
    createdAt: new Date('2025-09-07T23:04:16'),
    updatedAt: new Date('2025-09-07T23:04:16')
  },
  {
    id: '2',
    title: 'Polo Social Premium Masculina',
    description: 'Polo social de alta qualidade, ideal para eventos corporativos e ocasiões especiais. Tecido premium com acabamento impecável e design elegante.',
    clothingType: 'Camiseta Polo',
    sleeveType: 'Curta',
    model: 'polo social, premium, corporativo, elegante, masculina',
    createdAt: new Date('2025-09-07T22:30:00'),
    updatedAt: new Date('2025-09-07T22:30:00')
  },
  {
    id: '3',
    title: 'Camiseta Básica de Algodão',
    description: 'Camiseta básica confeccionada em 100% algodão, perfeita para o dia a dia. Confortável, durável e versátil para qualquer ocasião casual.',
    clothingType: 'Camiseta',
    sleeveType: 'Curta',
    model: 'básica, algodão, casual, dia a dia, confortável',
    createdAt: new Date('2025-09-07T21:15:00'),
    updatedAt: new Date('2025-09-07T21:15:00')
  },
  {
    id: '4',
    title: 'Polo Esportiva de Manga Longa',
    description: 'Polo esportiva com manga longa, ideal para atividades físicas e esportes. Tecido tecnológico que proporciona conforto e liberdade de movimento.',
    clothingType: 'Camiseta Polo',
    sleeveType: 'Longa',
    model: 'polo esportiva, manga longa, esporte, tecnológico, ativo',
    createdAt: new Date('2025-09-07T20:45:00'),
    updatedAt: new Date('2025-09-07T20:45:00')
  }
];

