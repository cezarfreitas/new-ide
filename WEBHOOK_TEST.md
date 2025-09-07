# Teste do Webhook

## 🔍 **Verificação do Webhook**

### **URL de Teste:**
```
https://api.idenegociosdigitais.com.br/webhook-test/marcar-reuniao
```

### **Como Testar:**

#### **1. Teste Manual com cURL:**
```bash
curl -X POST https://api.idenegociosdigitais.com.br/webhook-test/marcar-reuniao \
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
    "page_url": "https://teste.com",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "form_type": "meeting_request",
    "lead_source": "website",
    "lead_quality": "high",
    "conversion_value": 100,
    "currency": "BRL"
  }'
```

#### **2. Teste no Site:**
1. Acesse o site
2. Abra o DevTools (F12)
3. Vá para a aba Console
4. Clique em "Marcar Reunião"
5. Preencha o formulário
6. Envie o formulário
7. Verifique os logs no console

### **Logs Esperados:**

#### **1. Antes do Envio:**
```javascript
Enviando dados para webhook: {
  url: "https://api.idenegociosdigitais.com.br/webhook-test/marcar-reuniao",
  data: {
    name: "Nome do Cliente",
    email: "cliente@email.com",
    phone: "(11) 99999-9999",
    company: "Empresa",
    message: "Mensagem",
    utm_source: "direct",
    utm_medium: "website",
    utm_campaign: "organic",
    page_url: "https://idenegociosdigitais.com.br/",
    referrer: "",
    user_agent: "Mozilla/5.0...",
    timestamp: "2024-01-15T10:30:00.000Z",
    form_type: "meeting_request",
    lead_source: "website",
    lead_quality: "high",
    conversion_value: 100,
    currency: "BRL"
  }
}
```

#### **2. Resposta do Servidor:**
```javascript
Resposta do webhook: {
  status: 200,
  statusText: "OK",
  ok: true
}
```

### **Possíveis Problemas:**

#### **1. CORS Error:**
```
Access to fetch at 'https://api.idenegociosdigitais.com.br/webhook-test/marcar-reuniao' 
from origin 'https://idenegociosdigitais.com.br' has been blocked by CORS policy
```

**Solução**: Configurar CORS no servidor do webhook

#### **2. 404 Not Found:**
```
Resposta do webhook: {
  status: 404,
  statusText: "Not Found",
  ok: false
}
```

**Solução**: Verificar se a URL do webhook está correta

#### **3. 500 Internal Server Error:**
```
Resposta do webhook: {
  status: 500,
  statusText: "Internal Server Error",
  ok: false
}
```

**Solução**: Verificar logs do servidor do webhook

#### **4. Network Error:**
```
Erro ao enviar formulário: TypeError: Failed to fetch
```

**Solução**: Verificar conectividade e URL

### **Debugging:**

#### **1. Verificar Network Tab:**
1. Abra DevTools (F12)
2. Vá para aba Network
3. Envie o formulário
4. Procure pela requisição POST
5. Verifique status, headers e response

#### **2. Verificar Console:**
1. Abra DevTools (F12)
2. Vá para aba Console
3. Envie o formulário
4. Verifique os logs de debug

#### **3. Testar URL Diretamente:**
1. Abra o navegador
2. Acesse: `https://api.idenegociosdigitais.com.br/webhook-test/marcar-reuniao`
3. Verifique se retorna alguma resposta

### **Configurações do Servidor:**

#### **1. CORS Headers:**
```
Access-Control-Allow-Origin: https://idenegociosdigitais.com.br
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Accept
```

#### **2. Content-Type:**
```
Content-Type: application/json
Accept: application/json
```

### **Próximos Passos:**

1. **Teste Local**: Verificar se o webhook responde
2. **Teste no Site**: Enviar formulário e verificar logs
3. **Verificar CORS**: Se houver erro de CORS
4. **Verificar Servidor**: Se o endpoint está funcionando
5. **Ajustar Configurações**: Baseado nos resultados

---

**Status**: 🔍 Em teste
**URL**: `https://api.idenegociosdigitais.com.br/webhook-test/marcar-reuniao`
**Debug**: Logs adicionados ao console
