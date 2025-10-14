/**
 * HOOK SIMPLE DE AUTENTICACIÓN
 */

import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login
  const login = (email, password) => {
    // Simulación simple de login
    if (email && password) {
      const userData = {
        id: 1,
        nombre: 'Usuario Demo',
        email: email
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  };

  // Registro
  const register = (nombre, email, password) => {
    if (nombre && email && password) {
      const userData = {
        id: Date.now(),
        nombre: nombre,
        email: email
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Verificar si está logueado
  const isLoggedIn = () => {
    return user !== null;
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isLoggedIn
  };
}