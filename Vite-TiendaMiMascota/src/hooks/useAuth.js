/**
 * CUSTOM HOOK: useAuth
 * Maneja toda la lógica de autenticación
 */

import { useState, useEffect } from 'react';
import * as authService from '../services/authService';

export function useAuth() {
  // Estado del usuario actual
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  /**
   * EFECTO: Cargar usuario al montar el componente
   */
  useEffect(() => {
    const usuarioGuardado = authService.obtenerUsuarioActual();
    setUsuario(usuarioGuardado);
    setCargando(false);
  }, []);

  /**
   * Inicia sesión
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña
   */
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

  /**
   * Registra un nuevo usuario
   * @param {Object} datosUsuario - Datos del usuario
   */
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

  /**
   * Cierra sesión
   */
  const cerrarSesion = () => {
    authService.logout();
    setUsuario(null);
    setError(null);
  };

  /**
   * Actualiza el perfil del usuario
   * @param {Object} datosActualizados - Datos a actualizar
   */
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

  /**
   * Verifica si el usuario está logueado
   */
  const estaLogueado = () => {
    return usuario !== null;
  };

  // Retornar todo lo que necesitamos en los componentes
  return {
    usuario,           // Usuario actual
    cargando,          // Estado de carga
    error,             // Error si hay
    iniciarSesion,     // Función para login
    registrarse,       // Función para registro
    cerrarSesion,      // Función para logout
    actualizarPerfil,  // Función para actualizar perfil
    estaLogueado       // Función para verificar si está logueado
  };
}