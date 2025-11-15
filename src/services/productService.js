/**
 * SERVICIO DE PRODUCTOS
 * Maneja todas las operaciones relacionadas con productos
 * Consume datos del backend via API REST
 */

import api from '../util/constants';

// Importar imágenes desde assets (usadas como fallback)
import imagenComida from '../assets/prod.png';
import imagenJuguetes from '../assets/jugetes.png';
import imagenAccesorios from '../assets/accesorios.png';
import imagenHigiene from '../assets/higiene.png';
import imagenCama from '../assets/cama2.png';

// Mapeo de imágenes por categoría (fallback si backend no tiene imagen)
const imagenesPorCategoria = {
  'Alimento': imagenComida,
  'Juguetes': imagenJuguetes,
  'Accesorios': imagenAccesorios,
  'Higiene': imagenHigiene,
  'Medicamentos': imagenHigiene,
  'default': imagenAccesorios
};

/**
 * Mapea los datos del backend al formato del frontend
 * Backend usa: name, description, price, category, imageUrl, highlighted, rating, previousPrice
 * Frontend usa: nombre, descripcion, precio, categoria, imagen, destacado, valoracion, precioAnterior
 */
function mapearProductoBackend(productoBackend) {
  // Siempre usar imágenes locales del assets (el backend no tiene imágenes físicas)
  const categoria = productoBackend.category || productoBackend.categoria || 'default';
  const imagenLocal = imagenesPorCategoria[categoria] || imagenesPorCategoria.default;
  
  return {
    id: productoBackend.id || productoBackend.producto_id || productoBackend.productoId,
    nombre: productoBackend.name || productoBackend.producto_nombre || productoBackend.nombre,
    descripcion: productoBackend.description || productoBackend.descripcion || '',
    precio: productoBackend.price || productoBackend.precio || 0,
    precioAnterior: productoBackend.previousPrice || productoBackend.precioAnterior || null,
    imagen: imagenLocal, // SIEMPRE usar imágenes locales
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
    console.log('📡 Obteniendo productos del backend...');
    const response = await api.get('/productos');
    
    console.log('🔍 RESPUESTA COMPLETA DEL BACKEND:', response.data);
    
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
      console.error('❌ Formato de respuesta no reconocido:', response.data);
      throw new Error('Formato de respuesta del backend no reconocido');
    }
    
    console.log('✅ Productos recibidos:', productosArray.length);
    
    // LOG TEMPORAL: Ver estructura del primer producto
    if (productosArray.length > 0) {
      console.log('🔍 ESTRUCTURA DEL PRIMER PRODUCTO:', productosArray[0]);
    }
    
    // Mapear productos del backend al formato frontend
    const productosMapeados = productosArray.map(mapearProductoBackend);
    
    // LOG TEMPORAL: Ver producto mapeado
    if (productosMapeados.length > 0) {
      console.log('🔍 PRODUCTO MAPEADO (debe tener id):', productosMapeados[0]);
    }
    
    return productosMapeados;
  } catch (error) {
    console.error('❌ Error al obtener productos:', error);
    console.error('Detalles:', error.response?.data || error.message);
    throw new Error(`No se pudieron cargar los productos del backend: ${error.message}`);
  }
}

/**
 * Obtiene un producto por su ID desde el backend
 * @param {number} id - ID del producto
 * @returns {Promise<Object|null>} - Producto encontrado o null
 */
export async function obtenerProductoPorId(id) {
  try {
    console.log(`📡 Obteniendo producto ${id} del backend...`);
    const response = await api.get(`/productos/${id}`);
    console.log(`✅ Producto ${id} recibido:`, response.data);
    const productoMapeado = mapearProductoBackend(response.data);
    console.log(`✅ Producto mapeado:`, productoMapeado);
    return productoMapeado;
  } catch (error) {
    console.error(`❌ Error al obtener producto ${id}:`, error);
    console.error('Detalles:', error.response?.data || error.message);
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
    console.error('Error al obtener destacados:', error);
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
    console.error('Error al filtrar por categoría:', error);
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
    console.error('Error al buscar productos:', error);
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
      imageUrl: producto.imagen,
      stock: producto.stock || 0,
      highlighted: producto.destacado || false,
      rating: producto.valoracion || 0,
      previousPrice: producto.precioAnterior || null
    };
    
    const response = await api.post('/productos', productoBackend);
    return mapearProductoBackend(response.data);
  } catch (error) {
    console.error('Error al crear producto:', error);
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
      ...(datosActualizados.imagen && { imageUrl: datosActualizados.imagen }),
      ...(datosActualizados.stock !== undefined && { stock: datosActualizados.stock }),
      ...(datosActualizados.destacado !== undefined && { highlighted: datosActualizados.destacado }),
      ...(datosActualizados.valoracion !== undefined && { rating: datosActualizados.valoracion }),
      ...(datosActualizados.precioAnterior !== undefined && { previousPrice: datosActualizados.precioAnterior })
    };
    
    const response = await api.put(`/productos/${id}`, datosBackend);
    return mapearProductoBackend(response.data);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
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
    console.log(`✅ Producto ${id} eliminado`);
    return true;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
}