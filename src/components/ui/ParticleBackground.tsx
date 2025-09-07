'use client';

import { useEffect, useState } from 'react';

export default function ParticleBackground() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Standard gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/3 via-transparent to-yellow-600/2"></div>
      
      {/* Floating Particles - Distributed across entire page */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-500/20 rounded-full animate-bounce" style={{animationDuration: '3s', animationDelay: '0s'}}></div>
      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-yellow-400/25 rounded-full animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-yellow-600/15 rounded-full animate-bounce" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
      <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-yellow-500/22 rounded-full animate-bounce" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}></div>
      <div className="absolute top-1/2 left-1/6 w-2.5 h-2.5 bg-yellow-400/18 rounded-full animate-bounce" style={{animationDuration: '4.5s', animationDelay: '1.5s'}}></div>
      <div className="absolute top-1/6 right-1/6 w-1.5 h-1.5 bg-yellow-600/20 rounded-full animate-bounce" style={{animationDuration: '6s', animationDelay: '3s'}}></div>
      <div className="absolute bottom-1/6 left-1/2 w-2 h-2 bg-yellow-500/15 rounded-full animate-bounce" style={{animationDuration: '3.8s', animationDelay: '2.5s'}}></div>
      <div className="absolute top-2/3 right-1/2 w-1 h-1 bg-yellow-400/28 rounded-full animate-bounce" style={{animationDuration: '4.2s', animationDelay: '1.8s'}}></div>
      <div className="absolute top-1/5 left-1/2 w-2.5 h-2.5 bg-yellow-600/12 rounded-full animate-bounce" style={{animationDuration: '5.5s', animationDelay: '2.8s'}}></div>
      <div className="absolute bottom-1/5 right-1/5 w-1.5 h-1.5 bg-yellow-500/18 rounded-full animate-bounce" style={{animationDuration: '4.8s', animationDelay: '0.8s'}}></div>
      <div className="absolute top-3/4 left-1/5 w-2 h-2 bg-yellow-400/15 rounded-full animate-bounce" style={{animationDuration: '5.2s', animationDelay: '3.2s'}}></div>
      <div className="absolute bottom-2/3 right-1/6 w-1 h-1 bg-yellow-600/25 rounded-full animate-bounce" style={{animationDuration: '3.2s', animationDelay: '1.2s'}}></div>
      
      {/* Additional Particles */}
      <div className="absolute top-1/8 left-1/8 w-1.5 h-1.5 bg-yellow-500/22 rounded-full animate-bounce" style={{animationDuration: '3.8s', animationDelay: '0.3s'}}></div>
      <div className="absolute top-1/7 right-1/7 w-2 h-2 bg-yellow-400/15 rounded-full animate-bounce" style={{animationDuration: '4.2s', animationDelay: '1.7s'}}></div>
      <div className="absolute bottom-1/8 left-1/8 w-1 h-1 bg-yellow-600/18 rounded-full animate-bounce" style={{animationDuration: '5.8s', animationDelay: '2.3s'}}></div>
      <div className="absolute bottom-1/7 right-1/7 w-2.5 h-2.5 bg-yellow-500/12 rounded-full animate-bounce" style={{animationDuration: '3.2s', animationDelay: '0.7s'}}></div>
      <div className="absolute top-1/9 left-1/3 w-1.5 h-1.5 bg-yellow-400/25 rounded-full animate-bounce" style={{animationDuration: '4.8s', animationDelay: '1.3s'}}></div>
      <div className="absolute top-1/10 right-1/4 w-1 h-1 bg-yellow-600/22 rounded-full animate-bounce" style={{animationDuration: '5.2s', animationDelay: '2.7s'}}></div>
      <div className="absolute bottom-1/9 left-1/4 w-2 h-2 bg-yellow-500/15 rounded-full animate-bounce" style={{animationDuration: '3.6s', animationDelay: '0.9s'}}></div>
      <div className="absolute bottom-1/10 right-1/3 w-1.5 h-1.5 bg-yellow-400/18 rounded-full animate-bounce" style={{animationDuration: '4.4s', animationDelay: '1.9s'}}></div>
      <div className="absolute top-2/5 left-1/7 w-1 h-1 bg-yellow-600/28 rounded-full animate-bounce" style={{animationDuration: '5.6s', animationDelay: '2.1s'}}></div>
      <div className="absolute top-3/5 right-1/8 w-2.5 h-2.5 bg-yellow-500/10 rounded-full animate-bounce" style={{animationDuration: '3.4s', animationDelay: '0.4s'}}></div>
      <div className="absolute bottom-2/5 left-1/9 w-1.5 h-1.5 bg-yellow-400/22 rounded-full animate-bounce" style={{animationDuration: '4.6s', animationDelay: '1.6s'}}></div>
      <div className="absolute bottom-3/5 right-1/9 w-1 h-1 bg-yellow-600/25 rounded-full animate-bounce" style={{animationDuration: '5.4s', animationDelay: '2.4s'}}></div>
      <div className="absolute top-4/5 left-1/6 w-2 h-2 bg-yellow-500/12 rounded-full animate-bounce" style={{animationDuration: '3.7s', animationDelay: '0.6s'}}></div>
      <div className="absolute top-5/6 right-1/5 w-1.5 h-1.5 bg-yellow-400/18 rounded-full animate-bounce" style={{animationDuration: '4.9s', animationDelay: '1.4s'}}></div>
      <div className="absolute bottom-4/5 left-1/5 w-1 h-1 bg-yellow-600/22 rounded-full animate-bounce" style={{animationDuration: '5.1s', animationDelay: '2.6s'}}></div>
      <div className="absolute bottom-5/6 right-1/6 w-2.5 h-2.5 bg-yellow-500/11 rounded-full animate-bounce" style={{animationDuration: '3.3s', animationDelay: '0.8s'}}></div>
      
      {/* More particles for full page coverage */}
      <div className="absolute top-1/12 left-1/12 w-1 h-1 bg-yellow-500/15 rounded-full animate-bounce" style={{animationDuration: '4.1s', animationDelay: '0.2s'}}></div>
      <div className="absolute top-1/11 right-1/11 w-1.5 h-1.5 bg-yellow-400/18 rounded-full animate-bounce" style={{animationDuration: '5.3s', animationDelay: '1.1s'}}></div>
      <div className="absolute bottom-1/12 left-1/12 w-2 h-2 bg-yellow-600/12 rounded-full animate-bounce" style={{animationDuration: '3.9s', animationDelay: '2.2s'}}></div>
      <div className="absolute bottom-1/11 right-1/11 w-1 h-1 bg-yellow-500/20 rounded-full animate-bounce" style={{animationDuration: '4.7s', animationDelay: '0.6s'}}></div>
      <div className="absolute top-1/13 left-1/13 w-1.5 h-1.5 bg-yellow-400/16 rounded-full animate-bounce" style={{animationDuration: '5.1s', animationDelay: '1.8s'}}></div>
      <div className="absolute top-1/14 right-1/14 w-1 h-1 bg-yellow-600/18 rounded-full animate-bounce" style={{animationDuration: '3.7s', animationDelay: '2.9s'}}></div>
      <div className="absolute bottom-1/13 left-1/13 w-2.5 h-2.5 bg-yellow-500/10 rounded-full animate-bounce" style={{animationDuration: '4.3s', animationDelay: '0.4s'}}></div>
      <div className="absolute bottom-1/14 right-1/14 w-1.5 h-1.5 bg-yellow-400/14 rounded-full animate-bounce" style={{animationDuration: '5.5s', animationDelay: '1.7s'}}></div>
      
      {/* Animated Lines */}
      <div className="absolute top-1/4 left-1/4 w-20 h-0.5 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/3 right-1/3 w-16 h-0.5 bg-gradient-to-l from-transparent via-yellow-400/12 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-1/3 left-1/3 w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-600/8 to-transparent animate-pulse" style={{animationDelay: '3s'}}></div>
      <div className="absolute bottom-1/4 right-1/4 w-18 h-0.5 bg-gradient-to-l from-transparent via-yellow-500/10 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
      
      {/* Very subtle grid pattern */}
      <div className="absolute inset-0 opacity-2" style={{
        backgroundImage: `
          linear-gradient(rgba(251, 191, 36, 0.01) 1px, transparent 1px),
          linear-gradient(90deg, rgba(251, 191, 36, 0.01) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px'
      }}></div>
    </div>
  );
}