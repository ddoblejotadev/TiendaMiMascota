/**
 * FORMATEADORES DE DATOS
 * 
 * Este archivo contiene funciones para formatear datos y presentarlos
 * de forma legible para el usuario chileno.
 * 
 * Usa APIs nativas de JavaScript (Intl) para formateo correcto
 * según la localización (es-CL para Chile).
 */

import { FORMAT } from './constants';

// ============================================
// FORMATEADOR DE PRECIOS (CLP)
// ============================================

/**
 * Formatea un número como precio en pesos chilenos
 * 
 * CARACTERÍSTICAS:
 * - Agrega símbolo de peso ($)
 * - Separador de miles con punto
 * - Sin decimales (CLP no usa centavos)
 * 
 * @param {number} precio - Precio a formatear
 * @returns {string} - Precio formateado
 * 
 * @example
 * formatearPrecio(15000)        // "$15.000"
 * formatearPrecio(1500000)      // "$1.500.000"
 * formatearPrecio(500)          // "$500"
 */
export const formatearPrecio = (precio) => {
  // Validar que sea un número
  if (precio === null || precio === undefined || isNaN(precio)) {
    return '$0';
  }

  // Convertir a número si viene como string
  const precioNumero = typeof precio === 'string' ? parseFloat(precio) : precio;

  // Usar Intl.NumberFormat para formato chileno
  // es-CL = español de Chile
  // CLP = Código de moneda (Chilean Peso)
  const formateador = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,  // Sin decimales
    maximumFractionDigits: 0   // Sin decimales
  });

  return formateador.format(precioNumero);
};

// ============================================
// FORMATEADOR DE NÚMEROS CON SEPARADORES
// ============================================

/**
 * Formatea un número con separadores de miles
 * Sin símbolo de moneda
 * 
 * @param {number} numero - Número a formatear
 * @returns {string} - Número formateado
 * 
 * @example
 * formatearNumero(15000)        // "15.000"
 * formatearNumero(1500000)      // "1.500.000"
 * formatearNumero(500)          // "500"
 */
export const formatearNumero = (numero) => {
  if (numero === null || numero === undefined || isNaN(numero)) {
    return '0';
  }

  const numeroFormateado = new Intl.NumberFormat('es-CL').format(numero);
  return numeroFormateado;
};

// ============================================
// FORMATEADOR DE FECHAS
// ============================================

/**
 * Formatea una fecha al formato chileno DD/MM/YYYY
 * 
 * @param {Date|string} fecha - Fecha a formatear
 * @returns {string} - Fecha formateada
 * 
 * @example
 * formatearFecha(new Date())                    // "03/10/2024"
 * formatearFecha("2024-10-03T14:30:00.000Z")   // "03/10/2024"
 */
export const formatearFecha = (fecha) => {
  if (!fecha) return '';

  // Convertir a objeto Date si viene como string
  const fechaObj = fecha instanceof Date ? fecha : new Date(fecha);

  // Verificar que sea una fecha válida
  if (isNaN(fechaObj.getTime())) {
    return 'Fecha inválida';
  }

  // Formatear al estilo chileno
  const formateador = new Intl.DateTimeFormat('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return formateador.format(fechaObj);
};

// ============================================
// FORMATEADOR DE FECHA Y HORA
// ============================================

/**
 * Formatea una fecha con hora al formato DD/MM/YYYY HH:MM
 * 
 * @param {Date|string} fecha - Fecha a formatear
 * @returns {string} - Fecha y hora formateada
 * 
 * @example
 * formatearFechaHora(new Date())  // "03/10/2024 14:30"
 */
export const formatearFechaHora = (fecha) => {
  if (!fecha) return '';

  const fechaObj = fecha instanceof Date ? fecha : new Date(fecha);

  if (isNaN(fechaObj.getTime())) {
    return 'Fecha inválida';
  }

  const formateador = new Intl.DateTimeFormat('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false  // Formato 24 horas
  });

  return formateador.format(fechaObj);
};

// ============================================
// FORMATEADOR DE FECHA RELATIVA
// ============================================

/**
 * Formatea una fecha de forma relativa (hace X tiempo)
 * 
 * @param {Date|string} fecha - Fecha a formatear
 * @returns {string} - Fecha relativa
 * 
 * @example
 * formatearFechaRelativa(new Date())           // "Hace unos segundos"
 * formatearFechaRelativa(hace2Horas)           // "Hace 2 horas"
 * formatearFechaRelativa(ayer)                 // "Hace 1 día"
 */
export const formatearFechaRelativa = (fecha) => {
  if (!fecha) return '';

  const fechaObj = fecha instanceof Date ? fecha : new Date(fecha);

  if (isNaN(fechaObj.getTime())) {
    return 'Fecha inválida';
  }

  const ahora = new Date();
  const diferenciaMilisegundos = ahora - fechaObj;
  const diferenciaSegundos = Math.floor(diferenciaMilisegundos / 1000);
  const diferenciaMinutos = Math.floor(diferenciaSegundos / 60);
  const diferenciaHoras = Math.floor(diferenciaMinutos / 60);
  const diferenciaDias = Math.floor(diferenciaHoras / 24);
  const diferenciaMeses = Math.floor(diferenciaDias / 30);
  const diferenciaAnios = Math.floor(diferenciaDias / 365);

  if (diferenciaSegundos < 60) {
    return 'Hace unos segundos';
  } else if (diferenciaMinutos < 60) {
    return `Hace ${diferenciaMinutos} ${diferenciaMinutos === 1 ? 'minuto' : 'minutos'}`;
  } else if (diferenciaHoras < 24) {
    return `Hace ${diferenciaHoras} ${diferenciaHoras === 1 ? 'hora' : 'horas'}`;
  } else if (diferenciaDias < 30) {
    return `Hace ${diferenciaDias} ${diferenciaDias === 1 ? 'día' : 'días'}`;
  } else if (diferenciaMeses < 12) {
    return `Hace ${diferenciaMeses} ${diferenciaMeses === 1 ? 'mes' : 'meses'}`;
  } else {
    return `Hace ${diferenciaAnios} ${diferenciaAnios === 1 ? 'año' : 'años'}`;
  }
};

// ============================================
// FORMATEADOR DE TELÉFONO
// ============================================

/**
 * Formatea un número telefónico chileno
 * 
 * FORMATOS:
 * - Celular: +56 9 1234 5678
 * - Fijo: +56 2 2345 6789
 * 
 * @param {string} telefono - Teléfono a formatear
 * @returns {string} - Teléfono formateado
 * 
 * @example
 * formatearTelefono("912345678")   // "+56 9 1234 5678"
 * formatearTelefono("223456789")   // "+56 2 2345 6789"
 */
export const formatearTelefono = (telefono) => {
  if (!telefono) return '';

  // Limpiar el teléfono de caracteres no numéricos
  const telefonoLimpio = telefono.toString().replace(/\D/g, '');

  // Verificar que tenga 9 dígitos
  if (telefonoLimpio.length !== 9) {
    return telefono; // Retornar original si no es válido
  }

  // Extraer partes
  const codigo = telefonoLimpio[0]; // 9 o 2
  const parte1 = telefonoLimpio.slice(1, 5);
  const parte2 = telefonoLimpio.slice(5, 9);

  return `+56 ${codigo} ${parte1} ${parte2}`;
};

// ============================================
// FORMATEADOR DE RUN
// ============================================

/**
 * Formatea un RUN chileno con puntos y guion
 * (Importado desde validators.js pero repetido aquí por conveniencia)
 * 
 * @param {string} run - RUN sin formato
 * @returns {string} - RUN formateado
 * 
 * @example
 * formatearRUN("12345678K")   // "12.345.678-K"
 */
export const formatearRUN = (run) => {
  if (!run) return '';

  // Limpiar caracteres no válidos
  const runLimpio = run.toString().toUpperCase().replace(/[^0-9K]/g, '');

  if (runLimpio.length <= 1) return runLimpio;

  // Separar dígito verificador
  const dv = runLimpio.slice(-1);
  const numero = runLimpio.slice(0, -1);

  // Agregar puntos cada 3 dígitos (de derecha a izquierda)
  const numeroFormateado = numero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${numeroFormateado}-${dv}`;
};

// ============================================
// FORMATEADOR DE TEXTO
// ============================================

/**
 * Capitaliza la primera letra de cada palabra
 * 
 * @param {string} texto - Texto a capitalizar
 * @returns {string} - Texto capitalizado
 * 
 * @example
 * capitalizarTexto("juan pérez")        // "Juan Pérez"
 * capitalizarTexto("PEDRO GONZÁLEZ")    // "Pedro González"
 */
export const capitalizarTexto = (texto) => {
  if (!texto || typeof texto !== 'string') return '';

  return texto
    .toLowerCase()
    .split(' ')
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ');
};

/**
 * Capitaliza solo la primera letra del texto completo
 * 
 * @param {string} texto - Texto a capitalizar
 * @returns {string} - Texto con primera letra mayúscula
 * 
 * @example
 * capitalizarPrimeraLetra("hola mundo")  // "Hola mundo"
 */
export const capitalizarPrimeraLetra = (texto) => {
  if (!texto || typeof texto !== 'string') return '';

  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};

/**
 * Trunca un texto a un largo específico
 * 
 * @param {string} texto - Texto a truncar
 * @param {number} largo - Largo máximo
 * @returns {string} - Texto truncado con "..."
 * 
 * @example
 * truncarTexto("Este es un texto muy largo", 10)  // "Este es un..."
 */
export const truncarTexto = (texto, largo = 50) => {
  if (!texto || typeof texto !== 'string') return '';

  if (texto.length <= largo) return texto;

  return texto.substring(0, largo) + '...';
};

// ============================================
// FORMATEADOR DE PORCENTAJE
// ============================================

/**
 * Formatea un número como porcentaje
 * 
 * @param {number} numero - Número a formatear (0.25 = 25%)
 * @param {number} decimales - Cantidad de decimales (default: 0)
 * @returns {string} - Porcentaje formateado
 * 
 * @example
 * formatearPorcentaje(0.25)        // "25%"
 * formatearPorcentaje(0.333, 2)    // "33,33%"
 */
export const formatearPorcentaje = (numero, decimales = 0) => {
  if (numero === null || numero === undefined || isNaN(numero)) {
    return '0%';
  }

  const formateador = new Intl.NumberFormat('es-CL', {
    style: 'percent',
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales
  });

  return formateador.format(numero);
};

// ============================================
// FORMATEADOR DE TAMAÑO DE ARCHIVO
// ============================================

/**
 * Formatea bytes a tamaño legible (KB, MB, GB)
 * 
 * @param {number} bytes - Tamaño en bytes
 * @returns {string} - Tamaño formateado
 * 
 * @example
 * formatearTamanioArchivo(1024)           // "1 KB"
 * formatearTamanioArchivo(1048576)        // "1 MB"
 * formatearTamanioArchivo(1073741824)     // "1 GB"
 */
export const formatearTamanioArchivo = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const tamanios = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + tamanios[i];
};

// ============================================
// FORMATEADOR DE STOCK
// ============================================

/**
 * Formatea el stock con mensaje según disponibilidad
 * 
 * @param {number} stock - Cantidad en stock
 * @returns {Object} - { texto, color, disponible }
 * 
 * @example
 * formatearStock(0)    // { texto: "Sin stock", color: "error", disponible: false }
 * formatearStock(3)    // { texto: "Quedan 3", color: "warning", disponible: true }
 * formatearStock(15)   // { texto: "Disponible", color: "success", disponible: true }
 */
export const formatearStock = (stock) => {
  if (stock === 0) {
    return {
      texto: 'Sin stock',
      color: 'error',
      disponible: false
    };
  } else if (stock <= 5) {
    return {
      texto: `Quedan ${stock}`,
      color: 'warning',
      disponible: true
    };
  } else {
    return {
      texto: 'Disponible',
      color: 'success',
      disponible: true
    };
  }
};

// ============================================
// HELPER: PLURALIZAR
// ============================================

/**
 * Retorna singular o plural según la cantidad
 * 
 * @param {number} cantidad - Cantidad
 * @param {string} singular - Palabra en singular
 * @param {string} plural - Palabra en plural (opcional)
 * @returns {string} - Texto con cantidad y palabra correcta
 * 
 * @example
 * pluralizar(1, 'producto')           // "1 producto"
 * pluralizar(5, 'producto')           // "5 productos"
 * pluralizar(1, 'usuario', 'usuarios') // "1 usuario"
 */
export const pluralizar = (cantidad, singular, plural = null) => {
  const palabraFinal = cantidad === 1 ? singular : (plural || singular + 's');
  return `${cantidad} ${palabraFinal}`;
};