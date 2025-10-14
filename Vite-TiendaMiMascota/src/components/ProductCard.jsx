/**
 * COMPONENTE: TARJETA DE PRODUCTO
 * Muestra un producto individual con su información básica - 100% Bootstrap
 */

import { Link } from 'react-router-dom';
import useCarrito from '../hooks/useCarrito';

function ProductCard({ producto }) {
  const { agregarAlCarrito, estaEnCarrito } = useCarrito();

  /**
   * Formatear precio en pesos chilenos
   */
  const formatearPrecio = (precio) => {
    return '$' + precio.toLocaleString('es-CL');
  };

  /**
   * Manejar click en agregar al carrito
   */
  const manejarAgregarCarrito = (evento) => {
    evento.preventDefault();
    evento.stopPropagation();
    
    agregarAlCarrito(producto);
    
    // Feedback visual
    const boton = evento.currentTarget;
    const textoOriginal = boton.innerHTML;
    boton.innerHTML = '✓ Agregado';
    boton.classList.add('btn-success');
    boton.classList.remove('btn-primary');
    
    setTimeout(() => {
      boton.innerHTML = textoOriginal;
      boton.classList.remove('btn-success');
      boton.classList.add('btn-primary');
    }, 1500);
  };

  return (
    <div className="card h-100 shadow-sm border-0">
      <Link to={`/productos/${producto.id}`} className="text-decoration-none">
        {/* Imagen del producto */}
        <div className="position-relative">
          <img 
            src={producto.imagen} 
            alt={producto.nombre}
            className="card-img-top"
            style={{ height: '250px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = '/images/placeholder.jpg';
            }}
          />
          
          {/* Badges */}
          <div className="position-absolute top-0 start-0 p-2">
            {producto.stock < 10 && producto.stock > 0 && (
              <span className="badge bg-warning text-dark">
                ⚠️ Últimas {producto.stock} unidades
              </span>
            )}
            
            {producto.stock === 0 && (
              <span className="badge bg-danger">
                ❌ Agotado
              </span>
            )}
          </div>

          {estaEnCarrito(producto.id) && (
            <div className="position-absolute top-0 end-0 p-2">
              <span className="badge bg-success">
                ✓ En carrito
              </span>
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="card-body d-flex flex-column">
          {/* Categoría */}
          <span className="badge bg-primary mb-2 align-self-start">
            {producto.categoria}
          </span>
          
          {/* Nombre */}
          <h5 className="card-title text-dark fw-bold mb-2">
            {producto.nombre}
          </h5>
          
          {/* Descripción corta */}
          <p className="card-text text-muted small flex-grow-1">
            {producto.descripcion.substring(0, 80)}...
          </p>

          {/* Precio y botón */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="h4 text-primary fw-bold mb-0">
              {formatearPrecio(producto.precio)}
            </span>

            {/* Botón agregar al carrito */}
            {producto.stock > 0 ? (
              <button 
                className="btn btn-primary btn-sm px-3"
                onClick={manejarAgregarCarrito}
              >
                🛒 Agregar
              </button>
            ) : (
              <button className="btn btn-secondary btn-sm px-3" disabled>
                Agotado
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;