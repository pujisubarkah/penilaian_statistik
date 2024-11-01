import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Make sure you import Supabase client

const Login = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Untuk menangani kesalahan login
  const navigate = useNavigate(); // Gunakan useNavigate untuk redirecting

  const signInWithEmail = async () => {
    // Reset error sebelum mencoba login
    setError(null);

    // Attempt login with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error logging in with email and password:', error.message);
      setError('Invalid email or password');
    } else {
      console.log('Logged in successfully:', data);
      navigate('/Penilaian', { replace: true }); // Redirect to /Penilaian without adding to history
      onClose(); // Tutup modal setelah login berhasil
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    await signInWithEmail();  // Panggil fungsi sign-in
  };

    if (!isOpen) return null; // Jika modal tidak terbuka, kembalikan null

  return (
    <div className="relative max-w-sm mx-auto p-4 bg-white shadow-lg rounded-lg flex flex-col">
      <button onClick={onClose} className="absolute top-[0px] right-[20px] text-5xl text-gray-700 hover:text-gray-900">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state email
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state password
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {error && (
              <div className="mb-4 text-red-500">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-800 transition duration-200"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
