/**
 * SISTEMA DE CONFIRMACIONES (DIALOGS)
 * 
 * Sistema de diálogos de confirmación para acciones críticas
 * que requieren aprobación del usuario antes de ejecutarse.
 * 
 * CASOS DE USO:
 * - Eliminar registros
 * - Cancelar operaciones
 * - Confirmar compras
 * - Cerrar sesión
 */

// ============================================
// TIPOS DE CONFIRMACIÓN
// ============================================

export const CONFIRM_TYPES = {
  DANGER: 'danger',     // Rojo - Acciones destructivas
  WARNING: 'warning',   // Amarillo - Acciones con precaución
  INFO: 'info',         // Azul - Información general
  SUCCESS: 'success'    // Verde - Confirmación positiva
};

// ============================================
// CONFIGURACIÓN POR DEFECTO
// ============================================

const DEFAULT_CONFIRM_CONFIG = {
  title: '¿Estás seguro?',
  message: 'Esta acción no se puede deshacer',
  confirmText: 'Confirmar',
  cancelText: 'Cancelar',
  type: CONFIRM_TYPES.WARNING,
  showIcon: true
};

// ============================================
// SISTEMA DE EVENTOS
// ============================================

let confirmListeners = [];

/**
 * Registra un listener para escuchar confirmaciones
 * Similar al sistema de notificaciones
 * 
 * @param {Function} callback - Función que se ejecuta cuando hay confirmación
 * @returns {Function} - Función para desuscribirse
 */
export const addConfirmListener = (callback) => {
  confirmListeners.push(callback);
  
  return () => {
    confirmListeners = confirmListeners.filter(
      listener => listener !== callback
    );
  };
};

/**
 * Emite una solicitud de confirmación
 * 
 * @param {Object} confirmation - Objeto con datos de la confirmación
 */
const emitConfirmation = (confirmation) => {
  confirmListeners.forEach(listener => {
    listener(confirmation);
  });
};

// ============================================
// FUNCIÓN PRINCIPAL: MOSTRAR CONFIRMACIÓN
// ============================================

/**
 * Muestra un diálogo de confirmación
 * Retorna una Promesa que resuelve con true/false
 * 
 * @param {Object} config - Configuración del diálogo
 * @returns {Promise<boolean>} - true si confirma, false si cancela
 * 
 * @example
 * const confirmed = await showConfirm({
 *   title: '¿Eliminar producto?',
 *   message: 'Esta acción no se puede deshacer',
 *   confirmText: 'Eliminar',
 *   type: 'danger'
 * });
 * 
 * if (confirmed) {
 *   deleteProduct(id);
 * }
 */
export const showConfirm = (config = {}) => {
  return new Promise((resolve) => {
    const confirmation = {
      id: Date.now() + Math.random(),
      ...DEFAULT_CONFIRM_CONFIG,
      ...config,
      onConfirm: () => resolve(true),
      onCancel: () => resolve(false)
    };

    emitConfirmation(confirmation);

    // Log en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('[Confirmation]:', confirmation.title);
    }
  });
};

// ============================================
// ATAJOS PARA CADA TIPO
// ============================================

/**
 * Confirmación de acción peligrosa (eliminar, borrar)
 * 
 * @param {Object} config - Configuración
 * @returns {Promise<boolean>}
 * 
 * @example
 * const confirmed = await confirmDanger({
 *   title: '¿Eliminar usuario?',
 *   message: 'Se eliminarán todos sus datos'
 * });
 */
export const confirmDanger = (config = {}) => {
  return showConfirm({
    type: CONFIRM_TYPES.DANGER,
    confirmText: 'Eliminar',
    ...config
  });
};

/**
 * Confirmación de advertencia
 * 
 * @param {Object} config - Configuración
 * @returns {Promise<boolean>}
 * 
 * @example
 * const confirmed = await confirmWarning({
 *   title: '¿Continuar sin guardar?',
 *   message: 'Los cambios se perderán'
 * });
 */
export const confirmWarning = (config = {}) => {
  return showConfirm({
    type: CONFIRM_TYPES.WARNING,
    ...config
  });
};

/**
 * Confirmación informativa
 * 
 * @param {Object} config - Configuración
 * @returns {Promise<boolean>}
 */
export const confirmInfo = (config = {}) => {
  return showConfirm({
    type: CONFIRM_TYPES.INFO,
    confirmText: 'Aceptar',
    ...config
  });
};

// ============================================
// CONFIRMACIONES PREDEFINIDAS
// ============================================

/**
 * Confirmaciones CRUD comunes
 */
export const confirmDelete = {
  /**
   * Confirmar eliminación genérica
   */
  generic: (entityName = 'este registro') => {
    return confirmDanger({
      title: '¿Eliminar?',
      message: `¿Estás seguro de eliminar ${entityName}? Esta acción no se puede deshacer.`,
      confirmText: 'Eliminar'
    });
  },

  /**
   * Confirmar eliminación de producto
   */
  product: (productName) => {
    return confirmDanger({
      title: '¿Eliminar producto?',
      message: `¿Estás seguro de eliminar "${productName}"? Esta acción no se puede deshacer.`,
      confirmText: 'Eliminar producto'
    });
  },

  /**
   * Confirmar eliminación de usuario
   */
  user: (userName) => {
    return confirmDanger({
      title: '¿Eliminar usuario?',
      message: `¿Estás seguro de eliminar al usuario "${userName}"? Se eliminarán todos sus datos.`,
      confirmText: 'Eliminar usuario'
    });
  },

  /**
   * Confirmar eliminación de orden
   */
  order: (orderId) => {
    return confirmDanger({
      title: '¿Cancelar pedido?',
      message: `¿Estás seguro de cancelar el pedido #${orderId}?`,
      confirmText: 'Cancelar pedido'
    });
  }
};

/**
 * Confirmaciones de navegación
 */
export const confirmNavigation = {
  /**
   * Confirmar salir sin guardar
   */
  unsavedChanges: () => {
    return confirmWarning({
      title: '¿Salir sin guardar?',
      message: 'Tienes cambios sin guardar. ¿Deseas continuar sin guardar?',
      confirmText: 'Salir sin guardar',
      cancelText: 'Seguir editando'
    });
  },

  /**
   * Confirmar cerrar sesión
   */
  logout: () => {
    return confirmInfo({
      title: '¿Cerrar sesión?',
      message: '¿Estás seguro de cerrar tu sesión?',
      confirmText: 'Cerrar sesión',
      type: CONFIRM_TYPES.WARNING
    });
  }
};

/**
 * Confirmaciones de carrito
 */
export const confirmCart = {
  /**
   * Confirmar vaciar carrito
   */
  clear: () => {
    return confirmWarning({
      title: '¿Vaciar carrito?',
      message: 'Se eliminarán todos los productos del carrito',
      confirmText: 'Vaciar carrito'
    });
  },

  /**
   * Confirmar checkout
   */
  checkout: (total) => {
    return confirmInfo({
      title: 'Confirmar compra',
      message: `Total a pagar: ${total}. ¿Deseas proceder con la compra?`,
      confirmText: 'Confirmar compra',
      type: CONFIRM_TYPES.SUCCESS
    });
  }
};

/**
 * Confirmaciones de administración
 */
export const confirmAdmin = {
  /**
   * Confirmar cambio de rol de usuario
   */
  changeRole: (userName, newRole) => {
    return confirmWarning({
      title: '¿Cambiar rol?',
      message: `¿Cambiar el rol de "${userName}" a "${newRole}"?`,
      confirmText: 'Cambiar rol'
    });
  },

  /**
   * Confirmar desactivar producto
   */
  deactivateProduct: (productName) => {
    return confirmWarning({
      title: '¿Desactivar producto?',
      message: `"${productName}" dejará de estar disponible para la venta`,
      confirmText: 'Desactivar'
    });
  },

  /**
   * Confirmar actualización masiva
   */
  bulkUpdate: (count) => {
    return confirmWarning({
      title: '¿Actualizar múltiples registros?',
      message: `Se actualizarán ${count} registros. ¿Deseas continuar?`,
      confirmText: `Actualizar ${count} registros`
    });
  }
};

/**
 * Oculta el diálogo de confirmación actual
 */
export const hideConfirm = () => {
  emitConfirmation({
    action: 'hide'
  });
};