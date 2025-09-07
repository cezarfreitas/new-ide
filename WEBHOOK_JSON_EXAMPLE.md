# JSON do Formulário de Reuniões

## 📋 **Estrutura Completa do JSON**

### **URL do Webhook:**
```
POST https://api.idenegociosdigitais.com.br/webhook/marcar-reuniao
```

### **Headers:**
```http
Content-Type: application/json
Accept: application/json
```

### **JSON Completo Enviado:**

```json
{
  "name": "João Silva",
  "email": "joao@empresa.com",
  "phone": "(11) 99999-9999",
  "company": "Empresa ABC Ltda",
  "message": "Gostaria de agendar uma reunião para implementar CRM B2B na nossa empresa",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "crm_b2b_campaign",
  "utm_term": "crm b2b",
  "utm_content": "hero_button",
  "page_url": "https://idenegociosdigitais.com.br/",
  "referrer": "https://google.com/search?q=crm+b2b",
  "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "timestamp": "2024-01-15T14:30:25.123Z",
  "form_type": "meeting_request",
  "lead_source": "website",
  "lead_quality": "high",
  "source": "IDE Negócios Digitais - Formulário de Contato",
  "conversion_value": 100,
  "currency": "BRL"
}
```

## 📊 **Detalhamento dos Campos:**

### **1. Dados do Formulário (formData):**
```json
{
  "name": "João Silva",           // Nome completo do cliente
  "email": "joao@empresa.com",    // Email do cliente
  "phone": "(11) 99999-9999",     // Telefone do cliente
  "company": "Empresa ABC Ltda",  // Nome da empresa
  "message": "Gostaria de agendar uma reunião para implementar CRM B2B na nossa empresa"  // Mensagem do cliente
}
```

### **2. Dados de Marketing UTM:**
```json
{
  "utm_source": "google",         // Origem do tráfego (google, facebook, direct, etc.)
  "utm_medium": "cpc",            // Meio de marketing (cpc, organic, social, etc.)
  "utm_campaign": "crm_b2b_campaign",  // Nome da campanha
  "utm_term": "crm b2b",          // Termo de busca (para campanhas de busca)
  "utm_content": "hero_button"    // Conteúdo específico (botão, banner, etc.)
}
```

### **3. Dados da Sessão:**
```json
{
  "page_url": "https://idenegociosdigitais.com.br/",  // URL da página atual
  "referrer": "https://google.com/search?q=crm+b2b",  // Página de referência
  "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...",  // Navegador do usuário
  "timestamp": "2024-01-15T14:30:25.123Z"  // Data/hora do envio (ISO 8601)
}
```

### **4. Dados de Conversão:**
```json
{
  "form_type": "meeting_request",  // Tipo do formulário
  "lead_source": "website",        // Fonte do lead
  "lead_quality": "high",          // Qualidade do lead
  "source": "IDE Negócios Digitais - Formulário de Contato",  // Descrição da fonte
  "conversion_value": 100,         // Valor estimado da conversão
  "currency": "BRL"                // Moeda do valor
}
```

## 🔄 **Exemplos de Valores UTM:**

### **Tráfego Orgânico:**
```json
{
  "utm_source": "direct",
  "utm_medium": "website",
  "utm_campaign": "organic",
  "utm_term": "",
  "utm_content": ""
}
```

### **Google Ads:**
```json
{
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "crm_b2b_ads",
  "utm_term": "crm b2b",
  "utm_content": "hero_button"
}
```

### **Facebook Ads:**
```json
{
  "utm_source": "facebook",
  "utm_medium": "cpc",
  "utm_campaign": "facebook_crm_campaign",
  "utm_term": "",
  "utm_content": "carousel_ad"
}
```

### **LinkedIn:**
```json
{
  "utm_source": "linkedin",
  "utm_medium": "social",
  "utm_campaign": "linkedin_crm_campaign",
  "utm_term": "",
  "utm_content": "sponsored_post"
}
```

## 📝 **Exemplo de Teste:**

### **cURL para Teste:**
```bash
curl -X POST https://api.idenegociosdigitais.com.br/webhook/marcar-reuniao \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Teste Webhook",
    "email": "teste@teste.com",
    "phone": "(11) 99999-9999",
    "company": "Empresa Teste",
    "message": "Teste de webhook",
    "utm_source": "test",
    "utm_medium": "manual",
    "utm_campaign": "webhook_test",
    "utm_term": "",
    "utm_content": "",
    "page_url": "https://teste.com",
    "referrer": "",
    "user_agent": "Mozilla/5.0 (Test Browser)",
    "timestamp": "2024-01-15T14:30:25.123Z",
    "form_type": "meeting_request",
    "lead_source": "website",
    "lead_quality": "high",
    "source": "IDE Negócios Digitais - Formulário de Contato",
    "conversion_value": 100,
    "currency": "BRL"
  }'
```

## 🔍 **Como Verificar no Console:**

### **1. Abrir DevTools (F12)**
### **2. Ir para aba Console**
### **3. Enviar formulário**
### **4. Verificar log:**
```javascript
Enviando dados para webhook: {
  url: "https://api.idenegociosdigitais.com.br/webhook-test/marcar-reuniao",
  data: {
    name: "João Silva",
    email: "joao@empresa.com",
    phone: "(11) 99999-9999",
    company: "Empresa ABC",
    message: "Gostaria de agendar uma reunião",
    utm_source: "direct",
    utm_medium: "website",
    utm_campaign: "organic",
    utm_term: "",
    utm_content: "",
    page_url: "https://idenegociosdigitais.com.br/",
    referrer: "",
    user_agent: "Mozilla/5.0...",
    timestamp: "2024-01-15T14:30:25.123Z",
    form_type: "meeting_request",
    lead_source: "website",
    lead_quality: "high",
    source: "IDE Negócios Digitais - Formulário de Contato",
    conversion_value: 100,
    currency: "BRL"
  }
}
```

---

**Total de Campos**: 20 campos
**Dados do Cliente**: 5 campos
**Dados de Marketing**: 5 campos  
**Dados da Sessão**: 4 campos
**Dados de Conversão**: 6 campos
