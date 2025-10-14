/**
 * PÁGINA: INICIO
 * Página principal de la tienda
 */

import { Link, useNavigate } from 'react-router-dom';
import useProductos from '../hooks/useProductos';
import imagenComida from '../assets/Comida.jpg';
import imagenJuguetes from '../assets/jugetes.png';
import imagenAccesorios from '../assets/accesorios.png';
import imagenHigiene from '../assets/higiene.png';
import '../styles/pages/Inicio.css';

function Inicio() {
  const navigate = useNavigate();
  const { todosLosProductos, cargando } = useProductos();
  
  // Mostrar solo los primeros 4 productos destacados
  const productosDestacados = todosLosProductos.slice(0, 4);

  /**
   * Formatear precio
   */
  const formatearPrecio = (precio) => {
    return '$' + precio.toLocaleString('es-CL');
  };
  
  /**
   * Ir a la categoría seleccionada
   */
  const irACategoria = (categoria) => {
    navigate('/productos', { state: { categoria } });
  };

  return (
    <div className="pagina-inicio">
      {/* SECCIÓN 1: Banner Principal */}
      <section className="hero">
        <div className="hero-contenido">
          <h1>🐾 Bienvenido a Mi Mascota</h1>
          <p>Los mejores productos para tu mejor amigo</p>
          <p className="hero-descripcion">
            Encuentra todo lo que necesita tu mascota: alimento, juguetes, accesorios y más
          </p>
          <Link to="/productos" className="boton-hero">
            Ver Todos los Productos
          </Link>
        </div>
      </section>

      {/* SECCIÓN 2: Productos Destacados */}
      <section className="seccion-destacados">
        <h2>⭐ Productos Destacados</h2>
        <p className="subtitulo">Los productos más populares de nuestra tienda</p>
        
        {cargando ? (
          <p className="texto-cargando">Cargando productos...</p>
        ) : (
          <div className="grid-productos">
            {productosDestacados.map(producto => (
              <div key={producto.id} className="tarjeta-producto">
                <div className="producto-imagen">
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />
                  {producto.stock < 10 && (
                    <span className="badge-stock">¡Últimas unidades!</span>
                  )}
                </div>
                
                <div className="producto-contenido">
                  <h3>{producto.nombre}</h3>
                  <p>{producto.descripcion}</p>
                  <div className="producto-footer">
                    <span className="precio">{formatearPrecio(producto.precio)}</span>
                    <Link 
                      to={`/producto/${producto.id}`} 
                      className="boton-ver"
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="contenedor-boton-ver-mas">
          <Link to="/productos" className="boton-ver-mas">
            Ver Todos los Productos →
          </Link>
        </div>
      </section>

      {/* SECCIÓN 3: Categorías */}
      <section className="seccion-categorias">
        <h2>🏷️ Categorías</h2>
        <p className="subtitulo">Explora nuestras categorías de productos</p>
        
        <div className="grid-categorias">
          <div 
            className="tarjeta-categoria"
            onClick={() => irACategoria('Alimento')}
          >
            <div className="categoria-imagen">
              <img src={imagenComida} alt="Alimento" />
            </div>
            <h3>Alimento</h3>
            <p>Nutrición balanceada para tu mascota</p>
          </div>

          <div 
            className="tarjeta-categoria"
            onClick={() => irACategoria('Juguetes')}
          >
            <div className="categoria-imagen">
              <img src={imagenJuguetes} alt="Juguetes" />
            </div>
            <h3>Juguetes</h3>
            <p>Diversión y entretenimiento garantizado</p>
          </div>

          <div 
            className="tarjeta-categoria"
            onClick={() => irACategoria('Accesorios')}
          >
            <div className="categoria-imagen">
              <img src={imagenAccesorios} alt="Accesorios" />
            </div>
            <h3>Accesorios</h3>
            <p>Todo lo que necesita tu mascota</p>
          </div>

          <div 
            className="tarjeta-categoria"
            onClick={() => irACategoria('Higiene')}
          >
            <div className="categoria-imagen">
              <img src={imagenHigiene} alt="Higiene" />
            </div>
            <h3>Higiene</h3>
            <p>Productos para su cuidado e higiene</p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: Beneficios */}
      <section className="seccion-beneficios">
        <h2>¿Por qué comprar con nosotros?</h2>
        
        <div className="grid-beneficios">
          <div className="tarjeta-beneficio">
            <div className="beneficio-icono">🚚</div>
            <h3>Envío Gratis</h3>
            <p>En compras sobre $30.000</p>
          </div>

          <div className="tarjeta-beneficio">
            <div className="beneficio-icono">💳</div>
            <h3>Pago Seguro</h3>
            <p>Todas las tarjetas aceptadas</p>
          </div>

          <div className="tarjeta-beneficio">
            <div className="beneficio-icono">🔄</div>
            <h3>Devolución Fácil</h3>
            <p>30 días para devolver</p>
          </div>

          <div className="tarjeta-beneficio">
            <div className="beneficio-icono">🎧</div>
            <h3>Soporte 24/7</h3>
            <p>Atención personalizada</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Inicio;