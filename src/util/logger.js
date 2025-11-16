/**
 * SISTEMA DE LOGGING
 * Reemplaza console.log con niveles configurables
 * En producción solo muestra errores y warnings
 */

const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

// Determinar nivel según entorno
const currentLevel = import.meta.env.PROD 
  ? LOG_LEVELS.WARN  // Solo warnings y errores en producción
  : LOG_LEVELS.DEBUG; // Todo en desarrollo

/**
 * Logger centralizado con niveles
 */
export const logger = {
  error: (...args) => {
    if (currentLevel >= LOG_LEVELS.ERROR) {
      console.error('❌', ...args);
    }
  },
  
  warn: (...args) => {
    if (currentLevel >= LOG_LEVELS.WARN) {
      console.warn('⚠️', ...args);
    }
  },
  
  info: (...args) => {
    if (currentLevel >= LOG_LEVELS.INFO) {
      console.log('ℹ️', ...args);
    }
  },
  
  debug: (...args) => {
    if (currentLevel >= LOG_LEVELS.DEBUG) {
      console.log('🔍', ...args);
    }
  },
  
  success: (...args) => {
    if (currentLevel >= LOG_LEVELS.INFO) {
      console.log('✅', ...args);
    }
  }
};

export default logger;

