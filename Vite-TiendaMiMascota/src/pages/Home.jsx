import { Link } from 'react-router-dom'
import '../styles/global.css'

function Home() {
  return (
    <div className="home-page">
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <img src="/src/assets/logo1.png" alt="Mi Mascota Logo" />
          </Link>
          <nav>
            <Link to="/" className="active">Inicio</Link>
            <Link to="/products">Productos</Link>
            <Link to="/about">Nosotros</Link>
            <Link to="/contact">Contacto</Link>
            <Link to="/cart">Carrito</Link>
            <Link to="/login">Iniciar Sesión</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1>Bienvenido a Mi Mascota</h1>
              <p>Todo lo que necesitas para el cuidado y bienestar de tu compañero</p>
              <div className="hero-buttons">
                <Link to="/products" className="btn btn-primary">Ver Productos</Link>
                <Link to="/about" className="btn btn-secondary">Conocer Más</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="categories">
          <div className="container">
            <h2>Categorías Principales</h2>
            <div className="category-grid">
              <Link to="/products?category=comida" className="category-card">
                <img src="/src/assets/Comida.jpg" alt="Comida" />
                <h3>Comida</h3>
                <p>Alimento balanceado y nutritivo</p>
              </Link>
              <Link to="/products?category=juguetes" className="category-card">
                <img src="/src/assets/jugetes.png" alt="Juguetes" />
                <h3>Juguetes</h3>
                <p>Diversión para tu mascota</p>
              </Link>
              <Link to="/products?category=accesorios" className="category-card">
                <img src="/src/assets/accesorios.png" alt="Accesorios" />
                <h3>Accesorios</h3>
                <p>Todo tipo de accesorios</p>
              </Link>
              <Link to="/products?category=higiene" className="category-card">
                <img src="/src/assets/higiene.png" alt="Higiene" />
                <h3>Higiene</h3>
                <p>Productos de limpieza y cuidado</p>
              </Link>
              <Link to="/products?category=salud" className="category-card">
                <img src="/src/assets/salud.png" alt="Salud" />
                <h3>Salud</h3>
                <p>Bienestar y medicina</p>
              </Link>
              <Link to="/products?category=camas" className="category-card">
                <img src="/src/assets/cama2.png" alt="Camas" />
                <h3>Camas y Descanso</h3>
                <p>Comodidad para tu mascota</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="container">
            <h2>¿Por qué elegirnos?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🚚</div>
                <h3>Envío Rápido</h3>
                <p>Entregas en 24-48 horas</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">✨</div>
                <h3>Calidad Garantizada</h3>
                <p>Productos certificados</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💳</div>
                <h3>Pago Seguro</h3>
                <p>Múltiples métodos de pago</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📞</div>
                <h3>Soporte 24/7</h3>
                <p>Atención al cliente</p>
              </div>
            </div>
          </div>
        </section>
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

export default Home