
import { VALIDATION_RULES } from './constants';

/**
 * Valida un RUN chileno
 * 
 * @param {string} run
 * @returns {boolean}
 */
export const validarRUN = (run) => {

  if (!run || typeof run !== 'string') {
    return false;
  }

  run = run.trim().toUpperCase();

  const { MIN_LENGTH, MAX_LENGTH } = VALIDATION_RULES.RUN;
  if (run.length < MIN_LENGTH || run.length > MAX_LENGTH) {
    return false;
  }

  const runRegex = /^[0-9]{7,8}[0-9Kk]$/;
  if (!runRegex.test(run)) {
    return false;
  }

  const cuerpo = run.slice(0, -1);
  const digitoVerificador = run.slice(-1);

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = suma % 11;
  const digitoEsperado = 11 - resto;
  
  let digitoFinal;
  if (digitoEsperado === 11) {
    digitoFinal = '0';
  } else if (digitoEsperado === 10) {
    digitoFinal = 'K';
  } else {
    digitoFinal = digitoEsperado.toString();
  }

  return digitoVerificador === digitoFinal;
};

/**
 * Valida un email según dominios permitidos
 * 
 * DOMINIOS PERMITIDOS:
 * - @duoc.cl (estudiantes)
 * - @profesor.duoc.cl (profesores)
 * - @gmail.com (público general)
 * 
 * EJEMPLOS VÁLIDOS:
 * - "juan.perez@duoc.cl"
 * - "maria.gonzalez@profesor.duoc.cl"
 * - "contacto@gmail.com"
 * 
 * @param {string} email
 * @returns {boolean}
 */
export const validarEmail = (email) => {

  if (!email || typeof email !== 'string') {
    return false;
  }

  email = email.trim().toLowerCase();

  if (email.length > VALIDATION_RULES.EMAIL.MAX_LENGTH) {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  const { ALLOWED_DOMAINS } = VALIDATION_RULES.EMAIL;
  const tienedominioPermitido = ALLOWED_DOMAINS.some(dominio => 
    email.endsWith(dominio)
  );

  return tienedominioPermitido;
};

/**
 * Valida una contraseña según reglas definidas
 * 
 * REGLAS:
 * - Mínimo 4 caracteres
 * - Máximo 10 caracteres
 * - No puede estar vacía
 * 
 * @param {string} password
 * @returns {boolean}
 */
export const validarPassword = (password) => {
  if (!password || typeof password !== 'string') {
    return false;
  }

  const { MIN_LENGTH, MAX_LENGTH } = VALIDATION_RULES.PASSWORD;
  const longitud = password.length;

  return longitud >= MIN_LENGTH && longitud <= MAX_LENGTH;
};

/**
 * Valida un nombre
 * 
 * REGLAS:
 * - No puede estar vacío
 * - Máximo 50 caracteres
 * - Solo letras, espacios y tildes
 * 
 * @param {string} nombre 
 * @returns {boolean}
 */
export const validarNombre = (nombre) => {
  if (!nombre || typeof nombre !== 'string') {
    return false;
  }

  nombre = nombre.trim();

  if (nombre.length === 0) {
    return false;
  }

  if (nombre.length > VALIDATION_RULES.NAME.MAX_LENGTH) {
    return false;
  }

  const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  return nombreRegex.test(nombre);
};

/**
 * Valida apellidos
 * 
 * @param {string} apellidos
 * @returns {boolean}
 */
export const validarApellidos = (apellidos) => {
  if (!apellidos || typeof apellidos !== 'string') {
    return false;
  }

  apellidos = apellidos.trim();

  if (apellidos.length === 0) {
    return false;
  }

  if (apellidos.length > VALIDATION_RULES.LASTNAME.MAX_LENGTH) {
    return false;
  }

  const apellidosRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  return apellidosRegex.test(apellidos);
};

/**
 * Valida una dirección
 * 
 * REGLAS:
 * - No puede estar vacía
 * - Máximo 300 caracteres
 * - Permite letras, números, espacios y caracteres especiales comunes
 * 
 * @param {string} direccion
 * @returns {boolean}
 */
export const validarDireccion = (direccion) => {
  if (!direccion || typeof direccion !== 'string') {
    return false;
  }

  direccion = direccion.trim();

  if (direccion.length === 0) {
    return false;
  }

  if (direccion.length > VALIDATION_RULES.ADDRESS.MAX_LENGTH) {
    return false;
  }

  const direccionRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,.#-]+$/;
  return direccionRegex.test(direccion);
};

/**
 * Valida un número de teléfono
 * 
 * FORMATOS VÁLIDOS:
 * - Celular: 9 dígitos empezando con 9 (ej: "912345678")
 * - Fijo: 9 dígitos empezando con 2 (ej: "223456789")
 * 
 * @param {string} telefono
 * @returns {boolean}
 */
export const validarTelefono = (telefono) => {
  if (!telefono || typeof telefono !== 'string') {
    return false;
  }

  telefono = telefono.replace(/[\s()-]/g, '');

  if (telefono.length !== 9) {
    return false;
  }

  if (!/^\d+$/.test(telefono)) {
    return false;
  }

  const primerDigito = telefono[0];
  return primerDigito === '9' || primerDigito === '2';
};

/**
 * Valida un precio
 * 
 * REGLAS:
 * - Debe ser un número positivo
 * - Mayor a 0
 * - Puede tener decimales
 * 
 * @param {number|string} precio
 * @returns {boolean}
 */
export const validarPrecio = (precio) => {

  const precioNumero = typeof precio === 'string' ? parseFloat(precio) : precio;

  if (isNaN(precioNumero)) {
    return false;
  }

  return precioNumero > 0;
};

/**
 * Valida un stock
 * 
 * REGLAS:
 * - Debe ser un número entero
 * - Mayor o igual a 0
 * 
 * @param {number|string} stock
 * @returns {boolean}
 */
export const validarStock = (stock) => {
  const stockNumero = typeof stock === 'string' ? parseInt(stock) : stock;

  if (isNaN(stockNumero)) {
    return false;
  }

  return Number.isInteger(stockNumero) && stockNumero >= 0;
};

/**
 * Valida múltiples campos a la vez
 * 
 * @param {Object} data
 * @param {Array} rules
 * @returns {Object}
 * 
 * @example
 * 
 */
export const validarFormulario = (data, rules) => {
  const errors = {};
  let valid = true;

  rules.forEach(rule => {
    const { field, validator, message } = rule;
    const value = data[field];

    if (!validator(value)) {
      errors[field] = message;
      valid = false;
    }
  });

  return { valid, errors };
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

  run = run.toString().toUpperCase().replace(/[^0-9K]/g, '');

  if (run.length <= 1) return run;

  const dv = run.slice(-1);
  const numero = run.slice(0, -1);

  const numeroFormateado = numero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${numeroFormateado}-${dv}`;
};

/**
 * Limpia un RUN formateado
 * 
 * @param {string} run
 * @returns {string}
 * 
 * @example
 * 
 */
export const limpiarRUN = (run) => {
  if (!run) return '';
  return run.toString().toUpperCase().replace(/[^0-9K]/g, '');
};