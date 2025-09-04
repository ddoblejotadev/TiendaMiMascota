// ============= PRODUCTOS.JS - MANEJO DE PRODUCTOS Y CARRITO =============
// Archivo para manejar productos y carrito de compras
// Código simple y comentado para nivel principiante

// ============= 0. CONFIGURACIÓN DE RUTAS =============
// Función para determinar la ruta correcta según la ubicación de la página
function obtenerRutaAssets() {
  const currentPath = window.location.pathname;
  // Si estamos en una subcarpeta (pages/), usar ../assets/
  if (currentPath.includes('/pages/')) {
    return '../assets/img/';
  }
  // Si estamos en la raíz, usar assets/
  return 'assets/img/';
}

const rutaAssets = obtenerRutaAssets();

// ============= 1. LISTA DE PRODUCTOS =============
// Usamos TODAS las imágenes disponibles en assets/img/

const productos = [
  {
    id: 1,
    nombre: "Alimento Premium para Perros",
    precio: 15990,
    categoria: "comida",
    imagen: rutaAssets + "Comida.jpg",
    descripcion: "Alimento balanceado premium para perros adultos. Rico en proteínas y vitaminas.",
    stock: 50
  },
  {
    id: 2,
    nombre: "Juguetes Divertidos",
    precio: 5990,
    categoria: "juguetes", 
    imagen: rutaAssets + "jugetes.png",
    descripcion: "Set de pelotas y juguetes para mantener activa y feliz a tu mascota.",
    stock: 30
  },
  {
    id: 3,
    nombre: "Cama Super Cómoda",
    precio: 25990,
    categoria: "camas",
    imagen: rutaAssets + "cama2.png",
    descripcion: "Cama ultra cómoda con relleno de espuma para el descanso perfecto.",
    stock: 15
  },
  {
    id: 4,
    nombre: "Productos de Salud",
    precio: 12990,
    categoria: "salud",
    imagen: rutaAssets + "salud.png",
    descripcion: "Vitaminas, suplementos y medicamentos para la salud de tu mascota.",
    stock: 25
  },
  {
    id: 5,
    nombre: "Accesorios Fashion",
    precio: 8990,
    categoria: "accesorios",
    imagen: rutaAssets + "accesorios.png",
    descripcion: "Collares, correas y accesorios fashion para que tu mascota luzca genial.",
    stock: 40
  },
  {
    id: 6,
    nombre: "Productos de Higiene",
    precio: 9990,
    categoria: "higiene",
    imagen: rutaAssets + "higiene.png",
    descripcion: "Shampoos, acondicionadores y productos de limpieza para tu mascota.",
    stock: 35
  },
  {
    id: 7,
    nombre: "Producto Especial",
    precio: 18990,
    categoria: "especial",
    imagen: rutaAssets + "prod.png",
    descripcion: "Producto especial de la casa con múltiples beneficios para tu mascota.",
    stock: 20
  }
];

// ============= 2. VARIABLES GLOBALES =============
let carrito = []; // Array para guardar productos del carrito

// ============= 3. FUNCIONES DEL CARRITO =============

// Función para obtener carrito del localStorage
function obtenerCarrito() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
  return carrito;
}

// Función para guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para agregar producto al carrito
function agregarAlCarrito(idProducto) {
  console.log('Agregando producto al carrito:', idProducto);
  
  // Buscar el producto en la lista
  const producto = productos.find(p => p.id === idProducto);
  if (!producto) {
    alert('Producto no encontrado');
    return;
  }
  
  // Verificar si el producto ya está en el carrito
  const productoEnCarrito = carrito.find(item => item.id === idProducto);
  
  if (productoEnCarrito) {
    // Si ya está, aumentar la cantidad
    productoEnCarrito.cantidad += 1;
  } else {
    // Si no está, agregarlo con cantidad 1
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }
  
  // Guardar en localStorage
  guardarCarrito();
  
  // Actualizar contador del carrito
  actualizarContadorCarrito();
  
  // Mostrar mensaje
  alert(`${producto.nombre} agregado al carrito`);
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);
  const contador = document.getElementById('cantidadCarrito');
  if (contador) {
    contador.textContent = cantidadTotal;
  }
}

// Función para mostrar el carrito
function mostrarCarrito() {
  const contenido = document.getElementById('contenidoCarrito');
  if (!contenido) return;
  
  if (carrito.length === 0) {
    contenido.innerHTML = '<p class="text-center text-muted">Tu carrito está vacío</p>';
    return;
  }
  
  let html = '';
  let total = 0;
  
  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    
    html += `
      <div class="row mb-3 align-items-center">
        <div class="col-2">
          <img src="${item.imagen}" alt="${item.nombre}" class="img-fluid">
        </div>
        <div class="col-6">
          <h6>${item.nombre}</h6>
          <small class="text-muted">$${item.precio.toLocaleString()}</small>
        </div>
        <div class="col-2">
          <input type="number" class="form-control form-control-sm" 
                 value="${item.cantidad}" min="1" 
                 onchange="cambiarCantidad(${item.id}, this.value)">
        </div>
        <div class="col-2">
          <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${item.id})">
            ❌
          </button>
        </div>
      </div>
      <hr>
    `;
  });
  
  html += `
    <div class="text-end">
      <h5>Total: $${total.toLocaleString()}</h5>
      <button class="btn btn-success" onclick="finalizarCompra()">
        Finalizar Compra
      </button>
      <button class="btn btn-outline-danger ms-2" onclick="vaciarCarrito()">
        Vaciar Carrito
      </button>
    </div>
  `;
  
  contenido.innerHTML = html;
}

// Función para cambiar cantidad de un producto
function cambiarCantidad(idProducto, nuevaCantidad) {
  const cantidad = parseInt(nuevaCantidad);
  if (cantidad <= 0) {
    eliminarDelCarrito(idProducto);
    return;
  }
  
  const item = carrito.find(item => item.id === idProducto);
  if (item) {
    item.cantidad = cantidad;
    guardarCarrito();
    actualizarContadorCarrito();
    mostrarCarrito();
  }
}

// Función para eliminar producto del carrito
function eliminarDelCarrito(idProducto) {
  carrito = carrito.filter(item => item.id !== idProducto);
  guardarCarrito();
  actualizarContadorCarrito();
  mostrarCarrito();
}

// Función para vaciar carrito
function vaciarCarrito() {
  if (confirm('¿Estás seguro de vaciar el carrito?')) {
    carrito = [];
    guardarCarrito();
    actualizarContadorCarrito();
    mostrarCarrito();
  }
}

// Función para finalizar compra
function finalizarCompra() {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }
  
  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  
  alert(`¡Compra realizada por $${total.toLocaleString()}! Gracias por tu compra.`);
  
  // Vaciar carrito después de la compra
  carrito = [];
  guardarCarrito();
  actualizarContadorCarrito();
  mostrarCarrito();
}

// ============= 4. FUNCIONES PARA MOSTRAR PRODUCTOS =============

// Función para mostrar todos los productos
function mostrarProductos(productosFiltrados = null) {
  const contenedor = document.getElementById('listaProductos');
  if (!contenedor) return;
  
  const productosAMostrar = productosFiltrados || productos;
  
  if (productosAMostrar.length === 0) {
    contenedor.innerHTML = '<p class="text-center text-muted">No se encontraron productos</p>';
    return;
  }
  
  let html = '';
  
  productosAMostrar.forEach(producto => {
    html += `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img-top" style="height: 200px; object-fit: cover;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text flex-grow-1">${producto.descripcion}</p>
            <p class="text-muted">Stock: ${producto.stock}</p>
            <div class="mt-auto">
              <div class="d-flex justify-content-between align-items-center">
                <span class="h5 text-primary">$${producto.precio.toLocaleString()}</span>
                <div>
                  <button class="btn btn-outline-primary btn-sm me-2" onclick="mostrarDetalleProducto(${producto.id})">
                    Ver Detalle
                  </button>
                  <button class="btn btn-primary btn-sm" onclick="agregarAlCarrito(${producto.id})">
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  
  contenedor.innerHTML = html;
}

// Función para mostrar detalle del producto
function mostrarDetalleProducto(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  if (!producto) return;
  
  // Crear modal de detalle
  const modalHtml = `
    <div class="modal fade" id="modalDetalle" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${producto.nombre}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid">
              </div>
              <div class="col-md-6">
                <h4>$${producto.precio.toLocaleString()}</h4>
                <p><strong>Categoría:</strong> ${producto.categoria}</p>
                <p><strong>Stock:</strong> ${producto.stock}</p>
                <p>${producto.descripcion}</p>
                <button class="btn btn-success" onclick="agregarAlCarrito(${producto.id}); bootstrap.Modal.getInstance(document.getElementById('modalDetalle')).hide();">
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  const modal = new bootstrap.Modal(document.getElementById('modalDetalle'));
  modal.show();
}
function filtrarProductos() {
  const categoria = document.getElementById('filtroCategoria')?.value || '';
  const busqueda = document.getElementById('buscarProducto')?.value.toLowerCase() || '';
  
  let productosFiltrados = productos;
  
  // Filtrar por categoría
  if (categoria) {
    productosFiltrados = productosFiltrados.filter(p => p.categoria === categoria);
  }
  
  // Filtrar por búsqueda
  if (busqueda) {
    productosFiltrados = productosFiltrados.filter(p => 
      p.nombre.toLowerCase().includes(busqueda) || 
      p.descripcion.toLowerCase().includes(busqueda)
    );
  }
  
  mostrarProductos(productosFiltrados);
}

// ============= 5. CÓDIGO PRINCIPAL =============

document.addEventListener('DOMContentLoaded', function() {
  console.log('productos.js cargado');
  
  // Cargar carrito del localStorage
  obtenerCarrito();
  
  // Mostrar productos
  mostrarProductos();
  
  // Actualizar contador del carrito
  actualizarContadorCarrito();
  
  // Eventos para filtros
  const filtroCategoria = document.getElementById('filtroCategoria');
  if (filtroCategoria) {
    filtroCategoria.addEventListener('change', filtrarProductos);
  }
  
  const buscarProducto = document.getElementById('buscarProducto');
  if (buscarProducto) {
    buscarProducto.addEventListener('input', filtrarProductos);
  }
  
  // Evento para mostrar carrito
  const btnCarrito = document.getElementById('btnCarrito');
  if (btnCarrito) {
    btnCarrito.addEventListener('click', function() {
      mostrarCarrito();
      // Mostrar modal del carrito
      const modal = new bootstrap.Modal(document.getElementById('modalCarrito'));
      modal.show();
    });
  }
});

console.log('productos.js cargado correctamente');
