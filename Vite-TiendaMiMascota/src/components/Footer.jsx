import { Link } from 'react-router-dom'
import '../styles/global.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/src/assets/logo1.png" alt="Mi Mascota Logo" />
              <h3>Mi Mascota</h3>
            </div>
            <p className="footer-description">
              Tu tienda de confianza para el cuidado y bienestar de tu mascota.
              Productos de calidad al mejor precio.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook" className="social-link">
                📘 Facebook
              </a>
              <a href="#" aria-label="Instagram" className="social-link">
                📷 Instagram
              </a>
              <a href="#" aria-label="Twitter" className="social-link">
                🐦 Twitter
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Enlaces Rápidos</h4>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/products">Productos</Link></li>
              <li><Link to="/about">Nosotros</Link></li>
              <li><Link to="/contact">Contacto</Link></li>
              <li><Link to="/cart">Carrito</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Categorías</h4>
            <ul className="footer-links">
              <li><Link to="/products?category=comida">Comida</Link></li>
              <li><Link to="/products?category=juguetes">Juguetes</Link></li>
              <li><Link to="/products?category=accesorios">Accesorios</Link></li>
              <li><Link to="/products?category=higiene">Higiene</Link></li>
              <li><Link to="/products?category=salud">Salud</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Información</h4>
            <ul className="footer-links">
              <li><Link to="/terms">Términos y Condiciones</Link></li>
              <li><Link to="/privacy">Política de Privacidad</Link></li>
              <li><Link to="/shipping">Envíos y Devoluciones</Link></li>
              <li><Link to="/faq">Preguntas Frecuentes</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contacto</h4>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📍</span>
                <span>Av. Principal 123, Santiago, Chile</span>
              </li>
              <li>
                <span className="contact-icon">📞</span>
                <span>+56 9 1234 5678</span>
              </li>
              <li>
                <span className="contact-icon">✉️</span>
                <span>contacto@mimascota.cl</span>
              </li>
              <li>
                <span className="contact-icon">🕐</span>
                <span>Lun-Vie: 9:00-18:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Mi Mascota. Todos los derechos reservados.</p>
          <div className="footer-payment">
            <span>Métodos de pago:</span>
            <span>💳 Visa</span>
            <span>💳 Mastercard</span>
            <span>💰 PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
