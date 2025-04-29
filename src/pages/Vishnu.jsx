import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Vishnu() {
  const navigate = useNavigate();
  const location = useLocation();
  let dataFromBackend = location.state?.dataFromBackend;

  if (!dataFromBackend) {
    // Try to recover from localStorage
    const storedData = localStorage.getItem('bramhandData');
    if (storedData) {
      dataFromBackend = JSON.parse(storedData);
    }
  }

  if (!dataFromBackend || !dataFromBackend.columns) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#0f0c29]">
        <h1 className="text-3xl">🚫 No data or invalid data received. Please start from Brahma page.</h1>
      </div>
    );
  }

  const { preview_data, columns, metrics, task_type } = dataFromBackend;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#0f0c29] flex flex-col items-center justify-start p-6 text-white">
      <h1 className="text-5xl font-bold mb-8 animate-pulse mt-8">🔱 Vishnu's Chamber of Purification</h1>

      {/* Preview of Data */}
      <div className="w-full max-w-5xl mb-8">
        <h2 className="text-2xl font-semibold mb-4">📜 Purified Karma Data:</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-gray-300 border border-gray-600">
            <thead className="bg-[#212146]">
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx} className="border px-4 py-2">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preview_data.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="border px-4 py-2 text-center">
                      {row[col] ?? '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Metrics */}
      <div className="w-full max-w-4xl bg-[#1a1a2e] rounded-lg p-6 shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">📊 Cosmic Evaluation Metrics:</h2>
        <p className="text-lg mb-4">🔮 Detected Task Type: <strong className="text-yellow-400">{task_type.toUpperCase()}</strong></p>
        <div className="space-y-2">
          {metrics && Object.entries(metrics).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b border-gray-600 py-2">
              <span className="capitalize">{key.replace('_', ' ')}:</span>
              <span className="font-semibold text-white">
                {Number.isFinite(value) ? Number(value).toLocaleString() : 'N/A'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Proceed */}
      <button
        onClick={() => navigate('/shiva', { state: { dataFromBackend } })}
        className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full transition transform hover:scale-105"
      >
        🛕 Proceed to Shiva
      </button>
    </div>
  );
}
