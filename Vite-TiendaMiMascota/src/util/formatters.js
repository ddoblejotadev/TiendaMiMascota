
import { FORMAT } from './constants';

/**
 * Formatea un número como precio
 * 
 * @param {number} precio
 * @returns {string}
 * 
 * @example
 * 
 */
export const formatearPrecio = (precio) => {

  if (precio === null || precio === undefined || isNaN(precio)) {
    return '$0';
  }

  const precioNumero = typeof precio === 'string' ? parseFloat(precio) : precio;

  const formateador = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  return formateador.format(precioNumero);
};

/**
 * Formatea un número con separadores de miles
 * 
 * @param {number} numero
 * @returns {string}
 * 
 * @example
 * 
 */
export const formatearNumero = (numero) => {
  if (numero === null || numero === undefined || isNaN(numero)) {
    return '0';
  }

  const numeroFormateado = new Intl.NumberFormat('es-CL').format(numero);
  return numeroFormateado;
};

/**
 * Formatea una fecha
 * 
 * @param {Date|string} fecha
 * @returns {string}
 * 
 * @example
 * 
 */
export const formatearFecha = (fecha) => {
  if (!fecha) return '';

  const fechaObj = fecha instanceof Date ? fecha : new Date(fecha);

  if (isNaN(fechaObj.getTime())) {
    return 'Fecha inválida';
  }

  const formateador = new Intl.DateTimeFormat('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return formateador.format(fechaObj);
};

/**
 * Formatea una fecha con hora al formato
 * 
 * @param {Date|string} fecha
 * @returns {string}
 * 
 * @example
 * 
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
    hour12: false
  });

  return formateador.format(fechaObj);
};

/**
 * Formatea una fecha de forma relativa
 * 
 * @param {Date|string} fecha
 * @returns {string}
 * 
 * @example
 * 
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

/**
 * Formatea un número telefónico
 * 
 * @param {string} telefono
 * @returns {string}
 * 
 * @example
 * 
 */
export const formatearTelefono = (telefono) => {
  if (!telefono) return '';

  const telefonoLimpio = telefono.toString().replace(/\D/g, '');

  if (telefonoLimpio.length !== 9) {
    return telefono;
  }

  const codigo = telefonoLimpio[0]; // 9 o 2
  const parte1 = telefonoLimpio.slice(1, 5);
  const parte2 = telefonoLimpio.slice(5, 9);

  return `+56 ${codigo} ${parte1} ${parte2}`;
};

/**
 * Formatea un RUN chileno con puntos y guion
 * 
 * @param {string} run 
 * @returns {string}
 * 
 * @example
 * 
 */
export const formatearRUN = (run) => {
  if (!run) return '';

  const runLimpio = run.toString().toUpperCase().replace(/[^0-9K]/g, '');

  if (runLimpio.length <= 1) return runLimpio;

  const dv = runLimpio.slice(-1);
  const numero = runLimpio.slice(0, -1);

  const numeroFormateado = numero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${numeroFormateado}-${dv}`;
};

/**
 * 
 * @param {string} texto
 * @returns {string}
 * 
 * @example
 * 
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
 * @param {string} texto
 * @returns {string}
 * 
 * @example
 * 
 */
export const capitalizarPrimeraLetra = (texto) => {
  if (!texto || typeof texto !== 'string') return '';

  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};

/**
 * Trunca un texto a un largo específico
 * 
 * @param {string} texto
 * @param {number} largo
 * @returns {string}
 * 
 * @example
 * 
 */
export const truncarTexto = (texto, largo = 50) => {
  if (!texto || typeof texto !== 'string') return '';

  if (texto.length <= largo) return texto;

  return texto.substring(0, largo) + '...';
};

/**
 * Formatea un número como porcentaje
 * 
 * @param {number} numero
 * @param {number} decimales
 * @returns {string}
 * 
 * @example
 * 
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

/**
 * Formatea bytes a tamaño legible (KB, MB, GB)
 * 
 * @param {number} bytes
 * @returns {string}
 * 
 * @example
 * 
 */
export const formatearTamanioArchivo = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const tamanios = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + tamanios[i];
};

/**
 * Formatea el stock con mensaje según disponibilidad
 * 
 * @param {number} stock
 * @returns {Object}
 * 
 * @example
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

/**
 * Retorna singular o plural según la cantidad
 * 
 * @param {number} cantidad
 * @param {string} singular
 * @param {string} plural
 * @returns {string}
 * 
 * @example
 */
export const pluralizar = (cantidad, singular, plural = null) => {
  const palabraFinal = cantidad === 1 ? singular : (plural || singular + 's');
  return `${cantidad} ${palabraFinal}`;
};