// ============= VERIFICACIÓN DE ACCESO ADMIN =============

document.addEventListener('DOMContentLoaded', () => {
  // Verificar si el usuario es admin
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  
  if (!currentUser) {
    alert('Debes iniciar sesión para acceder al panel de administrador');
    window.location.href = 'login.html';
    return;
  }

  // Verificar si es admin (email con @admin.cl o marcado como admin)
  const isAdmin = currentUser.email?.includes('@admin.cl') || currentUser.isAdmin;
  
  if (!isAdmin) {
    alert('No tienes permisos de administrador');
    window.location.href = 'index.html';
    return;
  }

  // Mostrar nombre del admin
  document.getElementById('adminNombre').textContent = `Admin: ${currentUser.fullName || currentUser.username}`;

  // Cargar datos iniciales
  cargarProductosAdmin();
  cargarUsuariosAdmin();
  cargarEstadisticas();
});

// ============= GESTIÓN DE PRODUCTOS =============

let productos = [];
let editandoProducto = false;

// Función para obtener productos
function obtenerProductos() {
  const productosGuardados = localStorage.getItem('productos');
  if (productosGuardados) {
    return JSON.parse(productosGuardados);
  }
  
  // Productos por defecto si no hay guardados
  return [
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
}

// Función para cargar productos en el admin
function cargarProductosAdmin() {
  productos = obtenerProductos();
  mostrarProductosAdmin();
}

// Función para mostrar productos en el admin
function mostrarProductosAdmin() {
  const lista = document.getElementById('listaProductosAdmin');
  
  if (productos.length === 0) {
    lista.innerHTML = '<p class="text-muted">No hay productos registrados</p>';
    return;
  }

  let html = `
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
  `;

  productos.forEach(producto => {
    html += `
      <tr>
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>$${producto.precio.toLocaleString('es-CL')}</td>
        <td><span class="badge bg-secondary">${producto.categoria}</span></td>
        <td>
          <span class="badge ${producto.stock > 10 ? 'bg-success' : producto.stock > 0 ? 'bg-warning' : 'bg-danger'}">
            ${producto.stock}
          </span>
        </td>
        <td>
          <button class="btn btn-outline-primary btn-sm me-1" onclick="editarProducto(${producto.id})">
            ✏️ Editar
          </button>
          <button class="btn btn-outline-danger btn-sm" onclick="eliminarProducto(${producto.id})">
            🗑️ Eliminar
          </button>
        </td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>
  `;

  lista.innerHTML = html;
}

// Función para mostrar formulario de producto
function mostrarFormularioProducto() {
  document.getElementById('cardFormularioProducto').style.display = 'block';
  document.getElementById('tituloFormulario').textContent = 'Agregar Producto';
  editandoProducto = false;
  limpiarFormularioProducto();
}

// Función para limpiar formulario de producto
function limpiarFormularioProducto() {
  document.getElementById('formularioProducto').reset();
  document.getElementById('productoId').value = '';
}

// Función para cancelar edición
function cancelarEdicion() {
  document.getElementById('cardFormularioProducto').style.display = 'none';
  limpiarFormularioProducto();
  editandoProducto = false;
}

// Función para editar producto
function editarProducto(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  editandoProducto = true;
  document.getElementById('cardFormularioProducto').style.display = 'block';
  document.getElementById('tituloFormulario').textContent = 'Editar Producto';

  // Llenar formulario con datos del producto
  document.getElementById('productoId').value = producto.id;
  document.getElementById('productoNombre').value = producto.nombre;
  document.getElementById('productoPrecio').value = producto.precio;
  document.getElementById('productoCategoria').value = producto.categoria;
  document.getElementById('productoDescripcion').value = producto.descripcion || '';
  document.getElementById('productoStock').value = producto.stock;
  document.getElementById('productoImagen').value = producto.imagen || '';
}

// Función para eliminar producto
function eliminarProducto(id) {
  if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
    productos = productos.filter(p => p.id !== id);
    localStorage.setItem('productos', JSON.stringify(productos));
    mostrarProductosAdmin();
    cargarEstadisticas();
    mostrarMensaje('success', 'Producto eliminado correctamente');
  }
}

// Evento para el formulario de productos
document.getElementById('formularioProducto').addEventListener('submit', (e) => {
  e.preventDefault();

  const producto = {
    id: editandoProducto ? parseInt(document.getElementById('productoId').value) : Date.now(),
    nombre: document.getElementById('productoNombre').value.trim(),
    precio: parseInt(document.getElementById('productoPrecio').value),
    categoria: document.getElementById('productoCategoria').value,
    descripcion: document.getElementById('productoDescripcion').value.trim(),
    stock: parseInt(document.getElementById('productoStock').value),
    imagen: document.getElementById('productoImagen').value.trim() || 'assets/img/producto-default.png'
  };

  if (editandoProducto) {
    // Actualizar producto existente
    const index = productos.findIndex(p => p.id === producto.id);
    productos[index] = producto;
    mostrarMensaje('success', 'Producto actualizado correctamente');
  } else {
    // Agregar nuevo producto
    productos.push(producto);
    mostrarMensaje('success', 'Producto agregado correctamente');
  }

  localStorage.setItem('productos', JSON.stringify(productos));
  mostrarProductosAdmin();
  cargarEstadisticas();
  cancelarEdicion();
});

// ============= GESTIÓN DE USUARIOS =============

// Función para cargar usuarios
function cargarUsuariosAdmin() {
  const usuarios = JSON.parse(localStorage.getItem('users') || '[]');
  mostrarUsuariosAdmin(usuarios);
}

// Función para mostrar usuarios
function mostrarUsuariosAdmin(usuarios) {
  const lista = document.getElementById('listaUsuariosAdmin');
  
  if (usuarios.length === 0) {
    lista.innerHTML = '<p class="text-muted">No hay usuarios registrados</p>';
    return;
  }

  let html = `
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Usuario</th>
            <th>Tipo</th>
            <th>Fecha Registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
  `;

  usuarios.forEach((usuario, index) => {
    const esAdmin = usuario.email?.includes('@admin.cl') || usuario.isAdmin;
    const fecha = usuario.createdAt ? new Date(usuario.createdAt).toLocaleDateString('es-CL') : 'N/A';
    
    html += `
      <tr>
        <td>${usuario.fullName || 'N/A'}</td>
        <td>${usuario.email || 'N/A'}</td>
        <td>${usuario.username || 'N/A'}</td>
        <td>
          <span class="badge ${esAdmin ? 'bg-danger' : 'bg-primary'}">
            ${esAdmin ? 'Admin' : 'Usuario'}
          </span>
        </td>
        <td>${fecha}</td>
        <td>
          <button class="btn btn-outline-danger btn-sm" onclick="eliminarUsuario(${index})">
            🗑️ Eliminar
          </button>
        </td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>
  `;

  lista.innerHTML = html;
}

// Función para mostrar formulario de usuario
function mostrarFormularioUsuario() {
  document.getElementById('cardFormularioUsuario').style.display = 'block';
  document.getElementById('formularioUsuario').reset();
}

// Función para cancelar usuario
function cancelarUsuario() {
  document.getElementById('cardFormularioUsuario').style.display = 'none';
  document.getElementById('formularioUsuario').reset();
}

// Función para eliminar usuario
function eliminarUsuario(index) {
  if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
    const usuarios = JSON.parse(localStorage.getItem('users') || '[]');
    usuarios.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(usuarios));
    cargarUsuariosAdmin();
    cargarEstadisticas();
    mostrarMensaje('success', 'Usuario eliminado correctamente');
  }
}

// Evento para el formulario de usuarios
document.getElementById('formularioUsuario').addEventListener('submit', (e) => {
  e.preventDefault();

  const nuevoUsuario = {
    fullName: document.getElementById('usuarioNombre').value.trim(),
    email: document.getElementById('usuarioEmail').value.trim(),
    username: document.getElementById('usuarioUsername').value.trim(),
    password: document.getElementById('usuarioPassword').value,
    phone: document.getElementById('usuarioTelefono').value.trim(),
    isAdmin: document.getElementById('usuarioEsAdmin').checked,
    createdAt: new Date().toISOString()
  };

  const usuarios = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Verificar si ya existe
  const existe = usuarios.some(u => u.email === nuevoUsuario.email || u.username === nuevoUsuario.username);
  if (existe) {
    mostrarMensaje('danger', 'Ya existe un usuario con ese email o nombre de usuario');
    return;
  }

  usuarios.push(nuevoUsuario);
  localStorage.setItem('users', JSON.stringify(usuarios));
  
  cargarUsuariosAdmin();
  cargarEstadisticas();
  cancelarUsuario();
  mostrarMensaje('success', 'Usuario creado correctamente');
});

// ============= ESTADÍSTICAS =============

function cargarEstadisticas() {
  // Total de productos
  const productos = obtenerProductos();
  document.getElementById('totalProductos').textContent = productos.length;

  // Total de usuarios
  const usuarios = JSON.parse(localStorage.getItem('users') || '[]');
  document.getElementById('totalUsuarios').textContent = usuarios.length;

  // Total de registros de mascotas
  const registros = JSON.parse(localStorage.getItem('registros') || '[]');
  document.getElementById('totalRegistros').textContent = registros.length;

  // Stock total
  const stockTotal = productos.reduce((total, producto) => total + producto.stock, 0);
  document.getElementById('stockTotal').textContent = stockTotal;
}

// ============= EVENTOS GENERALES =============

// Cerrar sesión
document.getElementById('btnCerrarSesion').addEventListener('click', () => {
  if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  }
});

// ============= FUNCIONES AUXILIARES =============

// Función para mostrar mensajes
function mostrarMensaje(tipo, mensaje) {
  const alerta = document.createElement('div');
  alerta.className = `alert alert-${tipo} position-fixed top-0 start-50 translate-middle-x mt-3`;
  alerta.style.zIndex = '9999';
  alerta.textContent = mensaje;
  
  document.body.appendChild(alerta);
  
  setTimeout(() => {
    if (document.body.contains(alerta)) {
      document.body.removeChild(alerta);
    }
  }, 3000);
}
