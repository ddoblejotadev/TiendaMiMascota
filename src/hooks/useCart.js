/**
 * HOOK: useCart
 * Hook personalizado para usar el carrito
 */

import { useContext } from 'react';
import CartContext from '../context/CartContext';

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
}
