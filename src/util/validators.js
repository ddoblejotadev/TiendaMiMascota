/**
 * FUNCIONES DE VALIDACIÓN
 * Funciones para validar formularios y datos
 */

/**
 * Valida si un email tiene formato correcto
 * @param {string} email - Email a validar
 * @returns {boolean} - true si es válido
 */
export function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida si una contraseña cumple los requisitos mínimos
 * @param {string} password - Contraseña a validar
 * @returns {boolean} - true si es válida (mínimo 6 caracteres)
 */
export function validarPassword(password) {
  return password.length >= 6;
}

/**
 * Valida si un campo está vacío
 * @param {string} valor - Valor a validar
 * @returns {boolean} - true si NO está vacío
 */
export function validarCampoRequerido(valor) {
  return valor && valor.trim().length > 0;
}

/**
 * Valida un RUT chileno (simplificado)
 * @param {string} rut - RUT a validar (ej: "12345678-9")
 * @returns {boolean} - true si es válido
 */
export function validarRUT(rut) {
  // Remover puntos y guión
  const rutLimpio = rut.replace(/[.-]/g, '');
  
  // Debe tener entre 8 y 9 caracteres
  if (rutLimpio.length < 8 || rutLimpio.length > 9) {
    return false;
  }
  
  // Validación básica: los primeros dígitos deben ser números
  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1).toUpperCase();
  
  return /^\d+$/.test(cuerpo) && /^[0-9K]$/.test(dv);
}

/**
 * Valida un número de teléfono chileno
 * @param {string} telefono - Teléfono a validar
 * @returns {boolean} - true si es válido
 */
export function validarTelefono(telefono) {
  // Remover todo excepto números
  const numeros = telefono.replace(/\D/g, '');
  
  // Debe tener 9 dígitos (celular) o 11 con código país
  return numeros.length === 9 || numeros.length === 11;
}

/**
 * Valida una etiqueta para una dirección (nombre corto como 'Casa', 'Oficina')
 * Requerimos al menos 2 caracteres si se provee
 */
export function validarEtiqueta(etiqueta) {
  if (!etiqueta) return false;
  try {
    return String(etiqueta).trim().length >= 2;
  } catch {
    return false;
  }
}

/**
 * Valida un objeto de formulario completo
 * @param {Object} datos - Objeto con los datos del formulario
 * @param {Array} camposRequeridos - Array con nombres de campos requeridos
 * @returns {Object} - Objeto con errores { campo: mensaje }
 */
export function validarFormulario(datos, camposRequeridos) {
  const errores = {};
  
  // Validar campos requeridos
  camposRequeridos.forEach(campo => {
    if (!validarCampoRequerido(datos[campo])) {
      errores[campo] = 'Este campo es obligatorio';
    }
  });
  
  // Validar email si existe
  if (datos.email && !validarEmail(datos.email)) {
    errores.email = 'Email inválido';
  }
  
  // Validar password si existe
  if (datos.password && !validarPassword(datos.password)) {
    errores.password = 'La contraseña debe tener al menos 6 caracteres';
  }
  
  // Validar confirmación de password
  if (datos.password && datos.confirmPassword && 
      datos.password !== datos.confirmPassword) {
    errores.confirmPassword = 'Las contraseñas no coinciden';
  }
  
  return errores;
}