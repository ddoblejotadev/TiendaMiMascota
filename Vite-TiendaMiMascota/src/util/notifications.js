/**
 * SISTEMA DE NOTIFICACIONES (TOAST)
 * 
 * Sistema de notificaciones estilo "toast" que aparecen temporalmente
 * en la pantalla para dar feedback al usuario.
 * 
 * TIPOS:
 * - success: Acción exitosa (verde)
 * - error: Error o problema (rojo)
 * - warning: Advertencia (amarillo/naranja)
 * - info: Información general (azul)
 * 
 * FUNCIONAMIENTO:
 * Este archivo emite eventos que serán escuchados por el componente
 * Notification.jsx que renderizará visualmente las notificaciones.
 */

// ============================================
// TIPOS DE NOTIFICACIÓN
// ============================================

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// ============================================
// CONFIGURACIÓN POR DEFECTO
// ============================================

const DEFAULT_CONFIG = {
  duration: 3000,        // 3 segundos
  position: 'top-right', // Posición en pantalla
  showIcon: true,        // Mostrar icono
  closeButton: true      // Mostrar botón cerrar
};

// ============================================
// SISTEMA DE EVENTOS
// ============================================

/**
 * Listeners que escuchan las notificaciones
 * Los componentes React se "suscriben" a estos eventos
 */
let notificationListeners = [];

/**
 * Registra un listener para escuchar notificaciones
 * 
 * @param {Function} callback - Función que se ejecuta cuando hay notificación
 * @returns {Function} - Función para desuscribirse
 * 
 * @example
 * const unsubscribe = addNotificationListener((notification) => {
 *   console.log('Nueva notificación:', notification);
 * });
 * 
 * // Cuando ya no necesites escuchar:
 * unsubscribe();
 */
export const addNotificationListener = (callback) => {
  notificationListeners.push(callback);
  
  // Retorna función para desuscribirse
  return () => {
    notificationListeners = notificationListeners.filter(
      listener => listener !== callback
    );
  };
};

/**
 * Emite una notificación a todos los listeners
 * 
 * @param {Object} notification - Objeto con datos de la notificación
 */
const emitNotification = (notification) => {
  notificationListeners.forEach(listener => {
    listener(notification);
  });
};

// ============================================
// FUNCIÓN PRINCIPAL: MOSTRAR NOTIFICACIÓN
// ============================================

/**
 * Muestra una notificación
 * 
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo (success, error, warning, info)
 * @param {Object} options - Opciones adicionales
 * 
 * @example
 * showNotification('Producto agregado', 'success');
 * showNotification('Error al guardar', 'error', { duration: 5000 });
 */
export const showNotification = (message, type = NOTIFICATION_TYPES.INFO, options = {}) => {
  // Validar tipo
  if (!Object.values(NOTIFICATION_TYPES).includes(type)) {
    console.warn(`Tipo de notificación inválido: ${type}. Usando 'info'.`);
    type = NOTIFICATION_TYPES.INFO;
  }

  // Crear objeto de notificación
  const notification = {
    id: Date.now() + Math.random(), // ID único
    message,
    type,
    timestamp: new Date(),
    ...DEFAULT_CONFIG,
    ...options
  };

  // Emitir notificación
  emitNotification(notification);

  // Log en consola (útil para debugging)
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Notification ${type}]:`, message);
  }
};

// ============================================
// ATAJOS PARA CADA TIPO
// ============================================

/**
 * Muestra notificación de éxito (verde)
 * 
 * @param {string} message - Mensaje
 * @param {Object} options - Opciones
 * 
 * @example
 * notifySuccess('Producto guardado correctamente');
 */
export const notifySuccess = (message, options = {}) => {
  showNotification(message, NOTIFICATION_TYPES.SUCCESS, options);
};

/**
 * Muestra notificación de error (roja)
 * 
 * @param {string} message - Mensaje
 * @param {Object} options - Opciones
 * 
 * @example
 * notifyError('No se pudo conectar con el servidor');
 */
export const notifyError = (message, options = {}) => {
  showNotification(message, NOTIFICATION_TYPES.ERROR, {
    duration: 5000, // Errores duran más tiempo
    ...options
  });
};

/**
 * Muestra notificación de advertencia (amarilla/naranja)
 * 
 * @param {string} message - Mensaje
 * @param {Object} options - Opciones
 * 
 * @example
 * notifyWarning('Stock bajo: quedan solo 3 unidades');
 */
export const notifyWarning = (message, options = {}) => {
  showNotification(message, NOTIFICATION_TYPES.WARNING, options);
};

/**
 * Muestra notificación informativa (azul)
 * 
 * @param {string} message - Mensaje
 * @param {Object} options - Opciones
 * 
 * @example
 * notifyInfo('Se ha actualizado la versión de la aplicación');
 */
export const notifyInfo = (message, options = {}) => {
  showNotification(message, NOTIFICATION_TYPES.INFO, options);
};

// ============================================
// NOTIFICACIONES CON ACCIONES
// ============================================

/**
 * Muestra notificación con botón de acción
 * 
 * @param {string} message - Mensaje
 * @param {string} actionText - Texto del botón
 * @param {Function} onAction - Función a ejecutar al hacer clic
 * @param {Object} options - Opciones
 * 
 * @example
 * notifyWithAction(
 *   'Producto agregado al carrito',
 *   'Ver carrito',
 *   () => navigate('/carrito')
 * );
 */
export const notifyWithAction = (message, actionText, onAction, options = {}) => {
  showNotification(message, NOTIFICATION_TYPES.SUCCESS, {
    ...options,
    action: {
      text: actionText,
      onClick: onAction
    }
  });
};

// ============================================
// NOTIFICACIONES DE CARGA/PROMESAS
// ============================================

/**
 * Muestra notificación durante una promesa
 * Automáticamente muestra éxito o error según resultado
 * 
 * @param {Promise} promise - Promesa a ejecutar
 * @param {Object} messages - Mensajes para cada estado
 * @returns {Promise} - La misma promesa
 * 
 * @example
 * await notifyPromise(
 *   guardarProducto(data),
 *   {
 *     loading: 'Guardando producto...',
 *     success: 'Producto guardado correctamente',
 *     error: 'Error al guardar producto'
 *   }
 * );
 */
export const notifyPromise = async (promise, messages = {}) => {
  const {
    loading = 'Cargando...',
    success = 'Operación exitosa',
    error = 'Ocurrió un error'
  } = messages;

  // Mostrar mensaje de carga
  const loadingId = Date.now();
  showNotification(loading, NOTIFICATION_TYPES.INFO, {
    id: loadingId,
    duration: 0, // No desaparece automáticamente
    showIcon: true
  });

  try {
    const result = await promise;
    
    // Ocultar loading y mostrar éxito
    hideNotification(loadingId);
    notifySuccess(success);
    
    return result;
  } catch (err) {
    // Ocultar loading y mostrar error
    hideNotification(loadingId);
    notifyError(typeof error === 'function' ? error(err) : error);
    
    throw err;
  }
};

/**
 * Oculta una notificación específica
 * 
 * @param {number} notificationId - ID de la notificación
 */
export const hideNotification = (notificationId) => {
  emitNotification({
    id: notificationId,
    action: 'hide'
  });
};

/**
 * Oculta todas las notificaciones
 */
export const hideAllNotifications = () => {
  emitNotification({
    action: 'hideAll'
  });
};

// ============================================
// HELPERS DE USO COMÚN
// ============================================

/**
 * Notificación de operación CRUD exitosa
 */
export const notifyCRUDSuccess = {
  created: (entity = 'Registro') => notifySuccess(`${entity} creado correctamente`),
  updated: (entity = 'Registro') => notifySuccess(`${entity} actualizado correctamente`),
  deleted: (entity = 'Registro') => notifySuccess(`${entity} eliminado correctamente`),
  saved: (entity = 'Registro') => notifySuccess(`${entity} guardado correctamente`)
};

/**
 * Notificación de operación CRUD fallida
 */
export const notifyCRUDError = {
  created: (entity = 'Registro') => notifyError(`Error al crear ${entity}`),
  updated: (entity = 'Registro') => notifyError(`Error al actualizar ${entity}`),
  deleted: (entity = 'Registro') => notifyError(`Error al eliminar ${entity}`),
  saved: (entity = 'Registro') => notifyError(`Error al guardar ${entity}`)
};

/**
 * Notificaciones relacionadas con autenticación
 */
export const notifyAuth = {
  loginSuccess: () => notifySuccess('Inicio de sesión exitoso'),
  loginError: () => notifyError('Credenciales incorrectas'),
  logoutSuccess: () => notifyInfo('Sesión cerrada correctamente'),
  registerSuccess: () => notifySuccess('Registro exitoso. ¡Bienvenido!'),
  registerError: () => notifyError('Error en el registro. Verifica los datos.'),
  unauthorized: () => notifyError('No tienes permisos para realizar esta acción'),
  sessionExpired: () => notifyWarning('Tu sesión ha expirado. Inicia sesión nuevamente.')
};

/**
 * Notificaciones relacionadas con el carrito
 */
export const notifyCart = {
  added: (productName) => notifySuccess(`"${productName}" agregado al carrito`),
  removed: (productName) => notifyInfo(`"${productName}" eliminado del carrito`),
  updated: () => notifyInfo('Carrito actualizado'),
  cleared: () => notifyInfo('Carrito vaciado'),
  checkoutSuccess: () => notifySuccess('¡Compra realizada con éxito!'),
  checkoutError: () => notifyError('Error al procesar la compra')
};

/**
 * Notificaciones relacionadas con validación
 */
export const notifyValidation = {
  invalidEmail: () => notifyError('Email inválido'),
  invalidRUN: () => notifyError('RUN inválido'),
  invalidPassword: () => notifyError('Contraseña inválida (4-10 caracteres)'),
  requiredFields: () => notifyError('Por favor completa todos los campos requeridos'),
  passwordMismatch: () => notifyError('Las contraseñas no coinciden')
};

/**
 * Notificaciones relacionadas con la red
 */
export const notifyNetwork = {
  offline: () => notifyWarning('Sin conexión a internet'),
  online: () => notifySuccess('Conexión restaurada'),
  error: () => notifyError('Error de conexión. Verifica tu internet.')
};