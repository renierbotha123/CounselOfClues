import Constants from 'expo-constants';
import axios from 'axios';
import { getToken } from '../utils/authTokens';

let baseURL;

if (Constants.platform?.web) {
  // When running in browser
  baseURL = 'http://localhost:3000';  // Assuming Express runs locally on your PC
} else {
  // When running on physical device
  baseURL = 'http://192.168.0.229:3000'; // Your PC's LAN IP
}

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
