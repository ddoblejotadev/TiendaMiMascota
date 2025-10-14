/**
 * COMPONENTE: HEADER
 * Encabezado de la aplicación con navegación
 */

import { Link, useNavigate } from 'react-router-dom';
import useCarrito from '../hooks/useCarrito';
import useAutenticacion from '../hooks/useAutenticacion';
import logo from '../assets/logo1.png';
import '../styles/components/Header.css';

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
    <header className="header">
      <div className="header-contenido">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <img src={logo} alt="Mi Mascota Logo" className="logo-imagen" />
          <span className="logo-texto">Mi Mascota</span>
        </Link>

        {/* Navegación principal */}
        <nav className="header-navegacion">
          <Link to="/" className="nav-enlace">
            Inicio
          </Link>
          <Link to="/productos" className="nav-enlace">
            Productos
          </Link>
          <Link to="/acerca" className="nav-enlace">
            Acerca
          </Link>
          <Link to="/contacto" className="nav-enlace">
            Contacto
          </Link>
        </nav>

        {/* Acciones del usuario */}
        <div className="header-acciones">
          {/* Carrito */}
          <Link to="/carrito" className="accion-carrito">
            <span className="carrito-icono">🛒</span>
            {totalArticulos > 0 && (
              <span className="carrito-badge">{totalArticulos}</span>
            )}
          </Link>

          {/* Usuario */}
          {estaAutenticado ? (
            <div className="usuario-menu">
              <button className="usuario-boton">
                <span className="usuario-icono">👤</span>
                <span className="usuario-nombre">{usuario?.nombre}</span>
              </button>
              <div className="usuario-dropdown">
                <Link to="/perfil" className="dropdown-item">
                  Mi Perfil
                </Link>
                <Link to="/pedidos" className="dropdown-item">
                  Mis Pedidos
                </Link>
                <button 
                  onClick={manejarCerrarSesion}
                  className="dropdown-item dropdown-cerrar"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          ) : (
            <Link to="/iniciar-sesion" className="boton-login">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;