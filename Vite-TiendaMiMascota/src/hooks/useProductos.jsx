/**
 * HOOK DE PRODUCTOS
 * Maneja la lista de productos y filtros
 */

import { useState, useEffect } from 'react';
import { obtenerProductos } from '../services/productService';

function useProductos() {
  // Estados
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  // EFECTO 1: Cargar productos al inicio
  useEffect(() => {
    // Simular carga desde servidor (con delay)
    setTimeout(() => {
      const productosObtenidos = obtenerProductos();
      setProductos(productosObtenidos);
      setProductosFiltrados(productosObtenidos);
      setCargando(false);
    }, 500);
  }, []);

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
    busqueda,
    categoriaSeleccionada,
    buscarProductos,
    filtrarPorCategoria,
    limpiarFiltros,
    obtenerProductoPorId,
    obtenerCategorias
  };
}

export default useProductos;