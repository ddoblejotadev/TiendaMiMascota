// ========================================
// PANEL VENDEDOR BÁSICO - SOLO LECTURA
// ========================================

// FUNCIÓN 1: Verificar si es vendedor
function verificarVendedor() {
  var usuario = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
  
  if (!usuario.tipoUsuario || usuario.tipoUsuario !== 'Vendedor') {
    alert('Solo vendedores pueden acceder');
    window.location.href = '../user/iniciar-sesion.html';
    return false;
  }
  
  document.getElementById('nombreVendedor').textContent = usuario.nombre;
  return true;
}

// FUNCIÓN 2: Mostrar productos (lista fija para principiantes)
function mostrarProductosVendedor() {
  var productos = [
    {id: 1, nombre: 'Collar para Perro', precio: 15000, categoria: 'Accesorios', stock: 25},
    {id: 2, nombre: 'Cama para Mascota', precio: 35000, categoria: 'Camas', stock: 12},
    {id: 3, nombre: 'Alimento Premium', precio: 28000, categoria: 'Comida', stock: 30},
    {id: 4, nombre: 'Shampoo para Mascotas', precio: 18000, categoria: 'Higiene', stock: 20}
  ];
  
  var tabla = document.getElementById('tablaProductosVendedor');
  
  if (!tabla) return;
  
  var html = '';
  
  for (var i = 0; i < productos.length; i++) {
    var p = productos[i];
    
    html += '<tr>';
    html += '<td>' + p.id + '</td>';
    html += '<td>' + p.nombre + '</td>';
    html += '<td>$' + p.precio.toLocaleString() + '</td>';
    html += '<td>' + p.categoria + '</td>';
    html += '<td>' + p.stock + '</td>';
    html += '</tr>';
  }
  
  tabla.innerHTML = html;
  
  document.getElementById('totalProductos').textContent = productos.length;
}

// FUNCIÓN 3: Mostrar usuarios (solo lectura)
function mostrarUsuariosVendedor() {
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  var tabla = document.getElementById('tablaUsuariosVendedor');
  
  if (!tabla) return;
  
  var html = '';
  
  if (usuarios.length === 0) {
    html = '<tr><td colspan="5" class="text-center">No hay usuarios registrados</td></tr>';
  } else {
    for (var i = 0; i < usuarios.length; i++) {
      var u = usuarios[i];
      
      html += '<tr>';
      html += '<td>' + u.id + '</td>';
      html += '<td>' + u.nombre + '</td>';
      html += '<td>' + u.email + '</td>';
      html += '<td>' + u.tipoUsuario + '</td>';
      html += '<td>Activo</td>';
      html += '</tr>';
    }
  }
  
  tabla.innerHTML = html;
  
  document.getElementById('totalUsuarios').textContent = usuarios.length;
}

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
  if (verificarVendedor()) {
    mostrarProductosVendedor();
    mostrarUsuariosVendedor();
  }
});