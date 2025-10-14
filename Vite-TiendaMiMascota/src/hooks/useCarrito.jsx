/**
 * HOOK DEL CARRITO DE COMPRAS
 * Maneja todo lo relacionado con el carrito
 */

import { useState, useEffect } from 'react';

function useCarrito() {
  // Estado: lista de productos en el carrito
  const [carrito, setCarrito] = useState([]);

  // EFECTO 1: Cargar carrito guardado cuando inicia la app
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []); // El [] significa "solo al inicio"

  // EFECTO 2: Guardar carrito cada vez que cambia
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]); // Se ejecuta cuando "carrito" cambia

  /**
   * FUNCIÓN: Agregar producto al carrito
   */
  const agregarAlCarrito = (producto) => {
    // Buscar si el producto ya está en el carrito
    const productoExiste = carrito.find(item => item.id === producto.id);
    
    if (productoExiste) {
      // Si existe, aumentar la cantidad
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      // Si no existe, agregarlo con cantidad 1
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  /**
   * FUNCIÓN: Eliminar producto del carrito
   */
  const eliminarDelCarrito = (productoId) => {
    setCarrito(carrito.filter(item => item.id !== productoId));
  };

  /**
   * FUNCIÓN: Cambiar cantidad de un producto
   */
  const cambiarCantidad = (productoId, nuevaCantidad) => {
    // Si la cantidad es 0 o menos, eliminar el producto
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(productoId);
      return;
    }
    
    // Actualizar la cantidad
    setCarrito(carrito.map(item =>
      item.id === productoId
        ? { ...item, cantidad: nuevaCantidad }
        : item
    ));
  };

  /**
   * FUNCIÓN: Vaciar todo el carrito
   */
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  /**
   * FUNCIÓN: Calcular el total a pagar
   */
  const calcularTotal = () => {
    let total = 0;
    carrito.forEach(item => {
      total += item.precio * item.cantidad;
    });
    return total;
  };

  /**
   * FUNCIÓN: Contar total de productos (sumando cantidades)
   */
  const contarProductos = () => {
    let total = 0;
    carrito.forEach(item => {
      total += item.cantidad;
    });
    return total;
  };

  /**
   * FUNCIÓN: Verificar si un producto está en el carrito
   */
  const estaEnCarrito = (productoId) => {
    return carrito.some(item => item.id === productoId);
  };

  // Retornar todo lo que otros componentes necesitan usar
  return {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    cambiarCantidad,
    vaciarCarrito,
    calcularTotal,
    contarProductos,
    estaEnCarrito
  };
}

export default useCarrito;