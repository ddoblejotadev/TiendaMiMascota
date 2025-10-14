/**
 * COMPONENTE: FILTROS DE PRODUCTOS
 * Permite filtrar productos por categoría y ordenar
 */

import '../styles/components/ProductFilter.css';

function ProductFilter({ 
  categoriaSeleccionada, 
  alCambiarCategoria,
  ordenSeleccionado,
  alCambiarOrden,
  categorias 
}) {

  return (
    <div className="filtros-productos">
      {/* Filtro por categoría */}
      <div className="grupo-filtro">
        <label htmlFor="categoria" className="filtro-etiqueta">
          📂 Categoría:
        </label>
        <select
          id="categoria"
          value={categoriaSeleccionada}
          onChange={(e) => alCambiarCategoria(e.target.value)}
          className="filtro-select"
        >
          <option value="">Todas las categorías</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      {/* Ordenar por */}
      <div className="grupo-filtro">
        <label htmlFor="orden" className="filtro-etiqueta">
          🔄 Ordenar por:
        </label>
        <select
          id="orden"
          value={ordenSeleccionado}
          onChange={(e) => alCambiarOrden(e.target.value)}
          className="filtro-select"
        >
          <option value="">Predeterminado</option>
          <option value="precio-menor">Precio: Menor a Mayor</option>
          <option value="precio-mayor">Precio: Mayor a Menor</option>
          <option value="nombre-az">Nombre: A - Z</option>
          <option value="nombre-za">Nombre: Z - A</option>
        </select>
      </div>

      {/* Botón limpiar filtros */}
      {(categoriaSeleccionada || ordenSeleccionado) && (
        <button 
          className="boton-limpiar-filtros"
          onClick={() => {
            alCambiarCategoria('');
            alCambiarOrden('');
          }}
        >
          ✕ Limpiar Filtros
        </button>
      )}
    </div>
  );
}

export default ProductFilter;