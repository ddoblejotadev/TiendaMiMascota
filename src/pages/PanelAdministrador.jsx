import React, { useEffect, useState } from 'react';
import useAutenticacion from '../hooks/useAutenticacion';
import { Link } from 'react-router-dom';
import adminUserService from '../services/adminUserService';
import adminOrderService from '../services/adminOrderService';
import { obtenerProductos } from '../services/productService';

function PanelAdministrador() {
  const { usuario, cerrarSesion } = useAutenticacion();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ usuarios: 0, pedidos: 0, productos: 0 });
  const [error, setError] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    let mounted = true;
    async function cargar() {
      setLoading(true);
      setError(null);
      try {
        const [uList, pList, prodList] = await Promise.all([
          adminUserService.listar(),
          adminOrderService.obtenerTodasOrdenes(),
          obtenerProductos()
        ]);

        if (!mounted) return;

        setStats({ usuarios: uList.length || 0, pedidos: pList.length || 0, productos: prodList.length || 0 });

        // Tomar los 5 pedidos más recientes (si vienen con fecha)
        const ordenes = Array.isArray(pList) ? pList.slice().sort((a, b) => {
          const fa = new Date(a.createdAt || a.fecha || a.date || a.created_at || 0).getTime() || 0;
          const fb = new Date(b.createdAt || b.fecha || b.date || b.created_at || 0).getTime() || 0;
          return fb - fa;
        }).slice(0, 5) : [];

        setRecentOrders(ordenes);
      } catch (err) {
        console.error('Error cargando estadísticas del panel:', err);
        setError('No se pudieron cargar las estadísticas');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    cargar();
    return () => { mounted = false; };
  }, []);

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
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex align-items-center">
                  <div className="me-3 display-6 text-primary">👥</div>
                  <div>
                    <div className="text-muted small">Usuarios</div>
                    <div className="h4 mb-0">{stats.usuarios}</div>
                    <Link to="/admin/usuarios" className="stretched-link small">Ver usuarios</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex align-items-center">
                  <div className="me-3 display-6 text-success">🧾</div>
                  <div>
                    <div className="text-muted small">Pedidos</div>
                    <div className="h4 mb-0">{stats.pedidos}</div>
                    <Link to="/admin/pedidos" className="stretched-link small">Ver pedidos</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex align-items-center">
                  <div className="me-3 display-6 text-warning">📦</div>
                  <div>
                    <div className="text-muted small">Productos</div>
                    <div className="h4 mb-0">{stats.productos}</div>
                    <Link to="/admin/productos" className="stretched-link small">Gestionar productos</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-7 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Pedidos recientes</h5>
                  {recentOrders.length === 0 ? (
                    <div className="text-muted">No hay pedidos recientes.</div>
                  ) : (
                    <ul className="list-group list-group-flush">
                      {recentOrders.map((o, idx) => (
                        <li key={o.id || idx} className="list-group-item d-flex justify-content-between align-items-start">
                          <div>
                            <div className="fw-semibold">#{o.id}</div>
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
