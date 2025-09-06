// =============================================
// UTILIDADES COMUNES - FUNCIONES COMPARTIDAS
// =============================================

// FUNCIÓN UTIL 1: Mostrar notificación moderna
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

// FUNCIÓN UTIL 2: Confirmación moderna usando CSS
function mostrarConfirmacion(titulo, mensaje, funcionConfirmar) {
  var modal = document.createElement('div');
  modal.className = 'confirmacion-modal';
  
  modal.innerHTML = 
    '<div class="confirmacion-content">' +
      '<h5>🗑️ ' + titulo + '</h5>' +
      '<p>' + mensaje + '</p>' +
      '<div class="confirmacion-botones">' +
        '<button class="btn-confirmar" onclick="confirmarAccion()">Sí, confirmar</button>' +
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

// FUNCIÓN UTIL 3: Cerrar sesión (común para admin y usuario)
function cerrarSesion() {
  localStorage.removeItem('usuarioActual');
  mostrarNotificacion('✅ Sesión cerrada correctamente', 'success');
  
  // Esperar un poco antes de redirigir
  setTimeout(function() {
    window.location.href = '../user/iniciar-sesion.html';
  }, 1500);
}
