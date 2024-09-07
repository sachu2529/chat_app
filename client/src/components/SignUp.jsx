import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success('Account created successfully!', {
          duration: 2000, // Toast duration
        });
  
        // Delay navigation slightly after the toast
        setTimeout(() => {
          navigate('/signin');
        }, 2000); // Match the duration of the toast
      } else {
        toast.error(data.message || 'Error signing up. Please try again.');
      }
    } catch (err) {
      toast.error('Error signing up. Please try again.');
    }
  };
  
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0F172A] p-4">
      <form onSubmit={handleSignUp} className="bg-[#1E293B] p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">Sign Up</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="px-4 py-2 bg-[#0F172A] text-white border border-pink-600 rounded-md focus:outline-none"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="px-4 py-2 bg-[#0F172A] text-white border border-pink-600 rounded-md focus:outline-none"
            required
          />
        </div>

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

        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
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

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="agree"
            className="mr-2"
            required
          />
          <label htmlFor="agree" className="text-white text-sm">
            I agree with <a href="#" className="text-pink-600">privacy</a> and <a href="#" className="text-pink-600">policy</a>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition duration-300"
        >
          Sign up
        </button>

        <p className="text-white text-sm mt-4 text-center">
          Already have an account? <a href="/signin" className="text-pink-600">Sign in</a>
        </p>
      </form>
      <Toaster position="top-right" />
    </div>
  );
};

export default SignUp;
