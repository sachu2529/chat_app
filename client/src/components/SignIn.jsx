import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Signed in successfully!');
        setTimeout(() => {
          navigate('/chat'); // Navigate to the chat page after a successful sign-in
        }, 2000);
      } else {
        toast.error(data.message || 'Failed to sign in');
      }
    } catch (err) {
      toast.error('Error logging in. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0F172A] p-4">
      <form onSubmit={handleSignIn} className="bg-[#1E293B] p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Sign In | Talky</h2>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 bg-[#0F172A] text-white border border-pink-600 rounded-md focus:outline-none"
            required
          />
        </div>

        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 bg-[#0F172A] text-white border border-pink-600 rounded-md focus:outline-none"
            required
          />
          <span
            className="absolute right-3 top-2 text-pink-600 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition duration-300"
        >
          Log in
        </button>

        <p className="text-white text-sm mt-4 text-center">
          Don't have an account? <a href="/signup" className="text-pink-600">Sign up</a>
        </p>
      </form>
      <Toaster position="top-right" />
    </div>
  );
};

export default SignIn;
