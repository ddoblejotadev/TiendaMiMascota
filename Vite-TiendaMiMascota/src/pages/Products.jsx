import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ProductFilter from '../components/ProductFilter'
import { useProducts } from '../hooks/useProducts'
import '../styles/global.css'

function Products() {
  const [searchParams] = useSearchParams()
  const { products, loading, error } = useProducts()
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: '',
    priceRange: [0, 100000],
    sortBy: 'name'
  })

  useEffect(() => {
    let result = [...products]

    // Filtrar por categoría
    if (filters.category) {
      result = result.filter(p => p.category?.toLowerCase() === filters.category.toLowerCase())
    }

    // Filtrar por búsqueda
    if (filters.search) {
      result = result.filter(p => 
        p.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.description?.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    // Filtrar por rango de precio
    result = result.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )

    // Ordenar
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name':
      default:
        result.sort((a, b) => a.name?.localeCompare(b.name))
        break
    }

    setFilteredProducts(result)
  }, [products, filters])

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return (
    <div className="products-page">
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <img src="/src/assets/logo1.png" alt="Mi Mascota Logo" />
          </Link>
          <nav>
            <Link to="/">Inicio</Link>
            <Link to="/products" className="active">Productos</Link>
            <Link to="/about">Nosotros</Link>
            <Link to="/contact">Contacto</Link>
            <Link to="/cart">Carrito</Link>
            <Link to="/login">Iniciar Sesión</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <div className="page-header">
          <h1>Nuestros Productos</h1>
          <p>Encuentra todo lo que necesitas para tu mascota</p>
        </div>

        <div className="products-layout">
          <aside className="filters-sidebar">
            <ProductFilter filters={filters} onFilterChange={handleFilterChange} />
          </aside>

          <div className="products-content">
            {loading && (
              <div className="loading-state">
                <p>Cargando productos...</p>
              </div>
            )}

            {error && (
              <div className="error-state">
                <p>Error al cargar productos: {error}</p>
              </div>
            )}

            {!loading && !error && filteredProducts.length === 0 && (
              <div className="empty-state">
                <p>No se encontraron productos con los filtros seleccionados</p>
              </div>
            )}

            {!loading && !error && filteredProducts.length > 0 && (
              <>
                <div className="products-header">
                  <p className="results-count">
                    {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="products-grid">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Mi Mascota. Todos los derechos reservados.</p>
          <div className="footer-links">
            <Link to="/about">Sobre Nosotros</Link>
            <Link to="/contact">Contacto</Link>
            <Link to="/products">Productos</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Products