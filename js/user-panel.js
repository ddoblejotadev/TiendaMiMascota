// ========================================
// PANEL USUARIO - SOLO 1 FUNCIÓN ESPECÍFICA
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

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
  verificarUsuario();
});
