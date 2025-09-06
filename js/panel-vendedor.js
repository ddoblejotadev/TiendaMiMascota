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
  var ordenes = JSON.parse(localStorage.getItem('ordenes') || '[]');

  var totalProductos = document.getElementById('totalProductos');
  if (totalProductos) {
    totalProductos.textContent = productos.length;
  }

  var totalOrdenes = document.getElementById('totalOrdenes');
  if (totalOrdenes) {
    totalOrdenes.textContent = ordenes.length;
  }
}

// Mostrar productos para vendedor (solo lectura)
function mostrarProductosVendedor() {
  var productos = obtenerProductos();
  var tabla = document.getElementById('tablaProductosVendedor');
  
  if (!tabla) return;
  
  var html = '';
  
  if (productos.length === 0) {
    html = '<tr><td colspan="7" class="text-center">No hay productos disponibles</td></tr>';
  } else {
    for (var i = 0; i < productos.length; i++) {
      var p = productos[i];
      var stockClass = p.stock <= p.stockCritico ? 'text-danger fw-bold' : '';
      var rutaImagen = rutaImagenNormalizada(p.imagen);
      
      html += '<tr>';
      html += '<td>' + p.id + '</td>';
      html += '<td><img src="' + rutaImagen + '" alt="' + p.nombre + '" style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px; border: 2px solid #e9ecef;" onerror="this.src=\'../../assets/img/prod.png\'"></td>';
      html += '<td>' + p.nombre + '</td>';
      html += '<td>$' + p.precio.toLocaleString() + '</td>';
      html += '<td>' + p.categoria + '</td>';
      html += '<td><span class="' + stockClass + '">' + p.stock + '</span></td>';
      html += '<td>' + p.descripcion + '</td>';
      html += '</tr>';
    }
  }
  
  tabla.innerHTML = html;
}

// Mostrar órdenes para vendedor (solo lectura)
function mostrarOrdenesVendedor() {
  var ordenes = JSON.parse(localStorage.getItem('ordenes') || '[]');
  var tabla = document.getElementById('tablaOrdenesVendedor');
  
  if (!tabla) return;
  
  var html = '';
  
  if (ordenes.length === 0) {
    html = '<tr><td colspan="7" class="text-center">No hay órdenes registradas</td></tr>';
  } else {
    for (var i = 0; i < ordenes.length; i++) {
      var orden = ordenes[i];
      var estadoClass = '';
      
      if (orden.estado === 'pendiente') estadoClass = 'text-warning';
      else if (orden.estado === 'procesando') estadoClass = 'text-info';
      else if (orden.estado === 'completada') estadoClass = 'text-success';
      else if (orden.estado === 'cancelada') estadoClass = 'text-danger';
      
      html += '<tr>';
      html += '<td>' + orden.id + '</td>';
      html += '<td>' + orden.cliente + '</td>';
      html += '<td>' + new Date(orden.fecha).toLocaleDateString() + '</td>';
      html += '<td>$' + orden.total.toLocaleString() + '</td>';
      html += '<td><span class="' + estadoClass + '">' + orden.estado.toUpperCase() + '</span></td>';
      html += '<td>' + orden.productos.length + ' productos</td>';
      html += '<td><button class="btn btn-sm btn-info" onclick="verDetalleOrden(' + orden.id + ')">Ver Detalle</button></td>';
      html += '</tr>';
    }
  }
  
  tabla.innerHTML = html;
}

// Inicializar datos de prueba para órdenes
function inicializarOrdenesPrueba() {
  var ordenes = JSON.parse(localStorage.getItem('ordenes') || '[]');
  if (ordenes.length === 0) {
    ordenes = [
      {
        id: 1,
        cliente: 'Juan Pérez',
        fecha: '2024-09-01T10:30:00',
        total: 45000,
        estado: 'completada',
        productos: [
          { id: 1, nombre: 'Comida para Perros Premium', cantidad: 2, precio: 15000, subtotal: 30000 },
          { id: 3, nombre: 'Juguetes Variados', cantidad: 1, precio: 8000, subtotal: 8000 },
          { id: 5, nombre: 'Accesorios para Mascotas', cantidad: 1, precio: 7000, subtotal: 7000 }
        ]
      },
      {
        id: 2,
        cliente: 'María González',
        fecha: '2024-09-02T14:15:00',
        total: 25000,
        estado: 'procesando',
        productos: [
          { id: 2, nombre: 'Cama para Mascotas', cantidad: 1, precio: 25000, subtotal: 25000 }
        ]
      },
      {
        id: 3,
        cliente: 'Carlos Rodríguez',
        fecha: '2024-09-03T09:45:00',
        total: 18000,
        estado: 'pendiente',
        productos: [
          { id: 4, nombre: 'Productos de Higiene', cantidad: 1, precio: 12000, subtotal: 12000 },
          { id: 6, nombre: 'Productos de Salud', cantidad: 1, precio: 6000, subtotal: 6000 }
        ]
      },
      {
        id: 4,
        cliente: 'Ana López',
        fecha: '2024-09-04T16:20:00',
        total: 35000,
        estado: 'completada',
        productos: [
          { id: 7, nombre: 'Producto Especial', cantidad: 1, precio: 35000, subtotal: 35000 }
        ]
      }
    ];
    localStorage.setItem('ordenes', JSON.stringify(ordenes));
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
  if (verificarVendedor()) {
    inicializarOrdenesPrueba();
    mostrarEstadisticasVendedor();
    mostrarProductosVendedor();
    mostrarOrdenesVendedor();
  }
});
