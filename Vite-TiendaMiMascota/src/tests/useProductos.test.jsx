/**
 * PRUEBAS PARA EL HOOK useProductos
 * - Pruebas de estado ✅
 * - Pruebas de filtrado ✅
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useProductos } from '../hooks/useProductos';

// Mock del productService
vi.mock('../services/productService', () => ({
  obtenerProductos: vi.fn(() => Promise.resolve([
    { id: 1, nombre: 'Comida Premium', categoria: 'Comida', precio: 15000 },
    { id: 2, nombre: 'Juguete Pelota', categoria: 'Juguetes', precio: 5000 },
    { id: 3, nombre: 'Collar Elegante', categoria: 'Accesorios', precio: 8000 },
  ]))
}));

describe('useProductos Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // PRUEBAS DE ESTADO INICIAL
  it('debe iniciar con estado de carga', () => {
    const { result } = renderHook(() => useProductos());
    
    expect(result.current.cargando).toBe(true);
    expect(result.current.productos).toEqual([]);
  });

  it('debe cargar productos correctamente', async () => {
    const { result } = renderHook(() => useProductos());
    
    await waitFor(() => {
      expect(result.current.cargando).toBe(false);
    });
    
    expect(result.current.productos).toHaveLength(3);
    expect(result.current.productos[0].nombre).toBe('Comida Premium');
  });

  // PRUEBAS DE ESTADO: Filtros
  it('debe filtrar productos por categoría', async () => {
    const { result } = renderHook(() => useProductos());
    
    await waitFor(() => {
      expect(result.current.cargando).toBe(false);
    });
    
    act(() => {
      result.current.setCategoriaSeleccionada('Comida');
    });
    
    expect(result.current.categoriaSeleccionada).toBe('Comida');
    
    const productosFiltrados = result.current.productosFiltrados;
    expect(productosFiltrados).toHaveLength(1);
    expect(productosFiltrados[0].categoria).toBe('Comida');
  });

  it('debe filtrar productos por búsqueda', async () => {
    const { result } = renderHook(() => useProductos());
    
    await waitFor(() => {
      expect(result.current.cargando).toBe(false);
    });
    
    act(() => {
      result.current.setTerminoBusqueda('Juguete');
    });
    
    const productosFiltrados = result.current.productosFiltrados;
    expect(productosFiltrados).toHaveLength(1);
    expect(productosFiltrados[0].nombre).toContain('Juguete');
  });

  it('debe combinar filtros de categoría y búsqueda', async () => {
    const { result } = renderHook(() => useProductos());
    
    await waitFor(() => {
      expect(result.current.cargando).toBe(false);
    });
    
    act(() => {
      result.current.setCategoriaSeleccionada('Accesorios');
      result.current.setTerminoBusqueda('Collar');
    });
    
    const productosFiltrados = result.current.productosFiltrados;
    expect(productosFiltrados).toHaveLength(1);
    expect(productosFiltrados[0].nombre).toBe('Collar Elegante');
  });

  it('debe retornar todos los productos cuando la categoría es "Todas"', async () => {
    const { result } = renderHook(() => useProductos());
    
    await waitFor(() => {
      expect(result.current.cargando).toBe(false);
    });
    
    act(() => {
      result.current.setCategoriaSeleccionada('Todas');
    });
    
    const productosFiltrados = result.current.productosFiltrados;
    expect(productosFiltrados).toHaveLength(3);
  });

  // PRUEBA DE ORDENAMIENTO
  it('debe ordenar productos por precio', async () => {
    const { result } = renderHook(() => useProductos());
    
    await waitFor(() => {
      expect(result.current.cargando).toBe(false);
    });
    
    act(() => {
      result.current.setOrdenamiento('precio-asc');
    });
    
    const productosFiltrados = result.current.productosFiltrados;
    expect(productosFiltrados[0].precio).toBeLessThan(productosFiltrados[1].precio);
  });
});
