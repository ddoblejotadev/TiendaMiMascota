import { useState } from 'react'
import '../styles/global.css'

function ProductFilter({ filters, onFilterChange }) {
  const [isOpen, setIsOpen] = useState({
    category: true,
    price: true,
    sort: true
  })

  const categories = [
    { value: '', label: 'Todas las categorías' },
    { value: 'comida', label: 'Comida' },
    { value: 'juguetes', label: 'Juguetes' },
    { value: 'accesorios', label: 'Accesorios' },
    { value: 'higiene', label: 'Higiene' },
    { value: 'salud', label: 'Salud' },
    { value: 'camas', label: 'Camas y Descanso' }
  ]

  const sortOptions = [
    { value: 'name', label: 'Nombre (A-Z)' },
    { value: 'price-asc', label: 'Precio: Menor a Mayor' },
    { value: 'price-desc', label: 'Precio: Mayor a Menor' }
  ]

  const toggleSection = (section) => {
    setIsOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleCategoryChange = (category) => {
    onFilterChange({ category })
  }

  const handleSearchChange = (e) => {
    onFilterChange({ search: e.target.value })
  }

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value)
    const newRange = filters.priceRange ? [...filters.priceRange] : [0, 100000]
    
    if (e.target.name === 'minPrice') {
      newRange[0] = value
    } else {
      newRange[1] = value
    }
    
    onFilterChange({ priceRange: newRange })
  }

  const handleSortChange = (sortBy) => {
    onFilterChange({ sortBy })
  }

  const handleClearFilters = () => {
    onFilterChange({
      category: '',
      search: '',
      priceRange: [0, 100000],
      sortBy: 'name'
    })
  }

  return (
    <div className="product-filter">
      <div className="filter-header">
        <h3>Filtros</h3>
        <button 
          onClick={handleClearFilters}
          className="btn-clear-filters"
        >
          Limpiar
        </button>
      </div>

      {/* Búsqueda */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={filters.search || ''}
          onChange={handleSearchChange}
          className="filter-search"
        />
      </div>

      {/* Categorías */}
      <div className="filter-section">
        <button 
          className="filter-section-header"
          onClick={() => toggleSection('category')}
        >
          <span>Categorías</span>
          <span className="toggle-icon">{isOpen.category ? '−' : '+'}</span>
        </button>
        
        {isOpen.category && (
          <div className="filter-section-content">
            {categories.map(cat => (
              <label key={cat.value} className="filter-option">
                <input
                  type="radio"
                  name="category"
                  value={cat.value}
                  checked={filters.category === cat.value}
                  onChange={() => handleCategoryChange(cat.value)}
                />
                <span>{cat.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rango de Precio */}
      <div className="filter-section">
        <button 
          className="filter-section-header"
          onClick={() => toggleSection('price')}
        >
          <span>Precio</span>
          <span className="toggle-icon">{isOpen.price ? '−' : '+'}</span>
        </button>
        
        {isOpen.price && (
          <div className="filter-section-content">
            <div className="price-inputs">
              <div className="price-input-group">
                <label htmlFor="minPrice">Mínimo</label>
                <input
                  type="number"
                  id="minPrice"
                  name="minPrice"
                  value={filters.priceRange?.[0] || 0}
                  onChange={handlePriceChange}
                  min="0"
                  step="1000"
                />
              </div>
              <div className="price-input-group">
                <label htmlFor="maxPrice">Máximo</label>
                <input
                  type="number"
                  id="maxPrice"
                  name="maxPrice"
                  value={filters.priceRange?.[1] || 100000}
                  onChange={handlePriceChange}
                  min="0"
                  step="1000"
                />
              </div>
            </div>
            <div className="price-range-display">
              ${(filters.priceRange?.[0] || 0).toLocaleString('es-CL')} - 
              ${(filters.priceRange?.[1] || 100000).toLocaleString('es-CL')}
            </div>
          </div>
        )}
      </div>

      {/* Ordenar */}
      <div className="filter-section">
        <button 
          className="filter-section-header"
          onClick={() => toggleSection('sort')}
        >
          <span>Ordenar por</span>
          <span className="toggle-icon">{isOpen.sort ? '−' : '+'}</span>
        </button>
        
        {isOpen.sort && (
          <div className="filter-section-content">
            {sortOptions.map(option => (
              <label key={option.value} className="filter-option">
                <input
                  type="radio"
                  name="sortBy"
                  value={option.value}
                  checked={filters.sortBy === option.value}
                  onChange={() => handleSortChange(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Filtros activos */}
      {(filters.category || filters.search || 
        filters.priceRange?.[0] > 0 || 
        filters.priceRange?.[1] < 100000) && (
        <div className="active-filters">
          <h4>Filtros Activos:</h4>
          <div className="active-filters-list">
            {filters.category && (
              <span className="active-filter-tag">
                {categories.find(c => c.value === filters.category)?.label}
                <button onClick={() => handleCategoryChange('')}>×</button>
              </span>
            )}
            {filters.search && (
              <span className="active-filter-tag">
                "{filters.search}"
                <button onClick={() => onFilterChange({ search: '' })}>×</button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductFilter
