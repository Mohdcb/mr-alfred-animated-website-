import axios from 'axios';
import { useRouter } from 'next/navigation';

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://finanace-backend.onrender.com/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage if it exists
    const token = typeof window !== 'undefined' ? localStorage.getItem('JWT_token') : null;
    
    if (token) {
      config.headers.Authorization = ` ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('API Error:', error.response?.status);
    
    // Check if error is 401 Unauthorized
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized access detected, redirecting to login...');
      
      // Clear any auth tokens
      if (typeof window !== 'undefined') {
        localStorage.removeItem('JWT_token');
        
        // Force redirect to login page
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Export a function to check auth status and redirect if needed
export const checkAuthAndRedirect = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('JWT_token') : null;
  
  if (!token && typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
    window.location.href = '/login';
    return false;
  }
  
  return true;
};
