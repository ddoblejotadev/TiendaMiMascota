/**
 * CUSTOM HOOK: useProducts
 * Maneja toda la lógica de productos, filtros y búsqueda
 */

import { useState, useEffect } from 'react';
import * as productService from '../services/productService';

export function useProducts(opciones = {}) {
  const {
    cargarInicial = true,
    soloDestacados = false,
    categoria = null
  } = opciones;

  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  
  const [busqueda, setBusqueda] = useState('');
  const [categoriaActual, setCategoriaActual] = useState(categoria || '');

  useEffect(() => {
    if (cargarInicial) {
      cargarProductos();
    }
  }, [cargarInicial]);

  useEffect(() => {
    filtrarProductos();
  }, [productos, busqueda, categoriaActual]);

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

  const filtrarProductos = () => {
    let resultado = [...productos];

    if (busqueda) {
      const terminoLower = busqueda.toLowerCase();
      resultado = resultado.filter(p =>
        p.nombre.toLowerCase().includes(terminoLower) ||
        p.descripcion.toLowerCase().includes(terminoLower)
      );
    }

    if (categoriaActual && categoriaActual !== 'Todos') {
      resultado = resultado.filter(p => p.categoria === categoriaActual);
    }

    setProductosFiltrados(resultado);
  };

  const buscarProductos = (termino) => {
    setBusqueda(termino);
  };

  const filtrarPorCategoria = (categoria) => {
    setCategoriaActual(categoria);
  };

  const limpiarFiltros = () => {
    setBusqueda('');
    setCategoriaActual('');
  };

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

  const recargar = () => {
    cargarProductos();
  };

  return {
    productos: productosFiltrados,
    todosLosProductos: productos,
    cargando,
    error,
    busqueda,
    categoriaActual,
    buscarProductos,
    filtrarPorCategoria,
    limpiarFiltros,
    obtenerProducto,
    agregarProducto,
    actualizarProducto,
    eliminarProducto,
    recargar
  };
}