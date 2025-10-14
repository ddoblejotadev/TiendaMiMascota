/**
 * PRUEBAS PARA LA PÁGINA INICIO
 * - Renderizado correcto ✅
 * - Pruebas de estado ✅
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Inicio from '../pages/Inicio';

// Mock del hook useProductos
vi.mock('../hooks/useProductos', () => ({
  useProductos: vi.fn(() => ({
    productos: [
      { id: 1, nombre: 'Producto 1', precio: 10000, categoria: 'Comida', imagen: 'test.jpg' },
      { id: 2, nombre: 'Producto 2', precio: 15000, categoria: 'Juguetes', imagen: 'test.jpg' }
    ],
    cargando: false
  }))
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Inicio Page', () => {
  // PRUEBAS DE RENDERIZADO
  it('debe renderizar correctamente la página de inicio', () => {
    renderWithRouter(<Inicio />);
    
    // Verificar que el título principal está presente
    expect(screen.getByText(/Bienvenido/i) || screen.getByText(/Inicio/i) || screen.getByText(/TiendaMiMascota/i)).toBeInTheDocument();
  });

  it('debe mostrar productos destacados', async () => {
    renderWithRouter(<Inicio />);
    
    await waitFor(() => {
      expect(screen.getByText('Producto 1')).toBeInTheDocument();
      expect(screen.getByText('Producto 2')).toBeInTheDocument();
    });
  });

  it('debe mostrar las categorías principales', () => {
    renderWithRouter(<Inicio />);
    
    // Verificar que hay sección de categorías o enlaces a categorías
    const categorias = screen.queryByText(/Categorías/i) || screen.queryByText(/Comida/i);
    expect(categorias).toBeTruthy();
  });

  // PRUEBA DE ESTADO DE CARGA
  it('debe mostrar estado de carga cuando está cargando', () => {
    // Mock con cargando = true
    vi.mock('../hooks/useProductos', () => ({
      useProductos: vi.fn(() => ({
        productos: [],
        cargando: true
      }))
    }));
    
    renderWithRouter(<Inicio />);
    
    // Verificar que muestra algún indicador de carga
    const cargando = screen.queryByText(/Cargando/i) || screen.queryByRole('status');
    expect(cargando).toBeTruthy();
  });
});
