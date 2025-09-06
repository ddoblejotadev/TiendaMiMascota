// ========================================
// BLOG - CÓDIGO PARA PRINCIPIANTES
// ========================================

// Lista de artículos del blog (simulación de base de datos)
var articulos = [
  {
    id: 1,
    titulo: "Cuidados básicos para cachorros",
    resumen: "Todo lo que necesitas saber para cuidar a tu nuevo cachorro de la mejor manera.",
    contenido: "Los cachorros necesitan cuidados especiales durante sus primeros meses de vida. Es importante establecer una rutina de alimentación con comida específica para cachorros, proporcionarles un lugar cómodo para dormir, y comenzar con el entrenamiento básico desde temprana edad. También es fundamental mantener al día las vacunas y desparasitaciones según las indicaciones del veterinario.",
    autor: "Dr. María González",
    fecha: "2024-01-15",
    imagen: "../../assets/img/Comida.jpg",
    categoria: "Cuidados"
  },
  {
    id: 2,
    titulo: "Los mejores juguetes para perros",
    resumen: "Descubre qué tipos de juguetes son más seguros y divertidos para tu mascota.",
    contenido: "Los juguetes son fundamentales para el bienestar mental y físico de los perros. Los juguetes de cuerda ayudan con la higiene dental, las pelotas son perfectas para ejercitarse, y los juguetes de inteligencia estimulan su mente. Es importante elegir juguetes del tamaño adecuado para evitar riesgos de asfixia y revisarlos regularmente para verificar que estén en buen estado.",
    autor: "Ana Rodríguez",
    fecha: "2024-01-20",
    imagen: "../../assets/img/jugetes.png",
    categoria: "Entretenimiento"
  },
  {
    id: 3,
    titulo: "Consejos de higiene para mascotas",
    resumen: "Mantén a tu mascota limpia y saludable con estos consejos de higiene básica.",
    contenido: "La higiene regular es esencial para la salud de las mascotas. El baño debe realizarse según las necesidades de cada animal, usando productos específicos para mascotas. El cepillado diario ayuda a prevenir enredos y reduce la caída de pelo. No olvides la limpieza de oídos, el cuidado dental y el corte regular de uñas.",
    autor: "Carlos López",
    fecha: "2024-01-25",
    imagen: "../../assets/img/higiene.png",
    categoria: "Higiene"
  }
];

// FUNCIÓN 1: Mostrar lista de artículos
function mostrarArticulos() {
  var contenedor = document.getElementById('listaArticulos');
  if (!contenedor) return;
  
  var html = '';
  
  for (var i = 0; i < articulos.length; i++) {
    var articulo = articulos[i];
    html += '<article class="col-md-6 col-lg-4 mb-4">';
    html += '  <div class="card h-100">';
    html += '    <img src="' + articulo.imagen + '" class="card-img-top" style="height: 200px; object-fit: cover;" alt="' + articulo.titulo + '">';
    html += '    <div class="card-body d-flex flex-column">';
    html += '      <span class="badge bg-secondary mb-2 align-self-start">' + articulo.categoria + '</span>';
    html += '      <h5 class="card-title">' + articulo.titulo + '</h5>';
    html += '      <p class="card-text text-muted">' + articulo.resumen + '</p>';
    html += '      <div class="mt-auto">';
    html += '        <small class="text-muted">Por ' + articulo.autor + ' • ' + formatearFecha(articulo.fecha) + '</small>';
    html += '        <br><button class="btn btn-primary mt-2" onclick="leerArticulo(' + articulo.id + ')">Leer más</button>';
    html += '      </div>';
    html += '    </div>';
    html += '  </div>';
    html += '</article>';
  }
  
  contenedor.innerHTML = html;
}

// FUNCIÓN 2: Formatear fecha de manera simple
function formatearFecha(fecha) {
  var meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
               'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  
  var partes = fecha.split('-');
  var year = partes[0];
  var mes = parseInt(partes[1]) - 1;
  var dia = partes[2];
  
  return dia + ' de ' + meses[mes] + ' de ' + year;
}

// FUNCIÓN 3: Leer artículo completo
function leerArticulo(id) {
  // Buscar el artículo por ID
  var articulo = null;
  for (var i = 0; i < articulos.length; i++) {
    if (articulos[i].id === id) {
      articulo = articulos[i];
      break;
    }
  }
  
  if (!articulo) {
    alert('Artículo no encontrado');
    return;
  }
  
  // Mostrar el artículo completo en un modal
  mostrarModalArticulo(articulo);
}

// FUNCIÓN 4: Mostrar modal con artículo completo
function mostrarModalArticulo(articulo) {
  var modalHTML = '';
  modalHTML += '<div class="modal fade" id="modalArticulo" tabindex="-1">';
  modalHTML += '  <div class="modal-dialog modal-lg">';
  modalHTML += '    <div class="modal-content">';
  modalHTML += '      <div class="modal-header">';
  modalHTML += '        <h5 class="modal-title">' + articulo.titulo + '</h5>';
  modalHTML += '        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>';
  modalHTML += '      </div>';
  modalHTML += '      <div class="modal-body">';
  modalHTML += '        <img src="' + articulo.imagen + '" class="img-fluid rounded mb-3" alt="' + articulo.titulo + '">';
  modalHTML += '        <div class="mb-3">';
  modalHTML += '          <span class="badge bg-secondary me-2">' + articulo.categoria + '</span>';
  modalHTML += '          <small class="text-muted">Por ' + articulo.autor + ' • ' + formatearFecha(articulo.fecha) + '</small>';
  modalHTML += '        </div>';
  modalHTML += '        <p class="lead">' + articulo.resumen + '</p>';
  modalHTML += '        <div style="text-align: justify;">' + articulo.contenido + '</div>';
  modalHTML += '      </div>';
  modalHTML += '      <div class="modal-footer">';
  modalHTML += '        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>';
  modalHTML += '      </div>';
  modalHTML += '    </div>';
  modalHTML += '  </div>';
  modalHTML += '</div>';
  
  // Eliminar modal anterior si existe
  var modalExistente = document.getElementById('modalArticulo');
  if (modalExistente) {
    modalExistente.remove();
  }
  
  // Agregar modal al body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Mostrar modal
  var modal = new bootstrap.Modal(document.getElementById('modalArticulo'));
  modal.show();
}

// FUNCIÓN 5: Filtrar artículos por categoría
function filtrarPorCategoria(categoria) {
  var contenedor = document.getElementById('listaArticulos');
  if (!contenedor) return;
  
  var articulosFiltrados;
  
  if (categoria === 'todos') {
    articulosFiltrados = articulos;
  } else {
    articulosFiltrados = [];
    for (var i = 0; i < articulos.length; i++) {
      if (articulos[i].categoria.toLowerCase() === categoria.toLowerCase()) {
        articulosFiltrados.push(articulos[i]);
      }
    }
  }
  
  var html = '';
  
  if (articulosFiltrados.length === 0) {
    html = '<div class="col-12"><p class="text-center text-muted">No hay artículos en esta categoría.</p></div>';
  } else {
    for (var i = 0; i < articulosFiltrados.length; i++) {
      var articulo = articulosFiltrados[i];
      html += '<article class="col-md-6 col-lg-4 mb-4">';
      html += '  <div class="card h-100">';
      html += '    <img src="' + articulo.imagen + '" class="card-img-top" style="height: 200px; object-fit: cover;" alt="' + articulo.titulo + '">';
      html += '    <div class="card-body d-flex flex-column">';
      html += '      <span class="badge bg-secondary mb-2 align-self-start">' + articulo.categoria + '</span>';
      html += '      <h5 class="card-title">' + articulo.titulo + '</h5>';
      html += '      <p class="card-text text-muted">' + articulo.resumen + '</p>';
      html += '      <div class="mt-auto">';
      html += '        <small class="text-muted">Por ' + articulo.autor + ' • ' + formatearFecha(articulo.fecha) + '</small>';
      html += '        <br><button class="btn btn-primary mt-2" onclick="leerArticulo(' + articulo.id + ')">Leer más</button>';
      html += '      </div>';
      html += '    </div>';
      html += '  </div>';
      html += '</article>';
    }
  }
  
  contenedor.innerHTML = html;
}

// FUNCIÓN 6: Buscar artículos
function buscarArticulos() {
  var termino = document.getElementById('buscadorBlog').value.toLowerCase().trim();
  
  if (termino === '') {
    mostrarArticulos();
    return;
  }
  
  var articulosEncontrados = [];
  
  for (var i = 0; i < articulos.length; i++) {
    var articulo = articulos[i];
    var buscarEn = (articulo.titulo + ' ' + articulo.resumen + ' ' + articulo.contenido + ' ' + articulo.categoria).toLowerCase();
    
    if (buscarEn.indexOf(termino) !== -1) {
      articulosEncontrados.push(articulo);
    }
  }
  
  var contenedor = document.getElementById('listaArticulos');
  if (!contenedor) return;
  
  var html = '';
  
  if (articulosEncontrados.length === 0) {
    html = '<div class="col-12"><p class="text-center text-muted">No se encontraron artículos que coincidan con "' + termino + '".</p></div>';
  } else {
    for (var i = 0; i < articulosEncontrados.length; i++) {
      var articulo = articulosEncontrados[i];
      html += '<article class="col-md-6 col-lg-4 mb-4">';
      html += '  <div class="card h-100">';
      html += '    <img src="' + articulo.imagen + '" class="card-img-top" style="height: 200px; object-fit: cover;" alt="' + articulo.titulo + '">';
      html += '    <div class="card-body d-flex flex-column">';
      html += '      <span class="badge bg-secondary mb-2 align-self-start">' + articulo.categoria + '</span>';
      html += '      <h5 class="card-title">' + articulo.titulo + '</h5>';
      html += '      <p class="card-text text-muted">' + articulo.resumen + '</p>';
      html += '      <div class="mt-auto">';
      html += '        <small class="text-muted">Por ' + articulo.autor + ' • ' + formatearFecha(articulo.fecha) + '</small>';
      html += '        <br><button class="btn btn-primary mt-2" onclick="leerArticulo(' + articulo.id + ')">Leer más</button>';
      html += '      </div>';
      html += '    </div>';
      html += '  </div>';
      html += '</article>';
    }
  }
  
  contenedor.innerHTML = html;
}

// FUNCIÓN 7: Inicializar blog
function inicializarBlog() {
  mostrarArticulos();
  
  // Event listener para el buscador
  var buscador = document.getElementById('buscadorBlog');
  if (buscador) {
    buscador.addEventListener('input', buscarArticulos);
  }
  
  // Event listeners para filtros de categoría
  var filtros = document.querySelectorAll('[data-categoria]');
  for (var i = 0; i < filtros.length; i++) {
    filtros[i].addEventListener('click', function() {
      var categoria = this.getAttribute('data-categoria');
      filtrarPorCategoria(categoria);
      
      // Actualizar estado activo de los botones
      var todosBotones = document.querySelectorAll('[data-categoria]');
      for (var j = 0; j < todosBotones.length; j++) {
        todosBotones[j].classList.remove('active');
      }
      this.classList.add('active');
    });
  }
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', inicializarBlog);
