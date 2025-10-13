/**
 * CUSTOM HOOK: useAuth
 * Maneja toda la lógica de autenticación
 */

import { useState, useEffect } from 'react';
import * as authService from '../services/authService';

export function useAuth() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const usuarioGuardado = authService.obtenerUsuarioActual();
    setUsuario(usuarioGuardado);
    setCargando(false);
  }, []);

  const iniciarSesion = async (email, password) => {
    try {
      setCargando(true);
      setError(null);
      
      const usuarioLogueado = await authService.login(email, password);
      setUsuario(usuarioLogueado);
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setCargando(false);
    }
  };

  const registrarse = async (datosUsuario) => {
    try {
      setCargando(true);
      setError(null);
      
      const usuarioRegistrado = await authService.registrar(datosUsuario);
      setUsuario(usuarioRegistrado);
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setCargando(false);
    }
  };

  const cerrarSesion = () => {
    authService.logout();
    setUsuario(null);
    setError(null);
  };

  const actualizarPerfil = async (datosActualizados) => {
    try {
      setCargando(true);
      setError(null);
      
      const usuarioActualizado = await authService.actualizarPerfil(datosActualizados);
      setUsuario(usuarioActualizado);
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setCargando(false);
    }
  };

  const estaLogueado = () => {
    return usuario !== null;
  };

  return {
    // Español
    usuario,
    cargando,
    error,
    iniciarSesion,
    registrarse,
    cerrarSesion,
    actualizarPerfil,
    estaLogueado,
    // Inglés (aliases)
    user: usuario,
    loading: cargando,
    login: iniciarSesion,
    register: registrarse,
    logout: cerrarSesion,
    updateProfile: actualizarPerfil,
    isAuthenticated: estaLogueado()
  };
}