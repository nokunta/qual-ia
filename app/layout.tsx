import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Qual IA? - Descobre a melhor IA para a tua tarefa',
  description: 'Ferramenta que ajuda a decidir qual o melhor modelo de IA (ChatGPT, Claude, Gemini, Perplexity) para cada tipo de tarefa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}

