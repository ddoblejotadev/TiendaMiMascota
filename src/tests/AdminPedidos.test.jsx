import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import AdminPedidos from '../pages/admin/AdminPedidos';
import { renderWithProviders } from './test-utils';

// Mock del servicio de pedidos
vi.mock('../services/adminOrderService', () => ({
  default: {
    obtenerTodasOrdenes: vi.fn().mockResolvedValue([]),
    obtenerOrdenesPaginadas: vi.fn().mockResolvedValue([]),
    actualizar: vi.fn().mockResolvedValue({}),
    eliminar: vi.fn().mockResolvedValue({})
  }
}));

// Mock del servicio de usuarios
vi.mock('../services/adminUserService', () => ({
  default: {
    obtenerPorId: vi.fn().mockResolvedValue(null)
  }
}));

describe('AdminPedidos', () => {
  it('renderiza lista de pedidos', async () => {
    renderWithProviders(<AdminPedidos />);
    // Esperamos a que el componente termine de cargar y verificar que el heading principal esté presente
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /Pedidos/i })).toBeInTheDocument();
    });
  });
});
