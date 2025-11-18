import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://tiendamimascotabackends.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir JWT automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar refresh token automáticamente
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      const refreshToken = localStorage.getItem('token'); // Asumiendo que el token actual es refresh o ajustar
      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
            headers: { Authorization: `Bearer ${refreshToken}` },
          });
          const newToken = refreshResponse.data.token;
          localStorage.setItem('token', newToken);
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return api(error.config);
        } catch (refreshError) {
          console.warn('Error al refrescar token:', refreshError);
          localStorage.removeItem('token');
          window.location.href = '/iniciar-sesion'; // Redirigir a login
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;