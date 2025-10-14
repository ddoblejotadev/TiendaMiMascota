import { Link } from 'react-router-dom'
import '../styles/global.css'

function About() {
  return (
    <div className="about-page">
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <img src="/src/assets/logo1.png" alt="Mi Mascota Logo" />
          </Link>
          <nav>
            <Link to="/">Inicio</Link>
            <Link to="/products">Productos</Link>
            <Link to="/about" className="active">Nosotros</Link>
            <Link to="/contact">Contacto</Link>
            <Link to="/cart">Carrito</Link>
            <Link to="/login">Iniciar Sesión</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="about-hero">
          <h1>Acerca de Nosotros</h1>
          <p className="subtitle">Tu tienda de confianza para el cuidado de tu mascota</p>
        </section>

        <section className="about-content">
          <div className="about-section">
            <h2>Nuestra Historia</h2>
            <p>
              Mi Mascota nació con la misión de proporcionar productos de calidad para el cuidado
              y bienestar de tus mascotas. Somos un equipo apasionado de amantes de los animales
              que entiende la importancia de ofrecer lo mejor para tus compañeros peludos.
            </p>
          </div>

          <div className="about-section">
            <h2>Nuestra Misión</h2>
            <p>
              Proporcionar productos de alta calidad, accesibles y confiables para el cuidado
              integral de las mascotas, garantizando la satisfacción de nuestros clientes y
              el bienestar de sus compañeros.
            </p>
          </div>

          <div className="about-section">
            <h2>Nuestra Visión</h2>
            <p>
              Ser la tienda líder en productos para mascotas, reconocida por nuestra calidad,
              servicio al cliente excepcional y compromiso con el bienestar animal.
            </p>
          </div>

          <div className="about-values">
            <h2>Nuestros Valores</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>🐾 Amor por los Animales</h3>
                <p>Cada decisión que tomamos está centrada en el bienestar de las mascotas.</p>
              </div>
              <div className="value-card">
                <h3>✨ Calidad</h3>
                <p>Solo ofrecemos productos de marcas confiables y probadas.</p>
              </div>
              <div className="value-card">
                <h3>🤝 Confianza</h3>
                <p>Construimos relaciones duraderas con nuestros clientes.</p>
              </div>
              <div className="value-card">
                <h3>💡 Innovación</h3>
                <p>Buscamos constantemente nuevas formas de mejorar nuestro servicio.</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>¿Por qué elegirnos?</h2>
            <ul className="benefits-list">
              <li>✓ Amplia variedad de productos para todo tipo de mascotas</li>
              <li>✓ Precios competitivos y ofertas especiales</li>
              <li>✓ Envío rápido y seguro a todo el país</li>
              <li>✓ Atención al cliente personalizada</li>
              <li>✓ Garantía de calidad en todos nuestros productos</li>
              <li>✓ Asesoramiento experto para el cuidado de tu mascota</li>
            </ul>
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

export default About
