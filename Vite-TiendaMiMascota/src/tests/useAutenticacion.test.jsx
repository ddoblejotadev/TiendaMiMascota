/**
 * PRUEBAS PARA EL HOOK USEAUTENTICACION
 * - Estado inicial ✅
 * - Iniciar sesión ✅
 * - Cerrar sesión ✅
 * - Registro de usuarios ✅
 * - Persistencia en localStorage ✅
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAutenticacion } from '../hooks/useAutenticacion';

// Mock de localStorage
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('useAutenticacion Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  // PRUEBA DE ESTADO INICIAL
  it('debe tener estado inicial correcto cuando no hay usuario en localStorage', () => {
    const { result } = renderHook(() => useAutenticacion());
    
    expect(result.current.usuario).toBeNull();
    expect(result.current.estaAutenticado).toBe(false);
  });

  it('debe cargar el usuario desde localStorage si existe', () => {
    const usuarioMock = {
      id: 1,
      nombre: 'Juan Pérez',
      email: 'juan@example.com'
    };
    
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioMock));
    
    const { result } = renderHook(() => useAutenticacion());
    
    expect(result.current.usuario).toEqual(usuarioMock);
    expect(result.current.estaAutenticado).toBe(true);
  });

  // PRUEBA DE INICIO DE SESIÓN
  it('debe iniciar sesión correctamente con credenciales válidas', () => {
    const { result } = renderHook(() => useAutenticacion());
    
    act(() => {
      const exito = result.current.iniciarSesion('usuario@example.com', 'password123');
      expect(exito).toBe(true);
    });
    
    expect(result.current.estaAutenticado).toBe(true);
    expect(result.current.usuario).not.toBeNull();
  });

  it('debe rechazar inicio de sesión con credenciales inválidas', () => {
    const { result } = renderHook(() => useAutenticacion());
    
    act(() => {
      const exito = result.current.iniciarSesion('', '');
      expect(exito).toBe(false);
    });
    
    expect(result.current.estaAutenticado).toBe(false);
    expect(result.current.usuario).toBeNull();
  });

  // PRUEBA DE CIERRE DE SESIÓN
  it('debe cerrar sesión correctamente', () => {
    const usuarioMock = {
      id: 1,
      nombre: 'Juan Pérez',
      email: 'juan@example.com'
    };
    
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioMock));
    
    const { result } = renderHook(() => useAutenticacion());
    
    expect(result.current.estaAutenticado).toBe(true);
    
    act(() => {
      result.current.cerrarSesion();
    });
    
    expect(result.current.estaAutenticado).toBe(false);
    expect(result.current.usuario).toBeNull();
    expect(localStorage.getItem('usuarioActual')).toBeNull();
  });

  // PRUEBA DE REGISTRO
  it('debe registrar un nuevo usuario correctamente', () => {
    const { result } = renderHook(() => useAutenticacion());
    
    const nuevoUsuario = {
      nombre: 'María González',
      email: 'maria@example.com',
      password: 'password123',
      telefono: '123456789'
    };
    
    act(() => {
      const exito = result.current.registrarUsuario(nuevoUsuario);
      expect(exito).toBe(true);
    });
    
    expect(result.current.estaAutenticado).toBe(true);
    expect(result.current.usuario.nombre).toBe('María González');
    expect(result.current.usuario.email).toBe('maria@example.com');
  });

  it('debe rechazar registro con email duplicado', () => {
    const { result } = renderHook(() => useAutenticacion());
    
    const usuario1 = {
      nombre: 'Usuario 1',
      email: 'duplicado@example.com',
      password: 'password123'
    };
    
    const usuario2 = {
      nombre: 'Usuario 2',
      email: 'duplicado@example.com',
      password: 'password456'
    };
    
    act(() => {
      result.current.registrarUsuario(usuario1);
    });
    
    act(() => {
      const exito = result.current.registrarUsuario(usuario2);
      expect(exito).toBe(false);
    });
  });

  // PRUEBA DE PERSISTENCIA
  it('debe guardar el usuario en localStorage al iniciar sesión', () => {
    const { result } = renderHook(() => useAutenticacion());
    
    act(() => {
      result.current.iniciarSesion('usuario@example.com', 'password123');
    });
    
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    expect(usuarioGuardado).not.toBeNull();
    
    const usuarioParsed = JSON.parse(usuarioGuardado);
    expect(usuarioParsed.email).toBe('usuario@example.com');
  });

  it('debe eliminar el usuario de localStorage al cerrar sesión', () => {
    const usuarioMock = {
      id: 1,
      nombre: 'Juan Pérez',
      email: 'juan@example.com'
    };
    
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioMock));
    
    const { result } = renderHook(() => useAutenticacion());
    
    act(() => {
      result.current.cerrarSesion();
    });
    
    expect(localStorage.getItem('usuarioActual')).toBeNull();
  });

  // PRUEBA DE ACTUALIZACIÓN DE PERFIL
  it('debe actualizar el perfil del usuario', () => {
    const usuarioMock = {
      id: 1,
      nombre: 'Juan Pérez',
      email: 'juan@example.com',
      telefono: '123456789'
    };
    
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioMock));
    
    const { result } = renderHook(() => useAutenticacion());
    
    act(() => {
      result.current.actualizarPerfil({
        nombre: 'Juan Carlos Pérez',
        telefono: '987654321'
      });
    });
    
    expect(result.current.usuario.nombre).toBe('Juan Carlos Pérez');
    expect(result.current.usuario.telefono).toBe('987654321');
  });
});
