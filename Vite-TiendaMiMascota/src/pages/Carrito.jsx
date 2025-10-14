/**
 * PÁGINA: CARRITO DE COMPRAS
 * Muestra los productos en el carrito y permite modificarlos
 */

import { useNavigate } from 'react-router-dom';
import useCarrito from '../hooks/useCarrito';
import './Carrito.css';

function Carrito() {
  const navigate = useNavigate();
  const {
    carrito,
    cambiarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    calcularTotal,
    contarProductos
  } = useCarrito();

  /**
   * Formatear número como precio chileno
   */
  const formatearPrecio = (precio) => {
    return '$' + precio.toLocaleString('es-CL');
  };

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
  const manejarEliminar = (productoId, nombreProducto) => {
    const confirmar = window.confirm(`¿Eliminar "${nombreProducto}" del carrito?`);
    if (confirmar) {
      eliminarDelCarrito(productoId);
    }
  };

  /**
   * Manejar vaciar carrito
   */
  const manejarVaciarCarrito = () => {
    const confirmar = window.confirm('¿Vaciar todo el carrito?');
    if (confirmar) {
      vaciarCarrito();
    }
  };

  /**
   * Ir a finalizar compra
   */
  const irAPagar = () => {
    alert('Función de pago en desarrollo');
    // navigate('/pagar');
  };

  // CASO 1: Si el carrito está vacío
  if (carrito.length === 0) {
    return (
      <div className="carrito-vacio">
        <h2>🛒 Tu carrito está vacío</h2>
        <p>¡Agrega productos para comenzar tu compra!</p>
        <button 
          className="boton-productos"
          onClick={() => navigate('/productos')}
        >
          Ver Productos
        </button>
      </div>
    );
  }

  // CASO 2: Si hay productos en el carrito
  return (
    <div className="pagina-carrito">
      {/* Encabezado */}
      <div className="carrito-encabezado">
        <h1>🛒 Mi Carrito</h1>
        <button 
          className="boton-vaciar"
          onClick={manejarVaciarCarrito}
        >
          Vaciar Carrito
        </button>
      </div>

      {/* Contenido principal */}
      <div className="carrito-contenido">
        {/* IZQUIERDA: Lista de productos */}
        <div className="carrito-productos">
          {carrito.map(producto => (
            <div key={producto.id} className="producto-item">
              {/* Imagen */}
              <img 
                src={producto.imagen} 
                alt={producto.nombre}
                onError={(e) => {
                  e.target.src = '/images/placeholder.jpg';
                }}
              />
              
              {/* Información */}
              <div className="producto-info">
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <p className="producto-precio">
                  {formatearPrecio(producto.precio)}
                </p>
              </div>

              {/* Controles */}
              <div className="producto-controles">
                {/* Control de cantidad */}
                <div className="cantidad-control">
                  <button 
                    onClick={() => manejarCambioCantidad(producto.id, producto.cantidad - 1)}
                  >
                    -
                  </button>
                  <span>{producto.cantidad}</span>
                  <button 
                    onClick={() => manejarCambioCantidad(producto.id, producto.cantidad + 1)}
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <p className="producto-subtotal">
                  {formatearPrecio(producto.precio * producto.cantidad)}
                </p>

                {/* Botón eliminar */}
                <button 
                  className="boton-eliminar"
                  onClick={() => manejarEliminar(producto.id, producto.nombre)}
                  title="Eliminar producto"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* DERECHA: Resumen del pedido */}
        <div className="carrito-resumen">
          <h2>Resumen del Pedido</h2>
          
          {/* Detalle de productos */}
          <div className="resumen-fila">
            <span>Productos ({contarProductos()})</span>
            <span>{formatearPrecio(calcularTotal())}</span>
          </div>

          {/* Envío */}
          <div className="resumen-fila">
            <span>Envío</span>
            <span className="texto-verde">Gratis</span>
          </div>

          {/* Total */}
          <div className="resumen-total">
            <span>Total</span>
            <span>{formatearPrecio(calcularTotal())}</span>
          </div>

          {/* Botón pagar */}
          <button 
            className="boton-pagar"
            onClick={irAPagar}
          >
            Proceder al Pago
          </button>

          {/* Botón seguir comprando */}
          <button 
            className="boton-continuar"
            onClick={() => navigate('/productos')}
          >
            Seguir Comprando
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carrito;