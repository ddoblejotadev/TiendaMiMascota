// ===========================================
// PANEL DE ADMINISTRADOR - TIENDA MIMASCOTA
// Código simple para principiantes
// ===========================================

// Lista de categorías para productos
const categorias = ['comida', 'juguetes', 'camas', 'salud', 'accesorios', 'higiene'];

// Lista de tipos de usuario
const tiposUsuario = ['cliente', 'vendedor', 'administrador'];

// Variables simples para almacenar datos
let productos = [];
let usuarios = [];

// ===========================================
// VERIFICAR ACCESO DE ADMINISTRADOR
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('Panel de administrador cargado');
  
  // Verificar si hay usuario logueado
  const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || 'null');
  
  if (!usuarioActual) {
    alert('Debes iniciar sesión');
    window.location.href = '../user/iniciar-sesion.html';
    return;
  }
  
  // Verificar si es administrador
  const esAdmin = usuarioActual.email && usuarioActual.email.includes('@admin.cl');
  
  if (!esAdmin) {
    alert('No tienes permisos de administrador');
    window.location.href = '../user/panel-usuario.html';
    return;
  }
  
  // Mostrar nombre del admin
  const nombreAdmin = document.getElementById('adminNombre');
  if (nombreAdmin) {
    nombreAdmin.textContent = 'Admin: ' + usuarioActual.nombre;
  }
  
  // Cargar datos
  cargarProductos();
  cargarUsuarios();
  llenarCategorias();
  llenarTiposUsuario();
  
  console.log('Panel inicializado');
});

// ===========================================
// FUNCIÓN PARA CERRAR SESIÓN
// ===========================================

function cerrarSesion() {
  localStorage.removeItem('usuarioActual');
  window.location.href = '../user/iniciar-sesion.html';
}

// ===========================================
// FUNCIONES PARA PRODUCTOS
// ===========================================

// Cargar productos desde localStorage
function cargarProductos() {
  productos = JSON.parse(localStorage.getItem('productos') || '[]');
  
  // Si no hay productos, crear algunos por defecto
  if (productos.length === 0) {
    productos = [
      {
        id: 1,
        codigo: 'ALI001',
        nombre: 'Alimento Premium para Perros',
        descripcion: 'Alimento balanceado premium para perros adultos.',
        precio: 15990,
        stock: 50,
        stockCritico: 10,
        categoria: 'comida',
        imagen: '../../assets/img/Comida.jpg'
      },
      {
        id: 2,
        codigo: 'JUG001',
        nombre: 'Juguetes Divertidos',
        descripcion: 'Set de pelotas y juguetes para tu mascota.',
        precio: 5990,
        stock: 30,
        stockCritico: 5,
        categoria: 'juguetes',
        imagen: '../../assets/img/jugetes.png'
      }
    ];
    guardarProductos();
  }
  
  mostrarProductos();
}

// Guardar productos en localStorage
function guardarProductos() {
  localStorage.setItem('productos', JSON.stringify(productos));
}

// Mostrar lista de productos
function mostrarProductos() {
  const contenedor = document.getElementById('listaProductos');
  if (!contenedor) return;
  
  let html = '';
  
  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];
    const alertaStock = producto.stock <= producto.stockCritico ? 'text-danger' : '';
    
    html += `
      <tr>
        <td>${producto.codigo}</td>
        <td>${producto.nombre}</td>
        <td>$${producto.precio.toLocaleString()}</td>
        <td class="${alertaStock}">${producto.stock}</td>
        <td>${producto.categoria}</td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="editarProducto(${producto.id})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${producto.id})">Eliminar</button>
        </td>
      </tr>
    `;
  }
  
  contenedor.innerHTML = html;
}

// Función para crear nuevo producto
function nuevoProducto() {
  document.getElementById('productoForm').reset();
  document.getElementById('productoId').value = '';
  document.getElementById('modalProducto').style.display = 'block';
}

// Función para editar producto
function editarProducto(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;
  
  document.getElementById('productoId').value = producto.id;
  document.getElementById('productoCodigo').value = producto.codigo;
  document.getElementById('productoNombre').value = producto.nombre;
  document.getElementById('productoDescripcion').value = producto.descripcion;
  document.getElementById('productoPrecio').value = producto.precio;
  document.getElementById('productoStock').value = producto.stock;
  document.getElementById('productoStockCritico').value = producto.stockCritico;
  document.getElementById('productoCategoria').value = producto.categoria;
  
  document.getElementById('modalProducto').style.display = 'block';
}

// Función para guardar producto
function guardarProducto() {
  const id = document.getElementById('productoId').value;
  const codigo = document.getElementById('productoCodigo').value.trim();
  const nombre = document.getElementById('productoNombre').value.trim();
  const descripcion = document.getElementById('productoDescripcion').value.trim();
  const precio = parseFloat(document.getElementById('productoPrecio').value);
  const stock = parseInt(document.getElementById('productoStock').value);
  const stockCritico = parseInt(document.getElementById('productoStockCritico').value) || 0;
  const categoria = document.getElementById('productoCategoria').value;
  
  // Validaciones simples
  if (!codigo || !nombre || !precio || !stock || !categoria) {
    alert('Todos los campos marcados con * son obligatorios');
    return;
  }
  
  if (codigo.length < 3) {
    alert('El código debe tener al menos 3 caracteres');
    return;
  }
  
  if (nombre.length > 100) {
    alert('El nombre no puede tener más de 100 caracteres');
    return;
  }
  
  if (precio < 0) {
    alert('El precio no puede ser negativo');
    return;
  }
  
  if (stock < 0) {
    alert('El stock no puede ser negativo');
    return;
  }
  
  // Crear o actualizar producto
  if (id) {
    // Editar producto existente
    const index = productos.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      productos[index] = {
        id: parseInt(id),
        codigo,
        nombre,
        descripcion,
        precio,
        stock,
        stockCritico,
        categoria,
        imagen: productos[index].imagen || ''
      };
    }
  } else {
    // Crear nuevo producto
    const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    productos.push({
      id: nuevoId,
      codigo,
      nombre,
      descripcion,
      precio,
      stock,
      stockCritico,
      categoria,
      imagen: ''
    });
  }
  
  guardarProductos();
  mostrarProductos();
  cerrarModal('modalProducto');
  alert('Producto guardado correctamente');
}

// Función para eliminar producto
function eliminarProducto(id) {
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    productos = productos.filter(p => p.id !== id);
    guardarProductos();
    mostrarProductos();
    alert('Producto eliminado');
  }
}

// ===========================================
// FUNCIONES PARA USUARIOS
// ===========================================

// Cargar usuarios desde localStorage
function cargarUsuarios() {
  usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  mostrarUsuarios();
}

// Guardar usuarios en localStorage
function guardarUsuarios() {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Mostrar lista de usuarios
function mostrarUsuarios() {
  const contenedor = document.getElementById('listaUsuarios');
  if (!contenedor) return;
  
  let html = '';
  
  for (let i = 0; i < usuarios.length; i++) {
    const usuario = usuarios[i];
    
    html += `
      <tr>
        <td>${usuario.rut}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.email}</td>
        <td>${usuario.tipoUsuario || 'cliente'}</td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="editarUsuario('${usuario.email}')">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarUsuario('${usuario.email}')">Eliminar</button>
        </td>
      </tr>
    `;
  }
  
  contenedor.innerHTML = html;
}

// Función para crear nuevo usuario
function nuevoUsuario() {
  document.getElementById('usuarioForm').reset();
  document.getElementById('usuarioEmailOriginal').value = '';
  document.getElementById('modalUsuario').style.display = 'block';
}

// Función para editar usuario
function editarUsuario(email) {
  const usuario = usuarios.find(u => u.email === email);
  if (!usuario) return;
  
  document.getElementById('usuarioEmailOriginal').value = usuario.email;
  document.getElementById('usuarioRut').value = usuario.rut;
  document.getElementById('usuarioNombre').value = usuario.nombre;
  document.getElementById('usuarioApellidos').value = usuario.apellidos || '';
  document.getElementById('usuarioEmail').value = usuario.email;
  document.getElementById('usuarioFechaNacimiento').value = usuario.fechaNacimiento || '';
  document.getElementById('usuarioTipo').value = usuario.tipoUsuario || 'cliente';
  document.getElementById('usuarioRegion').value = usuario.region || '';
  document.getElementById('usuarioComuna').value = usuario.comuna || '';
  document.getElementById('usuarioDireccion').value = usuario.direccion || '';
  
  document.getElementById('modalUsuario').style.display = 'block';
}

// Función para guardar usuario
function guardarUsuario() {
  const emailOriginal = document.getElementById('usuarioEmailOriginal').value;
  const rut = document.getElementById('usuarioRut').value.trim();
  const nombre = document.getElementById('usuarioNombre').value.trim();
  const apellidos = document.getElementById('usuarioApellidos').value.trim();
  const email = document.getElementById('usuarioEmail').value.trim();
  const fechaNacimiento = document.getElementById('usuarioFechaNacimiento').value;
  const tipoUsuario = document.getElementById('usuarioTipo').value;
  const region = document.getElementById('usuarioRegion').value;
  const comuna = document.getElementById('usuarioComuna').value;
  const direccion = document.getElementById('usuarioDireccion').value.trim();
  
  // Validaciones simples
  if (!rut || !nombre || !apellidos || !email || !direccion) {
    alert('Todos los campos marcados con * son obligatorios');
    return;
  }
  
  if (rut.length < 7 || rut.length > 9) {
    alert('El RUT debe tener entre 7 y 9 caracteres');
    return;
  }
  
  if (nombre.length > 50) {
    alert('El nombre no puede tener más de 50 caracteres');
    return;
  }
  
  if (apellidos.length > 100) {
    alert('Los apellidos no pueden tener más de 100 caracteres');
    return;
  }
  
  if (!email.includes('@') || !['duoc.cl', 'profesor.duoc.cl', 'gmail.com'].some(d => email.endsWith(d))) {
    alert('Solo se permiten emails @duoc.cl, @profesor.duoc.cl, @gmail.com');
    return;
  }
  
  if (direccion.length > 300) {
    alert('La dirección no puede tener más de 300 caracteres');
    return;
  }
  
  // Verificar email único (si es nuevo o cambió)
  if (!emailOriginal || emailOriginal !== email) {
    if (usuarios.find(u => u.email === email)) {
      alert('Ya existe un usuario con este email');
      return;
    }
  }
  
  // Crear o actualizar usuario
  if (emailOriginal) {
    // Editar usuario existente
    const index = usuarios.findIndex(u => u.email === emailOriginal);
    if (index !== -1) {
      usuarios[index] = {
        ...usuarios[index],
        rut,
        nombre,
        apellidos,
        email,
        fechaNacimiento,
        tipoUsuario,
        region,
        comuna,
        direccion
      };
    }
  } else {
    // Crear nuevo usuario
    usuarios.push({
      rut,
      nombre,
      apellidos,
      email,
      password: '123456', // Contraseña por defecto
      fechaNacimiento,
      tipoUsuario,
      region,
      comuna,
      direccion,
      fechaRegistro: new Date().toISOString()
    });
  }
  
  guardarUsuarios();
  mostrarUsuarios();
  cerrarModal('modalUsuario');
  alert('Usuario guardado correctamente');
}

// Función para eliminar usuario
function eliminarUsuario(email) {
  if (confirm('¿Estás seguro de eliminar este usuario?')) {
    usuarios = usuarios.filter(u => u.email !== email);
    guardarUsuarios();
    mostrarUsuarios();
    alert('Usuario eliminado');
  }
}

// ===========================================
// FUNCIONES AUXILIARES
// ===========================================

// Llenar select de categorías
function llenarCategorias() {
  const select = document.getElementById('productoCategoria');
  if (!select) return;
  
  select.innerHTML = '<option value="">Selecciona una categoría</option>';
  for (let i = 0; i < categorias.length; i++) {
    const option = document.createElement('option');
    option.value = categorias[i];
    option.textContent = categorias[i];
    select.appendChild(option);
  }
}

// Llenar select de tipos de usuario
function llenarTiposUsuario() {
  const select = document.getElementById('usuarioTipo');
  if (!select) return;
  
  for (let i = 0; i < tiposUsuario.length; i++) {
    const option = document.createElement('option');
    option.value = tiposUsuario[i];
    option.textContent = tiposUsuario[i];
    select.appendChild(option);
  }
}

// Cerrar modal
function cerrarModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

console.log('Panel de administrador listo');
