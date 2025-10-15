'use client';

import { useEffect, useState } from 'react';

export default function NewsletterPromo() {
  const [showPromo, setShowPromo] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Verifica se o URL contém o parâmetro "newsletter"
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('newsletter')) {
      setShowPromo(true);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPromo(false);
      setIsClosing(false);
    }, 300);
  };

  const handleJoin = () => {
    window.open('https://www.skool.com/couceloia-3033/about?ref=6b5518d997064e459336d02c601ad74c', '_blank');
  };

  if (!showPromo) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`relative max-w-2xl w-full bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão de fechar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-2xl font-bold transition-all hover:scale-110 z-10"
          aria-label="Fechar"
        >
          ×
        </button>

        {/* Efeitos decorativos */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

        {/* Conteúdo */}
        <div className="relative p-8 md:p-12 text-center">
          {/* Badge especial */}
          <div className="inline-block mb-6">
            <div className="bg-yellow-400 text-purple-900 px-6 py-2 rounded-full font-black text-sm uppercase tracking-wider shadow-lg animate-pulse">
              🎁 Oferta Exclusiva
            </div>
          </div>

          {/* Emoji grande */}
          <div className="text-7xl mb-6 animate-bounce">🚀</div>

          {/* Título */}
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Junta-te à<br />
            <span className="text-yellow-300">Oficina de IA</span>
          </h2>

          {/* Descrição */}
          <p className="text-xl text-white/95 mb-8 leading-relaxed max-w-xl mx-auto">
            Uma comunidade em português dedicada a aprender, partilhar e discutir tudo sobre <strong>Inteligência Artificial</strong>.
          </p>

          {/* Benefícios */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 text-left max-w-lg mx-auto border border-white/20">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✨</span>
                <div>
                  <p className="text-white font-semibold">Notícias e ferramentas atualizadas</p>
                  <p className="text-white/80 text-sm">Mantém-te na linha da frente da revolução tecnológica</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="text-white font-semibold">Tutoriais práticos</p>
                  <p className="text-white/80 text-sm">Aprende a aplicar IA no dia a dia e nos negócios</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🤝</span>
                <div>
                  <p className="text-white font-semibold">Comunidade ativa</p>
                  <p className="text-white/80 text-sm">Troca ideias com outros entusiastas e profissionais</p>
                </div>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="flex justify-center gap-6 mb-8 flex-wrap">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/30">
              <p className="text-3xl font-black text-white">100%</p>
              <p className="text-sm text-white/90 font-semibold">GRÁTIS</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/30">
              <p className="text-3xl font-black text-white">🇵🇹</p>
              <p className="text-sm text-white/90 font-semibold">Português</p>
            </div>
          </div>

          {/* Call to Action */}
          <button
            onClick={handleJoin}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-purple-900 font-black text-xl px-12 py-5 rounded-2xl transition-all transform hover:scale-110 shadow-2xl hover:shadow-3xl w-full md:w-auto"
          >
            🎯 Entrar Agora Grátis
          </button>

          <p className="text-white/70 text-sm mt-4">
            Sem custos. Sem compromissos. Cancela quando quiseres.
          </p>
        </div>
      </div>
    </div>
  );
}

