/**
 * PÁGINA: INICIO
 * Página principal de la tienda - 100% Bootstrap
 */

import { Link, useNavigate } from 'react-router-dom';
import useProductos from '../hooks/useProductos';
import ProductCard from '../components/ProductCard';
import imagenComida from '../assets/Comida.jpg';
import imagenJuguetes from '../assets/jugetes.png';
import imagenAccesorios from '../assets/accesorios.png';
import imagenHigiene from '../assets/higiene.png';

function Inicio() {
  const navigate = useNavigate();
  const { todosLosProductos, cargando, error } = useProductos();
  
  // Filtrar y mostrar solo productos destacados (máximo 4)
  const productosDestacados = todosLosProductos
    .filter(p => p.destacado === true)
    .slice(0, 4);
  
  /**
   * Ir a la categoría seleccionada
   */
  const irACategoria = (categoria) => {
    navigate('/productos', { state: { categoria } });
  };

  return (
    <div>
      {/* SECCIÓN 1: Banner Principal con gradiente */}
      <section className="bg-primary text-white py-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="container text-center py-5">
          <h1 className="display-3 fw-bold mb-3">🐾 Bienvenido a Mi Mascota</h1>
          <p className="lead fs-4 mb-2">Los mejores productos para tu mejor amigo</p>
          <p className="fs-5 mb-4 opacity-75">
            Encuentra todo lo que necesita tu mascota: alimento, juguetes, accesorios y más
          </p>
          <Link to="/productos" className="btn btn-light btn-lg px-5 py-3 rounded-pill shadow">
            Ver Todos los Productos
          </Link>
        </div>
      </section>

      {/* SECCIÓN 2: Productos Destacados */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">⭐ Productos Destacados</h2>
            <p className="text-muted fs-5">Los productos más populares de nuestra tienda</p>
          </div>
          
          {cargando ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="text-muted mt-3">
                {import.meta.env.PROD ? 'Cargando productos...' : 'Cargando productos del backend...'}
              </p>
            </div>
          ) : error ? (
            <div className="alert alert-warning text-center" role="alert">
              <h4 className="alert-heading">⚠️ No se pudieron cargar los productos</h4>
              <p>{error}</p>
              {!import.meta.env.PROD && (
                <small className="text-muted">
                  Verifica que el backend esté corriendo en <code>http://localhost:8080</code>
                </small>
              )}
            </div>
          ) : productosDestacados.length === 0 ? (
            <div className="alert alert-info text-center">
              <p className="mb-0">No hay productos destacados disponibles en este momento.</p>
            </div>
          ) : (
            <>
              <div className="row g-4">
                {productosDestacados.map(producto => (
                  <div key={producto.id} className="col-sm-6 col-md-4 col-lg-3">
                    <ProductCard producto={producto} />
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-5">
                <Link to="/productos" className="btn btn-primary btn-lg px-5">
                  Ver Todos los Productos →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* SECCIÓN 3: Categorías */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">🏷️ Categorías</h2>
            <p className="text-muted fs-5">Explora nuestras categorías de productos</p>
          </div>
          
          <div className="row g-4">
            <div className="col-sm-6 col-lg-3">
              <div 
                className="card h-100 shadow-sm border-0 cursor-pointer"
                onClick={() => irACategoria('Alimento')}
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <img src={imagenComida} className="card-img-top" alt="Alimento" style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">Alimento</h5>
                  <p className="card-text text-muted small">Nutrición balanceada para tu mascota</p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div 
                className="card h-100 shadow-sm border-0 cursor-pointer"
                onClick={() => irACategoria('Juguetes')}
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <img src={imagenJuguetes} className="card-img-top" alt="Juguetes" style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">Juguetes</h5>
                  <p className="card-text text-muted small">Diversión y entretenimiento garantizado</p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div 
                className="card h-100 shadow-sm border-0 cursor-pointer"
                onClick={() => irACategoria('Accesorios')}
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <img src={imagenAccesorios} className="card-img-top" alt="Accesorios" style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">Accesorios</h5>
                  <p className="card-text text-muted small">Todo lo que necesita tu mascota</p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div 
                className="card h-100 shadow-sm border-0 cursor-pointer"
                onClick={() => irACategoria('Higiene')}
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <img src={imagenHigiene} className="card-img-top" alt="Higiene" style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">Higiene</h5>
                  <p className="card-text text-muted small">Productos para su cuidado e higiene</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: Beneficios */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center display-5 fw-bold mb-5">¿Por qué comprar con nosotros?</h2>
          
          <div className="row g-4">
            <div className="col-sm-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="display-1 mb-3">🚚</div>
                <h5 className="fw-bold">Envío Gratis</h5>
                <p className="text-muted mb-0">En compras sobre $30.000</p>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="display-1 mb-3">💳</div>
                <h5 className="fw-bold">Pago Seguro</h5>
                <p className="text-muted mb-0">Todas las tarjetas aceptadas</p>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="display-1 mb-3">🔄</div>
                <h5 className="fw-bold">Devolución Fácil</h5>
                <p className="text-muted mb-0">30 días para devolver</p>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="display-1 mb-3">🎧</div>
                <h5 className="fw-bold">Soporte 24/7</h5>
                <p className="text-muted mb-0">Atención personalizada</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Inicio;
