// ==============================================
// CARRITO DE COMPRAS - PRINCIPIANTE
// ==============================================

// Función para obtener carrito del localStorage
function obtenerCarrito() {
  var carrito = localStorage.getItem('carrito');
  return carrito ? JSON.parse(carrito) : [];
}

// Función para guardar carrito en localStorage
function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para agregar producto al carrito
function agregarAlCarrito(idProducto) {
  var productos = obtenerProductos();
  var producto = productos.find(function(p) { 
    return p.id === parseInt(idProducto); 
  });
  
  if (!producto) {
    mostrarNotificacion('Producto no encontrado', 'error');
    return;
  }
  
  if (producto.stock <= 0) {
    mostrarNotificacion('Producto sin stock disponible', 'error');
    return;
  }
  
  var carrito = obtenerCarrito();
  
  // Verificar si el producto ya está en el carrito
  var itemExistente = carrito.find(function(item) {
    return item.id === idProducto;
  });
  
  if (itemExistente) {
    // Verificar stock disponible
    if (itemExistente.cantidad >= producto.stock) {
      mostrarNotificacion('No hay más stock disponible para este producto', 'error');
      return;
    }
    itemExistente.cantidad += 1;
  } else {
    // Agregar nuevo item al carrito
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }
  
  guardarCarrito(carrito);
  mostrarExito('Producto agregado al carrito');
  actualizarContadorCarrito();
}

// Función para actualizar contador del carrito
function actualizarContadorCarrito() {
  var carrito = obtenerCarrito();
  var totalItems = carrito.reduce(function(total, item) {
    return total + item.cantidad;
  }, 0);
  
  // Actualizar contador en index.html
  var contadorIndex = document.getElementById('carrito-contador');
  if (contadorIndex) {
    contadorIndex.textContent = totalItems;
  }
  
  // Actualizar contador en detalle-producto.html
  var contadorDetalle = document.getElementById('cantidadCarrito');
  if (contadorDetalle) {
    contadorDetalle.textContent = totalItems;
  }
}

// Función para mostrar carrito en modal
function mostrarCarrito() {
  var carrito = obtenerCarrito();
  
  // Buscar contenedores (puede ser carrito-items o contenidoCarrito)
  var contenedor = document.getElementById('carrito-items') || document.getElementById('contenidoCarrito');
  var totalElement = document.getElementById('carrito-total') || document.getElementById('totalCarrito');
  
  if (contenedor) {
    contenedor.innerHTML = '';
    var total = 0;
    
    if (carrito.length === 0) {
      contenedor.innerHTML = '<p class="text-center">El carrito está vacío</p>';
    } else {
      carrito.forEach(function(item) {
        var subtotal = item.precio * item.cantidad;
        total += subtotal;
        
        var div = document.createElement('div');
        div.className = 'row mb-3 align-items-center';
        div.innerHTML = `
          <div class="col-3">
            <img src="${item.imagen}" class="img-fluid" alt="${item.nombre}">
          </div>
          <div class="col-6">
            <h6>${item.nombre}</h6>
            <p class="mb-0">$${item.precio.toLocaleString()} x ${item.cantidad}</p>
          </div>
          <div class="col-3 text-end">
            <p class="mb-0"><strong>$${subtotal.toLocaleString()}</strong></p>
            <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${item.id})">
              Eliminar
            </button>
          </div>
        `;
        contenedor.appendChild(div);
      });
    }
    
    if (totalElement) {
      totalElement.textContent = total.toLocaleString();
    }
  }
}// Función para eliminar item del carrito
function eliminarDelCarrito(idProducto) {
  var carrito = obtenerCarrito();
  carrito = carrito.filter(function(item) {
    return item.id !== idProducto;
  });
  
  guardarCarrito(carrito);
  mostrarCarrito();
  actualizarContadorCarrito();
  mostrarNotificacion('Producto eliminado del carrito', 'success');
}

// Función para vaciar carrito
function vaciarCarrito() {
  if (confirm('¿Está seguro que desea vaciar el carrito?')) {
    localStorage.removeItem('carrito');
    mostrarCarrito();
    actualizarContadorCarrito();
    mostrarNotificacion('Carrito vaciado', 'success');
  }
}
