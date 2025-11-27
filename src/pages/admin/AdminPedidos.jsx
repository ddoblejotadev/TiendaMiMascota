import React, { useEffect, useState } from 'react';
import adminOrderService from '../../services/adminOrderService';
import { ESTADOS_PEDIDO } from '../../util/constants';

// Helper para normalizar una orden en una forma estable usada por la UI
const normalizarOrden = (o) => {
  const usuarioId = o.usuarioId || o.usuario_id || o.userId || o.user_id || o.customerId || o.customer_id ||
    (o.usuario && (o.usuario.id || o.usuario.usuario_id || o.usuario._id || o.usuario.userId || o.usuario.user_id)) || null;

  const email = o.datos_envio?.email || o.usuario?.email || o.usuario_email || o.email || o.contact?.email || null;

  const clienteNombre = o.datos_envio?.nombre_completo || o.usuario?.nombre || o.usuario?.name || o.usuario?.username || o.usuario_email || o.email || o.cliente || null;

  const fecha = o.createdAt || o.fecha || o.fecha_creacion || o.date || o.created_at || o.createdAt || '';

  const items = o.items || o.productos || o.orderItems || [];

  const total = o.total || o.subtotal || o.amount || o.totalAmount || 0;

  const id = o.id || o.orden_id || o._id || o.orderId || o.order_id || o.idPedido || null;

  return {
    original: o,
    id,
    usuarioId,
    email,
    clienteNombre: clienteNombre || null,
    estado: o.estado || o.status || 'pendiente',
    total,
    fecha,
    items
  };
};

function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [mostrarInvitados, setMostrarInvitados] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function cargar() {
      setCargando(true);
      setError(null);
      try {
        const data = await adminOrderService.obtenerTodasOrdenes();
        if (!mounted) return;

        const array = Array.isArray(data) ? data : [];
        setPedidos(array.map(normalizarOrden));
        setUltimaActualizacion(new Date());
      } catch (err) {
        if (!mounted) return;
        console.error('Error cargando pedidos (AdminPedidos):', err);
        setError('No se pudieron cargar los pedidos');
      } finally {
        if (mounted) setCargando(false);
      }
    }

    // cargar inicialmente y activar polling cada 30s
    cargar();
    const intervalo = setInterval(() => { cargar(); }, 30000);
    return () => { mounted = false; clearInterval(intervalo); };
  }, []);

  const handleRefrescar = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await adminOrderService.obtenerTodasOrdenes();
      setPedidos((Array.isArray(data) ? data : []).map(normalizarOrden));
      setUltimaActualizacion(new Date());
    } catch (err) {
      console.error('Error refrescando pedidos:', err);
      setError('No se pudo refrescar la lista de pedidos');
    } finally {
      setCargando(false);
    }
  };
  return (
    <div>
      <h1>Pedidos</h1>
      <div className="d-flex align-items-center mb-2">
        <button className="btn btn-sm btn-primary me-2" onClick={handleRefrescar} disabled={cargando}>Refrescar</button>
        <div className="form-check form-switch me-3">
          <input className="form-check-input" type="checkbox" id="mostrarInvitados" checked={mostrarInvitados} onChange={(e) => { setMostrarInvitados(e.target.checked); setExpandedOrders({}); }} />
          <label className="form-check-label" htmlFor="mostrarInvitados">Mostrar pedidos de invitados</label>
        </div>
        <small className="text-muted">Última actualización: {ultimaActualizacion ? ultimaActualizacion.toLocaleString() : 'Nunca'}</small>
      </div>
      {cargando && <p>Cargando pedidos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!cargando && !error && (
        <div>
          <p>Listado de pedidos</p>

          {/* Agrupar pedidos por usuario/cliente */}
          {(() => {
            const grouped = pedidos.reduce((acc, p) => {
              const isGuest = !p.usuarioId;
              if (isGuest && !mostrarInvitados) return acc; // saltar invitados si el filtro está apagado

              const usuarioClave = p.usuarioId ? `user-${p.usuarioId}` : (p.email ? `email-${p.email}` : `guest-${p.id}`);
              if (!acc[usuarioClave]) acc[usuarioClave] = {
                usuarioId: p.usuarioId || null,
                clave: usuarioClave,
                clienteNombre: p.clienteNombre || null,
                email: p.email || null,
                pedidos: []
              };
              acc[usuarioClave].pedidos.push(p);
              return acc;
            }, {});

            const formatter = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' });

            return Object.values(grouped).map(group => {
              // Preferir nombre real del cliente: clienteNombre (ya normalizado),
              // si no existe intentar extraer desde alguno de los pedidos (original.usuario),
              // luego email y finalmente fallback a 'Usuario #id'.
              let label = 'Invitado';
              if (group.usuarioId) {
                label = group.clienteNombre || (
                  group.pedidos.find(p => p.original && (p.original.usuario?.nombre || p.original.usuario?.name || p.original.usuario?.username))?.original.usuario?.nombre
                ) || group.email || `Usuario #${group.usuarioId}`;
              } else {
                label = group.email || group.clienteNombre || 'Invitado';
              }
              return (
                <div key={group.clave} className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Usuario: {label}
                      {(!group.usuarioId) && <span className="badge bg-secondary ms-2">Invitado</span>}
                    </h5>
                    <p className="card-subtitle text-muted mb-2">Pedidos: {group.pedidos.length}</p>

                    <table className="table table-sm table-hover">
                      <thead>
                        <tr>
                          <th>Pedido</th>
                          <th>Estado</th>
                          <th>Total</th>
                          <th>Fecha</th>
                          <th>Items</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.pedidos.map(p => (
                          <React.Fragment key={p.id}>
                            <tr>
                              <td>#{p.id}</td>
                              <td>{p.estado}</td>
                              <td>{formatter.format(Number(p.total || 0))}</td>
                              <td>{p.fecha ? new Date(p.fecha).toLocaleString() : '-'}</td>
                              <td>{p.items ? p.items.length : 0}</td>
                              <td>
                                <button className="btn btn-sm btn-outline-secondary" onClick={() => setExpandedOrders(prev => ({ ...prev, [p.id]: !prev[p.id] }))}>
                                  {expandedOrders[p.id] ? 'Ocultar' : 'Ver'}
                                </button>
                              </td>
                            </tr>
                            {expandedOrders[p.id] && (
                              <tr>
                                <td colSpan={6}>
                                  <div>
                                    <strong>Items:</strong>
                                    <ul className="mb-0">
                                      {(p.items || []).map((it, idx) => (
                                        <li key={idx}>{it.nombre || it.name || it.producto_nombre || it.producto?.nombre || `ID ${it.producto_id || it.id}`} — {it.cantidad || it.quantity || it.qty || 1} unidad(es) — {formatter.format(Number(it.precio_unitario || it.precio || it.price || it.unit_price || 0))}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      )}
    </div>
  );
}

export default AdminPedidos;