"use client"; // Add this directive to mark the component as a client component

import React, { useState } from 'react';
import { axiosInstance } from "@/API/authapi"; // Ensure axiosInstance is imported
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter(); // Initialize the router

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axiosInstance.post('/users/login', {
                username,
                password,
            });
            console.log('Login successful:', response.data);
            
            // Store the token in localStorage
            localStorage.setItem('JWT_token', response.data.token);
            
            // Add a small delay to ensure the token is set before redirecting
            setTimeout(() => {
                router.push('/dashboard');
            }, 300);
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-10 rounded-3xl shadow-lg w-96">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Username:</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-md"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Password:</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-md"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-200"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;