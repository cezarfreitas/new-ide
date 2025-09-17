'use client';

import { useState } from 'react';

export default function TestEmailPage() {
  const [formData, setFormData] = useState({
    // Configurações SMTP
    smtpHost: '',
    smtpPort: '587',
    smtpUser: '',
    smtpPass: '',
    smtpSecure: false,
    
    // Dados do email
    to: '',
    subject: 'Teste de Email - IDE Negócios Digitais',
    message: 'Este é um email de teste enviado via SMTP.'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult({ success: true, message: 'Email enviado com sucesso!' });
      } else {
        setResult({ success: false, message: data.error || 'Erro ao enviar email' });
      }
    } catch (error) {
      setResult({ success: false, message: 'Erro de conexão: ' + (error as Error).message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">
            Teste de Envio de Email SMTP
          </h1>
          <p className="text-gray-300">
            Configure as credenciais SMTP e teste o envio de emails
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário de Configuração */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-6">
              Configurações SMTP
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Host SMTP */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Host SMTP
                </label>
                <input
                  type="text"
                  name="smtpHost"
                  value={formData.smtpHost}
                  onChange={handleInputChange}
                  placeholder="smtp.gmail.com"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                  required
                />
              </div>

              {/* Porta SMTP */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Porta SMTP
                </label>
                <input
                  type="number"
                  name="smtpPort"
                  value={formData.smtpPort}
                  onChange={handleInputChange}
                  placeholder="587"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                  required
                />
              </div>

              {/* Usuário SMTP */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Usuário/Email
                </label>
                <input
                  type="email"
                  name="smtpUser"
                  value={formData.smtpUser}
                  onChange={handleInputChange}
                  placeholder="seu-email@gmail.com"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                  required
                />
              </div>

              {/* Senha SMTP */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Senha/App Password
                </label>
                <input
                  type="password"
                  name="smtpPass"
                  value={formData.smtpPass}
                  onChange={handleInputChange}
                  placeholder="Sua senha ou app password"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                  required
                />
              </div>

              {/* SSL/TLS */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="smtpSecure"
                  checked={formData.smtpSecure}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500"
                />
                <label className="text-sm text-gray-300">
                  Usar SSL/TLS (porta 465)
                </label>
              </div>

              <hr className="border-gray-700 my-6" />

              {/* Dados do Email */}
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">
                Dados do Email
              </h3>

              {/* Para */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Para (Email de destino)
                </label>
                <input
                  type="email"
                  name="to"
                  value={formData.to}
                  onChange={handleInputChange}
                  placeholder="destino@exemplo.com"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                  required
                />
              </div>

              {/* Assunto */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Assunto
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                  required
                />
              </div>

              {/* Mensagem */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mensagem
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none resize-none"
                  required
                />
              </div>

              {/* Botão de Envio */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-bold py-4 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Enviando...' : 'Enviar Email de Teste'}
              </button>
            </form>
          </div>

          {/* Resultado */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-6">
              Resultado do Teste
            </h2>
            
            {result ? (
              <div className={`p-4 rounded-lg ${
                result.success 
                  ? 'bg-green-900/50 border border-green-500 text-green-300' 
                  : 'bg-red-900/50 border border-red-500 text-red-300'
              }`}>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {result.success ? '✅' : '❌'}
                  </span>
                  <div>
                    <p className="font-semibold">
                      {result.success ? 'Sucesso!' : 'Erro!'}
                    </p>
                    <p className="text-sm mt-1">{result.message}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-center py-8">
                <p>Configure as credenciais e envie um email de teste</p>
              </div>
            )}

            {/* Informações de Ajuda */}
            <div className="mt-8 p-4 bg-blue-900/30 border border-blue-500/50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                💡 Dicas de Configuração
              </h3>
              <ul className="text-sm text-blue-200 space-y-2">
                <li>• <strong>Gmail:</strong> smtp.gmail.com, porta 587, use App Password</li>
                <li>• <strong>Outlook:</strong> smtp-mail.outlook.com, porta 587</li>
                <li>• <strong>Yahoo:</strong> smtp.mail.yahoo.com, porta 587</li>
                <li>• <strong>Hotmail:</strong> smtp.live.com, porta 587</li>
                <li>• Para Gmail, ative a verificação em 2 etapas e gere um App Password</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

