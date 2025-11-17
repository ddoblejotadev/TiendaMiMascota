/**
 * PÁGINA: CARRITO DE COMPRAS
 * Muestra los productos en el carrito y permite modificarlos - 100% Bootstrap
 */

import { useNavigate } from 'react-router-dom';
import useCarrito from '../hooks/useCarrito';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400';
import { confirmDialog } from '../components/ui/confirmDialogHelper';
import { notify } from '../components/ui/notificationHelper';

function Carrito() {
  const navigate = useNavigate();
  const {
    carrito,
    cambiarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    calcularTotal,
  } = useCarrito();

  /**
   * Formatear número como precio chileno
   */
  const formatearPrecio = (precio) => {
    return '$' + precio.toLocaleString('es-CL');
  };

  /**
   * Calcular subtotal
   */
  const subtotal = calcularTotal();
  const envio = subtotal > 30000 ? 0 : 3000;
  const total = subtotal + envio;

  /**
   * Manejar cambio de cantidad
   */
  const manejarCambioCantidad = (productoId, cantidad) => {
    if (cantidad >= 1) {
      cambiarCantidad(productoId, cantidad);
    }
  };

  /**
   * Manejar eliminación de producto
   */
  const manejarEliminar = async (productoId, nombreProducto) => {
    const confirmar = await confirmDialog({
      title: 'Eliminar producto',
      message: `¿Eliminar "${nombreProducto}" del carrito?`,
      confirmText: 'Eliminar',
      cancelText: 'Cancelar'
    });
    
    if (confirmar) {
      eliminarDelCarrito(productoId);
      notify(`"${nombreProducto}" eliminado del carrito`, 'success', 2500);
    }
  };

  /**
   * Manejar vaciar carrito
   */
  const manejarVaciarCarrito = async () => {
    const confirmar = await confirmDialog({
      title: 'Vaciar carrito',
      message: '¿Estás seguro de vaciar todo el carrito? Esta acción no se puede deshacer.',
      confirmText: 'Vaciar',
      cancelText: 'Cancelar'
    });
    
    if (confirmar) {
      vaciarCarrito();
      notify('Carrito vaciado correctamente', 'success', 2500);
    }
  };

  /**
   * Ir a finalizar compra
   */
  const irAPagar = () => {
    navigate('/checkout');
  };

  // CASO 1: Si el carrito está vacío
  if (carrito.length === 0) {
    return (
      <div className="container text-center py-5" style={{ minHeight: '60vh' }}>
        <div className="py-5">
          <div className="display-1 mb-4">🛒</div>
          <h2 className="display-5 fw-bold mb-3">Tu carrito está vacío</h2>
          <p className="lead text-muted mb-4">¡Agrega productos para comenzar tu compra!</p>
          <button 
            className="btn btn-primary btn-lg px-5"
            onClick={() => navigate('/productos')}
          >
            Ver Productos
          </button>
        </div>
      </div>
    );
  }

  // CASO 2: Si hay productos en el carrito
  return (
    <div className="container my-5">
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <h1 className="display-5 fw-bold">🛒 Mi Carrito</h1>
        <button 
          className="btn btn-outline-danger"
          onClick={manejarVaciarCarrito}
        >
          Vaciar Carrito
        </button>
      </div>

      <div className="row g-4">
        {/* Columna izquierda: Lista de productos */}
        <div className="col-lg-8">
          <div className="d-flex flex-column gap-3">
            {carrito.map(producto => (
              <div key={producto.id} className="card shadow-sm border-0">
                <div className="card-body">
                  <div className="row g-3 align-items-center">
                    {/* Imagen */}
                    <div className="col-md-3">
                      <img 
                        src={producto.imagen || FALLBACK_IMAGE} 
                        alt={producto.nombre}
                        className="img-fluid rounded"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                        style={{ maxHeight: '150px', objectFit: 'cover' }}
                      />
                    </div>

                    {/* Información del producto */}
                    <div className="col-md-5">
                      <span className="badge bg-primary mb-2">{producto.categoria}</span>
                      <h5 className="fw-bold mb-2">{producto.nombre}</h5>
                      <p className="text-muted small mb-2">{producto.descripcion.substring(0, 80)}...</p>
                      <h4 className="text-primary fw-bold mb-0">{formatearPrecio(producto.precio)}</h4>
                    </div>

                    {/* Controles de cantidad */}
                    <div className="col-md-4">
                      <div className="d-flex flex-column gap-2">
                        {/* Control de cantidad */}
                        <div className="input-group">
                          <button 
                            className="btn btn-outline-secondary"
                            onClick={() => manejarCambioCantidad(producto.id, producto.cantidad - 1)}
                            disabled={producto.cantidad <= 1}
                          >
                            −
                          </button>
                          <input 
                            type="number" 
                            className="form-control text-center fw-bold"
                            value={producto.cantidad}
                            onChange={(e) => manejarCambioCantidad(producto.id, parseInt(e.target.value) || 1)}
                            min="1"
                            style={{ maxWidth: '70px' }}
                          />
                          <button 
                            className="btn btn-outline-secondary"
                            onClick={() => manejarCambioCantidad(producto.id, producto.cantidad + 1)}
                          >
                            +
                          </button>
                        </div>

                        {/* Subtotal y botón eliminar */}
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold text-success">
                            {formatearPrecio(producto.precio * producto.cantidad)}
                          </span>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => manejarEliminar(producto.id, producto.nombre)}
                          >
                            🗑️ Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha: Resumen */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 sticky-top" style={{ top: '100px' }}>
            <div className="card-body">
              <h4 className="fw-bold mb-4 pb-3 border-bottom">Resumen de Compra</h4>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span className="fw-semibold">{formatearPrecio(subtotal)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Envío:</span>
                <span className="fw-semibold">
                  {envio === 0 ? (
                    <span className="text-success">GRATIS</span>
                  ) : (
                    formatearPrecio(envio)
                  )}
                </span>
              </div>

              {envio === 0 && (
                <div className="alert alert-success small py-2 mb-3">
                  🎉 ¡Tienes envío gratis!
                </div>
              )}

              {envio > 0 && subtotal < 30000 && (
                <div className="alert alert-info small py-2 mb-3">
                  💡 Agrega {formatearPrecio(30000 - subtotal)} más para envío gratis
                </div>
              )}
              
              <hr />
              
              <div className="d-flex justify-content-between mb-4">
                <span className="h5 fw-bold">Total:</span>
                <span className="h4 fw-bold text-primary">{formatearPrecio(total)}</span>
              </div>
              
              <button 
                className="btn btn-success w-100 btn-lg fw-bold"
                onClick={irAPagar}
              >
                Proceder al Pago
              </button>
              
              <button 
                className="btn btn-outline-secondary w-100 mt-2"
                onClick={() => navigate('/productos')}
              >
                Seguir Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrito;