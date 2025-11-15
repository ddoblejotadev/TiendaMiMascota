/**
 * CONSTANTES DE LA APLICACIÓN
 */

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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
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

// Interceptor para manejar errores (401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Token expirado o inválido');
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      window.location.href = '/iniciar-sesion';
    }
    return Promise.reject(error);
  }
);

/**
 * API SERVICE - AUTENTICACIÓN
 */

const USER_KEY = 'usuario';
const TOKEN_KEY = 'token';

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
      usuario_id, 
      email: userEmail, 
      nombre, 
      telefono, 
      direccion, 
      run 
    } = response.data;

    // Guardar token
    localStorage.setItem(TOKEN_KEY, token);

    // Guardar datos del usuario
    const usuarioData = {
      usuario_id,
      email: userEmail,
      nombre,
      telefono: telefono || null,
      direccion: direccion || null,
      run: run || null
    };
    localStorage.setItem(USER_KEY, JSON.stringify(usuarioData));

    return usuarioData;
  } catch (error) {
    console.error('Error al login:', error);
    const mensaje = error.response?.data?.mensaje || 'Email o contraseña incorrectos';
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
      usuario_id, 
      email: userEmail, 
      nombre,
      telefono,
      direccion,
      run
    } = response.data;

    // Guardar token
    localStorage.setItem(TOKEN_KEY, token);

    // Guardar datos del usuario
    const usuarioData = {
      usuario_id,
      email: userEmail,
      nombre,
      telefono: telefono || null,
      direccion: direccion || null,
      run: run || null
    };
    localStorage.setItem(USER_KEY, JSON.stringify(usuarioData));

    return usuarioData;
  } catch (error) {
    console.error('Error al registrar:', error);
    
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
  localStorage.removeItem(TOKEN_KEY);
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
    console.error('Error al parsear usuario:', error);
    return null;
  }
}

/**
 * Verifica si hay un usuario logueado
 */
export function estaLogueado() {
  const token = localStorage.getItem(TOKEN_KEY);
  return !!token;
}

/**
 * Obtiene el token JWT
 */
export function obtenerToken() {
  return localStorage.getItem(TOKEN_KEY);
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
      run: response.data.run
    };
    localStorage.setItem(USER_KEY, JSON.stringify(usuarioData));

    return usuarioData;
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
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
    console.error('Error al verificar stock:', error);
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
    console.error('Error:', error);
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
    console.error('Error:', error);
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
    console.error('Error:', error);
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
    console.error('Error al crear producto:', error);
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
    console.error('Error al actualizar producto:', error);
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
    console.error('Error al eliminar producto:', error);
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
    const response = await api.get(`/ordenes/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    throw error;
  }
}

/**
 * Crea una nueva orden de compra
 */
export async function crearOrden(datosOrden) {
  try {
    const response = await api.post('/ordenes', datosOrden);
    return response.data;
  } catch (error) {
    console.error('Error al crear orden:', error);
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
    console.error('Token inválido:', error);
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
    console.error('Error al obtener productos:', error);
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
    console.error('Error al obtener producto:', error);
    throw error;
  }
}

/**
 * Exportar instancia de axios para uso general
 */
export default api;