// ===========================================
// SISTEMA DE PRODUCTOS Y CARRITO - TIENDA MIMASCOTA
// Código simple para principiantes
// ===========================================

// Lista de productos disponibles en la tienda
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

// Variable para guardar los productos del carrito
let carrito = [];

// ===========================================
// FUNCIONES PARA MOSTRAR PRODUCTOS
// ===========================================

// Función que muestra todos los productos en la página
function mostrarProductos() {
  // Buscar el lugar donde van los productos
  const contenedor = document.getElementById('listaProductos');

  // Si no encuentra el contenedor, salir de la función
  if (!contenedor) {
    return;
  }

  // Crear el HTML para todos los productos
  let html = '';

  // Recorrer cada producto y crear su tarjeta
  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];

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
  }

  // Poner el HTML en la página
  contenedor.innerHTML = html;
}

// ===========================================
// FUNCIONES PARA EL CARRITO
// ===========================================

// Función para agregar un producto al carrito
function agregarAlCarrito(idProducto) {
  // Buscar el producto por su ID
  let productoEncontrado = null;

  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id === idProducto) {
      productoEncontrado = productos[i];
      break;
    }
  }

  // Si no encuentra el producto, salir
  if (!productoEncontrado) {
    return;
  }

  // Verificar si el producto ya está en el carrito
  let productoEnCarrito = null;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id === idProducto) {
      productoEnCarrito = carrito[i];
      break;
    }
  }

  // Si ya está en el carrito, aumentar la cantidad
  if (productoEnCarrito) {
    productoEnCarrito.cantidad = productoEnCarrito.cantidad + 1;
  } else {
    // Si no está, agregarlo al carrito
    carrito.push({
      id: productoEncontrado.id,
      nombre: productoEncontrado.nombre,
      precio: productoEncontrado.precio,
      imagen: productoEncontrado.imagen,
      cantidad: 1
    });
  }

  // Guardar el carrito en el navegador (localStorage)
  localStorage.setItem('carrito', JSON.stringify(carrito));

  // Actualizar el contador del carrito
  actualizarContadorCarrito();

  // Mostrar mensaje al usuario
  alert('Producto agregado al carrito: ' + productoEncontrado.nombre);
}

// Función para actualizar el contador del carrito en la barra de navegación
function actualizarContadorCarrito() {
  const contador = document.getElementById('cantidadCarrito');

  if (contador) {
    // Contar todos los productos en el carrito
    let totalProductos = 0;
    for (let i = 0; i < carrito.length; i++) {
      totalProductos = totalProductos + carrito[i].cantidad;
    }

    // Mostrar el número en la página
    contador.textContent = totalProductos;
  }
}

// Función para vaciar completamente el carrito
function vaciarCarrito() {
  // Preguntar al usuario si está seguro
  const confirmar = confirm('¿Estás seguro de que quieres vaciar el carrito?');

  if (confirmar) {
    // Vaciar el carrito
    carrito = [];

    // Borrar del navegador
    localStorage.removeItem('carrito');

    // Actualizar el contador
    actualizarContadorCarrito();

    // Actualizar la vista del carrito
    mostrarCarrito();

    // Mostrar mensaje
    alert('Carrito vaciado correctamente');
  }
}

// Función para mostrar el contenido del carrito en el modal
function mostrarCarrito() {
  const contenedor = document.getElementById('contenidoCarrito');

  if (!contenedor) {
    return;
  }

  // Si el carrito está vacío
  if (carrito.length === 0) {
    contenedor.innerHTML = '<p class="text-center">Tu carrito está vacío</p>';
    return;
  }

  // Crear la lista de productos
  let html = '<div class="list-group">';

  for (let i = 0; i < carrito.length; i++) {
    const producto = carrito[i];

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
  }

  html += '</div>';

  // Poner el HTML en la página
  contenedor.innerHTML = html;

  // Calcular el total
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    total = total + (carrito[i].precio * carrito[i].cantidad);
  }

  // Mostrar el total
  const totalElement = document.getElementById('totalCarrito');
  if (totalElement) {
    totalElement.textContent = total.toLocaleString();
  }
}

// ===========================================
// FUNCIONES PARA FILTRAR PRODUCTOS
// ===========================================

// Función para filtrar productos por categoría y búsqueda
function filtrarProductos() {
  // Obtener los valores de los filtros
  const categoriaSeleccionada = document.getElementById('filtroCategoria').value;
  const textoBusqueda = document.getElementById('buscarProducto').value.toLowerCase();

  // Buscar el contenedor de productos
  const contenedor = document.getElementById('listaProductos');
  if (!contenedor) {
    return;
  }

  // Crear el HTML para los productos filtrados
  let html = '';

  // Recorrer todos los productos
  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];

    // Verificar filtro de categoría
    if (categoriaSeleccionada && producto.categoria !== categoriaSeleccionada) {
      continue; // Saltar este producto
    }

    // Verificar filtro de búsqueda
    if (textoBusqueda) {
      const nombreMinuscula = producto.nombre.toLowerCase();
      const descripcionMinuscula = producto.descripcion.toLowerCase();

      if (!nombreMinuscula.includes(textoBusqueda) && !descripcionMinuscula.includes(textoBusqueda)) {
        continue; // Saltar este producto
      }
    }

    // Si pasa los filtros, agregar el producto
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
  }

  // Si no hay productos, mostrar mensaje
  if (html === '') {
    html = '<div class="col-12"><p class="text-center text-muted">No se encontraron productos</p></div>';
  }

  // Poner el HTML en la página
  contenedor.innerHTML = html;
}

// ===========================================
// CÓDIGO QUE SE EJECUTA CUANDO CARGA LA PÁGINA
// ===========================================

// Esperar a que cargue toda la página
document.addEventListener('DOMContentLoaded', function() {
  console.log('Tienda MiMascota cargada');

  // Cargar el carrito guardado del navegador
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }

  // Mostrar todos los productos
  mostrarProductos();

  // Actualizar el contador del carrito
  actualizarContadorCarrito();

  // Conectar los filtros
  const filtroCategoria = document.getElementById('filtroCategoria');
  if (filtroCategoria) {
    filtroCategoria.addEventListener('change', filtrarProductos);
  }

  const buscarProducto = document.getElementById('buscarProducto');
  if (buscarProducto) {
    buscarProducto.addEventListener('input', filtrarProductos);
  }

  // Conectar el botón del carrito
  const btnCarrito = document.getElementById('btnCarrito');
  if (btnCarrito) {
    btnCarrito.addEventListener('click', function() {
      mostrarCarrito();
      // Mostrar el modal del carrito
      const modal = new bootstrap.Modal(document.getElementById('modalCarrito'));
      modal.show();
    });
  }

  // Conectar el botón para vaciar carrito
  const btnVaciarCarrito = document.getElementById('btnVaciarCarrito');
  if (btnVaciarCarrito) {
    btnVaciarCarrito.addEventListener('click', vaciarCarrito);
  }
});

console.log('Sistema de productos cargado correctamente');
