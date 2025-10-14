/**
 * HOOK SIMPLE DE PRODUCTOS
 */

import { useState, useEffect } from 'react';

// Datos de productos (simulando una base de datos)
const PRODUCTOS = [
  {
    id: 1,
    nombre: "Alimento Premium para Perros",
    descripcion: "Alimento balanceado de alta calidad",
    precio: 25990,
    imagen: "/images/productos/alimento-perro.jpg",
    categoria: "Alimento",
    stock: 50
  },
  {
    id: 2,
    nombre: "Juguete Mordedor",
    descripcion: "Juguete resistente para mascotas",
    precio: 8990,
    imagen: "/images/productos/juguete.jpg",
    categoria: "Juguetes",
    stock: 30
  },
  {
    id: 3,
    nombre: "Collar Ajustable",
    descripcion: "Collar cómodo para perros",
    precio: 12990,
    imagen: "/images/productos/collar.jpg",
    categoria: "Accesorios",
    stock: 20
  },
  {
    id: 4,
    nombre: "Shampoo para Gatos",
    descripcion: "Shampoo especial para gatos",
    precio: 7990,
    imagen: "/images/productos/shampoo.jpg",
    categoria: "Higiene",
    stock: 40
  }
];

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Cargar productos al iniciar
  useEffect(() => {
    // Simular carga desde servidor
    setTimeout(() => {
      setProducts(PRODUCTOS);
      setFilteredProducts(PRODUCTOS);
      setLoading(false);
    }, 500);
  }, []);

  // Filtrar cuando cambia búsqueda o categoría
  useEffect(() => {
    let result = [...products];

    // Filtrar por búsqueda
    if (searchTerm) {
      result = result.filter(p =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (selectedCategory !== 'Todos') {
      result = result.filter(p => p.categoria === selectedCategory);
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  // Buscar productos
  const searchProducts = (term) => {
    setSearchTerm(term);
  };

  // Filtrar por categoría
  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };

  // Obtener un producto por ID
  const getProductById = (id) => {
    return products.find(p => p.id === Number(id));
  };

  return {
    products: filteredProducts,
    allProducts: products,
    loading,
    searchTerm,
    selectedCategory,
    searchProducts,
    filterByCategory,
    getProductById
  };
}