/**
 * CUSTOM HOOK: useProducts
 * Maneja toda la lógica de productos, filtros y búsqueda
 */

import { useState, useEffect } from 'react';
import * as productService from '../services/productService';

export function useProducts(opciones = {}) {
  const {
    cargarInicial = true,        // Si debe cargar productos al montar
    soloDestacados = false,      // Si solo carga productos destacados
    categoria = null             // Categoría inicial a filtrar
  } = opciones;

  // Estados
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  
  // Estados de filtros
  const [busqueda, setBusqueda] = useState('');
  const [categoriaActual, setCategoriaActual] = useState(categoria || '');

  /**
   * EFECTO: Cargar productos al montar
   */
  useEffect(() => {
    if (cargarInicial) {
      cargarProductos();
    }
  }, [cargarInicial]);

  /**
   * EFECTO: Filtrar productos cuando cambian filtros
   */
  useEffect(() => {
    filtrarProductos();
  }, [productos, busqueda, categoriaActual]);

  /**
   * Carga todos los productos o solo destacados
   */
  const cargarProductos = async () => {
    try {
      setCargando(true);
      setError(null);
      
      let data;
      if (soloDestacados) {
        data = await productService.obtenerProductosDestacados();
      } else {
        data = await productService.obtenerProductos();
      }
      
      setProductos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  /**
   * Filtra productos según búsqueda y categoría
   */
  const filtrarProductos = () => {
    let resultado = [...productos];

    // Filtrar por búsqueda
    if (busqueda) {
      const terminoLower = busqueda.toLowerCase();
      resultado = resultado.filter(p =>
        p.nombre.toLowerCase().includes(terminoLower) ||
        p.descripcion.toLowerCase().includes(terminoLower)
      );
    }

    // Filtrar por categoría
    if (categoriaActual && categoriaActual !== 'Todos') {
      resultado = resultado.filter(p => p.categoria === categoriaActual);
    }

    setProductosFiltrados(resultado);
  };

  /**
   * Busca productos por término
   * @param {string} termino - Término de búsqueda
   */
  const buscarProductos = (termino) => {
    setBusqueda(termino);
  };

  /**
   * Filtra por categoría
   * @param {string} categoria - Categoría a filtrar
   */
  const filtrarPorCategoria = (categoria) => {
    setCategoriaActual(categoria);
  };

  /**
   * Limpia todos los filtros
   */
  const limpiarFiltros = () => {
    setBusqueda('');
    setCategoriaActual('');
  };

  /**
   * Obtiene un producto por ID
   * @param {number} id - ID del producto
   * @returns {Promise<Object>}
   */
  const obtenerProducto = async (id) => {
    try {
      setCargando(true);
      setError(null);
      
      const producto = await productService.obtenerProductoPorId(id);
      return producto;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setCargando(false);
    }
  };

  /**
   * Agrega un nuevo producto (CRUD)
   * @param {Object} producto - Datos del producto
   */
  const agregarProducto = async (producto) => {
    try {
      setCargando(true);
      setError(null);
      
      const nuevoProducto = await productService.agregarProducto(producto);
      setProductos([...productos, nuevoProducto]);
      
      return { success: true, producto: nuevoProducto };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setCargando(false);
    }
  };

  /**
   * Actualiza un producto existente (CRUD)
   * @param {number} id - ID del producto
   * @param {Object} datosActualizados - Datos a actualizar
   */
  const actualizarProducto = async (id, datosActualizados) => {
    try {
      setCargando(true);
      setError(null);
      
      const productoActualizado = await productService.actualizarProducto(id, datosActualizados);
      
      if (productoActualizado) {
        setProductos(productos.map(p => 
          p.id === id ? productoActualizado : p
        ));
        return { success: true, producto: productoActualizado };
      }
      
      return { success: false, error: 'Producto no encontrado' };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setCargando(false);
    }
  };

  /**
   * Elimina un producto (CRUD)
   * @param {number} id - ID del producto
   */
  const eliminarProducto = async (id) => {
    try {
      setCargando(true);
      setError(null);
      
      const eliminado = await productService.eliminarProducto(id);
      
      if (eliminado) {
        setProductos(productos.filter(p => p.id !== id));
        return { success: true };
      }
      
      return { success: false, error: 'Producto no encontrado' };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setCargando(false);
    }
  };

  /**
   * Recarga los productos
   */
  const recargar = () => {
    cargarProductos();
  };

  // Retornar todo lo que necesitamos
  return {
    productos: productosFiltrados,  // Productos filtrados
    todoLosProductos: productos,    // Todos los productos sin filtrar
    cargando,                       // Estado de carga
    error,                          // Error si hay
    busqueda,                       // Término de búsqueda actual
    categoriaActual,                // Categoría actual
    buscarProductos,                // Función para buscar
    filtrarPorCategoria,            // Función para filtrar por categoría
    limpiarFiltros,                 // Función para limpiar filtros
    obtenerProducto,                // Función para obtener un producto
    agregarProducto,                // Función para agregar (CRUD)
    actualizarProducto,             // Función para actualizar (CRUD)
    eliminarProducto,               // Función para eliminar (CRUD)
    recargar                        // Función para recargar
  };
}