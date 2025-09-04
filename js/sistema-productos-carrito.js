// ============= PRODUCTOS.JS - MANEJO DE PRODUCTOS Y CARRITO =============
// Archivo para manejar productos y carrito de compras
// Código simple y comentado para nivel principiante

// ============= 1. LISTA DE PRODUCTOS =============
// Lista simple de productos con imágenes PNG

const productos = [
  {
    id: 1,
    nombre: "Alimento Premium para Perros",
    precio: 15990,
    categoria: "comida",
    imagen: "assets/img/Comida.jpg",
    descripcion: "Alimento balanceado premium para perros adultos.",
    stock: 50
  },
  {
    id: 2,
    nombre: "Juguetes Divertidos",
    precio: 5990,
    categoria: "juguetes",
    imagen: "assets/img/jugetes.png",
    descripcion: "Set de pelotas y juguetes para tu mascota.",
    stock: 30
  },
  {
    id: 3,
    nombre: "Cama Super Cómoda",
    precio: 25990,
    categoria: "camas",
    imagen: "assets/img/cama2.png",
    descripcion: "Cama ultra cómoda con relleno de espuma.",
    stock: 15
  },
  {
    id: 4,
    nombre: "Productos de Salud",
    precio: 12990,
    categoria: "salud",
    imagen: "assets/img/salud.png",
    descripcion: "Vitaminas y suplementos para tu mascota.",
    stock: 25
  },
  {
    id: 5,
    nombre: "Accesorios Fashion",
    precio: 8990,
    categoria: "accesorios",
    imagen: "assets/img/accesorios.png",
    descripcion: "Collares y accesorios fashion.",
    stock: 40
  },
  {
    id: 6,
    nombre: "Productos de Higiene",
    precio: 7990,
    categoria: "higiene",
    imagen: "assets/img/higiene.png",
    descripcion: "Champús y productos de higiene.",
    stock: 35
  }
];

// ============= 2. VARIABLES DEL CARRITO =============
let carrito = []; // Array simple para el carrito

// ============= 3. FUNCIONES BÁSICAS =============

// Función para mostrar productos
function mostrarProductos() {
  const contenedor = document.getElementById('listaProductos');
  if (!contenedor) return;

  let html = '';

  productos.forEach(producto => {
    html += `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img-top" style="height: 200px; object-fit: cover;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}</p>
            <p class="text-muted">Stock: ${producto.stock}</p>
            <div class="mt-auto">
              <div class="d-flex justify-content-between align-items-center">
                <span class="h5 text-primary">$${producto.precio.toLocaleString()}</span>
                <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  contenedor.innerHTML = html;
}

// Función para agregar producto al carrito
function agregarAlCarrito(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  if (!producto) return;

  // Buscar si el producto ya está en el carrito
  const productoEnCarrito = carrito.find(p => p.id === idProducto);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }

  // Guardar en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));

  // Actualizar contador
  actualizarContadorCarrito();

  alert('Producto agregado al carrito: ' + producto.nombre);
}

// Función para actualizar contador del carrito
function actualizarContadorCarrito() {
  const contador = document.getElementById('cantidadCarrito');
  if (contador) {
    const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    contador.textContent = totalProductos;
  }
}

// Función para vaciar carrito
function vaciarCarrito() {
  // Confirmar antes de vaciar
  if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
    carrito = []; // Vaciar el array del carrito
    localStorage.removeItem('carrito'); // Eliminar del localStorage
    actualizarContadorCarrito(); // Actualizar el contador
    mostrarCarrito(); // Actualizar la vista del carrito
    alert('Carrito vaciado correctamente');
  }
}

// Función para mostrar carrito
function mostrarCarrito() {
  const contenedor = document.getElementById('contenidoCarrito');
  if (!contenedor) return;

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p class="text-center">Tu carrito está vacío</p>';
    return;
  }

  let html = '<div class="list-group">';

  carrito.forEach(producto => {
    html += `
      <div class="list-group-item d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
          <div>
            <h6 class="mb-0">${producto.nombre}</h6>
            <small>Cantidad: ${producto.cantidad}</small>
          </div>
        </div>
        <span class="fw-bold">$${(producto.precio * producto.cantidad).toLocaleString()}</span>
      </div>
    `;
  });

  html += '</div>';

  contenedor.innerHTML = html;

  // Calcular y mostrar total
  const total = carrito.reduce((suma, producto) => suma + (producto.precio * producto.cantidad), 0);
  const totalElement = document.getElementById('totalCarrito');
  if (totalElement) {
    totalElement.textContent = total.toLocaleString();
  }
}

// Función para filtrar productos
function filtrarProductos() {
  const categoria = document.getElementById('filtroCategoria').value;
  const busqueda = document.getElementById('buscarProducto').value.toLowerCase();

  const contenedor = document.getElementById('listaProductos');
  if (!contenedor) return;

  let html = '';

  productos.forEach(producto => {
    // Filtrar por categoría
    if (categoria && producto.categoria !== categoria) {
      return;
    }

    // Filtrar por búsqueda
    if (busqueda && !producto.nombre.toLowerCase().includes(busqueda) && !producto.descripcion.toLowerCase().includes(busqueda)) {
      return;
    }

    html += `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img-top" style="height: 200px; object-fit: cover;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}</p>
            <p class="text-muted">Stock: ${producto.stock}</p>
            <div class="mt-auto">
              <div class="d-flex justify-content-between align-items-center">
                <span class="h5 text-primary">$${producto.precio.toLocaleString()}</span>
                <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  if (html === '') {
    html = '<div class="col-12"><p class="text-center text-muted">No se encontraron productos</p></div>';
  }

  contenedor.innerHTML = html;
}

// ============= 4. CÓDIGO PRINCIPAL =============

// Cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  console.log('Tienda MiMascota cargada');

  // Cargar carrito del localStorage
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }

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

  // Evento para vaciar carrito
  const btnVaciarCarrito = document.getElementById('btnVaciarCarrito');
  if (btnVaciarCarrito) {
    btnVaciarCarrito.addEventListener('click', vaciarCarrito);
  }
});

console.log('productos.js cargado correctamente');
