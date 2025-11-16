/**
 * CONTEXT: CARRITO DE COMPRAS
 * Provee el estado del carrito a toda la aplicación
 */

import { createContext, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import logger from '../util/logger';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Estado: lista de productos en el carrito
  const [carrito, setCarrito] = useState([]);
  
  // Ref para saber si es el primer render
  const esPrimerRender = useRef(true);

  // EFECTO 1: Cargar carrito guardado cuando inicia la app
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      try {
        const carritoParseado = JSON.parse(carritoGuardado);
        setCarrito(carritoParseado);
        logger.debug('Carrito cargado:', carritoParseado);
      } catch (error) {
        logger.error('Error al cargar carrito:', error);
        setCarrito([]);
      }
    }
    // Marcar que ya no es el primer render
    esPrimerRender.current = false;
  }, []);

  // EFECTO 2: Guardar carrito cada vez que cambia (EXCEPTO en el primer render)
  useEffect(() => {
    // No guardar en el primer render para evitar sobrescribir
    if (esPrimerRender.current) {
      return;
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    logger.debug('Carrito guardado:', carrito);
  }, [carrito]);

  /**
   * FUNCIÓN: Agregar producto al carrito
   */
  const agregarAlCarrito = useCallback((producto, cantidad = 1) => {
    logger.debug('Agregando al carrito:', producto.nombre, 'cantidad:', cantidad);
    
    setCarrito(prevCarrito => {
      // Buscar si el producto ya está en el carrito
      const productoExiste = prevCarrito.find(item => item.id === producto.id);
      
      if (productoExiste) {
        // Si existe, aumentar la cantidad
        logger.debug('Cantidad actualizada');
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        // Si no existe, agregarlo con la cantidad especificada
        logger.debug('Producto agregado al carrito');
        return [...prevCarrito, { ...producto, cantidad }];
      }
    });
  }, []);

  /**
   * FUNCIÓN: Eliminar producto del carrito
   */
  const eliminarDelCarrito = useCallback((productoId) => {
    logger.debug('Eliminando producto:', productoId);
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== productoId));
  }, []);

  /**
   * FUNCIÓN: Cambiar cantidad de un producto
   */
  const cambiarCantidad = useCallback((productoId, nuevaCantidad) => {
    logger.debug('Cambiando cantidad:', productoId, 'nueva cantidad:', nuevaCantidad);
    
    // Si la cantidad es 0 o menos, eliminar el producto
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(productoId);
      return;
    }
    
    // Actualizar la cantidad
    setCarrito(prevCarrito => prevCarrito.map(item =>
      item.id === productoId
        ? { ...item, cantidad: nuevaCantidad }
        : item
    ));
  }, [eliminarDelCarrito]);

  /**
   * FUNCIÓN: Vaciar todo el carrito
   */
  const vaciarCarrito = useCallback(() => {
    logger.debug('Vaciando carrito completo');
    setCarrito([]);
  }, []);

  // OPTIMIZACIÓN: Calcular el total con useMemo (valor memoizado)
  const totalCalculado = useMemo(() => {
    return carrito.reduce((total, item) => {
      return total + (item.precio * item.cantidad);
    }, 0);
  }, [carrito]);

  // OPTIMIZACIÓN: Contar productos con useMemo
  const totalArticulos = useMemo(() => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  }, [carrito]);

  /**
   * FUNCIÓN: Calcular el total a pagar (mantiene compatibilidad con código existente)
   */
  const calcularTotal = useCallback(() => {
    return totalCalculado;
  }, [totalCalculado]);

  /**
   * FUNCIÓN: Contar total de productos (sumando cantidades)
   * Mantener por compatibilidad, pero usar totalArticulos directamente
   */
  const contarProductos = useCallback(() => {
    return totalArticulos;
  }, [totalArticulos]);

  /**
   * FUNCIÓN: Verificar si un producto está en el carrito
   */
  const estaEnCarrito = useCallback((productoId) => {
    return carrito.some(item => item.id === productoId);
  }, [carrito]);

  /**
   * FUNCIÓN: Obtener cantidad de un producto en el carrito
   */
  const obtenerCantidadEnCarrito = useCallback((productoId) => {
    const producto = carrito.find(item => item.id === productoId);
    return producto ? producto.cantidad : 0;
  }, [carrito]);

  const value = useMemo(() => ({
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    cambiarCantidad,
    vaciarCarrito,
    calcularTotal,
    contarProductos,
    totalArticulos,
    estaEnCarrito,
    obtenerCantidadEnCarrito
  }), [
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    cambiarCantidad,
    vaciarCarrito,
    calcularTotal,
    contarProductos,
    totalArticulos,
    estaEnCarrito,
    obtenerCantidadEnCarrito
  ]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
