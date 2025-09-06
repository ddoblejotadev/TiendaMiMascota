// ========================================
// PANEL USUARIO CLIENTE - FUNCIONES ESPECÍFICAS
// ========================================

// FUNCIÓN 1: Verificar que es un cliente logueado
function verificarUsuario() {
  var usuario = localStorage.getItem('usuarioActual');
  if (!usuario) {
    mostrarNotificacion('❌ Debes iniciar sesión', 'error');
    setTimeout(function() {
      window.location.href = 'iniciar-sesion.html';
    }, 1500);
    return false;
  }
  
  var datos = JSON.parse(usuario);
  
  // Verificar que es cliente (no admin ni vendedor)
  if (datos.rol !== 'cliente') {
    mostrarNotificacion('❌ Esta área es solo para clientes', 'error');
    setTimeout(function() {
      if (datos.rol === 'administrador') {
        window.location.href = '../admin/panel-administrador.html';
      } else if (datos.rol === 'vendedor') {
        window.location.href = '../vendedor/panel-vendedor.html';
      }
    }, 1500);
    return false;
  }
  
  var nombreElement = document.getElementById('nombreUsuario');
  if (nombreElement) {
    nombreElement.textContent = datos.nombre;
  }
  
  return true;
}

// FUNCIÓN 2: Mostrar historial de compras del cliente
function mostrarHistorialCompras() {
  var usuario = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
  var compras = JSON.parse(localStorage.getItem('compras_' + usuario.email) || '[]');
  var tabla = document.getElementById('tablaHistorial');
  
  if (!tabla) return;
  
  var html = '';
  
  if (compras.length === 0) {
    html = '<tr><td colspan="4" class="text-center">No tienes compras realizadas</td></tr>';
  } else {
    for (var i = 0; i < compras.length; i++) {
      var compra = compras[i];
      html += '<tr>';
      html += '<td>' + compra.fecha + '</td>';
      html += '<td>' + compra.productos.length + ' productos</td>';
      html += '<td>$' + compra.total + '</td>';
      html += '<td><span class="badge bg-success">Completada</span></td>';
      html += '</tr>';
    }
  }
  
  tabla.innerHTML = html;
}

// FUNCIÓN 3: Actualizar perfil del cliente
function actualizarPerfil() {
  var nuevoNombre = document.getElementById('nuevoNombre').value;
  
  if (!nuevoNombre || nuevoNombre.trim() === '') {
    mostrarNotificacion('❌ El nombre no puede estar vacío', 'error');
    return;
  }
  
  var usuario = JSON.parse(localStorage.getItem('usuarioActual'));
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  
  // Actualizar en la lista de usuarios
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === usuario.email) {
      usuarios[i].nombre = nuevoNombre;
      break;
    }
  }
  
  // Actualizar usuario actual
  usuario.nombre = nuevoNombre;
  
  // Guardar cambios
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  localStorage.setItem('usuarioActual', JSON.stringify(usuario));
  
  mostrarNotificacion('✅ Perfil actualizado correctamente', 'success');
  
  // Actualizar nombre en pantalla
  var nombreElement = document.getElementById('nombreUsuario');
  if (nombreElement) {
    nombreElement.textContent = nuevoNombre;
  }
}

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
  verificarUsuario();
});
