import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { useProducts } from '../hooks/useProducts'
import { notify } from '../components/ui/Notification'
import '../styles/global.css'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products } = useProducts()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id))
    if (foundProduct) {
      setProduct(foundProduct)
    }
  }, [id, products])

  const handleAddToCart = () => {
    if (!product) return
    
    addToCart(product, quantity)
    notify(`${product.name} agregado al carrito`, 'success')
  }

  const handleBuyNow = () => {
    if (!product) return
    
    addToCart(product, quantity)
    notify('Redirigiendo al carrito...', 'info')
    setTimeout(() => navigate('/cart'), 500)
  }

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 99)) {
      setQuantity(newQuantity)
    }
  }

  if (!product) {
    return (
      <div className="product-detail-page">
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
              <Link to="/cart">Carrito</Link>
            </nav>
          </div>
        </header>
        
        <main className="container">
          <div className="not-found-content">
            <h2>Producto no encontrado</h2>
            <Link to="/products" className="btn btn-primary">Ver todos los productos</Link>
          </div>
        </main>
      </div>
    )
  }

  const images = product.images || [product.image || '/src/assets/prod.png']

  return (
    <div className="product-detail-page">
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
            <Link to="/cart">Carrito</Link>
            <Link to="/login">Iniciar Sesión</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <div className="breadcrumb">
          <Link to="/">Inicio</Link>
          <span>/</span>
          <Link to="/products">Productos</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="product-detail-layout">
          <div className="product-images">
            <div className="main-image">
              <img src={images[selectedImage]} alt={product.name} />
            </div>
            {images.length > 1 && (
              <div className="image-thumbnails">
                {images.map((img, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-info">
            <div className="product-header">
              <h1>{product.name}</h1>
              {product.category && (
                <span className="product-category">{product.category}</span>
              )}
            </div>

            <div className="product-rating">
              <span className="stars">⭐⭐⭐⭐⭐</span>
              <span className="reviews">(42 reseñas)</span>
            </div>

            <div className="product-price">
              {product.originalPrice && (
                <span className="original-price">
                  ${product.originalPrice.toLocaleString('es-CL')}
                </span>
              )}
              <span className="current-price">
                ${product.price.toLocaleString('es-CL')}
              </span>
              {product.discount && (
                <span className="discount-badge">-{product.discount}%</span>
              )}
            </div>

            <div className="product-description">
              <h3>Descripción</h3>
              <p>{product.description || 'Producto de alta calidad para tu mascota.'}</p>
            </div>

            {product.features && (
              <div className="product-features">
                <h3>Características</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="product-stock">
              {product.stock > 0 ? (
                <span className="in-stock">✓ En stock ({product.stock} disponibles)</span>
              ) : (
                <span className="out-of-stock">✕ Agotado</span>
              )}
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label>Cantidad:</label>
                <div className="quantity-controls">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    aria-label="Disminuir cantidad"
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= (product.stock || 99)}
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn btn-primary"
                disabled={!product.stock}
              >
                Agregar al Carrito
              </button>

              <button
                onClick={handleBuyNow}
                className="btn btn-secondary"
                disabled={!product.stock}
              >
                Comprar Ahora
              </button>
            </div>

            <div className="product-extras">
              <div className="extra-item">
                <span className="icon">🚚</span>
                <div>
                  <strong>Envío gratis</strong>
                  <p>En compras sobre $30.000</p>
                </div>
              </div>
              <div className="extra-item">
                <span className="icon">🔄</span>
                <div>
                  <strong>Devoluciones</strong>
                  <p>30 días para devolver</p>
                </div>
              </div>
              <div className="extra-item">
                <span className="icon">✓</span>
                <div>
                  <strong>Garantía</strong>
                  <p>Productos certificados</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="related-products">
          <h2>Productos Relacionados</h2>
          <div className="products-grid">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(p => (
                <Link to={`/product/${p.id}`} key={p.id} className="product-card">
                  <img src={p.image || '/src/assets/prod.png'} alt={p.name} />
                  <h3>{p.name}</h3>
                  <p className="price">${p.price.toLocaleString('es-CL')}</p>
                </Link>
              ))}
          </div>
        </div>
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

export default ProductDetail