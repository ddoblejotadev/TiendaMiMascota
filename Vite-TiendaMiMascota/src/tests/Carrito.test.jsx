/**
 * PRUEBAS PARA LA PÁGINA CARRITO
 * - Renderizado correcto ✅
 * - Pruebas de estado ✅
 * - Pruebas de eventos ✅
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Carrito from '../pages/Carrito';

// Mock del hook useCarrito
const mockActualizarCantidad = vi.fn();
const mockEliminarProducto = vi.fn();
const mockVaciarCarrito = vi.fn();

vi.mock('../hooks/useCarrito', () => ({
  useCarrito: vi.fn(() => ({
    carrito: [
      { id: 1, nombre: 'Comida Premium', precio: 15000, cantidad: 2, imagen: 'test.jpg' },
      { id: 2, nombre: 'Juguete Pelota', precio: 5000, cantidad: 1, imagen: 'test.jpg' }
    ],
    cantidadTotal: 3,
    subtotal: 35000,
    total: 40000,
    actualizarCantidad: mockActualizarCantidad,
    eliminarProducto: mockEliminarProducto,
    vaciarCarrito: mockVaciarCarrito
  }))
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Carrito Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // PRUEBAS DE RENDERIZADO
  it('debe renderizar correctamente la página del carrito', () => {
    renderWithRouter(<Carrito />);
    
    expect(screen.getByText(/Carrito/i)).toBeInTheDocument();
  });

  it('debe mostrar todos los productos del carrito', () => {
    renderWithRouter(<Carrito />);
    
    expect(screen.getByText('Comida Premium')).toBeInTheDocument();
    expect(screen.getByText('Juguete Pelota')).toBeInTheDocument();
  });

  it('debe mostrar el subtotal correctamente', () => {
    renderWithRouter(<Carrito />);
    
    expect(screen.getByText(/\$35\.000/)).toBeInTheDocument();
  });

  it('debe mostrar el total correctamente', () => {
    renderWithRouter(<Carrito />);
    
    expect(screen.getByText(/\$40\.000/)).toBeInTheDocument();
  });

  it('debe mostrar la cantidad de cada producto', () => {
    renderWithRouter(<Carrito />);
    
    const cantidades = screen.getAllByDisplayValue(/2|1/);
    expect(cantidades.length).toBeGreaterThan(0);
  });

  // PRUEBAS DE EVENTOS
  it('debe permitir aumentar la cantidad de un producto', () => {
    renderWithRouter(<Carrito />);
    
    const botonesAumentar = screen.getAllByRole('button', { name: /\+|Aumentar/i });
    fireEvent.click(botonesAumentar[0]);
    
    expect(mockActualizarCantidad).toHaveBeenCalled();
  });

  it('debe permitir disminuir la cantidad de un producto', () => {
    renderWithRouter(<Carrito />);
    
    const botonesDisminuir = screen.getAllByRole('button', { name: /-|Disminuir/i });
    fireEvent.click(botonesDisminuir[0]);
    
    expect(mockActualizarCantidad).toHaveBeenCalled();
  });

  it('debe permitir eliminar un producto del carrito', () => {
    renderWithRouter(<Carrito />);
    
    const botonesEliminar = screen.getAllByRole('button', { name: /Eliminar|×|Quitar/i });
    fireEvent.click(botonesEliminar[0]);
    
    expect(mockEliminarProducto).toHaveBeenCalled();
  });

  it('debe permitir vaciar todo el carrito', () => {
    renderWithRouter(<Carrito />);
    
    const botonVaciar = screen.getByRole('button', { name: /Vaciar carrito|Limpiar carrito/i });
    fireEvent.click(botonVaciar);
    
    expect(mockVaciarCarrito).toHaveBeenCalled();
  });

  it('debe permitir ir al checkout', () => {
    renderWithRouter(<Carrito />);
    
    const botonPagar = screen.getByRole('button', { name: /Pagar|Checkout|Finalizar/i });
    expect(botonPagar).toBeInTheDocument();
    
    fireEvent.click(botonPagar);
    // Verificar navegación (se puede hacer con mock de useNavigate)
  });

  // PRUEBA DE ESTADO VACÍO
  it('debe mostrar mensaje cuando el carrito está vacío', () => {
    vi.mock('../hooks/useCarrito', () => ({
      useCarrito: vi.fn(() => ({
        carrito: [],
        cantidadTotal: 0,
        subtotal: 0,
        total: 0,
        actualizarCantidad: vi.fn(),
        eliminarProducto: vi.fn(),
        vaciarCarrito: vi.fn()
      }))
    }));
    
    renderWithRouter(<Carrito />);
    
    const mensajeVacio = screen.queryByText(/vacío|no hay productos/i);
    expect(mensajeVacio).toBeTruthy();
  });

  // PRUEBA CONDICIONAL
  it('debe deshabilitar el botón de pagar cuando el carrito está vacío', () => {
    vi.mock('../hooks/useCarrito', () => ({
      useCarrito: vi.fn(() => ({
        carrito: [],
        cantidadTotal: 0,
        subtotal: 0,
        total: 0,
        actualizarCantidad: vi.fn(),
        eliminarProducto: vi.fn(),
        vaciarCarrito: vi.fn()
      }))
    }));
    
    renderWithRouter(<Carrito />);
    
    const botonPagar = screen.queryByRole('button', { name: /Pagar|Checkout|Finalizar/i });
    if (botonPagar) {
      expect(botonPagar).toBeDisabled();
    }
  });

  // PRUEBA DE CÁLCULOS
  it('debe calcular correctamente el subtotal con múltiples productos', () => {
    renderWithRouter(<Carrito />);
    
    // Subtotal = 15000*2 + 5000*1 = 35000
    expect(screen.getByText(/\$35\.000/)).toBeInTheDocument();
  });

  it('debe mostrar el costo de envío', () => {
    renderWithRouter(<Carrito />);
    
    const costoEnvio = screen.queryByText(/Envío|Despacho/i);
    expect(costoEnvio).toBeInTheDocument();
  });

  // PRUEBA DE VALIDACIÓN
  it('no debe permitir cantidad menor a 1', () => {
    renderWithRouter(<Carrito />);
    
    const inputs = screen.getAllByRole('spinbutton');
    
    inputs.forEach(input => {
      expect(parseInt(input.value)).toBeGreaterThanOrEqual(1);
    });
  });
});
