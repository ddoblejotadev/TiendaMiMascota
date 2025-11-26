import React, { useEffect, useState } from 'react';
import adminOrderService from '../../services/adminOrderService';
import { ESTADOS_PEDIDO } from '../../util/constants';

function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function cargar() {
      setCargando(true);
      setError(null);
      try {
        const data = await adminOrderService.obtenerTodasOrdenes();
        if (!mounted) return;
        
        if (!data || (Array.isArray(data) && data.length === 0)) {
          setPedidos([
            { id: 1001, cliente: 'Cliente A', estado: ESTADOS_PEDIDO.PROCESANDO, total: 25000, fecha: '2025-01-01' },
            { id: 1002, cliente: 'Cliente B', estado: ESTADOS_PEDIDO.ENVIADO, total: 14000, fecha: '2025-01-02' }
          ]);
        } else {
          
          const map = (o) => ({
            id: o.id || o.orden_id || o._id,
            cliente: o.datos_envio?.nombre_completo || o.usuario?.nombre || o.usuario_email || o.email || o.cliente || 'N/A',
            estado: o.estado || o.status || 'pendiente',
            total: o.total || o.subtotal || 0,
            fecha: o.createdAt || o.fecha || o.fecha_creacion || o.date || '' ,
            items: o.items || o.productos || []
          });
          setPedidos((Array.isArray(data) ? data : []).map(map));
        }
      } catch (err) {
        if (!mounted) return;
        setError('No se pudieron cargar los pedidos');
      } finally {
        if (mounted) setCargando(false);
      }
    }
    cargar();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <h1>Pedidos</h1>
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