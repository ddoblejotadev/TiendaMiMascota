import React, { useEffect, useState, useMemo, useRef } from 'react';
import useAutenticacion from '../hooks/useAutenticacion';
import { Link, useNavigate } from 'react-router-dom';
import adminUserService from '../services/adminUserService';
import adminOrderService from '../services/adminOrderService';
import { obtenerProductos } from '../services/productService';

// Chart.js components (lightweight usage)
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function PanelAdministrador() {
  const { usuario, cerrarSesion } = useAutenticacion();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ usuarios: 0, pedidos: 0, productos: 0 });
  const [error, setError] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const prevStatsRef = useRef(null);
  const [filterEstado, setFilterEstado] = useState('');
  const [filterDesde, setFilterDesde] = useState('');
  const [filterHasta, setFilterHasta] = useState('');
  const chartDays = 14;

  // Filtrado de pedidos recientes según estado y rango de fechas
  const filteredRecent = useMemo(() => {
    const from = filterDesde ? new Date(filterDesde) : null;
    const to = filterHasta ? new Date(filterHasta) : null;

    return recentOrders.filter(o => {
      const estado = (o.estado || o.status || '').toString().toLowerCase();
      if (filterEstado && estado.indexOf(filterEstado.toLowerCase()) === -1) return false;

      const rawDate = o.fecha || o.createdAt || o.date || o.created_at || o.fecha_creacion || null;
      const d = rawDate ? new Date(rawDate) : null;
      if (from && d && d < from) return false;
      if (to && d && d > new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59)) return false;

      return true;
    });
  }, [recentOrders, filterEstado, filterDesde, filterHasta]);

  // Datos para chart: ventas por día (suma de total) para los últimos `chartDays`
  const chartData = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = chartDays - 1; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      days.push(d);
    }

    const sums = days.map(day => {
      const start = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0).getTime();
      const end = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59).getTime();
      let total = 0;
      for (const o of recentOrders) {
        const rawDate = o.fecha || o.createdAt || o.date || o.created_at || o.fecha_creacion || null;
        const t = rawDate ? new Date(rawDate).getTime() : null;
        if (t && t >= start && t <= end) {
          total += Number(o.total || o.subtotal || o.amount || 0);
        }
      }
      return total;
    });

    return {
      labels: days.map(d => d.toLocaleDateString()),
      datasets: [
        {
          label: 'Ventas (CLP)',
          data: sums,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.3
        }
      ]
    };
  }, [recentOrders]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    plugins: { legend: { position: 'top' } },
    scales: { y: { ticks: { callback: (v) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(v) } } }
  }), []);

  useEffect(() => {
    let mounted = true;
    let polling = null;

    async function cargar() {
      setError(null);
      try {
        const [uList, pList, prodList] = await Promise.all([
          adminUserService.listar(),
          adminOrderService.obtenerTodasOrdenes(),
          obtenerProductos()
        ]);

        if (!mounted) return;

        const newStats = { usuarios: uList.length || 0, pedidos: pList.length || 0, productos: prodList.length || 0 };

        // Si las estadísticas cambiaron respecto al valor anterior, marcar indicador
        const prev = prevStatsRef.current;
        if (prev && (newStats.usuarios !== prev.usuarios || newStats.pedidos !== prev.pedidos || newStats.productos !== prev.productos)) {
          setPulse(true);
          setTimeout(() => setPulse(false), 1500);
        }

        setStats(newStats);
        prevStatsRef.current = newStats;

        // Tomar los 20 pedidos más recientes y filtrar/ordenar
        const ordenes = Array.isArray(pList) ? pList.slice().sort((a, b) => {
          const fa = new Date(a.createdAt || a.fecha || a.date || a.created_at || 0).getTime() || 0;
          const fb = new Date(b.createdAt || b.fecha || b.date || b.created_at || 0).getTime() || 0;
          return fb - fa;
        }).slice(0, 20) : [];

        setRecentOrders(ordenes);
      } catch (err) {
        console.error('Error cargando estadísticas del panel:', err);
        setError('No se pudieron cargar las estadísticas');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    // cargar inicialmente
    cargar();

    // polling cada 15s para aproximar tiempo real (puedes ajustar)
    polling = setInterval(() => { cargar(); }, 15000);

    return () => { mounted = false; if (polling) clearInterval(polling); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Pulse indicator state
  const [pulse, setPulse] = useState(false);
  const navigate = useNavigate();

  // Make cards clickable by navigating on click to target route
  const onCardClick = (path) => (e) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-0">Panel de Administrador</h1>
          <div className="text-muted">Bienvenido, <strong>{usuario?.nombre || usuario?.email}</strong></div>
        </div>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={cerrarSesion}>Cerrar sesión</button>
          <Link to="/admin/productos" className="btn btn-primary">Ir a Admin</Link>
        </div>
      </div>

      {loading ? (
        <div className="alert alert-secondary">Cargando panel...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <>
          <div className="row g-3 mb-4">
            <div className="col-sm-6 col-md-4">
              <div className={`card shadow-sm h-100 ${pulse ? 'border-success' : ''}`} style={{ cursor: 'pointer' }} onClick={onCardClick('/admin/usuarios')}>
                <div className="card-body d-flex align-items-center">
                  <div className="me-3 display-6 text-primary">👥</div>
                  <div>
                    <div className="text-muted small">Usuarios</div>
                    <div className="h4 mb-0">{stats.usuarios}</div>
                    <div className="small text-muted">Ver usuarios</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className={`card shadow-sm h-100 ${pulse ? 'border-success' : ''}`} style={{ cursor: 'pointer' }} onClick={onCardClick('/admin/pedidos')}>
                <div className="card-body d-flex align-items-center">
                  <div className="me-3 display-6 text-success">🧾</div>
                  <div>
                    <div className="text-muted small">Pedidos</div>
                    <div className="h4 mb-0">{stats.pedidos}</div>
                    <div className="small text-muted">Ver pedidos</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className={`card shadow-sm h-100 ${pulse ? 'border-success' : ''}`} style={{ cursor: 'pointer' }} onClick={onCardClick('/admin/productos')}>
                <div className="card-body d-flex align-items-center">
                  <div className="me-3 display-6 text-warning">📦</div>
                  <div>
                    <div className="text-muted small">Productos</div>
                    <div className="h4 mb-0">{stats.productos}</div>
                    <div className="small text-muted">Gestionar productos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-7 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title mb-0">Pedidos recientes</h5>
                    <div className="d-flex gap-2 align-items-center">
                      <select className="form-select form-select-sm" value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)}>
                        <option value="">Todos</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="procesando">Procesando</option>
                        <option value="enviado">Enviado</option>
                        <option value="entregado">Entregado</option>
                        <option value="cancelado">Cancelado</option>
                      </select>
                      <input type="date" className="form-control form-control-sm" value={filterDesde} onChange={(e) => setFilterDesde(e.target.value)} />
                      <input type="date" className="form-control form-control-sm" value={filterHasta} onChange={(e) => setFilterHasta(e.target.value)} />
                    </div>
                  </div>

                  {filteredRecent.length === 0 ? (
                    <div className="text-muted">No hay pedidos recientes con los filtros aplicados.</div>
                  ) : (
                    <ul className="list-group list-group-flush">
                      {filteredRecent.map((o, idx) => (
                        <li key={o.id || idx} className="list-group-item d-flex justify-content-between align-items-start">
                          <div>
                            <div className="fw-semibold">#{o.id} {o.usuarioId ? <span className="badge bg-info ms-2">Usuario</span> : <span className="badge bg-secondary ms-2">Invitado</span>}</div>
                            <div className="small text-muted">{o.datos_envio?.nombre_completo || o.usuario?.nombre || o.email || 'Cliente'}</div>
                          </div>
                          <div className="text-end">
                            <div className="fw-bold">{(o.total || o.subtotal || o.amount) ? new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(Number(o.total || o.subtotal || o.amount)) : '-'}</div>
                            <div className="small text-muted">{o.fecha || o.createdAt ? new Date(o.fecha || o.createdAt).toLocaleString() : ''}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              
              {/* Chart ventas por dia */}
              <div className="card mt-3 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Ventas por día (últimos {chartDays} días)</h5>
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>

            <div className="col-lg-5 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Acciones rápidas</h5>
                  <div className="d-grid gap-2">
                    <Link to="/admin/productos" className="btn btn-outline-primary">Gestionar productos</Link>
                    <Link to="/admin/pedidos" className="btn btn-outline-success">Ver pedidos</Link>
                    <Link to="/admin/usuarios" className="btn btn-outline-secondary">Administrar usuarios</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PanelAdministrador;
