
import axios from 'https://esm.sh/axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token to requests
api.interceptors.request.use((config) => {
  const savedAuth = localStorage.getItem('homify_auth');
  if (savedAuth) {
    const { token } = JSON.parse(savedAuth);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const listingApi = {
  // Public endpoints
  getPublicCards: () => api.get('/public/listings/cards'),
  getPublicDetails: (id: number | string) => api.get(`/public/listings/${id}`),
  search: (keyword: string) => api.get(`/public/listings/search`, { params: { keyword } }),

  // Private endpoints (require auth)
  getMyListings: () => api.get('/private/listings'),
  createListing: (data: any) => api.post('/private/listings/createListing', data),
  updateListing: (id: number | string, data: any) => api.put(`/private/listings/updateListing/${id}`, data),
  deleteListing: (id: number | string) => api.delete(`/private/listings/deleteListing/${id}`),
  contactSeller: (data: { image: string, userText: string, to: string, subject: string, from: string }) =>
    api.post('/private/listings/contactSeller', data),
};

export default api;
