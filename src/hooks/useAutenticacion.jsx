/**
 * HOOK DE AUTENTICACIÓN
 * Maneja login, registro y sesión del usuario consumiendo el backend
 */

import { useState, useEffect, useMemo } from 'react';
import { login as loginAPI, registrar as registrarAPI, logout as logoutAPI, obtenerUsuarioActual, estaLogueado as estaLogueadoLS } from '../util/constants';
import { notify } from '../components/ui/notificationHelper';
import logger from '../util/logger';
import { setAuthToken } from '../services/api.js';

function useAutenticacion() {
  // Estado del usuario actual
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // EFECTO: Verificar si hay usuario guardado al iniciar
  useEffect(() => {
    logger.debug('useAutenticacion - Verificando sesión...');
    
    const cargarUsuario = () => {
      const usuarioGuardado = obtenerUsuarioActual();
      
      if (usuarioGuardado) {
        logger.success('useAutenticacion - Usuario encontrado:', usuarioGuardado.nombre);
        setUsuario(usuarioGuardado);
      } else {
        logger.debug('useAutenticacion - No hay sesión activa');
        setUsuario(null);
      }
      
      setCargando(false);
    };
    
    cargarUsuario();
    
    // Listener para cambios en localStorage (sincroniza entre pestañas y componentes)
    const handleStorageChange = (e) => {
      if (e.key === 'usuario' || e.key === 'token') {
        logger.debug('useAutenticacion - Cambio detectado en localStorage');
        cargarUsuario();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
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

      // Allow special-case admin login which may not include an '@'
      if (email !== 'admin' && !email.includes('@')) {
        const error = 'Email inválido';
        setError(error);
        throw new Error(error);
      }

      // Llamar al backend
      logger.debug('useAutenticacion - Iniciando login...');
      const response = await loginAPI(email, password);
      const usuarioLogueado = response.data.usuario;
      const token = response.data.token;
      
      // Configurar el token en el cliente para futuras peticiones
      setAuthToken(token);
      
      logger.success('useAutenticacion - Login exitoso:', usuarioLogueado.nombre);
      
      // Actualizar estado con el usuario
      setUsuario(usuarioLogueado);
      
      return true;
    } catch (err) {
      const mensajeError = err.message || 'Error al iniciar sesión';
      setError(mensajeError);
      logger.error('useAutenticacion - Error en login:', mensajeError);
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
      logger.debug('useAutenticacion - Iniciando registro...');
      const usuarioRegistrado = await registrarAPI(datosUsuario);
      
      setUsuario(usuarioRegistrado);
      logger.success('useAutenticacion - Registro exitoso:', usuarioRegistrado.nombre);
      
      return true;
    } catch (err) {
      const mensajeError = err.message || 'Error al registrarse';
      setError(mensajeError);
      logger.error('useAutenticacion - Error en registro:', mensajeError);
      
      // Mostrar notificación con el error específico
      notify(mensajeError, 'error', 4000);
      
      return false;
    } finally {
      setCargando(false);
    }
  };

  /**
   * FUNCIÓN: Cerrar sesión
   */
  const cerrarSesion = () => {
    logger.debug('useAutenticacion - Cerrando sesión...');
    logoutAPI();
    setUsuario(null);
    setError(null);
  };

  // Verificar si hay sesión activa EN TIEMPO REAL usando useMemo
  const estaLogueado = useMemo(() => {
    const tieneUsuario = usuario !== null;
    const tieneToken = estaLogueadoLS();
    const resultado = tieneUsuario && tieneToken;
    
    logger.debug('useAutenticacion - estaLogueado:', { 
      usuario: usuario?.nombre, 
      tieneToken, 
      resultado 
    });
    
    return resultado;
  }, [usuario]);

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