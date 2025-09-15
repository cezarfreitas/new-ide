import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Log da requisição recebida
    console.log('API Route Contact: Recebendo dados do formulário de contato');
    
    const body = await request.json();
    
    // Log dos dados recebidos
    console.log('API Route Contact: Dados recebidos:', body);
    
    // Fazer a requisição para o webhook externo
    const response = await fetch('https://api.idenegociosdigitais.com.br/webhook/ide-contato', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Log da resposta do webhook
    console.log('API Route Contact: Resposta do webhook:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });

    const responseText = await response.text();
    
    // Log do conteúdo da resposta
    console.log('API Route Contact: Conteúdo da resposta:', responseText);

    // Retornar resposta para o frontend
    return NextResponse.json({
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: responseText
    }, { 
      status: response.ok ? 200 : response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
      }
    });
    
  } catch (error) {
    console.error('API Route Contact: Erro ao processar webhook:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
      }
    });
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
      'Access-Control-Max-Age': '86400',
    },
  });
}
