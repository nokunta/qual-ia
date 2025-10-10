# 🤖 Qual IA?

Ferramenta inteligente que te ajuda a decidir qual o melhor modelo de Inteligência Artificial usar para cada tarefa específica.

## 📋 Sobre

**Qual IA?** analisa a tua descrição de tarefa e recomenda o modelo de IA mais adequado entre:
- **ChatGPT** (OpenAI) - Versátil e criativo
- **Claude** (Anthropic) - Preciso e analítico  
- **Gemini** (Google) - Integrado e multimodal
- **Perplexity** - Pesquisa em tempo real

## ✨ Funcionalidades

### 🎯 Análise Inteligente
- Recebe uma descrição da tua tarefa
- Identifica automaticamente a categoria
- Recomenda o melhor modelo de IA
- Fornece pontuação de adequação (0-100)
- Sugere alternativa secundária

### 📊 Comparação Completa
- Compara todos os modelos simultaneamente
- Mostra pontuação individual de cada IA
- Apresenta justificação para cada score

### 💡 Explicação Detalhada
- Geração de análise completa da recomendação
- Explica os pontos fortes de cada modelo
- Contextualiza a decisão

### 🎨 Interface Moderna
- Design limpo e minimalista
- Responsivo (mobile-friendly)
- Cores associadas a cada IA
- Barras de progresso visuais

## 🚀 Como usar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

1. **Instala as dependências:**
   ```bash
   npm install
   ```

2. **Inicia o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Abre o browser:**
   ```
   http://localhost:3000
   ```

### Comandos disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm run start

# Linting
npm run lint
```

## 📖 Como funciona

### 1. Input do utilizador
Descreve a tarefa que pretendes realizar:
- "escrever um artigo técnico sobre IA"
- "resumir um PDF de 50 páginas"
- "pesquisar informação atual sobre clima"

### 2. Análise semântica
O sistema:
- Normaliza o texto (remove acentos, lowercase)
- Compara com keywords de cada categoria
- Calcula score de match
- Identifica a categoria mais adequada

### 3. Recomendação
Retorna:
- **Modelo recomendado** com pontuação
- **Justificação** (2 linhas explicativas)
- **Alternativa** secundária com pontuação
- **Categoria** identificada

### 4. Funcionalidades extra
- **"Explica porquê"**: Análise detalhada da escolha
- **"Comparar todas"**: Tabela com scores de todas as IAs

## 📁 Estrutura do projeto

```
aitools/
├── app/
│   ├── layout.tsx          # Layout principal da aplicação
│   ├── page.tsx             # Página inicial com interface
│   └── globals.css          # Estilos globais
├── components/
│   └── ResultCard.tsx       # Componente de resultado
├── data/
│   └── rules.json           # Base de dados de regras e categorias
├── utils/
│   └── analyzer.ts          # Lógica de análise e matching
├── package.json             # Dependências do projeto
├── tsconfig.json            # Configuração TypeScript
├── tailwind.config.js       # Configuração Tailwind CSS
└── README.md               # Este ficheiro
```

## 🎯 Categorias suportadas

| Categoria | IA Recomendada | Score |
|-----------|----------------|-------|
| Escrita criativa, storytelling | ChatGPT | 95 |
| Análise de documentos longos | Claude | 97 |
| Pesquisa factual e atual | Perplexity | 93 |
| Integração Google Workspace | Gemini | 96 |
| Criação de automações | ChatGPT | 94 |
| Escrita técnica ou precisa | Claude | 90 |
| Perguntas rápidas, factuais | Perplexity | 91 |
| Programação e código | ChatGPT | 92 |
| Brainstorming e ideias | ChatGPT | 89 |
| Análise de dados | ChatGPT | 88 |

## 🔧 Personalização

### Adicionar novas categorias

Edita o ficheiro `data/rules.json`:

```json
{
  "id": "nova-categoria",
  "name": "Nome da categoria",
  "keywords": ["palavra1", "palavra2", "palavra3"],
  "bestAI": "ChatGPT",
  "score": 90,
  "justification": "Razão para esta escolha",
  "alternative": "Claude",
  "alternativeScore": 85
}
```

### Adicionar novas IAs

No array `ais` em `data/rules.json`:

```json
{
  "id": "nova-ia",
  "name": "Nova IA",
  "description": "Descrição da IA",
  "color": "#hexcolor"
}
```

## 🛠️ Tecnologias utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management

## 📝 Algoritmo de matching

O sistema usa um algoritmo de matching semântico:

1. **Normalização**: Remove acentos e converte para minúsculas
2. **Match exato**: +10 pontos por keyword completa
3. **Match parcial**: +3 pontos por palavra individual
4. **Bónus múltiplas keywords**: +5 pontos por cada keyword adicional
5. **Seleção**: Categoria com maior score é escolhida

## 🚀 Melhorias futuras

- [ ] Integração com OpenAI API para análise semântica avançada
- [ ] Suporte para mais modelos de IA
- [ ] Histórico de análises
- [ ] Export de resultados (PDF/JSON)
- [ ] Modo escuro
- [ ] Multilíngue (EN, ES, FR)
- [ ] API REST para integração externa

## 📄 Licença

Este projeto é open-source e está disponível para uso livre.

## 🤝 Contribuir

Sugestões e melhorias são bem-vindas! 

---

**Feito com ❤️ para ajudar a escolher a melhor IA para cada tarefa**

