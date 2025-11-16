/**
 * MANEJO CENTRALIZADO DE ERRORES
 * Normaliza y formatea errores de la API y otros
 */

import logger from './logger';

/**
 * Parsea un error y retorna un mensaje amigable
 * @param {Error} error - Error a procesar
 * @returns {string} - Mensaje de error formateado
 */
export function parseError(error) {
  if (!error) {
    return 'Error desconocido';
  }

  // Error con respuesta del servidor
  if (error.response) {
    const { status, data } = error.response;
    
    logger.error('Error del servidor:', { status, data });

    // Mensajes específicos según código de estado
    switch (status) {
      case 400:
        return data?.mensaje || data?.message || 'Datos inválidos';
      case 401:
        return 'Sesión expirada. Por favor inicia sesión nuevamente';
      case 403:
        return 'No tienes permisos para realizar esta acción';
      case 404:
        return 'Recurso no encontrado';
      case 409:
        // Conflicto - usualmente email duplicado
        if (data?.mensaje?.toLowerCase().includes('email') || 
            data?.mensaje?.toLowerCase().includes('correo') ||
            data?.mensaje?.toLowerCase().includes('existe')) {
          return 'Este correo electrónico ya está registrado';
        }
        return data?.mensaje || data?.message || 'Conflicto con los datos';
      case 500:
        return 'Error del servidor. Por favor intenta más tarde';
      default:
        return data?.mensaje || data?.message || `Error del servidor (${status})`;
    }
  }

  // Error sin respuesta (red, timeout, etc.)
  if (error.request) {
    logger.error('Error de conexión:', error);
    return 'No se pudo conectar con el servidor. Verifica tu conexión';
  }

  // Error en la configuración de la petición o mensaje de error
  if (error.message) {
    logger.error('Error:', error.message);
    return error.message;
  }

  // Error desconocido
  logger.error('Error desconocido:', error);
  return 'Ocurrió un error inesperado';
}

/**
 * Maneja errores de forma consistente con logging
 * @param {Error} error - Error a manejar
 * @param {string} context - Contexto donde ocurrió el error
 * @returns {string} - Mensaje de error formateado
 */
export function handleError(error, context = 'Operación') {
  const message = parseError(error);
  logger.error(`${context} falló:`, message);
  return message;
}

/**
 * Wrapper para funciones async que maneja errores automáticamente
 * @param {Function} asyncFn - Función async a envolver
 * @param {string} context - Contexto para logging
 * @returns {Function} - Función envuelta con manejo de errores
 */
export function withErrorHandling(asyncFn, context = 'Operación') {
  return async (...args) => {
    try {
      return await asyncFn(...args);
    } catch (error) {
      const message = handleError(error, context);
      throw new Error(message);
    }
  };
}

export default {
  parse: parseError,
  handle: handleError,
  withErrorHandling
};

