// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import { supabase } from './supabaseClient'; // Pastikan untuk mengimpor supabase

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Menyimpan status login
  const location = useLocation();

  useEffect(() => {
    // Mengecek status login pengguna dengan Supabase
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data) {
        setIsLoggedIn(true);  // Pengguna sudah login
      } else {
        setIsLoggedIn(false); // Pengguna belum login
      }
    };

    checkUser(); // Panggil fungsi cek login
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location]);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  // Using useEffect to call greetUser after component is mounted
  const actionProviderRef = React.useRef(null);

  useEffect(() => {
    if (actionProviderRef.current) {
      actionProviderRef.current.greetUser(); // Call greetUser after mount
    }
  }, []);

  // Cek apakah lokasi saat ini adalah halaman Penilaian atau Questionnaire
  const isChatbotPage = location.pathname === '/Penilaian' || location.pathname === '/questionnaire';

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

      {/* Tampilkan chatbot hanya jika pengguna sudah login dan berada di halaman Penilaian atau Questionnaire */}
      {isLoggedIn && isChatbotPage && isChatbotOpen && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="relative">
            <Chatbot 
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
              ref={actionProviderRef} // Pass ref to actionProvider
            />
            <button 
              onClick={toggleChatbot} 
              className="absolute top-0 right-0 p-2 text-white bg-teal-500 rounded"
            >
              ▼
            </button>
          </div>
        </div>
      )}

      {/* Button untuk membuka chatbot jika ditutup, hanya di halaman Penilaian atau Questionnaire */}
{!isChatbotOpen && isLoggedIn && isChatbotPage && (
  <button 
    onClick={toggleChatbot} 
    className="fixed bottom-4 right-4 z-50 p-2 bg-transparan-500 rounded-full"
  >
    <img 
      src="/Eva.png"  // Make sure the path is correct
      alt="Bot Avatar" 
      style={{
        width: "60px",
        height: "60px",
        borderRadius: "50%",
      }}
    />
  </button>
      )}
    </div>
  );
}

export default App;
