# Formulário de Contato - Configuração

## 📋 **Configuração do Formulário de Contato**

### **URL do Webhook:**
```
POST https://api.idenegociosdigitais.com.br/webhook/ide-contato
```

### **API Route Local:**
```
POST /api/contact
```

## 📊 **JSON Enviado pelo Formulário de Contato:**

```json
{
  "name": "João Silva",
  "email": "joao@empresa.com",
  "company": "(11) 99999-9999",
  "message": "Gostaria de saber mais sobre CRM B2B para minha empresa",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "crm_b2b_campaign",
  "utm_term": "crm b2b",
  "utm_content": "contact_form",
  "page_url": "https://idenegociosdigitais.com.br/#contato",
  "referrer": "https://google.com/search?q=crm+b2b",
  "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...",
  "timestamp": "2024-01-15T14:30:25.123Z",
  "form_type": "contact_form",
  "lead_source": "website",
  "lead_quality": "medium",
  "source": "IDE Negócios Digitais - Formulário de Contato",
  "conversion_value": 50,
  "currency": "BRL"
}
```

## 🔄 **Diferenças entre os Formulários:**

### **Formulário de Reunião (MeetingModal):**
- **Webhook**: `/api/webhook` → `https://api.idenegociosdigitais.com.br/webhook/marcar-reuniao`
- **Campos**: name, email, phone, company, message
- **Form Type**: `meeting_request`
- **Lead Quality**: `high`
- **Conversion Value**: `100`

### **Formulário de Contato (ContactSection):**
- **Webhook**: `/api/contact` → `https://api.idenegociosdigitais.com.br/webhook/ide-contato`
- **Campos**: name, email, company (telefone), message
- **Form Type**: `contact_form`
- **Lead Quality**: `medium`
- **Conversion Value**: `50`

## 📝 **Campos do Formulário de Contato:**

### **1. Dados do Cliente:**
- `name`: Nome completo (obrigatório)
- `email`: Email (obrigatório)
- `company`: Telefone (opcional)
- `message`: Mensagem (obrigatório)

### **2. Dados de Marketing:**
- `utm_source`: Origem do tráfego
- `utm_medium`: Meio de marketing
- `utm_campaign`: Nome da campanha
- `utm_term`: Termo de busca
- `utm_content`: Conteúdo específico

### **3. Dados da Sessão:**
- `page_url`: URL da página
- `referrer`: Página de referência
- `user_agent`: Navegador
- `timestamp`: Data/hora do envio

### **4. Dados de Conversão:**
- `form_type`: "contact_form"
- `lead_source`: "website"
- `lead_quality`: "medium"
- `conversion_value`: 50
- `currency`: "BRL"

## 🎯 **Funcionalidades Implementadas:**

### **1. Estados do Formulário:**
- ✅ **Loading**: Botão mostra "Enviando..."
- ✅ **Success**: Mensagem de sucesso verde
- ✅ **Error**: Mensagem de erro vermelha
- ✅ **Reset**: Formulário limpo após sucesso

### **2. Analytics:**
- ✅ **GA4**: Evento `form_submit` para `contact_form`
- ✅ **Meta Pixel**: Evento `Contact` e `FormSubmission`
- ✅ **Tracking**: Sucesso e falha

### **3. Logs de Debug:**
- ✅ **Frontend**: Logs no console
- ✅ **API Route**: Logs detalhados
- ✅ **Webhook**: Resposta do servidor

## 🔍 **Como Testar:**

### **1. Teste no Site:**
1. Acesse a seção de contato
2. Abra DevTools (F12)
3. Vá para Console
4. Preencha o formulário
5. Envie o formulário
6. Verifique os logs

### **2. Logs Esperados:**
```javascript
Enviando dados para webhook de contato: {
  url: "/api/contact",
  data: { ... }
}

Resposta do webhook de contato: {
  status: 200,
  statusText: "OK",
  ok: true
}
```

### **3. Teste Manual com cURL:**
```bash
curl -X POST https://api.idenegociosdigitais.com.br/webhook/ide-contato \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Teste Contato",
    "email": "teste@teste.com",
    "company": "(11) 99999-9999",
    "message": "Teste de formulário de contato",
    "form_type": "contact_form",
    "lead_source": "website",
    "lead_quality": "medium",
    "conversion_value": 50,
    "currency": "BRL"
  }'
```

## 📊 **Analytics e Tracking:**

### **1. Google Analytics 4:**
- **Evento**: `form_submit`
- **Categoria**: `engagement`
- **Label**: `contact_form`
- **Valor**: `50`

### **2. Meta Pixel:**
- **Evento**: `Contact`
- **Custom Event**: `FormSubmission`
- **Valor**: `50`
- **Moeda**: `BRL`

## 🚀 **Deploy e Configuração:**

### **1. Arquivos Criados:**
- ✅ `src/app/api/contact/route.ts` - API route para contato
- ✅ `src/components/sections/ContactSection.tsx` - Atualizado com webhook

### **2. Fluxo de Dados:**
```
ContactSection → /api/contact → https://api.idenegociosdigitais.com.br/webhook/ide-contato
```

### **3. Vantagens:**
- ✅ **Sem CORS**: API route resolve problema
- ✅ **Logs Completos**: Debug em todas as etapas
- ✅ **Analytics**: Tracking completo
- ✅ **UX**: Feedback visual para usuário

---

**Status**: ✅ Configurado e pronto para uso
**Webhook**: `https://api.idenegociosdigitais.com.br/webhook/ide-contato`
**API Route**: `/api/contact`
**Formulário**: ContactSection com dados de marketing
