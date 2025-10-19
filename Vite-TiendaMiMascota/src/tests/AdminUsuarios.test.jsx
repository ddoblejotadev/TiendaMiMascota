import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import AdminUsuarios from '../pages/admin/AdminUsuarios';
import { renderWithProviders } from './test-utils';

describe('AdminUsuarios', () => {
  beforeEach(() => localStorage.removeItem('usuarios_v1'));

  it('muestra lista vacía y permite agregar mediante registrarse flow', () => {

    const usuarios = [{ id: 1, nombre: 'Test', email: 'test@example.com', password: '12345', role: 'user' }];
    localStorage.setItem('usuarios_v1', JSON.stringify(usuarios));

    renderWithProviders(<AdminUsuarios />);
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();

  const select = screen.getByDisplayValue('user');
  fireEvent.change(select, { target: { value: 'admin' } });

  expect(select.value).toBe('admin');

  const btn = screen.getByText(/Eliminar/i);
    fireEvent.click(btn);
    expect(screen.queryByText(/test@example.com/i)).toBeNull();
  });
});
