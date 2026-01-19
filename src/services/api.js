import axios from 'axios';

// Use environment variable or fallback to your URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://travel-portfolio-backend.vercel.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints matching your backend routes
export const apiService = {
  // Test connection
  healthCheck: () => api.get('/'),
  
  // Get hero images
  getHeroImages: () => api.get('/api/hero'),
  
  // Get journeys
  getJourneys: () => api.get('/api/journeys'),
  
  // Get gallery images
  getGallery: () => api.get('/api/gallery'),
  
  // Get destinations
  getDestinations: () => api.get('/api/destinations'),
};

export default api;