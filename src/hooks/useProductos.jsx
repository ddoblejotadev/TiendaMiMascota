/**
 * HOOK DE PRODUCTOS
 * Maneja la lista de productos y filtros
 * Consume datos del backend via API REST
 */

import { useState, useEffect, useMemo } from 'react';
import { obtenerProductos } from '../services/productService';
import { useDebounce } from './useDebounce';
import logger from '../util/logger';
import { handleError } from '../util/errorHandler';

function useProductos() {
  // Estados
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  // OPTIMIZACIÓN: Debounce en búsqueda para evitar filtros innecesarios
  const debouncedBusqueda = useDebounce(busqueda, 300);

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
      logger.debug('Cargando productos desde el backend...');
      
      const productosObtenidos = await obtenerProductos();
      
      logger.success('Productos cargados correctamente:', productosObtenidos.length);
      setProductos(productosObtenidos);
    } catch (error) {
      const mensajeError = handleError(error, 'Cargar productos');
      logger.error('Error al cargar productos:', error);
      setError(mensajeError);
      setProductos([]);
    } finally {
      setCargando(false);
    }
  };

  // OPTIMIZACIÓN: Filtrar productos con useMemo (se recalcula solo cuando cambian dependencias)
  const productosFiltrados = useMemo(() => {
    let resultado = [...productos];

    // Filtro 1: Por búsqueda (usando debounced)
    if (debouncedBusqueda) {
      const busquedaLower = debouncedBusqueda.toLowerCase();
      resultado = resultado.filter(p =>
        p.nombre?.toLowerCase().includes(busquedaLower) ||
        p.descripcion?.toLowerCase().includes(busquedaLower)
      );
    }

    // Filtro 2: Por categoría
    if (categoriaSeleccionada !== 'Todas') {
      resultado = resultado.filter(p => p.categoria === categoriaSeleccionada);
    }

    return resultado;
  }, [productos, debouncedBusqueda, categoriaSeleccionada]);

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
   * FUNCIÓN: Obtener todas las categorías únicas (memoizada)
   */
  const categorias = useMemo(() => {
    const categoriasUnicas = [...new Set(productos.map(p => p.categoria))];
    return ['Todas', ...categoriasUnicas];
  }, [productos]);

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
    obtenerCategorias: () => categorias,
    recargarProductos: cargarProductosDelBackend
  };
}

export default useProductos;