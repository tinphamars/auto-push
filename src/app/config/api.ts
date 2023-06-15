import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:7171/api',
  timeout: 5000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default instance;