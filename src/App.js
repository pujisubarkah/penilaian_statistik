// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EPSS from './pages/EPSS';
import Penilaian from './pages/Penilaian';
import Questionnaire from './pages/Questionnaire';
import LoadingSpinner from './components/LoadingSpinner';
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./chatbot/config";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(true); // State to control chatbot visibility
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);

    return () => clearTimeout(timer);
  }, [location]);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {isLoading && <LoadingSpinner />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/EPSS" element={<EPSS />} />
        <Route path="/Penilaian" element={<Penilaian />} />
        <Route path="/Questionnaire" element={<Questionnaire />} />
      </Routes>

      {/* Chatbot positioned fixed at the bottom right */}
      {isChatbotOpen && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="relative">
            <Chatbot 
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
            <button 
              onClick={toggleChatbot} 
              className="absolute top-0 right-0 p-2 text-white bg-red-500 rounded-full"
            >
              X
            </button>
          </div>
        </div>
      )}
      
      {/* Button to open the chatbot again if closed */}
      {!isChatbotOpen && (
        <button 
          onClick={toggleChatbot} 
          className="fixed bottom-4 right-4 z-50 p-2 text-white bg-teal-500 rounded-full"
        >
          Bot
        </button>
      )}
    </div>
  );
}

export default App;
