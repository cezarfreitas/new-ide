import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Teste de Formulário de Contato - Iniciando...');
    
    const body = await request.json();
    console.log('📝 Dados recebidos:', body);
    
    // Validar dados obrigatórios
    if (!body.name || !body.email || !body.message) {
      console.error('❌ Dados obrigatórios faltando:', {
        hasName: !!body.name,
        hasEmail: !!body.email,
        hasMessage: !!body.message
      });
      
      return NextResponse.json({
        success: false,
        error: 'Dados obrigatórios não fornecidos (nome, email, mensagem)',
        received: body
      }, { status: 400 });
    }
    
    console.log('✅ Dados válidos recebidos');
    
    // Simular envio para webhook
    console.log('📤 Tentando enviar para webhook externo...');
    try {
      const webhookResponse = await fetch('https://api.idenegociosdigitais.com.br/webhook/ide-contato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
      });
      
      console.log('📡 Resposta do webhook:', {
        status: webhookResponse.status,
        statusText: webhookResponse.statusText,
        ok: webhookResponse.ok
      });
      
      if (webhookResponse.ok) {
        console.log('✅ Webhook funcionou!');
        return NextResponse.json({
          success: true,
          message: 'Formulário enviado com sucesso via webhook!',
          webhookStatus: webhookResponse.status,
          data: body
        });
      } else {
        console.log('⚠️ Webhook falhou, tentando fallback de email...');
        throw new Error(`Webhook falhou: ${webhookResponse.status}`);
      }
    } catch (webhookError) {
      console.error('❌ Erro no webhook:', webhookError);
      
      // Tentar fallback de email
      console.log('📧 Tentando fallback de email...');
      try {
        const emailResponse = await fetch('http://localhost:3000/api/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            ...body,
            phone: body.company || 'Não informado',
            form_type: 'contact_form_fallback'
          }),
        });
        
        if (emailResponse.ok) {
          console.log('✅ Fallback de email funcionou!');
          return NextResponse.json({
            success: true,
            message: 'Formulário enviado com sucesso via email (fallback)!',
            emailStatus: emailResponse.status,
            data: body
          });
        } else {
          console.error('❌ Fallback de email também falhou');
          throw new Error('Ambos webhook e email falharam');
        }
      } catch (emailError) {
        console.error('❌ Erro no fallback de email:', emailError);
        throw emailError;
      }
    }
    
  } catch (error) {
    console.error('❌ Erro geral no teste de contato:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Endpoint de teste do formulário de contato',
    usage: 'POST com dados do formulário',
    example: {
      name: 'João Silva',
      email: 'joao@exemplo.com',
      company: '(11) 99999-9999',
      message: 'Mensagem de teste'
    }
  });
}
