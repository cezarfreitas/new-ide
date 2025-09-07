# Webhook Configuration

## 🔗 **Configuração do Webhook**

### **URL do Webhook:**
```
https://api.idenegociosdigitais.com.br/webhook/marcar-reuniao
```

### **Dados Enviados:**

#### **1. Dados do Formulário:**
```json
{
  "name": "Nome do Cliente",
  "email": "cliente@email.com",
  "phone": "(11) 99999-9999",
  "company": "Nome da Empresa",
  "message": "Mensagem do cliente"
}
```

#### **2. Dados de Marketing UTM:**
```json
{
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "crm_b2b",
  "utm_term": "crm b2b",
  "utm_content": "hero_button"
}
```

#### **3. Dados da Sessão:**
```json
{
  "page_url": "https://idenegociosdigitais.com.br/",
  "referrer": "https://google.com/",
  "user_agent": "Mozilla/5.0...",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

#### **4. Dados de Conversão:**
```json
{
  "form_type": "meeting_request",
  "lead_source": "website",
  "lead_quality": "high",
  "source": "IDE Negócios Digitais - Formulário de Contato",
  "conversion_value": 100,
  "currency": "BRL"
}
```

### **Exemplo Completo de Payload:**

```json
{
  "name": "João Silva",
  "email": "joao@empresa.com",
  "phone": "(11) 99999-9999",
  "company": "Empresa ABC",
  "message": "Gostaria de agendar uma reunião para implementar CRM",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "crm_b2b",
  "utm_term": "crm b2b",
  "utm_content": "hero_button",
  "page_url": "https://idenegociosdigitais.com.br/",
  "referrer": "https://google.com/",
  "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "form_type": "meeting_request",
  "lead_source": "website",
  "lead_quality": "high",
  "source": "IDE Negócios Digitais - Formulário de Contato",
  "conversion_value": 100,
  "currency": "BRL"
}
```

### **Headers da Requisição:**

```http
POST /webhook/marcar-reuniao HTTP/1.1
Host: api.idenegociosdigitais.com.br
Content-Type: application/json
Accept: application/json
```

### **Respostas Esperadas:**

#### **Sucesso (200):**
```json
{
  "success": true,
  "message": "Lead recebido com sucesso",
  "lead_id": "12345"
}
```

#### **Erro (400/500):**
```json
{
  "success": false,
  "error": "Dados inválidos",
  "details": "Email é obrigatório"
}
```

### **Implementação no Código:**

#### **1. MeetingModal.tsx:**
```typescript
const webhookUrl = 'https://api.idenegociosdigitais.com.br/webhook/marcar-reuniao';

const marketingData = {
  ...formData,
  // Dados UTM
  utm_source: new URLSearchParams(window.location.search).get('utm_source') || 'direct',
  utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || 'website',
  utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || 'organic',
  // Dados da sessão
  page_url: window.location.href,
  referrer: document.referrer,
  user_agent: navigator.userAgent,
  timestamp: new Date().toISOString(),
  // Dados de conversão
  conversion_value: 100,
  currency: 'BRL',
};
```

### **Tracking de Eventos:**

#### **1. Google Analytics 4:**
- ✅ **Evento**: `form_submit`
- ✅ **Categoria**: `engagement`
- ✅ **Label**: `meeting_form`
- ✅ **Valor**: `100`

#### **2. Meta Pixel:**
- ✅ **Evento**: `Lead`
- ✅ **Valor**: `100`
- ✅ **Moeda**: `BRL`
- ✅ **Custom Event**: `FormSubmission`

### **Teste do Webhook:**

#### **1. Teste Local:**
```bash
curl -X POST https://api.idenegociosdigitais.com.br/webhook/marcar-reuniao \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@teste.com",
    "phone": "(11) 99999-9999",
    "company": "Empresa Teste",
    "message": "Teste de webhook"
  }'
```

#### **2. Teste no Site:**
1. Acesse o site
2. Preencha o formulário
3. Envie o formulário
4. Verifique se o webhook foi chamado
5. Confirme os dados recebidos

### **Monitoramento:**

#### **1. Logs do Webhook:**
- Verificar se as requisições estão chegando
- Monitorar erros e sucessos
- Analisar dados de marketing

#### **2. Analytics:**
- Verificar eventos no GA4
- Confirmar conversões no Meta Pixel
- Analisar qualidade dos leads

### **Próximos Passos:**

1. **Deploy**: Fazer deploy com webhook configurado
2. **Teste**: Verificar se está funcionando
3. **Monitoramento**: Acompanhar logs e analytics
4. **Otimização**: Ajustar baseado nos dados
5. **Integração**: Conectar com CRM/Email marketing

---

**Status**: ✅ Configurado e pronto para uso
**URL**: `https://api.idenegociosdigitais.com.br/webhook/marcar-reuniao`
**Dados**: Formulário + Marketing + Analytics
