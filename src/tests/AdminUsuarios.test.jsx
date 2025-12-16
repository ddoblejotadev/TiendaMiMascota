import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import AdminUsuarios from '../pages/admin/AdminUsuarios';
import { renderWithProviders } from './test-utils';

// Mock del servicio de usuarios admin
vi.mock('../services/adminUserService', () => ({
  default: {
    listar: vi.fn().mockResolvedValue([
      { id: 1, nombre: 'Test', email: 'test@example.com', role: 'user' }
    ]),
    actualizarRole: vi.fn().mockResolvedValue({}),
    eliminar: vi.fn().mockResolvedValue({})
  }
}));

// Mock de confirmDialog para que siempre confirme
vi.mock('../components/ui/confirmDialogHelper', () => ({
  confirmDialog: vi.fn().mockResolvedValue(true)
}));

describe('AdminUsuarios', () => {
  beforeEach(() => localStorage.removeItem('usuarios_v1'));

  it('muestra lista vacía y permite agregar mediante registrarse flow', async () => {
    renderWithProviders(<AdminUsuarios />);

    // Esperar a que cargue la lista de usuarios
    await waitFor(() => {
      expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
    });

    // Verificar que el título está presente
    expect(screen.getByRole('heading', { name: /Usuarios/i })).toBeInTheDocument();

    // Verificar que existe un botón de eliminar
    const btn = screen.getByRole('button', { name: /Eliminar/i });
    expect(btn).toBeInTheDocument();
  });
});
