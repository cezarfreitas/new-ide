# Guia de Desenvolvimento - IDE Negócios Digitais

## 🏗️ Arquitetura do Projeto

### Estrutura Modular
O projeto foi desenvolvido seguindo princípios de arquitetura modular:

```
src/
├── app/                 # Next.js App Router
├── components/          # Componentes React
│   ├── ui/             # Componentes de interface reutilizáveis
│   ├── sections/       # Seções específicas da landing page
│   └── examples/       # Exemplos de uso dos componentes
├── types/              # Definições TypeScript
└── utils/              # Utilitários e dados
```

## 🧩 Componentes

### 1. Navigation
**Localização:** `src/components/ui/Navigation.tsx`

**Props:**
```typescript
interface NavigationProps {
  items: NavigationItem[];
}
```

**Uso:**
```tsx
import Navigation from '@/components/ui/Navigation';
import { navigationItems } from '@/utils/data';

<Navigation items={navigationItems} />
```

### 2. HeroSection
**Localização:** `src/components/sections/HeroSection.tsx`

**Características:**
- Título principal com gradiente
- Descrição da empresa
- Botões de call-to-action
- Animações com Framer Motion

### 3. ServicesSection
**Localização:** `src/components/sections/ServicesSection.tsx`

**Props:**
```typescript
interface ServicesSectionProps {
  services: Service[];
}
```

**Estrutura do Service:**
```typescript
interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
}
```

### 4. AboutSection
**Localização:** `src/components/sections/AboutSection.tsx`

**Props:**
```typescript
interface AboutSectionProps {
  features: Feature[];
  statistics: Statistic[];
}
```

### 5. ContactSection
**Localização:** `src/components/sections/ContactSection.tsx`

**Funcionalidades:**
- Formulário com validação
- Estado gerenciado com useState
- Campos: nome, email, empresa, mensagem

### 6. FooterSection
**Localização:** `src/components/sections/FooterSection.tsx`

**Props:**
```typescript
interface FooterSectionProps {
  companyInfo: CompanyInfo;
  services: string[];
  companyLinks: string[];
}
```

## 📊 Dados e Configuração

### Centralização de Dados
Todos os dados estão centralizados em `src/utils/data.ts`:

```typescript
// Exemplo de como adicionar um novo serviço
export const services: Service[] = [
  {
    icon: NovoIcon,
    title: "Novo Serviço",
    description: "Descrição do novo serviço",
    features: ["Feature 1", "Feature 2", "Feature 3"]
  },
  // ... outros serviços
];
```

### Personalização de Cores
As cores podem ser personalizadas em `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        600: '#2563eb', // Azul principal
      },
      secondary: {
        600: '#9333ea', // Roxo principal
      },
    },
  },
}
```

## 🎨 Estilização

### Tailwind CSS
O projeto usa Tailwind CSS com configurações personalizadas:

- **Cores:** Sistema de cores primárias e secundárias
- **Animações:** Keyframes personalizados
- **Fontes:** Geist Sans e Geist Mono
- **Responsividade:** Mobile-first approach

### Animações
As animações são feitas com Framer Motion:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  Conteúdo animado
</motion.div>
```

## 🔧 Desenvolvimento

### Adicionando Novos Componentes

1. **Criar o componente:**
```tsx
// src/components/ui/NovoComponente.tsx
interface NovoComponenteProps {
  // definir props
}

export default function NovoComponente({ ...props }: NovoComponenteProps) {
  return (
    <div>
      {/* implementação */}
    </div>
  );
}
```

2. **Exportar no index:**
```tsx
// src/components/index.ts
export { default as NovoComponente } from './ui/NovoComponente';
```

3. **Adicionar tipos:**
```tsx
// src/types/index.ts
export interface NovoComponenteProps {
  // tipos
}
```

### Adicionando Novas Seções

1. **Criar a seção:**
```tsx
// src/components/sections/NovaSecao.tsx
export default function NovaSecao() {
  return (
    <section className="py-16">
      {/* conteúdo */}
    </section>
  );
}
```

2. **Usar na página principal:**
```tsx
// src/app/page.tsx
import NovaSecao from '@/components/sections/NovaSecao';

export default function Home() {
  return (
    <div>
      {/* outras seções */}
      <NovaSecao />
    </div>
  );
}
```

## 🧪 Testes

### Estrutura de Testes (Recomendada)
```
src/
├── __tests__/
│   ├── components/
│   │   ├── ui/
│   │   └── sections/
│   └── utils/
```

### Exemplo de Teste
```tsx
// src/__tests__/components/ui/Navigation.test.tsx
import { render, screen } from '@testing-library/react';
import Navigation from '@/components/ui/Navigation';
import { navigationItems } from '@/utils/data';

describe('Navigation', () => {
  it('renders navigation items', () => {
    render(<Navigation items={navigationItems} />);
    
    expect(screen.getByText('Serviços')).toBeInTheDocument();
    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
  });
});
```

## 🚀 Deploy

### Vercel (Recomendado)
1. Conectar repositório ao Vercel
2. Configurar variáveis de ambiente (se necessário)
3. Deploy automático a cada push

### Build Local
```bash
npm run build
npm start
```

## 📝 Convenções

### Nomenclatura
- **Componentes:** PascalCase (`Navigation.tsx`)
- **Arquivos:** kebab-case (`navigation.tsx`)
- **Variáveis:** camelCase (`navigationItems`)
- **Constantes:** UPPER_SNAKE_CASE (`NAVIGATION_ITEMS`)

### Estrutura de Arquivos
- Um componente por arquivo
- Props tipadas com TypeScript
- Export default para componentes
- Export nomeado para tipos e utilitários

### Commits
```
feat: adicionar nova seção de depoimentos
fix: corrigir animação do hero
style: ajustar cores do tema
refactor: modularizar componente de contato
```

## 🔍 Debugging

### Ferramentas Úteis
- **React DevTools:** Inspecionar componentes
- **Tailwind CSS IntelliSense:** Autocomplete de classes
- **TypeScript:** Verificação de tipos em tempo real
- **ESLint:** Linting de código

### Problemas Comuns
1. **Erro de importação:** Verificar paths no `tsconfig.json`
2. **Estilos não aplicados:** Verificar classes do Tailwind
3. **Animações não funcionam:** Verificar se Framer Motion está instalado
4. **Tipos não encontrados:** Verificar exportações em `types/index.ts`
