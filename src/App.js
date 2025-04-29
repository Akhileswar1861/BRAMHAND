import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Brahma from './pages/Brahma';
import Vishnu from './pages/Vishnu';
import Shiva from './pages/Shiva';
import Summary from './pages/Summary';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/brahma" element={<Brahma />} />
      <Route path="/vishnu" element={<Vishnu />} /> 
      <Route path="/shiva" element={<Shiva />} />
      <Route path="/summary" element={<Summary />} />
    </Routes>
  );
}

export default App;
