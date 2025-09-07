'use client';

import { useEffect } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function GlobalError({
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
    <html>
      <body>
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
          <div className="text-center">
            <div className="mb-8">
              <ExclamationTriangleIcon className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-white mb-4">Erro Global</h1>
              <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto">
                Ocorreu um erro crítico na aplicação. Tente recarregar a página.
              </p>
            </div>
            
            <button
              onClick={reset}
              className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-bold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
