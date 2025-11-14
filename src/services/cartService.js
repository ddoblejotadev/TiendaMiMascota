/**
 * SERVICIO DEL CARRITO
 * Maneja las operaciones del carrito de compras
 */

// Clave para localStorage
const CART_KEY = 'tienda_mimascota_carrito';

/**
 * Obtiene el carrito desde localStorage
 * @returns {Array} - Items del carrito
 */
export function obtenerCarrito() {
  const carritoJSON = localStorage.getItem(CART_KEY);
  return carritoJSON ? JSON.parse(carritoJSON) : [];
}

/**
 * Guarda el carrito en localStorage
 * @param {Array} carrito - Items del carrito
 */
function guardarCarrito(carrito) {
  localStorage.setItem(CART_KEY, JSON.stringify(carrito));
}

/**
 * Agrega un producto al carrito
 * @param {Object} producto - Producto a agregar
 * @param {number} cantidad - Cantidad a agregar (default: 1)
 * @returns {Array} - Carrito actualizado
 */
export function agregarAlCarrito(producto, cantidad = 1) {
  const carrito = obtenerCarrito();
  
  // Buscar si el producto ya existe en el carrito
  const itemExistente = carrito.find(item => item.id === producto.id);
  
  if (itemExistente) {
    // Si existe, aumentar la cantidad
    itemExistente.cantidad += cantidad;
  } else {
    // Si no existe, agregarlo
    carrito.push({
      ...producto,
      cantidad
    });
  }
  
  guardarCarrito(carrito);
  return carrito;
}

/**
 * Elimina un producto del carrito
 * @param {number} productoId - ID del producto
 * @returns {Array} - Carrito actualizado
 */
export function eliminarDelCarrito(productoId) {
  const carrito = obtenerCarrito();
  const carritoActualizado = carrito.filter(item => item.id !== productoId);
  guardarCarrito(carritoActualizado);
  return carritoActualizado;
}

/**
 * Actualiza la cantidad de un producto en el carrito
 * @param {number} productoId - ID del producto
 * @param {number} nuevaCantidad - Nueva cantidad
 * @returns {Array} - Carrito actualizado
 */
export function actualizarCantidad(productoId, nuevaCantidad) {
  const carrito = obtenerCarrito();
  
  if (nuevaCantidad <= 0) {
    return eliminarDelCarrito(productoId);
  }
  
  const item = carrito.find(item => item.id === productoId);
  if (item) {
    item.cantidad = nuevaCantidad;
    guardarCarrito(carrito);
  }
  
  return carrito;
}

/**
 * Vacía el carrito completamente
 * @returns {Array} - Carrito vacío
 */
export function vaciarCarrito() {
  guardarCarrito([]);
  return [];
}

/**
 * Calcula el total del carrito
 * @param {Array} carrito - Items del carrito (opcional)
 * @returns {number} - Total en pesos
 */
export function calcularTotal(carrito = null) {
  const items = carrito || obtenerCarrito();
  return items.reduce((total, item) => {
    return total + (item.precio * item.cantidad);
  }, 0);
}

/**
 * Obtiene la cantidad total de items en el carrito
 * @returns {number} - Cantidad total
 */
export function obtenerCantidadTotal() {
  const carrito = obtenerCarrito();
  return carrito.reduce((total, item) => total + item.cantidad, 0);
}

/**
 * Verifica si un producto está en el carrito
 * @param {number} productoId - ID del producto
 * @returns {boolean} - true si está en el carrito
 */
export function estaEnCarrito(productoId) {
  const carrito = obtenerCarrito();
  return carrito.some(item => item.id === productoId);
}