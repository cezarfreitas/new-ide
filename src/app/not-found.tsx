import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-yellow-500 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-white mb-4">Página não encontrada</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>
        
        <Link
          href="/"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-bold px-6 py-3 rounded-lg transition-all duration-300"
        >
          <HomeIcon className="w-5 h-5" />
          <span>Voltar ao Início</span>
        </Link>
      </div>
    </div>
  );
}
