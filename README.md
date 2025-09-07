# IDE Negócios Digitais - Landing Page

Uma landing page moderna e responsiva construída com as melhores tecnologias disponíveis.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Biblioteca de animações
- **Heroicons** - Ícones SVG otimizados
- **Headless UI** - Componentes acessíveis

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes de interface
│   │   └── Navigation.tsx
│   ├── sections/         # Seções da landing page
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── FooterSection.tsx
│   └── index.ts          # Exportações centralizadas
├── types/                # Definições TypeScript
│   └── index.ts
└── utils/                # Utilitários e dados
    └── data.ts
```

## 🎯 Componentes Principais

### Navigation
- Navegação fixa com backdrop blur
- Logo da empresa
- Links de navegação
- Botão de call-to-action

### HeroSection
- Título principal com gradiente
- Descrição da empresa
- Botões de ação
- Animações de entrada

### ServicesSection
- Grid de serviços
- Cards interativos
- Ícones e descrições
- Lista de features

### AboutSection
- Informações sobre a empresa
- Lista de diferenciais
- Estatísticas em destaque
- Layout responsivo

### ContactSection
- Formulário de contato
- Validação de campos
- Design moderno
- Integração com estado

### FooterSection
- Informações da empresa
- Links organizados
- Dados de contato
- Copyright

## 🛠️ Como Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Abrir no navegador:**
   ```
   http://localhost:3000
   ```

## 📱 Recursos

- ✅ Design responsivo
- ✅ Animações suaves
- ✅ Tipagem TypeScript
- ✅ Componentes modulares
- ✅ SEO otimizado
- ✅ Performance otimizada
- ✅ Acessibilidade
- ✅ Formulário funcional

## 🎨 Personalização

### Cores
As cores principais podem ser alteradas no arquivo `tailwind.config.js`:
- Azul: `blue-600`
- Roxo: `purple-600`
- Cinza: `gray-900`

### Conteúdo
Todo o conteúdo está centralizado em `src/utils/data.ts`:
- Serviços
- Features
- Estatísticas
- Informações da empresa

### Componentes
Cada seção é um componente independente que pode ser:
- Reutilizado
- Personalizado
- Testado individualmente

## 🚀 Deploy

O projeto está pronto para deploy em:
- Vercel (recomendado)
- Netlify
- AWS Amplify
- Qualquer plataforma que suporte Next.js

## 📄 Licença

© 2024 IDE Negócios Digitais. Todos os direitos reservados.