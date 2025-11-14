/**
 * PÁGINA: NO ENCONTRADO (404)
 * Página que se muestra cuando la ruta no existe
 */

import { useNavigate } from 'react-router-dom';

function NoEncontrado() {
  const navegar = useNavigate();

  /**
   * Volver a la página anterior
   */
  const volverAtras = () => {
    navegar(-1);
  };

  /**
   * Ir al inicio
   */
  const irAlInicio = () => {
    navegar('/');
  };

  return (
    <div className="container py-5 text-center" style={{ minHeight: '80vh' }}>
      <div className="py-5">
        {/* Número 404 grande */}
        <div className="display-1 fw-bold text-primary mb-4" style={{ fontSize: '10rem' }}>
          404
        </div>

        {/* Ilustración */}
        <div className="mb-4">
          <span className="display-1">🐕‍🦺</span>
        </div>

        {/* Mensaje */}
        <h1 className="display-4 fw-bold mb-3">¡Ups! Página No Encontrada</h1>
        <p className="lead text-muted mb-5">
          Parece que esta página se fue a pasear con los perritos 
          y no ha vuelto todavía...
        </p>

        {/* Sugerencias */}
        <div className="alert alert-info d-inline-block text-start mb-5">
          <p className="fw-bold mb-2">Esto puede haber pasado por:</p>
          <ul className="mb-0">
            <li>La URL está mal escrita</li>
            <li>La página fue movida o eliminada</li>
            <li>El enlace está desactualizado</li>
          </ul>
        </div>

        {/* Botones de acción */}
        <div className="error-acciones">
          <button onClick={irAlInicio} className="boton-inicio">
            🏠 Ir al Inicio
          </button>
          <button onClick={volverAtras} className="boton-volver">
            ← Volver Atrás
          </button>
        </div>

        {/* Enlaces rápidos */}
        <div className="enlaces-rapidos">
          <h3>Enlaces Útiles</h3>
          <div className="grid-enlaces">
            <a href="/productos" className="enlace-rapido">
              <span className="enlace-icono">🛍️</span>
              <span>Productos</span>
            </a>
            <a href="/carrito" className="enlace-rapido">
              <span className="enlace-icono">🛒</span>
              <span>Carrito</span>
            </a>
            <a href="/contacto" className="enlace-rapido">
              <span className="enlace-icono">📞</span>
              <span>Contacto</span>
            </a>
            <a href="/acerca" className="enlace-rapido">
              <span className="enlace-icono">ℹ️</span>
              <span>Acerca</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoEncontrado;