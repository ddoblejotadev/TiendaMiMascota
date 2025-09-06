// ========================================
// PANEL ADMIN ULTRA SIMPLE - SOLO 3 FUNCIONES
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

// FUNCIÓN EXTRA: Mostrar notificación moderna
function mostrarNotificacion(mensaje, tipo) {
  var notificacion = document.createElement('div');
  notificacion.className = 'notificacion-carrito';
  
  // Cambiar color según el tipo
  if (tipo === 'error') {
    notificacion.style.background = '#dc3545';
  } else if (tipo === 'success') {
    notificacion.style.background = '#198754';
  }
  
  var icono = '🛒';
  if (tipo === 'error') {
    icono = '❌';
  } else if (tipo === 'success') {
    icono = '✅';
  }
  
  notificacion.innerHTML = 
    '<div class="icono">' + icono + '</div>' +
    '<div>' + mensaje + '</div>';
  
  document.body.appendChild(notificacion);
  
  // Quitar después de 2 segundos con animación
  setTimeout(function() {
    notificacion.style.animation = 'deslizarSalida 0.3s ease-in';
    setTimeout(function() {
      if (document.body.contains(notificacion)) {
        document.body.removeChild(notificacion);
      }
    }, 300);
  }, 2000);
}

// FUNCIÓN EXTRA: Confirmación moderna usando CSS
function mostrarConfirmacion(titulo, mensaje, funcionConfirmar) {
  var modal = document.createElement('div');
  modal.className = 'confirmacion-modal';
  
  modal.innerHTML = 
    '<div class="confirmacion-content">' +
      '<h5>🗑️ ' + titulo + '</h5>' +
      '<p>' + mensaje + '</p>' +
      '<div class="confirmacion-botones">' +
        '<button class="btn-confirmar" onclick="confirmarAccion()">Sí, eliminar</button>' +
        '<button class="btn-cancelar" onclick="cancelarAccion()">Cancelar</button>' +
      '</div>' +
    '</div>';
  
  document.body.appendChild(modal);
  
  // Funciones globales temporales para los botones
  window.confirmarAccion = function() {
    document.body.removeChild(modal);
    funcionConfirmar(); // Ejecutar la función pasada como parámetro
    // Limpiar funciones globales
    delete window.confirmarAccion;
    delete window.cancelarAccion;
  };
  
  window.cancelarAccion = function() {
    document.body.removeChild(modal);
    // Limpiar funciones globales
    delete window.confirmarAccion;
    delete window.cancelarAccion;
  };
}

// Cerrar sesión
function cerrarSesion() {
  localStorage.removeItem('usuarioActual');
  mostrarNotificacion('✅ Sesión cerrada correctamente', 'success');
  
  // Esperar un poco antes de redirigir
  setTimeout(function() {
    window.location.href = '../user/iniciar-sesion.html';
  }, 1500);
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
  verificarAdmin();
  mostrarUsuarios();
});
