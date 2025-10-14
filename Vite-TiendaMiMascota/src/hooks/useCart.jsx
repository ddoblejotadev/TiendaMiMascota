/**
 * HOOK SIMPLE DEL CARRITO
 * Maneja el carrito de compras usando localStorage
 */

import { useState, useEffect } from 'react';

export function useCart() {
  // Estado del carrito
  const [cart, setCart] = useState([]);

  // CARGAR carrito cuando inicia la app
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // GUARDAR carrito cada vez que cambia
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // AGREGAR producto al carrito
  const addToCart = (product) => {
    // Buscar si el producto ya existe
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      // Si existe, aumentar cantidad
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // Si no existe, agregarlo
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // ELIMINAR producto del carrito
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // ACTUALIZAR cantidad
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  // VACIAR carrito
  const clearCart = () => {
    setCart([]);
  };

  // CALCULAR total
  const getTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.precio * item.quantity);
    }, 0);
  };

  // OBTENER cantidad total de items
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getTotalItems
  };
}