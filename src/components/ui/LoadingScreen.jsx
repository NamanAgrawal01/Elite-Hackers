import React from 'react';
import MatrixRain from './MatrixRain';

const LoadingScreen = ({ message = "INITIALIZING SYSTEM..." }) => {
  return (
    <div className="fixed inset-0 bg-[#050508] flex flex-col items-center justify-center z-[9999]">
      <MatrixRain opacity={0.15} />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 border-2 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
        
        <div className="font-mono text-primary text-xs tracking-[0.5em] animate-pulse uppercase">
          {message}
        </div>
        
        <div className="mt-8 flex gap-2">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" 
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
