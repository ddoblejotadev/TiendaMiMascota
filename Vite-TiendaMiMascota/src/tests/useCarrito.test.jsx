/**
 * PRUEBAS PARA EL HOOK useCarrito
 * - Pruebas de estado ✅
 * - Pruebas de funciones ✅
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCarrito } from '../hooks/useCarrito';

describe('useCarrito Hook', () => {
  // Limpiar localStorage antes de cada test
  beforeEach(() => {
    localStorage.clear();
  });

  // PRUEBAS DE ESTADO INICIAL
  it('debe iniciar con un carrito vacío', () => {
    const { result } = renderHook(() => useCarrito());
    
    expect(result.current.carrito).toEqual([]);
    expect(result.current.totalArticulos).toBe(0);
    expect(result.current.subtotal()).toBe(0);
  });

  // PRUEBAS DE ESTADO: Agregar productos
  it('debe agregar un producto al carrito', () => {
    const { result } = renderHook(() => useCarrito());
    
    const producto = {
      id: 1,
      nombre: 'Comida para perros',
      precio: 10000,
      imagen: 'test.jpg'
    };
    
    act(() => {
      result.current.agregarAlCarrito(producto, 2);
    });
    
    expect(result.current.carrito).toHaveLength(1);
    expect(result.current.carrito[0].cantidad).toBe(2);
    expect(result.current.totalArticulos).toBe(2);
  });

  it('debe incrementar la cantidad si el producto ya existe', () => {
    const { result } = renderHook(() => useCarrito());
    
    const producto = {
      id: 1,
      nombre: 'Comida para perros',
      precio: 10000,
      imagen: 'test.jpg'
    };
    
    // Agregar primera vez
    act(() => {
      result.current.agregarAlCarrito(producto, 1);
    });
    
    // Agregar segunda vez
    act(() => {
      result.current.agregarAlCarrito(producto, 2);
    });
    
    expect(result.current.carrito).toHaveLength(1);
    expect(result.current.carrito[0].cantidad).toBe(3);
    expect(result.current.totalArticulos).toBe(3);
  });

  // PRUEBAS DE ESTADO: Eliminar productos
  it('debe eliminar un producto del carrito', () => {
    const { result } = renderHook(() => useCarrito());
    
    const producto = {
      id: 1,
      nombre: 'Comida para perros',
      precio: 10000,
      imagen: 'test.jpg'
    };
    
    // Agregar producto
    act(() => {
      result.current.agregarAlCarrito(producto, 1);
    });
    
    expect(result.current.carrito).toHaveLength(1);
    
    // Eliminar producto
    act(() => {
      result.current.eliminarDelCarrito(1);
    });
    
    expect(result.current.carrito).toHaveLength(0);
  });

  // PRUEBAS DE ESTADO: Actualizar cantidad
  it('debe actualizar la cantidad de un producto', () => {
    const { result } = renderHook(() => useCarrito());
    
    const producto = {
      id: 1,
      nombre: 'Comida para perros',
      precio: 10000,
      imagen: 'test.jpg'
    };
    
    act(() => {
      result.current.agregarAlCarrito(producto, 2);
    });
    
    act(() => {
      result.current.actualizarCantidad(1, 5);
    });
    
    expect(result.current.carrito[0].cantidad).toBe(5);
    expect(result.current.totalArticulos).toBe(5);
  });

  // PRUEBAS DE ESTADO: Vaciar carrito
  it('debe vaciar todo el carrito', () => {
    const { result } = renderHook(() => useCarrito());
    
    const producto1 = { id: 1, nombre: 'Producto 1', precio: 10000, imagen: 'test.jpg' };
    const producto2 = { id: 2, nombre: 'Producto 2', precio: 15000, imagen: 'test.jpg' };
    
    act(() => {
      result.current.agregarAlCarrito(producto1, 1);
      result.current.agregarAlCarrito(producto2, 1);
    });
    
    expect(result.current.carrito).toHaveLength(2);
    
    act(() => {
      result.current.vaciarCarrito();
    });
    
    expect(result.current.carrito).toHaveLength(0);
    expect(result.current.totalArticulos).toBe(0);
  });

  // PRUEBAS DE CÁLCULOS
  it('debe calcular correctamente el subtotal', () => {
    const { result } = renderHook(() => useCarrito());
    
    const producto = {
      id: 1,
      nombre: 'Comida para perros',
      precio: 10000,
      imagen: 'test.jpg'
    };
    
    act(() => {
      result.current.agregarAlCarrito(producto, 3);
    });
    
    expect(result.current.subtotal()).toBe(30000);
  });

  it('debe calcular correctamente el total con múltiples productos', () => {
    const { result } = renderHook(() => useCarrito());
    
    const producto1 = { id: 1, nombre: 'Producto 1', precio: 10000, imagen: 'test.jpg' };
    const producto2 = { id: 2, nombre: 'Producto 2', precio: 15000, imagen: 'test.jpg' };
    
    act(() => {
      result.current.agregarAlCarrito(producto1, 2);
      result.current.agregarAlCarrito(producto2, 1);
    });
    
    expect(result.current.subtotal()).toBe(35000); // 20000 + 15000
  });

  // PRUEBA DE PERSISTENCIA
  it('debe persistir el carrito en localStorage', () => {
    const { result } = renderHook(() => useCarrito());
    
    const producto = {
      id: 1,
      nombre: 'Comida para perros',
      precio: 10000,
      imagen: 'test.jpg'
    };
    
    act(() => {
      result.current.agregarAlCarrito(producto, 1);
    });
    
    // Esperar un momento para que se guarde en localStorage
    setTimeout(() => {
      const carritoGuardado = JSON.parse(localStorage.getItem('carrito') || '[]');
      expect(carritoGuardado).toHaveLength(1);
      expect(carritoGuardado[0].id).toBe(1);
    }, 100);
  });
});
