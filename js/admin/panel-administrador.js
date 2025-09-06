// ========================================
// PANEL ADMIN BÁSICO - CRUD SIMPLE
// ========================================

// FUNCIÓN 1: Verificar si es administrador
function verificarAdmin() {
  var usuario = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
  
  if (!usuario.tipoUsuario || usuario.tipoUsuario !== 'Administrador') {
    alert('Solo administradores pueden acceder');
    window.location.href = '../user/iniciar-sesion.html';
    return false;
  }
  
  document.getElementById('nombreAdmin').textContent = usuario.nombre;
  return true;
}

// FUNCIÓN 2: Mostrar usuarios
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
      
      html += '<tr>';
      html += '<td>' + u.id + '</td>';
      html += '<td>' + u.nombre + '</td>';
      html += '<td>' + u.email + '</td>';
      html += '<td>' + u.tipoUsuario + '</td>';
      html += '<td>Activo</td>';
      html += '<td><button class="btn btn-danger btn-sm" onclick="eliminarUsuario(' + u.id + ')">Eliminar</button></td>';
      html += '</tr>';
    }
  }
  
  tabla.innerHTML = html;
  
  // Actualizar contador
  document.getElementById('totalUsuarios').textContent = usuarios.length;
}

// FUNCIÓN 3: Eliminar usuario
function eliminarUsuario(id) {
  if (confirm('¿Eliminar este usuario?')) {
    var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    var nuevosUsuarios = [];
    
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].id !== id) {
        nuevosUsuarios.push(usuarios[i]);
      }
    }
    
    localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
    alert('Usuario eliminado');
    mostrarUsuarios();
  }
}

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
  if (verificarAdmin()) {
    mostrarUsuarios();
  }
});