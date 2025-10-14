/**
 * HOOK DEL CARRITO DE COMPRAS
 * Maneja todo lo relacionado con el carrito
 */

import { useState, useEffect, useRef } from 'react';

function useCarrito() {
  // Estado: lista de productos en el carrito
  const [carrito, setCarrito] = useState([]);
  
  // Ref para saber si es el primer render
  const esPrimerRender = useRef(true);

  // EFECTO 1: Cargar carrito guardado cuando inicia la app
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    console.log('📦 Carrito guardado en localStorage:', carritoGuardado);
    if (carritoGuardado) {
      const carritoParseado = JSON.parse(carritoGuardado);
      console.log('📦 Carrito parseado:', carritoParseado);
      setCarrito(carritoParseado);
    }
    // Marcar que ya no es el primer render
    esPrimerRender.current = false;
  }, []); // El [] significa "solo al inicio"

  // EFECTO 2: Guardar carrito cada vez que cambia (EXCEPTO en el primer render)
  useEffect(() => {
    // No guardar en el primer render para evitar sobrescribir
    if (esPrimerRender.current) {
      return;
    }
    
    console.log('💾 Guardando carrito en localStorage:', carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]); // Se ejecuta cuando "carrito" cambia

  /**
   * FUNCIÓN: Agregar producto al carrito
   */
  const agregarAlCarrito = (producto) => {
    console.log('🛒 Agregando producto:', producto);
    
    // Buscar si el producto ya está en el carrito
    const productoExiste = carrito.find(item => item.id === producto.id);
    
    if (productoExiste) {
      // Si existe, aumentar la cantidad
      const nuevoCarrito = carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      console.log('✏️ Actualizando cantidad. Nuevo carrito:', nuevoCarrito);
      setCarrito(nuevoCarrito);
    } else {
      // Si no existe, agregarlo con cantidad 1
      const nuevoCarrito = [...carrito, { ...producto, cantidad: 1 }];
      console.log('➕ Producto nuevo. Nuevo carrito:', nuevoCarrito);
      setCarrito(nuevoCarrito);
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
    totalArticulos: contarProductos(), // Alias para el Header
    estaEnCarrito
  };
}

export default useCarrito;