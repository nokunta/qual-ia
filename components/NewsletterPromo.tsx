'use client';

import { useEffect, useState } from 'react';

export default function NewsletterPromo() {
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    // Verifica se o URL contém o parâmetro "newsletter"
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('newsletter')) {
      setShowPromo(true);
    }
  }, []);

  const handleClose = () => {
    setShowPromo(false);
  };

  const handleJoin = () => {
    window.open('https://www.skool.com/couceloia-3033/about?ref=6b5518d997064e459336d02c601ad74c', '_blank');
  };

  if (!showPromo) return null;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
          {/* Conteúdo */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-2xl">🚀</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm sm:text-base">
                Junta-te à <span className="text-yellow-300">Oficina de IA</span> - Comunidade Grátis 🇵🇹
              </p>
            </div>
          </div>

          {/* Botões */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleJoin}
              className="flex-1 sm:flex-none bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold text-sm px-5 py-2 rounded-lg transition-all"
            >
              Entrar Grátis
            </button>
            <button
              onClick={handleClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded flex items-center justify-center text-lg transition-all"
              aria-label="Fechar"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

