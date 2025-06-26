import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',  // Update if using a Vite proxy
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
