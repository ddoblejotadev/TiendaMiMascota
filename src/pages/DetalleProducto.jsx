/**
 * PÁGINA: DETALLE DEL PRODUCTO
 * Muestra información completa de un producto
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { obtenerProductoPorId as obtenerProductoAPI } from '../services/productService';
import useProductos from '../hooks/useProductos';
import useCarrito from '../hooks/useCarrito';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400';
import { notify } from '../components/ui/notificationHelper';
import logger from '../util/logger';

function DetalleProducto() {
  const { id } = useParams(); // Obtener ID de la URL
  const navigate = useNavigate();
  const { obtenerProductoPorId, todosLosProductos, cargando: cargandoProductos } = useProductos();
  const { agregarAlCarrito, obtenerCantidadEnCarrito } = useCarrito();
  
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  // Obtener cantidad actual en el carrito (se actualiza automáticamente)
  const cantidadEnCarrito = producto ? obtenerCantidadEnCarrito(producto.id) : 0;

  // Cargar producto al montar el componente
  useEffect(() => {
    const cargarProducto = async () => {
      try {
        setCargando(true);
        setError(null);
        setProducto(null);
        
        logger.debug('Cargando producto ID:', id);
        
        // Cargar directamente desde el backend
        const productoBackend = await obtenerProductoAPI(id);
        
        if (productoBackend) {
          logger.success('Producto cargado:', productoBackend.nombre);
          setProducto(productoBackend);
          setCargando(false);
        } else {
          logger.error('Producto no encontrado');
          setError('Producto no encontrado');
          setCargando(false);
          setTimeout(() => {
            navigate('/productos');
          }, 1500);
        }
      } catch (err) {
        logger.error('Error al cargar producto:', err);
        setError(import.meta.env.PROD 
          ? 'Error al cargar el producto. Por favor intenta más tarde.' 
          : 'Error al cargar el producto. Verifica que el backend esté corriendo.');
        setCargando(false);
        setTimeout(() => {
          navigate('/productos');
        }, 2000);
      }
    };

    if (id) {
      cargarProducto();
    }
  }, [id, navigate]);

  /**
   * Formatear precio
   */
  const formatearPrecio = (precio) => {
    return '$' + precio.toLocaleString('es-CL');
  };

  /**
   * Aumentar cantidad
   */
  const aumentarCantidad = () => {
    if (cantidad < producto.stock) {
      setCantidad(cantidad + 1);
    }
  };

  /**
   * Disminuir cantidad
   */
  const disminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  /**
   * Agregar al carrito
   */
  const manejarAgregarCarrito = () => {
    agregarAlCarrito(producto, cantidad);
    notify(`${cantidad} x "${producto.nombre}" agregado al carrito`, 'success', 3000);
  };

  /**
   * Comprar ahora (agregar y ir al carrito)
   */
  const comprarAhora = () => {
    agregarAlCarrito(producto, cantidad);
    navigate('/carrito');
  };

  // Mostrar cargando
  if (cargando) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="card border-0 shadow-sm p-5">
              <div className="spinner-border text-primary mx-auto mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <h5 className="text-muted">Cargando producto...</h5>
              <p className="text-muted small mb-0">
                {import.meta.env.PROD ? 'Obteniendo información...' : 'Obteniendo información del backend'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si hay error
  if (error) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="alert alert-danger text-center shadow-sm">
              <h4 className="alert-heading mb-3">❌ {error}</h4>
              <p className="mb-3">Redirigiendo a productos en unos segundos...</p>
              <div className="spinner-border spinner-border-sm text-danger" role="status">
                <span className="visually-hidden">Redirigiendo...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si no hay producto
  if (!producto) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="alert alert-warning text-center shadow-sm">
              <h4 className="mb-3">⚠️ Producto no encontrado</h4>
              <p>Redirigiendo a la lista de productos...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/productos" className="text-decoration-none">Productos</Link></li>
          <li className="breadcrumb-item active">{producto.nombre}</li>
        </ol>
      </nav>

      {/* Contenido principal */}
      <div className="row g-5 mb-5">
        {/* IZQUIERDA: Imagen del producto */}
        <div className="col-lg-6">
          <div className="position-relative">
            <img 
              src={producto.imagen || FALLBACK_IMAGE} 
              alt={producto.nombre}
              className="img-fluid rounded shadow-lg"
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: '500px', objectFit: 'cover' }}
            />
            
            {/* Badge de stock */}
            {producto.stock < 10 && producto.stock > 0 && (
              <div className="position-absolute top-0 start-0 m-3">
                <span className="badge bg-warning text-dark fs-6">
                  ⚠️ Solo quedan {producto.stock} unidades
                </span>
              </div>
            )}
            
            {producto.stock === 0 && (
              <div className="position-absolute top-0 start-0 m-3">
                <span className="badge bg-danger fs-6">
                  ❌ Producto Agotado
                </span>
              </div>
            )}
          </div>
        </div>

        {/* DERECHA: Información del producto */}
        <div className="col-lg-6">
          {/* Categoría */}
          <span className="badge bg-primary mb-3 fs-6">{producto.categoria}</span>
          
          {/* Nombre */}
          <h1 className="display-5 fw-bold mb-3">{producto.nombre}</h1>
          
          {/* Descripción */}
          <p className="lead text-muted mb-4">
            {producto.descripcion}
          </p>

          {/* Precio */}
          <div className="bg-light rounded p-4 mb-4">
            <div className="d-flex align-items-baseline gap-2">
              <h2 className="display-4 fw-bold text-primary mb-0">
                {formatearPrecio(producto.precio)}
              </h2>
              <span className="text-muted">Precio por unidad</span>
            </div>
          </div>

          {/* Stock disponible */}
          <div className="mb-4">
            <span className={`badge ${producto.stock > 10 ? 'bg-success' : 'bg-warning text-dark'} fs-6`}>
              {producto.stock > 0 
                ? `✓ ${producto.stock} disponibles` 
                : '✗ Sin stock'
              }
            </span>
          </div>

          {/* Selector de cantidad */}
          {producto.stock > 0 && (
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="form-label fw-bold fs-5 mb-0">Cantidad:</label>
                {cantidadEnCarrito > 0 && (
                  <span className="badge bg-success fs-6">
                    ✓ {cantidadEnCarrito} en el carrito
                  </span>
                )}
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="input-group" style={{ maxWidth: '150px' }}>
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={disminuirCantidad}
                    disabled={cantidad <= 1}
                  >
                    −
                  </button>
                  <input 
                    type="number" 
                    className="form-control text-center fw-bold"
                    value={cantidad}
                    readOnly
                  />
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={aumentarCantidad}
                    disabled={cantidad >= producto.stock}
                  >
                    +
                  </button>
                </div>
                <small className="text-muted">
                  Máximo: {producto.stock}
                </small>
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="d-grid gap-3 mb-4">
            {producto.stock > 0 ? (
              <>
                <button 
                  className="btn btn-primary btn-lg fw-bold"
                  onClick={manejarAgregarCarrito}
                >
                  🛒 Agregar {cantidad > 1 ? `${cantidad} unidades` : 'al Carrito'}
                </button>
                
                <button 
                  className="btn btn-success btn-lg fw-bold"
                  onClick={comprarAhora}
                >
                  ⚡ Comprar Ahora
                </button>
              </>
            ) : (
              <button className="btn btn-secondary btn-lg" disabled>
                Producto Agotado
              </button>
            )}
          </div>
          
          {/* Resumen del subtotal */}
          {cantidad > 1 && (
            <div className="alert alert-info mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">Subtotal ({cantidad} unidades):</span>
                <span className="fs-4 fw-bold text-primary">
                  {formatearPrecio(producto.precio * cantidad)}
                </span>
              </div>
            </div>
          )}

          {/* Información adicional */}
          <div className="card border-0 bg-light">
            <div className="card-body">
              <div className="d-flex align-items-start gap-3 mb-3">
                <span className="fs-2">🚚</span>
                <div>
                  <h6 className="fw-bold mb-1">Envío Gratis</h6>
                  <p className="text-muted small mb-0">En compras sobre $30.000</p>
                </div>
              </div>
              
              <div className="d-flex align-items-start gap-3 mb-3">
                <span className="fs-2">🔄</span>
                <div>
                  <h6 className="fw-bold mb-1">Devolución</h6>
                  <p className="text-muted small mb-0">30 días para devolver</p>
                </div>
              </div>
              
              <div className="d-flex align-items-start gap-3">
                <span className="fs-2">✓</span>
                <div>
                  <h6 className="fw-bold mb-1">Garantía</h6>
                  <p className="text-muted small mb-0">Productos de calidad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botón volver */}
      <div className="mb-4">
        <button className="btn btn-outline-secondary" onClick={() => navigate('/productos')}>
          ← Volver a Productos
        </button>
      </div>
    </div>
  );
}

export default DetalleProducto;