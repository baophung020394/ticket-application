// axios-client.ts
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:4200/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to handle token
axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
