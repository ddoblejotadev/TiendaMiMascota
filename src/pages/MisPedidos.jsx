/**
 * PÁGINA: MIS PEDIDOS
 * Muestra el historial de compras del usuario logueado
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAutenticacion from '../hooks/useAutenticacion';
import { formatearPrecio } from '../util/formatters';
import { obtenerOrdenesUsuario } from '../util/constants';
import { notify } from '../components/ui/notificationHelper';

function MisPedidos() {
  const navigate = useNavigate();
  const { usuario, estaLogueado, cargando: cargandoAuth } = useAutenticacion();
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState('todos'); // todos, completada, pendiente, cancelada

  useEffect(() => {
    // Esperar a que termine de cargar la autenticación
    if (cargandoAuth) {
      console.log('⏳ Esperando autenticación...');
      return;
    }

    // Redirigir si no está logueado
    if (!estaLogueado) {
      console.log('❌ No hay sesión activa, redirigiendo a login...');
      navigate('/iniciar-sesion', { 
        state: { mensaje: 'Debes iniciar sesión para ver tus pedidos' }
      });
      return;
    }

    console.log('✅ Usuario autenticado, cargando pedidos...');
    // Cargar pedidos
    cargarPedidos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estaLogueado, cargandoAuth, navigate]);

  /**
   * Cargar pedidos del usuario desde el backend
   */
  async function cargarPedidos() {
    setCargando(true);
    try {
      console.log('📡 Cargando pedidos desde el backend...');
      
      // Llamar al backend
      const pedidosBackend = await obtenerOrdenesUsuario(usuario.usuario_id);
      
      // Ordenar por fecha más reciente primero
      pedidosBackend.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

      setPedidos(pedidosBackend);
      console.log('✅ Pedidos cargados desde backend:', pedidosBackend);
      
    } catch (error) {
      console.error('❌ Error al cargar pedidos del backend:', error);
      
      // FALLBACK: Intentar cargar desde localStorage
      console.log('🔄 Intentando cargar desde localStorage como fallback...');
      try {
        const ordenesGuardadas = JSON.parse(localStorage.getItem('ordenes') || '[]');
        
        const pedidosUsuario = ordenesGuardadas.filter(orden => {
          if (orden.usuarioId) {
            return orden.usuarioId === usuario?.usuario_id;
          }
          if (orden.esInvitado && orden.datosEnvio?.email) {
            return orden.datosEnvio.email === usuario?.email;
          }
          return false;
        });

        pedidosUsuario.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setPedidos(pedidosUsuario);
        console.log('📦 Pedidos cargados desde localStorage:', pedidosUsuario);
        
        notify('Mostrando pedidos locales. Algunos pedidos pueden no estar sincronizados.', 'warning', 4000);
      } catch (localError) {
        console.error('Error al cargar desde localStorage:', localError);
        setPedidos([]);
        notify('Error al cargar pedidos', 'error', 3000);
      }
    } finally {
      setCargando(false);
    }
  }

  /**
   * Formatear fecha para mostrar
   */
  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Obtener badge según el estado
   */
  const obtenerBadgeEstado = (estado) => {
    const badges = {
      completada: { clase: 'bg-success', texto: '✓ Completada' },
      pendiente: { clase: 'bg-warning', texto: '⏳ Pendiente' },
      enviado: { clase: 'bg-info', texto: '🚚 Enviado' },
      cancelada: { clase: 'bg-danger', texto: '✗ Cancelada' }
    };
    return badges[estado] || badges.completada;
  };

  /**
   * Filtrar pedidos según el estado seleccionado
   */
  const pedidosFiltrados = filtro === 'todos' 
    ? pedidos 
    : pedidos.filter(p => p.estado === filtro);

  // Pantalla de carga de autenticación
  if (cargandoAuth) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: '80vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3 text-muted">Verificando sesión...</p>
      </div>
    );
  }

  // Pantalla de carga de pedidos
  if (cargando) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: '80vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3 text-muted">Cargando tus pedidos...</p>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ minHeight: '80vh' }}>
      {/* Encabezado */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-5 fw-bold mb-2">📦 Mis Pedidos</h1>
          <p className="text-muted">
            Historial de compras de <strong>{usuario?.nombre}</strong>
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="btn-group" role="group">
            <button 
              className={`btn ${filtro === 'todos' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFiltro('todos')}
            >
              Todos ({pedidos.length})
            </button>
            <button 
              className={`btn ${filtro === 'completada' ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => setFiltro('completada')}
            >
              Completados ({pedidos.filter(p => p.estado === 'completada').length})
            </button>
            <button 
              className={`btn ${filtro === 'enviado' ? 'btn-info' : 'btn-outline-info'}`}
              onClick={() => setFiltro('enviado')}
            >
              Enviados ({pedidos.filter(p => p.estado === 'enviado').length})
            </button>
            <button 
              className={`btn ${filtro === 'pendiente' ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={() => setFiltro('pendiente')}
            >
              Pendientes ({pedidos.filter(p => p.estado === 'pendiente').length})
            </button>
          </div>
        </div>
      </div>

      {/* Lista de pedidos */}
      {pedidosFiltrados.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-4">
            <span className="display-1">📭</span>
          </div>
          <h3 className="h4 mb-3">
            {filtro === 'todos' ? 'Aún no tienes pedidos' : `No tienes pedidos ${filtro}s`}
          </h3>
          <p className="text-muted mb-4">
            Comienza a comprar y tus pedidos aparecerán aquí
          </p>
          <Link to="/productos" className="btn btn-primary btn-lg">
            🛍️ Ir a Comprar
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {pedidosFiltrados.map((pedido) => {
            const badge = obtenerBadgeEstado(pedido.estado);
            return (
              <div key={pedido.id} className="col-12">
                <div className="card shadow-sm border-0 hover-shadow">
                  <div className="card-body">
                    {/* Encabezado del pedido */}
                    <div className="row align-items-center mb-3">
                      <div className="col-md-8">
                        <h5 className="mb-1">
                          Pedido #{pedido.id}
                        </h5>
                        <small className="text-muted">
                          📅 {formatearFecha(pedido.fecha)}
                        </small>
                      </div>
                      <div className="col-md-4 text-md-end mt-2 mt-md-0">
                        <span className={`badge ${badge.clase} px-3 py-2`}>
                          {badge.texto}
                        </span>
                      </div>
                    </div>

                    <hr />

                    {/* Productos del pedido */}
                    <div className="mb-3">
                      <h6 className="fw-bold mb-3">Productos:</h6>
                      <div className="row g-2">
                        {pedido.productos.slice(0, 3).map((item, index) => (
                          <div key={index} className="col-md-4">
                            <div className="d-flex align-items-center gap-2">
                              <img
                                src={item.imagen}
                                alt={item.nombre}
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'cover',
                                  borderRadius: '8px'
                                }}
                              />
                              <div className="flex-grow-1 small">
                                <div className="fw-bold text-truncate" style={{ maxWidth: '200px' }}>
                                  {item.nombre}
                                </div>
                                <div className="text-muted">
                                  Cant: {item.cantidad} × {formatearPrecio(item.precio)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {pedido.productos.length > 3 && (
                          <div className="col-12">
                            <small className="text-muted">
                              +{pedido.productos.length - 3} producto(s) más
                            </small>
                          </div>
                        )}
                      </div>
                    </div>

                    <hr />

                    {/* Footer con total y acciones */}
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <div className="d-flex align-items-center gap-3">
                          <div>
                            <small className="text-muted d-block">Total pagado:</small>
                            <strong className="fs-5 text-success">
                              {formatearPrecio(pedido.total)}
                            </strong>
                          </div>
                          <div className="vr d-none d-md-block"></div>
                          <div>
                            <small className="text-muted d-block">Método de pago:</small>
                            <span className="badge bg-light text-dark">
                              {pedido.datosEnvio?.metodoPago === 'tarjeta' ? '💳 Tarjeta' : '🏦 Transferencia'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 text-md-end mt-3 mt-md-0">
                        <button 
                          className="btn btn-outline-primary btn-sm me-2"
                          onClick={() => {
                            // Navegar a página de detalle con la orden
                            navigate('/compra-exitosa', { state: { orden: pedido } });
                          }}
                        >
                          👁️ Ver Detalle
                        </button>
                        {pedido.estado === 'completada' && (
                          <button className="btn btn-primary btn-sm">
                            🔄 Volver a Comprar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Información adicional */}
      {pedidos.length > 0 && (
        <div className="alert alert-info mt-4">
          <h6 className="alert-heading">ℹ️ Información</h6>
          <p className="mb-0 small">
            • Los pedidos se muestran del más reciente al más antiguo<br/>
            • Puedes filtrar por estado para encontrar pedidos específicos<br/>
            • Click en "Ver Detalle" para ver la información completa de cada pedido
          </p>
        </div>
      )}
    </div>
  );
}

export default MisPedidos;
