// 📁 BRAMHAND/frontend/src/pages/Shiva.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Shiva() {
  const navigate = useNavigate();
  const location = useLocation();
  const dataFromBackend = location.state?.dataFromBackend;

  if (!dataFromBackend) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#0f0c29]">
        <h1 className="text-3xl">🚫 No data found. Please start from Brahma page.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#0f0c29] flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-5xl font-bold mb-8 animate-pulse">🔥 Shiva's Chamber of Final Purification 🔥</h1>

      <p className="text-lg text-center max-w-2xl mb-8">
        🧹 Your karma has undergone the cosmic fire of dissolution.  
        Only pure consciousness remains. You are ready for rebirth. 🌌🛕
      </p>

      <button
        onClick={() => navigate('/summary', { state: { dataFromBackend } })}
        className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full transition transform hover:scale-105"
      >
        🛕 Proceed to Rebirth and Karma Report
      </button>
    </div>
  );
}
