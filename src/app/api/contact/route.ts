import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Log da requisição recebida
    console.log('API Route Contact: Recebendo dados do formulário de contato');
    
    const body = await request.json();
    
    // Log dos dados recebidos
    console.log('API Route Contact: Dados recebidos:', body);
    
    // TEMPORÁRIO: Sempre usar email como fallback para garantir funcionamento
    console.log('API Route Contact: Usando email como método principal (temporário)');
    
    try {
      // Enviar via email diretamente
      const emailResponse = await fetch('http://localhost:3000/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...body,
          phone: body.company || 'Não informado',
          form_type: 'contact_form'
        }),
      });
      
      if (emailResponse.ok) {
        console.log('API Route Contact: Email enviado com sucesso!');
        return NextResponse.json({
          success: true,
          message: 'Formulário enviado com sucesso via email!',
          method: 'email'
        }, { 
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Accept',
          }
        });
      } else {
        throw new Error(`Email falhou com status ${emailResponse.status}`);
      }
    } catch (emailError) {
      console.error('API Route Contact: Erro no email:', emailError);
      throw emailError;
    }
    
  } catch (error) {
    console.error('API Route Contact: Erro ao processar webhook:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    
    // Mensagens de erro mais específicas
    let errorMessage = 'Erro interno do servidor';
    let statusCode = 500;
    
    if (error instanceof Error) {
      if (error.message.includes('fetch')) {
        errorMessage = 'Erro de conexão com o servidor externo';
        statusCode = 503;
      } else if (error.message.includes('JSON')) {
        errorMessage = 'Erro ao processar dados';
        statusCode = 400;
      } else {
        errorMessage = error.message;
      }
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      details: {
        timestamp: new Date().toISOString(),
        type: 'contact_api_error'
      }
    }, { 
      status: statusCode,
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
