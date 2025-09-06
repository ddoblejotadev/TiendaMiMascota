// ========================================
// DETALLE DE PRODUCTO - CÓDIGO PARA PRINCIPIANTES
// ========================================

// Variable para guardar el producto actual
var productoActual = null;

// Lista de productos (igual que en sistema-productos-carrito.js)
var productos = [
  { id: 1, nombre: "Comida para Perros", precio: 5000, categoria: "comida", imagen: "../../assets/img/Comida.jpg", descripcion: "Alimento nutritivo y balanceado para perros de todas las edades. Rico en proteínas y vitaminas." },
  { id: 2, nombre: "Pelota Divertida", precio: 3000, categoria: "juguetes", imagen: "../../assets/img/jugetes.png", descripcion: "Pelota resistente y colorida para que tu mascota se divierta. Material no tóxico." },
  { id: 3, nombre: "Cama Cómoda", precio: 8000, categoria: "camas", imagen: "../../assets/img/cama2.png", descripcion: "Cama suave y cómoda para el descanso de tu mascota. Fácil de lavar." },
  { id: 4, nombre: "Vitaminas", precio: 4000, categoria: "salud", imagen: "../../assets/img/salud.png", descripcion: "Suplemento vitamínico para mantener a tu mascota saludable y llena de energía." },
  { id: 5, nombre: "Collar Bonito", precio: 2000, categoria: "accesorios", imagen: "../../assets/img/accesorios.png", descripcion: "Collar ajustable y resistente. Disponible en varios colores." },
  { id: 6, nombre: "Champú", precio: 3500, categoria: "higiene", imagen: "../../assets/img/higiene.png", descripcion: "Champú especial para mascotas. Deja el pelaje suave y brillante." }
];

// FUNCIÓN 1: Obtener ID del producto desde la URL
function obtenerIdProducto() {
  // Obtener parámetros de la URL (método simple para principiantes)
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  return id ? parseInt(id) : 1; // Si no hay ID, mostrar producto 1
}

// FUNCIÓN 2: Buscar producto por ID
function buscarProducto(id) {
  for (var i = 0; i < productos.length; i++) {
    if (productos[i].id === id) {
      return productos[i];
    }
  }
  return productos[0]; // Si no encuentra, devolver el primero
}

// FUNCIÓN 3: Mostrar información del producto
function mostrarDetalleProducto() {
  var id = obtenerIdProducto();
  productoActual = buscarProducto(id);
  
  // Actualizar elementos HTML con la información del producto
  document.getElementById('nombreProducto').textContent = productoActual.nombre;
  document.getElementById('precioProducto').textContent = productoActual.precio;
  document.getElementById('imagenProducto').src = productoActual.imagen;
  document.getElementById('imagenProducto').alt = productoActual.nombre;
  document.getElementById('descripcionProducto').textContent = productoActual.descripcion;
  
  // Actualizar título de la página
  document.title = productoActual.nombre + ' - Tienda MiMascota';
}

// FUNCIÓN 4: Agregar al carrito desde detalle
function agregarAlCarritoDetalle() {
  if (!productoActual) return;
  
  var cantidad = parseInt(document.getElementById('cantidadCompra').value);
  
  // Validar cantidad
  if (cantidad < 1) {
    alert('La cantidad debe ser mayor a 0');
    return;
  }
  
  // Obtener carrito actual
  var carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  
  // Buscar si ya existe en el carrito
  var encontrado = false;
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id === productoActual.id) {
      carrito[i].cantidad += cantidad;
      encontrado = true;
      break;
    }
  }
  
  // Si no existe, agregarlo
  if (!encontrado) {
    carrito.push({
      id: productoActual.id,
      nombre: productoActual.nombre,
      precio: productoActual.precio,
      imagen: productoActual.imagen,
      cantidad: cantidad
    });
  }
  
  // Guardar en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));
  
  // Mostrar mensaje
  alert('✅ ' + cantidad + ' unidad(es) de ' + productoActual.nombre + ' agregada(s) al carrito');
  
  // Actualizar contador del carrito
  actualizarContadorCarrito();
}

// FUNCIÓN 5: Actualizar contador del carrito
function actualizarContadorCarrito() {
  var carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  var total = 0;
  
  for (var i = 0; i < carrito.length; i++) {
    total += carrito[i].cantidad;
  }
  
  var contador = document.getElementById('cantidadCarrito');
  if (contador) {
    contador.textContent = total;
  }
}

// FUNCIÓN 6: Agregar comentario
function agregarComentario() {
  var nombre = document.getElementById('nombreComentario').value.trim();
  var texto = document.getElementById('textoComentario').value.trim();
  
  // Validaciones simples
  if (nombre === '') {
    alert('Por favor ingresa tu nombre');
    return;
  }
  
  if (texto === '') {
    alert('Por favor escribe un comentario');
    return;
  }
  
  if (nombre.length > 100) {
    alert('El nombre no puede tener más de 100 caracteres');
    return;
  }
  
  if (texto.length > 500) {
    alert('El comentario no puede tener más de 500 caracteres');
    return;
  }
  
  // Obtener comentarios existentes
  var comentarios = JSON.parse(localStorage.getItem('comentarios_' + productoActual.id) || '[]');
  
  // Crear nuevo comentario
  var nuevoComentario = {
    id: comentarios.length + 1,
    nombre: nombre,
    texto: texto,
    fecha: new Date().toLocaleDateString()
  };
  
  // Agregar al array
  comentarios.push(nuevoComentario);
  
  // Guardar en localStorage
  localStorage.setItem('comentarios_' + productoActual.id, JSON.stringify(comentarios));
  
  // Limpiar formulario
  document.getElementById('nombreComentario').value = '';
  document.getElementById('textoComentario').value = '';
  
  // Mostrar mensaje
  alert('✅ Comentario publicado exitosamente');
  
  // Actualizar lista de comentarios
  mostrarComentarios();
}

// FUNCIÓN 7: Mostrar comentarios
function mostrarComentarios() {
  var comentarios = JSON.parse(localStorage.getItem('comentarios_' + productoActual.id) || '[]');
  var lista = document.getElementById('listaComentarios');
  
  if (comentarios.length === 0) {
    lista.innerHTML = '<p class="text-muted">No hay comentarios aún. ¡Sé el primero en comentar!</p>';
    return;
  }
  
  var html = '';
  
  // Mostrar comentarios más recientes primero
  for (var i = comentarios.length - 1; i >= 0; i--) {
    var c = comentarios[i];
    html += '<div class="card mb-3">';
    html += '  <div class="card-body">';
    html += '    <div class="d-flex justify-content-between">';
    html += '      <h6 class="card-title">' + c.nombre + '</h6>';
    html += '      <small class="text-muted">' + c.fecha + '</small>';
    html += '    </div>';
    html += '    <p class="card-text">' + c.texto + '</p>';
    html += '  </div>';
    html += '</div>';
  }
  
  lista.innerHTML = html;
}

// FUNCIÓN 8: Inicializar página
function inicializarDetalle() {
  mostrarDetalleProducto();
  mostrarComentarios();
  actualizarContadorCarrito();
  
  // Event listener para el botón del carrito
  var btnCarrito = document.getElementById('btnCarrito');
  if (btnCarrito) {
    btnCarrito.addEventListener('click', function() {
      // Aquí puedes agregar la funcionalidad del modal del carrito
      alert('Funcionalidad del carrito en desarrollo');
    });
  }
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', inicializarDetalle);
