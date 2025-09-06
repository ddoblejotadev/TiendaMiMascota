// ========================================
// PANEL USUARIO SIMPLE - FUNCIONES BÁSICAS
// ========================================

// FUNCIÓN 1: Verificar usuario logueado
function verificarUsuario() {
  var usuario = localStorage.getItem('usuarioActual');
  if (!usuario) {
    mostrarNotificacion('❌ Debes iniciar sesión', 'error');
    setTimeout(function() {
      window.location.href = 'iniciar-sesion.html';
    }, 1500);
    return;
  }
  
  var datos = JSON.parse(usuario);
  var nombreElement = document.getElementById('nombreUsuario');
  if (nombreElement) {
    nombreElement.textContent = 'Usuario: ' + datos.nombre;
  }
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

// FUNCIÓN 2: Cerrar sesión
function cerrarSesion() {
  localStorage.removeItem('usuarioActual');
  mostrarNotificacion('✅ Sesión cerrada correctamente', 'success');
  
  // Esperar un poco antes de redirigir
  setTimeout(function() {
    window.location.href = 'iniciar-sesion.html';
  }, 1500);
}

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
  verificarUsuario();
});
