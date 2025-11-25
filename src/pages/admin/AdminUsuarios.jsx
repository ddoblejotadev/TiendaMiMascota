import React, { useEffect, useState } from 'react';
import adminUserService from '../../services/adminUserService';
import { notify } from '../../components/ui/notificationHelper';
import { confirmDialog } from '../../components/ui/confirmDialogHelper';

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      try {
        const lista = await adminUserService.listar();
        // Normalizar identificador: algunos backends usan usuario_id, _id, userId, etc.
        const normalizados = lista.map(u => ({
          ...u,
          id: u.id ?? u.usuario_id ?? u._id ?? u.usuarioId ?? u.userId
        }));
        setUsuarios(normalizados);
      } catch (err) {
        console.error('Error cargando usuarios:', err);
        notify('Error al cargar usuarios', 'error');
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  const cambiarRole = async (id, role) => {
    try {
      await adminUserService.actualizarRole(id, role);
      setUsuarios(prev => prev.map(u => u.id === id ? { ...u, role } : u));
      notify('Role actualizado', 'success');
    } catch (err) {
      console.error('Error actualizando role:', err);
      notify('Error al actualizar role', 'error');
    }
  };

  const eliminar = async (id) => {
    const confirmar = await confirmDialog({ title: 'Eliminar usuario', message: '¿Estás seguro de eliminar este usuario?' });
    if (!confirmar) return;
    try {
      await adminUserService.eliminar(id);
      setUsuarios(prev => prev.filter(u => u.id !== id));
      notify('Usuario eliminado', 'success');
    } catch (err) {
      console.error('Error eliminando usuario:', err);
      notify('Error al eliminar usuario', 'error');
    }
  };

  return (
    <div className="container">
      <h1 className="mb-4">Usuarios</h1>
      {cargando && <div className="alert alert-secondary">Cargando usuarios...</div>}
      <table className="table table-striped">
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Role</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre || u.name || u.username}</td>
              <td>{u.email}</td>
              <td>{u.role || u.rol || (u.roles && u.roles[0])}</td>
              <td>
                <select value={u.role || u.rol || (u.roles && u.roles[0]) || 'user'} onChange={(e) => cambiarRole(u.id, e.target.value)} className="form-select d-inline-block w-auto me-2">
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
