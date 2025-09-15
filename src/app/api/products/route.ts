import { NextRequest, NextResponse } from 'next/server';
import { Product, ProductFormData } from '@/types/marketplace';
import { ProductAnalyzer } from '@/utils/aiAnalysis';
import { sampleProducts } from '@/utils/sampleProducts';

// Simulação de banco de dados (em produção, usar um banco real)
const products: Product[] = [...sampleProducts];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar produtos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, model }: ProductFormData = body;

    // Validar dados obrigatórios
    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: 'Título e descrição são obrigatórios' },
        { status: 400 }
      );
    }

    // Analisar produto com IA
    const analysis = ProductAnalyzer.analyzeProduct(`${title} ${description}`);
    
    // Criar produto
    const newProduct: Product = {
      id: Date.now().toString(),
      title: analysis.title,
      description: analysis.description,
      clothingType: analysis.clothingType,
      sleeveType: analysis.sleeveType,
      model: model || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Salvar no "banco de dados"
    products.push(newProduct);

    return NextResponse.json({
      success: true,
      data: newProduct,
      analysis: {
        confidence: analysis.confidence,
        detectedClothingType: analysis.clothingType,
        detectedSleeveType: analysis.sleeveType
      }
    });

  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
