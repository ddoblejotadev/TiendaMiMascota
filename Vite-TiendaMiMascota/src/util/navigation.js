/**
 * HELPERS DE NAVEGACIÓN
 * 
 * Este archivo contiene funciones auxiliares para navegación programática
 * y manejo de rutas en la aplicación.
 * 
 * IMPORTANTE: Estos helpers están diseñados para usarse JUNTO con
 * useNavigate() de React Router, no lo reemplazan.
 */

import { ROUTES } from './constants';
import { USER_ROLES } from './constants';

// ============================================
// NAVEGACIÓN SEGÚN ROL DE USUARIO
// ============================================

/**
 * Obtiene la ruta del dashboard según el rol del usuario
 * 
 * @param {string} userRole - Rol del usuario (admin, vendedor, cliente)
 * @returns {string} - Ruta del dashboard correspondiente
 * 
 * @example
 * const route = getDashboardRoute(user.role);
 * navigate(route);
 */
export const getDashboardRoute = (userRole) => {
  switch (userRole) {
    case USER_ROLES.ADMIN:
      return ROUTES.ADMIN_DASHBOARD;
    case USER_ROLES.VENDOR:
      return ROUTES.VENDOR_DASHBOARD;
    case USER_ROLES.CLIENT:
      return ROUTES.HOME;
    default:
      return ROUTES.HOME;
  }
};

/**
 * Navega al dashboard correspondiente según el rol
 * Requiere que se pase la función navigate como parámetro
 * 
 * @param {Function} navigate - Función useNavigate() de React Router
 * @param {string} userRole - Rol del usuario
 * 
 * @example
 * const navigate = useNavigate();
 * navigateToDashboard(navigate, user.role);
 */
export const navigateToDashboard = (navigate, userRole) => {
  const route = getDashboardRoute(userRole);
  navigate(route);
};

/**
 * Navega a la ruta de perfil del usuario
 * 
 * @param {Function} navigate - Función useNavigate()
 */
export const navigateToProfile = (navigate) => {
  navigate(ROUTES.PROFILE);
};

/**
 * Navega a la página de login
 * Opcionalmente guarda la ruta actual para redireccionar después del login
 * 
 * @param {Function} navigate - Función useNavigate()
 * @param {string} redirectTo - Ruta a la que volver después del login
 * 
 * @example
 * // Usuario intenta acceder a /admin sin login
 * navigateToLogin(navigate, '/admin');
 * // Después del login exitoso, vuelve a /admin
 */
export const navigateToLogin = (navigate, redirectTo = null) => {
  if (redirectTo) {
    // Guardar ruta en query parameter
    navigate(`${ROUTES.LOGIN}?redirect=${encodeURIComponent(redirectTo)}`);
  } else {
    navigate(ROUTES.LOGIN);
  }
};

/**
 * Navega después de un login exitoso
 * Si hay un redirectTo guardado, va ahí; sino, va al dashboard
 * 
 * @param {Function} navigate - Función useNavigate()
 * @param {string} userRole - Rol del usuario
 * @param {string} redirectTo - Ruta guardada (opcional)
 * 
 * @example
 * // En Login.jsx después de login exitoso:
 * const searchParams = new URLSearchParams(location.search);
 * const redirectTo = searchParams.get('redirect');
 * navigateAfterLogin(navigate, user.role, redirectTo);
 */
export const navigateAfterLogin = (navigate, userRole, redirectTo = null) => {
  if (redirectTo) {
    navigate(decodeURIComponent(redirectTo));
  } else {
    navigateToDashboard(navigate, userRole);
  }
};

/**
 * Navega después de un logout exitoso
 * 
 * @param {Function} navigate - Función useNavigate()
 */
export const navigateAfterLogout = (navigate) => {
  navigate(ROUTES.HOME);
};

// ============================================
// NAVEGACIÓN DE PRODUCTOS
// ============================================

/**
 * Navega a la página de detalle de un producto
 * 
 * @param {Function} navigate - Función useNavigate()
 * @param {number|string} productId - ID del producto
 * 
 * @example
 * navigateToProduct(navigate, product.id);
 */
export const navigateToProduct = (navigate, productId) => {
  navigate(ROUTES.PRODUCT_DETAIL.replace(':id', productId));
};

/**
 * Navega a la página de productos con filtros opcionales
 * 
 * @param {Function} navigate - Función useNavigate()
 * @param {Object} filters - Filtros a aplicar (categoría, búsqueda, etc)
 * 
 * @example
 * navigateToProducts(navigate, { categoria: 'comida', search: 'perro' });
 * // Resultado: /productos?categoria=comida&search=perro
 */
export const navigateToProducts = (navigate, filters = {}) => {
  const params = new URLSearchParams(filters);
  const queryString = params.toString();
  
  if (queryString) {
    navigate(`${ROUTES.PRODUCTS}?${queryString}`);
  } else {
    navigate(ROUTES.PRODUCTS);
  }
};

/**
 * Navega a productos filtrados por categoría
 * 
 * @param {Function} navigate - Función useNavigate()
 * @param {string} categoria - Categoría a filtrar
 */
export const navigateToProductsByCategory = (navigate, categoria) => {
  navigateToProducts(navigate, { categoria });
};

// ============================================
// NAVEGACIÓN DE CARRITO Y ÓRDENES
// ============================================

/**
 * Navega al carrito de compras
 * 
 * @param {Function} navigate - Función useNavigate()
 */
export const navigateToCart = (navigate) => {
  navigate(ROUTES.CART);
};

/**
 * Navega al historial de pedidos
 * 
 * @param {Function} navigate - Función useNavigate()
 */
export const navigateToOrders = (navigate) => {
  navigate(ROUTES.ORDERS);
};

// ============================================
// NAVEGACIÓN DE PÁGINAS PÚBLICAS
// ============================================

/**
 * Navega a la página de inicio
 * 
 * @param {Function} navigate - Función useNavigate()
 */
export const navigateToHome = (navigate) => {
  navigate(ROUTES.HOME);
};

/**
 * Navega a la página de contacto
 * 
 * @param {Function} navigate - Función useNavigate()
 */
export const navigateToContact = (navigate) => {
  navigate(ROUTES.CONTACT);
};

/**
 * Navega a la página de blog
 * 
 * @param {Function} navigate - Función useNavigate()
 */
export const navigateToBlog = (navigate) => {
  navigate(ROUTES.BLOG);
};

/**
 * Navega a la página acerca de
 * 
 * @param {Function} navigate - Función useNavigate()
 */
export const navigateToAbout = (navigate) => {
  navigate(ROUTES.ABOUT);
};

// ============================================
// NAVEGACIÓN DE ADMINISTRADOR
// ============================================

/**
 * Navega a la gestión de productos del admin
 * 
 * @param {Function} navigate - Función useNavigate()
 */
export const navigateToAdminProducts = (navigate) => {
  navigate(ROUTES.ADMIN_PRODUCTS);
};

/**
 * Navega a la gestión de usuarios del admin
 * 
 * @param {Function} navigate - Función useNavigate()
 */
export const navigateToAdminUsers = (navigate) => {
  navigate(ROUTES.ADMIN_USERS);
};

/**
 * Navega a las estadísticas del admin
 * 
 * @param {Function} navigate - Función useNavigate()
 */
export const navigateToAdminStats = (navigate) => {
  navigate(ROUTES.ADMIN_STATS);
};

// ============================================
// NAVEGACIÓN DE VENDEDOR
// ============================================

/**
 * Navega a la gestión de productos del vendedor
 * 
 * @param {Function} navigate - Función useNavigate()
 */
export const navigateToVendorProducts = (navigate) => {
  navigate(ROUTES.VENDOR_PRODUCTS);
};

/**
 * Navega a la gestión de pedidos del vendedor
 * 
 * @param {Function} navigate - Función useNavigate()
 */
export const navigateToVendorOrders = (navigate) => {
  navigate(ROUTES.VENDOR_ORDERS);
};

// ============================================
// NAVEGACIÓN CON HISTORIAL
// ============================================

/**
 * Navega hacia atrás en el historial
 * 
 * @param {Function} navigate - Función useNavigate()
 * @param {number} steps - Cantidad de pasos hacia atrás (default: -1)
 * 
 * @example
 * navigateBack(navigate);      // Vuelve 1 página
 * navigateBack(navigate, -2);  // Vuelve 2 páginas
 */
export const navigateBack = (navigate, steps = -1) => {
  navigate(steps);
};

/**
 * Navega hacia adelante en el historial
 * 
 * @param {Function} navigate - Función useNavigate()
 * @param {number} steps - Cantidad de pasos hacia adelante (default: 1)
 */
export const navigateForward = (navigate, steps = 1) => {
  navigate(steps);
};

/**
 * Reemplaza la entrada actual del historial (no agrega nueva)
 * Útil para evitar que el usuario vuelva a páginas no deseadas
 * 
 * @param {Function} navigate - Función useNavigate()
 * @param {string} route - Ruta a la que navegar
 * 
 * @example
 * // Después del login, reemplazar la página de login
 * navigateReplace(navigate, '/admin');
 * // Usuario no puede volver a /login con el botón atrás
 */
export const navigateReplace = (navigate, route) => {
  navigate(route, { replace: true });
};

// ============================================
// HELPERS DE URL Y QUERY PARAMS
// ============================================

/**
 * Obtiene los parámetros de búsqueda de la URL actual
 * 
 * @param {Object} location - Objeto location de React Router
 * @returns {Object} - Objeto con los parámetros
 * 
 * @example
 * // URL: /productos?categoria=comida&precio=100
 * const params = getSearchParams(location);
 * // { categoria: 'comida', precio: '100' }
 */
export const getSearchParams = (location) => {
  const searchParams = new URLSearchParams(location.search);
  const params = {};
  
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  
  return params;
};

/**
 * Obtiene un parámetro específico de la URL
 * 
 * @param {Object} location - Objeto location
 * @param {string} paramName - Nombre del parámetro
 * @returns {string|null} - Valor del parámetro o null
 * 
 * @example
 * // URL: /productos?categoria=comida
 * const categoria = getSearchParam(location, 'categoria');
 * // 'comida'
 */
export const getSearchParam = (location, paramName) => {
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get(paramName);
};

/**
 * Construye una URL con query parameters
 * 
 * @param {string} basePath - Ruta base
 * @param {Object} params - Parámetros a agregar
 * @returns {string} - URL completa
 * 
 * @example
 * buildUrlWithParams('/productos', { categoria: 'comida', orden: 'precio' });
 * // '/productos?categoria=comida&orden=precio'
 */
export const buildUrlWithParams = (basePath, params = {}) => {
  const searchParams = new URLSearchParams(params);
  const queryString = searchParams.toString();
  
  return queryString ? `${basePath}?${queryString}` : basePath;
};

/**
 * Actualiza los query params sin recargar la página
 * 
 * @param {Function} navigate - Función useNavigate()
 * @param {Object} location - Objeto location
 * @param {Object} newParams - Nuevos parámetros
 * @param {boolean} merge - Si true, merge con params existentes; si false, reemplaza
 * 
 * @example
 * // URL actual: /productos?categoria=comida
 * updateQueryParams(navigate, location, { precio: '100' }, true);
 * // Nueva URL: /productos?categoria=comida&precio=100
 * 
 * updateQueryParams(navigate, location, { precio: '100' }, false);
 * // Nueva URL: /productos?precio=100
 */
export const updateQueryParams = (navigate, location, newParams, merge = true) => {
  const currentParams = merge ? getSearchParams(location) : {};
  const updatedParams = { ...currentParams, ...newParams };
  
  // Eliminar parámetros con valor null o undefined
  Object.keys(updatedParams).forEach(key => {
    if (updatedParams[key] === null || updatedParams[key] === undefined) {
      delete updatedParams[key];
    }
  });
  
  const newUrl = buildUrlWithParams(location.pathname, updatedParams);
  navigate(newUrl, { replace: true });
};

// ============================================
// VALIDACIÓN DE RUTAS
// ============================================

/**
 * Verifica si una ruta requiere autenticación
 * 
 * @param {string} pathname - Ruta a verificar
 * @returns {boolean} - true si requiere auth
 */
export const requiresAuth = (pathname) => {
  const protectedRoutes = [
    ROUTES.PROFILE,
    ROUTES.ORDERS,
    ROUTES.ADMIN_DASHBOARD,
    ROUTES.ADMIN_PRODUCTS,
    ROUTES.ADMIN_USERS,
    ROUTES.ADMIN_STATS,
    ROUTES.VENDOR_DASHBOARD,
    ROUTES.VENDOR_PRODUCTS,
    ROUTES.VENDOR_ORDERS
  ];
  
  return protectedRoutes.some(route => pathname.startsWith(route));
};

/**
 * Verifica si un usuario tiene permisos para acceder a una ruta
 * 
 * @param {string} pathname - Ruta a verificar
 * @param {string} userRole - Rol del usuario
 * @returns {boolean} - true si tiene permisos
 */
export const hasRoutePermission = (pathname, userRole) => {
  // Rutas de admin solo para administradores
  if (pathname.startsWith('/admin') && userRole !== USER_ROLES.ADMIN) {
    return false;
  }
  
  // Rutas de vendedor para vendedores y admins
  if (pathname.startsWith('/vendedor') && 
      userRole !== USER_ROLES.VENDOR && 
      userRole !== USER_ROLES.ADMIN) {
    return false;
  }
  
  return true;
};

/**
 * Obtiene la ruta de redirección cuando un usuario no tiene permisos
 * 
 * @param {string} userRole - Rol del usuario
 * @returns {string} - Ruta de redirección
 */
export const getUnauthorizedRedirect = (userRole) => {
  if (!userRole) {
    return ROUTES.LOGIN;
  }
  
  return getDashboardRoute(userRole);
};

// ============================================
// BREADCRUMBS (MIGAS DE PAN)
// ============================================

/**
 * Genera breadcrumbs basado en la ruta actual
 * 
 * @param {string} pathname - Ruta actual
 * @returns {Array} - Array de breadcrumbs
 * 
 * @example
 * getBreadcrumbs('/admin/productos/123');
 * // [
 * //   { label: 'Inicio', path: '/' },
 * //   { label: 'Admin', path: '/admin' },
 * //   { label: 'Productos', path: '/admin/productos' },
 * //   { label: '123', path: '/admin/productos/123' }
 * // ]
 */
export const getBreadcrumbs = (pathname) => {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [{ label: 'Inicio', path: '/' }];
  
  let currentPath = '';
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Mapear segmentos a labels legibles
    const labelMap = {
      'admin': 'Administrador',
      'vendedor': 'Vendedor',
      'productos': 'Productos',
      'usuarios': 'Usuarios',
      'estadisticas': 'Estadísticas',
      'pedidos': 'Pedidos',
      'perfil': 'Perfil',
      'carrito': 'Carrito',
      'mis-pedidos': 'Mis Pedidos',
      'acerca': 'Acerca de',
      'contacto': 'Contacto',
      'blog': 'Blog'
    };
    
    const label = labelMap[segment] || segment;
    
    breadcrumbs.push({
      label: label.charAt(0).toUpperCase() + label.slice(1),
      path: currentPath,
      isLast: index === segments.length - 1
    });
  });
  
  return breadcrumbs;
};

// ============================================
// HELPERS DE SCROLL
// ============================================

/**
 * Hace scroll al inicio de la página
 * Útil después de navegaciones
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};

/**
 * Hace scroll a un elemento específico
 * 
 * @param {string} elementId - ID del elemento
 */
export const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};