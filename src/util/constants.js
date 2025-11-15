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
 * API SERVICE - PRODUCTOS
 * Consume datos del backend en lugar de datos locales
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      window.location.href = '/iniciar-sesion';
    }
    return Promise.reject(error);
  }
);

/**
 * Obtiene todos los productos del backend
 */
export async function obtenerProductos() {
  try {
    const response = await api.get('/productos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
}

/**
 * Obtiene un producto por su ID
 */
export async function obtenerProductoPorId(id) {
  try {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener producto:', error);
    return null;
  }
}

/**
 * Obtiene productos destacados (backend filtra)
 */
export async function obtenerProductosDestacados() {
  try {
    const productos = await obtenerProductos();
    return productos.filter(p => p.highlighted === true);
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
    const productos = await obtenerProductos();
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
      p.name.toLowerCase().includes(terminoLower) ||
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
 * Elimina un producto
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
 * API SERVICE - AUTENTICACIÓN
 */

const USER_KEY = 'tienda_mimascota_usuario';
const TOKEN_KEY = 'tienda_mimascota_token';

/**
 * Inicia sesión
 */
export async function login(email, password) {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token, usuario } = response.data;
    
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(usuario));
    
    return usuario;
  } catch (error) {
    console.error('Error al login:', error);
    throw new Error('Email o contraseña incorrectos');
  }
}

/**
 * Registra un nuevo usuario
 */
export async function registrar(datosUsuario) {
  try {
    const response = await api.post('/auth/registro', datosUsuario);
    const { token, usuario } = response.data;
    
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(usuario));
    
    return usuario;
  } catch (error) {
    console.error('Error al registrar:', error);
    throw error;
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
 * Obtiene el usuario actual
 */
export function obtenerUsuarioActual() {
  const usuarioJSON = localStorage.getItem(USER_KEY);
  return usuarioJSON ? JSON.parse(usuarioJSON) : null;
}

/**
 * Verifica si hay un usuario logueado
 */
export function estaLogueado() {
  return obtenerUsuarioActual() !== null;
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
    
    const response = await api.put(`/usuarios/${usuarioActual.id}`, datosActualizados);
    
    // Actualizar en localStorage
    localStorage.setItem(USER_KEY, JSON.stringify(response.data));
    
    return response.data;
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    throw error;
  }
}