import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000',  // Update if using a Vite proxy
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
