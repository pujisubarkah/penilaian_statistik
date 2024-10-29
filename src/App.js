import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'; // Halaman beranda
import EPSS from './pages/EPSS'; // Halaman EPSS Internal
import Penilaian from './pages/Penilaian'; // Halaman Penilaian Mandiri

function App() {
  return (
    <Router>
      <div>
        {/* Navbar akan selalu terlihat di bagian atas halaman */}
        <Navbar />
        
        {/* Routes untuk konten halaman */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/EPSS" element={<EPSS />} />
          <Route path="/Penilaian" element={<Penilaian />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
