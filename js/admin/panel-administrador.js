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

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
  if (verificarAdmin()) {
    mostrarUsuarios();
  }
});
