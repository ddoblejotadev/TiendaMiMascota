// ==============================================
// BLOG - ARTÍCULOS SIMPLES PARA PRINCIPIANTES
// ==============================================

// Artículos del blog (simples y fáciles de entender)
var articulosBlog = [
  {
    id: 1,
    titulo: "Los mejores alimentos para perros adultos",
    descripcionCorta: "Descubre qué alimentos son ideales para mantener a tu perro saludable y lleno de energía.",
    descripcionLarga: "Los perros adultos necesitan una dieta balanceada que incluya proteínas de alta calidad, grasas saludables y carbohidratos complejos. Es importante elegir alimentos que contengan todos los nutrientes necesarios para mantener la salud de tu mascota.",
    imagen: "../../assets/img/Comida.jpg"
  },
  {
    id: 2,
    titulo: "Cómo elegir la cama perfecta para tu mascota",
    descripcionCorta: "Una buena cama es fundamental para el descanso de tu mascota.",
    descripcionLarga: "Te explicamos los diferentes tipos de camas disponibles y cómo elegir la más adecuada según el tamaño y las necesidades de tu perro o gato. Una cama cómoda ayuda a que tu mascota descanse mejor y se sienta segura.",
    imagen: "../../assets/img/cama2.png"
  }
];

// Función simple para mostrar artículos en la página principal del blog
function mostrarArticulosBlog() {
  var contenedor = document.getElementById('listaArticulos');

  if (contenedor) {
    contenedor.innerHTML = '';

    articulosBlog.forEach(function(articulo) {
      var div = document.createElement('div');
      div.className = 'col-md-6 mb-4';
      div.innerHTML = `
        <div class="card h-100">
          <img src="${articulo.imagen}" class="card-img-top" alt="${articulo.titulo}" style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">${articulo.titulo}</h5>
            <p class="card-text">${articulo.descripcionCorta}</p>
            <button class="btn btn-primary" onclick="verDetalleBlog(${articulo.id})">
              Ver más
            </button>
          </div>
        </div>
      `;
      contenedor.appendChild(div);
    });
  }
}

// Función simple para ver detalle de un artículo
function verDetalleBlog(id) {
  var articulo = articulosBlog.find(function(a) { return a.id === id; });

  if (articulo) {
    // Crear modal simple para mostrar el detalle
    var modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${articulo.titulo}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <img src="${articulo.imagen}" class="img-fluid mb-3" alt="${articulo.titulo}">
            <p>${articulo.descripcionLarga}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    var bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    // Limpiar modal después de cerrarlo
    modal.addEventListener('hidden.bs.modal', function() {
      document.body.removeChild(modal);
    });
  }
}

// Inicializar blog cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  mostrarArticulosBlog();
});
