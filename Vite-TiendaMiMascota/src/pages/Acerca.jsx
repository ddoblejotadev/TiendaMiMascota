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
          <div className="row justify-content-center">
            {/* Solo contenido - Sin imagen */}
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3">
                  📖 Nuestra Historia
                </span>
                <h2 className="display-5 fw-bold mb-4">
                  Una Pasión que se Convirtió en Realidad
                </h2>
              </div>
              
              <div className="timeline">
                <div className="mb-4 ps-4 border-start border-primary border-4">
                  <div className="badge bg-primary rounded-circle mb-2" style={{ width: '16px', height: '16px', marginLeft: '-30px' }}></div>
                  <h5 className="fw-bold text-primary mb-2">2020 - El Inicio</h5>
                  <p className="mb-0 text-muted">
                    <strong>Mi Mascota</strong> nació con una misión clara: proporcionar 
                    productos de alta calidad para el cuidado y felicidad de las mascotas en Chile.
                  </p>
                </div>

                <div className="mb-4 ps-4 border-start border-success border-4">
                  <div className="badge bg-success rounded-circle mb-2" style={{ width: '16px', height: '16px', marginLeft: '-30px' }}></div>
                  <h5 className="fw-bold text-success mb-2">2021 - Crecimiento</h5>
                  <p className="mb-0 text-muted">
                    Lo que comenzó como una pequeña tienda local se expandió rápidamente, 
                    ganando la confianza de miles de familias chilenas.
                  </p>
                </div>

                <div className="mb-4 ps-4 border-start border-info border-4">
                  <div className="badge bg-info rounded-circle mb-2" style={{ width: '16px', height: '16px', marginLeft: '-30px' }}></div>
                  <h5 className="fw-bold text-info mb-2">Hoy - Líderes del Mercado</h5>
                  <p className="mb-0 text-muted">
                    Somos una de las tiendas online más confiables del país, 
                    seleccionando cuidadosamente cada producto para garantizar calidad, 
                    seguridad y los mejores precios.
                  </p>
                </div>
              </div>

              <div className="alert alert-primary border-0 shadow-sm mt-5" role="alert">
                <div className="d-flex align-items-start">
                  <span className="fs-2 me-3">💙</span>
                  <div>
                    <h6 className="alert-heading fw-bold mb-2">Nuestro Compromiso</h6>
                    <p className="mb-0">
                      Tu mascota es parte de tu familia, y nosotros lo sabemos. 
                      Por eso cada decisión que tomamos está pensada en su bienestar.
                      Seleccionamos cuidadosamente cada producto para garantizar la máxima 
                      calidad, seguridad y los mejores precios del mercado.
                    </p>
                  </div>
                </div>
              </div>
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

      {/* Estadísticas */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="display-5 fw-bold text-center mb-5">📊 Nuestros Números Hablan por Sí Solos</h2>
          <div className="row g-4 text-center">
            <div className="col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100 p-4 hover-lift" style={{ transition: 'transform 0.3s' }}>
                <div className="card-body">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                       style={{ width: '80px', height: '80px' }}>
                    <span className="fs-1">😊</span>
                  </div>
                  <div className="display-4 fw-bold text-primary mb-2">5,000+</div>
                  <div className="fw-semibold text-muted">Clientes Felices</div>
                  <p className="text-muted small mb-0 mt-2">Familias satisfechas con nuestros productos</p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100 p-4 hover-lift" style={{ transition: 'transform 0.3s' }}>
                <div className="card-body">
                  <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                       style={{ width: '80px', height: '80px' }}>
                    <span className="fs-1">📦</span>
                  </div>
                  <div className="display-4 fw-bold text-success mb-2">15,000+</div>
                  <div className="fw-semibold text-muted">Productos Vendidos</div>
                  <p className="text-muted small mb-0 mt-2">Entregas exitosas a todo Chile</p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100 p-4 hover-lift" style={{ transition: 'transform 0.3s' }}>
                <div className="card-body">
                  <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                       style={{ width: '80px', height: '80px' }}>
                    <span className="fs-1">🛍️</span>
                  </div>
                  <div className="display-4 fw-bold text-info mb-2">500+</div>
                  <div className="fw-semibold text-muted">Productos Diferentes</div>
                  <p className="text-muted small mb-0 mt-2">Variedad para todas las mascotas</p>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100 p-4 hover-lift" style={{ transition: 'transform 0.3s' }}>
                <div className="card-body">
                  <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                       style={{ width: '80px', height: '80px' }}>
                    <span className="fs-1">⭐</span>
                  </div>
                  <div className="display-4 fw-bold text-warning mb-2">4.8</div>
                  <div className="fw-semibold text-muted">Calificación Promedio</div>
                  <p className="text-muted small mb-0 mt-2">Excelencia en servicio y calidad</p>
                </div>
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
