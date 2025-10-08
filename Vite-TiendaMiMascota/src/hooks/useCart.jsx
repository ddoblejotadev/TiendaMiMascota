/**
 * CUSTOM HOOK: useCart
 * Maneja toda la lógica del carrito de compras
 */

import { useState, useEffect } from 'react';
import * as cartService from '../services/cartService';

export function useCart() {
  const [carrito, setCarrito] = useState([]);
  const [cantidadTotal, setCantidadTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const carritoGuardado = cartService.obtenerCarrito();
    setCarrito(carritoGuardado);
    actualizarTotales(carritoGuardado);
  }, []);

  const actualizarTotales = (items) => {
    const cantidad = items.reduce((sum, item) => sum + item.cantidad, 0);
    const precio = cartService.calcularTotal(items);
    
    setCantidadTotal(cantidad);
    setTotal(precio);
  };

  const agregarProducto = (producto, cantidad = 1) => {
    const carritoActualizado = cartService.agregarAlCarrito(producto, cantidad);
    setCarrito(carritoActualizado);
    actualizarTotales(carritoActualizado);
  };

  const eliminarProducto = (productoId) => {
    const carritoActualizado = cartService.eliminarDelCarrito(productoId);
    setCarrito(carritoActualizado);
    actualizarTotales(carritoActualizado);
  };

  const actualizarCantidad = (productoId, nuevaCantidad) => {
    const carritoActualizado = cartService.actualizarCantidad(productoId, nuevaCantidad);
    setCarrito(carritoActualizado);
    actualizarTotales(carritoActualizado);
  };

  const vaciarCarrito = () => {
    cartService.vaciarCarrito();
    setCarrito([]);
    setCantidadTotal(0);
    setTotal(0);
  };

  const estaEnCarrito = (productoId) => {
    return carrito.some(item => item.id === productoId);
  };

  const obtenerCantidadProducto = (productoId) => {
    const item = carrito.find(item => item.id === productoId);
    return item ? item.cantidad : 0;
  };

  const carritoVacio = () => {
    return carrito.length === 0;
  };

  return {
    carrito,
    cantidadTotal,
    total,
    agregarProducto,
    eliminarProducto,
    actualizarCantidad,
    vaciarCarrito,
    estaEnCarrito,
    obtenerCantidadProducto,
    carritoVacio
  };
}