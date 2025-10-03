/**
 * CONSTANTES GLOBALES DE LA APLICACIÓN
 * 
 * Este archivo centraliza todos los valores constantes que se usan
 * en múltiples partes de la aplicación.
 * 
 * VENTAJAS:
 * - Evita errores de tipeo
 * - Facilita cambios futuros
 * - Mejora la legibilidad del código
 */

// ============================================
// ROLES DE USUARIO
// ============================================
export const USER_ROLES = {
  ADMIN: 'administrador',
  VENDOR: 'vendedor',
  CLIENT: 'cliente'
};

// ============================================
// ESTADOS DE ÓRDENES
// ============================================
export const ORDER_STATUS = {
  PENDING: 'pendiente',      // Orden recién creada
  PROCESSING: 'procesando',   // Vendedor está preparando
  SHIPPED: 'enviada',         // En camino al cliente
  DELIVERED: 'entregada',     // Cliente recibió producto
  CANCELLED: 'cancelada'      // Orden cancelada
};

// Traducción de estados para mostrar al usuario
export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pendiente',
  [ORDER_STATUS.PROCESSING]: 'Procesando',
  [ORDER_STATUS.SHIPPED]: 'Enviada',
  [ORDER_STATUS.DELIVERED]: 'Entregada',
  [ORDER_STATUS.CANCELLED]: 'Cancelada'
};

// Colores para cada estado (útil para badges/chips)
export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: 'warning',     // Amarillo
  [ORDER_STATUS.PROCESSING]: 'info',     // Azul
  [ORDER_STATUS.SHIPPED]: 'primary',     // Azul oscuro
  [ORDER_STATUS.DELIVERED]: 'success',   // Verde
  [ORDER_STATUS.CANCELLED]: 'error'      // Rojo
};

// ============================================
// CATEGORÍAS DE PRODUCTOS
// ============================================
export const PRODUCT_CATEGORIES = {
  FOOD: 'comida',
  TOYS: 'juguetes',
  ACCESSORIES: 'accesorios',
  HYGIENE: 'higiene',
  HEALTH: 'salud',
  BEDS: 'camas'
};

// Traducción de categorías
export const PRODUCT_CATEGORIES_LABELS = {
  [PRODUCT_CATEGORIES.FOOD]: 'Comida',
  [PRODUCT_CATEGORIES.TOYS]: 'Juguetes',
  [PRODUCT_CATEGORIES.ACCESSORIES]: 'Accesorios',
  [PRODUCT_CATEGORIES.HYGIENE]: 'Higiene',
  [PRODUCT_CATEGORIES.HEALTH]: 'Salud',
  [PRODUCT_CATEGORIES.BEDS]: 'Camas'
};

// ============================================
// CONFIGURACIÓN DE VALIDACIÓN
// ============================================
export const VALIDATION_RULES = {
  RUN: {
    MIN_LENGTH: 7,
    MAX_LENGTH: 9,
    REGEX: /^[0-9]{7,8}[0-9Kk]$/
  },
  PASSWORD: {
    MIN_LENGTH: 4,
    MAX_LENGTH: 10
  },
  NAME: {
    MAX_LENGTH: 50
  },
  LASTNAME: {
    MAX_LENGTH: 100
  },
  ADDRESS: {
    MAX_LENGTH: 300
  },
  EMAIL: {
    MAX_LENGTH: 100,
    ALLOWED_DOMAINS: ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com']
  }
};

// ============================================
// RUTAS DE NAVEGACIÓN
// ============================================
export const ROUTES = {
  // Públicas
  HOME: '/',
  ABOUT: '/acerca',
  BLOG: '/blog',
  CONTACT: '/contacto',
  PRODUCTS: '/productos',
  PRODUCT_DETAIL: '/productos/:id',
  CART: '/carrito',
  
  // Autenticación
  LOGIN: '/login',
  REGISTER: '/registro',
  PROFILE: '/perfil',
  ORDERS: '/mis-pedidos',
  
  // Admin
  ADMIN_DASHBOARD: '/admin',
  ADMIN_PRODUCTS: '/admin/productos',
  ADMIN_USERS: '/admin/usuarios',
  ADMIN_STATS: '/admin/estadisticas',
  
  // Vendedor
  VENDOR_DASHBOARD: '/vendedor',
  VENDOR_PRODUCTS: '/vendedor/productos',
  VENDOR_ORDERS: '/vendedor/pedidos'
};

// ============================================
// CONFIGURACIÓN DE PAGINACIÓN
// ============================================
export const PAGINATION = {
  PRODUCTS_PER_PAGE: 12,
  ORDERS_PER_PAGE: 10,
  USERS_PER_PAGE: 10
};

// ============================================
// MENSAJES DE ÉXITO/ERROR COMUNES
// ============================================
export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Inicio de sesión exitoso',
    REGISTER: 'Registro exitoso. ¡Bienvenido!',
    PRODUCT_ADDED: 'Producto agregado al carrito',
    PRODUCT_REMOVED: 'Producto eliminado del carrito',
    ORDER_CREATED: 'Pedido creado exitosamente',
    PROFILE_UPDATED: 'Perfil actualizado correctamente',
    PRODUCT_CREATED: 'Producto creado exitosamente',
    PRODUCT_UPDATED: 'Producto actualizado correctamente',
    PRODUCT_DELETED: 'Producto eliminado',
    USER_CREATED: 'Usuario creado exitosamente',
    USER_UPDATED: 'Usuario actualizado correctamente',
    USER_DELETED: 'Usuario eliminado'
  },
  ERROR: {
    GENERIC: 'Ocurrió un error. Intenta nuevamente.',
    LOGIN_FAILED: 'Credenciales incorrectas',
    UNAUTHORIZED: 'No tienes permisos para realizar esta acción',
    NOT_FOUND: 'Recurso no encontrado',
    NETWORK: 'Error de conexión. Verifica tu internet.',
    VALIDATION: 'Por favor verifica los datos ingresados',
    EMPTY_CART: 'El carrito está vacío',
    OUT_OF_STOCK: 'Producto sin stock disponible'
  },
  CONFIRM: {
    DELETE_PRODUCT: '¿Estás seguro de eliminar este producto?',
    DELETE_USER: '¿Estás seguro de eliminar este usuario?',
    CANCEL_ORDER: '¿Deseas cancelar este pedido?',
    LOGOUT: '¿Deseas cerrar sesión?',
    CLEAR_CART: '¿Vaciar el carrito de compras?'
  }
};

// ============================================
// CONFIGURACIÓN DE ALMACENAMIENTO LOCAL
// ============================================
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  CART: 'carrito',
  PRODUCTS: 'productos',
  USERS: 'usuarios',
  ORDERS: 'ordenes',
  CONTACTS: 'mensajes_contacto'
};

// ============================================
// CONFIGURACIÓN DE FORMATO
// ============================================
export const FORMAT = {
  CURRENCY: 'CLP',
  LOCALE: 'es-CL',
  DATE_FORMAT: 'DD/MM/YYYY',
  DATETIME_FORMAT: 'DD/MM/YYYY HH:mm'
};

// ============================================
// LÍMITES DE STOCK
// ============================================
export const STOCK = {
  LOW_THRESHOLD: 5,    // Stock bajo: menos de 5 unidades
  OUT_OF_STOCK: 0      // Sin stock
};