// ============= ADMIN-SIMPLE.JS - PANEL DE ADMINISTRADOR =============
// Archivo para el panel de administrador
// Código simple y comentado para nivel principiante

// ============= 1. VERIFICAR ACCESO ADMIN =============

document.addEventListener('DOMContentLoaded', function() {
  console.log('admin-simple.js cargado');
  
  // Verificar si hay usuario logueado
  const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || 'null');
  
  if (!usuarioActual) {
    alert('Debes iniciar sesión para acceder');
    window.location.href = 'login.html';
    return;
  }
  
  // Verificar si es admin (email con @admin.cl)
  const esAdmin = usuarioActual.email?.includes('@admin.cl');
  
  if (!esAdmin) {
    alert('No tienes permisos de administrador');
    window.location.href = 'dashboard.html';
    return;
  }
  
  // Mostrar nombre del admin
  const nombreAdmin = document.getElementById('adminNombre');
  if (nombreAdmin) {
    nombreAdmin.textContent = `Admin: ${usuarioActual.nombre}`;
  }
  
  // Cargar datos iniciales
  cargarProductos();
  cargarUsuarios();
  cargarEstadisticas();
});

// ============= 2. GESTIÓN DE PRODUCTOS =============

// Lista de productos (misma que productos-simple.js)
let productos = [
  {
    id: 1,
    nombre: "Alimento Premium para Perros",
    precio: 15990,
    categoria: "comida",
    imagen: "assets/img/Comida.jpg",
    descripcion: "Alimento balanceado premium para perros adultos. Rico en proteínas y vitaminas.",
    stock: 50
  },
  {
    id: 2,
    nombre: "Juguetes Divertidos",
    precio: 5990,
    categoria: "juguetes", 
    imagen: "assets/img/jugetes.png",
    descripcion: "Set de pelotas y juguetes para mantener activa y feliz a tu mascota.",
    stock: 30
  },
  {
    id: 3,
    nombre: "Cama Super Cómoda",
    precio: 25990,
    categoria: "camas",
    imagen: "assets/img/cama2.png", 
    descripcion: "Cama ultra cómoda con relleno de espuma para el descanso perfecto.",
    stock: 15
  },
  {
    id: 4,
    nombre: "Productos de Salud",
    precio: 12990,
    categoria: "salud",
    imagen: "assets/img/salud.png",
    descripcion: "Vitaminas, suplementos y medicamentos para la salud de tu mascota.",
    stock: 25
  },
  {
    id: 5,
    nombre: "Accesorios Fashion",
    precio: 8990,
    categoria: "accesorios",
    imagen: "assets/img/accesorios.png",
    descripcion: "Collares, correas y accesorios fashion para que tu mascota luzca genial.",
    stock: 40
  },
  {
    id: 6,
    nombre: "Productos de Higiene",
    precio: 9990,
    categoria: "higiene",
    imagen: "assets/img/higiene.png",
    descripcion: "Shampoos, acondicionadores y productos de limpieza para tu mascota.",
    stock: 35
  },
  {
    id: 7,
    nombre: "Producto Especial",
    precio: 18990,
    categoria: "especial",
    imagen: "assets/img/prod.png",
    descripcion: "Producto especial de la casa con múltiples beneficios para tu mascota.",
    stock: 20
  }
];

// Función para cargar productos en el admin
function cargarProductos() {
  const contenedor = document.getElementById('listaProductosAdmin');
  if (!contenedor) return;
  
  let html = '';
  productos.forEach(producto => {
    html += `
      <tr>
        <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: cover;"></td>
        <td>${producto.nombre}</td>
        <td>$${producto.precio.toLocaleString()}</td>
        <td>${producto.categoria}</td>
        <td>${producto.stock}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarProducto(${producto.id})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${producto.id})">Eliminar</button>
        </td>
      </tr>
    `;
  });
  
  contenedor.innerHTML = html;
}

// Función para editar producto (simplificada)
function editarProducto(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;
  
  const nuevoNombre = prompt('Nuevo nombre:', producto.nombre);
  const nuevoPrecio = prompt('Nuevo precio:', producto.precio);
  const nuevaDescripcion = prompt('Nueva descripción:', producto.descripcion);
  const nuevoStock = prompt('Nuevo stock:', producto.stock);
  
  if (nuevoNombre && nuevoPrecio && nuevaDescripcion && nuevoStock) {
    producto.nombre = nuevoNombre;
    producto.precio = parseInt(nuevoPrecio);
    producto.descripcion = nuevaDescripcion;
    producto.stock = parseInt(nuevoStock);
    
    cargarProductos();
    alert('Producto actualizado correctamente');
  }
}

// Función para eliminar producto
function eliminarProducto(id) {
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    const index = productos.findIndex(p => p.id === id);
    if (index !== -1) {
      productos.splice(index, 1);
      cargarProductos();
      alert('Producto eliminado');
    }
  }
}

// ============= 3. GESTIÓN DE USUARIOS =============

function cargarUsuarios() {
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const contenedor = document.getElementById('listaUsuariosAdmin');
  if (!contenedor) return;
  
  let html = '';
  usuarios.forEach((usuario, index) => {
    html += `
      <tr>
        <td>${usuario.nombre}</td>
        <td>${usuario.email}</td>
        <td>${usuario.telefono}</td>
        <td>${usuario.region}</td>
        <td>${usuario.comuna}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(${index})">Eliminar</button>
        </td>
      </tr>
    `;
  });
  
  if (usuarios.length === 0) {
    html = '<tr><td colspan="6" class="text-center text-muted">No hay usuarios registrados</td></tr>';
  }
  
  contenedor.innerHTML = html;
}

// Función para eliminar usuario
function eliminarUsuario(index) {
  if (confirm('¿Estás seguro de eliminar este usuario?')) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    cargarUsuarios();
    alert('Usuario eliminado');
  }
}

// ============= 4. ESTADÍSTICAS =============

function cargarEstadisticas() {
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  
  // Contar usuarios
  document.getElementById('totalUsuarios').textContent = usuarios.length;
  
  // Contar productos
  document.getElementById('totalProductos').textContent = productos.length;
  
  // Productos en carrito
  const productosEnCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);
  document.getElementById('productosCarrito').textContent = productosEnCarrito;
  
  // Valor total del carrito
  const valorCarrito = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  document.getElementById('valorCarrito').textContent = `$${valorCarrito.toLocaleString()}`;
}

// ============= 5. EVENTOS GENERALES =============

// Cerrar sesión
function cerrarSesion() {
  if (confirm('¿Estás seguro de cerrar sesión?')) {
    localStorage.removeItem('usuarioActual');
    window.location.href = 'login.html';
  }
}

// Volver a la tienda
function volverTienda() {
  window.location.href = 'index.html';
}

console.log('admin-simple.js cargado correctamente');
