// 📁 BRAMHAND/frontend/src/pages/Landing.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  const handleEnter = () => {
    const audio = new Audio('/bg-audio.mp3');
    audio.loop = true;
    audio.volume = 0.2;
    audio.play();
    navigate('/brahma');
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#0f0c29] flex flex-col items-center justify-center text-white">
      {/* Orbiting Planets Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="relative w-[500px] h-[500px]">
          {/* Sun (center) */}
          <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-yellow-400 rounded-full shadow-lg animate-pulse transform -translate-x-1/2 -translate-y-1/2" />

          {/* Orbiting Planets */}
          <div className="absolute w-full h-full border border-gray-700 rounded-full animate-spin-slow">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full shadow-md" />
          </div>
          <div className="absolute w-[400px] h-[400px] border border-gray-700 rounded-full animate-spin-slow reverse-spin delay-1s">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-pink-400 rounded-full shadow-md" />
          </div>
        </div>
      </div>

      <div className="z-10 text-center">
        <h1 className="text-[80px] font-extrabold tracking-widest text-yellow-400 drop-shadow-[0_0_30px_rgba(255,223,0,0.8)] mb-4 animate-pulse">
          🔱 BRAMHAND
        </h1>

        <div className="flex justify-center gap-12 text-5xl mb-8">
          <span className="animate-spin-slow">🌸</span>
          {/* Custom SVG Chakra */}
          <svg className="w-12 h-12 text-blue-500 animate-spin-slow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="text-yellow-300 animate-bounce">🔱</span>
        </div>

        <p className="text-lg text-gray-300 italic max-w-2xl mx-auto mb-10 leading-relaxed">
          Step into the sacred realm of dataset purification — where karma meets code.
        </p>

        <button
          onClick={handleEnter}
          className="bg-yellow-400 text-black text-2xl font-bold px-10 py-4 rounded-full shadow-2xl hover:scale-110 hover:shadow-[0_0_40px_rgba(255,255,0,0.7)] transition-all duration-500 ease-in-out"
        >
          ✨ Enter BRAMHAND ✨
        </button>

        <p className="text-sm text-gray-400 mt-10">📿 Powered by the Wisdom of the Vedas 🕉️</p>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes reverse-spin {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 30s linear infinite;
          }
          .reverse-spin {
            animation-name: reverse-spin;
          }
          .delay-1s {
            animation-delay: 1s;
          }
        `}
      </style>
    </div>
  );
}
