import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 DEBUG - API Route Contact: Recebendo dados do formulário de contato');
    
    const body = await request.json();
    console.log('📝 DEBUG - Dados recebidos:', body);
    
    // Validar dados obrigatórios
    if (!body.name || !body.email || !body.message) {
      console.error('❌ DEBUG - Dados obrigatórios faltando:', {
        hasName: !!body.name,
        hasEmail: !!body.email,
        hasMessage: !!body.message,
        hasCompany: !!body.company
      });
      
      return NextResponse.json({
        success: false,
        error: 'Dados obrigatórios não fornecidos (nome, email, mensagem)',
        received: body
      }, { status: 400 });
    }
    
    console.log('✅ DEBUG - Dados válidos, tentando webhook...');
    
    // Tentar webhook primeiro
    try {
      const webhookResponse = await fetch('https://api.idenegociosdigitais.com.br/webhook/ide-contato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
      });

      console.log('📡 DEBUG - Resposta do webhook:', {
        status: webhookResponse.status,
        statusText: webhookResponse.statusText,
        ok: webhookResponse.ok
      });

      if (webhookResponse.ok) {
        console.log('✅ DEBUG - Webhook funcionou!');
        return NextResponse.json({
          success: true,
          message: 'Formulário enviado com sucesso via webhook!',
          method: 'webhook',
          status: webhookResponse.status
        });
      } else {
        console.log('⚠️ DEBUG - Webhook falhou, tentando email...');
        throw new Error(`Webhook retornou status ${webhookResponse.status}`);
      }
    } catch (webhookError) {
      console.error('❌ DEBUG - Erro no webhook:', webhookError);
      
      // Tentar email como fallback
      console.log('📧 DEBUG - Tentando fallback de email...');
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
        
        console.log('📧 DEBUG - Resposta do email:', {
          status: emailResponse.status,
          ok: emailResponse.ok
        });
        
        if (emailResponse.ok) {
          console.log('✅ DEBUG - Email funcionou!');
          return NextResponse.json({
            success: true,
            message: 'Formulário enviado com sucesso via email (fallback)!',
            method: 'email_fallback',
            status: emailResponse.status
          });
        } else {
          const errorText = await emailResponse.text();
          console.error('❌ DEBUG - Email falhou:', errorText);
          throw new Error(`Email retornou status ${emailResponse.status}: ${errorText}`);
        }
      } catch (emailError) {
        console.error('❌ DEBUG - Erro no email:', emailError);
        throw emailError;
      }
    }
    
  } catch (error) {
    console.error('❌ DEBUG - Erro geral:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      timestamp: new Date().toISOString()
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
