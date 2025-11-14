import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

vi.mock('../hooks/useAutenticacion', () => {
  return { default: vi.fn() };
});

import useAutenticacion from '../hooks/useAutenticacion';
import AdminRoute from '../components/AdminRoute';

describe('AdminRoute', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('redirige a iniciar-sesion si no está autenticado', () => {
    useAutenticacion.mockReturnValue({ usuario: null, cargando: false });

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route path="/iniciar-sesion" element={<div>Login Page</div>} />
          <Route path="/admin" element={<AdminRoute><div>Admin</div></AdminRoute>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });

  test('redirige a / si usuario no es admin', () => {
    useAutenticacion.mockReturnValue({ usuario: { email: 'user@test.com', role: 'user' }, cargando: false });

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/admin" element={<AdminRoute><div>Admin</div></AdminRoute>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  test('renderiza children si usuario es admin', () => {
    useAutenticacion.mockReturnValue({ usuario: { email: 'admin@test.com', role: 'admin' }, cargando: false });

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route path="/admin" element={<AdminRoute><div>Admin Area</div></AdminRoute>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Admin Area/i)).toBeInTheDocument();
  });
});
