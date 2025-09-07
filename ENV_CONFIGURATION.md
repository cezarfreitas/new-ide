# Configuração de Variáveis de Ambiente - IDE Negócios Digitais

## 📋 **Arquivo .env.local**

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# ===========================================
# CONFIGURAÇÕES DE ANALYTICS E TRACKING
# ===========================================

# Google Analytics 4 (GA4)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-G1YXN755WQ

# Meta Pixel (Facebook)
NEXT_PUBLIC_META_PIXEL_ID=1234567890123456

# ===========================================
# WEBHOOK PARA FORMULÁRIOS
# ===========================================

# URL do webhook para envio de formulários
NEXT_PUBLIC_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/your-webhook-url

# ===========================================
# CÓDIGOS DE VERIFICAÇÃO DE DOMÍNIO
# ===========================================

# Google Search Console
NEXT_PUBLIC_GOOGLE_VERIFICATION=G-G1YXN755WQ

# Facebook Business Manager
NEXT_PUBLIC_FACEBOOK_VERIFICATION=your-facebook-verification-code

# Pinterest
NEXT_PUBLIC_PINTEREST_VERIFICATION=your-pinterest-verification-code

# Yandex
NEXT_PUBLIC_YANDEX_VERIFICATION=your-yandex-verification-code

# Yahoo
NEXT_PUBLIC_YAHOO_VERIFICATION=your-yahoo-verification-code

# ===========================================
# CONFIGURAÇÕES DO SITE
# ===========================================

# URL base do site
NEXT_PUBLIC_SITE_URL=https://idenegociosdigitais.com.br

# Nome da empresa
NEXT_PUBLIC_COMPANY_NAME=IDE Negócios Digitais

# Email de contato
NEXT_PUBLIC_CONTACT_EMAIL=contato@idenegociosdigitais.com.br

# Telefone de contato
NEXT_PUBLIC_CONTACT_PHONE=+55-11-99999-9999

# ===========================================
# REDES SOCIAIS
# ===========================================

# Twitter/X
NEXT_PUBLIC_TWITTER_HANDLE=@idenegociosdigitais

# Instagram
NEXT_PUBLIC_INSTAGRAM_HANDLE=@idenegociosdigitais

# LinkedIn
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/company/ide-negocios-digitais

# Facebook
NEXT_PUBLIC_FACEBOOK_URL=https://www.facebook.com/idenegociosdigitais

# ===========================================
# CONFIGURAÇÕES DE DESENVOLVIMENTO
# ===========================================

# Ambiente (development, production)
NODE_ENV=development

# Debug mode
NEXT_PUBLIC_DEBUG=false
```

## 🔧 **Como Configurar**

### **1. Criar o arquivo .env.local:**
```bash
# Na raiz do projeto
touch .env.local
```

### **2. Copiar as variáveis:**
- Copie o conteúdo acima para o arquivo `.env.local`
- Substitua os valores pelos reais

### **3. Configurações Obrigatórias:**
```env
# Essas são as configurações mínimas necessárias
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-G1YXN755WQ
NEXT_PUBLIC_GOOGLE_VERIFICATION=G-G1YXN755WQ
NEXT_PUBLIC_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/your-webhook-url
```

## 📊 **Configurações por Plataforma**

### **Google Analytics 4:**
1. Acesse [Google Analytics](https://analytics.google.com/)
2. Crie uma propriedade GA4
3. Copie o Measurement ID (formato: G-XXXXXXXXXX)
4. Configure: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-G1YXN755WQ`

### **Google Search Console:**
1. Acesse [Google Search Console](https://search.google.com/search-console)
2. Adicione sua propriedade
3. Use o mesmo código do GA4: `NEXT_PUBLIC_GOOGLE_VERIFICATION=G-G1YXN755WQ`

### **Meta Pixel (Facebook):**
1. Acesse [Facebook Business Manager](https://business.facebook.com/)
2. Vá para "Eventos" > "Pixels"
3. Copie o Pixel ID: `NEXT_PUBLIC_META_PIXEL_ID=1234567890123456`

### **Webhook (Formulários):**
```env
# Zapier
NEXT_PUBLIC_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/your-webhook-url

# Make (Integromat)
NEXT_PUBLIC_WEBHOOK_URL=https://hook.eu1.make.com/your-webhook-url

# Webhook.site (para testes)
NEXT_PUBLIC_WEBHOOK_URL=https://webhook.site/your-unique-url

# API Customizada
NEXT_PUBLIC_WEBHOOK_URL=https://your-api.com/webhook/contact-form
```

## 🔒 **Segurança**

### **⚠️ IMPORTANTE:**
- **NUNCA** commite o arquivo `.env.local`
- **SEMPRE** adicione `.env.local` ao `.gitignore`
- **USE** apenas variáveis `NEXT_PUBLIC_` para o frontend
- **MANTENHA** variáveis sensíveis no servidor

### **Arquivo .gitignore:**
```gitignore
# Environment variables
.env.local
.env.development.local
.env.test.local
.env.production.local
```

## 🚀 **Deploy em Produção**

### **Vercel:**
1. Acesse o dashboard do Vercel
2. Vá para "Settings" > "Environment Variables"
3. Adicione todas as variáveis do `.env.local`

### **Netlify:**
1. Acesse o dashboard do Netlify
2. Vá para "Site settings" > "Environment variables"
3. Adicione todas as variáveis

### **Outros Serviços:**
- Configure as variáveis de ambiente no painel do servidor
- Use o mesmo formato: `NEXT_PUBLIC_VARIAVEL=valor`

## 🧪 **Testando as Configurações**

### **1. Verificar se as variáveis estão carregando:**
```javascript
// No console do navegador
console.log(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
```

### **2. Testar Google Analytics:**
- Abra o DevTools
- Vá para "Network"
- Procure por requests para `google-analytics.com`

### **3. Testar Meta Pixel:**
- Abra o DevTools
- Vá para "Network"
- Procure por requests para `facebook.com`

### **4. Testar Webhook:**
- Preencha o formulário de contato
- Verifique se os dados chegam no webhook configurado

## 📋 **Checklist de Configuração**

- [ ] Arquivo `.env.local` criado
- [ ] Google Analytics configurado
- [ ] Google Search Console configurado
- [ ] Meta Pixel configurado
- [ ] Webhook configurado
- [ ] Códigos de verificação adicionados
- [ ] Variáveis testadas em desenvolvimento
- [ ] Variáveis configuradas em produção
- [ ] `.env.local` adicionado ao `.gitignore`

## 🆘 **Troubleshooting**

### **Variáveis não carregam:**
- Verifique se o arquivo está na raiz do projeto
- Confirme se as variáveis começam com `NEXT_PUBLIC_`
- Reinicie o servidor de desenvolvimento

### **Analytics não funciona:**
- Verifique se o código está correto
- Confirme se o site está em produção
- Teste com o Google Analytics Debugger

### **Webhook não recebe dados:**
- Verifique se a URL está correta
- Teste a URL manualmente
- Confirme se o webhook está ativo

Com essas configurações, o site estará totalmente funcional e otimizado! 🚀
