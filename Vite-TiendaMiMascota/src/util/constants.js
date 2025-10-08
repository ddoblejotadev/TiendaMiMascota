
export const USER_ROLES = {
  ADMIN: 'administrador',
  VENDOR: 'vendedor',
  CLIENT: 'cliente'
};

export const ORDER_STATUS = {
  PENDING: 'pendiente',
  PROCESSING: 'procesando',
  SHIPPED: 'enviada',
  DELIVERED: 'entregada',
  CANCELLED: 'cancelada'
};

// Traducción de estados para mostrar al usuario
export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pendiente',
  [ORDER_STATUS.PROCESSING]: 'Procesando',
  [ORDER_STATUS.SHIPPED]: 'Enviada',
  [ORDER_STATUS.DELIVERED]: 'Entregada',
  [ORDER_STATUS.CANCELLED]: 'Cancelada'
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: 'warning',
  [ORDER_STATUS.PROCESSING]: 'info',
  [ORDER_STATUS.SHIPPED]: 'primary',
  [ORDER_STATUS.DELIVERED]: 'success',
  [ORDER_STATUS.CANCELLED]: 'error'
};

export const PRODUCT_CATEGORIES = {
  FOOD: 'comida',
  TOYS: 'juguetes',
  ACCESSORIES: 'accesorios',
  HYGIENE: 'higiene',
  HEALTH: 'salud',
  BEDS: 'camas'
};

export const PRODUCT_CATEGORIES_LABELS = {
  [PRODUCT_CATEGORIES.FOOD]: 'Comida',
  [PRODUCT_CATEGORIES.TOYS]: 'Juguetes',
  [PRODUCT_CATEGORIES.ACCESSORIES]: 'Accesorios',
  [PRODUCT_CATEGORIES.HYGIENE]: 'Higiene',
  [PRODUCT_CATEGORIES.HEALTH]: 'Salud',
  [PRODUCT_CATEGORIES.BEDS]: 'Camas'
};

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

export const ROUTES = {

  HOME: '/',
  ABOUT: '/acerca',
  BLOG: '/blog',
  CONTACT: '/contacto',
  PRODUCTS: '/productos',
  PRODUCT_DETAIL: '/productos/:id',
  CART: '/carrito',

  LOGIN: '/login',
  REGISTER: '/registro',
  PROFILE: '/perfil',
  ORDERS: '/mis-pedidos',

  ADMIN_DASHBOARD: '/admin',
  ADMIN_PRODUCTS: '/admin/productos',
  ADMIN_USERS: '/admin/usuarios',
  ADMIN_STATS: '/admin/estadisticas',

  VENDOR_DASHBOARD: '/vendedor',
  VENDOR_PRODUCTS: '/vendedor/productos',
  VENDOR_ORDERS: '/vendedor/pedidos'
};

export const PAGINATION = {
  PRODUCTS_PER_PAGE: 12,
  ORDERS_PER_PAGE: 10,
  USERS_PER_PAGE: 10
};

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

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  CART: 'carrito',
  PRODUCTS: 'productos',
  USERS: 'usuarios',
  ORDERS: 'ordenes',
  CONTACTS: 'mensajes_contacto'
};

export const FORMAT = {
  CURRENCY: 'CLP',
  LOCALE: 'es-CL',
  DATE_FORMAT: 'DD/MM/YYYY',
  DATETIME_FORMAT: 'DD/MM/YYYY HH:mm'
};

export const STOCK = {
  LOW_THRESHOLD: 5,
  OUT_OF_STOCK: 0
};