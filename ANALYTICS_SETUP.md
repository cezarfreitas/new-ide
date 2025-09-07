# Configuração de Analytics - IDE Negócios Digitais

Este projeto inclui integração completa com Google Analytics 4 (GA4) e Meta Pixel (Facebook Pixel) para tracking de eventos e conversões.

## 📊 Google Analytics 4 (GA4)

### Configuração

1. **Criar arquivo `.env.local` na raiz do projeto:**
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

2. **Obter o Measurement ID:**
   - Acesse [Google Analytics](https://analytics.google.com/)
   - Crie uma propriedade GA4
   - Copie o Measurement ID (formato: G-XXXXXXXXXX)

### Eventos Trackados

- **Page Views**: Automático em todas as páginas
- **Form Submissions**: Sucesso/falha do formulário de contato
- **Button Clicks**: Cliques nos botões "Marcar Reunião"
- **Scroll Depth**: Profundidade de scroll (quando implementado)
- **Time on Page**: Tempo na página (quando implementado)

## 📱 Meta Pixel (Facebook Pixel)

### Configuração

1. **Adicionar ao arquivo `.env.local`:**
```env
NEXT_PUBLIC_META_PIXEL_ID=1234567890123456
```

2. **Obter o Pixel ID:**
   - Acesse [Facebook Business Manager](https://business.facebook.com/)
   - Vá para "Eventos" > "Pixels"
   - Copie o Pixel ID (números)

### Eventos Trackados

- **PageView**: Automático em todas as páginas
- **Lead**: Quando formulário é enviado com sucesso
- **Contact**: Quando formulário de contato é preenchido
- **FormSubmission**: Sucesso/falha do formulário
- **ButtonClick**: Cliques nos botões "Marcar Reunião"

## 🔧 Webhook para Formulários

### Configuração

1. **Adicionar ao arquivo `.env.local`:**
```env
NEXT_PUBLIC_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/your-webhook-url
```

### Opções de Webhook

- **Zapier**: `https://hooks.zapier.com/hooks/catch/your-webhook-url`
- **Make (Integromat)**: `https://hook.eu1.make.com/your-webhook-url`
- **Webhook.site**: `https://webhook.site/your-unique-url`
- **API Customizada**: `https://your-api.com/webhook/contact-form`

## 📋 Arquivo .env.local Completo

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Meta Pixel
NEXT_PUBLIC_META_PIXEL_ID=1234567890123456

# Webhook para formulários
NEXT_PUBLIC_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/your-webhook-url
```

## 🚀 Como Usar

### 1. Tracking Manual de Eventos

```typescript
import { useAnalytics } from '@/hooks/useAnalytics';
import { useMetaPixel } from '@/hooks/useMetaPixel';

function MyComponent() {
  const { trackEvent, trackButtonClick } = useAnalytics();
  const { trackLead, trackCustomEvent } = useMetaPixel();

  const handleClick = () => {
    // Track no GA4
    trackButtonClick('meu_botao', 'secao_hero');
    
    // Track no Meta Pixel
    trackCustomEvent('CustomEvent', { button_name: 'meu_botao' });
  };

  return <button onClick={handleClick}>Meu Botão</button>;
}
```

### 2. Eventos Automáticos

- **Page Views**: Automático em todas as páginas
- **Form Submissions**: Automático no modal de contato
- **Button Clicks**: Automático nos botões "Marcar Reunião"

## 📈 Relatórios e Métricas

### Google Analytics 4
- Acesse [analytics.google.com](https://analytics.google.com/)
- Visualize eventos em "Eventos" > "Todos os eventos"
- Configure conversões em "Configurar" > "Conversões"

### Meta Pixel
- Acesse [Facebook Business Manager](https://business.facebook.com/)
- Visualize eventos em "Eventos" > "Pixels" > "Eventos"
- Configure conversões em "Eventos" > "Conversões"

## 🔍 Debug e Testes

### Google Analytics
- Use [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
- Verifique eventos em tempo real em GA4

### Meta Pixel
- Use [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
- Verifique eventos no Facebook Business Manager

## ⚠️ Importante

- **Desenvolvimento**: Os analytics só funcionam em produção ou com as variáveis de ambiente configuradas
- **LGPD**: Certifique-se de ter consentimento do usuário antes de ativar tracking
- **Performance**: Os scripts são carregados de forma assíncrona para não impactar performance
- **Fallback**: Se as variáveis de ambiente não estiverem configuradas, os analytics não são carregados

## 🛠️ Troubleshooting

### Analytics não aparecem
1. Verifique se as variáveis de ambiente estão configuradas
2. Confirme se os IDs estão corretos
3. Verifique o console do navegador para erros
4. Teste em modo de produção

### Eventos não são trackados
1. Verifique se os hooks estão sendo importados corretamente
2. Confirme se as funções estão sendo chamadas
3. Use as ferramentas de debug mencionadas acima
