// src/hooks/useUser.js
import { useState, useEffect } from 'react';

export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulasi memuat data pengguna
    const loadUserData = async () => {
      // Misalkan kita ambil dari localStorage
      const userData = localStorage.getItem('user'); // Ganti ini dengan pengambilan data yang sesuai
      if (userData) {
        setUser(JSON.parse(userData)); // Mengatur user jika ada data
      }
    };

    loadUserData();
  }, []);

  const logout = () => {
    // Logika untuk logout
    localStorage.removeItem('user'); // Hapus data pengguna dari localStorage
    setUser(null); // Set user menjadi null
  };

  return { user, logout };
};
