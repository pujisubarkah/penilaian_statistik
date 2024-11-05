import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Login from './Login'; // Import the Login component
import { supabase } from '../supabaseClient'; // Make sure you import Supabase client
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


function Navbar() {
  const [isModalOpen, setModalOpen] = useState(false); // State for modal
  const [user, setUser] = useState(null); // State to store user information

  const menu = [
      { name: 'Beranda', path: '/' },
      { name: 'EPSS LAN', path: '/EPSS' },

    ...(user ? [{ name: 'Penilaian Mandiri', path: '/Penilaian' }] : [])
  ];

  const openModal = () => setModalOpen(true);

  const closeModal = () => setModalOpen(false);

  // Function for Logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error during logout:', error.message);
    } else {
        setUser(null); // Reset user state to null after logout
    }
  };

  // Effect to check user status and fetch cart item count
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user || null;

      // Check if currentUser exists before making any queries
      if (currentUser) {
        const { error: profileError } = await supabase
          .schema('simbatik')
          .from('unit_kerja')
          .select('*')
          .eq('user_id', currentUser.id)
          .single();

        if (profileError) {
          console.error('Error fetching user profile:', profileError.message);
        } else {
          setUser(currentUser);
        }
      }
    }

    getSession(); // Call getSession when the component mounts

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    // Cleanup the listener on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <React.Fragment>
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

      {/* Login/Logout Section */}
      <div className="flex items-center gap-4">
        {user ? (
          <div>
            <span className="text-white text-lg">
              Selamat Datang, {user.email || user.username}!
            </span>
            <button
              onClick={handleLogout}
              className="border-2 border-white bg-teal-700 text-white py-2 px-4 rounded-lg cursor-pointer text-lg hover:bg-white hover:text-teal-700 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={openModal}
            className="border-2 border-white bg-teal-700 text-white py-2 px-4 rounded-lg cursor-pointer text-lg hover:bg-white hover:text-teal-700 transition"
          >
            <i className="fas fa-user mr-2"></i>
            Login
          </button>
        )}
      </div>

      {/* Login Form Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-1/3">
            <Login isOpen={isModalOpen} onClose={closeModal} onLoginSuccess={(loggedInUser) => {
              setUser(loggedInUser);
              closeModal();
            }} />
          </div>
        </div>
      )}
    </nav>
    </React.Fragment>
  );
}

export default Navbar;
