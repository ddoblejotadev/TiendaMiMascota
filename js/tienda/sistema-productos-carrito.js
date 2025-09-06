// =============================================
// SISTEMA DE PRODUCTOS Y CARRITO - 8 FUNCIONES
// =============================================

// Lista básica de productos
var productos = [
  { id: 1, nombre: "Comida para Perros", precio: 5000, categoria: "comida", imagen: "assets/img/Comida.jpg" },
  { id: 2, nombre: "Pelota Divertida", precio: 3000, categoria: "juguetes", imagen: "assets/img/jugetes.png" },
  { id: 3, nombre: "Cama Cómoda", precio: 8000, categoria: "camas", imagen: "assets/img/cama2.png" },
  { id: 4, nombre: "Vitaminas", precio: 4000, categoria: "salud", imagen: "assets/img/salud.png" },
  { id: 5, nombre: "Collar Bonito", precio: 2000, categoria: "accesorios", imagen: "assets/img/accesorios.png" },
  { id: 6, nombre: "Champú", precio: 3500, categoria: "higiene", imagen: "assets/img/higiene.png" }
];

// Carrito simple
var carrito = [];

// FUNCIÓN 1: Mostrar productos en la página
function mostrarProductos() {
  var lista = document.getElementById('listaProductos');
  if (!lista) return;
  
  var html = '';
  for (var i = 0; i < productos.length; i++) {
    var p = productos[i];
    html += '<div class="col-md-4 mb-3">';
    html += '  <div class="card">';
    html += '    <img src="' + p.imagen + '" class="card-img-top" style="height:200px; cursor: pointer;" onclick="verDetalle(' + p.id + ')">';
    html += '    <div class="card-body">';
    html += '      <h5 class="card-title" style="cursor: pointer;" onclick="verDetalle(' + p.id + ')">' + p.nombre + '</h5>';
    html += '      <p class="card-text">$' + p.precio + '</p>';
    html += '      <div class="d-flex gap-2">';
    html += '        <button class="btn btn-primary" onclick="agregarAlCarrito(' + p.id + ')">Agregar</button>';
    html += '        <button class="btn btn-outline-info" onclick="verDetalle(' + p.id + ')">Ver Detalle</button>';
    html += '      </div>';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';
  }
  lista.innerHTML = html;
}

// FUNCIÓN 2: Agregar producto al carrito
function agregarAlCarrito(id) {
  var producto = null;
  for (var i = 0; i < productos.length; i++) {
    if (productos[i].id === id) {
      producto = productos[i];
      break;
    }
  }
  
  if (producto) {
    // Buscar si ya existe en el carrito
    var encontrado = false;
    for (var i = 0; i < carrito.length; i++) {
      if (carrito[i].id === id) {
        carrito[i].cantidad += 1;
        encontrado = true;
        break;
      }
    }
    
    // Si no existe, agregarlo con cantidad 1
    if (!encontrado) {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: 1
      });
    }
    
    // Notificación usando CSS del archivo styles.css
    var notificacion = document.createElement('div');
    notificacion.className = 'notificacion-carrito';
    notificacion.innerHTML = 
      '<div class="icono">🛒</div>' +
      '<div>Producto agregado: ' + producto.nombre + '</div>';
    
    document.body.appendChild(notificacion);
    
    // Quitar después de 1.5 segundos con animación (más rápido)
    setTimeout(function() {
      notificacion.style.animation = 'deslizarSalida 0.3s ease-in';
      setTimeout(function() {
        if (document.body.contains(notificacion)) {
          document.body.removeChild(notificacion);
        }
      }, 300);
    }, 1500);
    
    actualizarContador();
  }
}

// FUNCIÓN 3: Actualizar contador del carrito
function actualizarContador() {
  var contador = document.getElementById('cantidadCarrito');
  if (contador) {
    var total = 0;
    for (var i = 0; i < carrito.length; i++) {
      total += carrito[i].cantidad;
    }
    contador.textContent = total;
  }
}

// FUNCIÓN 4: Mostrar carrito en modal
function mostrarCarrito() {
  var lista = document.getElementById('contenidoCarrito');
  var total = document.getElementById('totalCarrito');
  
  if (!lista || !total) return;
  
  var html = '';
  var suma = 0;
  
  if (carrito.length === 0) {
    html = '<p class="text-center">El carrito está vacío</p>';
  } else {
    for (var i = 0; i < carrito.length; i++) {
      var item = carrito[i];
      var subtotal = item.precio * item.cantidad;
      html += '<div class="d-flex align-items-center mb-3 p-2 border rounded">';
      html += '  <img src="' + item.imagen + '" alt="' + item.nombre + '" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" class="me-3">';
      html += '  <div class="flex-grow-1">';
      html += '    <h6 class="mb-1">' + item.nombre + '</h6>';
      html += '    <small class="text-muted">Precio: $' + item.precio + '</small>';
      html += '  </div>';
      html += '  <div class="d-flex align-items-center me-3">';
      html += '    <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(' + item.id + ', -1)">-</button>';
      html += '    <span class="mx-2 fw-bold">' + item.cantidad + '</span>';
      html += '    <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(' + item.id + ', 1)">+</button>';
      html += '  </div>';
      html += '  <div class="text-end">';
      html += '    <strong>$' + subtotal + '</strong>';
      html += '    <br><button class="btn btn-sm btn-outline-danger" onclick="eliminarDelCarrito(' + item.id + ')">Eliminar</button>';
      html += '  </div>';
      html += '</div>';
      suma += subtotal;
    }
  }
  
  lista.innerHTML = html;
  total.textContent = suma;
}

// FUNCIÓN 5: Vaciar carrito
function vaciarCarrito() {
  // Confirmación moderna usando CSS del archivo styles.css
  mostrarConfirmacion('¿Vaciar el carrito?', 'Se eliminarán todos los productos', function() {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito)); // ¡GUARDAR EN LOCALSTORAGE!
    actualizarContador();
    mostrarCarrito();
    
    // Notificación moderna para carrito vaciado
    var notificacion = document.createElement('div');
    notificacion.className = 'notificacion-carrito';
    notificacion.style.background = '#dc3545'; // Color rojo para "vaciar"
    notificacion.innerHTML = 
      '<div class="icono">🗑️</div>' +
      '<div>Carrito vaciado correctamente</div>';
    
    document.body.appendChild(notificacion);
    
    // Quitar después de 1.5 segundos con animación (más rápido)
    setTimeout(function() {
      notificacion.style.animation = 'deslizarSalida 0.3s ease-in';
      setTimeout(function() {
        if (document.body.contains(notificacion)) {
          document.body.removeChild(notificacion);
        }
      }, 300);
    }, 1500);
  });
}

// FUNCIÓN 6: Cambiar cantidad de producto en carrito
function cambiarCantidad(id, cambio) {
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id === id) {
      carrito[i].cantidad += cambio;
      
      // Si la cantidad llega a 0, eliminar el producto
      if (carrito[i].cantidad <= 0) {
        carrito.splice(i, 1);
      }
      break;
    }
  }
  
  localStorage.setItem('carrito', JSON.stringify(carrito)); // ¡GUARDAR EN LOCALSTORAGE!
  actualizarContador();
  mostrarCarrito();
}

// FUNCIÓN 7: Eliminar producto específico del carrito
function eliminarDelCarrito(id) {
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id === id) {
      carrito.splice(i, 1);
      break;
    }
  }
  
  localStorage.setItem('carrito', JSON.stringify(carrito)); // ¡GUARDAR EN LOCALSTORAGE!
  actualizarContador();
  mostrarCarrito();
}

// FUNCIÓN 8: Filtrar productos por categoría
function filtrarProductos(categoria) {
  var lista = document.getElementById('listaProductos');
  if (!lista) return;
  
  var productosFiltrados = [];
  
  if (categoria === 'todos') {
    productosFiltrados = productos;
  } else {
    for (var i = 0; i < productos.length; i++) {
      if (productos[i].categoria === categoria) {
        productosFiltrados.push(productos[i]);
      }
    }
  }
  
  var html = '';
  for (var i = 0; i < productosFiltrados.length; i++) {
    var p = productosFiltrados[i];
    html += '<div class="col-md-4 mb-3">';
    html += '  <div class="card">';
    html += '    <img src="' + p.imagen + '" class="card-img-top" style="height:200px">';
    html += '    <div class="card-body">';
    html += '      <h5>' + p.nombre + '</h5>';
    html += '      <p>$' + p.precio + '</p>';
    html += '      <button class="btn btn-primary" onclick="agregarAlCarrito(' + p.id + ')">Agregar</button>';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';
  }
  lista.innerHTML = html;
}

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
  mostrarProductos();
  actualizarContador();
  
  // Event listener para botón del carrito
  var btnCarrito = document.getElementById('btnCarrito');
  if (btnCarrito) {
    btnCarrito.addEventListener('click', function() {
      mostrarCarrito(); // Actualizar contenido antes de abrir
      
      // Abrir el modal de Bootstrap
      var modal = new bootstrap.Modal(document.getElementById('modalCarrito'));
      modal.show();
    });
  }
  
  // Event listeners para botones del carrito
  var btnVaciar = document.getElementById('btnVaciarCarrito');
  if (btnVaciar) {
    btnVaciar.addEventListener('click', vaciarCarrito);
  }
  
  // Cuando se abre el modal, mostrar el carrito
  var modalCarrito = document.getElementById('modalCarrito');
  if (modalCarrito) {
    modalCarrito.addEventListener('show.bs.modal', mostrarCarrito);
  }
});

// FUNCIÓN ADICIONAL: Ir a página de detalle
function verDetalle(id) {
  // Detectar desde qué página se está llamando
  var rutaActual = window.location.pathname;
  var rutaDetalle;
  
  if (rutaActual.includes('index.html') || rutaActual.endsWith('/')) {
    // Desde la página principal
    rutaDetalle = 'pages/content/detalle-producto.html?id=' + id;
  } else if (rutaActual.includes('pages/content/')) {
    // Desde una página dentro de content
    rutaDetalle = 'detalle-producto.html?id=' + id;
  } else {
    // Por defecto, asumir ruta relativa
    rutaDetalle = 'detalle-producto.html?id=' + id;
  }
  
  window.location.href = rutaDetalle;
}
