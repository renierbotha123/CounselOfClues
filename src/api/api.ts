import axios from 'axios';
import { getToken } from '../utils/authTokens';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Or your server IP on device
});

// Add token automatically
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
