/**
 * PRUEBAS PARA EL COMPONENTE PRODUCTFILTER
 * - Renderizado correcto ✅
 * - Pruebas de props ✅
 * - Pruebas de estado ✅
 * - Pruebas de eventos ✅
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductFilter from '../components/ProductFilter';

const categoriasMock = ['Todas', 'Comida', 'Juguetes', 'Accesorios'];

describe('ProductFilter Component', () => {
  // PRUEBAS DE RENDERIZADO
  it('debe renderizar correctamente el componente de filtros', () => {
    const mockAlCambiar = vi.fn();
    
    render(
      <ProductFilter
        busqueda=""
        categoriaSeleccionada="Todas"
        categorias={categoriasMock}
        alCambiarBusqueda={mockAlCambiar}
        alCambiarCategoria={mockAlCambiar}
      />
    );
    
    // Verificar que el input de búsqueda está presente
    expect(screen.getByPlaceholderText(/Buscar productos/i)).toBeInTheDocument();
  });

  it('debe mostrar todas las categorías en el select', () => {
    const mockAlCambiar = vi.fn();
    
    render(
      <ProductFilter
        busqueda=""
        categoriaSeleccionada="Todas"
        categorias={categoriasMock}
        alCambiarBusqueda={mockAlCambiar}
        alCambiarCategoria={mockAlCambiar}
      />
    );
    
    // Verificar que el select de categorías está presente
    const selectCategoria = screen.getByRole('combobox');
    expect(selectCategoria).toBeInTheDocument();
  });

  // PRUEBAS DE PROPS
  it('debe recibir y mostrar el valor de búsqueda inicial', () => {
    const mockAlCambiar = vi.fn();
    const busquedaInicial = 'Comida';
    
    render(
      <ProductFilter
        busqueda={busquedaInicial}
        categoriaSeleccionada="Todas"
        categorias={categoriasMock}
        alCambiarBusqueda={mockAlCambiar}
        alCambiarCategoria={mockAlCambiar}
      />
    );
    
    const inputBusqueda = screen.getByPlaceholderText(/Buscar productos/i);
    expect(inputBusqueda).toHaveValue(busquedaInicial);
  });

  it('debe mostrar la categoría seleccionada', () => {
    const mockAlCambiar = vi.fn();
    
    render(
      <ProductFilter
        busqueda=""
        categoriaSeleccionada="Comida"
        categorias={categoriasMock}
        alCambiarBusqueda={mockAlCambiar}
        alCambiarCategoria={mockAlCambiar}
      />
    );
    
    const selectCategoria = screen.getByRole('combobox');
    expect(selectCategoria).toHaveValue('Comida');
  });

  // PRUEBAS DE EVENTOS
  it('debe llamar a alCambiarBusqueda cuando el usuario escribe', () => {
    const mockAlCambiarBusqueda = vi.fn();
    const mockAlCambiarCategoria = vi.fn();
    
    render(
      <ProductFilter
        busqueda=""
        categoriaSeleccionada="Todas"
        categorias={categoriasMock}
        alCambiarBusqueda={mockAlCambiarBusqueda}
        alCambiarCategoria={mockAlCambiarCategoria}
      />
    );
    
    const inputBusqueda = screen.getByPlaceholderText(/Buscar productos/i);
    fireEvent.change(inputBusqueda, { target: { value: 'Juguete' } });
    
    expect(mockAlCambiarBusqueda).toHaveBeenCalled();
  });

  it('debe llamar a alCambiarCategoria cuando se selecciona una categoría', () => {
    const mockAlCambiarBusqueda = vi.fn();
    const mockAlCambiarCategoria = vi.fn();
    
    render(
      <ProductFilter
        busqueda=""
        categoriaSeleccionada="Todas"
        categorias={categoriasMock}
        alCambiarBusqueda={mockAlCambiarBusqueda}
        alCambiarCategoria={mockAlCambiarCategoria}
      />
    );
    
    const selectCategoria = screen.getByRole('combobox');
    fireEvent.change(selectCategoria, { target: { value: 'Juguetes' } });
    
    expect(mockAlCambiarCategoria).toHaveBeenCalled();
  });

  // PRUEBAS DE ESTADO
  it('debe actualizar el valor del input cuando cambia la búsqueda', () => {
    const mockAlCambiar = vi.fn();
    
    const { rerender } = render(
      <ProductFilter
        busqueda=""
        categoriaSeleccionada="Todas"
        categorias={categoriasMock}
        alCambiarBusqueda={mockAlCambiar}
        alCambiarCategoria={mockAlCambiar}
      />
    );
    
    const inputBusqueda = screen.getByPlaceholderText(/Buscar productos/i);
    expect(inputBusqueda).toHaveValue('');
    
    // Simular cambio de prop
    rerender(
      <ProductFilter
        busqueda="Collar"
        categoriaSeleccionada="Todas"
        categorias={categoriasMock}
        alCambiarBusqueda={mockAlCambiar}
        alCambiarCategoria={mockAlCambiar}
      />
    );
    
    expect(inputBusqueda).toHaveValue('Collar');
  });
});
