import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const {
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPass,
      smtpSecure,
      to,
      subject,
      message
    } = await request.json();

    // Validação dos dados
    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !to || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Configuração do transporter SMTP
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: smtpSecure, // true para porta 465, false para outras portas
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      // Configurações adicionais para melhor compatibilidade
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verificar conexão SMTP
    await transporter.verify();

    // Configuração do email
    const mailOptions = {
      from: smtpUser,
      to: to,
      subject: subject,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #fbbf24, #f59e0b); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #000; margin: 0; text-align: center;">
              🚀 IDE Negócios Digitais
            </h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #374151; margin-top: 0;">
              ${subject}
            </h2>
            <div style="color: #6b7280; line-height: 1.6; white-space: pre-line;">
              ${message}
            </div>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="color: #9ca3af; font-size: 14px; margin: 0;">
              Este email foi enviado via sistema de teste SMTP da IDE Negócios Digitais.
            </p>
          </div>
        </div>
      `
    };

    // Enviar email
    const info = await transporter.sendMail(mailOptions);

    // Log detalhado da resposta
    console.log('📧 Email enviado com sucesso:', {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      pending: info.pending,
      response: info.response,
      envelope: info.envelope
    });

    return NextResponse.json({
      success: true,
      message: 'Email enviado com sucesso!',
      messageId: info.messageId,
      details: {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        timestamp: new Date().toISOString(),
        smtpResponse: info.response,
        accepted: info.accepted,
        rejected: info.rejected,
        envelope: info.envelope
      }
    });

  } catch (error: unknown) {
    // Log detalhado do erro
    const errorObj = error as Record<string, unknown>;
    console.error('❌ Erro ao enviar email:', {
      code: errorObj.code,
      message: errorObj.message,
      command: errorObj.command,
      response: errorObj.response,
      responseCode: errorObj.responseCode,
      stack: errorObj.stack
    });
    
    // Tratar diferentes tipos de erro
    let errorMessage = 'Erro desconhecido ao enviar email';
    let errorDetails: Record<string, unknown> = {};
    
    if (errorObj.code === 'EAUTH') {
      errorMessage = 'Erro de autenticação. Verifique usuário e senha.';
      errorDetails = { suggestion: 'Para Gmail, use App Password em vez da senha normal' };
    } else if (errorObj.code === 'ECONNECTION') {
      errorMessage = 'Erro de conexão. Verifique host e porta SMTP.';
      errorDetails = { suggestion: 'Verifique se o host e porta estão corretos' };
    } else if (errorObj.code === 'ETIMEDOUT') {
      errorMessage = 'Timeout de conexão. Verifique as configurações de rede.';
      errorDetails = { suggestion: 'Verifique sua conexão com a internet' };
    } else if (errorObj.code === 'EENVELOPE') {
      errorMessage = 'Erro no envelope do email. Verifique os endereços.';
      errorDetails = { suggestion: 'Verifique se os emails estão no formato correto' };
    } else if (errorObj.message) {
      errorMessage = String(errorObj.message);
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        code: errorObj.code || 'UNKNOWN_ERROR',
        details: {
          ...errorDetails,
          command: errorObj.command,
          response: errorObj.response,
          responseCode: errorObj.responseCode,
          timestamp: new Date().toISOString()
        }
      },
      { status: 500 }
    );
  }
}

