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
    <div className="w-full max-w-4xl space-y-6">
      {/* Recomendação principal - DESTAQUE MÁXIMO */}
      <div className="relative">
        {/* Badge de "Melhor Escolha" */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-xl flex items-center gap-2">
            <span className="text-lg">⭐</span>
            MELHOR ESCOLHA
          </div>
        </div>

        <div 
          className="glass rounded-3xl shadow-2xl p-8 pt-12 space-y-6 border-4 animate-fade-in"
          style={{ borderColor: recommendedAI?.color || '#10a37f' }}
        >
          <div className="flex items-center justify-center flex-wrap gap-4">
            <div
              className="px-10 py-4 rounded-2xl text-white font-extrabold text-3xl shadow-2xl transform hover:scale-105 transition-transform"
              style={{ backgroundColor: recommendedAI?.color || '#10a37f' }}
            >
              {result.recommendedAI}
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 space-y-4 border-2 border-gray-200">
            <div className="flex items-center justify-center flex-col gap-3">
              <span className="text-lg font-semibold text-gray-600 uppercase tracking-wide">
                Pontuação de adequação
              </span>
              <div className="flex items-center gap-4">
                <span className={`text-6xl font-black ${getScoreColor(result.score)}`}>
                  {result.score}
                </span>
                <span className="text-3xl font-bold text-gray-400">/100</span>
              </div>
            </div>
            {getScoreBar(result.score, recommendedAI?.color || '#10a37f')}

            <div className="pt-6 bg-white/80 rounded-xl p-6">
              <p className="text-gray-800 text-xl leading-relaxed font-medium text-center">{result.justification}</p>
            </div>

            <div className="pt-4 flex items-center justify-center gap-3 bg-gradient-to-r from-gray-50 to-white rounded-lg p-5">
              <span className="text-3xl">📂</span>
              <div className="text-center">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Categoria</p>
                <p className="text-xl font-extrabold text-gray-900">{result.categoryMatched}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alternativa - menos destaque */}
      <div className="space-y-4 opacity-80 hover:opacity-100 transition-opacity">
        <h3 className="text-xl font-bold text-gray-600 flex items-center gap-2">
          <span>🔄</span>
          <span>Alternativa</span>
          <span className="text-sm font-normal text-gray-500">(também funciona bem)</span>
        </h3>
        <div className="glass rounded-2xl p-6 space-y-4 border border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div
              className="px-5 py-2 rounded-full text-white font-bold shadow-md"
              style={{ backgroundColor: alternativeAI?.color || '#d97757', opacity: 0.9 }}
            >
              {result.alternative}
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${getScoreColor(result.alternativeScore)}`}>
                {result.alternativeScore}
              </span>
              <span className="text-lg text-gray-400">/100</span>
            </div>
          </div>
          {getScoreBar(result.alternativeScore, alternativeAI?.color || '#d97757')}
          <p className="text-gray-600 pt-2 text-base">
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
              const isWinner = index === 0;
              
              return (
                <div
                  key={aiScore.ai}
                  className={`rounded-xl p-5 transition-all transform hover:scale-102 ${
                    isWinner 
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-3 border-yellow-400 shadow-lg' 
                      : 'glass border border-gray-200'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      {isWinner && <span className="text-2xl">👑</span>}
                      <div
                        className={`rounded-full shadow-md ${isWinner ? 'w-5 h-5' : 'w-4 h-4'}`}
                        style={{ backgroundColor: aiInfo?.color || '#333' }}
                      ></div>
                      <span className={`font-bold text-gray-800 ${isWinner ? 'text-xl' : 'text-lg'}`}>
                        {aiScore.ai}
                      </span>
                      <span className={`text-sm text-gray-600 flex-1 truncate ${isWinner ? 'font-medium' : ''}`}>
                        {aiScore.reason}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`font-extrabold ${getScoreColor(aiScore.score)} ${isWinner ? 'text-3xl' : 'text-2xl'}`}>
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

