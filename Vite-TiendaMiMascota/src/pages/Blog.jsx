/**
 * PÁGINA: BLOG
 * Artículos y consejos sobre el cuidado de mascotas - 100% Bootstrap
 */

import { useState } from 'react';

function Blog() {
  const [articuloSeleccionado, setArticuloSeleccionado] = useState(null);
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');

  // Artículos del blog
  const articulos = [
    {
      id: 1,
      titulo: "Los mejores alimentos para perros adultos",
      descripcionCorta: "Descubre qué alimentos son ideales para mantener a tu perro saludable y lleno de energía.",
      descripcionLarga: "Los perros adultos necesitan una dieta balanceada que incluya proteínas de alta calidad, grasas saludables y carbohidratos complejos. Es importante elegir alimentos que contengan todos los nutrientes necesarios para mantener la salud de tu mascota. Las proteínas deben provenir de fuentes como pollo, pescado o carne de res. Los carbohidratos complejos como arroz integral o avena proporcionan energía sostenida. Las grasas saludables, como el omega-3, son esenciales para la salud del pelaje y la piel.",
      imagen: "/images/comida-perros.jpg",
      categoria: "Nutrición",
      fecha: "15 Marzo 2024",
      autor: "Dr. Carlos Ruiz"
    },
    {
      id: 2,
      titulo: "Cómo elegir la cama perfecta para tu mascota",
      descripcionCorta: "Una buena cama es fundamental para el descanso de tu mascota.",
      descripcionLarga: "Te explicamos los diferentes tipos de camas disponibles y cómo elegir la más adecuada según el tamaño y las necesidades de tu perro o gato. Una cama cómoda ayuda a que tu mascota descanse mejor y se sienta segura. Considera el tamaño de tu mascota, si tiene problemas articulares (opta por camas ortopédicas), si es mayor (necesita más acolchado), y el material (algunos animales son alérgicos a ciertos tejidos). Las camas elevadas son ideales para climas cálidos, mientras que las tipo cueva son perfectas para mascotas que buscan privacidad.",
      imagen: "/images/cama-mascota.jpg",
      categoria: "Accesorios",
      fecha: "10 Marzo 2024",
      autor: "María González"
    },
    {
      id: 3,
      titulo: "5 consejos para el cuidado dental de tu perro",
      descripcionCorta: "La salud dental es crucial para el bienestar general de tu mascota.",
      descripcionLarga: "El cuidado dental en perros es esencial para prevenir enfermedades. Aquí te compartimos 5 consejos clave: 1) Cepilla los dientes de tu perro al menos 3 veces por semana con pasta dental específica para perros. 2) Ofrece juguetes dentales que ayuden a limpiar los dientes mientras juega. 3) Incluye snacks dentales en su dieta diaria. 4) Revisa regularmente las encías en busca de inflamación o sangrado. 5) Programa limpiezas dentales profesionales anuales con tu veterinario. La acumulación de sarro puede llevar a infecciones graves y pérdida de dientes.",
      imagen: "/images/dental-perro.jpg",
      categoria: "Salud",
      fecha: "5 Marzo 2024",
      autor: "Dra. Ana Martínez"
    },
    {
      id: 4,
      titulo: "Juguetes interactivos: estimulación mental para gatos",
      descripcionCorta: "Mantén a tu gato entretenido y estimulado mentalmente con los juguetes adecuados.",
      descripcionLarga: "Los gatos son animales inteligentes que necesitan estimulación mental constante. Los juguetes interactivos son perfectos para mantener su mente activa y prevenir el aburrimiento. Opciones recomendadas incluyen: rompecabezas de comida donde deben resolver un desafío para obtener premios, ratones mecánicos que se mueven de forma impredecible, plumas giratorias automáticas, y circuitos de bolas. Los juguetes tipo puzzle ayudan a desarrollar sus habilidades de caza naturales y reducen comportamientos destructivos. Rota los juguetes semanalmente para mantener el interés.",
      imagen: "/images/juguetes-gatos.jpg",
      categoria: "Entretenimiento",
      fecha: "1 Marzo 2024",
      autor: "Pedro Silva"
    },
    {
      id: 5,
      titulo: "Cómo preparar a tu mascota para el veterinario",
      descripcionCorta: "Reduce el estrés de las visitas al veterinario con estos consejos prácticos.",
      descripcionLarga: "Las visitas al veterinario pueden ser estresantes tanto para las mascotas como para los dueños. Aquí algunos consejos para hacerlas más llevaderas: 1) Acostumbra a tu mascota al transportín desde cachorro, dejando premios dentro. 2) Realiza visitas 'sociales' a la clínica sin procedimientos médicos. 3) Mantén la calma, las mascotas detectan tu ansiedad. 4) Trae su juguete favorito o manta para que se sienta seguro. 5) Practica tocar sus patas, orejas y boca en casa. 6) Recompensa el buen comportamiento con premios. Una mascota relajada facilitará los exámenes y hará la experiencia más positiva.",
      imagen: "/images/veterinario.jpg",
      categoria: "Salud",
      fecha: "25 Febrero 2024",
      autor: "Dr. Carlos Ruiz"
    },
    {
      id: 6,
      titulo: "Entrenamiento básico para cachorros",
      descripcionCorta: "Los primeros comandos que todo cachorro debe aprender.",
      descripcionLarga: "El entrenamiento temprano es fundamental para un perro bien comportado. Los comandos básicos incluyen: 'Sentado', 'Quieto', 'Ven', 'Acostado' y 'Dejarlo'. Usa el refuerzo positivo con premios y elogios. Las sesiones deben ser cortas (5-10 minutos) y frecuentes. La consistencia es clave: todos en la familia deben usar los mismos comandos. Comienza en un ambiente sin distracciones y gradualmente aumenta la dificultad. La socialización temprana con otros perros y personas es igualmente importante. Recuerda que la paciencia y la repetición son esenciales. Nunca uses castigos físicos, ya que pueden generar miedo y agresividad.",
      imagen: "/images/entrenamiento-cachorro.jpg",
      categoria: "Entrenamiento",
      fecha: "20 Febrero 2024",
      autor: "María González"
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

        {/* Grid de artículos */}
        <div className="row g-4">
          {articulosFiltrados.map(articulo => (
            <div key={articulo.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0">
                <img 
                  src={articulo.imagen}
                  className="card-img-top"
                  alt={articulo.titulo}
                  style={{ height: '200px', objectFit: 'cover' }}
                  onError={(e) => e.target.src = 'https://via.placeholder.com/400x200?text=Blog+Mi+Mascota'}
                />
                <div className="card-body d-flex flex-column">
                  <div className="mb-2">
                    <span className="badge bg-primary">{articulo.categoria}</span>
                  </div>
                  <h5 className="card-title fw-bold">{articulo.titulo}</h5>
                  <p className="card-text text-muted flex-grow-1">
                    {articulo.descripcionCorta}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                    <small className="text-muted">
                      <span className="fw-semibold">{articulo.autor}</span>
                      <br />
                      {articulo.fecha}
                    </small>
                    <button 
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => setArticuloSeleccionado(articulo)}
                    >
                      Leer más →
                    </button>
                  </div>
                </div>
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

      {/* Modal de detalle del artículo */}
      {articuloSeleccionado && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setArticuloSeleccionado(null)}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <span className="badge bg-primary mb-2">{articuloSeleccionado.categoria}</span>
                  <h5 className="modal-title fw-bold">{articuloSeleccionado.titulo}</h5>
                  <small className="text-muted">
                    Por {articuloSeleccionado.autor} • {articuloSeleccionado.fecha}
                  </small>
                </div>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setArticuloSeleccionado(null)}
                ></button>
              </div>
              <div className="modal-body">
                <img 
                  src={articuloSeleccionado.imagen}
                  className="img-fluid rounded mb-4"
                  alt={articuloSeleccionado.titulo}
                  onError={(e) => e.target.src = 'https://via.placeholder.com/800x400?text=Blog+Mi+Mascota'}
                />
                <p className="lead mb-4">{articuloSeleccionado.descripcionCorta}</p>
                <p style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                  {articuloSeleccionado.descripcionLarga}
                </p>
                <div className="alert alert-primary mt-4">
                  <h6 className="alert-heading fw-bold">💡 ¿Te resultó útil este artículo?</h6>
                  <p className="mb-0">
                    Comparte tu experiencia en nuestras redes sociales o contáctanos si tienes alguna pregunta.
                  </p>
                </div>
              </div>
              <div className="modal-footer">
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
