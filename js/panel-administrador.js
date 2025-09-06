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
  });
}

// ========================================
// FUNCIONES PARA GESTIÓN DE PRODUCTOS
// ========================================

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
  document.getElementById('productoForm').style.display = 'block';
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
    document.getElementById('productoForm').style.display = 'block';
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
  
  // Validaciones básicas
  if (!codigo || !nombre || !precio || !stock || !categoria) {
    mostrarNotificacion('❌ Complete todos los campos obligatorios', 'error');
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
          imagen: imagen
        };
        break;
      }
    }
    mostrarNotificacion('✅ Producto actualizado', 'success');
  } else {
    // Nuevo producto
    var nuevoId = Math.max(...productos.map(p => p.id)) + 1;
    productos.push({
      id: nuevoId,
      codigo: codigo,
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      stock: stock,
      stockCritico: stockCritico,
      categoria: categoria,
      imagen: imagen
    });
    mostrarNotificacion('✅ Producto creado', 'success');
  }
  
  guardarProductos(productos);
  mostrarProductosAdmin();
  cancelarProducto();
}

// Cancelar edición de producto
function cancelarProducto() {
  document.getElementById('productoForm').style.display = 'none';
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
  });
}

// Función para mostrar sección
function showSection(seccion) {
  // Ocultar todas las secciones
  document.getElementById('seccion-usuarios').style.display = 'none';
  document.getElementById('seccion-productos').style.display = 'none';
  
  // Mostrar sección seleccionada
  if (seccion === 'usuarios') {
    document.getElementById('seccion-usuarios').style.display = 'block';
    mostrarUsuarios();
  } else if (seccion === 'productos') {
    document.getElementById('seccion-productos').style.display = 'block';
    mostrarProductosAdmin();
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
  if (verificarAdmin()) {
    mostrarUsuarios();
    // Mostrar sección de usuarios por defecto
    showSection('usuarios');
  }
});
