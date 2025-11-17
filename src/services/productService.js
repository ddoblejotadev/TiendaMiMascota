/**
 * SERVICIO DE PRODUCTOS
 * Maneja todas las operaciones relacionadas con productos
 * Consume datos del backend via API REST
 */

import api from '../util/constants';
import axios from 'axios';
import logger from '../util/logger';
import { handleError } from '../util/errorHandler';

// Importar imágenes desde assets (usadas como fallback)
// Cuando el backend no provee `imageUrl`, usamos imágenes remotas por categoría
const imagenesPorCategoria = {
  'Alimento': 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400',
  'Juguetes': 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=400',
  'Accesorios': 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
  'Higiene': 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400',
  'Medicamentos': 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400',
  'default': 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400'
};

/**
 * Mapea los datos del backend al formato del frontend
 * Backend usa: name, description, price, category, imageUrl, highlighted, rating, previousPrice
 * Frontend usa: nombre, descripcion, precio, categoria, imagen, destacado, valoracion, precioAnterior
 */
function mapearProductoBackend(productoBackend) {
  // Priorizar imágenes que envía el backend (imageUrl o image_url)
  // Si no viene, usar imágenes locales del assets
  const categoria = productoBackend.category || productoBackend.categoria || 'default';
  const imagenLocal = imagenesPorCategoria[categoria] || imagenesPorCategoria.default;
  
  // Backend puede devolver imageUrl (Cloudinary / Unsplash) u otras claves.
  // Soportar: imageUrl, image_url, image, imagen, url, thumbnail, images[0].url, media[0].url
  let imagenBackend = null;
  const imageCandidates = [
    'imageUrl', 'image_url', 'image', 'imagen', 'imagen_url', 'url', 'thumbnail', 'img'
  ];
  for (const key of imageCandidates) {
    const candidate = productoBackend[key];
    if (!candidate) continue;

    // Si es string directa
    if (typeof candidate === 'string') {
      imagenBackend = candidate;
      break;
    }

    // Si es objeto, buscar propiedades comunes
    if (typeof candidate === 'object' && candidate !== null) {
      const propsToCheck = ['url', 'secure_url', 'small', 'thumbnail', 'src', 'path'];
      for (const p of propsToCheck) {
        if (candidate[p]) {
          imagenBackend = candidate[p];
          break;
        }
      }
      if (!imagenBackend) {
        // Si el objeto tiene key 0 o es un blob-like
        if (candidate[0] && typeof candidate[0] === 'string') {
          imagenBackend = candidate[0];
        }
      }

      if (imagenBackend) break;
    }
  }

  // Si viene una lista 'images' o 'media', tomar la primera url disponible
  if (!imagenBackend && Array.isArray(productoBackend.images) && productoBackend.images.length > 0) {
    const first = productoBackend.images[0];
    imagenBackend = first?.url || first?.secure_url || first?.small || first || null;
  }
  if (!imagenBackend && Array.isArray(productoBackend.media) && productoBackend.media.length > 0) {
    const first = productoBackend.media[0];
    imagenBackend = first?.url || first?.secure_url || first?.small || first || null;
  }

  let imagenFinal = imagenLocal;
  // Build a normalized imageUrl that references the backend resource when provided
  // Determinar base del backend en tiempo de ejecución.
  // Priorizar: si estamos desarrollando en localhost, forcemos el backend local para evitar llamar producción.
  const runtimeHostname = (typeof window !== 'undefined' && window.location && window.location.hostname) ? window.location.hostname : null;
  const isLocalhost = runtimeHostname === 'localhost' || runtimeHostname === '127.0.0.1';
  const configuredBase = import.meta.env.VITE_API_URL || api.defaults.baseURL || '';
  const fallbackBase = 'http://localhost:8080/api';
  const chosenBaseRaw = isLocalhost ? fallbackBase : (configuredBase || fallbackBase);
  const BACKEND_BASE = String(chosenBaseRaw).replace(/\/api\/?$/, '').replace(/\/$/, '');
  let imageUrl = null;
  if (imagenBackend) {
    // Normalize image url - handle absolute, protocol-relative, relative paths
    if (/^\/\//.test(imagenBackend)) {
      imageUrl = 'https:' + imagenBackend;
    } else if (/^https?:\/\//i.test(imagenBackend) || /^data:/i.test(imagenBackend) || /^blob:/i.test(imagenBackend)) {
      imageUrl = imagenBackend;
    } else {
      try {
        imageUrl = new URL(imagenBackend, BACKEND_BASE).href;
      } catch {
        imageUrl = null;
      }
    }
  }
  if (imagenBackend) {
    logger.debug(`Imagen backend encontrada: ${imagenBackend}`);
    // Si es una URL absoluta, úsala tal cual
    if (/^https?:\/\//i.test(imagenBackend) || /^\/\//.test(imagenBackend) || /^data:/i.test(imagenBackend) || /^blob:/i.test(imagenBackend)) {
      // protocol-relative URLs (//images...) -> use https
      if (/^\/\//.test(imagenBackend)) {
        imagenFinal = 'https:' + imagenBackend;
      } else {
        imagenFinal = imagenBackend;
      }
    } else {
      // Si backend devolvió una ruta relativa, construí una URL completa usando VITE_API_URL
      try {
        // Usar la misma lógica de base en tiempo de ejecución para construir URLs relativas
        const baseForImages = isLocalhost ? fallbackBase : (import.meta.env.VITE_API_URL || api.defaults.baseURL || '/');
        imagenFinal = new URL(imagenBackend, baseForImages).href;
      } catch {
        imagenFinal = imagenLocal;
      }
    }
  }
  else {
    logger.debug(`No imageUrl from backend for producto ${productoBackend.id || productoBackend.producto_id || productoBackend.name}`);
  }

  return {
    id: productoBackend.id || productoBackend.producto_id || productoBackend.productoId,
    nombre: productoBackend.name || productoBackend.producto_nombre || productoBackend.nombre,
    descripcion: productoBackend.description || productoBackend.descripcion || '',
    precio: productoBackend.price || productoBackend.precio || 0,
    precioAnterior: productoBackend.previousPrice || productoBackend.precioAnterior || null,
    imagen: imagenFinal, // Usar imagen enviada por backend o fallback local
    imageUrl: imageUrl, // URL absoluta (cuando el backend provee una) o null
    categoria: categoria,
    stock: productoBackend.stock !== undefined ? productoBackend.stock : 0,
    destacado: productoBackend.highlighted !== undefined ? productoBackend.highlighted : productoBackend.destacado || false,
    valoracion: productoBackend.rating || productoBackend.valoracion || 0,
    marca: productoBackend.marca || null,
    peso: productoBackend.peso || null
  };
}

/**
 * Obtiene todos los productos desde el backend
 * @returns {Promise<Array>} - Array de productos
 */
export async function obtenerProductos() {
  try {
    logger.debug('Obteniendo productos del backend...');
    const response = await api.get('/productos');
    
    logger.debug('Respuesta del backend recibida');
    
    // El backend puede devolver:
    // 1. Array directo: [producto1, producto2, ...]
    // 2. Objeto con contenido: { content: [...], totalElements: 10, ... }
    // 3. Objeto con data: { data: [...] }
    
    let productosArray = [];
    
    if (Array.isArray(response.data)) {
      // Caso 1: Array directo
      productosArray = response.data;
    } else if (response.data.content && Array.isArray(response.data.content)) {
      // Caso 2: Paginación de Spring Boot (Page<Producto>)
      productosArray = response.data.content;
    } else if (response.data.data && Array.isArray(response.data.data)) {
      // Caso 3: Respuesta envuelta en {data: [...]}
      productosArray = response.data.data;
    } else {
      logger.error('Formato de respuesta no reconocido:', response.data);
      throw new Error('Formato de respuesta del backend no reconocido');
    }
    
    logger.success('Productos recibidos:', productosArray.length);
    
    // Mapear productos del backend al formato frontend
    const productosMapeados = productosArray.map(mapearProductoBackend);
    
    return productosMapeados;
  } catch (error) {
    const mensajeError = handleError(error, 'Obtener productos');
    logger.error('Error al obtener productos:', error);

    // Si recibimos 404, intentar variaciones de la baseURL (sin /api, con /api, origin)
    try {
      const status = error?.response?.status;
      if (status === 404) {
        const tried = new Set();
        const currentBase = api.defaults.baseURL || '';
        let origin = currentBase;
        try {
          origin = (new URL(currentBase)).origin;
        } catch (err) {
          logger.debug('No se pudo parsear origin desde currentBase:', currentBase, err);
        }

        const removeApi = String(currentBase).replace(/\/api\/?$/, '').replace(/\/$/, '');
        const addApi = removeApi + '/api';

        const candidates = [currentBase, removeApi, addApi, origin].map(s => String(s || '').replace(/\/$/, '')).filter(Boolean);

        for (const cand of candidates) {
          if (tried.has(cand)) continue;
          tried.add(cand);
          const url = `${cand}/productos`;
          try {
            logger.debug('Probando alternativa para productos:', url);
            const resp = await axios.get(url);
            if (resp && (resp.status === 200 || resp.status === 204)) {
              // Encontramos una base válida — persistir y usarla
              api.defaults.baseURL = cand;
              try {
                if (typeof window !== 'undefined' && window.localStorage) {
                  localStorage.setItem('api_base_override', cand);
                }
              } catch (err) { logger.debug('No se pudo persistir api_base_override en localStorage', err); }
              logger.success('Se encontró base alternativa válida para /productos:', cand);
              // Re-intentar mapeo con la respuesta encontrada
              let productosArray = [];
              if (Array.isArray(resp.data)) productosArray = resp.data;
              else if (resp.data.content && Array.isArray(resp.data.content)) productosArray = resp.data.content;
              else if (resp.data.data && Array.isArray(resp.data.data)) productosArray = resp.data.data;
              else {
                // si el formato no es reconocido, dejaremos continuar y lanzar el error original
                continue;
              }
              const productosMapeados = productosArray.map(mapearProductoBackend);
              return productosMapeados;
            }
          } catch (e) {
            logger.debug('Alternativa fallida:', url, e?.response?.status || e?.message || e);
            // seguir probando
          }
        }
      }
    } catch (e) {
      logger.debug('Error al intentar alternativas de baseURL:', e);
    }

    throw new Error(mensajeError);
  }
}

/**
 * Obtiene un producto por su ID desde el backend
 * @param {number} id - ID del producto
 * @returns {Promise<Object|null>} - Producto encontrado o null
 */
export async function obtenerProductoPorId(id) {
  try {
    logger.debug(`Obteniendo producto ${id} del backend...`);
    const response = await api.get(`/productos/${id}`);
    logger.success(`Producto ${id} recibido`);
    const productoMapeado = mapearProductoBackend(response.data);
    return productoMapeado;
  } catch (error) {
    logger.error(`Error al obtener producto ${id}:`, error);
    return null;
  }
}

/**
 * Obtiene productos destacados desde el backend
 * @returns {Promise<Array>} - Array de productos destacados
 */
export async function obtenerProductosDestacados() {
  try {
    const productos = await obtenerProductos();
    return productos.filter(p => p.destacado === true);
  } catch (error) {
    logger.error('Error al obtener destacados:', error);
    return [];
  }
}

/**
 * Filtra productos por categoría
 * @param {string} categoria - Categoría a filtrar
 * @returns {Promise<Array>} - Productos filtrados
 */
export async function filtrarPorCategoria(categoria) {
  try {
    const productos = await obtenerProductos();
    if (!categoria || categoria === 'Todos' || categoria === 'Todas') {
      return productos;
    }
    return productos.filter(p => 
      p.categoria.toLowerCase() === categoria.toLowerCase()
    );
  } catch (error) {
    logger.error('Error al filtrar por categoría:', error);
    return [];
  }
}

/**
 * Busca productos por término
 * @param {string} termino - Término de búsqueda
 * @returns {Promise<Array>} - Productos encontrados
 */
export async function buscarProductos(termino) {
  try {
    const productos = await obtenerProductos();
    if (!termino) return productos;
    
    const terminoLower = termino.toLowerCase();
    return productos.filter(p => 
      p.nombre.toLowerCase().includes(terminoLower) ||
      (p.descripcion && p.descripcion.toLowerCase().includes(terminoLower))
    );
  } catch (error) {
    logger.error('Error al buscar productos:', error);
    return [];
  }
}

/**
 * Agrega un nuevo producto al backend (CRUD)
 * @param {Object} producto - Datos del producto
 * @returns {Promise<Object>} - Producto creado
 */
export async function agregarProducto(producto) {
  try {
    // Convertir campos frontend → backend
    const productoBackend = {
      name: producto.nombre,
      description: producto.descripcion,
      price: producto.precio,
      category: producto.categoria,
      // Only send imageUrl to backend when it's an absolute URL (Cloudinary, Unsplash),
      // otherwise omit it so backend can generate or use default image by category.
      ...(producto.imagen && /^https?:\/\//i.test(producto.imagen) && { imageUrl: producto.imagen }),
      stock: producto.stock || 0,
      highlighted: producto.destacado || false,
      rating: producto.valoracion || 0,
      previousPrice: producto.precioAnterior || null
    };
    
    const response = await api.post('/productos', productoBackend);
    logger.success('Producto creado exitosamente');
    return mapearProductoBackend(response.data);
  } catch (error) {
    logger.error('Error al crear producto:', error);
    throw error;
  }
}

/**
 * Actualiza un producto existente en el backend (CRUD)
 * @param {number} id - ID del producto
 * @param {Object} datosActualizados - Datos a actualizar
 * @returns {Promise<Object|null>} - Producto actualizado o null
 */
export async function actualizarProducto(id, datosActualizados) {
  try {
    // Convertir campos frontend → backend si es necesario
    const datosBackend = {
      ...(datosActualizados.nombre && { name: datosActualizados.nombre }),
      ...(datosActualizados.descripcion && { description: datosActualizados.descripcion }),
      ...(datosActualizados.precio && { price: datosActualizados.precio }),
      ...(datosActualizados.categoria && { category: datosActualizados.categoria }),
      ...(datosActualizados.imagen && /^https?:\/\//i.test(datosActualizados.imagen) && { imageUrl: datosActualizados.imagen }),
      ...(datosActualizados.stock !== undefined && { stock: datosActualizados.stock }),
      ...(datosActualizados.destacado !== undefined && { highlighted: datosActualizados.destacado }),
      ...(datosActualizados.valoracion !== undefined && { rating: datosActualizados.valoracion }),
      ...(datosActualizados.precioAnterior !== undefined && { previousPrice: datosActualizados.precioAnterior })
    };
    
    const response = await api.put(`/productos/${id}`, datosBackend);
    logger.success(`Producto ${id} actualizado exitosamente`);
    return mapearProductoBackend(response.data);
  } catch (error) {
    logger.error('Error al actualizar producto:', error);
    throw error;
  }
}

/**
 * Elimina un producto del backend (CRUD)
 * @param {number} id - ID del producto
 * @returns {Promise<boolean>} - true si se eliminó
 */
export async function eliminarProducto(id) {
  try {
    await api.delete(`/productos/${id}`);
    logger.success(`Producto ${id} eliminado`);
    return true;
  } catch (error) {
    logger.error('Error al eliminar producto:', error);
    throw error;
  }
}

// Export helper for unit tests and debugging
export { mapearProductoBackend };