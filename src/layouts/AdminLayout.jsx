import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <aside className="bg-primary text-white p-3" style={{ width: 240 }}>
        <h4>Panel Admin</h4>
        <nav className="nav flex-column mt-3">
          <NavLink to="/admin" end className="nav-link text-white">Inicio</NavLink>
          <NavLink to="/admin/productos" className="nav-link text-white">Productos</NavLink>
          <NavLink to="/admin/pedidos" className="nav-link text-white">Pedidos</NavLink>
          <NavLink to="/admin/usuarios" className="nav-link text-white">Usuarios</NavLink>
        </nav>
      </aside>
      <main className="flex-grow-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;