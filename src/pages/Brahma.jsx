import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function Brahma() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setIsUploading(true);

      // ✅ FIX: Save response
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 10000
      });

      console.log('✅ Backend Response:', response.data);

      if (response.status !== 200 || !response.data.success) {
        alert(`❌ Upload failed: ${response.data?.error || 'Unknown error'}`);
        return;
      }

      // ✅ Save backend response to LocalStorage
      localStorage.setItem('bramhandData', JSON.stringify(response.data));

      // ✅ Navigate to Vishnu
      navigate('/vishnu');

    } catch (error) {
      console.error('❌ Upload failed:', error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#0f0c29] flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-5xl font-bold mb-8 animate-pulse">🪔 Brahma's Chamber of Creation</h1>

      <div
        {...getRootProps()}
        className="w-full max-w-3xl p-10 border-4 border-dashed border-yellow-400 rounded-xl bg-[#1a1a2e] flex flex-col items-center justify-center cursor-pointer hover:bg-[#16213e] transition"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-lg">Drop your sacred file here... 📂</p>
        ) : (
          <p className="text-lg">Drag & drop a file here, or click to select (CSV, Excel)</p>
        )}
      </div>

      {selectedFile && (
        <div className="mt-6 text-lg">
          Uploaded File: <span className="text-yellow-400">{selectedFile.name}</span>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={isUploading}
        className={`mt-8 ${isUploading ? 'bg-yellow-300' : 'bg-yellow-400 hover:bg-yellow-500'} text-black font-bold py-3 px-8 rounded-full transition transform hover:scale-105`}
      >
        {isUploading ? '⏳ Purifying...' : '✨ Begin Karma Purification ✨'}
      </button>
    </div>
  );
}
