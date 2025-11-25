import axios from 'axios';

const DEFAULT_PROD = 'https://tiendamimascotabackends.onrender.com/api';
const baseURL = import.meta.env.VITE_API_BASE_URL
  || (import.meta.env.PROD ? DEFAULT_PROD : 'http://localhost:8080/api');

const api = axios.create({ baseURL });

// Función para setear/quitar token en headers y localStorage
export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
}

// Inicializa header si ya hay token en localStorage
const existing = localStorage.getItem('token');
if (existing) setAuthToken(existing);

export default api;