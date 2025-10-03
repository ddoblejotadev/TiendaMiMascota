/**
 * VALIDADORES DE DATOS
 * 
 * Este archivo contiene todas las funciones de validación que se usan
 * en formularios de la aplicación.
 * 
 * IMPORTANTE: Las validaciones deben hacerse SIEMPRE en el frontend
 * para dar feedback inmediato al usuario, pero TAMBIÉN en el backend
 * para seguridad real.
 */

import { VALIDATION_RULES } from './constants';

// ============================================
// VALIDADOR DE RUN CHILENO
// ============================================

/**
 * Valida un RUN (Rol Único Nacional) chileno
 * 
 * FORMATO VÁLIDO:
 * - Sin puntos ni guion
 * - 7 a 9 caracteres
 * - Último carácter puede ser número o K
 * 
 * EJEMPLOS VÁLIDOS:
 * - "12345678K"
 * - "12345678k"
 * - "123456789"
 * - "1234567"
 * 
 * EJEMPLOS INVÁLIDOS:
 * - "12.345.678-K" (con formato)
 * - "abc123456" (con letras en medio)
 * - "123" (muy corto)
 * 
 * @param {string} run - RUN sin formato
 * @returns {boolean} - true si es válido, false si no
 */
export const validarRUN = (run) => {
  // 1. Verificar que run no sea null, undefined o vacío
  if (!run || typeof run !== 'string') {
    return false;
  }

  // 2. Limpiar espacios en blanco y convertir a mayúsculas
  run = run.trim().toUpperCase();

  // 3. Verificar longitud (7-9 caracteres)
  const { MIN_LENGTH, MAX_LENGTH } = VALIDATION_RULES.RUN;
  if (run.length < MIN_LENGTH || run.length > MAX_LENGTH) {
    return false;
  }

  // 4. Verificar formato con expresión regular
  // ^[0-9]{7,8}  = 7 u 8 dígitos numéricos
  // [0-9Kk]$     = termina en número o K/k
  const runRegex = /^[0-9]{7,8}[0-9Kk]$/;
  if (!runRegex.test(run)) {
    return false;
  }

  // 5. Extraer cuerpo y dígito verificador
  const cuerpo = run.slice(0, -1);  // Todos menos el último
  const digitoVerificador = run.slice(-1); // El último

  // 6. Calcular dígito verificador esperado
  let suma = 0;
  let multiplicador = 2;

  // Recorremos el RUN de derecha a izquierda
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  // 7. Calcular el dígito esperado
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

  // 8. Comparar con el dígito proporcionado
  return digitoVerificador === digitoFinal;
};

// ============================================
// VALIDADOR DE EMAIL
// ============================================

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
 * EJEMPLOS INVÁLIDOS:
 * - "correo@yahoo.com" (dominio no permitido)
 * - "correo@hotmail.com" (dominio no permitido)
 * - "correo sin @" (formato inválido)
 * 
 * @param {string} email - Email a validar
 * @returns {boolean} - true si es válido
 */
export const validarEmail = (email) => {
  // 1. Verificar que email no sea null/undefined/vacío
  if (!email || typeof email !== 'string') {
    return false;
  }

  // 2. Limpiar y convertir a minúsculas
  email = email.trim().toLowerCase();

  // 3. Verificar longitud máxima
  if (email.length > VALIDATION_RULES.EMAIL.MAX_LENGTH) {
    return false;
  }

  // 4. Validar formato básico de email con regex
  // ^[^\s@]+    = uno o más caracteres que NO sean espacio ni @
  // @           = símbolo @
  // [^\s@]+     = uno o más caracteres que NO sean espacio ni @
  // \.          = punto literal
  // [^\s@]+$    = uno o más caracteres hasta el final
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  // 5. Verificar que termine con un dominio permitido
  const { ALLOWED_DOMAINS } = VALIDATION_RULES.EMAIL;
  const tienedominioPermitido = ALLOWED_DOMAINS.some(dominio => 
    email.endsWith(dominio)
  );

  return tienedominioPermitido;
};

// ============================================
// VALIDADOR DE CONTRASEÑA
// ============================================

/**
 * Valida una contraseña según reglas definidas
 * 
 * REGLAS:
 * - Mínimo 4 caracteres
 * - Máximo 10 caracteres
 * - No puede estar vacía
 * 
 * NOTA: En producción real, las contraseñas deberían ser más seguras
 * (mínimo 8 caracteres, mayúsculas, números, símbolos, etc.)
 * 
 * @param {string} password - Contraseña a validar
 * @returns {boolean} - true si es válida
 */
export const validarPassword = (password) => {
  if (!password || typeof password !== 'string') {
    return false;
  }

  const { MIN_LENGTH, MAX_LENGTH } = VALIDATION_RULES.PASSWORD;
  const longitud = password.length;

  return longitud >= MIN_LENGTH && longitud <= MAX_LENGTH;
};

// ============================================
// VALIDADOR DE NOMBRE
// ============================================

/**
 * Valida un nombre
 * 
 * REGLAS:
 * - No puede estar vacío
 * - Máximo 50 caracteres
 * - Solo letras, espacios y tildes
 * 
 * @param {string} nombre - Nombre a validar
 * @returns {boolean} - true si es válido
 */
export const validarNombre = (nombre) => {
  if (!nombre || typeof nombre !== 'string') {
    return false;
  }

  nombre = nombre.trim();

  // Verificar que no esté vacío después del trim
  if (nombre.length === 0) {
    return false;
  }

  // Verificar longitud máxima
  if (nombre.length > VALIDATION_RULES.NAME.MAX_LENGTH) {
    return false;
  }

  // Verificar que solo contenga letras, espacios y tildes
  // ^                = inicio
  // [a-zA-ZáéíóúÁÉÍÓÚñÑ] = letras con tildes y ñ
  // \s               = espacios
  // +                = uno o más
  // $                = fin
  const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  return nombreRegex.test(nombre);
};

// ============================================
// VALIDADOR DE APELLIDOS
// ============================================

/**
 * Valida apellidos
 * Similar a validarNombre pero con longitud máxima diferente
 * 
 * @param {string} apellidos - Apellidos a validar
 * @returns {boolean} - true si son válidos
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

// ============================================
// VALIDADOR DE DIRECCIÓN
// ============================================

/**
 * Valida una dirección
 * 
 * REGLAS:
 * - No puede estar vacía
 * - Máximo 300 caracteres
 * - Permite letras, números, espacios y caracteres especiales comunes
 * 
 * @param {string} direccion - Dirección a validar
 * @returns {boolean} - true si es válida
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

  // Las direcciones pueden tener:
  // - Letras (con tildes)
  // - Números
  // - Espacios
  // - Comas, puntos, guiones, #
  const direccionRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,.#-]+$/;
  return direccionRegex.test(direccion);
};

// ============================================
// VALIDADOR DE TELÉFONO CHILENO
// ============================================

/**
 * Valida un número de teléfono chileno
 * 
 * FORMATOS VÁLIDOS:
 * - Celular: 9 dígitos empezando con 9 (ej: "912345678")
 * - Fijo: 9 dígitos empezando con 2 (ej: "223456789")
 * 
 * @param {string} telefono - Teléfono a validar
 * @returns {boolean} - true si es válido
 */
export const validarTelefono = (telefono) => {
  if (!telefono || typeof telefono !== 'string') {
    return false;
  }

  // Limpiar espacios, guiones y paréntesis
  telefono = telefono.replace(/[\s()-]/g, '');

  // Verificar que tenga 9 dígitos
  if (telefono.length !== 9) {
    return false;
  }

  // Verificar que solo tenga números
  if (!/^\d+$/.test(telefono)) {
    return false;
  }

  // Verificar que empiece con 9 (celular) o 2 (fijo)
  const primerDigito = telefono[0];
  return primerDigito === '9' || primerDigito === '2';
};

// ============================================
// VALIDADOR DE PRECIO
// ============================================

/**
 * Valida un precio
 * 
 * REGLAS:
 * - Debe ser un número positivo
 * - Mayor a 0
 * - Puede tener decimales
 * 
 * @param {number|string} precio - Precio a validar
 * @returns {boolean} - true si es válido
 */
export const validarPrecio = (precio) => {
  // Convertir a número si es string
  const precioNumero = typeof precio === 'string' ? parseFloat(precio) : precio;

  // Verificar que sea un número válido
  if (isNaN(precioNumero)) {
    return false;
  }

  // Verificar que sea mayor a 0
  return precioNumero > 0;
};

// ============================================
// VALIDADOR DE STOCK
// ============================================

/**
 * Valida un stock
 * 
 * REGLAS:
 * - Debe ser un número entero
 * - Mayor o igual a 0
 * 
 * @param {number|string} stock - Stock a validar
 * @returns {boolean} - true si es válido
 */
export const validarStock = (stock) => {
  const stockNumero = typeof stock === 'string' ? parseInt(stock) : stock;

  if (isNaN(stockNumero)) {
    return false;
  }

  // Verificar que sea entero y no negativo
  return Number.isInteger(stockNumero) && stockNumero >= 0;
};

// ============================================
// VALIDADOR DE FORMULARIO COMPLETO
// ============================================

/**
 * Valida múltiples campos a la vez
 * Útil para validar formularios completos
 * 
 * @param {Object} data - Objeto con los datos a validar
 * @param {Array} rules - Array de reglas de validación
 * @returns {Object} - { valid: boolean, errors: Object }
 * 
 * @example
 * const resultado = validarFormulario(
 *   { email: 'test@duoc.cl', password: '1234' },
 *   [
 *     { field: 'email', validator: validarEmail, message: 'Email inválido' },
 *     { field: 'password', validator: validarPassword, message: 'Contraseña inválida' }
 *   ]
 * );
 * // resultado = { valid: true, errors: {} }
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

// ============================================
// HELPER: FORMATEAR RUN
// ============================================

/**
 * Formatea un RUN chileno con puntos y guion
 * 
 * @param {string} run - RUN sin formato
 * @returns {string} - RUN formateado
 * 
 * @example
 * formatearRUN("12345678K") // "12.345.678-K"
 */
export const formatearRUN = (run) => {
  if (!run) return '';

  run = run.toString().toUpperCase().replace(/[^0-9K]/g, '');

  if (run.length <= 1) return run;

  const dv = run.slice(-1);
  const numero = run.slice(0, -1);

  // Agregar puntos cada 3 dígitos de derecha a izquierda
  const numeroFormateado = numero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${numeroFormateado}-${dv}`;
};

// ============================================
// HELPER: LIMPIAR RUN
// ============================================

/**
 * Limpia un RUN formateado dejando solo números y K
 * 
 * @param {string} run - RUN con o sin formato
 * @returns {string} - RUN limpio
 * 
 * @example
 * limpiarRUN("12.345.678-K") // "12345678K"
 */
export const limpiarRUN = (run) => {
  if (!run) return '';
  return run.toString().toUpperCase().replace(/[^0-9K]/g, '');
};