import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import AdminProductos from '../pages/admin/AdminProductos';
import { renderWithProviders } from './test-utils';

describe('AdminProductos', () => {
  beforeEach(() => localStorage.removeItem('admin_productos_v1'));

  it('permite crear y eliminar un producto', () => {
    renderWithProviders(<AdminProductos />);

    const nombre = screen.getByPlaceholderText(/Nombre/i);
    const precio = screen.getByPlaceholderText(/Precio/i);
    const agregar = screen.getByText(/Agregar/i);

    fireEvent.change(nombre, { target: { value: 'TestProd' } });
    fireEvent.change(precio, { target: { value: '100' } });
    fireEvent.click(agregar);

    expect(screen.getByText(/TestProd/i)).toBeInTheDocument();

    const eliminar = screen.getByText(/Eliminar/i);
    fireEvent.click(eliminar);

    expect(screen.queryByText(/TestProd/i)).toBeNull();
  });
});
