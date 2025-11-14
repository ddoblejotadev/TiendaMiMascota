/**
 * FUNCIONES DE FORMATEO
 * Funciones para formatear datos (precios, fechas, etc.)
 */

/**
 * Formatea un número como precio en pesos chilenos
 * @param {number} precio - El precio a formatear
 * @returns {string} - Precio formateado (ej: "$25.990")
 */
export function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  }).format(precio);
}

/**
 * Formatea una fecha en formato legible
 * @param {Date|string} fecha - La fecha a formatear
 * @returns {string} - Fecha formateada (ej: "15 de marzo de 2024")
 */
export function formatearFecha(fecha) {
  const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
  
  return new Intl.DateTimeFormat('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(fechaObj);
}

/**
 * Trunca un texto a un número específico de caracteres
 * @param {string} texto - El texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} - Texto truncado con "..."
 */
export function truncarTexto(texto, maxLength = 100) {
  if (texto.length <= maxLength) return texto;
  return texto.slice(0, maxLength) + '...';
}

/**
 * Formatea un número de teléfono chileno
 * @param {string} telefono - El teléfono a formatear
 * @returns {string} - Teléfono formateado (ej: "+56 9 1234 5678")
 */
export function formatearTelefono(telefono) {
  // Remover todo excepto números
  const numeros = telefono.replace(/\D/g, '');
  
  // Formatear: +56 9 1234 5678
  if (numeros.length === 11 && numeros.startsWith('569')) {
    return `+56 9 ${numeros.slice(3, 7)} ${numeros.slice(7)}`;
  }
  
  return telefono;
}

/**
 * Calcula el descuento porcentual
 * @param {number} precioOriginal - Precio original
 * @param {number} precioDescuento - Precio con descuento
 * @returns {number} - Porcentaje de descuento
 */
export function calcularDescuento(precioOriginal, precioDescuento) {
  return Math.round(((precioOriginal - precioDescuento) / precioOriginal) * 100);
}