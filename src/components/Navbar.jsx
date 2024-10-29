import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser'; // Ensure this path is correct
import Login from './Login'; // Import the Login component

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useUser(); // Ensure useUser is imported correctly

  const menu = [
    { name: 'Beranda', path: '/' },
    { name: 'EPSS LAN', path: '/EPSS' },
    { name: 'Penilaian Mandiri', path: '/Penilaian' }
  ];

  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isRegisterVisible, setRegisterVisible] = useState(false);

  const openLogin = () => {
    setLoginVisible(true);
  };

  const closeLogin = () => {
    setLoginVisible(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-teal-700 shadow-md">
      <div className="flex items-center">
        <img src="/lanri.png" alt="Logo" className="h-12 mr-3 p-2" />
        <span className="text-white font-bold text-2xl">PEMBINAAN STATISTIK SEKTORAL LANRI</span>
      </div>

      <ul className="flex gap-6 list-none font-open-sans text-lg text-white">
        {menu.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-white no-underline p-2 rounded"
                  : "text-white no-underline hover:text-teal-700 hover:bg-white transition p-2 rounded"
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        {user ? (
          <span onClick={handleLogout} className="text-white text-lg cursor-pointer">
            Selamat Datang, {user.email || user.username}! (Logout)
          </span>
        ) : (
          <button
            onClick={openLogin}
            className="border-2 border-white bg-teal-700 text-white py-2 px-4 rounded-lg cursor-pointer text-lg hover:bg-white hover:text-teal-700 transition"
          >
            Masuk
          </button>
        )}
      </div>

      {/* Login Form Overlay */}
      {isLoginVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-transparent p-8 rounded shadow-lg w-1/3">
            <Login closeModal={closeLogin} />
          
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
