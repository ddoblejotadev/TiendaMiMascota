/**
 * HOOK DE AUTENTICACIÓN
 * Maneja login, registro y sesión del usuario consumiendo el backend
 */

import { useState, useEffect } from 'react';
import { login as loginAPI, registrar as registrarAPI, logout as logoutAPI, obtenerUsuarioActual, estaLogueado as verificarSesion } from '../util/constants';

function useAutenticacion() {
  // Estado del usuario actual
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // EFECTO: Verificar si hay usuario guardado al iniciar
  useEffect(() => {
    console.log('🔍 useAutenticacion - Verificando sesión...');
    
    const usuarioGuardado = obtenerUsuarioActual();
    
    if (usuarioGuardado) {
      console.log('✅ useAutenticacion - Usuario encontrado:', usuarioGuardado);
      setUsuario(usuarioGuardado);
    } else {
      console.log('ℹ️ useAutenticacion - No hay sesión activa');
      setUsuario(null);
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
        const error = 'Por favor completa todos los campos';
        setError(error);
        throw new Error(error);
      }

      if (!email.includes('@')) {
        const error = 'Email inválido';
        setError(error);
        throw new Error(error);
      }

      // Llamar al backend
      console.log('🔐 useAutenticacion - Iniciando login...');
      const usuarioLogueado = await loginAPI(email, password);
      
      setUsuario(usuarioLogueado);
      console.log('✅ useAutenticacion - Login exitoso:', usuarioLogueado);
      
      return true;
    } catch (err) {
      const mensajeError = err.message || 'Error al iniciar sesión';
      setError(mensajeError);
      console.error('❌ useAutenticacion - Error en login:', mensajeError);
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
        const error = 'Por favor completa todos los campos';
        setError(error);
        throw new Error(error);
      }

      if (!datosUsuario.email.includes('@')) {
        const error = 'Email inválido';
        setError(error);
        throw new Error(error);
      }

      if (datosUsuario.password.length < 6) {
        const error = 'La contraseña debe tener al menos 6 caracteres';
        setError(error);
        throw new Error(error);
      }

      // Llamar al backend
      console.log('📝 useAutenticacion - Iniciando registro...');
      const usuarioRegistrado = await registrarAPI(datosUsuario);
      
      setUsuario(usuarioRegistrado);
      console.log('✅ useAutenticacion - Registro exitoso:', usuarioRegistrado);
      
      return true;
    } catch (err) {
      const mensajeError = err.message || 'Error al registrarse';
      setError(mensajeError);
      console.error('❌ useAutenticacion - Error en registro:', mensajeError);
      return false;
    } finally {
      setCargando(false);
    }
  };

  /**
   * FUNCIÓN: Cerrar sesión
   */
  const cerrarSesion = () => {
    console.log('🚪 useAutenticacion - Cerrando sesión...');
    logoutAPI();
    setUsuario(null);
    setError(null);
  };

  // Verificar si hay sesión activa EN TIEMPO REAL
  const estaLogueado = usuario !== null && verificarSesion();

  // Retornar todo (con alias para compatibilidad)
  return {
    usuario,
    cargando,
    error,
    // Nombres principales
    iniciarSesion,
    registrarse,
    cerrarSesion,
    estaLogueado,
    // Alias para compatibilidad
    login: iniciarSesion,
    registrar: registrarse,
    logout: cerrarSesion
  };
}

export default useAutenticacion;