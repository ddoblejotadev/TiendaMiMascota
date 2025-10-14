/**
 * PRUEBAS PARA EL COMPONENTE PRODUCTCARD
 * - Renderizado correcto ✅
 * - Pruebas de props ✅
 * - Pruebas de eventos ✅
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

// Helper para renderizar con Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

// Mock de producto para las pruebas
const productoMock = {
  id: 1,
  nombre: 'Comida Premium para Perros',
  descripcion: 'Alimento balanceado de alta calidad',
  precio: 15000,
  imagen: 'test-image.jpg',
  categoria: 'Comida',
  stock: 10,
  rating: 4.5
};

describe('ProductCard Component', () => {
  // PRUEBAS DE RENDERIZADO
  it('debe renderizar correctamente con los datos del producto', () => {
    renderWithRouter(<ProductCard producto={productoMock} />);
    
    // Verificar que el nombre del producto se muestra
    expect(screen.getByText(productoMock.nombre)).toBeInTheDocument();
    
    // Verificar que la descripción se muestra
    expect(screen.getByText(productoMock.descripcion)).toBeInTheDocument();
    
    // Verificar que el precio se muestra (formateado)
    expect(screen.getByText(/\$15\.000/)).toBeInTheDocument();
  });

  it('debe mostrar la imagen del producto', () => {
    renderWithRouter(<ProductCard producto={productoMock} />);
    
    const imagen = screen.getByAltText(productoMock.nombre);
    expect(imagen).toBeInTheDocument();
    expect(imagen).toHaveAttribute('src', productoMock.imagen);
  });

  it('debe mostrar la categoría del producto', () => {
    renderWithRouter(<ProductCard producto={productoMock} />);
    
    expect(screen.getByText(productoMock.categoria)).toBeInTheDocument();
  });

  // PRUEBAS DE PROPS
  it('debe recibir y mostrar las props correctamente', () => {
    const productoDiferente = {
      ...productoMock,
      nombre: 'Juguete para Gatos',
      precio: 5000,
      categoria: 'Juguetes'
    };
    
    renderWithRouter(<ProductCard producto={productoDiferente} />);
    
    expect(screen.getByText('Juguete para Gatos')).toBeInTheDocument();
    expect(screen.getByText(/\$5\.000/)).toBeInTheDocument();
    expect(screen.getByText('Juguetes')).toBeInTheDocument();
  });

  // PRUEBAS DE EVENTOS
  it('debe tener un botón de ver detalles', () => {
    renderWithRouter(<ProductCard producto={productoMock} />);
    
    const botonDetalle = screen.getByText(/Ver Detalle/i);
    expect(botonDetalle).toBeInTheDocument();
  });

  it('debe tener un enlace al detalle del producto', () => {
    renderWithRouter(<ProductCard producto={productoMock} />);
    
    const enlace = screen.getByRole('link', { name: /Ver Detalle/i });
    expect(enlace).toHaveAttribute('href', `/productos/${productoMock.id}`);
  });

  // PRUEBA CONDICIONAL: Stock agotado
  it('debe mostrar mensaje de stock agotado cuando stock es 0', () => {
    const productoSinStock = { ...productoMock, stock: 0 };
    
    renderWithRouter(<ProductCard producto={productoSinStock} />);
    
    const mensajeStock = screen.getByText(/Sin stock/i);
    expect(mensajeStock).toBeInTheDocument();
  });

  it('debe mostrar stock disponible cuando hay productos', () => {
    renderWithRouter(<ProductCard producto={productoMock} />);
    
    const stockDisponible = screen.getByText(/Stock: 10/i);
    expect(stockDisponible).toBeInTheDocument();
  });
});
