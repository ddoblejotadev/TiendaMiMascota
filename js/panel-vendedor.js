// ========================================
// PANEL VENDEDOR - SOLO LECTURA
// ========================================

// Verificar si es vendedor
function verificarVendedor() {
  var usuario = JSON.parse(localStorage.getItem('usuarioActual') || '{}');

  if (!usuario.rol || usuario.rol !== 'vendedor') {
    mostrarNotificacion('❌ Solo vendedores pueden acceder', 'error');
    setTimeout(function() {
      window.location.href = '../user/iniciar-sesion.html';
    }, 1500);
    return false;
  }

  var nombreElement = document.getElementById('nombreVendedor');
  if (nombreElement) {
    nombreElement.textContent = usuario.nombre;
  }

  return true;
}

// Mostrar estadísticas básicas
function mostrarEstadisticasVendedor() {
  var productos = obtenerProductos();
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

  var totalProductos = document.getElementById('totalProductos');
  if (totalProductos) {
    totalProductos.textContent = productos.length;
  }

  var totalUsuarios = document.getElementById('totalUsuarios');
  if (totalUsuarios) {
    totalUsuarios.textContent = usuarios.length;
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
  if (verificarVendedor()) {
    mostrarEstadisticasVendedor();
  }
});
