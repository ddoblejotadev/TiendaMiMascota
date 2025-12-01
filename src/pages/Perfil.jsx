import React, { useEffect, useState } from 'react';
import { obtenerUsuarioActual, actualizarPerfil, agregarDireccionLocal, eliminarDireccionLocal, agregarDireccionUsuario, eliminarDireccionUsuario, actualizarDireccionUsuario, obtenerDireccionesUsuario } from '../util/constants';
import { validarTelefono, validarRUT } from '../util/validators';
import { notify } from '../components/ui/notificationHelper';

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', direccion: '', run: '', ciudad: '', region: '' });
  const [direcciones, setDirecciones] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editDir, setEditDir] = useState({ etiqueta: '', direccion: '', ciudad: '', region: '', codigoPostal: '' });
  const [editErrors, setEditErrors] = useState({});
  const [nuevaDir, setNuevaDir] = useState({ etiqueta: '', direccion: '', ciudad: '', region: '', codigoPostal: '' });
  const [errores, setErrores] = useState({});
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
        run: u.run || '',
        ciudad: u.ciudad || '',
        region: u.region || ''
      });
      setDirecciones(Array.isArray(u.direcciones) ? u.direcciones : (u.direccion ? [{ id: 'main', etiqueta: 'Principal', direccion: u.direccion, ciudad: u.ciudad || '', region: u.region || '' }] : []));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNuevaDirChange = (e) => {
    const { name, value } = e.target;
    setNuevaDir(prev => ({ ...prev, [name]: value }));
  };

  const validarDireccion = (d) => {
    const err = {};
    if (!d.direccion || d.direccion.trim().length < 5) err.direccion = 'Ingresa una dirección válida';
    if (!d.ciudad || d.ciudad.trim().length === 0) err.ciudad = 'Ingresa la ciudad';
    if (!d.region || d.region.trim().length === 0) err.region = 'Selecciona la región';
    return err;
  };

  const agregarDireccion = async (e) => {
    e.preventDefault();
    const err = validarDireccion(nuevaDir);
    setErrores(err);
    if (Object.keys(err).length > 0) return;

    try {
      const updated = await agregarDireccionUsuario({ etiqueta: nuevaDir.etiqueta || 'Sin etiqueta', direccion: nuevaDir.direccion, ciudad: nuevaDir.ciudad, region: nuevaDir.region, codigoPostal: nuevaDir.codigoPostal });
      setDirecciones(updated);
      setNuevaDir({ etiqueta: '', direccion: '', ciudad: '', region: '', codigoPostal: '' });
      notify('Dirección agregada', 'success');
    } catch (err) {
      console.error('Error agregando dirección:', err);
      // fallback local
      try {
        const updated = agregarDireccionLocal({ etiqueta: nuevaDir.etiqueta || 'Sin etiqueta', direccion: nuevaDir.direccion, ciudad: nuevaDir.ciudad, region: nuevaDir.region, codigoPostal: nuevaDir.codigoPostal });
        setDirecciones(updated);
        setNuevaDir({ etiqueta: '', direccion: '', ciudad: '', region: '', codigoPostal: '' });
        notify('Dirección agregada (guardada localmente)', 'warning');
      } catch (inner) {
        notify('No se pudo agregar la dirección', 'error');
      }
    }
  };

  const borrarDireccion = async (id) => {
    try {
      const updated = await eliminarDireccionUsuario(id);
      setDirecciones(updated);
      notify('Dirección eliminada', 'success');
    } catch (err) {
      console.error('Error borrando dirección (backend):', err);
      try {
        const updated = eliminarDireccionLocal(id);
        setDirecciones(updated);
        notify('Dirección eliminada (localmente)', 'warning');
      } catch (inner) {
        notify('No se pudo eliminar la dirección', 'error');
      }
    }
  };

  const startEdit = (dir) => {
    setEditingId(dir.id);
    setEditDir({ etiqueta: dir.etiqueta || '', direccion: dir.direccion || '', ciudad: dir.ciudad || '', region: dir.region || '', codigoPostal: dir.codigoPostal || '' });
    setEditErrors({});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDir({ etiqueta: '', direccion: '', ciudad: '', region: '', codigoPostal: '' });
    setEditErrors({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditDir(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    const err = validarDireccion(editDir);
    setEditErrors(err);
    if (Object.keys(err).length > 0) return;

    try {
      const updated = await actualizarDireccionUsuario(editingId, editDir);
      setDirecciones(updated);
      notify('Dirección actualizada', 'success');
      cancelEdit();
    } catch (err) {
      console.error('Error actualizando dirección:', err);
      notify('No se pudo actualizar la dirección', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    // Validaciones estrictas: teléfono y RUN
    const erroresPerfil = {};
    if (form.telefono && !validarTelefono(form.telefono)) erroresPerfil.telefono = 'Teléfono inválido';
    if (form.run && !validarRUT(form.run)) erroresPerfil.run = 'RUN inválido';
    if (Object.keys(erroresPerfil).length > 0) {
      setErrores(erroresPerfil);
      notify('Corrige los errores en el formulario', 'error');
      setGuardando(false);
      return;
    }

    try {
      const payload = {
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono,
        direccion: form.direccion,
        ciudad: form.ciudad,
        region: form.region,
        // El RUN no se permite cambiar en la UI, pero lo enviamos por si el backend lo requiere (se puede omitir)
        run: form.run
      };

      await actualizarPerfil(payload);
      notify('Perfil actualizado', 'success');

      // No recargamos la página: `actualizarPerfil` emite un evento
      // `usuarioActualizado` que `useAutenticacion` escucha para sincronizar.
      // Actualizar el estado local inmediato para reflejar cambios en este formulario.
      setUsuario(prev => ({ ...prev, nombre: payload.nombre, telefono: payload.telefono, direccion: payload.direccion, run: payload.run, ciudad: payload.ciudad, region: payload.region }));
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
      <h1 className="mb-4">Mi Perfil</h1>

      <div className="card shadow-sm border-0" style={{ maxWidth: 920 }}>
        <div className="card-body p-4">
          <div className="row gx-4 gy-3 align-items-start">
            <div className="col-md-4 text-center">
              <div className="mb-3">
                <div className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center" style={{ width: 110, height: 110 }}>
                  <span style={{ fontSize: 44 }}>👤</span>
                </div>
              </div>
              <h5 className="mb-1">{usuario.nombre}</h5>
              <p className="text-muted small mb-0">{usuario.email}</p>
              <p className="text-muted small">ID: {usuario.usuario_id}</p>
            </div>

            <div className="col-md-8">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-semibold">Nombre</label>
                    <input name="nombre" value={form.nombre} onChange={handleChange} className="form-control form-control-lg" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Email</label>
                    <input name="email" value={form.email} className="form-control" disabled />
                    <div className="form-text">Para cambiar el email contacta soporte.</div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Teléfono</label>
                    <input name="telefono" value={form.telefono} onChange={handleChange} className="form-control" />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Dirección</label>
                    <input name="direccion" value={form.direccion} onChange={handleChange} className="form-control" placeholder="Calle, número, depto." />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Ciudad</label>
                    <input name="ciudad" value={form.ciudad} onChange={handleChange} className="form-control" />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Región</label>
                    <select name="region" value={form.region} onChange={handleChange} className="form-select">
                      <option value="">Seleccionar...</option>
                      <option value="Metropolitana">Metropolitana</option>
                      <option value="Valparaíso">Valparaíso</option>
                      <option value="Biobío">Biobío</option>
                      <option value="Araucanía">Araucanía</option>
                      <option value="Los Lagos">Los Lagos</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">RUN / Identificador</label>
                    <input name="run" value={form.run} className="form-control" disabled />
                    <div className="form-text">El RUN no puede modificarse desde el perfil.</div>
                  </div>

                  <div className="col-12 mt-2">
                    <button className="btn btn-primary" type="submit" disabled={guardando}>{guardando ? 'Guardando...' : 'Guardar cambios'}</button>
                  </div>
                </div>
              </form>

              {/* Direcciones guardadas */}
              <div className="mt-4">
                <h6 className="mb-3">Direcciones Guardadas</h6>
                {direcciones.length === 0 ? (
                  <div className="text-muted small">No tienes direcciones guardadas.</div>
                ) : (
                  <div className="list-group mb-3">
                    {direcciones.map(dir => (
                      <div key={dir.id} className="list-group-item">
                        {editingId === dir.id ? (
                          <form onSubmit={saveEdit} className="row g-2 align-items-center">
                            <div className="col-md-3">
                              <input name="etiqueta" value={editDir.etiqueta} onChange={handleEditChange} className="form-control" />
                            </div>
                            <div className="col-md-5">
                              <input name="direccion" value={editDir.direccion} onChange={handleEditChange} className={`form-control ${editErrors.direccion ? 'is-invalid' : ''}`} />
                              {editErrors.direccion && <div className="invalid-feedback">{editErrors.direccion}</div>}
                            </div>
                            <div className="col-md-2">
                              <input name="ciudad" value={editDir.ciudad} onChange={handleEditChange} className={`form-control ${editErrors.ciudad ? 'is-invalid' : ''}`} />
                              {editErrors.ciudad && <div className="invalid-feedback">{editErrors.ciudad}</div>}
                            </div>
                            <div className="col-md-2 text-end">
                              <button className="btn btn-sm btn-primary me-2" type="submit">Guardar</button>
                              <button type="button" className="btn btn-sm btn-secondary" onClick={cancelEdit}>Cancelar</button>
                            </div>
                          </form>
                        ) : (
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <div className="fw-semibold">{dir.etiqueta || 'Dirección'}</div>
                              <div className="small text-muted">{dir.direccion} · {dir.ciudad} · {dir.region} {dir.codigoPostal ? `· ${dir.codigoPostal}` : ''}</div>
                            </div>
                            <div className="d-flex gap-2">
                              <button className="btn btn-sm btn-outline-secondary" onClick={() => startEdit(dir)}>Editar</button>
                              <button className="btn btn-sm btn-outline-danger" onClick={() => borrarDireccion(dir.id)}>Eliminar</button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="card p-3 border-0 bg-light">
                  <h6 className="mb-2">Agregar nueva dirección</h6>
                  <form onSubmit={agregarDireccion} className="row g-2">
                    <div className="col-md-4">
                      <input name="etiqueta" value={nuevaDir.etiqueta} onChange={handleNuevaDirChange} className="form-control" placeholder="Etiqueta (ej. Casa, Oficina)" />
                    </div>
                    <div className="col-md-8">
                      <input name="direccion" value={nuevaDir.direccion} onChange={handleNuevaDirChange} className={`form-control ${errores.direccion ? 'is-invalid' : ''}`} placeholder="Calle, número, depto." />
                      {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
                    </div>
                    <div className="col-md-4">
                      <input name="ciudad" value={nuevaDir.ciudad} onChange={handleNuevaDirChange} className={`form-control ${errores.ciudad ? 'is-invalid' : ''}`} placeholder="Ciudad" />
                      {errores.ciudad && <div className="invalid-feedback">{errores.ciudad}</div>}
                    </div>
                    <div className="col-md-4">
                      <select name="region" value={nuevaDir.region} onChange={handleNuevaDirChange} className={`form-select ${errores.region ? 'is-invalid' : ''}`}>
                        <option value="">Región...</option>
                        <option value="Metropolitana">Metropolitana</option>
                        <option value="Valparaíso">Valparaíso</option>
                        <option value="Biobío">Biobío</option>
                        <option value="Araucanía">Araucanía</option>
                        <option value="Los Lagos">Los Lagos</option>
                      </select>
                      {errores.region && <div className="invalid-feedback">{errores.region}</div>}
                    </div>
                    <div className="col-md-4">
                      <input name="codigoPostal" value={nuevaDir.codigoPostal} onChange={handleNuevaDirChange} className="form-control" placeholder="Código Postal (opcional)" />
                    </div>
                    <div className="col-12 text-end mt-2">
                      <button className="btn btn-sm btn-primary" type="submit">Agregar dirección</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
