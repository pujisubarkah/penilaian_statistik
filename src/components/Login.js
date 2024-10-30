import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Make sure you import Supabase client
import { useUser } from '../context/UserContext'; // Import useUser from context

const Login = ({ closeModal, openRegisterModal }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { setUser } = useUser(); // Access setUser from the context
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      // Use Supabase's signIn method for authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login failed:', error.message);
        alert('Login gagal. Email atau password salah.');
        return; // Exit the function if there is an error
      }

      // Store the logged-in user in the context
      setUser(data.user); // Save the user data in the context
      
      // Redirect to the dashboard after successful login
      navigate('/penilaian');
      closeModal(); // Close the modal after successful login
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('Terjadi kesalahan saat login.');
    }
  };

  const handleContactAdmin = () => {
    const { email } = formData;

    if (!email) {
      alert('Silakan masukkan email Anda terlebih dahulu.');
      return;
    }

    alert(`Silakan hubungi admin untuk reset password`);
  };

  return (
    <div className="relative max-w-sm mx-auto p-4 bg-white shadow-lg rounded-lg flex flex-col">
      <button onClick={closeModal} className="absolute top-[0px] right-[20px] text-5xl text-gray-700 hover:text-gray-900">
        &times;
      </button>

      <div className="flex">
        {/* Right side - Login Form */}
        <div className="p-8 w-4/3">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Masuk</h2>

            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-800 transition duration-200"
            >
              Masuk
            </button>

            <p className="mt-2 text-sm text-gray-600">
              <button
                type="button"
                onClick={handleContactAdmin}
                className="text-blue-600 hover:underline"
              >
                Lupa Password? 
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
