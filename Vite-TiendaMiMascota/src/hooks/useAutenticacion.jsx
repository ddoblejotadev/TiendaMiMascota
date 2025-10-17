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

    if (password.length < 5) {
      alert('La contraseña debe tener al menos 5 caracteres');
      return false;
    }

    // Validar credenciales contra lista de usuarios
    let usuarioExistente = _buscarUsuario(email);
    if (!usuarioExistente) {
      // Para prototipo: crear usuario automáticamente si no existe
      const usuarios = _listarUsuarios();
      usuarioExistente = {
        id: Date.now(),
        nombre: email.split('@')[0],
        email,
        password,
        role: email === 'admin@test.com' ? 'admin' : 'user'
      };
      usuarios.push(usuarioExistente);
      _guardarUsuarios(usuarios);
    }

    if (usuarioExistente.password !== password) {
      alert('Contraseña incorrecta');
      return false;
    }

    const nuevoUsuario = {
      id: usuarioExistente.id,
      nombre: usuarioExistente.nombre,
      email: usuarioExistente.email,
      role: usuarioExistente.role || (email === 'admin@test.com' ? 'admin' : 'user')
    };

    // Guardar sesión
    localStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
    setUsuario(nuevoUsuario);
    return true;
  };

  /**
   * FUNCIÓN: Registrarse
   */
  const registrarse = (nombre, email, password, confirmarPassword, role = null) => {
    // Validaciones
    if (!nombre || !email || !password || !confirmarPassword) {
      alert('Por favor completa todos los campos');
      return false;
    }

    if (!email.includes('@')) {
      alert('Email inválido');
      return false;
    }

    if (password.length < 5) {
      alert('La contraseña debe tener al menos 5 caracteres');
      return false;
    }

    if (password !== confirmarPassword) {
      alert('Las contraseñas no coinciden');
      return false;
    }

    // Crear usuario y guardarlo en la lista de usuarios
    const usuarios = _listarUsuarios();
    if (_buscarUsuario(email)) {
      alert('Ya existe un usuario con ese email');
      return false;
    }

    const nuevoUsuario = {
      id: Date.now(),
      nombre: nombre,
      email: email,
      password: password, // NOTA: texto plano sólo para prototipo
      role: role ? role : (email === 'admin@test.com' ? 'admin' : 'user')
    };

    usuarios.push(nuevoUsuario);
    _guardarUsuarios(usuarios);

    // Iniciar sesión automáticamente
    const sesionUsuario = { id: nuevoUsuario.id, nombre: nuevoUsuario.nombre, email: nuevoUsuario.email, role: nuevoUsuario.role };
    localStorage.setItem('usuario', JSON.stringify(sesionUsuario));
    setUsuario(sesionUsuario);
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