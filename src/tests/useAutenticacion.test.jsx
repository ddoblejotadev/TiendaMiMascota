// PRUEBAS SIMPLES PARA useAutenticacion
// Cumple: Pruebas de Estado (Requisito PDF: mínimo 6 componentes)

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useAutenticacion from '../hooks/useAutenticacion';
import * as constants from '../util/constants';

// Mock de las funciones de constants
vi.mock('../util/constants', () => ({
  login: vi.fn(),
  registrar: vi.fn(),
  logout: vi.fn(),
  obtenerUsuarioActual: vi.fn(),
  estaLogueado: vi.fn()
}));

describe('useAutenticacion - Pruebas de Estado', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    // Por defecto, no hay usuario logueado
    constants.obtenerUsuarioActual.mockReturnValue(null);
    constants.estaLogueado.mockReturnValue(false);
  });

  it('debe iniciar sin usuario', () => {
    const { result } = renderHook(() => useAutenticacion());
    expect(result.current.usuario).toBeNull();
  });

  it('debe poder iniciar sesión', async () => {
    // Mock de respuesta exitosa del backend
    const usuarioMock = {
      id: 1,
      email: 'admin@test.com',
      nombre: 'Admin',
      rol: 'admin'
    };
    constants.login.mockResolvedValue(usuarioMock);

    const { result } = renderHook(() => useAutenticacion());
    
    await act(async () => {
      await result.current.iniciarSesion('admin@test.com', '12345');
    });
    
    expect(result.current.usuario).not.toBeNull();
    expect(result.current.usuario.email).toBe('admin@test.com');
    expect(constants.login).toHaveBeenCalledWith('admin@test.com', '12345');
  });

  it('debe poder cerrar sesión', async () => {
    // Mock de respuesta exitosa del backend
    const usuarioMock = {
      id: 1,
      email: 'admin@test.com',
      nombre: 'Admin',
      rol: 'admin'
    };
    constants.login.mockResolvedValue(usuarioMock);

    const { result } = renderHook(() => useAutenticacion());
    
    await act(async () => {
      await result.current.iniciarSesion('admin@test.com', '12345');
      result.current.cerrarSesion();
    });
    
    expect(result.current.usuario).toBeNull();
    expect(constants.logout).toHaveBeenCalled();
  });
});
 
