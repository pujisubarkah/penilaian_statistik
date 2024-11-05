// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EPSS from './pages/EPSS';
import Penilaian from './pages/Penilaian';
import Questionnaire from './pages/Questionnaire'; // Import the Questionnaire page
import LoadingSpinner from './components/LoadingSpinner'; // Loading icon component
import Chatbot from './components/Chatbot';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show loading spinner on route change
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500); // Adjust time as needed

    return () => clearTimeout(timer); // Clean up on unmount
  }, [location]);

  return (
    <div>
      <Navbar />

      {/* Display LoadingSpinner if loading */}
      {isLoading && <LoadingSpinner />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/EPSS" element={<EPSS />} />
        <Route path="/Penilaian" element={<Penilaian />} />
        <Route path="/Questionnaire" element={<Questionnaire />} /> {/* Add Questionnaire route */}
      </Routes>
  <Chatbot />
    </div>
  );
}

export default App;
