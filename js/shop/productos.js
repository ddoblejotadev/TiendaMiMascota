// ==============================================
// GESTIÓN DE PRODUCTOS - PRINCIPIANTE
// ==============================================

// Función para obtener productos del localStorage
function obtenerProductos() {
  var almacen = localStorage.getItem('productos');
  var productosIniciales = cargarProductosCompletos();

  if (almacen) {
    try {
      var lista = JSON.parse(almacen);
      // Si la lista guardada es menor que la lista completa, reescribimos
      if (!Array.isArray(lista) || lista.length < productosIniciales.length) {
        guardarProductos(productosIniciales);
        return productosIniciales;
      }
      return lista;
    } catch (e) {
      // En caso de error de parseo, inicializamos con la lista completa
      guardarProductos(productosIniciales);
      return productosIniciales;
    }
  } else {
    guardarProductos(productosIniciales);
    return productosIniciales;
  }
}

// Devuelve el conjunto completo de productos (no depende de localStorage)
function cargarProductosCompletos() {
  return [
    { id: 1, codigo: 'COM001', nombre: 'Comida para Perros Premium', descripcion: 'Alimento balanceado para perros adultos', precio: 15000, stock: 50, stockCritico: 10, categoria: 'Comida', imagen: 'assets/img/Comida.jpg' },
    { id: 2, codigo: 'CAM001', nombre: 'Cama para Mascotas', descripcion: 'Cama cómoda y resistente para mascotas', precio: 25000, stock: 20, stockCritico: 5, categoria: 'Accesorios', imagen: 'assets/img/cama2.png' },
    { id: 3, codigo: 'JUG001', nombre: 'Juguetes Variados', descripcion: 'Set de juguetes para entretenimiento', precio: 8000, stock: 30, stockCritico: 8, categoria: 'Juguetes', imagen: 'assets/img/jugetes.png' },
    { id: 4, codigo: 'HIG001', nombre: 'Productos de Higiene', descripcion: 'Kit completo de higiene para mascotas', precio: 12000, stock: 15, stockCritico: 3, categoria: 'Higiene', imagen: 'assets/img/higiene.png' },
    { id: 5, codigo: 'ACC001', nombre: 'Accesorios para Mascotas', descripcion: 'Variedad de accesorios útiles para el día a día con tu mascota', precio: 18000, stock: 25, stockCritico: 5, categoria: 'Accesorios', imagen: 'assets/img/accesorios.png' },
    { id: 6, codigo: 'SAL001', nombre: 'Productos de Salud', descripcion: 'Vitaminas y suplementos para mantener la salud de tu mascota', precio: 22000, stock: 18, stockCritico: 4, categoria: 'Salud', imagen: 'assets/img/salud.png' },
    { id: 7, codigo: 'PROD001', nombre: 'Producto Especial', descripcion: 'Producto premium para el cuidado especial de mascotas', precio: 35000, stock: 10, stockCritico: 2, categoria: 'Premium', imagen: 'assets/img/prod.png' }
  ];
}

// Normaliza la ruta de la imagen según la ubicación de la página actual
function rutaImagenNormalizada(rutaRelativa) {
  if (!rutaRelativa) return '';
  var ruta = rutaRelativa.replace(/\\\\/g, '/');
  var pathname = location.pathname.replace(/\\\\/g, '/');
  // Si estamos dentro de /pages/ necesitamos subir dos niveles
  if (pathname.indexOf('/pages/') !== -1) {
    return '../../' + ruta;
  }
  return ruta;
}

// Función para guardar productos en localStorage
function guardarProductos(productos) {
  localStorage.setItem('productos', JSON.stringify(productos));
}

// Función para mostrar productos en la página principal
function mostrarProductos() {
  var productos = obtenerProductos();
  var contenedor = document.getElementById('productos-container');
  
  if (contenedor) {
    contenedor.innerHTML = '';
    
    productos.forEach(function(producto) {
      var div = document.createElement('div');
      div.className = 'col-md-4 mb-4';
      div.innerHTML = `
        <div class="card h-100">
          <img src="${rutaImagenNormalizada(producto.imagen)}" class="card-img-top" alt="${producto.nombre}" style="height: 200px; object-fit: cover;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text flex-grow-1">${producto.descripcion || ''}</p>
            <p class="card-text"><strong>$${producto.precio.toLocaleString()}</strong></p>
            <div class="mt-auto">
              <button class="btn btn-primary me-2" onclick="agregarAlCarrito(${producto.id})">
                Agregar al Carrito
              </button>
              <button class="btn btn-outline-info btn-sm" onclick="verDetalle(${producto.id})">
                Ver Detalle
              </button>
            </div>
          </div>
        </div>
      `;
      contenedor.appendChild(div);
    });
  }
}

// Función para ver detalle del producto
function verDetalle(id) {
  // Ir a la página de detalle existente en pages/content
  window.location.href = 'pages/content/detalle-producto.html?id=' + id;
}

// Función para agregar producto al carrito desde detalle
function agregarAlCarritoDetalle() {
  var params = new URLSearchParams(window.location.search);
  var idProducto = parseInt(params.get('id'));
  var cantidad = parseInt(document.getElementById('cantidadCompra').value) || 1;
  
  if (!idProducto || isNaN(idProducto)) {
    mostrarNotificacion('Producto no encontrado', 'error');
    return;
  }
  
  if (typeof agregarAlCarrito !== 'function') {
    mostrarNotificacion('Error: función no disponible', 'error');
    return;
  }
  
  if (typeof obtenerProductos !== 'function') {
    mostrarNotificacion('Error: función productos no disponible', 'error');
    return;
  }
  
  try {
    // Agregar al carrito con la cantidad especificada
    for (var i = 0; i < cantidad; i++) {
      agregarAlCarrito(idProducto);
    }
    
    mostrarNotificacion('Producto agregado al carrito', 'success');
    
    // Actualizar contador del carrito
    setTimeout(function() {
      if (typeof actualizarContadorCarrito === 'function') {
        actualizarContadorCarrito();
      }
    }, 100);
  } catch (error) {
    mostrarNotificacion('Error al agregar producto: ' + error.message, 'error');
  }
}

// Función para mostrar detalle específico del producto
function mostrarDetalleProducto() {
  var params = new URLSearchParams(window.location.search);
  var id = parseInt(params.get('id'));
  
  if (!id) {
    mostrarNotificacion('Producto no encontrado', 'error');
    window.location.href = 'index.html';
    return;
  }
  
  var productos = obtenerProductos();
  var producto = productos.find(function(p) { return p.id === id; });
  
  if (!producto) {
    mostrarNotificacion('Producto no encontrado', 'error');
    window.location.href = 'index.html';
    return;
  }
  
  // Mostrar información del producto
  document.getElementById('nombreProducto').textContent = producto.nombre;
  // Normalizar ruta según ubicación
  document.getElementById('imagenProducto').src = rutaImagenNormalizada(producto.imagen);
  document.getElementById('imagenProducto').alt = producto.nombre;
  
  // Mostrar descripción detallada (sin información de stock crítico para usuarios normales)
  var descripcionElement = document.getElementById('descripcionProducto');
  if (descripcionElement) {
    descripcionElement.innerHTML = `
      <h4>Descripción del Producto</h4>
      <p class="lead">${producto.descripcion || 'Sin descripción disponible'}</p>
      <div class="row mt-3">
        <div class="col-md-6">
          <p><strong>Código:</strong> ${producto.codigo}</p>
          <p><strong>Categoría:</strong> ${producto.categoria}</p>
        </div>
        <div class="col-md-6">
          <p><strong>Stock disponible:</strong> ${producto.stock > 0 ? 'Disponible' : 'Agotado'}</p>
        </div>
      </div>
    `;
  }
  
  document.getElementById('precioProducto').textContent = producto.precio.toLocaleString();
  
  // Actualizar contador del carrito
  actualizarContadorCarrito();
}

// Función para listar productos (admin/vendedor)
function listarProductosAdmin() {
  var productos = obtenerProductos();
  var contenedor = document.getElementById('productos-lista');
  
  if (contenedor) {
    contenedor.innerHTML = '';
    
    productos.forEach(function(producto) {
      var alertaStock = producto.stock <= producto.stockCritico ? 
        '<span class="badge bg-danger">Stock Crítico</span>' : '';
      
      var div = document.createElement('div');
      div.className = 'card mb-3';
      div.innerHTML = `
        <div class="card-body">
          <div class="row">
            <div class="col-md-2">
              <img src="${rutaImagenNormalizada(producto.imagen)}" class="img-fluid" alt="${producto.nombre}">
            </div>
            <div class="col-md-10">
              <h5 class="card-title">${producto.nombre} ${alertaStock}</h5>
              <p class="card-text">
                <strong>Código:</strong> ${producto.codigo}<br>
                <strong>Descripción:</strong> ${producto.descripcion || 'Sin descripción'}<br>
                <strong>Precio:</strong> $${producto.precio.toLocaleString()}<br>
                <strong>Stock:</strong> ${producto.stock} unidades<br>
                <strong>Categoría:</strong> ${producto.categoria}
              </p>
            </div>
          </div>
        </div>
      `;
      contenedor.appendChild(div);
    });
  }
}
