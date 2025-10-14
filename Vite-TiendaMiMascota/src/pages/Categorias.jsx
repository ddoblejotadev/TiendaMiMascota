/**
 * PÁGINA DE CATEGORÍAS
 * Vista que separa los productos por categorías (Requisito del PDF - Figura 4)
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductos } from '../hooks/useProductos';
import ProductCard from '../components/ProductCard';
import '../styles/pages/Categorias.css';

function Categorias() {
  const { productos, cargando } = useProductos();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  // Obtener categorías únicas de los productos
  const categorias = ['Todas', ...new Set(productos.map(p => p.categoria))];

  // Filtrar productos por categoría seleccionada
  const productosFiltrados = categoriaSeleccionada === 'Todas'
    ? productos
    : productos.filter(p => p.categoria === categoriaSeleccionada);

  // Contar productos por categoría
  const contarProductos = (categoria) => {
    if (categoria === 'Todas') return productos.length;
    return productos.filter(p => p.categoria === categoria).length;
  };

  return (
    <div className="pagina-categorias">
      {/* Encabezado */}
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">🏷️ Explora por Categorías</h1>
          <p className="lead text-muted">
            Encuentra exactamente lo que necesitas navegando por nuestras categorías
          </p>
        </div>

        {/* Grid de tarjetas de categorías */}
        <div className="row g-4 mb-5">
          {categorias.map((categoria) => (
            <div key={categoria} className="col-6 col-md-4 col-lg-3">
              <div
                className={`card categoria-card h-100 ${
                  categoriaSeleccionada === categoria ? 'activa' : ''
                }`}
                onClick={() => setCategoriaSeleccionada(categoria)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body text-center">
                  <div className="icono-categoria mb-3">
                    {categoria === 'Todas' && '📦'}
                    {categoria === 'Comida' && '🍖'}
                    {categoria === 'Juguetes' && '🧸'}
                    {categoria === 'Accesorios' && '🎀'}
                    {categoria === 'Higiene' && '🧼'}
                    {categoria === 'Salud' && '💊'}
                  </div>
                  <h5 className="card-title mb-2">{categoria}</h5>
                  <p className="card-text text-muted">
                    {contarProductos(categoria)} productos
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {categoriaSeleccionada}
            </li>
          </ol>
        </nav>

        {/* Información de resultados */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 mb-0">
            {categoriaSeleccionada === 'Todas' 
              ? 'Todos los Productos' 
              : `Categoría: ${categoriaSeleccionada}`}
          </h2>
          <span className="badge bg-primary rounded-pill">
            {productosFiltrados.length} productos
          </span>
        </div>

        {/* Estado de carga */}
        {cargando && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3 text-muted">Cargando productos...</p>
          </div>
        )}

        {/* Grid de productos filtrados */}
        {!cargando && productosFiltrados.length > 0 && (
          <div className="row g-4">
            {productosFiltrados.map((producto) => (
              <div key={producto.id} className="col-sm-6 col-md-4 col-lg-3">
                <ProductCard producto={producto} />
              </div>
            ))}
          </div>
        )}

        {/* Sin resultados */}
        {!cargando && productosFiltrados.length === 0 && (
          <div className="text-center py-5">
            <div className="mb-4" style={{ fontSize: '4rem' }}>
              😿
            </div>
            <h3>No hay productos en esta categoría</h3>
            <p className="text-muted">
              Intenta seleccionar otra categoría
            </p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => setCategoriaSeleccionada('Todas')}
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Categorias;
