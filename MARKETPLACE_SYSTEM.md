# 🛍️ Sistema de Marketplace com IA

## 📋 Visão Geral

Sistema inteligente de marketplace que analisa automaticamente produtos de roupas usando IA para detectar:
- **Tipo de Roupa**: Camiseta ou Camiseta Polo
- **Tipo de Manga**: Curta ou Longa
- **Campo Modelo**: Palavras-chave para busca

## 🚀 Funcionalidades

### 1. **Análise Automática por IA**
- Detecta automaticamente o tipo de roupa baseado na descrição
- Identifica o tipo de manga (curta/longa)
- Calcula nível de confiança da análise (0-100%)

### 2. **Campo Modelo/Palavras-chave**
- Permite adicionar termos de busca que não estão no título/descrição
- Facilita a localização de produtos específicos
- Exemplos: "básica", "casual", "esportiva", "algodão", "malha"

### 3. **Sistema de Busca Inteligente**
- Busca por título, descrição ou palavras-chave do modelo
- Filtros por tipo de roupa e manga
- Resultados em tempo real

### 4. **Interface Responsiva**
- Design consistente com tema preto e amarelo
- Funciona em mobile e desktop
- Animações suaves com Framer Motion

## 🔧 Como Usar

### **Cadastrar Produto:**
1. Preencha o **Título** do produto
2. Digite a **Descrição** detalhada
3. Adicione **Palavras-chave** no campo Modelo (opcional)
4. A IA detecta automaticamente tipo de roupa e manga
5. Clique em "Cadastrar Produto"

### **Buscar Produtos:**
1. Use o campo de busca para digitar qualquer termo
2. Aplique filtros por tipo de roupa e manga
3. Os resultados são atualizados em tempo real

## 🧠 Algoritmo de IA

### **Palavras-chave para Detecção:**

#### **Tipo de Roupa:**
- **Camiseta Polo**: polo, camiseta polo, polo shirt, camisa polo, polo básica
- **Camiseta**: camiseta, t-shirt, tshirt, camisa básica, camisa simples

#### **Tipo de Manga:**
- **Manga Longa**: manga longa, long sleeve, manga comprida, manga longa
- **Manga Curta**: manga curta, short sleeve, sem manga, regata, sleeveless

### **Cálculo de Confiança:**
- Base: 50% de confiança
- +10% para cada palavra-chave encontrada
- Máximo: 100% de confiança

## 📊 Estrutura de Dados

```typescript
interface Product {
  id: string;
  title: string;
  description: string;
  clothingType: 'Camiseta' | 'Camiseta Polo';
  sleeveType: 'Curta' | 'Longa';
  model: string; // Palavras-chave para busca
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔌 API Endpoints

### **GET /api/products**
- Lista todos os produtos cadastrados
- Retorna array de produtos com filtros aplicados

### **POST /api/products**
- Cria novo produto com análise de IA
- Valida dados obrigatórios
- Retorna produto criado + análise da IA

## 🎯 Exemplos de Uso

### **Exemplo 1: Camiseta Básica**
- **Título**: "Camiseta Básica Masculina"
- **Descrição**: "Camiseta de algodão, manga curta, ideal para o dia a dia"
- **Modelo**: "básica, casual, algodão"
- **IA Detecta**: Camiseta, Manga Curta

### **Exemplo 2: Polo Social**
- **Título**: "Polo Social Premium"
- **Descrição**: "Camiseta polo de manga curta, tecido premium, ideal para eventos"
- **Modelo**: "social, premium, eventos"
- **IA Detecta**: Camiseta Polo, Manga Curta

### **Exemplo 3: Camiseta de Inverno**
- **Título**: "Camiseta de Inverno"
- **Descrição**: "Camiseta de manga longa, tecido quente, perfeita para o frio"
- **Modelo**: "inverno, quente, frio"
- **IA Detecta**: Camiseta, Manga Longa

## 🔍 Sistema de Busca

### **Busca por Texto:**
- Procura em: título + descrição + modelo
- Case-insensitive
- Busca parcial (não precisa ser exata)

### **Filtros:**
- **Tipo de Roupa**: Todos, Camiseta, Camiseta Polo
- **Tipo de Manga**: Todos, Curta, Longa

### **Exemplos de Busca:**
- "básica" → encontra produtos com "básica" no título, descrição ou modelo
- "polo" → encontra todas as camisetas polo
- "manga longa" → encontra produtos de manga longa
- "algodão" → encontra produtos com "algodão" em qualquer campo

## 🎨 Interface

### **Formulário de Cadastro:**
- Campo de título (obrigatório)
- Campo de descrição (obrigatório)
- Campo de modelo/palavras-chave (opcional)
- Seletores para tipo de roupa e manga
- Botão de cadastro com loading

### **Tabela de Produtos:**
- Exibe todos os produtos cadastrados
- Colunas: Título, Modelo, Tipo de Roupa, Tipo de Manga, Data
- Filtros e busca em tempo real
- Animações de entrada

### **Cards Informativos:**
- Explicam as funcionalidades do sistema
- Destacam análise automática, detecção de manga, campo modelo e busca inteligente

## 🚀 Próximos Passos

1. **Integração com Banco de Dados Real** (PostgreSQL, MongoDB)
2. **Upload de Imagens** dos produtos
3. **Sistema de Categorias** mais detalhado
4. **Análise de Sentimento** nas descrições
5. **Recomendações** baseadas em IA
6. **API de Busca Avançada** com filtros complexos

## 📝 Notas Técnicas

- Sistema usa análise de texto baseada em palavras-chave
- Algoritmo pode ser expandido com ML para maior precisão
- Interface totalmente responsiva e acessível
- Código modular e bem documentado
- Pronto para integração com sistemas externos

