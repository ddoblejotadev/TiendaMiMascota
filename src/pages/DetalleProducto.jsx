/**
 * PÁGINA: DETALLE DEL PRODUCTO
 * Muestra información completa de un producto
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useProductos from '../hooks/useProductos';
import useCarrito from '../hooks/useCarrito';

function DetalleProducto() {
  const { id } = useParams(); // Obtener ID de la URL
  const navigate = useNavigate();
  const { obtenerProductoPorId, todosLosProductos, cargando: cargandoProductos } = useProductos();
  const { agregarAlCarrito } = useCarrito();
  
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);

  // Cargar producto al montar el componente
  useEffect(() => {
    // Esperar a que los productos se carguen
    if (cargandoProductos) {
      setCargando(true);
      return;
    }

    const productoEncontrado = obtenerProductoPorId(id);
    
    if (productoEncontrado) {
      setProducto(productoEncontrado);
      setCargando(false);
    } else {
      // Solo mostrar error si ya se cargaron todos los productos
      if (todosLosProductos.length > 0) {
        setCargando(false);
        alert('Producto no encontrado');
        navigate('/productos');
      }
    }
  }, [id, obtenerProductoPorId, navigate, cargandoProductos, todosLosProductos]);

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
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito(producto);
    }
    alert(`✅ ${cantidad} x "${producto.nombre}" agregado al carrito`);
  };

  /**
   * Comprar ahora (agregar y ir al carrito)
   */
  const comprarAhora = () => {
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito(producto);
    }
    navigate('/carrito');
  };

  // Mostrar cargando
  if (cargando) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando producto...</p>
      </div>
    );
  }

  // Si no hay producto
  if (!producto) {
    return null;
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
              src={producto.imagen} 
              alt={producto.nombre}
              className="img-fluid rounded shadow-lg"
              style={{ width: '100%', height: '500px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = '/images/placeholder.jpg';
              }}
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
              <label className="form-label fw-bold fs-5">Cantidad:</label>
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
                  🛒 Agregar al Carrito
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