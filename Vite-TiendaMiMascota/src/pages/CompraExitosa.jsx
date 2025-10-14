/**
 * PÁGINA DE COMPRA EXITOSA
 * Muestra confirmación cuando el pago fue exitoso (Requisito del PDF - Figura 7)
 */

import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { formatearPrecio } from '../util/formatters';
import '../styles/pages/CompraExitosa.css';

function CompraExitosa() {
  const location = useLocation();
  const navigate = useNavigate();
  const orden = location.state?.orden;

  // Redirigir si no hay orden
  useEffect(() => {
    if (!orden) {
      navigate('/');
    }
  }, [orden, navigate]);

  if (!orden) return null;

  return (
    <div className="pagina-compra-exitosa">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Animación de éxito */}
            <div className="text-center mb-5">
              <div className="icono-exito mb-4">
                <div className="checkmark-circle">
                  <div className="checkmark"></div>
                </div>
              </div>
              <h1 className="display-4 fw-bold text-success mb-3">
                ¡Compra Exitosa!
              </h1>
              <p className="lead text-muted">
                Tu pedido ha sido procesado correctamente
              </p>
            </div>

            {/* Detalles de la orden */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h3 className="h5 mb-1">Número de Orden</h3>
                    <p className="text-muted mb-0">#{orden.id}</p>
                  </div>
                  <span className="badge bg-success fs-6">Completada</span>
                </div>

                {/* Información de envío */}
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <h6 className="fw-bold">📦 Información de Envío</h6>
                    <p className="mb-1">{orden.datosEnvio.nombreCompleto}</p>
                    <p className="mb-1 small text-muted">{orden.datosEnvio.direccion}</p>
                    <p className="mb-1 small text-muted">
                      {orden.datosEnvio.ciudad}, {orden.datosEnvio.region}
                    </p>
                    <p className="mb-0 small text-muted">{orden.datosEnvio.email}</p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold">💳 Método de Pago</h6>
                    <p className="mb-1 text-capitalize">
                      {orden.datosEnvio.metodoPago === 'tarjeta' 
                        ? '💳 Tarjeta de Crédito/Débito' 
                        : '🏦 Transferencia Bancaria'}
                    </p>
                  </div>
                </div>

                <hr />

                {/* Productos */}
                <h6 className="fw-bold mb-3">📋 Productos</h6>
                <div className="lista-productos mb-4">
                  {orden.productos.map((item) => (
                    <div key={item.id} className="d-flex gap-3 mb-3 pb-3 border-bottom">
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{item.nombre}</h6>
                        <p className="mb-0 small text-muted">
                          Cantidad: {item.cantidad} × {formatearPrecio(item.precio)}
                        </p>
                      </div>
                      <div className="text-end">
                        <strong>{formatearPrecio(item.precio * item.cantidad)}</strong>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="bg-light p-3 rounded">
                  <div className="d-flex justify-content-between fs-4 fw-bold">
                    <span>Total Pagado:</span>
                    <span className="text-success">{formatearPrecio(orden.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Información adicional */}
            <div className="alert alert-info">
              <h6 className="alert-heading">📧 ¿Qué sigue?</h6>
              <p className="mb-2">
                ✅ Recibirás un email de confirmación en <strong>{orden.datosEnvio.email}</strong>
              </p>
              <p className="mb-2">
                🚚 Tu pedido será enviado en 24-48 horas hábiles
              </p>
              <p className="mb-0">
                📦 Podrás hacer seguimiento del envío con el número de orden
              </p>
            </div>

            {/* Botones de acción */}
            <div className="d-flex gap-3 justify-content-center mt-4">
              <Link to="/" className="btn btn-primary btn-lg">
                🏠 Volver al Inicio
              </Link>
              <Link to="/productos" className="btn btn-outline-primary btn-lg">
                🛍️ Seguir Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompraExitosa;
