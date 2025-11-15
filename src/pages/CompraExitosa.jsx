/**
 * PÁGINA DE COMPRA EXITOSA
 * Muestra confirmación cuando el pago fue exitoso (Requisito del PDF - Figura 7)
 */

import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { formatearPrecio } from '../util/formatters';

function CompraExitosa() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Intentar obtener la orden del state o del localStorage
  const [orden, setOrden] = useState(null);

  useEffect(() => {
    // Primero intentar obtener del state de navegación
    if (location.state?.orden) {
      console.log('✅ Orden obtenida del state:', location.state.orden);
      setOrden(location.state.orden);
      return;
    }

    // Si no hay state, intentar desde localStorage
    const ultimaOrden = localStorage.getItem('ultimaOrden');
    if (ultimaOrden) {
      try {
        const ordenParseada = JSON.parse(ultimaOrden);
        console.log('✅ Orden obtenida de localStorage:', ordenParseada);
        setOrden(ordenParseada);
        // Limpiar la última orden después de mostrarla
        localStorage.removeItem('ultimaOrden');
        return;
      } catch (error) {
        console.error('Error al parsear última orden:', error);
      }
    }

    // Si no hay orden en ningún lado, redirigir al inicio
    console.log('❌ No se encontró ninguna orden, redirigiendo...');
    navigate('/', { replace: true });
  }, [location, navigate]);

  if (!orden) return null;

  return (
    <div className="container py-5" style={{ minHeight: '80vh' }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Animación de éxito */}
          <div className="text-center mb-5">
            <div className="mb-4">
              <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" 
                   style={{ width: '120px', height: '120px' }}>
                <span className="display-1 text-success">✓</span>
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
          <div className="card shadow-sm border-0 mb-4">
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

          {/* Sugerencia para invitados */}
          {orden.esInvitado && (
            <div className="alert alert-success">
              <h6 className="alert-heading">🎁 ¡Crea una cuenta y obtén beneficios!</h6>
              <p className="mb-2">
                ✨ Guarda tu dirección para compras más rápidas<br/>
                📦 Rastrea tus pedidos fácilmente<br/>
                🎉 Recibe ofertas exclusivas
              </p>
              <Link to="/registrarse" className="btn btn-success btn-sm">
                Crear cuenta gratis
              </Link>
            </div>
          )}

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
  );
}

export default CompraExitosa;
