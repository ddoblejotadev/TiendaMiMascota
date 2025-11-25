/**
 * CONSTANTES DE LA APLICACIÓN
 */

import logger from './logger';

// Categorías de productos
export const CATEGORIAS = [
  'Todos',
  'Alimento',
  'Juguetes',
  'Accesorios',
  'Higiene',
  'Medicamentos'
];

// Estados de pedido
export const ESTADOS_PEDIDO = {
  PENDIENTE: 'pendiente',
  PROCESANDO: 'procesando',
  ENVIADO: 'enviado',
  ENTREGADO: 'entregado',
  CANCELADO: 'cancelado'
};

// Configuración de la app
export const CONFIG = {
  NOMBRE_TIENDA: 'Mi Mascota',
  EMAIL_CONTACTO: 'contacto@mimascota.cl',
  TELEFONO: '+56 9 1234 5678',
  DIRECCION: 'Av. Principal 123, Santiago',
  HORARIO: 'Lunes a Viernes 9:00 - 18:00',
  IVA: 0.19
};

// Mensajes de validación
export const MENSAJES = {
  CAMPO_REQUERIDO: 'Este campo es obligatorio',
  EMAIL_INVALIDO: 'Ingrese un email válido',
  PASSWORD_CORTO: 'La contraseña debe tener al menos 6 caracteres',
  PASSWORDS_NO_COINCIDEN: 'Las contraseñas no coinciden',
  PRODUCTO_AGREGADO: 'Producto agregado al carrito',
  PRODUCTO_ELIMINADO: 'Producto eliminado del carrito',
  CARRITO_VACIO: 'El carrito está vacío',
  COMPRA_EXITOSA: 'Compra realizada con éxito',
  ERROR_GENERAL: 'Ocurrió un error. Por favor intenta nuevamente'
};

/**
 * API SERVICE - CONFIGURACIÓN
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://tiendamimascotabackends.onrender.com/api';

// En tiempo de ejecución, si el navegador corre en localhost/127.0.0.1 forzamos la base local
const runtimeHostname = (typeof window !== 'undefined' && window.location && window.location.hostname) ? window.location.hostname : null;

// Permitir override desde localStorage (útil para depuración en producción)
const storedOverride = (typeof window !== 'undefined' && window.localStorage) ? localStorage.getItem('api_base_override') : null;
const FINAL_API_URL = storedOverride || API_URL;

// Log ligero para depuración en desarrollo (se ve en la consola del navegador)
try {
  if (typeof window !== 'undefined' && window.console) {
    console.debug('[API] import.meta.env.VITE_API_URL =', import.meta.env.VITE_API_URL);
    console.debug('[API] runtime hostname =', runtimeHostname);
    console.debug('[API] stored override =', storedOverride);
    console.debug('[API] usando baseURL =', FINAL_API_URL);
  }
} catch {
  // No hacer nada si falla la depuración
}

// Crear instancia de axios con la base final determinada
const api = axios.create({
  baseURL: FINAL_API_URL,
  timeout: 30000, // 30 segundos para órdenes (Render tarda en despertar)
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token JWT a todas las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para manejar errores (401 Unauthorized) con refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Intentar refrescar el token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const refreshResponse = await axios.post(`${FINAL_API_URL}/auth/refresh`, {
            refreshToken: refreshToken
          });
          
          const { token: newToken, refreshToken: newRefreshToken } = refreshResponse.data;
          
          // Guardar nuevos tokens
          localStorage.setItem('token', newToken);
          localStorage.setItem('refreshToken', newRefreshToken);
          
          // Reintentar la petición original con el nuevo token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        logger.warn('Error al refrescar token:', refreshError);
        // Si falla el refresh, limpiar y redirigir
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('usuario');
        window.location.href = '/iniciar-sesion';
        return Promise.reject(refreshError);
      }
    }
    
    // Si no es 401 o ya se intentó refresh, rechazar
    return Promise.reject(error);
  }
);

/**
 * API SERVICE - AUTENTICACIÓN
 */

const USER_KEY = 'usuario';
const TOKEN_KEY = 'token';

/**
 * Configura o limpia el header Authorization en la instancia axios
 * y sincroniza con localStorage.
 */
export function setAuthToken(token) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem(TOKEN_KEY);
      delete api.defaults.headers.common['Authorization'];
    }
  } catch (err) {
    logger.debug('setAuthToken error:', err);
  }
}

// Inicializar header Authorization si ya hay token en localStorage
try {
  const existingToken = (typeof window !== 'undefined' && window.localStorage) ? localStorage.getItem(TOKEN_KEY) : null;
  if (existingToken) {
    api.defaults.headers.common['Authorization'] = `Bearer ${existingToken}`;
  }
} catch (err) {
  logger.debug('No se pudo inicializar Authorization header:', err);
}

/**
 * Inicia sesión contra el backend
 */
export async function login(email, password) {
  try {
    const response = await api.post('/auth/login', { 
      email, 
      password 
    });

    const { 
      token, 
      refreshToken,
      usuario_id, 
      email: userEmail, 
      nombre, 
      telefono, 
      direccion, 
      run
    } = response.data;

    // Guardar tokens y configurar header Authorization
    setAuthToken(token);
    localStorage.setItem('refreshToken', refreshToken);

    // Decodificar JWT para obtener el rol
    const payload = decodeJWT(token);

    // Normalizar rol: soportar 'rol', 'role' o 'roles' (array), y valores como 'ROLE_ADMIN'
    const normalizeRole = (raw) => {
      if (!raw) return null;
      if (Array.isArray(raw)) {
        raw = raw[0];
      }
      try {
        const s = String(raw).toLowerCase();
        // eliminar prefijos comunes
        return s.replace(/role[_-]?/i, '').trim();
      } catch {
        return null;
      }
    };

    let rol = 'user';
    if (payload) {
      if (payload.roles) {
        const r = normalizeRole(payload.roles);
        if (r) rol = r;
      } else if (payload.rol) {
        const r = normalizeRole(payload.rol);
        if (r) rol = r;
      } else if (payload.role) {
        const r = normalizeRole(payload.role);
        if (r) rol = r;
      }
    }

    // Guardar datos del usuario
    const usuarioData = {
      usuario_id,
      email: userEmail,
      nombre,
      telefono: telefono || null,
      direccion: direccion || null,
      run: run || null,
      rol: rol
    };
    localStorage.setItem(USER_KEY, JSON.stringify(usuarioData));

    return usuarioData;
  } catch (error) {
    logger.error('Error al login:', error);
    const status = error.response?.status;
    const respData = error.response?.data;
    logger.debug('Detalles del error de login:', { status, respData, message: error.message });

    let mensaje = 'Email o contraseña incorrectos';

    if (respData) {
      if (typeof respData === 'string') {
        mensaje = respData;
      } else if (respData.mensaje || respData.message || respData.error) {
        mensaje = respData.mensaje || respData.message || respData.error;
      } else {
        try {
          mensaje = JSON.stringify(respData);
        } catch (err) {
          logger.debug('Error convirtiendo respData a JSON:', err);
          mensaje = String(respData);
        }
      }
    } else if (status) {
      mensaje = `Error del servidor (${status})`;
    } else if (error.message) {
      mensaje = error.message;
    }

    throw new Error(mensaje);
  }
}

/**
 * Registra un nuevo usuario contra el backend
 */
export async function registrar(datosUsuario) {
  try {
    const response = await api.post('/auth/registro', {
      email: datosUsuario.email,
      password: datosUsuario.password,
      nombre: datosUsuario.nombre,
      telefono: datosUsuario.telefono || null,
      direccion: datosUsuario.direccion || null,
      run: datosUsuario.run || null
    });

    const { 
      token, 
      refreshToken,
      usuario_id, 
      email: userEmail, 
      nombre,
      telefono,
      direccion,
      run,
      rol
    } = response.data;

    // Guardar tokens
    // Guardar tokens y configurar header Authorization
    setAuthToken(token);
    localStorage.setItem('refreshToken', refreshToken);

    // Guardar datos del usuario
    const usuarioData = {
      usuario_id,
      email: userEmail,
      nombre,
      telefono: telefono || null,
      direccion: direccion || null,
      run: run || null,
      rol: rol || 'user'
    };
    localStorage.setItem(USER_KEY, JSON.stringify(usuarioData));

    return usuarioData;
  } catch (error) {
    logger.error('Error al registrar:', error);
    
    // Capturar mensajes específicos del backend
    let mensaje = 'Error al registrarse';
    
    if (error.response?.data) {
      // Intentar obtener el mensaje del backend en diferentes formatos
      mensaje = error.response.data.mensaje || 
                error.response.data.message || 
                error.response.data.error ||
                mensaje;
      
      // Si el error contiene información sobre email duplicado
      if (error.response.status === 400 || error.response.status === 409) {
        if (mensaje.toLowerCase().includes('email') || 
            mensaje.toLowerCase().includes('correo') ||
            mensaje.toLowerCase().includes('existe') ||
            mensaje.toLowerCase().includes('duplicate')) {
          mensaje = 'Este correo electrónico ya está registrado';
        }
      }
    }
    
    throw new Error(mensaje);
  }
}

/**
 * Cierra sesión
 */
export function logout() {
  localStorage.removeItem(USER_KEY);
  // limpiar header y token
  setAuthToken(null);
  localStorage.removeItem('refreshToken');
}

/**
 * Obtiene el usuario actual desde localStorage
 */
export function obtenerUsuarioActual() {
  const usuarioJSON = localStorage.getItem(USER_KEY);
  if (!usuarioJSON) {
    return null;
  }
  try {
    return JSON.parse(usuarioJSON);
  } catch (error) {
    logger.error('Error al parsear usuario:', error);
    return null;
  }
}

/**
 * Obtiene el token JWT
 */
export function obtenerToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Verifica si hay un usuario logueado
 */
export function estaLogueado() {
  const token = obtenerToken();
  return !!token;
}

/**
 * Verifica si el usuario actual es administrador
 */
export function esAdministrador() {
  const usuario = obtenerUsuarioActual();
  if (!usuario) return false;

  // Si el campo rol es string, normalizar y comprobar
  if (usuario.rol && typeof usuario.rol === 'string') {
    const r = String(usuario.rol).toLowerCase().replace(/role[_-]?/i, '').trim();
    if (r === 'admin') return true;
  }

  // Si existe un array de roles
  if (Array.isArray(usuario.roles) && usuario.roles.length > 0) {
    for (const item of usuario.roles) {
      const r = String(item).toLowerCase().replace(/role[_-]?/i, '').trim();
      if (r === 'admin') return true;
    }
  }

  return false;
}

/**
 * Decodifica un JWT y devuelve el payload
 */
export function decodeJWT(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    logger.error('Error decodificando JWT:', error);
    return null;
  }
}

/**
 * Obtiene el rol del usuario desde el JWT
 */
export function obtenerRolDesdeToken() {
  const token = obtenerToken();
  if (!token) return null;
  const payload = decodeJWT(token);
  // Manejar también arrays y normalizar prefijos ROLE_
  if (!payload) return null;
  const normalize = (raw) => {
    if (!raw) return null;
    if (Array.isArray(raw)) raw = raw[0];
    try {
      return String(raw).toLowerCase().replace(/role[_-]?/i, '').trim();
    } catch {
      return null;
    }
  };

  return normalize(payload.roles) || normalize(payload.rol) || normalize(payload.role) || null;
}

/**
 * Actualiza los datos del usuario actual
 */
export async function actualizarPerfil(datosActualizados) {
  try {
    const usuarioActual = obtenerUsuarioActual();
    if (!usuarioActual) {
      throw new Error('No hay usuario logueado');
    }

    const response = await api.put(`/usuarios/${usuarioActual.usuario_id}`, datosActualizados);

    // Actualizar en localStorage
    const usuarioData = {
      usuario_id: response.data.usuario_id,
      email: response.data.email,
      nombre: response.data.nombre,
      telefono: response.data.telefono,
      direccion: response.data.direccion,
      run: response.data.run,
      rol: response.data.rol || usuarioActual.rol || 'user'
    };
    localStorage.setItem(USER_KEY, JSON.stringify(usuarioData));

    return usuarioData;
  } catch (error) {
    logger.error('Error al actualizar perfil:', error);
    throw error;
  }
}

/**
 * API SERVICE - PRODUCTOS
 * Consume datos del backend
 */

/**
 * Verifica la disponibilidad de stock para los productos del carrito
 * @param {Array} carrito - Array de items con {id, cantidad}
 * @returns {Promise<Object>} - {disponible: boolean, productosAgotados: Array}
 */
export async function verificarStockCarrito(carrito) {
  try {
    const resultado = {
      disponible: true,
      productosAgotados: [],
      productosActualizados: []
    };

    // Verificar cada producto del carrito
    for (const item of carrito) {
      const producto = await obtenerProductoPorId(item.id);
      
      if (!producto) {
        resultado.disponible = false;
        resultado.productosAgotados.push({
          ...item,
          motivo: 'Producto no encontrado'
        });
        continue;
      }

      // Verificar si hay stock suficiente
      if (producto.stock < item.cantidad) {
        resultado.disponible = false;
        resultado.productosAgotados.push({
          ...item,
          stockDisponible: producto.stock,
          motivo: producto.stock === 0 
            ? 'Producto agotado' 
            : `Solo quedan ${producto.stock} unidades disponibles`
        });
      }
    }

    return resultado;
  } catch (error) {
    logger.error('Error al verificar stock:', error);
    throw new Error('No se pudo verificar la disponibilidad de los productos');
  }
}

/**
 * Obtiene productos destacados
 */
export async function obtenerProductosDestacados() {
  try {
    const productos = await obtenerProductos(0, 100);
    return productos.filter(p => p.destacado === true);
  } catch (error) {
    logger.error('Error al obtener productos destacados:', error);
    return [];
  }
}

/**
 * Filtra productos por categoría
 */
export async function filtrarPorCategoria(categoria) {
  try {
    const productos = await obtenerProductos(0, 100);
    if (!categoria || categoria === 'Todos') {
      return productos;
    }
    return productos.filter(p => p.category === categoria);
  } catch (error) {
    logger.error('Error al filtrar por categoría:', error);
    return [];
  }
}

/**
 * Busca productos por término
 */
export async function buscarProductos(termino) {
  try {
    const productos = await obtenerProductos();
    if (!termino) return productos;

    const terminoLower = termino.toLowerCase();
    return productos.filter(p =>
      p.nombre.toLowerCase().includes(terminoLower) ||
      (p.description && p.description.toLowerCase().includes(terminoLower))
    );
  } catch (error) {
    logger.error('Error al buscar productos:', error);
    return [];
  }
}

/**
 * Agrega un nuevo producto
 */
export async function agregarProducto(producto) {
  try {
    const response = await api.post('/productos', producto);
    return response.data;
  } catch (error) {
    logger.error('Error al crear producto:', error);
    throw error;
  }
}

/**
 * Actualiza un producto existente
 */
export async function actualizarProducto(id, datosActualizados) {
  try {
    const response = await api.put(`/productos/${id}`, datosActualizados);
    return response.data;
  } catch (error) {
    logger.error('Error al actualizar producto:', error);
    throw error;
  }
}

/**
 * Elimina un producto por ID
 */
export async function eliminarProducto(id) {
  try {
    await api.delete(`/productos/${id}`);
    return true;
  } catch (error) {
    logger.error('Error al eliminar producto:', error);
    throw error;
  }
}

/**
 * API SERVICE - ÓRDENES/PEDIDOS
 */

/**
 * Obtiene todas las órdenes de un usuario
 */
export async function obtenerOrdenesUsuario(usuarioId) {
  try {
    logger.debug('Buscando órdenes para usuario:', usuarioId);
    const response = await api.get(`/ordenes/usuario/${usuarioId}`);
    logger.success('Órdenes recibidas:', Array.isArray(response.data) ? response.data.length : 'No es array');
    return response.data;
  } catch (error) {
    logger.error('Error al obtener órdenes:', error);
    throw error;
  }
}

/**
 * Crea una nueva orden de compra
 */
export async function crearOrden(datosOrden) {
  // Transformar la orden al formato que espera el backend ANTES del try
  const ordenBackend = {
    usuario_id: datosOrden.usuarioId,
    es_invitado: datosOrden.esInvitado || false,
    items: datosOrden.productos.map(producto => ({
      producto_id: producto.id,
      cantidad: producto.cantidad,
      precio_unitario: producto.precio
    })),
    datos_envio: {
      nombre_completo: datosOrden.datosEnvio.nombreCompleto,
      email: datosOrden.datosEnvio.email,
      telefono: datosOrden.datosEnvio.telefono,
      direccion: datosOrden.datosEnvio.direccion,
      ciudad: datosOrden.datosEnvio.ciudad,
      region: datosOrden.datosEnvio.region,
      codigo_postal: datosOrden.datosEnvio.codigoPostal || '',
      metodo_pago: datosOrden.datosEnvio.metodoPago || 'tarjeta',
      pais: datosOrden.datosEnvio.pais || 'Chile'
    },
    subtotal: datosOrden.subtotal,
    total: datosOrden.total,
    estado: datosOrden.estado || 'completada'
  };

  try {
    logger.debug('Enviando orden al backend');
    logger.debug('Items a enviar:', ordenBackend.items.length);
    
    const response = await api.post('/ordenes', ordenBackend);
    logger.success('Orden guardada exitosamente');
    return response.data;
  } catch (error) {
    logger.error('Error al crear orden:', error);
    logger.debug('Datos que se enviaron:', ordenBackend);
    throw error;
  }
}

/**
 * Verifica si el token JWT es válido
 */
export async function verificarToken() {
  try {
    const response = await api.get('/auth/verificar');
    return response.data;
  } catch (error) {
    logger.error('Token inválido:', error);
    throw error;
  }
}

/**
 * Obtiene todos los productos con paginación
 */
export async function obtenerProductos(page = 0, size = 20) {
  try {
    const response = await api.get(`/productos?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    logger.error('Error al obtener productos:', error);
    throw error;
  }
}

/**
 * Obtiene un producto por ID
 */
export async function obtenerProductoPorId(id) {
  try {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  } catch (error) {
    logger.error('Error al obtener producto:', error);
    throw error;
  }
}

/**
 * Exportar instancia de axios para uso general
 */
export default api;