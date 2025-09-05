// Sistema simple de productos para principiantes
// Tienda MiMascota

// Lista de productos (como una base de datos simple)
var productos = [
  {
    id: 1,
    nombre: "Alimento Premium para Perros",
    precio: 15990,
    categoria: "comida",
    imagen: "assets/img/Comida.jpg",
    descripcion: "Alimento balanceado para perros"
  },
  {
    id: 2,
    nombre: "Juguetes Divertidos",
    precio: 5990,
    categoria: "juguetes",
    imagen: "assets/img/jugetes.png",
    descripcion: "Pelotas y juguetes para mascotas"
  },
  {
    id: 3,
    nombre: "Cama Super Cómoda",
    precio: 25990,
    categoria: "camas",
    imagen: "assets/img/cama2.png",
    descripcion: "Cama cómoda con relleno"
  },
  {
    id: 4,
    nombre: "Productos de Salud",
    precio: 12990,
    categoria: "salud",
    imagen: "assets/img/salud.png",
    descripcion: "Vitaminas para mascotas"
  },
  {
    id: 5,
    nombre: "Accesorios Fashion",
    precio: 8990,
    categoria: "accesorios",
    imagen: "assets/img/accesorios.png",
    descripcion: "Collares y accesorios"
  },
  {
    id: 6,
    nombre: "Productos de Higiene",
    precio: 7990,
    categoria: "higiene",
    imagen: "assets/img/higiene.png",
    descripcion: "Champús y productos de limpieza"
  }
];

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
  
  // Avisar al usuario
  alert('Agregado: ' + producto.nombre);
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
    alert('Carrito vaciado');
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
    btnCarrito.addEventListener('click', mostrarCarrito);
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
