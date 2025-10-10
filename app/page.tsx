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
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-6">
            <div className="text-7xl mb-4">🤖</div>
          </div>
          <h1 className="text-6xl font-extrabold text-white mb-6 tracking-tight">
            Qual IA?
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Descobre em segundos qual o melhor modelo de IA para a tua tarefa
          </p>
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold border border-white/30">ChatGPT</span>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold border border-white/30">Claude</span>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold border border-white/30">Gemini</span>
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold border border-white/30">Perplexity</span>
          </div>
        </div>

        {/* Input Section */}
        <div className="glass rounded-3xl shadow-2xl p-8 mb-8 animate-fade-in">
          <label htmlFor="task-input" className="block text-xl font-bold text-gray-800 mb-4">
            ✨ Descreve a tua tarefa:
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
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none text-gray-700 text-lg"
            rows={4}
          />
          <p className="text-sm text-gray-600 mt-3 flex items-center gap-2">
            <span className="text-lg">💡</span>
            <span>Sê específico sobre o que pretendes fazer. Usa <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Cmd+Enter</kbd> para analisar</span>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={handleAnalyze}
              disabled={!userInput.trim()}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
            >
              🎯 Analisar
            </button>
            <button
              onClick={handleCompareAll}
              disabled={!userInput.trim()}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
            >
              📊 Comparar Todas
            </button>
            {result && (
              <button
                onClick={handleReset}
                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🔄 Nova Análise
              </button>
            )}
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6 animate-fade-in">
            <ResultCard result={result} />

            {/* Explain Button */}
            <div className="flex justify-center">
              <button
                onClick={handleExplain}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-xl transition-all transform hover:scale-110 shadow-xl hover:shadow-2xl"
              >
                💡 Explica porquê
              </button>
            </div>

            {/* Detailed Explanation */}
            {showExplanation && (
              <div className="glass rounded-3xl shadow-2xl p-8 animate-slide-in">
                <div className="prose prose-lg max-w-none">
                  {explanation.split('\n').map((line, index) => {
                    if (line.startsWith('# ')) {
                      return (
                        <h1 key={index} className="text-4xl font-extrabold text-gray-900 mb-6">
                          {line.substring(2)}
                        </h1>
                      );
                    } else if (line.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-3xl font-bold text-gray-800 mt-8 mb-4">
                          {line.substring(3)}
                        </h2>
                      );
                    } else if (line.startsWith('### ')) {
                      return (
                        <h3 key={index} className="text-2xl font-semibold text-gray-700 mt-6 mb-3">
                          {line.substring(4)}
                        </h3>
                      );
                    } else if (line.startsWith('- ')) {
                      return (
                        <li key={index} className="text-gray-700 ml-6 text-lg">
                          {line.substring(2)}
                        </li>
                      );
                    } else if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <p key={index} className="font-bold text-gray-800 my-3 text-lg">
                          {line.substring(2, line.length - 2)}
                        </p>
                      );
                    } else if (line.trim() === '') {
                      return <br key={index} />;
                    } else {
                      return (
                        <p key={index} className="text-gray-700 my-3 text-lg leading-relaxed">
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
          <div className="mt-12 glass rounded-3xl shadow-2xl p-8 animate-fade-in">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">📝 Exemplos de tarefas:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { text: 'Escrever um artigo técnico sobre blockchain', icon: '📝' },
                { text: 'Resumir um documento PDF de 100 páginas', icon: '📄' },
                { text: 'Pesquisar informação atual sobre IA', icon: '🔍' },
                { text: 'Criar automação para Gmail', icon: '⚙️' },
                { text: 'Desenvolver uma aplicação web', icon: '💻' },
                { text: 'Gerar ideias para campanha de marketing', icon: '💡' },
                { text: 'Analisar dados de vendas em Excel', icon: '📊' },
                { text: 'Escrever um guião para vídeo do YouTube', icon: '🎬' },
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => setUserInput(example.text)}
                  className="text-left p-5 bg-white/60 hover:bg-white rounded-xl transition-all border-2 border-transparent hover:border-purple-400 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <span className="text-2xl mr-3">{example.icon}</span>
                  <span className="text-gray-800 font-medium">{example.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

