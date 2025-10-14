/**
 * PÁGINA DE ERROR EN PAGO
 * Muestra mensaje cuando no se pudo procesar el pago (Requisito del PDF - Figura 8)
 */

import { Link } from 'react-router-dom';
import '../styles/pages/ErrorPago.css';

function ErrorPago() {
  return (
    <div className="pagina-error-pago">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-lg text-center">
              <div className="card-body p-5">
                {/* Icono de error */}
                <div className="icono-error mb-4">
                  <div className="error-circle">
                    <div className="error-cross">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>

                {/* Título */}
                <h1 className="display-5 fw-bold text-danger mb-3">
                  ¡Pago Rechazado!
                </h1>
                <p className="lead text-muted mb-4">
                  No pudimos procesar tu pago
                </p>

                {/* Razones posibles */}
                <div className="alert alert-warning text-start mb-4">
                  <h6 className="alert-heading fw-bold">⚠️ Razones posibles:</h6>
                  <ul className="mb-0 ps-4">
                    <li>Fondos insuficientes</li>
                    <li>Datos incorrectos</li>
                    <li>Tarjeta vencida o bloqueada</li>
                    <li>Problema con el banco emisor</li>
                  </ul>
                </div>

                {/* Recomendaciones */}
                <div className="alert alert-info text-start mb-4">
                  <h6 className="alert-heading fw-bold">💡 ¿Qué puedes hacer?</h6>
                  <ul className="mb-0 ps-4">
                    <li>Verifica los datos de tu tarjeta</li>
                    <li>Intenta con otro método de pago</li>
                    <li>Contacta a tu banco</li>
                    <li>Intenta nuevamente más tarde</li>
                  </ul>
                </div>

                {/* Botones de acción */}
                <div className="d-grid gap-3">
                  <Link 
                    to="/checkout" 
                    className="btn btn-danger btn-lg"
                  >
                    🔄 Intentar Nuevamente
                  </Link>
                  <Link 
                    to="/carrito" 
                    className="btn btn-outline-secondary btn-lg"
                  >
                    🛒 Volver al Carrito
                  </Link>
                  <Link 
                    to="/" 
                    className="btn btn-link"
                  >
                    🏠 Ir al Inicio
                  </Link>
                </div>

                {/* Contacto */}
                <div className="mt-4 pt-4 border-top">
                  <p className="small text-muted mb-0">
                    ¿Necesitas ayuda? <br />
                    <a href="/contacto" className="text-decoration-none">
                      📧 Contáctanos
                    </a> o llámanos al <strong>+56 9 1234 5678</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPago;
