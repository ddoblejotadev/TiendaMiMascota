/**
 * CUSTOM HOOK: useCart
 * Maneja toda la lógica del carrito de compras
 */

import { useState, useEffect } from 'react';
import * as cartService from '../services/cartService';

export function useCart() {
  // Estado del carrito
  const [carrito, setCarrito] = useState([]);
  const [cantidadTotal, setCantidadTotal] = useState(0);
  const [total, setTotal] = useState(0);

  /**
   * EFECTO: Cargar carrito al montar el componente
   */
  useEffect(() => {
    const carritoGuardado = cartService.obtenerCarrito();
    setCarrito(carritoGuardado);
    actualizarTotales(carritoGuardado);
  }, []);

  /**
   * Actualiza los totales (cantidad y precio)
   * @param {Array} items - Items del carrito
   */
  const actualizarTotales = (items) => {
    const cantidad = items.reduce((sum, item) => sum + item.cantidad, 0);
    const precio = cartService.calcularTotal(items);
    
    setCantidadTotal(cantidad);
    setTotal(precio);
  };

  /**
   * Agrega un producto al carrito
   * @param {Object} producto - Producto a agregar
   * @param {number} cantidad - Cantidad (default: 1)
   */
  const agregarProducto = (producto, cantidad = 1) => {
    const carritoActualizado = cartService.agregarAlCarrito(producto, cantidad);
    setCarrito(carritoActualizado);
    actualizarTotales(carritoActualizado);
  };

  /**
   * Elimina un producto del carrito
   * @param {number} productoId - ID del producto
   */
  const eliminarProducto = (productoId) => {
    const carritoActualizado = cartService.eliminarDelCarrito(productoId);
    setCarrito(carritoActualizado);
    actualizarTotales(carritoActualizado);
  };

  /**
   * Actualiza la cantidad de un producto
   * @param {number} productoId - ID del producto
   * @param {number} nuevaCantidad - Nueva cantidad
   */
  const actualizarCantidad = (productoId, nuevaCantidad) => {
    const carritoActualizado = cartService.actualizarCantidad(productoId, nuevaCantidad);
    setCarrito(carritoActualizado);
    actualizarTotales(carritoActualizado);
  };

  /**
   * Vacía completamente el carrito
   */
  const vaciarCarrito = () => {
    cartService.vaciarCarrito();
    setCarrito([]);
    setCantidadTotal(0);
    setTotal(0);
  };

  /**
   * Verifica si un producto está en el carrito
   * @param {number} productoId - ID del producto
   * @returns {boolean}
   */
  const estaEnCarrito = (productoId) => {
    return carrito.some(item => item.id === productoId);
  };

  /**
   * Obtiene la cantidad de un producto en el carrito
   * @param {number} productoId - ID del producto
   * @returns {number}
   */
  const obtenerCantidadProducto = (productoId) => {
    const item = carrito.find(item => item.id === productoId);
    return item ? item.cantidad : 0;
  };

  /**
   * Verifica si el carrito está vacío
   * @returns {boolean}
   */
  const carritoVacio = () => {
    return carrito.length === 0;
  };

  // Retornar todo lo que necesitamos
  return {
    carrito,                    // Items del carrito
    cantidadTotal,              // Cantidad total de productos
    total,                      // Precio total
    agregarProducto,            // Función para agregar
    eliminarProducto,           // Función para eliminar
    actualizarCantidad,         // Función para actualizar cantidad
    vaciarCarrito,              // Función para vaciar carrito
    estaEnCarrito,              // Función para verificar si está en carrito
    obtenerCantidadProducto,    // Función para obtener cantidad de un producto
    carritoVacio                // Función para verificar si está vacío
  };
}