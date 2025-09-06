// =============================================
// PANEL VENDEDOR - SOLO LECTURA (3 FUNCIONES)
// =============================================

// FUNCIÓN 1: Verificar que es vendedor
function verificarVendedor() {
  var usuario = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
  
  if (!usuario.rol || (usuario.rol !== 'vendedor' && usuario.rol !== 'administrador')) {
    mostrarNotificacion('❌ Acceso denegado. Solo vendedores', 'error');
    setTimeout(function() {
      window.location.href = '../user/iniciar-sesion.html';
    }, 2000);
    return false;
  }
  
  // Mostrar nombre del vendedor
  var nombreVendedor = document.getElementById('nombreVendedor');
  if (nombreVendedor) {
    nombreVendedor.textContent = usuario.nombre;
  }
  
  return true;
}

// FUNCIÓN 2: Mostrar productos (solo lectura)
function mostrarProductosVendedor() {
  var productos = JSON.parse(localStorage.getItem('productos') || '[]');
  var tabla = document.getElementById('tablaProductosVendedor');
  var totalProductos = document.getElementById('totalProductos');
  
  if (!tabla) return;
  
  var html = '';
  
  if (productos.length === 0) {
    html = '<tr><td colspan="5" class="text-center">No hay productos registrados</td></tr>';
  } else {
    for (var i = 0; i < productos.length; i++) {
      var p = productos[i];
      html += '<tr>';
      html += '<td>' + p.id + '</td>';
      html += '<td>' + p.nombre + '</td>';
      html += '<td>$' + p.precio + '</td>';
      html += '<td>' + p.categoria + '</td>';
      html += '<td>' + (p.stock || 'Sin stock') + '</td>';
      html += '</tr>';
    }
  }
  
  tabla.innerHTML = html;
  
  if (totalProductos) {
    totalProductos.textContent = productos.length;
  }
}

// FUNCIÓN 3: Cambiar sección visible
function mostrarSeccion(seccion) {
  // Ocultar todas las secciones
  var secciones = document.querySelectorAll('.seccion-vendedor');
  for (var i = 0; i < secciones.length; i++) {
    secciones[i].style.display = 'none';
  }
  
  // Quitar clase active de botones
  var botones = document.querySelectorAll('.list-group-item');
  for (var i = 0; i < botones.length; i++) {
    botones[i].classList.remove('active');
  }
  
  // Mostrar sección seleccionada
  if (seccion === 'productos') {
    document.getElementById('seccionProductos').style.display = 'block';
    mostrarProductosVendedor();
  } else if (seccion === 'ordenes') {
    document.getElementById('seccionOrdenes').style.display = 'block';
  }
  
  // Marcar botón como activo
  event.target.classList.add('active');
}

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
  if (verificarVendedor()) {
    mostrarProductosVendedor();
  }
});
