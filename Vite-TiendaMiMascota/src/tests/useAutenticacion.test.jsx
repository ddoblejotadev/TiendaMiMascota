// PRUEBAS SIMPLES PARA useAutenticacion
// Cumple: Pruebas de Estado (Requisito PDF: mínimo 6 componentes)

import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useAutenticacion from '../hooks/useAutenticacion';

describe('useAutenticacion - Pruebas de Estado', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe iniciar sin usuario', () => {
    const { result } = renderHook(() => useAutenticacion());
    expect(result.current.usuario).toBeNull();
  });

  it('debe poder iniciar sesión', () => {
    const { result } = renderHook(() => useAutenticacion());
    
    act(() => {
      result.current.iniciarSesion('admin@test.com', '12345');
    });
    
    expect(result.current.usuario).not.toBeNull();
  });

  it('debe poder cerrar sesión', () => {
    const { result } = renderHook(() => useAutenticacion());
    
    act(() => {
      result.current.iniciarSesion('admin@test.com', '12345');
      result.current.cerrarSesion();
    });
    
    expect(result.current.usuario).toBeNull();
  });
});
 
