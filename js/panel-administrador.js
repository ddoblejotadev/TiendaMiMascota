// ===========================================
// PANEL DE ADMINISTRADOR - TIENDA MIMASCOTA
// Código simple para principiantes
// ===========================================

// ===========================================
// VERIFICAR ACCESO DE ADMINISTRADOR
// ===========================================

// Función que se ejecuta cuando la página carga
document.addEventListener('DOMContentLoaded', function() {
  console.log('Panel de administrador cargado');

  // Verificar si hay un usuario logueado
  const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || 'null');

  if (!usuarioActual) {
    alert('Debes iniciar sesión para acceder al panel de administrador');
    window.location.href = '../user/iniciar-sesion.html';
    return;
  }

  // Verificar si es administrador (email contiene @admin.cl)
  const esAdmin = usuarioActual.email && usuarioActual.email.includes('@admin.cl');

  if (!esAdmin) {
    alert('No tienes permisos de administrador');
    window.location.href = '../user/panel-usuario.html';
    return;
  }

  // Mostrar el nombre del administrador
  const nombreAdmin = document.getElementById('adminNombre');
  if (nombreAdmin) {
    nombreAdmin.textContent = 'Admin: ' + usuarioActual.nombre;
  }

  // Cargar los datos iniciales
  cargarProductos();
  cargarUsuarios();
  cargarEstadisticas();

  console.log('Panel de administrador inicializado correctamente');
});

// ===========================================
// FUNCIONES PARA CERRAR SESIÓN
// ===========================================

// Función para cerrar sesión
function logout() {
  // Limpiar los datos de sesión
  localStorage.removeItem('usuarioActual');
  localStorage.removeItem('currentUser');

  // Redirigir al login
  window.location.href = '../user/iniciar-sesion.html';
}

// ===========================================
// GESTIÓN DE PRODUCTOS
// ===========================================

// Lista de productos (igual que en la tienda)
let productos = [
  {
    id: 1,
    nombre: "Alimento Premium para Perros",
    precio: 15990,
    categoria: "comida",
    imagen: "../../assets/img/Comida.jpg",
    descripcion: "Alimento balanceado premium para perros adultos.",
    stock: 50
  },
  {
    id: 2,
    nombre: "Juguetes Divertidos",
    precio: 5990,
    categoria: "juguetes",
    imagen: "../../assets/img/jugetes.png",
    descripcion: "Set de pelotas y juguetes para tu mascota.",
    stock: 30
  },
  {
    id: 3,
    nombre: "Cama Super Cómoda",
    precio: 25990,
    categoria: "camas",
    imagen: "../../assets/img/cama2.png",
    descripcion: "Cama ultra cómoda con relleno de espuma.",
    stock: 15
  },
  {
    id: 4,
    nombre: "Productos de Salud",
    precio: 12990,
    categoria: "salud",
    imagen: "../../assets/img/salud.png",
    descripcion: "Vitaminas y suplementos para tu mascota.",
    stock: 25
  },
  {
    id: 5,
    nombre: "Accesorios Fashion",
    precio: 8990,
    categoria: "accesorios",
    imagen: "../../assets/img/accesorios.png",
    descripcion: "Collares y accesorios fashion.",
    stock: 40
  },
  {
    id: 6,
    nombre: "Productos de Higiene",
    precio: 7990,
    categoria: "higiene",
    imagen: "../../assets/img/higiene.png",
    descripcion: "Champús y productos de higiene.",
    stock: 35
  }
];

// Función para mostrar los productos en el panel de admin
function cargarProductos() {
  const contenedor = document.getElementById('listaProductosAdmin');

  if (!contenedor) {
    return;
  }

  let html = '';

  // Recorrer todos los productos
  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];

    html += `
      <tr>
        <td>${producto.id}</td>
        <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: cover;"></td>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>$${producto.precio.toLocaleString()}</td>
        <td>${producto.stock}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarProducto(${producto.id})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${producto.id})">Eliminar</button>
        </td>
      </tr>
    `;
  }

  contenedor.innerHTML = html;
}

// Función para agregar un nuevo producto
function agregarProducto() {
  // Obtener los datos del formulario
  const nombre = document.getElementById('nombreProducto').value.trim();
  const precio = parseInt(document.getElementById('precioProducto').value);
  const categoria = document.getElementById('categoriaProducto').value;
  const imagen = document.getElementById('imagenProducto').value.trim();
  const descripcion = document.getElementById('descripcionProducto').value.trim();
  const stock = parseInt(document.getElementById('stockProducto').value);

  // Validar que todos los campos estén llenos
  if (!nombre || !precio || !categoria || !imagen || !descripcion || !stock) {
    alert('Por favor, completa todos los campos');
    return;
  }

  // Crear el nuevo producto
  const nuevoProducto = {
    id: productos.length + 1,
    nombre: nombre,
    precio: precio,
    categoria: categoria,
    imagen: imagen,
    descripcion: descripcion,
    stock: stock
  };

  // Agregar a la lista
  productos.push(nuevoProducto);

  // Guardar en el navegador
  localStorage.setItem('productos', JSON.stringify(productos));

  // Recargar la lista
  cargarProductos();

  // Limpiar el formulario
  document.getElementById('formAgregarProducto').reset();

  alert('Producto agregado correctamente');
}

// Función para editar un producto
function editarProducto(idProducto) {
  // Buscar el producto
  let productoEncontrado = null;
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id === idProducto) {
      productoEncontrado = productos[i];
      break;
    }
  }

  if (!productoEncontrado) {
    alert('Producto no encontrado');
    return;
  }

  // Llenar el formulario con los datos del producto
  document.getElementById('editIdProducto').value = productoEncontrado.id;
  document.getElementById('editNombreProducto').value = productoEncontrado.nombre;
  document.getElementById('editPrecioProducto').value = productoEncontrado.precio;
  document.getElementById('editCategoriaProducto').value = productoEncontrado.categoria;
  document.getElementById('editImagenProducto').value = productoEncontrado.imagen;
  document.getElementById('editDescripcionProducto').value = productoEncontrado.descripcion;
  document.getElementById('editStockProducto').value = productoEncontrado.stock;

  // Mostrar el modal de edición
  const modal = new bootstrap.Modal(document.getElementById('modalEditarProducto'));
  modal.show();
}

// Función para guardar los cambios de un producto editado
function guardarEdicionProducto() {
  const id = parseInt(document.getElementById('editIdProducto').value);
  const nombre = document.getElementById('editNombreProducto').value.trim();
  const precio = parseInt(document.getElementById('editPrecioProducto').value);
  const categoria = document.getElementById('editCategoriaProducto').value;
  const imagen = document.getElementById('editImagenProducto').value.trim();
  const descripcion = document.getElementById('editDescripcionProducto').value.trim();
  const stock = parseInt(document.getElementById('editStockProducto').value);

  // Validar campos
  if (!nombre || !precio || !categoria || !imagen || !descripcion || !stock) {
    alert('Por favor, completa todos los campos');
    return;
  }

  // Buscar y actualizar el producto
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id === id) {
      productos[i] = {
        id: id,
        nombre: nombre,
        precio: precio,
        categoria: categoria,
        imagen: imagen,
        descripcion: descripcion,
        stock: stock
      };
      break;
    }
  }

  // Guardar en el navegador
  localStorage.setItem('productos', JSON.stringify(productos));

  // Recargar la lista
  cargarProductos();

  // Cerrar el modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditarProducto'));
  modal.hide();

  alert('Producto actualizado correctamente');
}

// Función para eliminar un producto
function eliminarProducto(idProducto) {
  // Confirmar eliminación
  if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
    return;
  }

  // Buscar y eliminar el producto
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id === idProducto) {
      productos.splice(i, 1);
      break;
    }
  }

  // Guardar en el navegador
  localStorage.setItem('productos', JSON.stringify(productos));

  // Recargar la lista
  cargarProductos();

  alert('Producto eliminado correctamente');
}

// ===========================================
// GESTIÓN DE USUARIOS
// ===========================================

// Función para mostrar los usuarios registrados
function cargarUsuarios() {
  const contenedor = document.getElementById('listaUsuariosAdmin');

  if (!contenedor) {
    return;
  }

  // Obtener usuarios del navegador
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

  let html = '';

  // Recorrer todos los usuarios
  for (let i = 0; i < usuarios.length; i++) {
    const usuario = usuarios[i];

    html += `
      <tr>
        <td>${usuario.nombre}</td>
        <td>${usuario.email}</td>
        <td>${usuario.tipoUsuario || 'cliente'}</td>
        <td>${usuario.fechaRegistro ? new Date(usuario.fechaRegistro).toLocaleDateString() : 'N/A'}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="eliminarUsuario('${usuario.email}')">Eliminar</button>
        </td>
      </tr>
    `;
  }

  contenedor.innerHTML = html;
}

// Función para eliminar un usuario
function eliminarUsuario(emailUsuario) {
  // Confirmar eliminación
  if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
    return;
  }

  // Obtener usuarios
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

  // Buscar y eliminar el usuario
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === emailUsuario) {
      usuarios.splice(i, 1);
      break;
    }
  }

  // Guardar en el navegador
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  // Recargar la lista
  cargarUsuarios();

  alert('Usuario eliminado correctamente');
}

// ===========================================
// ESTADÍSTICAS
// ===========================================

// Función para mostrar estadísticas simples
function cargarEstadisticas() {
  // Obtener datos
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

  // Mostrar estadísticas
  const totalUsuarios = document.getElementById('totalUsuarios');
  if (totalUsuarios) {
    totalUsuarios.textContent = usuarios.length;
  }

  const totalProductos = document.getElementById('totalProductos');
  if (totalProductos) {
    totalProductos.textContent = productos.length;
  }

  const productosEnCarrito = document.getElementById('productosEnCarrito');
  if (productosEnCarrito) {
    let totalEnCarrito = 0;
    for (let i = 0; i < carrito.length; i++) {
      totalEnCarrito += carrito[i].cantidad;
    }
    productosEnCarrito.textContent = totalEnCarrito;
  }
}

console.log('Panel de administrador cargado correctamente');
