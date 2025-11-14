/**
 * COMPONENTE: HEADER
 * Encabezado de la aplicación con navegación - 100% Bootstrap
 */

import { Link, useNavigate } from 'react-router-dom';
import useCarrito from '../hooks/useCarrito';
import useAutenticacion from '../hooks/useAutenticacion';
import logo from '../assets/logo1.png';

function Header() {
  const navegar = useNavigate();
  const { totalArticulos } = useCarrito();
  const { usuario, estaAutenticado, cerrarSesion } = useAutenticacion();

  /**
   * Manejar cierre de sesión
   */
  const manejarCerrarSesion = () => {
    if (confirm('¿Estás seguro de cerrar sesión?')) {
      cerrarSesion();
      navegar('/');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container-fluid" style={{ maxWidth: '100%', paddingLeft: '1rem', paddingRight: '1rem' }}>
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img 
            src={logo} 
            alt="Mi Mascota Logo" 
            width="50" 
            height="50" 
            className="d-inline-block bg-white rounded-2 p-1 me-2"
          />
          <span className="fw-bold fs-4">Mi Mascota</span>
        </Link>

        {/* Toggle para móvil */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navegación principal */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link fw-semibold px-3">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/productos" className="nav-link fw-semibold px-3">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/categorias" className="nav-link fw-semibold px-3">
                Categorías
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ofertas" className="nav-link fw-semibold px-3">
                🔥 Ofertas
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link fw-semibold px-3">
                📝 Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/acerca" className="nav-link fw-semibold px-3">
                Acerca
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contacto" className="nav-link fw-semibold px-3">
                Contacto
              </Link>
            </li>
          </ul>

          {/* Acciones del usuario */}
          <div className="d-flex align-items-center gap-3">
            {/* Carrito */}
            <Link to="/carrito" className="btn btn-light position-relative">
              <span className="fs-5">🛒</span>
              {totalArticulos > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalArticulos}
                </span>
              )}
            </Link>

            {/* Usuario */}
            {estaAutenticado ? (
              <div className="dropdown">
                <button 
                  className="btn btn-outline-light dropdown-toggle d-flex align-items-center gap-2" 
                  type="button" 
                  data-bs-toggle="dropdown"
                >
                  <span>👤</span>
                  <span className="d-none d-md-inline">{usuario?.nombre}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link to="/perfil" className="dropdown-item">
                      Mi Perfil
                    </Link>
                  </li>
                  <li>
                    <Link to="/pedidos" className="dropdown-item">
                      Mis Pedidos
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      onClick={manejarCerrarSesion}
                      className="dropdown-item text-danger"
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/iniciar-sesion" className="btn btn-light">
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;