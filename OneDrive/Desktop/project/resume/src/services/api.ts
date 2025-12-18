import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// User API
export const userAPI = {
  updateProfile: async (profileData: any) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },

  toggleBookmark: async (internshipId: string) => {
    const response = await api.post(`/users/bookmark/${internshipId}`);
    return response.data;
  },

  getBookmarks: async () => {
    const response = await api.get('/users/bookmarks');
    return response.data;
  },

  saveSearchHistory: async (query: any, results: string[]) => {
    const response = await api.post('/users/search-history', { query, results });
    return response.data;
  },
};

// Internships API
export const internshipsAPI = {
  getAll: async (filters?: {
    sector?: string;
    location?: string;
    type?: string;
    skills?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get('/internships', { params: filters });
    return response.data;
  },

  getRecommendations: async () => {
    const response = await api.get('/internships/recommendations');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/internships/${id}`);
    return response.data;
  },
};

export default api;