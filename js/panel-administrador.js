// ========================================
// PANEL ADMIN - CON GESTIÓN DE ROLES (5 FUNCIONES)
// ========================================

// FUNCIÓN 1: Verificar si es admin
function verificarAdmin() {
  var usuario = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
  
  if (!usuario.rol || usuario.rol !== 'administrador') {
    mostrarNotificacion('❌ Solo administradores pueden acceder', 'error');
    setTimeout(function() {
      window.location.href = '../user/iniciar-sesion.html';
    }, 1500);
    return false;
  }
  
  var nombreElement = document.getElementById('nombreAdmin');
  if (nombreElement) {
    nombreElement.textContent = usuario.nombre;
  }
  
  return true;
}

// ========================================
// INICIALIZACIÓN DE DATOS DE PRUEBA
// ========================================

function inicializarDatosPrueba() {
  // Inicializar usuarios de prueba si no existen
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  if (usuarios.length === 0) {
    usuarios = [
      {
        id: 1,
        run: '19011022K',
        nombre: 'Admin',
        apellidos: 'Sistema',
        email: 'admin@duoc.cl',
        fechaNacimiento: '1990-01-01',
        rol: 'administrador',
        region: 'Metropolitana',
        comuna: 'Santiago',
        direccion: 'Av. Principal 123',
        password: 'admin123',
        activo: true
      },
      {
        id: 2,
        run: '20123456K',
        nombre: 'Juan',
        apellidos: 'Pérez',
        email: 'cliente1@gmail.com',
        fechaNacimiento: '1995-05-15',
        rol: 'cliente',
        region: 'Valparaíso',
        comuna: 'Viña del Mar',
        direccion: 'Calle Secundaria 456',
        password: 'cliente123',
        activo: true
      }
    ];
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }
  
  // Inicializar productos si no existen
  var productos = JSON.parse(localStorage.getItem('productos') || '[]');
  if (productos.length === 0) {
    productos = [
      { id: 1, codigo: 'COM001', nombre: 'Comida para Perros Premium', descripcion: 'Alimento balanceado para perros adultos', precio: 15000, stock: 50, stockCritico: 10, categoria: 'Comida', imagen: 'assets/img/Comida.jpg' },
      { id: 2, codigo: 'CAM001', nombre: 'Cama para Mascotas', descripcion: 'Cama cómoda y resistente para mascotas', precio: 25000, stock: 20, stockCritico: 5, categoria: 'Accesorios', imagen: 'assets/img/cama2.png' },
      { id: 3, codigo: 'JUG001', nombre: 'Juguetes Variados', descripcion: 'Set de juguetes para entretenimiento', precio: 8000, stock: 30, stockCritico: 8, categoria: 'Juguetes', imagen: 'assets/img/jugetes.png' },
      { id: 4, codigo: 'HIG001', nombre: 'Productos de Higiene', descripcion: 'Kit completo de higiene para mascotas', precio: 12000, stock: 15, stockCritico: 3, categoria: 'Higiene', imagen: 'assets/img/higiene.png' },
      { id: 5, codigo: 'ACC001', nombre: 'Accesorios para Mascotas', descripcion: 'Variedad de accesorios útiles para el día a día con tu mascota', precio: 18000, stock: 25, stockCritico: 5, categoria: 'Accesorios', imagen: 'assets/img/accesorios.png' },
      { id: 6, codigo: 'SAL001', nombre: 'Productos de Salud', descripcion: 'Vitaminas y suplementos para mantener la salud de tu mascota', precio: 22000, stock: 18, stockCritico: 4, categoria: 'Salud', imagen: 'assets/img/salud.png' },
      { id: 7, codigo: 'PROD001', nombre: 'Producto Especial', descripcion: 'Producto premium para el cuidado especial de mascotas', precio: 35000, stock: 10, stockCritico: 2, categoria: 'Premium', imagen: 'assets/img/prod.png' }
    ];
    localStorage.setItem('productos', JSON.stringify(productos));
  }
}

// FUNCIÓN 2: Mostrar usuarios con roles
function mostrarUsuarios() {
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  var tabla = document.getElementById('tablaUsuarios');
  
  if (!tabla) return;
  
  var html = '';
  
  if (usuarios.length === 0) {
    html = '<tr><td colspan="6" class="text-center">No hay usuarios registrados</td></tr>';
  } else {
    for (var i = 0; i < usuarios.length; i++) {
      var u = usuarios[i];
      var colorRol = '';
      
      if (u.rol === 'administrador') colorRol = 'bg-danger text-white';
      else if (u.rol === 'vendedor') colorRol = 'bg-warning';
      else colorRol = 'bg-info text-white';
      
      html += '<tr>';
      html += '<td>' + u.id + '</td>';
      html += '<td>' + u.nombre + '</td>';
      html += '<td>' + u.email + '</td>';
      html += '<td><span class="badge ' + colorRol + '">' + u.rol.toUpperCase() + '</span></td>';
      html += '<td>' + (u.activo ? '✅ Activo' : '❌ Inactivo') + '</td>';
      html += '<td>';
      
      // Solo mostrar acciones si no es el admin actual
      var usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
      if (u.email !== usuarioActual.email) {
        html += '<select class="form-select form-select-sm d-inline-block me-2" style="width:auto" onchange="cambiarRol(' + u.id + ', this.value)">';
        html += '<option value="">Cambiar rol</option>';
        html += '<option value="cliente"' + (u.rol === 'cliente' ? ' selected' : '') + '>Cliente</option>';
        html += '<option value="vendedor"' + (u.rol === 'vendedor' ? ' selected' : '') + '>Vendedor</option>';
        html += '<option value="administrador"' + (u.rol === 'administrador' ? ' selected' : '') + '>Administrador</option>';
        html += '</select>';
        
        html += '<button class="btn btn-sm ' + (u.activo ? 'btn-warning' : 'btn-success') + ' me-1" onclick="cambiarEstado(' + u.id + ')">';
        html += u.activo ? 'Desactivar' : 'Activar';
        html += '</button>';
        
        html += '<button class="btn btn-danger btn-sm" onclick="eliminarUsuario(' + u.id + ')">Eliminar</button>';
      } else {
        html += '<small class="text-muted">Tu cuenta</small>';
      }
      
      html += '</td>';
      html += '</tr>';
    }
  }
  
  tabla.innerHTML = html;
  
  // Actualizar contador
  var totalUsuarios = document.getElementById('totalUsuarios');
  if (totalUsuarios) {
    totalUsuarios.textContent = usuarios.length;
  }
}

// FUNCIÓN 3: Cambiar rol de usuario
function cambiarRol(id, nuevoRol) {
  if (!nuevoRol) return;
  
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === id) {
      usuarios[i].rol = nuevoRol;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      mostrarNotificacion('✅ Rol cambiado a ' + nuevoRol.toUpperCase(), 'success');
      mostrarUsuarios();
      actualizarEstadisticas();
      return;
    }
  }
}

// FUNCIÓN 4: Cambiar estado de usuario (activo/inactivo)
function cambiarEstado(id) {
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === id) {
      usuarios[i].activo = !usuarios[i].activo;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      
      var estado = usuarios[i].activo ? 'ACTIVADO' : 'DESACTIVADO';
      mostrarNotificacion('✅ Usuario ' + estado, 'success');
      mostrarUsuarios();
      actualizarEstadisticas();
      return;
    }
  }
}

// FUNCIÓN 5: Eliminar usuario
function eliminarUsuario(id) {
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  var usuario = null;
  
  // Encontrar usuario
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === id) {
      usuario = usuarios[i];
      break;
    }
  }
  
  if (!usuario) return;
  
  mostrarConfirmacion('¿Eliminar usuario?', 'Se eliminará a ' + usuario.nombre + ' (' + usuario.email + ')', function() {
    var nuevosUsuarios = [];
    
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].id !== id) {
        nuevosUsuarios.push(usuarios[i]);
      }
    }
    
    localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
    mostrarNotificacion('✅ Usuario eliminado correctamente', 'success');
    mostrarUsuarios();
    actualizarEstadisticas();
  });
}

// ========================================
// FUNCIONES PARA GESTIÓN DE USUARIOS CRUD
// ========================================

// Abrir formulario para nuevo usuario
function abrirNuevoUsuario() {
  document.getElementById('usuarioId').value = '';
  document.getElementById('usuarioForm').reset();
  document.getElementById('usuarioFormTitle').textContent = '👤 Nuevo Usuario';
  document.getElementById('usuarioFormContainer').style.display = 'block';
  cargarRegiones();
}

// Editar usuario existente
function editarUsuario(id) {
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  var usuario = usuarios.find(function(u) { return u.id === id; });
  
  if (usuario) {
    document.getElementById('usuarioId').value = usuario.id;
    document.getElementById('usuarioRun').value = usuario.run || '';
    document.getElementById('usuarioNombre').value = usuario.nombre || '';
    document.getElementById('usuarioApellidos').value = usuario.apellidos || '';
    document.getElementById('usuarioEmail').value = usuario.email || '';
    document.getElementById('usuarioFechaNacimiento').value = usuario.fechaNacimiento || '';
    document.getElementById('usuarioRol').value = usuario.rol || '';
    document.getElementById('usuarioDireccion').value = usuario.direccion || '';
    document.getElementById('usuarioPassword').value = '';
    document.getElementById('usuarioPasswordConfirm').value = '';
    
    document.getElementById('usuarioFormTitle').textContent = '✏️ Editar Usuario';
    document.getElementById('usuarioFormContainer').style.display = 'block';
    
    cargarRegiones();
    setTimeout(function() {
      if (usuario.region) {
        document.getElementById('usuarioRegion').value = usuario.region;
        cargarComunas();
        setTimeout(function() {
          if (usuario.comuna) {
            document.getElementById('usuarioComuna').value = usuario.comuna;
          }
        }, 100);
      }
    }, 100);
  }
}

// Guardar usuario desde formulario
function guardarUsuarioFromForm() {
  var id = document.getElementById('usuarioId').value;
  var run = document.getElementById('usuarioRun').value.trim();
  var nombre = document.getElementById('usuarioNombre').value.trim();
  var apellidos = document.getElementById('usuarioApellidos').value.trim();
  var email = document.getElementById('usuarioEmail').value.trim();
  var fechaNacimiento = document.getElementById('usuarioFechaNacimiento').value;
  var rol = document.getElementById('usuarioRol').value;
  var region = document.getElementById('usuarioRegion').value;
  var comuna = document.getElementById('usuarioComuna').value;
  var direccion = document.getElementById('usuarioDireccion').value.trim();
  var password = document.getElementById('usuarioPassword').value;
  var passwordConfirm = document.getElementById('usuarioPasswordConfirm').value;
  
  // Validaciones
  if (!validarRUN(run)) {
    mostrarNotificacion('❌ RUN inválido', 'error');
    return;
  }
  
  if (!validarEmailAdmin(email)) {
    mostrarNotificacion('❌ Correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com', 'error');
    return;
  }
  
  if (password && password !== passwordConfirm) {
    mostrarNotificacion('❌ Las contraseñas no coinciden', 'error');
    return;
  }
  
  if (!run || !nombre || !apellidos || !email || !rol || !region || !comuna || !direccion) {
    mostrarNotificacion('❌ Complete todos los campos obligatorios', 'error');
    return;
  }
  
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  
  if (id) {
    // Editar existente
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].id == id) {
        usuarios[i] = {
          id: parseInt(id),
          run: run,
          nombre: nombre,
          apellidos: apellidos,
          email: email,
          fechaNacimiento: fechaNacimiento,
          rol: rol,
          region: region,
          comuna: comuna,
          direccion: direccion,
          activo: usuarios[i].activo
        };
        if (password) {
          usuarios[i].password = password;
        }
        break;
      }
    }
    mostrarNotificacion('✅ Usuario actualizado', 'success');
  } else {
    // Verificar si email ya existe
    var emailExiste = usuarios.some(function(u) { return u.email === email; });
    if (emailExiste) {
      mostrarNotificacion('❌ El correo ya está registrado', 'error');
      return;
    }
    
    // Nuevo usuario
    var nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    usuarios.push({
      id: nuevoId,
      run: run,
      nombre: nombre,
      apellidos: apellidos,
      email: email,
      fechaNacimiento: fechaNacimiento,
      rol: rol,
      region: region,
      comuna: comuna,
      direccion: direccion,
      password: password,
      activo: true
    });
    mostrarNotificacion('✅ Usuario creado', 'success');
  }
  
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  mostrarUsuarios();
  cancelarUsuario();
}

// Cancelar edición de usuario
function cancelarUsuario() {
  document.getElementById('usuarioFormContainer').style.display = 'none';
  document.getElementById('usuarioForm').reset();
}

// ========================================
// FUNCIONES DE VALIDACIÓN
// ========================================

// Validar RUN chileno
function validarRUN(run) {
  if (!run || run.length < 7 || run.length > 9) return false;
  
  // Solo números y K al final
  var regex = /^[0-9]+[0-9K]$/;
  if (!regex.test(run)) return false;
  
  // Algoritmo de validación de RUN
  var runLimpio = run.replace(/[^0-9K]/g, '');
  var runNumeros = runLimpio.slice(0, -1);
  var digitoVerificador = runLimpio.slice(-1).toUpperCase();
  
  var suma = 0;
  var multiplicador = 2;
  
  for (var i = runNumeros.length - 1; i >= 0; i--) {
    suma += parseInt(runNumeros[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  
  var resto = suma % 11;
  var digitoCalculado = 11 - resto;
  
  if (digitoCalculado === 11) digitoCalculado = 0;
  if (digitoCalculado === 10) digitoCalculado = 'K';
  
  return digitoCalculado.toString() === digitoVerificador;
}

// Validar email para admin
function validarEmailAdmin(email) {
  var dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
  return dominiosPermitidos.some(function(dominio) {
    return email.toLowerCase().endsWith(dominio);
  });
}

// ========================================
// FUNCIONES PARA REGIONES Y COMUNAS
// ========================================

// Cargar regiones
function cargarRegiones() {
  var selectRegion = document.getElementById('usuarioRegion');
  if (!selectRegion) return;
  
  selectRegion.innerHTML = '<option value="">Seleccionar región</option>';
  
  // Regiones de Chile
  var regiones = [
    'Arica y Parinacota',
    'Tarapacá', 
    'Antofagasta',
    'Atacama',
    'Coquimbo',
    'Valparaíso',
    'Metropolitana',
    'O\'Higgins',
    'Maule',
    'Ñuble',
    'Biobío',
    'Araucanía',
    'Los Ríos',
    'Los Lagos',
    'Aysén',
    'Magallanes'
  ];
  
  regiones.forEach(function(region) {
    var option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    selectRegion.appendChild(option);
  });
}

// Cargar comunas según región
function cargarComunas() {
  var region = document.getElementById('usuarioRegion').value;
  var selectComuna = document.getElementById('usuarioComuna');
  
  if (!selectComuna) return;
  
  selectComuna.innerHTML = '<option value="">Seleccionar comuna</option>';
  
  // Comunas por región (simplificado)
  var comunasPorRegion = {
    'Metropolitana': ['Santiago', 'Providencia', 'Las Condes', 'Ñuñoa', 'Maipú', 'Pudahuel'],
    'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Concón'],
    'Biobío': ['Concepción', 'Talcahuano', 'Chiguayante', 'San Pedro de la Paz', 'Hualpén'],
    'Maule': ['Talca', 'Curicó', 'Linares', 'Cauquenes', 'Parral']
  };
  
  var comunas = comunasPorRegion[region] || ['Comuna 1', 'Comuna 2', 'Comuna 3'];
  
  comunas.forEach(function(comuna) {
    var option = document.createElement('option');
    option.value = comuna;
    option.textContent = comuna;
    selectComuna.appendChild(option);
  });
}

// Mostrar productos en la tabla
function mostrarProductosAdmin() {
  var productos = obtenerProductos();
  var tabla = document.getElementById('tablaProductosAdmin');
  
  if (!tabla) return;
  
  var html = '';
  
  if (productos.length === 0) {
    html = '<tr><td colspan="6" class="text-center">No hay productos</td></tr>';
  } else {
    for (var i = 0; i < productos.length; i++) {
      var p = productos[i];
      var stockClass = p.stock <= p.stockCritico ? 'text-danger fw-bold' : '';
      
      html += '<tr>';
      html += '<td>' + p.id + '</td>';
      html += '<td>' + p.nombre + '</td>';
      html += '<td>$' + p.precio.toLocaleString() + '</td>';
      html += '<td><span class="' + stockClass + '">' + p.stock + '</span></td>';
      html += '<td>' + p.categoria + '</td>';
      html += '<td>';
      html += '<button class="btn btn-sm btn-warning me-1" onclick="editarProducto(' + p.id + ')">Editar</button>';
      html += '<button class="btn btn-sm btn-danger" onclick="eliminarProducto(' + p.id + ')">Eliminar</button>';
      html += '</td>';
      html += '</tr>';
    }
  }
  
  tabla.innerHTML = html;
  
  // Actualizar contador
  var totalProductos = document.getElementById('totalProductos');
  if (totalProductos) {
    totalProductos.textContent = productos.length;
  }
}

// Abrir formulario para nuevo producto
function abrirNuevoProducto() {
  document.getElementById('productoId').value = '';
  document.getElementById('productoForm').reset();
  document.getElementById('formTitle').textContent = '📝 Nuevo Producto';
  document.getElementById('productoFormContainer').style.display = 'block';
}

// Editar producto existente
function editarProducto(id) {
  var productos = obtenerProductos();
  var producto = productos.find(function(p) { return p.id === id; });
  
  if (producto) {
    document.getElementById('productoId').value = producto.id;
    document.getElementById('productoCodigo').value = producto.codigo;
    document.getElementById('productoNombre').value = producto.nombre;
    document.getElementById('productoDescripcion').value = producto.descripcion;
    document.getElementById('productoPrecio').value = producto.precio;
    document.getElementById('productoStock').value = producto.stock;
    document.getElementById('productoStockCritico').value = producto.stockCritico;
    document.getElementById('productoCategoria').value = producto.categoria;
    document.getElementById('productoImagen').value = producto.imagen;
    document.getElementById('formTitle').textContent = '✏️ Editar Producto';
    document.getElementById('productoFormContainer').style.display = 'block';
  }
}

// Guardar producto desde formulario
function guardarProductoFromForm() {
  var id = document.getElementById('productoId').value;
  var codigo = document.getElementById('productoCodigo').value.trim();
  var nombre = document.getElementById('productoNombre').value.trim();
  var descripcion = document.getElementById('productoDescripcion').value.trim();
  var precio = parseFloat(document.getElementById('productoPrecio').value);
  var stock = parseInt(document.getElementById('productoStock').value);
  var stockCritico = parseInt(document.getElementById('productoStockCritico').value) || 0;
  var categoria = document.getElementById('productoCategoria').value.trim();
  var imagen = document.getElementById('productoImagen').value.trim();
  
  // Validaciones según requerimientos
  if (!codigo || codigo.length < 3) {
    mostrarNotificacion('❌ Código debe tener al menos 3 caracteres', 'error');
    return;
  }
  
  if (!nombre || nombre.length > 100) {
    mostrarNotificacion('❌ Nombre requerido y máximo 100 caracteres', 'error');
    return;
  }
  
  if (!precio || precio < 0) {
    mostrarNotificacion('❌ Precio requerido y debe ser mayor o igual a 0', 'error');
    return;
  }
  
  if (!stock || stock < 0) {
    mostrarNotificacion('❌ Stock requerido y debe ser mayor o igual a 0', 'error');
    return;
  }
  
  if (!categoria) {
    mostrarNotificacion('❌ Categoría requerida', 'error');
    return;
  }
  
  var productos = obtenerProductos();
  
  if (id) {
    // Editar existente
    for (var i = 0; i < productos.length; i++) {
      if (productos[i].id == id) {
        productos[i] = {
          id: parseInt(id),
          codigo: codigo,
          nombre: nombre,
          descripcion: descripcion,
          precio: precio,
          stock: stock,
          stockCritico: stockCritico,
          categoria: categoria,
          imagen: imagen || 'assets/img/prod.png'
        };
        break;
      }
    }
    mostrarNotificacion('✅ Producto actualizado', 'success');
  } else {
    // Nuevo producto
    var nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    productos.push({
      id: nuevoId,
      codigo: codigo,
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      stock: stock,
      stockCritico: stockCritico,
      categoria: categoria,
      imagen: imagen || 'assets/img/prod.png'
    });
    mostrarNotificacion('✅ Producto creado', 'success');
  }
  
  guardarProductos(productos);
  mostrarProductosAdmin();
  actualizarEstadisticas();
  cancelarProducto();
}

// Cancelar edición de producto
function cancelarProducto() {
  document.getElementById('productoFormContainer').style.display = 'none';
  document.getElementById('productoForm').reset();
}

// Eliminar producto
function eliminarProducto(id) {
  mostrarConfirmacion('¿Eliminar producto?', 'Esta acción no se puede deshacer', function() {
    var productos = obtenerProductos();
    var nuevosProductos = productos.filter(function(p) { return p.id !== id; });
    guardarProductos(nuevosProductos);
    mostrarNotificacion('✅ Producto eliminado', 'success');
    mostrarProductosAdmin();
    actualizarEstadisticas();
  });
}

// Función para mostrar sección
function showSection(seccion) {
  // Ocultar todas las secciones
  document.getElementById('seccion-dashboard').style.display = 'none';
  document.getElementById('seccion-usuarios').style.display = 'none';
  document.getElementById('seccion-productos').style.display = 'none';
  
  // Remover clase active de todos los menús
  var menus = ['menu-dashboard', 'menu-usuarios', 'menu-productos'];
  menus.forEach(function(menuId) {
    var menu = document.getElementById(menuId);
    if (menu) menu.classList.remove('active');
  });
  
  // Mostrar sección seleccionada y activar menú
  if (seccion === 'dashboard') {
    document.getElementById('seccion-dashboard').style.display = 'block';
    document.getElementById('menu-dashboard').classList.add('active');
    actualizarEstadisticas();
  } else if (seccion === 'usuarios') {
    document.getElementById('seccion-usuarios').style.display = 'block';
    document.getElementById('menu-usuarios').classList.add('active');
    mostrarUsuarios();
  } else if (seccion === 'productos') {
    document.getElementById('seccion-productos').style.display = 'block';
    document.getElementById('menu-productos').classList.add('active');
    mostrarProductosAdmin();
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
  inicializarDatosPrueba();
  if (verificarAdmin()) {
    // Cargar datos iniciales
    mostrarUsuarios();
    mostrarProductosAdmin();
    actualizarEstadisticas();
    // Mostrar dashboard por defecto
    showSection('dashboard');
  }
});

// ========================================
// NUEVAS FUNCIONES PARA DASHBOARD
// ========================================

// FUNCIÓN PARA MOSTRAR SECCIONES CON DASHBOARD
function showSection(seccion) {
  // Ocultar todas las secciones
  document.getElementById('seccion-dashboard').style.display = 'none';
  document.getElementById('seccion-usuarios').style.display = 'none';
  document.getElementById('seccion-productos').style.display = 'none';
  
  // Remover clase active de todos los menús
  var menus = ['menu-dashboard', 'menu-usuarios', 'menu-productos'];
  menus.forEach(function(menuId) {
    var menu = document.getElementById(menuId);
    if (menu) menu.classList.remove('active');
  });
  
  // Mostrar sección seleccionada y activar menú
  if (seccion === 'dashboard') {
    document.getElementById('seccion-dashboard').style.display = 'block';
    document.getElementById('menu-dashboard').classList.add('active');
    actualizarEstadisticas();
  } else if (seccion === 'usuarios') {
    document.getElementById('seccion-usuarios').style.display = 'block';
    document.getElementById('menu-usuarios').classList.add('active');
    mostrarUsuarios();
  } else if (seccion === 'productos') {
    document.getElementById('seccion-productos').style.display = 'block';
    document.getElementById('menu-productos').classList.add('active');
    mostrarProductosAdmin();
  }
}

// FUNCIÓN PARA ACTUALIZAR ESTADÍSTICAS DEL DASHBOARD
function actualizarEstadisticas() {
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  var productos = JSON.parse(localStorage.getItem('productos') || '[]');
  
  // Contar usuarios por rol
  var totalUsuarios = usuarios.length;
  var productosStockBajo = productos.filter(function(p) {
    return p.stock <= (p.stockCritico || 0);
  }).length;
  var productosActivos = productos.filter(function(p) {
    return p.stock > 0;
  }).length;
  
  // Actualizar elementos del DOM
  var elementos = ['totalUsuarios', 'totalProductos', 'productosStockBajo', 'productosActivos'];
  var valores = [totalUsuarios, productos.length, productosStockBajo, productosActivos];
  
  elementos.forEach(function(id, index) {
    var elemento = document.getElementById(id);
    if (elemento) {
      elemento.textContent = valores[index];
    }
  });
}