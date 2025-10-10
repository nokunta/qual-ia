import rulesData from '@/data/rules.json';

// Tipos para a estrutura de dados
export interface Category {
  id: string;
  name: string;
  keywords: string[];
  bestAI: string;
  score: number;
  justification: string;
  alternative: string;
  alternativeScore: number;
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface AnalysisResult {
  recommendedAI: string;
  score: number;
  justification: string;
  alternative: string;
  alternativeScore: number;
  categoryMatched: string;
  allScores?: {
    ai: string;
    score: number;
    reason: string;
  }[];
}

/**
 * Normaliza texto para análise (remove acentos, converte para minúsculas)
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Calcula a pontuação de match entre o input do utilizador e uma categoria
 * com base nas keywords
 */
function calculateMatch(userInput: string, category: Category): number {
  const normalizedInput = normalizeText(userInput);
  let matchScore = 0;
  let matchedKeywords = 0;

  // Percorre todas as keywords da categoria
  category.keywords.forEach((keyword) => {
    const normalizedKeyword = normalizeText(keyword);
    
    // Match exato (palavra completa)
    if (normalizedInput.includes(normalizedKeyword)) {
      matchScore += 10;
      matchedKeywords++;
    }
    
    // Match parcial (palavras individuais da keyword)
    const keywordWords = normalizedKeyword.split(' ');
    keywordWords.forEach((word) => {
      if (word.length > 3 && normalizedInput.includes(word)) {
        matchScore += 3;
      }
    });
  });

  // Bónus por múltiplas keywords matched
  if (matchedKeywords > 1) {
    matchScore += matchedKeywords * 5;
  }

  return matchScore;
}

/**
 * Analisa o input do utilizador e retorna a melhor recomendação de IA
 */
export function analyzeTask(userInput: string): AnalysisResult {
  const categories = rulesData.categories as Category[];
  
  // Calcula o score de match para cada categoria
  const categoryScores = categories.map((category) => ({
    category,
    matchScore: calculateMatch(userInput, category),
  }));

  // Ordena por score de match (descendente)
  categoryScores.sort((a, b) => b.matchScore - a.matchScore);

  // Pega a categoria com maior match
  const bestMatch = categoryScores[0];

  // Se não houver match significativo, retorna recomendação genérica
  if (bestMatch.matchScore === 0) {
    return {
      recommendedAI: 'ChatGPT',
      score: 75,
      justification: 'Recomendação genérica: ChatGPT é versátil para tarefas diversas',
      alternative: 'Claude',
      alternativeScore: 70,
      categoryMatched: 'Genérico',
    };
  }

  return {
    recommendedAI: bestMatch.category.bestAI,
    score: bestMatch.category.score,
    justification: bestMatch.category.justification,
    alternative: bestMatch.category.alternative,
    alternativeScore: bestMatch.category.alternativeScore,
    categoryMatched: bestMatch.category.name,
  };
}

/**
 * Retorna análise comparativa de todas as IAs para uma tarefa
 */
export function compareAllAIs(userInput: string): AnalysisResult {
  const categories = rulesData.categories as Category[];
  const ais = rulesData.ais as AIModel[];
  
  // Calcula scores para cada categoria
  const categoryScores = categories.map((category) => ({
    category,
    matchScore: calculateMatch(userInput, category),
  }));

  // Agrega scores por IA
  const aiScores: { [key: string]: { totalScore: number; count: number; reasons: string[] } } = {};
  
  ais.forEach((ai) => {
    aiScores[ai.name] = { totalScore: 0, count: 0, reasons: [] };
  });

  // Para cada categoria que teve match, adiciona o score à IA correspondente
  categoryScores.forEach(({ category, matchScore }) => {
    if (matchScore > 0) {
      // IA principal da categoria
      if (aiScores[category.bestAI]) {
        aiScores[category.bestAI].totalScore += category.score * (matchScore / 10);
        aiScores[category.bestAI].count++;
        aiScores[category.bestAI].reasons.push(category.justification);
      }
      
      // IA alternativa da categoria (com peso menor)
      if (aiScores[category.alternative]) {
        aiScores[category.alternative].totalScore += category.alternativeScore * (matchScore / 20);
        aiScores[category.alternative].count++;
      }
    }
  });

  // Calcula score médio para cada IA
  const allScores = Object.entries(aiScores).map(([ai, data]) => ({
    ai,
    score: data.count > 0 ? Math.round(data.totalScore / data.count) : 0,
    reason: data.reasons[0] || 'Capacidade geral',
  }));

  // Ordena por score
  allScores.sort((a, b) => b.score - a.score);

  // Retorna resultado com todas as pontuações
  const best = allScores[0];
  const second = allScores[1];

  return {
    recommendedAI: best.ai,
    score: best.score,
    justification: best.reason,
    alternative: second.ai,
    alternativeScore: second.score,
    categoryMatched: 'Análise comparativa',
    allScores,
  };
}

/**
 * Gera explicação detalhada sobre a escolha
 */
export function generateDetailedExplanation(result: AnalysisResult, userInput: string): string {
  const categories = rulesData.categories as Category[];
  const ais = rulesData.ais as AIModel[];
  
  // Encontra informações sobre a IA recomendada
  const recommendedAIInfo = ais.find((ai) => ai.name === result.recommendedAI);
  const alternativeAIInfo = ais.find((ai) => ai.name === result.alternative);

  let explanation = `# Análise detalhada da recomendação\n\n`;
  explanation += `## Tarefa analisada\n"${userInput}"\n\n`;
  explanation += `## Categoria identificada\n${result.categoryMatched}\n\n`;
  explanation += `## IA Recomendada: ${result.recommendedAI} (${result.score}/100)\n\n`;
  
  if (recommendedAIInfo) {
    explanation += `**${recommendedAIInfo.description}**\n\n`;
  }
  
  explanation += `### Porquê ${result.recommendedAI}?\n`;
  explanation += `${result.justification}\n\n`;
  
  // Adiciona informação sobre a categoria matched
  const matchedCategory = categories.find((cat) => cat.name === result.categoryMatched);
  if (matchedCategory) {
    explanation += `### Pontos fortes para esta tarefa:\n`;
    explanation += `- Especialização em: ${matchedCategory.name}\n`;
    explanation += `- Score de adequação: ${matchedCategory.score}/100\n\n`;
  }

  explanation += `## Alternativa: ${result.alternative} (${result.alternativeScore}/100)\n\n`;
  
  if (alternativeAIInfo) {
    explanation += `**${alternativeAIInfo.description}**\n\n`;
  }
  
  explanation += `${result.alternative} também é uma boa opção, especialmente se já estiveres familiarizado com esta ferramenta.\n\n`;
  
  explanation += `## Conclusão\n`;
  explanation += `Para a tarefa "${userInput}", recomendamos **${result.recommendedAI}** pela sua capacidade superior nesta área específica.`;

  return explanation;
}

/**
 * Retorna todas as IAs disponíveis
 */
export function getAllAIs(): AIModel[] {
  return rulesData.ais as AIModel[];
}

