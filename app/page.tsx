'use client';

import { useState } from 'react';
import { analyzeTask, compareAllAIs, generateDetailedExplanation, AnalysisResult } from '@/utils/analyzer';
import ResultCard from '@/components/ResultCard';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [isCompareMode, setIsCompareMode] = useState(false);

  // Função para analisar a tarefa
  const handleAnalyze = () => {
    if (!userInput.trim()) return;
    
    const analysisResult = analyzeTask(userInput);
    setResult(analysisResult);
    setShowExplanation(false);
    setIsCompareMode(false);
  };

  // Função para comparar todas as IAs
  const handleCompareAll = () => {
    if (!userInput.trim()) return;
    
    const compareResult = compareAllAIs(userInput);
    setResult(compareResult);
    setShowExplanation(false);
    setIsCompareMode(true);
  };

  // Função para gerar explicação detalhada
  const handleExplain = () => {
    if (!result) return;
    
    const detailedExplanation = generateDetailedExplanation(result, userInput);
    setExplanation(detailedExplanation);
    setShowExplanation(true);
  };

  // Função para limpar e começar nova análise
  const handleReset = () => {
    setUserInput('');
    setResult(null);
    setShowExplanation(false);
    setExplanation('');
    setIsCompareMode(false);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🤖 Qual IA?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descobre qual o melhor modelo de IA para a tua tarefa entre{' '}
            <span className="font-semibold text-green-600">ChatGPT</span>,{' '}
            <span className="font-semibold text-orange-600">Claude</span>,{' '}
            <span className="font-semibold text-blue-600">Gemini</span> e{' '}
            <span className="font-semibold text-teal-600">Perplexity</span>
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <label htmlFor="task-input" className="block text-lg font-semibold text-gray-700 mb-3">
            Descreve a tua tarefa:
          </label>
          <textarea
            id="task-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                handleAnalyze();
              }
            }}
            placeholder='Ex: "escrever um artigo técnico sobre IA", "resumir um PDF de 50 páginas", "pesquisar informação atual sobre clima"'
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-gray-700"
            rows={4}
          />
          <p className="text-sm text-gray-500 mt-2">
            💡 Dica: Sê específico sobre o que pretendes fazer
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={handleAnalyze}
              disabled={!userInput.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              🎯 Analisar
            </button>
            <button
              onClick={handleCompareAll}
              disabled={!userInput.trim()}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              📊 Comparar Todas
            </button>
            {result && (
              <button
                onClick={handleReset}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                🔄 Nova Análise
              </button>
            )}
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            <ResultCard result={result} />

            {/* Explain Button */}
            <div className="flex justify-center">
              <button
                onClick={handleExplain}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                💡 Explica porquê
              </button>
            </div>

            {/* Detailed Explanation */}
            {showExplanation && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="prose prose-lg max-w-none">
                  {explanation.split('\n').map((line, index) => {
                    if (line.startsWith('# ')) {
                      return (
                        <h1 key={index} className="text-3xl font-bold text-gray-900 mb-4">
                          {line.substring(2)}
                        </h1>
                      );
                    } else if (line.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-2xl font-bold text-gray-800 mt-6 mb-3">
                          {line.substring(3)}
                        </h2>
                      );
                    } else if (line.startsWith('### ')) {
                      return (
                        <h3 key={index} className="text-xl font-semibold text-gray-700 mt-4 mb-2">
                          {line.substring(4)}
                        </h3>
                      );
                    } else if (line.startsWith('- ')) {
                      return (
                        <li key={index} className="text-gray-600 ml-6">
                          {line.substring(2)}
                        </li>
                      );
                    } else if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <p key={index} className="font-semibold text-gray-700 my-2">
                          {line.substring(2, line.length - 2)}
                        </p>
                      );
                    } else if (line.trim() === '') {
                      return <br key={index} />;
                    } else {
                      return (
                        <p key={index} className="text-gray-600 my-2">
                          {line}
                        </p>
                      );
                    }
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Examples Section */}
        {!result && (
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">📝 Exemplos de tarefas:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Escrever um artigo técnico sobre blockchain',
                'Resumir um documento PDF de 100 páginas',
                'Pesquisar informação atual sobre IA',
                'Criar automação para Gmail',
                'Desenvolver uma aplicação web',
                'Gerar ideias para campanha de marketing',
                'Analisar dados de vendas em Excel',
                'Escrever um guião para vídeo do YouTube',
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => setUserInput(example)}
                  className="text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-blue-300"
                >
                  <span className="text-gray-700">{example}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Feito com ❤️ para ajudar a escolher a melhor IA para cada tarefa
          </p>
        </div>
      </div>
    </div>
  );
}

