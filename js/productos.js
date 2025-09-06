// ==============================================
// GESTIÓN DE PRODUCTOS - PRINCIPIANTE
// ==============================================

// Función para obtener productos del localStorage
function obtenerProductos() {
  var productos = localStorage.getItem('productos');
  if (productos) {
    return JSON.parse(productos);
  } else {
    // Productos iniciales si no hay ninguno
    var productosIniciales = [
      {
        id: 1,
        codigo: 'COM001',
        nombre: 'Comida para Perros Premium',
        descripcion: 'Alimento balanceado para perros adultos',
        precio: 15000,
        stock: 50,
        stockCritico: 10,
        categoria: 'Comida',
        imagen: 'assets/img/Comida.jpg'
      },
      {
        id: 2,
        codigo: 'CAM001',
        nombre: 'Cama para Mascotas',
        descripcion: 'Cama cómoda y resistente para mascotas',
        precio: 25000,
        stock: 20,
        stockCritico: 5,
        categoria: 'Accesorios',
        imagen: 'assets/img/cama2.png'
      },
      {
        id: 3,
        codigo: 'JUG001',
        nombre: 'Juguetes Variados',
        descripcion: 'Set de juguetes para entretenimiento',
        precio: 8000,
        stock: 30,
        stockCritico: 8,
        categoria: 'Juguetes',
        imagen: 'assets/img/jugetes.png'
      },
      {
        id: 4,
        codigo: 'HIG001',
        nombre: 'Productos de Higiene',
        descripcion: 'Kit completo de higiene para mascotas',
        precio: 12000,
        stock: 15,
        stockCritico: 3,
        categoria: 'Higiene',
        imagen: 'assets/img/higiene.png'
      }
    ];
    guardarProductos(productosIniciales);
    return productosIniciales;
  }
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
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="height: 200px; object-fit: cover;">
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
  window.location.href = 'detalle-producto.html?id=' + id;
}

// Función para mostrar detalle específico del producto
function mostrarDetalleProducto() {
  var params = new URLSearchParams(window.location.search);
  var id = parseInt(params.get('id'));
  
  if (!id) {
    alert('Producto no encontrado');
    window.location.href = 'index.html';
    return;
  }
  
  var productos = obtenerProductos();
  var producto = productos.find(function(p) { return p.id === id; });
  
  if (!producto) {
    alert('Producto no encontrado');
    window.location.href = 'index.html';
    return;
  }
  
  // Mostrar información del producto
  document.getElementById('producto-nombre').textContent = producto.nombre;
  document.getElementById('producto-imagen').src = producto.imagen;
  document.getElementById('producto-imagen').alt = producto.nombre;
  document.getElementById('producto-descripcion').textContent = producto.descripcion || 'Sin descripción disponible';
  document.getElementById('producto-precio').textContent = '$' + producto.precio.toLocaleString();
  document.getElementById('producto-stock').textContent = producto.stock + ' unidades disponibles';
  
  // Configurar botón de agregar al carrito
  var btnAgregar = document.getElementById('btn-agregar-carrito');
  if (btnAgregar) {
    btnAgregar.onclick = function() {
      agregarAlCarrito(producto.id);
    };
  }
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
              <img src="${producto.imagen}" class="img-fluid" alt="${producto.nombre}">
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
