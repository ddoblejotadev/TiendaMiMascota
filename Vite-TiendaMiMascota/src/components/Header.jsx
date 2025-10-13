import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import '../styles/global.css'

function Header() {
  const location = useLocation()
  const { cart, getTotalItems } = useCart()
  const { user, isAuthenticated } = useAuth()
  
  const cartItemsCount = getTotalItems ? getTotalItems() : cart?.reduce((sum, item) => sum + item.quantity, 0) || 0

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <img src="/src/assets/logo1.png" alt="Mi Mascota Logo" />
          <span className="logo-text">Mi Mascota</span>
        </Link>

        <nav className="main-nav">
          <Link to="/" className={isActive('/')}>
            Inicio
          </Link>
          <Link to="/products" className={isActive('/products')}>
            Productos
          </Link>
          <Link to="/about" className={isActive('/about')}>
            Nosotros
          </Link>
          <Link to="/contact" className={isActive('/contact')}>
            Contacto
          </Link>
        </nav>

        <div className="header-actions">
          <Link to="/cart" className={`cart-button ${isActive('/cart')}`}>
            <span className="cart-icon">🛒</span>
            <span className="cart-text">Carrito</span>
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </Link>

          {isAuthenticated && user ? (
            <Link to="/profile" className="user-button">
              <span className="user-icon">👤</span>
              <span className="user-name">{user.name || user.email}</span>
            </Link>
          ) : (
            <Link to="/login" className={`login-button ${isActive('/login')}`}>
              <span className="login-icon">🔐</span>
              <span className="login-text">Iniciar Sesión</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
