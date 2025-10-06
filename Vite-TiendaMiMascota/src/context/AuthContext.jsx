import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulación de verificación de token al cargar la aplicación
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        setUser(JSON.parse(userData));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      // Simulación de llamada a API
      if (!email || !password) {
        throw new Error('Email y contraseña son requeridos');
      }

      // Simulación de validación - en un caso real sería una llamada al backend
      if (email === 'admin@mimascota.com' && password === 'admin123') {
        const userData = {
          id: 1,
          email: email,
          name: 'Administrador',
          role: 'admin'
        };

        localStorage.setItem('authToken', 'fake-jwt-token');
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
        return { success: true, user: userData };
      } else if (email === 'usuario@test.com' && password === 'user123') {
        const userData = {
          id: 2,
          email: email,
          name: 'Usuario Test',
          role: 'user'
        };

        localStorage.setItem('authToken', 'fake-jwt-token');
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
        return { success: true, user: userData };
      } else {
        throw new Error('Credenciales incorrectas');
      }
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    error,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
