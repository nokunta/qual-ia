import { AnalysisResult, getAllAIs } from '@/utils/analyzer';

interface ResultCardProps {
  result: AnalysisResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  const ais = getAllAIs();
  const recommendedAI = ais.find((ai) => ai.name === result.recommendedAI);
  const alternativeAI = ais.find((ai) => ai.name === result.alternative);

  // Função para determinar a cor do score
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-gray-600';
  };

  // Função para gerar a barra de progresso
  const getScoreBar = (score: number, color: string) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
      <div
        className="h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${score}%`, backgroundColor: color }}
      ></div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl glass rounded-3xl shadow-2xl p-8 space-y-6">
      {/* Recomendação principal */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-3xl font-extrabold text-gray-800">🎯 IA Recomendada</h2>
          <div
            className="px-6 py-3 rounded-full text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-transform"
            style={{ backgroundColor: recommendedAI?.color || '#10a37f' }}
          >
            {result.recommendedAI}
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 space-y-4 border-2 border-gray-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <span className="text-xl font-bold text-gray-700">
              Pontuação de adequação
            </span>
            <span className={`text-4xl font-extrabold ${getScoreColor(result.score)}`}>
              {result.score}/100
            </span>
          </div>
          {getScoreBar(result.score, recommendedAI?.color || '#10a37f')}

          <div className="pt-4">
            <p className="text-gray-700 text-lg leading-relaxed">{result.justification}</p>
          </div>

          <div className="pt-4 flex items-center gap-2 bg-white/80 rounded-lg p-4">
            <span className="text-2xl">📂</span>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Categoria</p>
              <p className="text-lg font-bold text-gray-800">{result.categoryMatched}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alternativa */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">🔄 Alternativa</h3>
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 space-y-4 border-2 border-gray-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div
              className="px-5 py-2 rounded-full text-white font-bold shadow-md transform hover:scale-105 transition-transform"
              style={{ backgroundColor: alternativeAI?.color || '#d97757' }}
            >
              {result.alternative}
            </div>
            <span className={`text-3xl font-bold ${getScoreColor(result.alternativeScore)}`}>
              {result.alternativeScore}/100
            </span>
          </div>
          {getScoreBar(result.alternativeScore, alternativeAI?.color || '#d97757')}
          <p className="text-gray-700 pt-2 text-lg">
            {alternativeAI?.description || 'Boa alternativa para esta tarefa'}
          </p>
        </div>
      </div>

      {/* Comparação de todas as IAs (se disponível) */}
      {result.allScores && result.allScores.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-800">📊 Comparação completa</h3>
          <div className="space-y-3">
            {result.allScores.map((aiScore, index) => {
              const aiInfo = ais.find((ai) => ai.name === aiScore.ai);
              return (
                <div
                  key={aiScore.ai}
                  className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-5 border-2 border-gray-100 hover:border-gray-300 transition-all transform hover:scale-102"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div
                        className="w-4 h-4 rounded-full shadow-md"
                        style={{ backgroundColor: aiInfo?.color || '#333' }}
                      ></div>
                      <span className="font-bold text-gray-800 text-lg">{aiScore.ai}</span>
                      <span className="text-sm text-gray-600 flex-1 truncate">{aiScore.reason}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`text-2xl font-extrabold ${getScoreColor(aiScore.score)}`}>
                        {aiScore.score}
                      </span>
                      <div className="w-32 hidden sm:block">
                        {getScoreBar(aiScore.score, aiInfo?.color || '#333')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

