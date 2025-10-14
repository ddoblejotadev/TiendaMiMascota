/**
 * PÁGINA: DETALLE DEL PRODUCTO
 * Muestra información completa de un producto
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useProductos from '../hooks/useProductos';
import useCarrito from '../hooks/useCarrito';
import '../styles/DetalleProducto.css';

function DetalleProducto() {
  const { id } = useParams(); // Obtener ID de la URL
  const navigate = useNavigate();
  const { obtenerProductoPorId } = useProductos();
  const { agregarAlCarrito, estaEnCarrito } = useCarrito();
  
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);

  // Cargar producto al montar el componente
  useEffect(() => {
    const productoEncontrado = obtenerProductoPorId(id);
    
    if (productoEncontrado) {
      setProducto(productoEncontrado);
    } else {
      alert('Producto no encontrado');
      navigate('/productos');
    }
    
    setCargando(false);
  }, [id]);

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
      <div className="pagina-detalle-cargando">
        <p>Cargando producto...</p>
      </div>
    );
  }

  // Si no hay producto
  if (!producto) {
    return null;
  }

  return (
    <div className="pagina-detalle-producto">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Inicio</Link>
        <span> / </span>
        <Link to="/productos">Productos</Link>
        <span> / </span>
        <span>{producto.nombre}</span>
      </div>

      {/* Contenido principal */}
      <div className="detalle-contenido">
        {/* IZQUIERDA: Imagen del producto */}
        <div className="detalle-imagen">
          <img 
            src={producto.imagen} 
            alt={producto.nombre}
            onError={(e) => {
              e.target.src = '/images/placeholder.jpg';
            }}
          />
          
          {/* Badge de stock */}
          {producto.stock < 10 && producto.stock > 0 && (
            <div className="badge-stock-bajo">
              ⚠️ Solo quedan {producto.stock} unidades
            </div>
          )}
          
          {producto.stock === 0 && (
            <div className="badge-agotado">
              ❌ Producto Agotado
            </div>
          )}
        </div>

        {/* DERECHA: Información del producto */}
        <div className="detalle-info">
          {/* Categoría */}
          <span className="producto-categoria">{producto.categoria}</span>
          
          {/* Nombre */}
          <h1>{producto.nombre}</h1>
          
          {/* Descripción */}
          <p className="producto-descripcion-completa">
            {producto.descripcion}
          </p>

          {/* Precio */}
          <div className="producto-precio-seccion">
            <span className="precio-actual">
              {formatearPrecio(producto.precio)}
            </span>
            <span className="precio-info">Precio por unidad</span>
          </div>

          {/* Stock disponible */}
          <div className="producto-stock">
            <span className={producto.stock > 10 ? 'stock-disponible' : 'stock-bajo'}>
              {producto.stock > 0 
                ? `✓ ${producto.stock} disponibles` 
                : '✗ Sin stock'
              }
            </span>
          </div>

          {/* Selector de cantidad */}
          {producto.stock > 0 && (
            <div className="producto-cantidad-seccion">
              <label>Cantidad:</label>
              <div className="cantidad-selector">
                <button 
                  onClick={disminuirCantidad}
                  disabled={cantidad <= 1}
                >
                  -
                </button>
                <span>{cantidad}</span>
                <button 
                  onClick={aumentarCantidad}
                  disabled={cantidad >= producto.stock}
                >
                  +
                </button>
              </div>
              <span className="cantidad-info">
                Máximo: {producto.stock}
              </span>
            </div>
          )}

          {/* Botones de acción */}
          <div className="producto-acciones">
            {producto.stock > 0 ? (
              <>
                <button 
                  className="boton-agregar-carrito"
                  onClick={manejarAgregarCarrito}
                >
                  🛒 Agregar al Carrito
                </button>
                
                <button 
                  className="boton-comprar-ahora"
                  onClick={comprarAhora}
                >
                  ⚡ Comprar Ahora
                </button>
              </>
            ) : (
              <button className="boton-agotado" disabled>
                Producto Agotado
              </button>
            )}
          </div>

          {/* Información adicional */}
          <div className="producto-info-adicional">
            <div className="info-item">
              <span className="icono">🚚</span>
              <div>
                <strong>Envío Gratis</strong>
                <p>En compras sobre $30.000</p>
              </div>
            </div>
            
            <div className="info-item">
              <span className="icono">🔄</span>
              <div>
                <strong>Devolución</strong>
                <p>30 días para devolver</p>
              </div>
            </div>
            
            <div className="info-item">
              <span className="icono">✓</span>
              <div>
                <strong>Garantía</strong>
                <p>Productos de calidad</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botón volver */}
      <div className="detalle-volver">
        <button onClick={() => navigate('/productos')}>
          ← Volver a Productos
        </button>
      </div>
    </div>
  );
}

export default DetalleProducto;