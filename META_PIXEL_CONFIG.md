# Meta Pixel Configuration

## 📊 **Configuração do Meta Pixel**

### **IDs e Tokens:**
- **Pixel ID**: `703558478389535`
- **Access Token**: `EAA3cKl1ZAuH4BPfcVZCmcrS83ySUEar8pwvNnu7I2zoO9GSD7cuNVM0qhtLqaP7NZCasZAIYbMr2TXlPT6B4IG9ZCl7A0afH5ZCezZBbL7wR40ZAMfn3jFkEspArZBmYZC3VFu06YRb4wRNL0ZAJZAklcxMb5oYQnSwTzYmzuYnv7CgtQzDXLZBvDURRYPV5pHZAFitgZDZD`
- **Test Event Code**: `TEST37163`

### **Eventos Rastreados:**

#### **1. Eventos Automáticos:**
- ✅ **PageView**: Carregamento de páginas
- ✅ **Lead**: Submissão de formulários
- ✅ **Contact**: Cliques em contato
- ✅ **CompleteRegistration**: Cadastros completos

#### **2. Eventos Personalizados:**
- ✅ **ButtonClick**: Cliques em botões
- ✅ **FormSubmission**: Envio de formulários
- ✅ **ScrollDepth**: Profundidade de scroll
- ✅ **TimeOnPage**: Tempo na página

### **Implementação:**

#### **1. No Layout (layout.tsx):**
```typescript
const metaPixelId = '703558478389535'; // Meta Pixel ID hardcoded
{metaPixelId && <MetaPixel pixelId={metaPixelId} />}
```

#### **2. Nos Componentes:**
```typescript
import { useMetaPixel } from '@/hooks/useMetaPixel';

const { trackLead, trackContact, trackFormSubmission } = useMetaPixel();

// Rastrear lead
trackLead(100, 'BRL');

// Rastrear contato
trackContact();

// Rastrear formulário
trackFormSubmission('contact_form', true);
```

### **Teste do Pixel:**

#### **1. Facebook Pixel Helper:**
- Instale a extensão do Chrome
- Acesse o site
- Verifique se o pixel está carregando

#### **2. Test Event Code:**
- Use o código: `TEST37163`
- Teste eventos no Facebook Events Manager

#### **3. Verificação:**
- Acesse Facebook Events Manager
- Verifique eventos em tempo real
- Confirme que os dados estão chegando

### **Configuração no Facebook:**

#### **1. Facebook Business Manager:**
- Acesse: https://business.facebook.com
- Vá para "Eventos"
- Configure o pixel: `703558478389535`

#### **2. Facebook Ads Manager:**
- Crie campanhas
- Use o pixel para remarketing
- Configure conversões

### **Eventos Específicos do Site:**

#### **1. Formulário de Contato:**
```typescript
// No MeetingModal.tsx
trackLead(100, 'BRL'); // Valor estimado do lead
trackContact();
trackFormSubmission('meeting_form', true);
```

#### **2. Botões de Ação:**
```typescript
// Nos botões principais
trackButtonClick('implementar_crm_agora', 'hero_section');
trackButtonClick('marcar_reuniao', 'navigation');
```

#### **3. Navegação:**
```typescript
// Scroll e tempo na página
trackScroll(75); // 75% da página
trackTimeOnPage(120); // 2 minutos
```

### **Troubleshooting:**

#### **1. Pixel Não Carrega:**
- Verifique se o ID está correto
- Confirme que o componente está renderizando
- Verifique console do navegador

#### **2. Eventos Não Aparecem:**
- Use o Facebook Pixel Helper
- Verifique se os hooks estão sendo chamados
- Confirme no Events Manager

#### **3. Teste de Eventos:**
- Use o Test Event Code: `TEST37163`
- Verifique no Facebook Events Manager
- Confirme que os dados estão corretos

### **Próximos Passos:**

1. **Deploy**: Fazer deploy com o pixel configurado
2. **Teste**: Verificar se está funcionando
3. **Campanhas**: Criar campanhas no Facebook Ads
4. **Remarketing**: Configurar audiências personalizadas
5. **Conversões**: Otimizar para conversões

---

**Status**: ✅ Configurado e pronto para uso
**Pixel ID**: `703558478389535`
**Test Code**: `TEST37163`
