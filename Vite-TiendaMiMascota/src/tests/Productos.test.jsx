/**
 * PRUEBAS PARA LA PÁGINA PRODUCTOS
 * - Renderizado correcto ✅
 * - Pruebas de estado ✅
 * - Pruebas de eventos ✅
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Productos from '../pages/Productos';

// Mock del hook useProductos
const mockSetCategoria = vi.fn();
const mockSetBusqueda = vi.fn();

vi.mock('../hooks/useProductos', () => ({
  useProductos: vi.fn(() => ({
    productos: [
      { id: 1, nombre: 'Comida Premium', precio: 15000, categoria: 'Comida', imagen: 'test.jpg', stock: 10 },
      { id: 2, nombre: 'Juguete Pelota', precio: 5000, categoria: 'Juguetes', imagen: 'test.jpg', stock: 20 }
    ],
    productosFiltrados: [
      { id: 1, nombre: 'Comida Premium', precio: 15000, categoria: 'Comida', imagen: 'test.jpg', stock: 10 },
      { id: 2, nombre: 'Juguete Pelota', precio: 5000, categoria: 'Juguetes', imagen: 'test.jpg', stock: 20 }
    ],
    cargando: false,
    categoriaSeleccionada: 'Todas',
    setCategoriaSeleccionada: mockSetCategoria,
    terminoBusqueda: '',
    setTerminoBusqueda: mockSetBusqueda
  }))
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Productos Page', () => {
  // PRUEBAS DE RENDERIZADO
  it('debe renderizar correctamente la página de productos', () => {
    renderWithRouter(<Productos />);
    
    expect(screen.getByText(/Productos/i)).toBeInTheDocument();
  });

  it('debe mostrar todos los productos', async () => {
    renderWithRouter(<Productos />);
    
    await waitFor(() => {
      expect(screen.getByText('Comida Premium')).toBeInTheDocument();
      expect(screen.getByText('Juguete Pelota')).toBeInTheDocument();
    });
  });

  it('debe mostrar el filtro de búsqueda', () => {
    renderWithRouter(<Productos />);
    
    const inputBusqueda = screen.getByPlaceholderText(/Buscar/i);
    expect(inputBusqueda).toBeInTheDocument();
  });

  it('debe mostrar el filtro de categorías', () => {
    renderWithRouter(<Productos />);
    
    const selectCategoria = screen.getByRole('combobox');
    expect(selectCategoria).toBeInTheDocument();
  });

  // PRUEBAS DE EVENTOS
  it('debe permitir buscar productos', () => {
    renderWithRouter(<Productos />);
    
    const inputBusqueda = screen.getByPlaceholderText(/Buscar/i);
    fireEvent.change(inputBusqueda, { target: { value: 'Comida' } });
    
    expect(mockSetBusqueda).toHaveBeenCalled();
  });

  it('debe permitir filtrar por categoría', () => {
    renderWithRouter(<Productos />);
    
    const selectCategoria = screen.getByRole('combobox');
    fireEvent.change(selectCategoria, { target: { value: 'Comida' } });
    
    expect(mockSetCategoria).toHaveBeenCalled();
  });

  // PRUEBA DE ESTADO DE CARGA
  it('debe mostrar indicador de carga cuando está cargando', () => {
    vi.mock('../hooks/useProductos', () => ({
      useProductos: vi.fn(() => ({
        productos: [],
        productosFiltrados: [],
        cargando: true,
        categoriaSeleccionada: 'Todas',
        setCategoriaSeleccionada: vi.fn(),
        terminoBusqueda: '',
        setTerminoBusqueda: vi.fn()
      }))
    }));
    
    renderWithRouter(<Productos />);
    
    const spinner = screen.queryByRole('status') || screen.queryByText(/Cargando/i);
    expect(spinner).toBeTruthy();
  });

  // PRUEBA CONDICIONAL
  it('debe mostrar mensaje cuando no hay productos', () => {
    vi.mock('../hooks/useProductos', () => ({
      useProductos: vi.fn(() => ({
        productos: [],
        productosFiltrados: [],
        cargando: false,
        categoriaSeleccionada: 'Todas',
        setCategoriaSeleccionada: vi.fn(),
        terminoBusqueda: '',
        setTerminoBusqueda: vi.fn()
      }))
    }));
    
    renderWithRouter(<Productos />);
    
    const mensajeSinProductos = screen.queryByText(/No hay productos/i) || screen.queryByText(/No se encontraron/i);
    expect(mensajeSinProductos).toBeTruthy();
  });
});
