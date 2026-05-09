import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api", 
});

console.log("My API Base URL is:", api.defaults.baseURL);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Make sure 'token' is your exact key
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If the backend rejects the token (401 or 403)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn("Session expired or user deleted. Kicking to login...");
      
      // 1. Wipe the invalid credentials
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      // 2. Force a hard redirect to the login page
      // Note: Make sure your login route is exactly '/login'
      window.location.href = '/login';
    }
    
    // Pass the error back down the chain so useProfile can still see it
    return Promise.reject(error);
  }
);