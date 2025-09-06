// ========================================
// PANEL ADMIN - SOLO 3 FUNCIONES ESPECÍFICAS
// ========================================

// FUNCIÓN 1: Verificar si es admin
function verificarAdmin() {
  var usuario = localStorage.getItem('usuarioActual');
  if (!usuario) {
    mostrarNotificacion('❌ Debes iniciar sesión', 'error');
    setTimeout(function() {
      window.location.href = '../user/iniciar-sesion.html';
    }, 1500);
    return;
  }
  
  var datos = JSON.parse(usuario);
  if (!datos.email.includes('@admin.cl')) {
    mostrarNotificacion('❌ No eres administrador', 'error');
    setTimeout(function() {
      window.location.href = '../user/panel-usuario.html';
    }, 1500);
    return;
  }
  
  var nombreElement = document.getElementById('nombreAdmin');
  if (nombreElement) {
    nombreElement.textContent = 'Admin: ' + datos.nombre;
  }
}

// FUNCIÓN 2: Mostrar usuarios
function mostrarUsuarios() {
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  var tabla = document.getElementById('tablaUsuarios');
  
  if (!tabla) return;
  
  var html = '<table class="table"><tr><th>Nombre</th><th>Email</th><th>Acciones</th></tr>';
  
  for (var i = 0; i < usuarios.length; i++) {
    var u = usuarios[i];
    html += '<tr>';
    html += '<td>' + u.nombre + '</td>';
    html += '<td>' + u.email + '</td>';
    html += '<td><button class="btn btn-danger btn-sm" onclick="eliminarUsuario(\'' + u.email + '\')">Eliminar</button></td>';
    html += '</tr>';
  }
  
  html += '</table>';
  tabla.innerHTML = html;
}

// FUNCIÓN 3: Eliminar usuario
function eliminarUsuario(email) {
  mostrarConfirmacion('¿Eliminar usuario?', 'Se eliminará ' + email, function() {
    var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    var nuevosUsuarios = [];
    
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email !== email) {
        nuevosUsuarios.push(usuarios[i]);
      }
    }
    
    localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));
    mostrarNotificacion('✅ Usuario eliminado', 'success');
    mostrarUsuarios();
  });
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
  verificarAdmin();
  mostrarUsuarios();
});
