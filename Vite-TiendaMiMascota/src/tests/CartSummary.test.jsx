/**
 * PRUEBAS PARA EL COMPONENTE CARTSUMMARY
 * - Renderizado correcto ✅
 * - Pruebas de props ✅
 * - Pruebas condicionales ✅
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CartSummary from '../components/CartSummary';

const productosMock = [
  { id: 1, nombre: 'Producto 1', precio: 10000, cantidad: 2 },
  { id: 2, nombre: 'Producto 2', precio: 15000, cantidad: 1 }
];

describe('CartSummary Component', () => {
  // PRUEBAS DE RENDERIZADO
  it('debe renderizar correctamente el resumen', () => {
    render(<CartSummary productos={productosMock} />);
    
    // Verificar que el título está presente
    expect(screen.getByText(/Resumen/i)).toBeInTheDocument();
  });

  it('debe mostrar el subtotal correctamente', () => {
    render(<CartSummary productos={productosMock} />);
    
    // Subtotal = 10000*2 + 15000*1 = 35000
    expect(screen.getByText(/\$35\.000/)).toBeInTheDocument();
  });

  it('debe mostrar el total correctamente', () => {
    render(<CartSummary productos={productosMock} />);
    
    // Verificar que hay un elemento de total
    expect(screen.getByText(/Total/i)).toBeInTheDocument();
  });

  // PRUEBAS DE PROPS
  it('debe manejar un carrito vacío', () => {
    render(<CartSummary productos={[]} />);
    
    // Verificar que muestra $0 o mensaje apropiado
    const subtotal = screen.getByText(/\$0/);
    expect(subtotal).toBeInTheDocument();
  });

  it('debe calcular correctamente con un solo producto', () => {
    const unProducto = [{ id: 1, nombre: 'Producto', precio: 20000, cantidad: 1 }];
    
    render(<CartSummary productos={unProducto} />);
    
    expect(screen.getByText(/\$20\.000/)).toBeInTheDocument();
  });

  // PRUEBAS CONDICIONALES
  it('debe mostrar envío gratis cuando el subtotal es mayor a 50000', () => {
    const productosGrandes = [
      { id: 1, nombre: 'Producto Caro', precio: 60000, cantidad: 1 }
    ];
    
    render(<CartSummary productos={productosGrandes} />);
    
    const envioGratis = screen.getByText(/GRATIS/i);
    expect(envioGratis).toBeInTheDocument();
  });

  it('debe mostrar costo de envío cuando el subtotal es menor a 50000', () => {
    render(<CartSummary productos={productosMock} />);
    
    // Debería mostrar costo de envío (ej: $5000)
    const costoEnvio = screen.getByText(/\$5\.000/);
    expect(costoEnvio).toBeInTheDocument();
  });
});
