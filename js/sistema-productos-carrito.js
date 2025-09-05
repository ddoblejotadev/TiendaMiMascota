// ========================================
// TIENDA SUPER SIMPLE - SOLO 6 FUNCIONES
// ========================================

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
    carrito.push(producto);
    
    // Notificación usando CSS del archivo styles.css
    var notificacion = document.createElement('div');
    notificacion.className = 'notificacion-carrito';
    notificacion.innerHTML = 
      '<div class="icono">🛒</div>' +
      '<div>Producto agregado: ' + producto.nombre + '</div>';
    
    document.body.appendChild(notificacion);
    
    // Quitar después de 3 segundos con animación
    setTimeout(function() {
      notificacion.style.animation = 'deslizarSalida 0.4s ease-in';
      setTimeout(function() {
        if (document.body.contains(notificacion)) {
          document.body.removeChild(notificacion);
        }
      }, 400);
    }, 3000);
    
    actualizarContador();
  }
}

// FUNCIÓN 3: Actualizar contador del carrito
function actualizarContador() {
  var contador = document.getElementById('cantidadCarrito');
  if (contador) {
    contador.textContent = carrito.length;
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
    html = '<p>El carrito está vacío</p>';
  } else {
    for (var i = 0; i < carrito.length; i++) {
      var item = carrito[i];
      html += '<div class="d-flex justify-content-between">';
      html += '  <span>' + item.nombre + '</span>';
      html += '  <span>$' + item.precio + '</span>';
      html += '</div>';
      suma += item.precio;
    }
  }
  
  lista.innerHTML = html;
  total.textContent = suma;
}

// FUNCIÓN 5: Vaciar carrito
function vaciarCarrito() {
  carrito = [];
  actualizarContador();
  mostrarCarrito();
}

// FUNCIÓN 6: Filtrar productos por categoría
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

// Variable para el carrito (empieza vacío)
var carrito = [];

// Función simple para mostrar productos en la página
function mostrarProductos() {
  // Buscar dónde mostrar los productos
  var contenedor = document.getElementById('listaProductos');
  
  // Si no encuentra el contenedor, salir
  if (!contenedor) {
    return;
  }
  
  // Crear el HTML para cada producto
  var html = '';
  
  for (var i = 0; i < productos.length; i++) {
    var producto = productos[i];
    
    html += '<div class="col-md-4 mb-3">';
    html += '  <div class="card">';
    html += '    <img src="' + producto.imagen + '" class="card-img-top" style="height: 200px; object-fit: cover;">';
    html += '    <div class="card-body">';
    html += '      <h5 class="card-title">' + producto.nombre + '</h5>';
    html += '      <p class="card-text">' + producto.descripcion + '</p>';
    html += '      <p class="text-primary h5">$' + producto.precio.toLocaleString() + '</p>';
    html += '      <button class="btn btn-primary" onclick="agregarAlCarrito(' + producto.id + ')">Agregar al Carrito</button>';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';
  }
  
  // Poner el HTML en la página
  contenedor.innerHTML = html;
}

// Función simple para agregar productos al carrito
function agregarAlCarrito(idProducto) {
  // Buscar el producto por ID
  var producto = null;
  for (var i = 0; i < productos.length; i++) {
    if (productos[i].id === idProducto) {
      producto = productos[i];
      break;
    }
  }
  
  // Si no encontró el producto, salir
  if (!producto) {
    return;
  }
  
  // Verificar si ya está en el carrito
  var encontrado = false;
  for (var i = 0; i < carrito.length; i++) {
    if (carrito[i].id === idProducto) {
      carrito[i].cantidad = carrito[i].cantidad + 1;
      encontrado = true;
      break;
    }
  }
  
  // Si no está en el carrito, agregarlo
  if (!encontrado) {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
  }
  
  // Guardar en el navegador
  localStorage.setItem('carrito', JSON.stringify(carrito));
  
  // Actualizar contador
  actualizarContador();
  
  // Notificación moderna usando CSS del archivo styles.css
  var notificacion = document.createElement('div');
  notificacion.className = 'notificacion-carrito';
  notificacion.innerHTML = 
    '<div class="icono">🛒</div>' +
    '<div>Producto agregado: ' + producto.nombre + '</div>';
  
  document.body.appendChild(notificacion);
  
  // Quitar después de 3 segundos con animación
  setTimeout(function() {
    notificacion.style.animation = 'deslizarSalida 0.4s ease-in';
    setTimeout(function() {
      if (document.body.contains(notificacion)) {
        document.body.removeChild(notificacion);
      }
    }, 400);
  }, 3000);
}

// Función para actualizar el contador del carrito
function actualizarContador() {
  var contador = document.getElementById('cantidadCarrito');
  
  if (contador) {
    var total = 0;
    for (var i = 0; i < carrito.length; i++) {
      total = total + carrito[i].cantidad;
    }
    contador.textContent = total;
  }
}

// Función para mostrar el carrito
function mostrarCarrito() {
  var contenedor = document.getElementById('contenidoCarrito');
  
  if (!contenedor) {
    return;
  }
  
  if (carrito.length === 0) {
    contenedor.innerHTML = '<p>El carrito está vacío</p>';
    return;
  }
  
  var html = '';
  var total = 0;
  
  for (var i = 0; i < carrito.length; i++) {
    var item = carrito[i];
    var subtotal = item.precio * item.cantidad;
    total = total + subtotal;
    
    html += '<div class="d-flex justify-content-between mb-2">';
    html += '  <span>' + item.nombre + ' (x' + item.cantidad + ')</span>';
    html += '  <span>$' + subtotal.toLocaleString() + '</span>';
    html += '</div>';
  }
  
  html += '<hr>';
  html += '<div class="d-flex justify-content-between"><strong>Total: $' + total.toLocaleString() + '</strong></div>';
  
  contenedor.innerHTML = html;
  
  // Actualizar total en otro lugar si existe
  var totalElement = document.getElementById('totalCarrito');
  if (totalElement) {
    totalElement.textContent = total.toLocaleString();
  }
}

// Función para vaciar el carrito
function vaciarCarrito() {
  if (confirm('¿Vaciar el carrito?')) {
    carrito = [];
    localStorage.removeItem('carrito');
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
    
    setTimeout(function() {
      notificacion.style.animation = 'deslizarSalida 0.4s ease-in';
      setTimeout(function() {
        if (document.body.contains(notificacion)) {
          document.body.removeChild(notificacion);
        }
      }, 400);
    }, 3000);
  }
}

// Cuando la página cargue, ejecutar esto
document.addEventListener('DOMContentLoaded', function() {
  console.log('Cargando productos...');
  
  // Cargar carrito guardado
  var carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
  
  // Mostrar productos
  mostrarProductos();
  
  // Actualizar contador
  actualizarContador();
  
  // Configurar botón del carrito
  var btnCarrito = document.getElementById('btnCarrito');
  if (btnCarrito) {
    btnCarrito.addEventListener('click', function() {
      mostrarCarrito(); // Actualizar contenido del carrito
      
      // Abrir el modal de Bootstrap
      var modal = new bootstrap.Modal(document.getElementById('modalCarrito'));
      modal.show();
    });
  }
  
  // Configurar botón vaciar
  var btnVaciar = document.getElementById('btnVaciarCarrito');
  if (btnVaciar) {
    btnVaciar.addEventListener('click', vaciarCarrito);
  }
  
  // Configurar filtros
  var filtroCategoria = document.getElementById('filtroCategoria');
  if (filtroCategoria) {
    filtroCategoria.addEventListener('change', filtrarProductos);
  }
  
  var buscarProducto = document.getElementById('buscarProducto');
  if (buscarProducto) {
    buscarProducto.addEventListener('input', filtrarProductos);
  }
  
  console.log('Sistema de productos listo');
});

// Función simple para filtrar productos
function filtrarProductos() {
  var categoria = document.getElementById('filtroCategoria').value;
  var busqueda = document.getElementById('buscarProducto').value.toLowerCase();
  var contenedor = document.getElementById('listaProductos');
  
  if (!contenedor) {
    return;
  }
  
  var html = '';
  
  for (var i = 0; i < productos.length; i++) {
    var producto = productos[i];
    
    // Verificar si pasa el filtro de categoría
    if (categoria && producto.categoria !== categoria) {
      continue; // Saltar este producto
    }
    
    // Verificar si pasa el filtro de búsqueda
    if (busqueda) {
      var nombre = producto.nombre.toLowerCase();
      var descripcion = producto.descripcion.toLowerCase();
      if (nombre.indexOf(busqueda) === -1 && descripcion.indexOf(busqueda) === -1) {
        continue; // Saltar este producto
      }
    }
    
    // Si llegó aquí, mostrar el producto
    html += '<div class="col-md-4 mb-3">';
    html += '  <div class="card">';
    html += '    <img src="' + producto.imagen + '" class="card-img-top" style="height: 200px; object-fit: cover;">';
    html += '    <div class="card-body">';
    html += '      <h5 class="card-title">' + producto.nombre + '</h5>';
    html += '      <p class="card-text">' + producto.descripcion + '</p>';
    html += '      <p class="text-primary h5">$' + producto.precio.toLocaleString() + '</p>';
    html += '      <button class="btn btn-primary" onclick="agregarAlCarrito(' + producto.id + ')">Agregar al Carrito</button>';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';
  }
  
  // Si no hay productos después del filtro
  if (html === '') {
    html = '<div class="col-12"><p class="text-center">No se encontraron productos</p></div>';
  }
  
  contenedor.innerHTML = html;
}
