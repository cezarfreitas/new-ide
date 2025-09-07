# Solução para Erro de CORS

## 🚫 **Problema Identificado:**

```
Access to fetch at 'https://api.idenegociosdigitais.com.br/webhook-test/marcar-reuniao' 
from origin 'https://ide-site-ide.jzo3qo.easypanel.host' 
has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## ✅ **Soluções Possíveis:**

### **1. Configurar CORS no Servidor (Recomendado)**

#### **Headers necessários no servidor:**
```http
Access-Control-Allow-Origin: https://ide-site-ide.jzo3qo.easypanel.host
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Accept
Access-Control-Max-Age: 86400
```

#### **Para permitir todos os domínios (desenvolvimento):**
```http
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Accept
```

### **2. Usar Proxy do Next.js (Solução Imediata)**

Vou criar uma API route no Next.js que fará o proxy para o webhook:

#### **Criar: `src/app/api/webhook/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch('https://api.idenegociosdigitais.com.br/webhook-test/marcar-reuniao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.text();
    
    return NextResponse.json({
      success: response.ok,
      status: response.status,
      data: data
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
```

### **3. Atualizar o Formulário para Usar o Proxy**

#### **Alterar URL no MeetingModal.tsx:**
```typescript
// Em vez de:
const webhookUrl = 'https://api.idenegociosdigitais.com.br/webhook-test/marcar-reuniao';

// Usar:
const webhookUrl = '/api/webhook';
```

## 🔧 **Implementação da Solução:**

Vou implementar a solução do proxy do Next.js que é a mais rápida e eficaz.
