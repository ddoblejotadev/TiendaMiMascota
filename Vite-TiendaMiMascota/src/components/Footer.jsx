/**
 * COMPONENTE: FOOTER
 * Pie de página de la aplicación - 100% Bootstrap
 */

import { Link } from 'react-router-dom';

function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white mt-auto py-5">
      <div className="container">
        <div className="row g-4">
          {/* Columna 1: Sobre la empresa */}
          <div className="col-md-6 col-lg-3">
            <h5 className="fw-bold mb-3">
              <span className="me-2">🐾</span>
              Mi Mascota
            </h5>
            <p className="text-white-50 small">
              Tu tienda de confianza para el cuidado y bienestar de tu mascota.
              Productos de calidad al mejor precio.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-white fs-4" title="Facebook">📘</a>
              <a href="#" className="text-white fs-4" title="Instagram">📸</a>
              <a href="#" className="text-white fs-4" title="Twitter">🐦</a>
              <a href="#" className="text-white fs-4" title="WhatsApp">💬</a>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="col-md-6 col-lg-3">
            <h6 className="fw-bold mb-3">Enlaces Rápidos</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white-50 text-decoration-none">Inicio</Link>
              </li>
              <li className="mb-2">
                <Link to="/productos" className="text-white-50 text-decoration-none">Productos</Link>
              </li>
              <li className="mb-2">
                <Link to="/acerca" className="text-white-50 text-decoration-none">Acerca de</Link>
              </li>
              <li className="mb-2">
                <Link to="/contacto" className="text-white-50 text-decoration-none">Contacto</Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Categorías */}
          <div className="col-md-6 col-lg-3">
            <h6 className="fw-bold mb-3">Categorías</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/productos?categoria=Alimento" className="text-white-50 text-decoration-none">Alimento</Link>
              </li>
              <li className="mb-2">
                <Link to="/productos?categoria=Juguetes" className="text-white-50 text-decoration-none">Juguetes</Link>
              </li>
              <li className="mb-2">
                <Link to="/productos?categoria=Accesorios" className="text-white-50 text-decoration-none">Accesorios</Link>
              </li>
              <li className="mb-2">
                <Link to="/productos?categoria=Higiene" className="text-white-50 text-decoration-none">Higiene</Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div className="col-md-6 col-lg-3">
            <h6 className="fw-bold mb-3">Contacto</h6>
            <ul className="list-unstyled small text-white-50">
              <li className="mb-2">
                <span className="me-2">📍</span>
                Av. Principal 123, Santiago
              </li>
              <li className="mb-2">
                <span className="me-2">📱</span>
                +56 9 1234 5678
              </li>
              <li className="mb-2">
                <span className="me-2">✉️</span>
                contacto@mimascota.cl
              </li>
              <li className="mb-2">
                <span className="me-2">🕐</span>
                Lun - Vie: 9:00 - 18:00
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <hr className="border-secondary my-4" />
        
        <div className="row">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="text-white-50 small mb-0">
              © {anioActual} Mi Mascota. Todos los derechos reservados.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-3 small">
              <a href="#" className="text-white-50 text-decoration-none">Términos y Condiciones</a>
              <span className="text-white-50">|</span>
              <a href="#" className="text-white-50 text-decoration-none">Política de Privacidad</a>
              <span className="text-white-50">|</span>
              <a href="#" className="text-white-50 text-decoration-none">Política de Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;