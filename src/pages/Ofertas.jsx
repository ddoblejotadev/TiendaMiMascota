/**
 * PÁGINA DE OFERTAS
 * Vista que muestra todos los productos en oferta (Requisito del PDF)
 */

import useProductos from '../hooks/useProductos';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

function Ofertas() {
  const { productos, cargando } = useProductos();

  // Filtrar productos en oferta (los que tienen precio menor a 15000 para este ejemplo)
  // En producción, tendrías un campo "enOferta" o "precioDescuento"
  const productosEnOferta = productos.filter(p => p.precio < 15000);

  // Calcular descuento simulado (ejemplo)
  const calcularDescuentoSimulado = () => {
    return Math.floor(Math.random() * 30) + 10; // 10% a 40% de descuento
  };

  return (
    <div>
      {/* Banner de ofertas */}
      <div className="text-white py-5" 
           style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-3 fw-bold mb-3">
                🔥 ¡Ofertas Especiales!
              </h1>
              <p className="lead mb-4">
                Aprovecha nuestros descuentos en productos seleccionados
              </p>
              <div className="d-flex gap-4 flex-wrap">
                <div className="d-flex align-items-center gap-3 bg-white bg-opacity-25 rounded p-3">
                  <span className="fs-1">🎁</span>
                  <div>
                    <div className="fw-bold fs-5">Hasta 40% OFF</div>
                    <small>En productos seleccionados</small>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3 bg-white bg-opacity-25 rounded p-3">
                  <span className="fs-1">🚚</span>
                  <div>
                    <div className="fw-bold fs-5">Envío Gratis</div>
                    <small>Sobre $50.000</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center d-none d-lg-block">
              <div className="display-1">💰</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none">Inicio</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Ofertas
            </li>
          </ol>
        </nav>

        {/* Información */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h3 mb-0 fw-bold">🏷️ Productos en Oferta</h2>
          <span className="badge bg-danger fs-6">
            {productosEnOferta.length} productos
          </span>
        </div>

        {/* Estado de carga */}
        {cargando && (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3 text-muted">Cargando ofertas...</p>
          </div>
        )}

        {/* Grid de productos en oferta */}
        {!cargando && productosEnOferta.length > 0 && (
          <div className="row g-4">
            {productosEnOferta.map((producto) => (
              <div key={producto.id} className="col-sm-6 col-md-4 col-lg-3">
                <div className="position-relative">
                  {/* Badge de descuento */}
                  <div className="position-absolute top-0 end-0 m-2" style={{ zIndex: 10 }}>
                    <span className="badge bg-danger fs-6">
                      -{calcularDescuentoSimulado()}%
                    </span>
                  </div>
                  <ProductCard producto={producto} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sin ofertas */}
        {!cargando && productosEnOferta.length === 0 && (
          <div className="text-center py-5">
            <div className="display-1 mb-4">😿</div>
            <h3 className="fw-bold mb-3">No hay ofertas disponibles</h3>
            <p className="text-muted mb-4">
              Vuelve pronto para ver nuestras nuevas ofertas
            </p>
            <Link to="/productos" className="btn btn-primary btn-lg">
              Ver todos los productos
            </Link>
          </div>
        )}

        {/* Banner inferior */}
        {!cargando && productosEnOferta.length > 0 && (
          <div className="alert alert-info mt-5 d-flex align-items-start gap-3">
            <div className="fs-1">ℹ️</div>
            <div>
              <h5 className="alert-heading fw-bold mb-2">¿Buscas algo específico?</h5>
              <p className="mb-0">
                Visita nuestra <Link to="/productos" className="alert-link">página de productos</Link> para ver
                todo nuestro catálogo o usa nuestras <Link to="/categorias" className="alert-link">categorías</Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Ofertas;
