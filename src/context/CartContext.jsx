/**
 * CONTEXT: CARRITO DE COMPRAS
 * Provee el estado del carrito a toda la aplicación
 */

import { createContext, useState, useEffect, useRef } from 'react';

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
        console.log('🛒 Carrito cargado:', carritoParseado);
      } catch (error) {
        console.error('Error al cargar carrito:', error);
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
    console.log('💾 Carrito guardado:', carrito);
  }, [carrito]);

  /**
   * FUNCIÓN: Agregar producto al carrito
   */
  const agregarAlCarrito = (producto, cantidad = 1) => {
    console.log('➕ Agregando al carrito:', producto.nombre, 'cantidad:', cantidad);
    
    // Buscar si el producto ya está en el carrito
    const productoExiste = carrito.find(item => item.id === producto.id);
    
    if (productoExiste) {
      // Si existe, aumentar la cantidad
      const nuevoCarrito = carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      );
      setCarrito(nuevoCarrito);
      console.log('✓ Cantidad actualizada');
    } else {
      // Si no existe, agregarlo con la cantidad especificada
      const nuevoCarrito = [...carrito, { ...producto, cantidad }];
      setCarrito(nuevoCarrito);
      console.log('✓ Producto agregado al carrito');
    }
  };

  /**
   * FUNCIÓN: Eliminar producto del carrito
   */
  const eliminarDelCarrito = (productoId) => {
    console.log('🗑️ Eliminando producto:', productoId);
    setCarrito(carrito.filter(item => item.id !== productoId));
  };

  /**
   * FUNCIÓN: Cambiar cantidad de un producto
   */
  const cambiarCantidad = (productoId, nuevaCantidad) => {
    console.log('🔢 Cambiando cantidad:', productoId, 'nueva cantidad:', nuevaCantidad);
    
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
    console.log('🗑️ Vaciando carrito completo');
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

  /**
   * FUNCIÓN: Obtener cantidad de un producto en el carrito
   */
  const obtenerCantidadEnCarrito = (productoId) => {
    const producto = carrito.find(item => item.id === productoId);
    return producto ? producto.cantidad : 0;
  };

  const value = {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    cambiarCantidad,
    vaciarCarrito,
    calcularTotal,
    contarProductos,
    totalArticulos: contarProductos(),
    estaEnCarrito,
    obtenerCantidadEnCarrito
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
