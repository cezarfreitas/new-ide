import { ProductAnalysis } from '@/types/marketplace';

export class ProductAnalyzer {
  private static readonly CLOTHING_TYPE_KEYWORDS = {
    'Camiseta': ['camiseta', 't-shirt', 'tshirt', 'camisa básica', 'camisa simples'],
    'Camiseta Polo': ['polo', 'camiseta polo', 'polo shirt', 'camisa polo', 'polo básica']
  };

  private static readonly SLEEVE_TYPE_KEYWORDS = {
    'Curta': ['manga curta', 'short sleeve', 'sem manga', 'regata', 'sleeveless', 'manga curta'],
    'Longa': ['manga longa', 'long sleeve', 'manga comprida', 'manga longa']
  };

  static analyzeProduct(text: string): ProductAnalysis {
    const lowerText = text.toLowerCase();
    
    // Analisar tipo de roupa
    const clothingType = this.analyzeClothingType(lowerText);
    
    // Analisar tipo de manga
    const sleeveType = this.analyzeSleeveType(lowerText);
    
    // Gerar descrição melhorada
    const description = this.generateDescription(text, clothingType, sleeveType);
    
    // Calcular confiança baseada na análise
    const confidence = this.calculateConfidence(lowerText, clothingType, sleeveType);
    
    return {
      title: this.extractTitle(text),
      description,
      clothingType,
      sleeveType,
      confidence
    };
  }

  private static analyzeClothingType(text: string): 'Camiseta' | 'Camiseta Polo' {
    let poloScore = 0;
    let camisetaScore = 0;

    // Contar palavras-chave para Polo
    this.CLOTHING_TYPE_KEYWORDS['Camiseta Polo'].forEach(keyword => {
      if (text.includes(keyword)) {
        poloScore += 1;
      }
    });

    // Contar palavras-chave para Camiseta
    this.CLOTHING_TYPE_KEYWORDS['Camiseta'].forEach(keyword => {
      if (text.includes(keyword)) {
        camisetaScore += 1;
      }
    });

    // Se não encontrou palavras-chave específicas, assumir Camiseta
    if (poloScore === 0 && camisetaScore === 0) {
      return 'Camiseta';
    }

    return poloScore > camisetaScore ? 'Camiseta Polo' : 'Camiseta';
  }

  private static analyzeSleeveType(text: string): 'Curta' | 'Longa' {
    let longaSleeveScore = 0;
    let curtaSleeveScore = 0;

    // Contar palavras-chave para manga longa
    this.SLEEVE_TYPE_KEYWORDS['Longa'].forEach(keyword => {
      if (text.includes(keyword)) {
        longaSleeveScore += 1;
      }
    });

    // Contar palavras-chave para manga curta
    this.SLEEVE_TYPE_KEYWORDS['Curta'].forEach(keyword => {
      if (text.includes(keyword)) {
        curtaSleeveScore += 1;
      }
    });

    // Se não encontrou palavras-chave específicas, assumir manga curta
    if (longaSleeveScore === 0 && curtaSleeveScore === 0) {
      return 'Curta';
    }

    return longaSleeveScore > curtaSleeveScore ? 'Longa' : 'Curta';
  }

  private static extractTitle(text: string): string {
    // Extrair título das primeiras palavras ou linha
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    if (lines.length > 0) {
      const firstLine = lines[0].trim();
      // Se a primeira linha for muito longa, pegar apenas as primeiras palavras
      if (firstLine.length > 50) {
        return firstLine.substring(0, 50) + '...';
      }
      return firstLine;
    }
    return 'Produto sem título';
  }

  private static generateDescription(originalText: string, clothingType: string, sleeveType: string): string {
    // Melhorar a descrição baseada na análise
    let description = originalText;
    
    // Adicionar informações sobre tipo de roupa se não estiver presente
    if (!description.toLowerCase().includes(clothingType.toLowerCase())) {
      description = `${clothingType} ${description}`;
    }
    
    // Adicionar informações sobre manga se não estiver presente
    if (!description.toLowerCase().includes('manga')) {
      description = `${description} - Manga ${sleeveType.toLowerCase()}`;
    }
    
    return description;
  }

  private static calculateConfidence(text: string, clothingType: string, sleeveType: string): number {
    let confidence = 0.5; // Base confidence
    
    // Aumentar confiança se encontrou palavras-chave específicas
    const clothingKeywords = this.CLOTHING_TYPE_KEYWORDS[clothingType as keyof typeof this.CLOTHING_TYPE_KEYWORDS];
    const sleeveKeywords = this.SLEEVE_TYPE_KEYWORDS[sleeveType as keyof typeof this.SLEEVE_TYPE_KEYWORDS];
    
    clothingKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        confidence += 0.1;
      }
    });
    
    sleeveKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        confidence += 0.1;
      }
    });
    
    return Math.min(confidence, 1.0); // Máximo 100%
  }
}

