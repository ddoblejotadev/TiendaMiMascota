import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import AdminPedidos from '../pages/admin/AdminPedidos';
import { renderWithProviders } from './test-utils';

describe('AdminPedidos', () => {
  it('renderiza lista de pedidos', () => {
    renderWithProviders(<AdminPedidos />);
    expect(screen.getByText(/Pedido #1001/i)).toBeInTheDocument();
  });
});
