import React, { useEffect, useState } from 'react';
import adminUserService from '../../services/adminUserService';

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    setUsuarios(adminUserService.listar());
  }, []);

  const cambiarRole = (id, role) => {
    adminUserService.actualizarRole(id, role);
    setUsuarios(adminUserService.listar());
  };

  const eliminar = (id) => {
    adminUserService.eliminar(id);
    setUsuarios(adminUserService.listar());
  };

  return (
    <div className="container">
      <h1 className="mb-4">Usuarios</h1>
      <table className="table table-striped">
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Role</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <select value={u.role} onChange={(e) => cambiarRole(u.id, e.target.value)} className="form-select d-inline-block w-auto me-2">
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
                <button className="btn btn-sm btn-danger" onClick={() => eliminar(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
