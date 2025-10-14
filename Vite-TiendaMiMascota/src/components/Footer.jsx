/**
 * COMPONENTE: FOOTER
 * Pie de página de la aplicación
 */

import { Link } from 'react-router-dom';
import '../styles/components/Footer.css';

function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-contenido">
        {/* Columna 1: Sobre la empresa */}
        <div className="footer-columna">
          <h3 className="footer-titulo">
            <span className="footer-logo">🐾</span>
            Mi Mascota
          </h3>
          <p className="footer-descripcion">
            Tu tienda de confianza para el cuidado y bienestar de tu mascota.
            Productos de calidad al mejor precio.
          </p>
          <div className="footer-redes">
            <a href="#" className="red-social" title="Facebook">📘</a>
            <a href="#" className="red-social" title="Instagram">📸</a>
            <a href="#" className="red-social" title="Twitter">🐦</a>
            <a href="#" className="red-social" title="WhatsApp">💬</a>
          </div>
        </div>

        {/* Columna 2: Enlaces rápidos */}
        <div className="footer-columna">
          <h4 className="footer-subtitulo">Enlaces Rápidos</h4>
          <ul className="footer-lista">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/acerca">Acerca de</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        {/* Columna 3: Categorías */}
        <div className="footer-columna">
          <h4 className="footer-subtitulo">Categorías</h4>
          <ul className="footer-lista">
            <li><Link to="/productos?categoria=Alimento">Alimento</Link></li>
            <li><Link to="/productos?categoria=Juguetes">Juguetes</Link></li>
            <li><Link to="/productos?categoria=Accesorios">Accesorios</Link></li>
            <li><Link to="/productos?categoria=Higiene">Higiene</Link></li>
          </ul>
        </div>

        {/* Columna 4: Contacto */}
        <div className="footer-columna">
          <h4 className="footer-subtitulo">Contacto</h4>
          <ul className="footer-lista footer-contacto">
            <li>
              <span className="contacto-icono">📍</span>
              Av. Principal 123, Santiago
            </li>
            <li>
              <span className="contacto-icono">📱</span>
              +56 9 1234 5678
            </li>
            <li>
              <span className="contacto-icono">✉️</span>
              contacto@mimascota.cl
            </li>
            <li>
              <span className="contacto-icono">🕐</span>
              Lun - Vie: 9:00 - 18:00
            </li>
          </ul>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="footer-inferior">
        <p className="footer-copyright">
          © {anioActual} Mi Mascota. Todos los derechos reservados.
        </p>
        <div className="footer-legal">
          <a href="#">Términos y Condiciones</a>
          <span className="separador">|</span>
          <a href="#">Política de Privacidad</a>
          <span className="separador">|</span>
          <a href="#">Política de Cookies</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;