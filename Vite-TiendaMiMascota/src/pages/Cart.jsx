import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import CartSummary from '../components/CartSummary'
import { confirmDialog } from '../components/ui/ConfirmDialog'
import { notify } from '../components/ui/Notification'
import '../styles/global.css'

function Cart() {
  const navigate = useNavigate()
  const { cart, updateQuantity, removeFromCart, clearCart, getTotal } = useCart()

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId)
      return
    }
    updateQuantity(productId, newQuantity)
    notify('Cantidad actualizada', 'info', 2000)
  }

  const handleRemoveItem = async (productId) => {
    const confirmed = await confirmDialog({
      title: 'Eliminar Producto',
      message: '¿Estás seguro de que quieres eliminar este producto del carrito?',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar'
    })

    if (confirmed) {
      removeFromCart(productId)
      notify('Producto eliminado del carrito', 'success')
    }
  }

  const handleClearCart = async () => {
    const confirmed = await confirmDialog({
      title: 'Vaciar Carrito',
      message: '¿Estás seguro de que quieres vaciar todo el carrito?',
      confirmText: 'Vaciar',
      cancelText: 'Cancelar'
    })

    if (confirmed) {
      clearCart()
      notify('Carrito vaciado', 'success')
    }
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      notify('El carrito está vacío', 'warning')
      return
    }
    notify('Procesando compra...', 'info')
    // Navegar a checkout (a implementar)
    setTimeout(() => {
      notify('Funcionalidad de checkout en desarrollo', 'info')
    }, 1000)
  }

  return (
    <div className="cart-page">
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <img src="/src/assets/logo1.png" alt="Mi Mascota Logo" />
          </Link>
          <nav>
            <Link to="/">Inicio</Link>
            <Link to="/products">Productos</Link>
            <Link to="/about">Nosotros</Link>
            <Link to="/contact">Contacto</Link>
            <Link to="/cart" className="active">Carrito</Link>
            <Link to="/login">Iniciar Sesión</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <div className="page-header">
          <h1>Carrito de Compras</h1>
          {cart.length > 0 && (
            <button onClick={handleClearCart} className="btn btn-secondary btn-sm">
              Vaciar Carrito
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Tu carrito está vacío</h2>
            <p>Agrega productos para comenzar tu compra</p>
            <Link to="/products" className="btn btn-primary">
              Ver Productos
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image || '/src/assets/prod.png'} alt={item.name} />
                  </div>
                  
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-description">{item.description}</p>
                    <p className="cart-item-price">
                      ${item.price?.toLocaleString('es-CL')}
                    </p>
                  </div>

                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="quantity-btn"
                        aria-label="Disminuir cantidad"
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="quantity-btn"
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>

                    <p className="cart-item-subtotal">
                      Subtotal: ${((item.price || 0) * item.quantity).toLocaleString('es-CL')}
                    </p>

                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-sidebar">
              <CartSummary />
              
              <button onClick={handleCheckout} className="btn btn-primary btn-block">
                Proceder al Pago
              </button>

              <Link to="/products" className="btn btn-secondary btn-block">
                Seguir Comprando
              </Link>

              <div className="cart-info">
                <p>✓ Envío gratis en compras sobre $30.000</p>
                <p>✓ Garantía de satisfacción</p>
                <p>✓ Pago seguro</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Mi Mascota. Todos los derechos reservados.</p>
          <div className="footer-links">
            <Link to="/about">Sobre Nosotros</Link>
            <Link to="/contact">Contacto</Link>
            <Link to="/products">Productos</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Cart
