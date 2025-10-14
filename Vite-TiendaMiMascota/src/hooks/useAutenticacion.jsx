/**
 * HOOK DE AUTENTICACIÓN
 * Maneja login, registro y sesión del usuario
 */

import { useState, useEffect } from 'react';

function useAutenticacion() {
  // Estado del usuario actual
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // EFECTO: Verificar si hay usuario guardado al iniciar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  /**
   * FUNCIÓN: Iniciar sesión
   */
  const iniciarSesion = (email, password) => {
    // Validación simple
    if (!email || !password) {
      alert('Por favor completa todos los campos');
      return false;
    }

    if (!email.includes('@')) {
      alert('Email inválido');
      return false;
    }

    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    // Crear usuario (en un proyecto real se validaría con el servidor)
    const nuevoUsuario = {
      id: Date.now(),
      nombre: email.split('@')[0], // Usar parte del email como nombre
      email: email
    };

    // Guardar usuario
    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
    setUsuario(nuevoUsuario);
    
    return true;
  };

  /**
   * FUNCIÓN: Registrarse
   */
  const registrarse = (nombre, email, password, confirmarPassword) => {
    // Validaciones
    if (!nombre || !email || !password || !confirmarPassword) {
      alert('Por favor completa todos los campos');
      return false;
    }

    if (!email.includes('@')) {
      alert('Email inválido');
      return false;
    }

    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (password !== confirmarPassword) {
      alert('Las contraseñas no coinciden');
      return false;
    }

    // Crear usuario
    const nuevoUsuario = {
      id: Date.now(),
      nombre: nombre,
      email: email
    };

    // Guardar usuario
    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
    setUsuario(nuevoUsuario);
    
    return true;
  };

  /**
   * FUNCIÓN: Cerrar sesión
   */
  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  /**
   * FUNCIÓN: Verificar si hay usuario logueado
   */
  const estaLogueado = () => {
    return usuario !== null;
  };

  // Retornar todo
  return {
    usuario,
    cargando,
    iniciarSesion,
    registrarse,
    cerrarSesion,
    estaLogueado
  };
}

export default useAutenticacion;