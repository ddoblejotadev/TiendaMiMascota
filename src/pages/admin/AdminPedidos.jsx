import React, { useEffect, useState } from 'react';
import adminOrderService from '../../services/adminOrderService';
import adminUserService from '../../services/adminUserService';
import { ESTADOS_PEDIDO } from '../../util/constants';
import { notify } from '../../components/ui/notificationHelper';
import { confirmDialog } from '../../components/ui/confirmDialogHelper';
import useDebounce from '../../hooks/useDebounce';
import { Link } from 'react-router-dom';

// Helper para normalizar una orden en una forma estable usada por la UI
const normalizarOrden = (o) => {
  const usuarioId = o.usuarioId || o.usuario_id || o.userId || o.user_id || o.customerId || o.customer_id ||
    (o.usuario && (o.usuario.id || o.usuario.usuario_id || o.usuario._id || o.usuario.userId || o.usuario.user_id)) || null;

  const email = o.datos_envio?.email || o.usuario?.email || o.usuario_email || o.email || o.contact?.email || null;

  // Intentar extraer el mejor nombre posible del pedido/usuario en varias rutas comunes
  const clienteNombre = o.datos_envio?.nombre_completo
    || o.usuario?.nombre
    || o.usuario?.name
    || o.usuario?.username
    || o.usuario?.fullName
    || o.usuario?.full_name
    || o.usuario?.displayName
    || o.usuario?.display_name
    || o.usuario?.profile?.name
    || (o.usuario?.firstName && o.usuario?.lastName && `${o.usuario.firstName} ${o.usuario.lastName}`)
    || o.usuario_email
    || o.email
    || o.cliente
    || null;

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
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  const [filtroUsuario, setFiltroUsuario] = useState('');
  const debouncedFiltro = useDebounce(filtroUsuario, 450);
  const [estadoEdicion, setEstadoEdicion] = useState({});

  useEffect(() => {
    let mounted = true;

    async function cargar(p = 0) {
      setCargando(true);
      setError(null);
      try {
        let data = [];
        // Preferir la función paginada si está disponible
        if (adminOrderService.obtenerOrdenesPaginadas) {
          data = await adminOrderService.obtenerOrdenesPaginadas(p, size, debouncedFiltro);
        } else {
          data = await adminOrderService.obtenerTodasOrdenes();
        }
        if (!mounted) return;
        const array = Array.isArray(data) ? data : [];
        const normalizadas = array.map(normalizarOrden);
          setPedidos(normalizadas);
          // Enriquecer con datos de usuario cuando exista usuarioId pero falten nombre/email
          (async () => {
            try {
              const ids = Array.from(new Set(normalizadas.filter(p => p.usuarioId && !(p.clienteNombre || p.email)).map(p => p.usuarioId)));
              if (ids.length === 0) return;
              const fetches = await Promise.all(ids.map(id => adminUserService.obtenerPorId(id).catch(() => null)));
              const usersById = {};
              ids.forEach((id, i) => { if (fetches[i]) usersById[id] = fetches[i]; });
              if (Object.keys(usersById).length === 0) return;
              const enriched = normalizadas.map(p => {
                if (p.usuarioId && usersById[p.usuarioId]) {
                  const u = usersById[p.usuarioId];
                  return {
                    ...p,
                    clienteNombre: p.clienteNombre || u.nombre || u.name || u.username || u.fullName || p.clienteNombre,
                    email: p.email || u.email || p.email,
                    original: { ...p.original, usuario: { ...u } }
                  };
                }
                return p;
              });
              setPedidos(enriched);
              const initEstados2 = {};
              enriched.forEach(o => { initEstados2[o.id] = o.estado; });
              setEstadoEdicion(initEstados2);
            } catch (err) {
              console.debug('No se pudo enriquecer usuarios de pedidos:', err);
            }
          })();
        // inicializar estadoEdicion con estados actuales
        const initEstados = {};
        normalizadas.forEach(o => { initEstados[o.id] = o.estado; });
        setEstadoEdicion(initEstados);
        setUltimaActualizacion(new Date());
      } catch (err) {
        if (!mounted) return;
        console.error('Error cargando pedidos (AdminPedidos):', err);
        setError('No se pudieron cargar los pedidos');
      } finally {
        if (mounted) setCargando(false);
      }
    }

    // cargar inicialmente y activar polling cada 30s (respetando página y filtro)
    cargar(page - 1);
    const intervalo = setInterval(() => { cargar(page - 1); }, 30000);
    return () => { mounted = false; clearInterval(intervalo); };
  }, [page, size, debouncedFiltro]);

  const handleRefrescar = async () => {
    setCargando(true);
    setError(null);
    try {
      let data = [];
      if (adminOrderService.obtenerOrdenesPaginadas) {
        data = await adminOrderService.obtenerOrdenesPaginadas(page - 1, size, debouncedFiltro);
      } else {
        data = await adminOrderService.obtenerTodasOrdenes();
      }
      const array = Array.isArray(data) ? data : [];
      const normalizadas = array.map(normalizarOrden);
      setPedidos(normalizadas);
      // mantener/actualizar estadoEdicion
      const initEstados = {};
      normalizadas.forEach(o => { initEstados[o.id] = o.estado; });
      setEstadoEdicion(initEstados);
      setUltimaActualizacion(new Date());
    } catch (err) {
      console.error('Error refrescando pedidos:', err);
      setError('No se pudo refrescar la lista de pedidos');
    } finally {
      setCargando(false);
    }
  };

  const aplicarFiltroUsuario = (lista) => {
    const q = (filtroUsuario || '').trim().toLowerCase();
    if (!q) return lista;
    return lista.filter(p => {
      const cliente = (p.clienteNombre || '') + ' ' + (p.email || '') + ' ' + (p.usuarioId || '');
      return cliente.toLowerCase().includes(q);
    });
  };

  const handleCambioEstadoLocal = (orderId, nuevoEstado) => {
    setEstadoEdicion(prev => ({ ...prev, [orderId]: nuevoEstado }));
  };

  const confirmarCambioEstado = async (order) => {
    const nuevo = estadoEdicion[order.id];
    if (!nuevo || nuevo === order.estado) return;
    // Confirmar con modal antes de enviar PUT
    const confirmado = await confirmDialog({ title: 'Confirmar cambio de estado', message: `Cambiar estado del pedido #${order.id} a '${nuevo}'?`, confirmText: 'Sí, cambiar', cancelText: 'Cancelar' });
    if (!confirmado) return;
    try {
      setCargando(true);
      const resultado = await adminOrderService.actualizarEstadoOrden(order.id, { estado: nuevo });
      // Actualizar en estado local. resultado puede ser el objeto actualizado o parcial
      setPedidos(prev => prev.map(p => p.id === order.id ? ({ ...p, estado: resultado.estado || nuevo, original: { ...p.original, ...resultado } }) : p));
      notify('Estado actualizado', 'success');
    } catch (err) {
      console.error('Error actualizando estado:', err);
      notify('No se pudo actualizar estado', 'error');
    } finally {
      setCargando(false);
    }
  };
  return (
    <div>
      <h1>Pedidos</h1>
      <div className="d-flex align-items-center mb-2 gap-2">
        <button className="btn btn-sm btn-primary me-2" onClick={handleRefrescar} disabled={cargando}>Refrescar</button>
        <div className="input-group" style={{maxWidth:360}}>
          <span className="input-group-text">Buscar usuario</span>
          <input className="form-control" placeholder="nombre o email" value={filtroUsuario} onChange={(e) => { setFiltroUsuario(e.target.value); setPage(1); }} />
        </div>
        <div className="ms-auto d-flex align-items-center gap-2">
          <label className="mb-0">Pág:</label>
          <input type="number" className="form-control form-control-sm" style={{width:80}} min={1} value={page} onChange={(e) => { const v = Math.max(1, Number(e.target.value || 1)); setPage(v); }} />
          <select className="form-select form-select-sm" style={{width:120}} value={size} onChange={(e) => setSize(Number(e.target.value))}>
            <option value={10}>10 / pág</option>
            <option value={20}>20 / pág</option>
            <option value={50}>50 / pág</option>
          </select>
        </div>
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
            const listaFiltrada = aplicarFiltroUsuario(pedidos);
            const grouped = listaFiltrada.reduce((acc, p) => {
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
                // preferir clienteNombre ya normalizado
                label = group.clienteNombre || group.email || `Usuario #${group.usuarioId}`;
                // si aún no hay nombre intentar buscar en los originales de los pedidos (más rutas)
                if (!group.clienteNombre) {
                  const found = group.pedidos.find(pp => {
                    const u = pp.original?.usuario;
                    return u && (u.nombre || u.name || u.username || u.fullName || u.full_name || u.displayName || u.display_name || (u.firstName && u.lastName));
                  });
                  if (found) {
                    const u = found.original.usuario;
                    label = u.nombre || u.name || u.username || u.fullName || u.full_name || u.displayName || u.display_name || (u.firstName && u.lastName && `${u.firstName} ${u.lastName}`) || label;
                  }
                }
              } else {
                label = group.email || group.clienteNombre || 'Invitado';
              }
              return (
                <div key={group.clave} className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Usuario: {label}
                      {(!group.usuarioId) && <span className="badge bg-secondary ms-2">Invitado</span>}
                      {group.usuarioId && (
                        <Link to={`/admin/usuarios/${group.usuarioId}`} className="btn btn-sm btn-link ms-3">Ver perfil</Link>
                      )}
                    </h5>
                    <div>
                      {group.email && <small className="text-muted d-block">Email: {group.email}</small>}
                      {/* intentar mostrar teléfono o datos_envio del primer pedido */}
                      {group.pedidos[0]?.original?.datos_envio?.telefono && (
                        <small className="text-muted d-block">Tel: {group.pedidos[0].original.datos_envio.telefono}</small>
                      )}
                    </div>
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
                                <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => setExpandedOrders(prev => ({ ...prev, [p.id]: !prev[p.id] }))}>
                                  {expandedOrders[p.id] ? 'Ocultar' : 'Ver'}
                                </button>
                                <select className="form-select form-select-sm d-inline-block" style={{width:140}} value={estadoEdicion[p.id] || p.estado} onChange={(e) => handleCambioEstadoLocal(p.id, e.target.value)}>
                                  {Object.values(ESTADOS_PEDIDO).map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                {estadoEdicion[p.id] && estadoEdicion[p.id] !== p.estado && (
                                  <button className="btn btn-sm btn-success ms-2" onClick={() => confirmarCambioEstado(p)}>Confirmar</button>
                                )}
                              </td>
                            </tr>
                            {expandedOrders[p.id] && (
                              <tr>
                                <td colSpan={6}>
                                  <div className="container-fluid">
                                    <div className="row">
                                      <div className="col-md-4">
                                        <div className="card">
                                          <div className="card-body">
                                            <h6>Datos de envío</h6>
                                            <div><strong>Nombre:</strong> {p.original?.datos_envio?.nombre_completo || p.clienteNombre || '-'}</div>
                                            <div><strong>Email:</strong> {p.original?.datos_envio?.email || p.email || '-'}</div>
                                            <div><strong>Teléfono:</strong> {p.original?.datos_envio?.telefono || '-'}</div>
                                            <div><strong>Dirección:</strong> {p.original?.datos_envio?.direccion || '-'}</div>
                                            <div><strong>Ciudad / Región:</strong> {`${p.original?.datos_envio?.ciudad || ''} ${p.original?.datos_envio?.region ? '/ ' + p.original?.datos_envio?.region : ''}`}</div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-8">
                                        <h6>Items</h6>
                                        <div className="list-group">
                                          {(p.items || []).map((it, idx) => {
                                            const img = it.imagen || it.imagen_url || it.image || it.producto?.imagen || it.producto?.image || null;
                                            const nombre = it.nombre || it.name || it.producto_nombre || it.producto?.nombre || `ID ${it.producto_id || it.id}`;
                                            const cantidad = it.cantidad || it.quantity || it.qty || 1;
                                            const precio = Number(it.precio_unitario || it.precio || it.price || it.unit_price || 0);
                                            return (
                                              <div key={idx} className="list-group-item d-flex align-items-center">
                                                {img ? <img src={img} alt={nombre} style={{ width: 64, height: 64, objectFit: 'cover' }} className="me-3" /> : <div style={{ width: 64, height: 64 }} className="bg-light me-3 d-flex align-items-center justify-content-center text-muted">No img</div>}
                                                <div className="flex-grow-1">
                                                  <div><strong>{nombre}</strong></div>
                                                  <div className="text-muted">{cantidad} unidad(es) — {formatter.format(precio)}</div>
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </div>
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