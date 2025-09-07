'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <ExclamationTriangleIcon className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-4">Algo deu errado!</h1>
          <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto">
            Ocorreu um erro inesperado. Tente novamente ou volte à página inicial.
          </p>
        </div>
        
        <div className="space-x-4">
          <button
            onClick={reset}
            className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-bold px-6 py-3 rounded-lg transition-all duration-300"
          >
            Tentar Novamente
          </button>
          
          <Link
            href="/"
            className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}
