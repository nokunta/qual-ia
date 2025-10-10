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
    <div className="w-full max-w-4xl space-y-8">
      {/* SUPER DESTAQUE - Recomendação principal */}
      <div className="relative animate-fade-in">
        {/* Badge GIGANTE de "Melhor Escolha" */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-10 py-3 rounded-full font-black text-lg shadow-2xl flex items-center gap-3 animate-pulse">
            <span className="text-3xl">⭐</span>
            USA ESTA!
          </div>
        </div>

        {/* Card principal COM DESTAQUE MÁXIMO */}
        <div 
          className="relative rounded-3xl shadow-2xl p-10 pt-16 space-y-8 border-8 bg-white"
          style={{ 
            borderColor: recommendedAI?.color || '#10a37f',
            boxShadow: `0 20px 60px -15px ${recommendedAI?.color || '#10a37f'}80`
          }}
        >
          {/* Nome da IA - GIGANTE */}
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-5xl md:text-6xl font-black text-center"
                style={{ color: recommendedAI?.color || '#10a37f' }}>
              {result.recommendedAI}
            </h2>
            <div
              className="px-12 py-5 rounded-2xl text-white font-black text-2xl shadow-2xl"
              style={{ backgroundColor: recommendedAI?.color || '#10a37f' }}
            >
              👍 RECOMENDADO
            </div>
          </div>

          {/* Score MASSIVO */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 space-y-6 border-4 border-gray-100">
            <div className="text-center space-y-4">
              <p className="text-xl font-bold text-gray-600 uppercase tracking-widest">
                PONTUAÇÃO
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className={`text-8xl md:text-9xl font-black ${getScoreColor(result.score)}`}>
                  {result.score}
                </span>
                <span className="text-5xl font-bold text-gray-300">/100</span>
              </div>
            </div>
            
            <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-1000 ease-out"
                style={{ width: `${result.score}%`, backgroundColor: recommendedAI?.color || '#10a37f' }}
              ></div>
            </div>

            <div className="pt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-100">
              <p className="text-gray-900 text-2xl leading-relaxed font-semibold text-center">
                {result.justification}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-center gap-4 bg-white rounded-xl p-6 shadow-inner">
              <span className="text-4xl">📂</span>
              <div className="text-center">
                <p className="text-sm font-extrabold text-gray-500 uppercase tracking-widest">CATEGORIA</p>
                <p className="text-2xl font-black text-gray-900 mt-1">{result.categoryMatched}</p>
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


