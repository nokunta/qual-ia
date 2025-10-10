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
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
      {/* Recomendação principal */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">🎯 IA Recomendada</h2>
          <div
            className="px-4 py-2 rounded-full text-white font-semibold"
            style={{ backgroundColor: recommendedAI?.color || '#10a37f' }}
          >
            {result.recommendedAI}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">
              Pontuação de adequação
            </span>
            <span className={`text-3xl font-bold ${getScoreColor(result.score)}`}>
              {result.score}/100
            </span>
          </div>
          {getScoreBar(result.score, recommendedAI?.color || '#10a37f')}

          <div className="pt-4">
            <p className="text-gray-600 leading-relaxed">{result.justification}</p>
          </div>

          <div className="pt-2">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Categoria:</span> {result.categoryMatched}
            </p>
          </div>
        </div>
      </div>

      {/* Alternativa */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">🔄 Alternativa</h3>
        <div className="bg-gray-50 rounded-xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div
              className="px-4 py-2 rounded-full text-white font-semibold"
              style={{ backgroundColor: alternativeAI?.color || '#d97757' }}
            >
              {result.alternative}
            </div>
            <span className={`text-2xl font-bold ${getScoreColor(result.alternativeScore)}`}>
              {result.alternativeScore}/100
            </span>
          </div>
          {getScoreBar(result.alternativeScore, alternativeAI?.color || '#d97757')}
          <p className="text-sm text-gray-600 pt-2">
            {alternativeAI?.description || 'Boa alternativa para esta tarefa'}
          </p>
        </div>
      </div>

      {/* Comparação de todas as IAs (se disponível) */}
      {result.allScores && result.allScores.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800">📊 Comparação completa</h3>
          <div className="space-y-3">
            {result.allScores.map((aiScore) => {
              const aiInfo = ais.find((ai) => ai.name === aiScore.ai);
              return (
                <div
                  key={aiScore.ai}
                  className="bg-gray-50 rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: aiInfo?.color || '#333' }}
                    ></div>
                    <span className="font-semibold text-gray-700">{aiScore.ai}</span>
                    <span className="text-sm text-gray-500 flex-1">{aiScore.reason}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`text-xl font-bold ${getScoreColor(aiScore.score)}`}>
                      {aiScore.score}
                    </span>
                    <div className="w-32">
                      {getScoreBar(aiScore.score, aiInfo?.color || '#333')}
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

