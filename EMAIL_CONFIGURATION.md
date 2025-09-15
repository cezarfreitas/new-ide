# 📧 Configuração de Email para Formulário de Reunião

## 🎯 **Visão Geral**

O sistema agora suporta **envio duplo** para formulários de reunião:
1. **Webhook** (sistema atual) - para integração com CRM/marketing
2. **Email** (novo) - para notificação direta por email

## ⚙️ **Configuração das Variáveis de Ambiente**

Adicione as seguintes variáveis ao seu arquivo `.env.local`:

```bash
# Configurações SMTP para envio de email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app
SMTP_FROM=contato@idenegociosdigitais.com.br
SMTP_TO=contato@idenegociosdigitais.com.br
```

### **Exemplos de Configuração por Provedor:**

#### **Gmail:**
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app  # Use App Password, não a senha normal
```

#### **Outlook/Hotmail:**
```bash
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=seu-email@outlook.com
SMTP_PASS=sua-senha
```

#### **Yahoo:**
```bash
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=seu-email@yahoo.com
SMTP_PASS=sua-senha-de-app
```

#### **Provedor Personalizado:**
```bash
SMTP_HOST=mail.seuprovedor.com
SMTP_PORT=587  # ou 465 para SSL
SMTP_USER=seu-email@seudominio.com
SMTP_PASS=sua-senha
```

## 🔐 **Configuração de Senha de App (Gmail)**

Para usar Gmail, você precisa criar uma **Senha de App**:

1. Acesse [myaccount.google.com](https://myaccount.google.com)
2. Vá em **Segurança** → **Verificação em duas etapas**
3. Ative a verificação em duas etapas se não estiver ativa
4. Vá em **Senhas de app**
5. Selecione **Outro (nome personalizado)**
6. Digite "IDE Negócios Digitais"
7. Copie a senha gerada e use no `SMTP_PASS`

## 📋 **Como Funciona**

### **1. Envio Duplo:**
- O formulário envia dados para **webhook** E **email** simultaneamente
- Se um falhar, o outro ainda funciona
- O usuário vê sucesso se pelo menos um funcionar

### **2. Template de Email:**
- Email HTML responsivo e profissional
- Inclui todos os dados do formulário
- Dados de marketing (UTM) organizados
- Link direto para responder ao cliente

### **3. Dados Incluídos no Email:**
- ✅ Nome, email, telefone, empresa
- ✅ Mensagem do cliente
- ✅ Dados UTM (fonte, campanha, etc.)
- ✅ URL da página, referrer
- ✅ Data/hora da solicitação
- ✅ Valor da conversão

## 🧪 **Teste da Configuração**

### **1. Teste Local:**
```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Teste o formulário no site
# Verifique os logs no console
```

### **2. Teste da API de Email:**
```bash
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@teste.com",
    "phone": "(11) 99999-9999",
    "company": "Empresa Teste",
    "message": "Teste de envio de email"
  }'
```

## 📊 **Monitoramento**

### **1. Logs do Servidor:**
```bash
# Verifique os logs para:
- Conexão SMTP verificada
- Email enviado com sucesso
- Erros de configuração
```

### **2. Status do Envio:**
- ✅ **Sucesso**: Pelo menos um envio funcionou
- ❌ **Erro**: Ambos os envios falharam
- ⚠️ **Parcial**: Webhook OK, email falhou (ou vice-versa)

## 🔧 **Solução de Problemas**

### **Erro: "Configurações de email não disponíveis"**
- Verifique se as variáveis SMTP estão definidas
- Confirme se não há espaços extras nas variáveis

### **Erro: "Authentication failed"**
- Verifique usuário e senha
- Para Gmail, use Senha de App
- Confirme se 2FA está ativado (Gmail)

### **Erro: "Connection timeout"**
- Verifique o host e porta SMTP
- Confirme se o firewall permite a conexão
- Teste com outro provedor

### **Email não chega:**
- Verifique a pasta de spam
- Confirme se `SMTP_TO` está correto
- Teste enviando para outro email

## 🚀 **Deploy em Produção**

### **1. Variáveis de Ambiente:**
```bash
# No seu provedor de hosting (Vercel, Netlify, etc.)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contato@idenegociosdigitais.com.br
SMTP_PASS=sua-senha-de-app
SMTP_FROM=contato@idenegociosdigitais.com.br
SMTP_TO=contato@idenegociosdigitais.com.br
```

### **2. Teste em Produção:**
- Envie um formulário de teste
- Verifique se o email chegou
- Confirme se o webhook também funcionou

## 📈 **Vantagens do Sistema Duplo**

1. **Redundância**: Se webhook falhar, email ainda funciona
2. **Notificação Imediata**: Email chega instantaneamente
3. **Dados Completos**: Template rico com todas as informações
4. **Resposta Direta**: Pode responder diretamente para o cliente
5. **Backup**: Email serve como backup dos leads

## 🎨 **Personalização do Template**

O template de email está em `src/app/api/email/route.ts` na função `createEmailTemplate()`.

Você pode personalizar:
- Cores e estilo
- Layout e organização
- Informações exibidas
- Texto e mensagens

---

**Status**: ✅ Implementado e pronto para uso
**Funcionalidade**: Envio duplo (Webhook + Email)
**Configuração**: Variáveis de ambiente SMTP
**Template**: Email HTML responsivo e profissional
