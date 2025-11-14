/**
 * HOOK DEL CARRITO DE COMPRAS
 * Wrapper del CartContext para mantener compatibilidad
 */

import { useCart } from './useCart';

function useCarrito() {
  return useCart();
}

export default useCarrito;