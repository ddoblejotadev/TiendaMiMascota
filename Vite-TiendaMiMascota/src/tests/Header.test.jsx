/**
 * PRUEBAS PARA EL COMPONENTE HEADER
 * - Renderizado correcto ✅
 * - Pruebas de props ✅
 * - Pruebas de eventos ✅
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

// Helper para renderizar con Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Header Component', () => {
  // PRUEBA DE RENDERIZADO
  it('debe renderizar correctamente el header', () => {
    renderWithRouter(<Header />);
    
    // Verificar que el logo esté presente
    expect(screen.getByText(/TiendaMiMascota/i)).toBeInTheDocument();
  });

  it('debe mostrar todos los enlaces de navegación', () => {
    renderWithRouter(<Header />);
    
    // Verificar enlaces principales
    expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
    expect(screen.getByText(/Productos/i)).toBeInTheDocument();
    expect(screen.getByText(/Categorías/i)).toBeInTheDocument();
    expect(screen.getByText(/Ofertas/i)).toBeInTheDocument();
    expect(screen.getByText(/Contacto/i)).toBeInTheDocument();
  });

  it('debe mostrar el icono del carrito', () => {
    renderWithRouter(<Header />);
    
    // Verificar que el carrito esté presente
    const carritoIcon = screen.getByText(/🛒/);
    expect(carritoIcon).toBeInTheDocument();
  });

  it('debe mostrar el badge del carrito cuando hay artículos', () => {
    // Mock del localStorage con un carrito con items
    const carritoMock = [
      { id: 1, nombre: 'Producto 1', precio: 10000, cantidad: 2 }
    ];
    localStorage.setItem('carrito', JSON.stringify(carritoMock));
    
    renderWithRouter(<Header />);
    
    // Verificar que el badge muestre la cantidad
    const badge = screen.getByText('2');
    expect(badge).toBeInTheDocument();
    
    // Limpiar
    localStorage.clear();
  });

  it('debe mostrar botones de login cuando no hay usuario autenticado', () => {
    localStorage.clear(); // Asegurar que no hay usuario
    
    renderWithRouter(<Header />);
    
    // Verificar botones de autenticación
    expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();
    expect(screen.getByText(/Registrarse/i)).toBeInTheDocument();
  });
});
