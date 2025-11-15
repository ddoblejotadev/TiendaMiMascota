/**
 * HOOK DE AUTENTICACIÓN
 * Maneja login, registro y sesión del usuario consumiendo el backend
 */

import { useState, useEffect } from 'react';
import { login as loginAPI, registrar as registrarAPI, logout as logoutAPI, obtenerUsuarioActual, estaLogueado } from '../util/constants';

function useAutenticacion() {
  // Estado del usuario actual
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // EFECTO: Verificar si hay usuario guardado al iniciar
  useEffect(() => {
    const usuarioGuardado = obtenerUsuarioActual();
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
    }
    setCargando(false);
  }, []);

  // Helpers para gestión de usuarios en localStorage (solo para prototipo)
  const _listarUsuarios = () => {
    const raw = localStorage.getItem('usuarios_v1');
    return raw ? JSON.parse(raw) : [];
  };

  const _guardarUsuarios = (lista) => {
    localStorage.setItem('usuarios_v1', JSON.stringify(lista));
  };

  const _buscarUsuario = (email) => {
    return _listarUsuarios().find(u => u.email === email) || null;
  };

  /**
   * FUNCIÓN: Iniciar sesión contra el backend
   */
  const iniciarSesion = async (email, password) => {
    try {
      setError(null);
      setCargando(true);

      // Validación simple
      if (!email || !password) {
        setError('Por favor completa todos los campos');
        return false;
      }

      if (!email.includes('@')) {
        setError('Email inválido');
        return false;
      }

      // Llamar al backend
      const usuarioLogueado = await loginAPI(email, password);
      setUsuario(usuarioLogueado);
      return true;
    } catch (err) {
      const mensajeError = err.message || 'Error al iniciar sesión';
      setError(mensajeError);
      console.error('Error de login:', err);
      return false;
    } finally {
      setCargando(false);
    }
  };

  /**
   * FUNCIÓN: Registrarse contra el backend
   */
  const registrarse = async (datosUsuario) => {
    try {
      setError(null);
      setCargando(true);

      // Validaciones
      if (!datosUsuario.email || !datosUsuario.password || !datosUsuario.nombre) {
        setError('Por favor completa todos los campos');
        return false;
      }

      if (!datosUsuario.email.includes('@')) {
        setError('Email inválido');
        return false;
      }

      if (datosUsuario.password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return false;
      }

      // Llamar al backend
      const usuarioRegistrado = await registrarAPI(datosUsuario);
      setUsuario(usuarioRegistrado);
      return true;
    } catch (err) {
      const mensajeError = err.message || 'Error al registrarse';
      setError(mensajeError);
      console.error('Error de registro:', err);
      return false;
    } finally {
      setCargando(false);
    }
  };

  /**
   * FUNCIÓN: Cerrar sesión
   */
  const cerrarSesion = () => {
    logoutAPI();
    setUsuario(null);
  };

  /**
   * FUNCIÓN: Verificar si hay usuario logueado
   */
  const estaAutenticado = () => {
    return estaLogueado();
  };

  // Retornar todo
  return {
    usuario,
    cargando,
    error,
    iniciarSesion,
    registrarse,
    cerrarSesion,
    estaAutenticado
  };
}

export default useAutenticacion;