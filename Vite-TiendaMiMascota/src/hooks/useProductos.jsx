/**
 * HOOK DE PRODUCTOS
 * Maneja la lista de productos y filtros
 */

import { useState, useEffect } from 'react';

// Lista de productos (simulando base de datos)
const PRODUCTOS_DB = [
  {
    id: 1,
    nombre: "Alimento Premium para Perros",
    descripcion: "Alimento balanceado de alta calidad para perros adultos",
    precio: 25990,
    imagen: "/images/alimento-perro.jpg",
    categoria: "Alimento",
    stock: 50
  },
  {
    id: 2,
    nombre: "Juguete Mordedor",
    descripcion: "Juguete resistente para mascotas de todas las edades",
    precio: 8990,
    imagen: "/images/juguete.jpg",
    categoria: "Juguetes",
    stock: 30
  },
  {
    id: 3,
    nombre: "Collar Ajustable",
    descripcion: "Collar cómodo y ajustable para perros medianos",
    precio: 12990,
    imagen: "/images/collar.jpg",
    categoria: "Accesorios",
    stock: 20
  },
  {
    id: 4,
    nombre: "Shampoo para Gatos",
    descripcion: "Shampoo especial para el cuidado del pelaje",
    precio: 7990,
    imagen: "/images/shampoo.jpg",
    categoria: "Higiene",
    stock: 40
  },
  {
    id: 5,
    nombre: "Cama para Mascotas",
    descripcion: "Cama suave y cómoda para perros y gatos",
    precio: 35990,
    imagen: "/images/cama.jpg",
    categoria: "Accesorios",
    stock: 15
  },
  {
    id: 6,
    nombre: "Alimento para Gatos",
    descripcion: "Alimento completo para gatos adultos",
    precio: 22990,
    imagen: "/images/alimento-gato.jpg",
    categoria: "Alimento",
    stock: 45
  }
];

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
      setProductos(PRODUCTOS_DB);
      setProductosFiltrados(PRODUCTOS_DB);
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