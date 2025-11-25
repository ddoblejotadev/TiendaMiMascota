import React, { useEffect, useState } from 'react';
import { obtenerTodasOrdenes } from '../../util/constants';
import logger from '../../util/logger';
import { formatearPrecio } from '../../util/formatters';

function AdminPedidos() {
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarOrdenes();
  }, []);

  async function cargarOrdenes() {
    setCargando(true);
    try {
      const data = await obtenerTodasOrdenes();
      setOrdenes(data);
      logger.success('Órdenes (admin) cargadas:', data.length);
    } catch (error) {
      logger.error('Error al cargar órdenes (admin):', error);
    } finally {
      setCargando(false);
    }
  }

  if (cargando) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3 text-muted">Cargando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Pedidos (Admin)</h1>
      {ordenes.length === 0 ? (
        <div className="alert alert-info">No hay pedidos registrados.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map(o => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.usuario_nombre || o.usuario?.nombre || o.datosEnvio?.nombre_completo || 'Invitado'}</td>
                  <td>{new Date(o.fecha).toLocaleString('es-CL')}</td>
                  <td>{o.estado}</td>
                  <td>{formatearPrecio(o.total || o.totalPago || o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminPedidos;