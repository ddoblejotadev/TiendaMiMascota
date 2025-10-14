/**
 * COMPONENTE: TARJETA DE PRODUCTO
 * Muestra un producto individual con su información básica
 */

import { Link } from 'react-router-dom';
import useCarrito from '../hooks/useCarrito';
import '../styles/components/ProductCard.css';

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
    evento.preventDefault(); // Evitar navegación
    evento.stopPropagation();
    
    agregarAlCarrito(producto);
    
    // Feedback visual
    const boton = evento.currentTarget;
    boton.textContent = '✓ Agregado';
    boton.classList.add('agregado');
    
    setTimeout(() => {
      boton.textContent = '🛒 Agregar';
      boton.classList.remove('agregado');
    }, 1500);
  };

  return (
    <Link to={`/productos/${producto.id}`} className="tarjeta-producto">
      {/* Imagen del producto */}
      <div className="producto-imagen-contenedor">
        <img 
          src={producto.imagen} 
          alt={producto.nombre}
          className="producto-imagen"
          onError={(e) => {
            e.target.src = '/images/placeholder.jpg';
          }}
        />
        
        {/* Badge de stock bajo */}
        {producto.stock < 10 && producto.stock > 0 && (
          <div className="badge badge-stock-bajo">
            ⚠️ Últimas {producto.stock} unidades
          </div>
        )}
        
        {/* Badge de agotado */}
        {producto.stock === 0 && (
          <div className="badge badge-agotado">
            ❌ Agotado
          </div>
        )}

        {/* Badge de en carrito */}
        {estaEnCarrito(producto.id) && (
          <div className="badge badge-en-carrito">
            ✓ En carrito
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="producto-informacion">
        {/* Categoría */}
        <span className="producto-categoria">{producto.categoria}</span>
        
        {/* Nombre */}
        <h3 className="producto-nombre">{producto.nombre}</h3>
        
        {/* Descripción corta */}
        <p className="producto-descripcion">
          {producto.descripcion.substring(0, 80)}...
        </p>

        {/* Precio y acciones */}
        <div className="producto-footer">
          <div className="producto-precio">
            <span className="precio-actual">
              {formatearPrecio(producto.precio)}
            </span>
          </div>

          {/* Botón agregar al carrito */}
          {producto.stock > 0 ? (
            <button 
              className="boton-agregar"
              onClick={manejarAgregarCarrito}
            >
              🛒 Agregar
            </button>
          ) : (
            <button className="boton-agotado" disabled>
              Agotado
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;