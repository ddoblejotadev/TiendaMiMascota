import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useProductos from '../hooks/useProductos';

// Mock del servicio de productos
vi.mock('../services/productService', () => ({
  obtenerProductos: vi.fn().mockResolvedValue([
    { id: 1, nombre: 'Producto Test', precio: 100, stock: 10, categoria: 'Alimento' }
  ])
}));

describe('useProductos', () => {
  it('carga productos', async () => {
    const { result } = renderHook(() => useProductos());
    await waitFor(() => expect(result.current.cargando).toBe(false));
    expect(result.current.productos.length).toBeGreaterThan(0);
  });
});
