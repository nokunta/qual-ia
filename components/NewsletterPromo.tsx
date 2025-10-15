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
      className={`fixed top-0 left-0 right-0 z-50 shadow-2xl transition-all duration-500 ${
        isClosing ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'
      }`}
    >
      {/* Banner Principal */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 relative overflow-hidden">
        {/* Efeitos decorativos de fundo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32"></div>
        
        <div className="relative px-4 py-4 md:py-5">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
              {/* Conteúdo do banner */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Emoji animado */}
                <div className="text-4xl md:text-5xl animate-bounce hidden sm:block">🚀</div>
                
                <div className="flex-1 min-w-0">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-xs font-black uppercase mb-2 animate-pulse">
                    <span>🎁</span>
                    <span>Oferta Exclusiva</span>
                  </div>
                  
                  {/* Título e descrição */}
                  <div className="space-y-1">
                    <h2 className="text-xl md:text-2xl font-black text-white leading-tight">
                      Junta-te à <span className="text-yellow-300">Oficina de IA</span>
                    </h2>
                    <p className="text-sm md:text-base text-white/90 font-medium hidden md:block">
                      Comunidade portuguesa de IA • Grátis • Tutoriais • Ferramentas • Networking
                    </p>
                    <p className="text-xs text-white/90 font-medium md:hidden">
                      Comunidade portuguesa de IA 🇵🇹
                    </p>
                  </div>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={handleJoin}
                  className="flex-1 md:flex-none bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-purple-900 font-black text-sm md:text-base px-6 md:px-8 py-3 md:py-3.5 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  🎯 Entrar Grátis
                </button>
                
                <button
                  onClick={handleClose}
                  className="w-10 h-10 md:w-11 md:h-11 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white text-2xl font-bold transition-all hover:scale-110 flex-shrink-0"
                  aria-label="Fechar"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de destaque adicional */}
      <div className="bg-yellow-400 text-purple-900 text-center py-2 px-4 text-xs md:text-sm font-bold">
        ✨ 100% Grátis • Sem compromissos • Cancela quando quiseres
      </div>
    </div>
  );
}

