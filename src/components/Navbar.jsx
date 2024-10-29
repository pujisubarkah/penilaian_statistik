import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { useUser } from '../hooks/useUser'; // Pastikan path ini benar

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useUser(); // Pastikan useUser diimpor dengan benar

  const menu = [
    { name: 'Beranda', path: '/' },
    { name: 'EPSS Internal', path: '/EPSS' },
    { name: 'Bantuan', path: '/Bantuan' },
    { name: 'Penilaian Mandiri', path: '/Penilaian' }
  ];

  Modal.setAppElement('#root');
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-[darkred] shadow-md">
      <div className="flex items-center">
        <img src="/lanri.png" alt="Logo" className="h-12 mr-3 p-2" />
        <span className="text-white font-bold text-2xl">PENILAIAN EPSS UNIT KERJA</span>
      </div>

      <ul className="flex gap-6 list-none font-open-sans text-lg text-white">
        {menu.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-white no-underline p-2 rounded"
                  : "text-white no-underline hover:text-[darkred] hover:bg-white transition p-2 rounded"
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
            onClick={openLoginModal}
            className="border-2 border-white bg-[darkred] text-white py-2 px-4 rounded-lg cursor-pointer text-lg hover:bg-white hover:text-[darkred] transition"
          >
            Masuk
          </button>
        )}
      </div>

      {/* Modal Login dan Register (dihapus atau disesuaikan) */}
    </nav>
  );
}

export default Navbar;
