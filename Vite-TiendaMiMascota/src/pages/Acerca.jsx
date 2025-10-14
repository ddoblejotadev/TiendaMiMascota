/**
 * PÁGINA: ACERCA DE
 * Información sobre la tienda Mi Mascota - 100% Bootstrap
 */

function Acerca() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5 text-center" 
               style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="container py-5">
          <h1 className="display-3 fw-bold mb-3">🐾 Sobre Mi Mascota</h1>
          <p className="lead fs-4">
            La mejor tienda para el cuidado y bienestar de tu mascota
          </p>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold mb-4">📖 Nuestra Historia</h2>
              <p className="lead mb-3">
                <strong>Mi Mascota</strong> nació en 2020 con una misión clara: 
                proporcionar productos de alta calidad para el cuidado y felicidad 
                de las mascotas en Chile.
              </p>
              <p className="mb-3">
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
            <div className="col-lg-6">
              <img src="/images/tienda-historia.jpg" alt="Nuestra historia" 
                   className="img-fluid rounded shadow-lg"
                   onError={(e) => e.target.src = 'https://via.placeholder.com/600x400?text=Mi+Mascota'} />
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-5 text-center">
                  <div className="display-1 mb-4">🎯</div>
                  <h3 className="fw-bold mb-3">Nuestra Misión</h3>
                  <p>
                    Proporcionar productos de calidad excepcional para el cuidado 
                    de mascotas, ofreciendo una experiencia de compra fácil, segura 
                    y confiable, contribuyendo al bienestar y felicidad de cada 
                    animal y su familia.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-5 text-center">
                  <div className="display-1 mb-4">🌟</div>
                  <h3 className="fw-bold mb-3">Nuestra Visión</h3>
                  <p>
                    Ser la tienda líder en Chile para productos de mascotas, 
                    reconocida por nuestra calidad, servicio al cliente excepcional 
                    y compromiso con el bienestar animal, expandiendo nuestro 
                    alcance a toda Latinoamérica.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-5">
        <div className="container">
          <h2 className="display-5 fw-bold text-center mb-5">💎 Nuestros Valores</h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="text-center p-4">
                <div className="display-3 mb-3">❤️</div>
                <h4 className="fw-bold mb-3">Amor por los Animales</h4>
                <p className="text-muted">Cada decisión la tomamos pensando en el bienestar de las mascotas</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="text-center p-4">
                <div className="display-3 mb-3">✓</div>
                <h4 className="fw-bold mb-3">Calidad Garantizada</h4>
                <p className="text-muted">Solo ofrecemos productos de marcas confiables y probadas</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="text-center p-4">
                <div className="display-3 mb-3">🤝</div>
                <h4 className="fw-bold mb-3">Confianza</h4>
                <p className="text-muted">Construimos relaciones duraderas basadas en la transparencia</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="text-center p-4">
                <div className="display-3 mb-3">🚀</div>
                <h4 className="fw-bold mb-3">Innovación</h4>
                <p className="text-muted">Constantemente buscamos mejorar nuestra oferta y servicios</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="text-center p-4">
                <div className="display-3 mb-3">🎓</div>
                <h4 className="fw-bold mb-3">Educación</h4>
                <p className="text-muted">Compartimos conocimiento para el mejor cuidado de las mascotas</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="text-center p-4">
                <div className="display-3 mb-3">🌍</div>
                <h4 className="fw-bold mb-3">Responsabilidad</h4>
                <p className="text-muted">Comprometidos con el medio ambiente y la comunidad</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="display-5 fw-bold text-center mb-3">👥 Nuestro Equipo</h2>
          <p className="text-center text-muted mb-5">
            Conoce a las personas apasionadas que hacen posible Mi Mascota
          </p>
          
          <div className="row g-4">
            <div className="col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <div className="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center text-white" 
                         style={{ width: '100px', height: '100px', fontSize: '3rem' }}>
                      👩‍⚕️
                    </div>
                  </div>
                  <h5 className="fw-bold mb-1">María González</h5>
                  <p className="text-primary small fw-semibold mb-2">Fundadora & CEO</p>
                  <p className="text-muted small">Veterinaria con 10 años de experiencia</p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <div className="rounded-circle bg-success d-inline-flex align-items-center justify-content-center text-white" 
                         style={{ width: '100px', height: '100px', fontSize: '3rem' }}>
                      👨‍💼
                    </div>
                  </div>
                  <h5 className="fw-bold mb-1">Carlos Ruiz</h5>
                  <p className="text-success small fw-semibold mb-2">Director de Operaciones</p>
                  <p className="text-muted small">Experto en logística y distribución</p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <div className="rounded-circle bg-info d-inline-flex align-items-center justify-content-center text-white" 
                         style={{ width: '100px', height: '100px', fontSize: '3rem' }}>
                      👩‍💻
                    </div>
                  </div>
                  <h5 className="fw-bold mb-1">Ana Martínez</h5>
                  <p className="text-info small fw-semibold mb-2">Jefa de Atención al Cliente</p>
                  <p className="text-muted small">Dedicada a la satisfacción del cliente</p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <div className="rounded-circle bg-warning d-inline-flex align-items-center justify-content-center text-white" 
                         style={{ width: '100px', height: '100px', fontSize: '3rem' }}>
                      👨‍🔬
                    </div>
                  </div>
                  <h5 className="fw-bold mb-1">Pedro Silva</h5>
                  <p className="text-warning small fw-semibold mb-2">Especialista en Productos</p>
                  <p className="text-muted small">Curador de nuestro catálogo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-5">
        <div className="container">
          <h2 className="display-5 fw-bold text-center mb-5">📊 Nuestros Números</h2>
          <div className="row g-4 text-center">
            <div className="col-sm-6 col-lg-3">
              <div className="p-4">
                <div className="display-3 fw-bold text-primary mb-2">5,000+</div>
                <div className="text-muted">Clientes Felices</div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="p-4">
                <div className="display-3 fw-bold text-success mb-2">15,000+</div>
                <div className="text-muted">Productos Vendidos</div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="p-4">
                <div className="display-3 fw-bold text-info mb-2">500+</div>
                <div className="text-muted">Productos Diferentes</div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="p-4">
                <div className="display-3 fw-bold text-warning mb-2">4.8⭐</div>
                <div className="text-muted">Calificación Promedio</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-primary text-white text-center"
               style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="container py-4">
          <h2 className="display-5 fw-bold mb-3">¿Listo para cuidar mejor a tu mascota?</h2>
          <p className="lead mb-4">Explora nuestra amplia selección de productos</p>
          <a href="/productos" className="btn btn-light btn-lg px-5 py-3 fw-bold">
            Ver Productos
          </a>
        </div>
      </section>
    </div>
  );
}

export default Acerca;
