import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { env } from '@/lib/env';

export async function GET() {
  try {
    console.log('Testando configurações SMTP...');
    console.log('Configurações:', {
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      user: env.SMTP_USER,
      from: env.SMTP_FROM,
      to: env.SMTP_TO,
      hasPassword: !!env.SMTP_PASS
    });

    // Criar transporter
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: parseInt(env.SMTP_PORT),
      secure: env.SMTP_PORT === '465',
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verificar conexão
    console.log('Verificando conexão SMTP...');
    await transporter.verify();
    console.log('✅ Conexão SMTP verificada com sucesso!');

    // Enviar email de teste
    const testEmail = {
      from: `"IDE Negócios Digitais" <${env.SMTP_FROM}>`,
      to: env.SMTP_TO, // Sempre enviar para cezar@idenegociosdigitais.com.br
      replyTo: 'teste@exemplo.com', // Email de exemplo para reply-to
      subject: '🧪 Teste de Email SMTP - IDE Negócios Digitais',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #fbbf24, #f59e0b); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #000; margin: 0; text-align: center;">
              🧪 Teste de Email SMTP
            </h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #374151; margin-top: 0;">
              ✅ Email funcionando corretamente!
            </h2>
            <p style="color: #6b7280; line-height: 1.6;">
              Este é um email de teste para verificar se as configurações SMTP estão funcionando corretamente.
            </p>
            <div style="background: #e5e7eb; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <h3 style="color: #374151; margin-top: 0;">📊 Configurações utilizadas:</h3>
              <ul style="color: #6b7280; margin: 0;">
                <li><strong>Host:</strong> ${env.SMTP_HOST}</li>
                <li><strong>Porta:</strong> ${env.SMTP_PORT}</li>
                <li><strong>Usuário:</strong> ${env.SMTP_USER}</li>
                <li><strong>De:</strong> ${env.SMTP_FROM}</li>
                <li><strong>Para:</strong> ${env.SMTP_TO}</li>
                <li><strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}</li>
              </ul>
            </div>
            <p style="color: #9ca3af; font-size: 14px; margin: 0;">
              Este email foi enviado automaticamente pelo sistema de teste SMTP da IDE Negócios Digitais.
            </p>
          </div>
        </div>
      `,
      text: `
Teste de Email SMTP - IDE Negócios Digitais

✅ Email funcionando corretamente!

Este é um email de teste para verificar se as configurações SMTP estão funcionando corretamente.

📊 Configurações utilizadas:
- Host: ${env.SMTP_HOST}
- Porta: ${env.SMTP_PORT}
- Usuário: ${env.SMTP_USER}
- De: ${env.SMTP_FROM}
- Para: ${env.SMTP_TO}
- Data/Hora: ${new Date().toLocaleString('pt-BR')}

Este email foi enviado automaticamente pelo sistema de teste SMTP da IDE Negócios Digitais.
      `
    };

    console.log('Enviando email de teste...');
    const info = await transporter.sendMail(testEmail);
    console.log('✅ Email de teste enviado com sucesso!', info.messageId);

    return NextResponse.json({
      success: true,
      message: 'Email de teste enviado com sucesso!',
      messageId: info.messageId,
      config: {
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        user: env.SMTP_USER,
        from: env.SMTP_FROM,
        to: env.SMTP_TO
      }
    });

  } catch (error) {
    console.error('❌ Erro no teste SMTP:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      config: {
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        user: env.SMTP_USER,
        from: env.SMTP_FROM,
        to: env.SMTP_TO,
        hasPassword: !!env.SMTP_PASS
      }
    }, { status: 500 });
  }
}
