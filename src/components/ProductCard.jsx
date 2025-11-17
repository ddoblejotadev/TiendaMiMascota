/**
 * COMPONENTE: TARJETA DE PRODUCTO
 * Muestra un producto individual con su información básica - 100% Bootstrap
 */

import { Link } from 'react-router-dom';
import useCarrito from '../hooks/useCarrito';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400';

function ProductCard({ producto }) {
  const { agregarAlCarrito, obtenerCantidadEnCarrito } = useCarrito();
  const cantidadEnCarrito = obtenerCantidadEnCarrito(producto.id);

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
    
    agregarAlCarrito(producto, 1);
    
    // Feedback visual
    const boton = evento.currentTarget;
    const textoOriginal = boton.innerHTML;
    boton.innerHTML = '✓ Agregado';
    boton.classList.add('btn-success');
    boton.classList.remove('btn-primary');
    boton.disabled = true;
    
    setTimeout(() => {
      boton.innerHTML = textoOriginal;
      boton.classList.remove('btn-success');
      boton.classList.add('btn-primary');
      boton.disabled = false;
    }, 1000);
  };

  return (
    <div className="card h-100 shadow-sm border-0">
      <Link to={`/productos/${producto.id}`} className="text-decoration-none">
        {/* Imagen del producto */}
        <div className="position-relative" style={{ aspectRatio: '1/1', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
          <img 
            src={producto.imageUrl || producto.imagen || '/images/fallback.svg'} 
            alt={producto.nombre}
            className="card-img-top"
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
            loading="lazy"
            decoding="async"
            onError={(e) => { e.currentTarget.src = '/images/fallback.svg'; }}
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

          {cantidadEnCarrito > 0 && (
            <div className="position-absolute top-0 end-0 p-2">
              <span className="badge bg-success">
                ✓ En carrito ({cantidadEnCarrito})
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
          <h3 className="card-title text-dark fw-bold mb-2 h5">
            {producto.nombre}
          </h3>
          
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
                aria-label={`Agregar ${producto.nombre} al carrito`}
              >
                <span aria-hidden="true">🛒</span> Agregar
              </button>
            ) : (
              <button 
                className="btn btn-secondary btn-sm px-3" 
                disabled
                aria-label={`${producto.nombre} - producto agotado`}
              >
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