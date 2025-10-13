import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { notify } from './ui/Notification'
import '../styles/global.css'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    addToCart(product, 1)
    notify(`${product.name} agregado al carrito`, 'success', 2000)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-card-image">
          <img 
            src={product.image || '/src/assets/prod.png'} 
            alt={product.name}
            onError={(e) => {
              e.target.src = '/src/assets/prod.png'
            }}
          />
          {product.discount && (
            <span className="product-badge discount">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="product-badge new">
              Nuevo
            </span>
          )}
          {product.stock === 0 && (
            <span className="product-badge out-of-stock">
              Agotado
            </span>
          )}
        </div>

        <div className="product-card-content">
          {product.category && (
            <span className="product-category">{product.category}</span>
          )}
          
          <h3 className="product-name">{product.name}</h3>
          
          {product.description && (
            <p className="product-description">
              {product.description.length > 80 
                ? `${product.description.substring(0, 80)}...` 
                : product.description
              }
            </p>
          )}

          <div className="product-rating">
            <span className="stars">⭐⭐⭐⭐⭐</span>
            <span className="rating-text">{product.rating || 5.0}</span>
          </div>

          <div className="product-card-footer">
            <div className="product-price">
              {product.originalPrice && (
                <span className="original-price">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="current-price">
                {formatPrice(product.price)}
              </span>
            </div>

            <button 
              onClick={handleAddToCart}
              className="btn btn-add-to-cart"
              disabled={product.stock === 0}
              aria-label={`Agregar ${product.name} al carrito`}
            >
              <span className="cart-icon">🛒</span>
              Agregar
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
