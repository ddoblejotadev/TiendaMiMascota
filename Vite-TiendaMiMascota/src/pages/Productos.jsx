/**
 * PÁGINA: PRODUCTOS
 * Lista completa de productos con filtros - 100% Bootstrap
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useProductos from '../hooks/useProductos';
import ProductCard from '../components/ProductCard';

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

  // Si viene una categoría desde la navegación, aplicarla
  useEffect(() => {
    if (location.state?.categoria) {
      filtrarPorCategoria(location.state.categoria);
    }
  }, [location.state, filtrarPorCategoria]);

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

  return (
    <div>
      {/* Encabezado con gradiente */}
      <div className="bg-primary text-white py-5 text-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="container">
          <h1 className="display-4 fw-bold mb-2">🛍️ Nuestros Productos</h1>
          <p className="lead">Encuentra todo lo que tu mascota necesita</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="container my-4">
        <div className="card shadow-sm border-0 p-4">
          <div className="row g-3 align-items-center">
            {/* Buscador */}
            <div className="col-md-5">
              <input
                type="text"
                placeholder="🔍 Buscar productos..."
                value={busqueda}
                onChange={manejarBusqueda}
                className="form-control form-control-lg"
              />
            </div>

            {/* Selector de categoría */}
            <div className="col-md-4">
              <select
                value={categoriaSeleccionada}
                onChange={manejarCategoria}
                className="form-select form-select-lg"
              >
                {obtenerCategorias().map(categoria => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón limpiar filtros */}
            <div className="col-md-3">
              {(busqueda || categoriaSeleccionada !== 'Todas') && (
                <button 
                  onClick={limpiarFiltros}
                  className="btn btn-outline-secondary btn-lg w-100"
                >
                  ✖️ Limpiar Filtros
                </button>
              )}
            </div>
          </div>

          {/* Información de resultados */}
          <div className="mt-3 text-center text-muted">
            {cargando ? (
              <div className="d-flex justify-content-center align-items-center gap-2">
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <span>Cargando productos...</span>
              </div>
            ) : (
              <span>
                {productos.length === 0 
                  ? '😢 No se encontraron productos' 
                  : `Mostrando ${productos.length} producto${productos.length !== 1 ? 's' : ''}`
                }
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="container my-5">
        {!cargando && productos.length > 0 && (
          <div className="row g-4">
            {productos.map(producto => (
              <div key={producto.id} className="col-sm-6 col-md-4 col-lg-3">
                <ProductCard producto={producto} />
              </div>
            ))}
          </div>
        )}

        {/* Mensaje si no hay productos */}
        {!cargando && productos.length === 0 && (
          <div className="text-center py-5">
            <div className="display-1 mb-3">🔍</div>
            <h3 className="mb-3">No encontramos productos con esos filtros</h3>
            <button onClick={limpiarFiltros} className="btn btn-primary btn-lg">
              Ver todos los productos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Productos;
