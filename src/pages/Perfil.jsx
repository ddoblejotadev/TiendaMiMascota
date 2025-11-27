import React, { useEffect, useState } from 'react';
import { obtenerUsuarioActual, actualizarPerfil } from '../util/constants';
import { notify } from '../components/ui/notificationHelper';

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', direccion: '', run: '' });
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const u = obtenerUsuarioActual();
    if (u) {
      setUsuario(u);
      setForm({
        nombre: u.nombre || '',
        email: u.email || '',
        telefono: u.telefono || '',
        direccion: u.direccion || '',
        run: u.run || ''
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);

    try {
      const payload = {
        nombre: form.nombre,
        telefono: form.telefono,
        direccion: form.direccion,
        run: form.run
      };

      await actualizarPerfil(payload);
      notify('Perfil actualizado', 'success');

      // No recargamos la página: `actualizarPerfil` emite un evento
      // `usuarioActualizado` que `useAutenticacion` escucha para sincronizar.
      // Actualizar el estado local inmediato para reflejar cambios en este formulario.
      setUsuario(prev => ({ ...prev, nombre: payload.nombre, telefono: payload.telefono, direccion: payload.direccion, run: payload.run }));
    } catch (err) {
      console.error('Error actualizando perfil:', err);
      notify(err.message || 'Error al actualizar perfil', 'error');
    } finally {
      setGuardando(false);
    }
  };

  if (!usuario) return (
    <div className="container py-4">
      <h1>Perfil</h1>
      <div className="alert alert-secondary">No hay usuario logueado.</div>
    </div>
  );

  return (
    <div className="container py-4">
      <h1>Mi Perfil</h1>

      <form onSubmit={handleSubmit} className="mt-4" style={{ maxWidth: 720 }}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" value={form.email} className="form-control" disabled />
          <div className="form-text">Para cambiar el email utiliza la opción de recuperar/cambiar email en soporte.</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input name="telefono" value={form.telefono} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input name="direccion" value={form.direccion} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">RUN / Identificador</label>
          <input name="run" value={form.run} onChange={handleChange} className="form-control" />
        </div>

        <button className="btn btn-primary" type="submit" disabled={guardando}>{guardando ? 'Guardando...' : 'Guardar cambios'}</button>
      </form>
    </div>
  );
}
