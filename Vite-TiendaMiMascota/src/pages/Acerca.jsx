/**
 * PÁGINA: ACERCA DE
 * Información sobre la tienda Mi Mascota
 */

import '../styles/pages/Acerca.css';

function Acerca() {
  return (
    <div className="pagina-acerca">
      {/* Hero Section */}
      <section className="acerca-hero">
        <div className="hero-contenido">
          <h1>🐾 Sobre Mi Mascota</h1>
          <p className="hero-descripcion">
            La mejor tienda para el cuidado y bienestar de tu mascota
          </p>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="seccion-historia">
        <div className="contenedor-seccion">
          <div className="historia-contenido">
            <h2>📖 Nuestra Historia</h2>
            <p>
              <strong>Mi Mascota</strong> nació en 2020 con una misión clara: 
              proporcionar productos de alta calidad para el cuidado y felicidad 
              de las mascotas en Chile.
            </p>
            <p>
              Lo que comenzó como una pequeña tienda local, hoy se ha convertido 
              en una de las tiendas online más confiables del país, atendiendo 
              a miles de familias que aman a sus mascotas.
            </p>
            <p>
              Sabemos que tu mascota es parte de tu familia, por eso seleccionamos 
              cuidadosamente cada producto que ofrecemos, garantizando calidad, 
              seguridad y los mejores precios.
            </p>
          </div>
          <div className="historia-imagen">
            <img src="/images/tienda-historia.jpg" alt="Nuestra historia" />
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="seccion-mision-vision">
        <div className="contenedor-seccion">
          <div className="tarjeta-valor">
            <div className="valor-icono">🎯</div>
            <h3>Nuestra Misión</h3>
            <p>
              Proporcionar productos de calidad excepcional para el cuidado 
              de mascotas, ofreciendo una experiencia de compra fácil, segura 
              y confiable, contribuyendo al bienestar y felicidad de cada 
              animal y su familia.
            </p>
          </div>

          <div className="tarjeta-valor">
            <div className="valor-icono">🌟</div>
            <h3>Nuestra Visión</h3>
            <p>
              Ser la tienda líder en Chile para productos de mascotas, 
              reconocida por nuestra calidad, servicio al cliente excepcional 
              y compromiso con el bienestar animal, expandiendo nuestro 
              alcance a toda Latinoamérica.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="seccion-valores">
        <h2>💎 Nuestros Valores</h2>
        <div className="grid-valores">
          <div className="valor-item">
            <div className="valor-icono-pequeno">❤️</div>
            <h4>Amor por los Animales</h4>
            <p>Cada decisión la tomamos pensando en el bienestar de las mascotas</p>
          </div>

          <div className="valor-item">
            <div className="valor-icono-pequeno">✓</div>
            <h4>Calidad Garantizada</h4>
            <p>Solo ofrecemos productos de marcas confiables y probadas</p>
          </div>

          <div className="valor-item">
            <div className="valor-icono-pequeno">🤝</div>
            <h4>Confianza</h4>
            <p>Construimos relaciones duraderas basadas en la transparencia</p>
          </div>

          <div className="valor-item">
            <div className="valor-icono-pequeno">🚀</div>
            <h4>Innovación</h4>
            <p>Constantemente buscamos mejorar nuestra oferta y servicios</p>
          </div>

          <div className="valor-item">
            <div className="valor-icono-pequeno">🎓</div>
            <h4>Educación</h4>
            <p>Compartimos conocimiento para el mejor cuidado de las mascotas</p>
          </div>

          <div className="valor-item">
            <div className="valor-icono-pequeno">🌍</div>
            <h4>Responsabilidad</h4>
            <p>Comprometidos con el medio ambiente y la comunidad</p>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="seccion-equipo">
        <h2>👥 Nuestro Equipo</h2>
        <p className="equipo-descripcion">
          Conoce a las personas apasionadas que hacen posible Mi Mascota
        </p>
        
        <div className="grid-equipo">
          <div className="miembro-equipo">
            <div className="miembro-foto">
              <img src="/images/equipo-1.jpg" alt="María González" />
            </div>
            <h3>María González</h3>
            <p className="miembro-cargo">Fundadora & CEO</p>
            <p className="miembro-descripcion">
              Veterinaria con 10 años de experiencia
            </p>
          </div>

          <div className="miembro-equipo">
            <div className="miembro-foto">
              <img src="/images/equipo-2.jpg" alt="Carlos Ruiz" />
            </div>
            <h3>Carlos Ruiz</h3>
            <p className="miembro-cargo">Director de Operaciones</p>
            <p className="miembro-descripcion">
              Experto en logística y distribución
            </p>
          </div>

          <div className="miembro-equipo">
            <div className="miembro-foto">
              <img src="/images/equipo-3.jpg" alt="Ana Martínez" />
            </div>
            <h3>Ana Martínez</h3>
            <p className="miembro-cargo">Jefa de Atención al Cliente</p>
            <p className="miembro-descripcion">
              Dedicada a la satisfacción del cliente
            </p>
          </div>

          <div className="miembro-equipo">
            <div className="miembro-foto">
              <img src="/images/equipo-4.jpg" alt="Pedro Silva" />
            </div>
            <h3>Pedro Silva</h3>
            <p className="miembro-cargo">Especialista en Productos</p>
            <p className="miembro-descripcion">
              Curador de nuestro catálogo
            </p>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="seccion-estadisticas">
        <h2>📊 Nuestros Números</h2>
        <div className="grid-estadisticas">
          <div className="estadistica">
            <div className="estadistica-numero">5,000+</div>
            <div className="estadistica-texto">Clientes Felices</div>
          </div>

          <div className="estadistica">
            <div className="estadistica-numero">15,000+</div>
            <div className="estadistica-texto">Productos Vendidos</div>
          </div>

          <div className="estadistica">
            <div className="estadistica-numero">500+</div>
            <div className="estadistica-texto">Productos Diferentes</div>
          </div>

          <div className="estadistica">
            <div className="estadistica-numero">4.8⭐</div>
            <div className="estadistica-texto">Calificación Promedio</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="seccion-cta">
        <div className="cta-contenido">
          <h2>¿Listo para cuidar mejor a tu mascota?</h2>
          <p>Explora nuestra amplia selección de productos</p>
          <a href="/productos" className="boton-cta">
            Ver Productos
          </a>
        </div>
      </section>
    </div>
  );
}

export default Acerca;