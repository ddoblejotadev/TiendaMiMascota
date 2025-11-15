/**
 * HOOK DE PRODUCTOS
 * Maneja la lista de productos y filtros
 * Consume datos del backend via API REST
 */

import { useState, useEffect } from 'react';
import { obtenerProductos } from '../services/productService';

function useProductos() {
  // Estados
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  // EFECTO 1: Cargar productos al inicio desde el backend
  useEffect(() => {
    cargarProductosDelBackend();
  }, []);

  /**
   * Carga productos desde el backend
   */
  const cargarProductosDelBackend = async () => {
    try {
      setCargando(true);
      setError(null);
      console.log('🔄 Cargando productos desde http://localhost:8080/api/productos');
      
      const productosObtenidos = await obtenerProductos();
      
      console.log('✅ Productos cargados correctamente:', productosObtenidos.length);
      setProductos(productosObtenidos);
      setProductosFiltrados(productosObtenidos);
    } catch (error) {
      console.error('❌ Error al cargar productos:', error);
      setError(error.message || 'Error al cargar productos del backend');
      setProductos([]);
      setProductosFiltrados([]);
    } finally {
      setCargando(false);
    }
  };

  // EFECTO 2: Filtrar productos cuando cambia búsqueda o categoría
  useEffect(() => {
    let resultado = [...productos];

    // Filtro 1: Por búsqueda
    if (busqueda) {
      resultado = resultado.filter(p =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Filtro 2: Por categoría
    if (categoriaSeleccionada !== 'Todas') {
      resultado = resultado.filter(p => p.categoria === categoriaSeleccionada);
    }

    setProductosFiltrados(resultado);
  }, [busqueda, categoriaSeleccionada, productos]);

  /**
   * FUNCIÓN: Buscar productos por texto
   */
  const buscarProductos = (texto) => {
    setBusqueda(texto);
  };

  /**
   * FUNCIÓN: Filtrar por categoría
   */
  const filtrarPorCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  /**
   * FUNCIÓN: Limpiar todos los filtros
   */
  const limpiarFiltros = () => {
    setBusqueda('');
    setCategoriaSeleccionada('Todas');
  };

  /**
   * FUNCIÓN: Obtener un producto por ID
   */
  const obtenerProductoPorId = (id) => {
    return productos.find(p => p.id === Number(id));
  };

  /**
   * FUNCIÓN: Obtener todas las categorías únicas
   */
  const obtenerCategorias = () => {
    const categorias = productos.map(p => p.categoria);
    return ['Todas', ...new Set(categorias)];
  };

  // Retornar todo
  return {
    productos: productosFiltrados,
    todosLosProductos: productos,
    cargando,
    error,
    busqueda,
    categoriaSeleccionada,
    buscarProductos,
    filtrarPorCategoria,
    limpiarFiltros,
    obtenerProductoPorId,
    obtenerCategorias,
    recargarProductos: cargarProductosDelBackend
  };
}

export default useProductos;