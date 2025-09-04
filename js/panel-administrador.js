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
    window.location.href = '../user/iniciar-sesion.html';
    return;
  }
  
  // Verificar si es admin (email con @admin.cl)
  const esAdmin = usuarioActual.email?.includes('@admin.cl');
  
  if (!esAdmin) {
    alert('No tienes permisos de administrador');
    window.location.href = '../user/panel-usuario.html';
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

// Función para mostrar formulario de producto
function mostrarFormularioProducto() {
  const formHtml = `
    <div class="modal fade" id="modalProducto" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="tituloModal">Agregar Producto</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form id="formProducto">
              <input type="hidden" id="productoId">
              <div class="mb-3">
                <label for="codigoProducto" class="form-label">Código Producto *</label>
                <input type="text" class="form-control" id="codigoProducto" required minlength="3">
              </div>
              <div class="mb-3">
                <label for="nombreProducto" class="form-label">Nombre *</label>
                <input type="text" class="form-control" id="nombreProducto" required maxlength="100">
              </div>
              <div class="mb-3">
                <label for="descripcionProducto" class="form-label">Descripción</label>
                <textarea class="form-control" id="descripcionProducto" maxlength="500"></textarea>
              </div>
              <div class="mb-3">
                <label for="precioProducto" class="form-label">Precio *</label>
                <input type="number" class="form-control" id="precioProducto" required min="0" step="0.01">
              </div>
              <div class="mb-3">
                <label for="stockProducto" class="form-label">Stock *</label>
                <input type="number" class="form-control" id="stockProducto" required min="0">
              </div>
              <div class="mb-3">
                <label for="stockCriticoProducto" class="form-label">Stock Crítico</label>
                <input type="number" class="form-control" id="stockCriticoProducto" min="0">
              </div>
              <div class="mb-3">
                <label for="categoriaProducto" class="form-label">Categoría *</label>
                <select class="form-select" id="categoriaProducto" required>
                  <option value="">Seleccionar</option>
                  <option value="comida">Comida</option>
                  <option value="juguetes">Juguetes</option>
                  <option value="camas">Camas</option>
                  <option value="salud">Salud</option>
                  <option value="accesorios">Accesorios</option>
                  <option value="higiene">Higiene</option>
                  <option value="especial">Especial</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="imagenProducto" class="form-label">Imagen</label>
                <input type="text" class="form-control" id="imagenProducto" placeholder="assets/img/imagen.jpg">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" onclick="guardarProducto()">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', formHtml);
  const modal = new bootstrap.Modal(document.getElementById('modalProducto'));
  modal.show();
}

// Función para guardar producto
function guardarProducto() {
  const id = document.getElementById('productoId').value;
  const codigo = document.getElementById('codigoProducto').value.trim();
  const nombre = document.getElementById('nombreProducto').value.trim();
  const descripcion = document.getElementById('descripcionProducto').value.trim();
  const precio = parseFloat(document.getElementById('precioProducto').value);
  const stock = parseInt(document.getElementById('stockProducto').value);
  const stockCritico = parseInt(document.getElementById('stockCriticoProducto').value) || 0;
  const categoria = document.getElementById('categoriaProducto').value;
  const imagen = document.getElementById('imagenProducto').value.trim() || 'assets/img/producto-default.png';

  // Validaciones
  if (!codigo || codigo.length < 3) {
    alert('Código debe tener al menos 3 caracteres');
    return;
  }
  if (!nombre || nombre.length > 100) {
    alert('Nombre es requerido y máximo 100 caracteres');
    return;
  }
  if (descripcion.length > 500) {
    alert('Descripción máximo 500 caracteres');
    return;
  }
  if (isNaN(precio) || precio < 0) {
    alert('Precio debe ser un número mayor o igual a 0');
    return;
  }
  if (isNaN(stock) || stock < 0) {
    alert('Stock debe ser un número entero mayor o igual a 0');
    return;
  }
  if (!categoria) {
    alert('Categoría es requerida');
    return;
  }

  const producto = {
    id: id ? parseInt(id) : Date.now(),
    codigo: codigo,
    nombre: nombre,
    descripcion: descripcion,
    precio: precio,
    stock: stock,
    stockCritico: stockCritico,
    categoria: categoria,
    imagen: imagen
  };

  if (id) {
    // Editar
    const index = productos.findIndex(p => p.id == id);
    if (index !== -1) {
      productos[index] = producto;
    }
  } else {
    // Nuevo
    productos.push(producto);
  }

  // Guardar en localStorage
  localStorage.setItem('productos', JSON.stringify(productos));

  // Cerrar modal y recargar
  const modal = bootstrap.Modal.getInstance(document.getElementById('modalProducto'));
  modal.hide();
  cargarProductos();
  cargarEstadisticas();
  alert('Producto guardado correctamente');
}

// Función para editar producto
function editarProducto(id) {
  const producto = productos.find(p => p.id == id);
  if (!producto) return;

  mostrarFormularioProducto();
  document.getElementById('tituloModal').textContent = 'Editar Producto';
  document.getElementById('productoId').value = producto.id;
  document.getElementById('codigoProducto').value = producto.codigo || '';
  document.getElementById('nombreProducto').value = producto.nombre;
  document.getElementById('descripcionProducto').value = producto.descripcion || '';
  document.getElementById('precioProducto').value = producto.precio;
  document.getElementById('stockProducto').value = producto.stock;
  document.getElementById('stockCriticoProducto').value = producto.stockCritico || '';
  document.getElementById('categoriaProducto').value = producto.categoria;
  document.getElementById('imagenProducto').value = producto.imagen || '';
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

// Función para mostrar formulario de usuario
function mostrarFormularioUsuario() {
  const formHtml = `
    <div class="modal fade" id="modalUsuario" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="tituloModalUsuario">Agregar Usuario</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form id="formUsuario">
              <input type="hidden" id="usuarioId">
              <div class="mb-3">
                <label for="rutUsuario" class="form-label">RUT *</label>
                <input type="text" class="form-control" id="rutUsuario" required placeholder="12345678K">
              </div>
              <div class="mb-3">
                <label for="nombreUsuario" class="form-label">Nombre *</label>
                <input type="text" class="form-control" id="nombreUsuario" required maxlength="50">
              </div>
              <div class="mb-3">
                <label for="apellidosUsuario" class="form-label">Apellidos *</label>
                <input type="text" class="form-control" id="apellidosUsuario" required maxlength="100">
              </div>
              <div class="mb-3">
                <label for="emailUsuario" class="form-label">Correo *</label>
                <input type="email" class="form-control" id="emailUsuario" required maxlength="100">
              </div>
              <div class="mb-3">
                <label for="fechaNacimientoUsuario" class="form-label">Fecha Nacimiento</label>
                <input type="date" class="form-control" id="fechaNacimientoUsuario">
              </div>
              <div class="mb-3">
                <label for="tipoUsuario" class="form-label">Tipo Usuario *</label>
                <select class="form-select" id="tipoUsuario" required>
                  <option value="">Seleccionar</option>
                  <option value="cliente">Cliente</option>
                  <option value="vendedor">Vendedor</option>
                  <option value="administrador">Administrador</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="regionUsuario" class="form-label">Región *</label>
                <select class="form-select" id="regionUsuario" required>
                  <option value="">Seleccionar</option>
                  <option value="Región Metropolitana">Región Metropolitana</option>
                  <option value="Región de Valparaíso">Región de Valparaíso</option>
                  <option value="Región del Biobío">Región del Biobío</option>
                  <option value="Región de La Araucanía">Región de La Araucanía</option>
                  <option value="Región de Los Lagos">Región de Los Lagos</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="comunaUsuario" class="form-label">Comuna *</label>
                <select class="form-select" id="comunaUsuario" required>
                  <option value="">Seleccionar comuna</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="direccionUsuario" class="form-label">Dirección *</label>
                <input type="text" class="form-control" id="direccionUsuario" required maxlength="300">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" onclick="guardarUsuario()">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', formHtml);
  const modal = new bootstrap.Modal(document.getElementById('modalUsuario'));
  modal.show();

  // Llenar comunas al cambiar región
  document.getElementById('regionUsuario').addEventListener('change', function() {
    const region = this.value;
    const comunaSelect = document.getElementById('comunaUsuario');
    comunaSelect.innerHTML = '<option value="">Seleccionar comuna</option>';
    if (region && regionesYcomunas[region]) {
      regionesYcomunas[region].forEach(comuna => {
        const option = document.createElement('option');
        option.value = comuna;
        option.textContent = comuna;
        comunaSelect.appendChild(option);
      });
    }
  });
}

// Función para guardar usuario
function guardarUsuario() {
  const id = document.getElementById('usuarioId').value;
  const rut = document.getElementById('rutUsuario').value.trim();
  const nombre = document.getElementById('nombreUsuario').value.trim();
  const apellidos = document.getElementById('apellidosUsuario').value.trim();
  const email = document.getElementById('emailUsuario').value.trim();
  const fechaNacimiento = document.getElementById('fechaNacimientoUsuario').value;
  const tipoUsuario = document.getElementById('tipoUsuario').value;
  const region = document.getElementById('regionUsuario').value;
  const comuna = document.getElementById('comunaUsuario').value;
  const direccion = document.getElementById('direccionUsuario').value.trim();

  // Validaciones
  if (!rut || !validarRUT(rut)) {
    alert('RUT es requerido y debe ser válido');
    return;
  }
  if (!nombre || nombre.length > 50) {
    alert('Nombre es requerido y máximo 50 caracteres');
    return;
  }
  if (!apellidos || apellidos.length > 100) {
    alert('Apellidos son requeridos y máximo 100 caracteres');
    return;
  }
  if (!email || email.length > 100 || !validarEmail(email)) {
    alert('Email es requerido, máximo 100 caracteres y dominios permitidos');
    return;
  }
  if (!tipoUsuario) {
    alert('Tipo de usuario es requerido');
    return;
  }
  if (!region || !comuna) {
    alert('Región y comuna son requeridas');
    return;
  }
  if (!direccion || direccion.length > 300) {
    alert('Dirección es requerida y máximo 300 caracteres');
    return;
  }

  const usuario = {
    rut: rut,
    nombre: nombre,
    apellidos: apellidos,
    email: email,
    fechaNacimiento: fechaNacimiento,
    tipoUsuario: tipoUsuario,
    region: region,
    comuna: comuna,
    direccion: direccion,
    fechaRegistro: new Date().toISOString()
  };

  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  if (id) {
    // Editar
    const index = usuarios.findIndex(u => u.rut === id);
    if (index !== -1) {
      usuarios[index] = usuario;
    }
  } else {
    // Nuevo
    const existe = usuarios.find(u => u.rut === rut || u.email === email);
    if (existe) {
      alert('Ya existe un usuario con ese RUT o email');
      return;
    }
    usuarios.push(usuario);
  }

  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  // Cerrar modal y recargar
  const modal = bootstrap.Modal.getInstance(document.getElementById('modalUsuario'));
  modal.hide();
  cargarUsuarios();
  cargarEstadisticas();
  alert('Usuario guardado correctamente');
}

// Función para editar usuario
function editarUsuario(index) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const usuario = usuarios[index];
  if (!usuario) return;

  mostrarFormularioUsuario();
  document.getElementById('tituloModalUsuario').textContent = 'Editar Usuario';
  document.getElementById('usuarioId').value = usuario.rut;
  document.getElementById('rutUsuario').value = usuario.rut;
  document.getElementById('nombreUsuario').value = usuario.nombre;
  document.getElementById('apellidosUsuario').value = usuario.apellidos || '';
  document.getElementById('emailUsuario').value = usuario.email;
  document.getElementById('fechaNacimientoUsuario').value = usuario.fechaNacimiento || '';
  document.getElementById('tipoUsuario').value = usuario.tipoUsuario || 'cliente';
  document.getElementById('regionUsuario').value = usuario.region;
  document.getElementById('direccionUsuario').value = usuario.direccion || '';

  // Trigger change para cargar comunas
  document.getElementById('regionUsuario').dispatchEvent(new Event('change'));
  setTimeout(() => {
    document.getElementById('comunaUsuario').value = usuario.comuna;
  }, 100);
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
