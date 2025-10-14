/**
 * PÁGINA: PRODUCTOS
 * Lista completa de productos con filtros
 */

import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useProductos from '../hooks/useProductos';
import useCarrito from '../hooks/useCarrito';
import '../styles/pages/Productos.css';

function Productos() {
  const location = useLocation();
  const {
    productos,
    cargando,
    busqueda,
    categoriaSeleccionada,
    buscarProductos,
    filtrarPorCategoria,
    limpiarFiltros,
    obtenerCategorias
  } = useProductos();
  
  const { agregarAlCarrito } = useCarrito();

  // Si viene una categoría desde la navegación, aplicarla
  useEffect(() => {
    if (location.state?.categoria) {
      filtrarPorCategoria(location.state.categoria);
    }
  }, [location.state]);

  /**
   * Formatear precio
   */
  const formatearPrecio = (precio) => {
    return '$' + precio.toLocaleString('es-CL');
  };

  /**
   * Manejar búsqueda
   */
  const manejarBusqueda = (e) => {
    buscarProductos(e.target.value);
  };

  /**
   * Manejar cambio de categoría
   */
  const manejarCategoria = (e) => {
    filtrarPorCategoria(e.target.value);
  };

  /**
   * Agregar producto al carrito
   */
  const manejarAgregarCarrito = (producto) => {
    agregarAlCarrito(producto);
    alert(`✅ "${producto.nombre}" agregado al carrito`);
  };

  return (
    <div className="pagina-productos">
      {/* Encabezado */}
      <div className="productos-encabezado">
        <h1>🛍️ Nuestros Productos</h1>
        <p>Encuentra todo lo que tu mascota necesita</p>
      </div>

      {/* Filtros */}
      <div className="productos-filtros">
        {/* Buscador */}
        <div className="filtro-busqueda">
          <input
            type="text"
            placeholder="🔍 Buscar productos..."
            value={busqueda}
            onChange={manejarBusqueda}
            className="input-busqueda"
          />
        </div>

        {/* Selector de categoría */}
        <div className="filtro-categoria">
          <select
            value={categoriaSeleccionada}
            onChange={manejarCategoria}
            className="select-categoria"
          >
            {obtenerCategorias().map(categoria => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>

        {/* Botón limpiar filtros */}
        {(busqueda || categoriaSeleccionada !== 'Todas') && (
          <button 
            onClick={limpiarFiltros}
            className="boton-limpiar"
          >
            ✖️ Limpiar Filtros
          </button>
        )}
      </div>

      {/* Información de resultados */}
      <div className="productos-info">
        {cargando ? (
          <p>Cargando productos...</p>
        ) : (
          <p>
            {productos.length === 0 
              ? '😢 No se encontraron productos' 
              : `Mostrando ${productos.length} producto${productos.length !== 1 ? 's' : ''}`
            }
          </p>
        )}
      </div>

      {/* Grid de productos */}
      {!cargando && (
        <div className="productos-grid">
          {productos.map(producto => (
            <div key={producto.id} className="producto-tarjeta">
              {/* Imagen */}
              <Link to={`/producto/${producto.id}`} className="producto-link-imagen">
                <div className="producto-imagen">
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />
                  
                  {/* Badges */}
                  {producto.stock < 10 && producto.stock > 0 && (
                    <span className="badge badge-stock">
                      ¡Solo {producto.stock} disponibles!
                    </span>
                  )}
                  {producto.stock === 0 && (
                    <span className="badge badge-agotado">
                      Agotado
                    </span>
                  )}
                  
                  <span className="badge badge-categoria">
                    {producto.categoria}
                  </span>
                </div>
              </Link>

              {/* Contenido */}
              <div className="producto-contenido">
                <Link to={`/producto/${producto.id}`}>
                  <h3>{producto.nombre}</h3>
                </Link>
                
                <p className="producto-descripcion">
                  {producto.descripcion}
                </p>

                <div className="producto-pie">
                  <span className="producto-precio">
                    {formatearPrecio(producto.precio)}
                  </span>

                  <div className="producto-acciones">
                    <Link 
                      to={`/producto/${producto.id}`}
                      className="boton-detalle"
                    >
                      Ver
                    </Link>
                    
                    <button
                      onClick={() => manejarAgregarCarrito(producto)}
                      disabled={producto.stock === 0}
                      className="boton-agregar"
                    >
                      {producto.stock === 0 ? 'Agotado' : '🛒 Agregar'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mensaje si no hay productos */}
      {!cargando && productos.length === 0 && (
        <div className="sin-productos">
          <p>No encontramos productos con esos filtros</p>
          <button onClick={limpiarFiltros} className="boton-reintentar">
            Ver todos los productos
          </button>
        </div>
      )}
    </div>
  );
}

export default Productos;