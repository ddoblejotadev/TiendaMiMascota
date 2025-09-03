// ============= DATOS DE PRODUCTOS =============
// Lista inicial de productos (después el admin podrá agregar más)
let productos = [
  {
    id: 1,
    nombre: "Comida Premium para Perros",
    precio: 15990,
    categoria: "comida",
    imagen: "assets/img/prod.png",
    descripcion: "Alimento balanceado premium para perros adultos",
    stock: 50
  },
  {
    id: 2,
    nombre: "Juguetes Varios",
    precio: 5990,
    categoria: "juguetes",
    imagen: "assets/img/jugetes.png",
    descripcion: "Set de pelotas y juguetes para mantener activa tu mascota",
    stock: 30
  },
  {
    id: 3,
    nombre: "Cama Cómoda",
    precio: 25990,
    categoria: "camas",
    imagen: "assets/img/cama2.png",
    descripcion: "Cama super cómoda para el descanso perfecto",
    stock: 15
  },
  {
    id: 4,
    nombre: "Productos de Salud",
    precio: 12990,
    categoria: "salud",
    imagen: "assets/img/salud.png",
    descripcion: "Vitaminas y suplementos para la salud de tu mascota",
    stock: 25
  },
  {
    id: 5,
    nombre: "Accesorios Fashion",
    precio: 8990,
    categoria: "accesorios",
    imagen: "assets/img/accesorios.png",
    descripcion: "Collares, correas y accesorios fashion",
    stock: 40
  },
  {
    id: 6,
    nombre: "Productos de Higiene",
    precio: 9990,
    categoria: "higiene",
    imagen: "assets/img/higiene.png",
    descripcion: "Shampoos y productos de limpieza",
    stock: 35
  }
];

// ============= FUNCIONES DEL CARRITO =============

// Función para obtener el carrito del localStorage
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito') || '[]');
}

// Función para guardar el carrito en localStorage
function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para agregar producto al carrito
function agregarAlCarrito(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  if (!producto) return;

  const carrito = obtenerCarrito();
  const productoEnCarrito = carrito.find(item => item.id === idProducto);

  if (productoEnCarrito) {
    // Si ya existe, aumentar cantidad
    productoEnCarrito.cantidad += 1;
  } else {
    // Si no existe, agregarlo
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
  actualizarContadorCarrito();
  
  // Mostrar mensaje de éxito
  mostrarMensaje('success', '¡Producto agregado al carrito!');
}

// Función para eliminar producto del carrito
function eliminarDelCarrito(idProducto) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(item => item.id !== idProducto);
  guardarCarrito(carrito);
  actualizarContadorCarrito();
  mostrarCarrito();
}

// Función para cambiar cantidad de un producto
function cambiarCantidad(idProducto, nuevaCantidad) {
  if (nuevaCantidad <= 0) {
    eliminarDelCarrito(idProducto);
    return;
  }

  const carrito = obtenerCarrito();
  const producto = carrito.find(item => item.id === idProducto);
  if (producto) {
    producto.cantidad = nuevaCantidad;
    guardarCarrito(carrito);
    actualizarContadorCarrito();
    mostrarCarrito();
  }
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
  const carrito = obtenerCarrito();
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  document.getElementById('cantidadCarrito').textContent = totalItems;
}

// Función para vaciar el carrito
function vaciarCarrito() {
  if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
    localStorage.removeItem('carrito');
    actualizarContadorCarrito();
    mostrarCarrito();
  }
}

// ============= FUNCIONES DE PRODUCTOS =============

// Función para obtener productos del localStorage (o usar los predeterminados)
function obtenerProductos() {
  const productosGuardados = localStorage.getItem('productos');
  if (productosGuardados) {
    productos = JSON.parse(productosGuardados);
  }
  return productos;
}

// Función para mostrar productos
function mostrarProductos(productosFiltrados = null) {
  const listaProductos = document.getElementById('listaProductos');
  const productosAMostrar = productosFiltrados || obtenerProductos();

  if (productosAMostrar.length === 0) {
    listaProductos.innerHTML = `
      <div class="col-12 text-center">
        <h5>No se encontraron productos</h5>
        <p>Intenta con una búsqueda diferente</p>
      </div>
    `;
    return;
  }

  let html = '';
  productosAMostrar.forEach(producto => {
    html += `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body text-center">
            <img src="${producto.imagen}" alt="${producto.nombre}" 
                 class="img-fluid mb-3" style="max-width: 150px;">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}</p>
            <p class="h5 text-primary">$${producto.precio.toLocaleString('es-CL')}</p>
            <p class="text-muted small">Stock: ${producto.stock} unidades</p>
            <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})"
                    ${producto.stock <= 0 ? 'disabled' : ''}>
              ${producto.stock <= 0 ? 'Sin Stock' : 'Agregar al Carrito'}
            </button>
          </div>
        </div>
      </div>
    `;
  });

  listaProductos.innerHTML = html;
}

// Función para filtrar productos
function filtrarProductos() {
  const categoria = document.getElementById('filtroCategoria').value;
  const busqueda = document.getElementById('buscarProducto').value.toLowerCase();

  let productosFiltrados = obtenerProductos();

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

// ============= FUNCIONES DEL MODAL DEL CARRITO =============

// Función para mostrar el carrito
function mostrarCarrito() {
  const carrito = obtenerCarrito();
  const contenidoCarrito = document.getElementById('contenidoCarrito');
  const totalCarrito = document.getElementById('totalCarrito');

  if (carrito.length === 0) {
    contenidoCarrito.innerHTML = `
      <div class="text-center text-muted py-4">
        <h6>Tu carrito está vacío</h6>
        <p>¡Agrega algunos productos!</p>
      </div>
    `;
    totalCarrito.textContent = '0';
    return;
  }

  let html = '';
  let total = 0;

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    html += `
      <div class="row align-items-center mb-3 border-bottom pb-3">
        <div class="col-md-2">
          <img src="${item.imagen}" alt="${item.nombre}" class="img-fluid" style="max-width: 60px;">
        </div>
        <div class="col-md-4">
          <h6 class="mb-1">${item.nombre}</h6>
          <small class="text-muted">$${item.precio.toLocaleString('es-CL')} c/u</small>
        </div>
        <div class="col-md-3">
          <div class="input-group input-group-sm">
            <button class="btn btn-outline-secondary" onclick="cambiarCantidad(${item.id}, ${item.cantidad - 1})">-</button>
            <input type="number" class="form-control text-center" value="${item.cantidad}" 
                   onchange="cambiarCantidad(${item.id}, parseInt(this.value))" min="1">
            <button class="btn btn-outline-secondary" onclick="cambiarCantidad(${item.id}, ${item.cantidad + 1})">+</button>
          </div>
        </div>
        <div class="col-md-2">
          <strong>$${subtotal.toLocaleString('es-CL')}</strong>
        </div>
        <div class="col-md-1">
          <button class="btn btn-outline-danger btn-sm" onclick="eliminarDelCarrito(${item.id})">
            🗑️
          </button>
        </div>
      </div>
    `;
  });

  contenidoCarrito.innerHTML = html;
  totalCarrito.textContent = total.toLocaleString('es-CL');
}

// ============= FUNCIONES AUXILIARES =============

// Función para mostrar mensajes
function mostrarMensaje(tipo, mensaje) {
  // Crear elemento de alerta temporal
  const alerta = document.createElement('div');
  alerta.className = `alert alert-${tipo} position-fixed top-0 start-50 translate-middle-x mt-3`;
  alerta.style.zIndex = '9999';
  alerta.textContent = mensaje;
  
  document.body.appendChild(alerta);
  
  // Eliminar después de 2 segundos
  setTimeout(() => {
    document.body.removeChild(alerta);
  }, 2000);
}

// Función para simular compra
function realizarCompra() {
  const carrito = obtenerCarrito();
  if (carrito.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }

  // Simular proceso de compra
  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  
  if (confirm(`¿Confirmas la compra por $${total.toLocaleString('es-CL')}?`)) {
    // Reducir stock (simulado)
    carrito.forEach(item => {
      const producto = productos.find(p => p.id === item.id);
      if (producto) {
        producto.stock -= item.cantidad;
      }
    });
    
    // Guardar productos actualizados
    localStorage.setItem('productos', JSON.stringify(productos));
    
    // Vaciar carrito
    localStorage.removeItem('carrito');
    actualizarContadorCarrito();
    
    alert('¡Compra realizada con éxito! Gracias por tu compra.');
    
    // Cerrar modal y actualizar productos
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalCarrito'));
    modal.hide();
    mostrarProductos();
  }
}

// ============= EVENTOS =============

document.addEventListener('DOMContentLoaded', () => {
  // Cargar productos iniciales
  mostrarProductos();
  actualizarContadorCarrito();

  // Eventos de filtros
  document.getElementById('filtroCategoria').addEventListener('change', filtrarProductos);
  document.getElementById('buscarProducto').addEventListener('input', filtrarProductos);

  // Eventos del carrito
  document.getElementById('btnCarrito').addEventListener('click', () => {
    mostrarCarrito();
    const modal = new bootstrap.Modal(document.getElementById('modalCarrito'));
    modal.show();
  });

  document.getElementById('btnVaciarCarrito').addEventListener('click', vaciarCarrito);
  document.getElementById('btnComprar').addEventListener('click', realizarCompra);
});
