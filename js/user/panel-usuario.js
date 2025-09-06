// ========================================
// PANEL USUARIO - PERFIL PERSONAL
// ========================================

// Verificar si es usuario normal
function verificarUsuario() {
  var usuario = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
  
  if (!usuario.rol || usuario.rol !== 'cliente') {
    mostrarNotificacion('❌ Solo usuarios registrados pueden acceder', 'error');
    setTimeout(function() {
      window.location.href = '../user/iniciar-sesion.html';
    }, 1500);
    return false;
  }
  
  return true;
}

// Mostrar información del perfil
function mostrarPerfil() {
  var usuario = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
  
  if (usuario.nombre) {
    document.getElementById('profileName').textContent = usuario.nombre;
    document.getElementById('profileApellidos').textContent = usuario.apellidos || '-';
    document.getElementById('profileEmail').textContent = usuario.email;
    document.getElementById('profileRun').textContent = usuario.run;
    document.getElementById('profileFechaNacimiento').textContent = usuario.fechaNacimiento || '-';
    document.getElementById('profileRegion').textContent = usuario.region || '-';
    document.getElementById('profileComuna').textContent = usuario.comuna || '-';
    document.getElementById('profileDireccion').textContent = usuario.direccion;
    document.getElementById('profileRol').textContent = usuario.rol;
    
    // Welcome message
    var welcomeElement = document.getElementById('userWelcome');
    if (welcomeElement) {
      welcomeElement.textContent = 'Bienvenido, ' + usuario.nombre;
    }
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
  if (verificarUsuario()) {
    mostrarPerfil();
  }
});
