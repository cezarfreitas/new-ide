import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { env } from '@/lib/env';

// Interface para os dados do formulário
interface MeetingFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  page_url?: string;
  referrer?: string;
  user_agent?: string;
  timestamp?: string;
  form_type?: string;
  lead_source?: string;
  lead_quality?: string;
  source?: string;
  conversion_value?: number;
  currency?: string;
}

// Função para criar template de email
function createEmailTemplate(data: MeetingFormData): { subject: string; html: string; text: string } {
  const subject = `Nova Solicitação de Reunião - ${data.name}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nova Solicitação de Reunião</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #000; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #374151; }
        .value { color: #6b7280; }
        .utm-data { background: #e5e7eb; padding: 15px; border-radius: 6px; margin-top: 20px; }
        .utm-title { font-weight: bold; margin-bottom: 10px; color: #374151; }
        .footer { text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 Nova Solicitação de Reunião</h1>
          <p>IDE Negócios Digitais</p>
        </div>
        
        <div class="content">
          <h2>📋 Dados do Cliente</h2>
          
          <div class="field">
            <div class="label">Nome:</div>
            <div class="value">${data.name}</div>
          </div>
          
          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          
          <div class="field">
            <div class="label">Telefone:</div>
            <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
          </div>
          
          ${data.company ? `
          <div class="field">
            <div class="label">Empresa:</div>
            <div class="value">${data.company}</div>
          </div>
          ` : ''}
          
          ${data.message ? `
          <div class="field">
            <div class="label">Mensagem:</div>
            <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
          </div>
          ` : ''}
          
          <div class="utm-data">
            <div class="utm-title">📊 Dados de Marketing</div>
            
            <div class="field">
              <div class="label">Fonte:</div>
              <div class="value">${data.utm_source || 'Direct'}</div>
            </div>
            
            <div class="field">
              <div class="label">Mídia:</div>
              <div class="value">${data.utm_medium || 'Website'}</div>
            </div>
            
            <div class="field">
              <div class="label">Campanha:</div>
              <div class="value">${data.utm_campaign || 'Organic'}</div>
            </div>
            
            ${data.utm_term ? `
            <div class="field">
              <div class="label">Termo:</div>
              <div class="value">${data.utm_term}</div>
            </div>
            ` : ''}
            
            ${data.utm_content ? `
            <div class="field">
              <div class="label">Conteúdo:</div>
              <div class="value">${data.utm_content}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Página:</div>
              <div class="value"><a href="${data.page_url || 'N/A'}" target="_blank">${data.page_url || 'N/A'}</a></div>
            </div>
            
            <div class="field">
              <div class="label">Referrer:</div>
              <div class="value">${data.referrer || 'Direct'}</div>
            </div>
            
            <div class="field">
              <div class="label">Data/Hora:</div>
              <div class="value">${data.timestamp ? new Date(data.timestamp).toLocaleString('pt-BR') : new Date().toLocaleString('pt-BR')}</div>
            </div>
            
            <div class="field">
              <div class="label">Valor da Conversão:</div>
              <div class="value">R$ ${data.conversion_value || 100}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>Este email foi enviado automaticamente pelo sistema de formulários da IDE Negócios Digitais.</p>
            <p>Responda diretamente para o cliente: <a href="mailto:${data.email}">${data.email}</a></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
Nova Solicitação de Reunião - IDE Negócios Digitais

DADOS DO CLIENTE:
Nome: ${data.name}
Email: ${data.email}
Telefone: ${data.phone}
${data.company ? `Empresa: ${data.company}` : ''}
${data.message ? `Mensagem: ${data.message}` : ''}

DADOS DE MARKETING:
Fonte: ${data.utm_source || 'Direct'}
Mídia: ${data.utm_medium || 'Website'}
Campanha: ${data.utm_campaign || 'Organic'}
${data.utm_term ? `Termo: ${data.utm_term}` : ''}
${data.utm_content ? `Conteúdo: ${data.utm_content}` : ''}
Página: ${data.page_url || 'N/A'}
Referrer: ${data.referrer || 'Direct'}
Data/Hora: ${data.timestamp ? new Date(data.timestamp).toLocaleString('pt-BR') : new Date().toLocaleString('pt-BR')}
Valor da Conversão: R$ ${data.conversion_value || 100}

---
Este email foi enviado automaticamente pelo sistema de formulários da IDE Negócios Digitais.
Responda diretamente para o cliente: ${data.email}
  `;
  
  return { subject, html, text };
}

export async function POST(request: NextRequest) {
  try {
    console.log('API Route Email: Recebendo dados para envio de email');
    
    const body: MeetingFormData = await request.json();
    
    // Validar dados obrigatórios
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json({
        success: false,
        error: 'Dados obrigatórios não fornecidos (nome, email, telefone)'
      }, { status: 400 });
    }
    
    // Verificar se as configurações de email estão disponíveis
    if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
      console.warn('Configurações de email não encontradas. Email não será enviado.');
      return NextResponse.json({
        success: false,
        error: 'Configurações de email não disponíveis'
      }, { status: 503 });
    }
    
    // Criar transporter do nodemailer
    const transporter = nodemailer.createTransporter({
      host: env.SMTP_HOST,
      port: parseInt(env.SMTP_PORT),
      secure: env.SMTP_PORT === '465', // true para 465, false para outras portas
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
    
    // Verificar conexão
    await transporter.verify();
    console.log('API Route Email: Conexão SMTP verificada com sucesso');
    
    // Criar template do email
    const emailTemplate = createEmailTemplate(body);
    
    // Configurar email
    const mailOptions = {
      from: `"IDE Negócios Digitais" <${env.SMTP_FROM}>`,
      to: env.SMTP_TO,
      replyTo: body.email, // Permitir resposta direta para o cliente
      subject: emailTemplate.subject,
      text: emailTemplate.text,
      html: emailTemplate.html,
    };
    
    // Enviar email
    const info = await transporter.sendMail(mailOptions);
    console.log('API Route Email: Email enviado com sucesso:', info.messageId);
    
    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      message: 'Email enviado com sucesso'
    });
    
  } catch (error) {
    console.error('API Route Email: Erro ao enviar email:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido ao enviar email'
    }, { status: 500 });
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(request: NextRequest) {
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
