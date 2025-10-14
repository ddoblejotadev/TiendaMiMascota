/**
 * PÁGINA: BLOG
 * Artículos y consejos sobre el cuidado de mascotas - 100% Bootstrap (Sin imágenes)
 */

import { useState } from 'react';

function Blog() {
  const [articuloSeleccionado, setArticuloSeleccionado] = useState(null);
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');

  // Artículos del blog con iconos y colores
  const articulos = [
    {
      id: 1,
      titulo: "Los mejores alimentos para perros adultos",
      descripcionCorta: "Descubre qué alimentos son ideales para mantener a tu perro saludable y lleno de energía.",
      descripcionLarga: "Los perros adultos necesitan una dieta balanceada que incluya proteínas de alta calidad, grasas saludables y carbohidratos complejos. Es importante elegir alimentos que contengan todos los nutrientes necesarios para mantener la salud de tu mascota. Las proteínas deben provenir de fuentes como pollo, pescado o carne de res. Los carbohidratos complejos como arroz integral o avena proporcionan energía sostenida. Las grasas saludables, como el omega-3, son esenciales para la salud del pelaje y la piel.",
      icono: "🍖",
      color: "bg-success",
      gradiente: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
      categoria: "Nutrición",
      fecha: "15 Marzo 2024",
      autor: "Dr. Carlos Ruiz",
      tiempoLectura: "5 min"
    },
    {
      id: 2,
      titulo: "Cómo elegir la cama perfecta para tu mascota",
      descripcionCorta: "Una buena cama es fundamental para el descanso de tu mascota.",
      descripcionLarga: "Te explicamos los diferentes tipos de camas disponibles y cómo elegir la más adecuada según el tamaño y las necesidades de tu perro o gato. Una cama cómoda ayuda a que tu mascota descanse mejor y se sienta segura. Considera el tamaño de tu mascota, si tiene problemas articulares (opta por camas ortopédicas), si es mayor (necesita más acolchado), y el material (algunos animales son alérgicos a ciertos tejidos). Las camas elevadas son ideales para climas cálidos, mientras que las tipo cueva son perfectas para mascotas que buscan privacidad.",
      icono: "🛏️",
      color: "bg-info",
      gradiente: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      categoria: "Accesorios",
      fecha: "10 Marzo 2024",
      autor: "María González",
      tiempoLectura: "4 min"
    },
    {
      id: 3,
      titulo: "5 consejos para el cuidado dental de tu perro",
      descripcionCorta: "La salud dental es crucial para el bienestar general de tu mascota.",
      descripcionLarga: "El cuidado dental en perros es esencial para prevenir enfermedades. Aquí te compartimos 5 consejos clave: 1) Cepilla los dientes de tu perro al menos 3 veces por semana con pasta dental específica para perros. 2) Ofrece juguetes dentales que ayuden a limpiar los dientes mientras juega. 3) Incluye snacks dentales en su dieta diaria. 4) Revisa regularmente las encías en busca de inflamación o sangrado. 5) Programa limpiezas dentales profesionales anuales con tu veterinario. La acumulación de sarro puede llevar a infecciones graves y pérdida de dientes.",
      icono: "🦷",
      color: "bg-warning",
      gradiente: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      categoria: "Salud",
      fecha: "5 Marzo 2024",
      autor: "Dra. Ana Martínez",
      tiempoLectura: "6 min"
    },
    {
      id: 4,
      titulo: "Juguetes interactivos: estimulación mental para gatos",
      descripcionCorta: "Mantén a tu gato entretenido y estimulado mentalmente con los juguetes adecuados.",
      descripcionLarga: "Los gatos son animales inteligentes que necesitan estimulación mental constante. Los juguetes interactivos son perfectos para mantener su mente activa y prevenir el aburrimiento. Opciones recomendadas incluyen: rompecabezas de comida donde deben resolver un desafío para obtener premios, ratones mecánicos que se mueven de forma impredecible, plumas giratorias automáticas, y circuitos de bolas. Los juguetes tipo puzzle ayudan a desarrollar sus habilidades de caza naturales y reducen comportamientos destructivos. Rota los juguetes semanalmente para mantener el interés.",
      icono: "🎾",
      color: "bg-primary",
      gradiente: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      categoria: "Entretenimiento",
      fecha: "1 Marzo 2024",
      autor: "Pedro Silva",
      tiempoLectura: "5 min"
    },
    {
      id: 5,
      titulo: "Cómo preparar a tu mascota para el veterinario",
      descripcionCorta: "Reduce el estrés de las visitas al veterinario con estos consejos prácticos.",
      descripcionLarga: "Las visitas al veterinario pueden ser estresantes tanto para las mascotas como para los dueños. Aquí algunos consejos para hacerlas más llevaderas: 1) Acostumbra a tu mascota al transportín desde cachorro, dejando premios dentro. 2) Realiza visitas 'sociales' a la clínica sin procedimientos médicos. 3) Mantén la calma, las mascotas detectan tu ansiedad. 4) Trae su juguete favorito o manta para que se sienta seguro. 5) Practica tocar sus patas, orejas y boca en casa. 6) Recompensa el buen comportamiento con premios. Una mascota relajada facilitará los exámenes y hará la experiencia más positiva.",
      icono: "🩺",
      color: "bg-danger",
      gradiente: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      categoria: "Salud",
      fecha: "25 Febrero 2024",
      autor: "Dr. Carlos Ruiz",
      tiempoLectura: "7 min"
    },
    {
      id: 6,
      titulo: "Entrenamiento básico para cachorros",
      descripcionCorta: "Los primeros comandos que todo cachorro debe aprender.",
      descripcionLarga: "El entrenamiento temprano es fundamental para un perro bien comportado. Los comandos básicos incluyen: 'Sentado', 'Quieto', 'Ven', 'Acostado' y 'Dejarlo'. Usa el refuerzo positivo con premios y elogios. Las sesiones deben ser cortas (5-10 minutos) y frecuentes. La consistencia es clave: todos en la familia deben usar los mismos comandos. Comienza en un ambiente sin distracciones y gradualmente aumenta la dificultad. La socialización temprana con otros perros y personas es igualmente importante. Recuerda que la paciencia y la repetición son esenciales. Nunca uses castigos físicos, ya que pueden generar miedo y agresividad.",
      icono: "🐕‍🦺",
      color: "bg-dark",
      gradiente: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      categoria: "Entrenamiento",
      fecha: "20 Febrero 2024",
      autor: "María González",
      tiempoLectura: "8 min"
    }
  ];

  // Obtener categorías únicas
  const categorias = ['Todas', ...new Set(articulos.map(a => a.categoria))];

  // Filtrar artículos por categoría
  const articulosFiltrados = categoriaFiltro === 'Todas' 
    ? articulos 
    : articulos.filter(a => a.categoria === categoriaFiltro);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5 text-center" 
               style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="container py-4">
          <h1 className="display-3 fw-bold mb-3">📰 Blog Mi Mascota</h1>
          <p className="lead fs-4">
            Consejos, guías y noticias sobre el cuidado de tus mascotas
          </p>
        </div>
      </section>

      <div className="container my-5">
        {/* Filtros de categoría */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {categorias.map(cat => (
                <button
                  key={cat}
                  className={`btn ${categoriaFiltro === cat ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setCategoriaFiltro(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <p className="text-center text-muted mt-3">
              Mostrando {articulosFiltrados.length} artículo{articulosFiltrados.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Grid de artículos - Diseño sin imágenes */}
        <div className="row g-4">
          {articulosFiltrados.map(articulo => (
            <div key={articulo.id} className="col-md-6 col-lg-4">
              <div 
                className="card h-100 border-0 shadow-sm position-relative overflow-hidden"
                style={{ 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                {/* Header con icono y gradiente */}
                <div 
                  className="text-white p-4 text-center"
                  style={{ background: articulo.gradiente }}
                >
                  <div style={{ fontSize: '4rem' }}>{articulo.icono}</div>
                  <span className="badge bg-white bg-opacity-25 mt-2">
                    {articulo.categoria}
                  </span>
                </div>

                <div className="card-body d-flex flex-column p-4">
                  <h5 className="card-title fw-bold mb-3" style={{ minHeight: '60px' }}>
                    {articulo.titulo}
                  </h5>
                  <p className="card-text text-muted flex-grow-1" style={{ fontSize: '0.95rem' }}>
                    {articulo.descripcionCorta}
                  </p>
                  
                  {/* Footer info */}
                  <div className="mt-3 pt-3 border-top">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <small className="text-muted">
                        <strong>✍️ {articulo.autor}</strong>
                      </small>
                      <small className="text-muted">
                        📅 {articulo.fecha}
                      </small>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        ⏱️ {articulo.tiempoLectura} de lectura
                      </small>
                      <button 
                        className="btn btn-sm btn-primary fw-semibold"
                        onClick={() => setArticuloSeleccionado(articulo)}
                        style={{
                          background: articulo.gradiente,
                          border: 'none'
                        }}
                      >
                        Leer más →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Borde decorativo animado */}
                <div 
                  className="position-absolute top-0 start-0 w-100"
                  style={{
                    height: '4px',
                    background: articulo.gradiente
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card border-0 shadow-sm" 
                 style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <div className="card-body text-white text-center py-5">
                <h3 className="fw-bold mb-3">📧 Suscríbete a nuestro Newsletter</h3>
                <p className="lead mb-4">
                  Recibe los mejores consejos para el cuidado de tu mascota directamente en tu correo
                </p>
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <div className="input-group input-group-lg">
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder="tu@email.com"
                      />
                      <button className="btn btn-light fw-bold" type="button">
                        Suscribirme
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de detalle del artículo - Mejorado sin imagen */}
      {articuloSeleccionado && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setArticuloSeleccionado(null)}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0 shadow-lg" onClick={(e) => e.stopPropagation()}>
              {/* Header con gradiente e icono grande */}
              <div 
                className="text-white p-4 text-center position-relative"
                style={{ background: articuloSeleccionado.gradiente }}
              >
                <div style={{ fontSize: '5rem' }} className="mb-3">
                  {articuloSeleccionado.icono}
                </div>
                <span className="badge bg-white bg-opacity-25 mb-3 px-3 py-2">
                  {articuloSeleccionado.categoria}
                </span>
                <h3 className="fw-bold mb-3">{articuloSeleccionado.titulo}</h3>
                <div className="d-flex justify-content-center gap-4 text-white text-opacity-90">
                  <small>✍️ {articuloSeleccionado.autor}</small>
                  <small>📅 {articuloSeleccionado.fecha}</small>
                  <small>⏱️ {articuloSeleccionado.tiempoLectura}</small>
                </div>
                <button 
                  type="button" 
                  className="btn-close btn-close-white position-absolute top-0 end-0 m-3" 
                  onClick={() => setArticuloSeleccionado(null)}
                ></button>
              </div>

              <div className="modal-body p-4">
                {/* Descripción corta destacada */}
                <div 
                  className="alert mb-4 border-0" 
                  style={{ 
                    background: articuloSeleccionado.gradiente,
                    color: 'white'
                  }}
                >
                  <p className="lead mb-0 fw-semibold">
                    💡 {articuloSeleccionado.descripcionCorta}
                  </p>
                </div>

                {/* Contenido principal */}
                <div className="bg-light rounded p-4 mb-4">
                  <p style={{ 
                    lineHeight: '1.9', 
                    fontSize: '1.1rem',
                    textAlign: 'justify'
                  }}>
                    {articuloSeleccionado.descripcionLarga}
                  </p>
                </div>

                {/* Call to action */}
                <div className="card border-0 shadow-sm">
                  <div 
                    className="card-body text-white"
                    style={{ background: articuloSeleccionado.gradiente }}
                  >
                    <h6 className="fw-bold mb-2">🌟 ¿Te resultó útil este artículo?</h6>
                    <p className="mb-3 small">
                      Comparte tu experiencia en nuestras redes sociales o contáctanos si tienes alguna pregunta.
                    </p>
                    <div className="d-flex gap-2 flex-wrap">
                      <button className="btn btn-light btn-sm fw-semibold">
                        👍 Me gusta
                      </button>
                      <button className="btn btn-light btn-sm fw-semibold">
                        💬 Comentar
                      </button>
                      <button className="btn btn-light btn-sm fw-semibold">
                        📤 Compartir
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer border-0 bg-light">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setArticuloSeleccionado(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;
