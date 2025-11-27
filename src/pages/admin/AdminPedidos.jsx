import React, { useEffect, useState } from 'react';
import adminOrderService from '../../services/adminOrderService';
import { ESTADOS_PEDIDO } from '../../util/constants';

function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);

  useEffect(() => {
    let mounted = true;

    const mapOrden = (o) => ({
      id: o.id || o.orden_id || o._id || o.orderId || o.order_id,
      cliente: o.datos_envio?.nombre_completo || o.usuario?.nombre || o.usuario_email || o.email || o.cliente || 'N/A',
      estado: o.estado || o.status || 'pendiente',
      total: o.total || o.subtotal || o.amount || 0,
      fecha: o.createdAt || o.fecha || o.fecha_creacion || o.date || o.created_at || '' ,
      items: o.items || o.productos || o.orderItems || []
    });

    async function cargar() {
      setCargando(true);
      setError(null);
      try {
        const data = await adminOrderService.obtenerTodasOrdenes();
        if (!mounted) return;

        const array = Array.isArray(data) ? data : [];
        setPedidos(array.map(mapOrden));
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
      setPedidos((Array.isArray(data) ? data : []).map(o => ({
        id: o.id || o.orden_id || o._id || o.orderId || o.order_id,
        cliente: o.datos_envio?.nombre_completo || o.usuario?.nombre || o.usuario_email || o.email || o.cliente || 'N/A',
        estado: o.estado || o.status || 'pendiente',
        total: o.total || o.subtotal || o.amount || 0,
        fecha: o.createdAt || o.fecha || o.fecha_creacion || o.date || o.created_at || '' ,
        items: o.items || o.productos || o.orderItems || []
      })));
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
        <small className="text-muted">Última actualización: {ultimaActualizacion ? ultimaActualizacion.toLocaleString() : 'Nunca'}</small>
      </div>
      {cargando && <p>Cargando pedidos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!cargando && !error && (
        <div>
          <p>Listado de pedidos</p>
          <ul>
            {pedidos.map(p => (
              <li key={p.id}>
                <strong>Pedido #{p.id}</strong> - {p.cliente} - {p.estado} - ${p.total} - {p.fecha} - {p.items.length} items
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminPedidos;