/**
 * PÁGINA DEL CARRITO
 * Muestra los productos en el carrito y permite modificarlos
 */

import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCarrito';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, clearCart, getTotal, getTotalItems } = useCart();

  // Formatear precio en pesos chilenos
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  // Manejar cambio de cantidad
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  // Manejar eliminar producto
  const handleRemove = (productId) => {
    if (window.confirm('¿Eliminar este producto?')) {
      removeFromCart(productId);
    }
  };

  // Manejar vaciar carrito
  const handleClearCart = () => {
    if (window.confirm('¿Vaciar todo el carrito?')) {
      clearCart();
    }
  };

  // Ir a pagar
  const handleCheckout = () => {
    alert('Función de pago en desarrollo');
    // navigate('/checkout');
  };

  // Si el carrito está vacío
  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <p>¡Agrega productos para comenzar tu compra!</p>
        <button onClick={() => navigate('/productos')}>
          Ver Productos
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Mi Carrito</h1>
        <button onClick={handleClearCart} className="btn-clear">
          Vaciar Carrito
        </button>
      </div>

      <div className="cart-content">
        {/* Lista de productos */}
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              {/* Imagen */}
              <img src={item.imagen} alt={item.nombre} />
              
              {/* Info del producto */}
              <div className="item-info">
                <h3>{item.nombre}</h3>
                <p>{item.descripcion}</p>
                <p className="item-price">{formatPrice(item.precio)}</p>
              </div>

              {/* Controles */}
              <div className="item-controls">
                {/* Cantidad */}
                <div className="quantity-control">
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <p className="item-subtotal">
                  {formatPrice(item.precio * item.quantity)}
                </p>

                {/* Botón eliminar */}
                <button 
                  onClick={() => handleRemove(item.id)}
                  className="btn-remove"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <div className="cart-summary">
          <h2>Resumen del Pedido</h2>
          
          <div className="summary-row">
            <span>Productos ({getTotalItems()})</span>
            <span>{formatPrice(getTotal())}</span>
          </div>

          <div className="summary-row">
            <span>Envío</span>
            <span>Gratis</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>{formatPrice(getTotal())}</span>
          </div>

          <button onClick={handleCheckout} className="btn-checkout">
            Proceder al Pago
          </button>

          <button 
            onClick={() => navigate('/productos')}
            className="btn-continue"
          >
            Seguir Comprando
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;