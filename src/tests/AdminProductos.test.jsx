import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import AdminProductos from '../pages/admin/AdminProductos';
import { renderWithProviders } from './test-utils';

// Mock del servicio de productos (el componente importa funciones de productService)
vi.mock('../services/productService', () => ({
  obtenerProductos: vi.fn().mockResolvedValue([]),
  agregarProducto: vi.fn().mockImplementation((p) => Promise.resolve({ id: Date.now(), ...p })),
  actualizarProducto: vi.fn().mockResolvedValue({}),
  eliminarProducto: vi.fn().mockResolvedValue({})
}));

// Mock de confirmDialog para que siempre confirme
vi.mock('../components/ui/confirmDialogHelper', () => ({
  confirmDialog: vi.fn().mockResolvedValue(true)
}));

describe('AdminProductos', () => {
  beforeEach(() => localStorage.removeItem('admin_productos_v1'));

  it('permite crear y eliminar un producto', async () => {
    renderWithProviders(<AdminProductos />);

    // Esperar a que termine de cargar
    await waitFor(() => {
      expect(screen.queryByText(/Cargando productos/i)).not.toBeInTheDocument();
    });

    // Usar selector más específico: placeholder exacto "Nombre" (no "Buscar por nombre...")
    const inputs = screen.getAllByPlaceholderText(/^Nombre$/i);
    const nombre = inputs[0];
    const precio = screen.getByPlaceholderText(/Precio/i);
    const agregar = screen.getByRole('button', { name: /Agregar/i });

    fireEvent.change(nombre, { target: { value: 'TestProd' } });
    fireEvent.change(precio, { target: { value: '100' } });
    fireEvent.click(agregar);

    await waitFor(() => {
      expect(screen.getByText(/TestProd/i)).toBeInTheDocument();
    });

    const eliminar = screen.getByRole('button', { name: /Eliminar/i });
    fireEvent.click(eliminar);

    await waitFor(() => {
      expect(screen.queryByText(/TestProd/i)).toBeNull();
    });
  });
});
