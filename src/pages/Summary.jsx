// 📁 BRAMHAND/frontend/src/pages/Summary.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { saveAs } from 'file-saver';

export default function Summary() {
  const location = useLocation();
  const dataFromBackend = location.state?.dataFromBackend;

  if (!dataFromBackend) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-b from-yellow-300 via-orange-400 to-pink-500">
        <h1 className="text-3xl">🚫 No data found. Please start from Brahma page.</h1>
      </div>
    );
  }

  const { preview_data, metrics, task_type, columns } = dataFromBackend;

  const downloadPurifiedCSV = () => {
    const csvRows = [];

    // Header
    csvRows.push(columns.join(','));

    // Data
    preview_data.forEach(row => {
      const rowData = columns.map(col => row[col] !== undefined ? row[col] : '');
      csvRows.push(rowData.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'bramhand_final_purified_karma.csv');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-300 via-orange-400 to-pink-500 flex flex-col items-center justify-start p-6 text-black">
      <h1 className="text-5xl font-bold mb-8 animate-pulse mt-8">📜 Karma Purification Complete</h1>

      {/* Cosmic Stats */}
      <div className="w-full max-w-5xl bg-white rounded-lg p-8 shadow-2xl mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">🌸 Your Final Karma Evaluation 🌸</h2>

        <p className="text-center text-lg mb-8">🔮 Detected Task Type: <strong className="text-purple-600">{task_type.toUpperCase()}</strong></p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {metrics &&
            Object.entries(metrics).map(([key, value]) => (
              <div key={key} className="flex flex-col items-center justify-center bg-yellow-100 p-4 rounded-lg shadow-md">
                <span className="text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                <span className="text-xl font-bold text-black">{typeof value === 'number' ? (value * 100).toFixed(2) + '%' : value}</span>
              </div>
            ))
          }
        </div>
      </div>

      {/* Downloads */}
      <div className="flex flex-col gap-4 items-center">
        <button
          onClick={downloadPurifiedCSV}
          className="bg-green-400 hover:bg-green-500 text-black font-bold py-3 px-8 rounded-full transition transform hover:scale-105"
        >
          📥 Download Final Purified Karma CSV
        </button>

        {/* Later We can Add PDF Download */}
        {/* <button className="bg-blue-400 hover:bg-blue-500 text-black font-bold py-3 px-8 rounded-full transition transform hover:scale-105">
          📜 Download Karma Journey PDF (Coming Soon)
        </button> */}
      </div>

      {/* Cosmic Blessing */}
      <div className="mt-10 text-center max-w-xl">
        <p className="text-lg italic text-gray-800">
          \"From the cosmic fire of dissolution, your karma has been reborn pure and strong.  
          May your future journeys be filled with light. 🌟\"  
        </p>
      </div>
    </div>
  );
}
