/**
 * PÁGINA DE CHECKOUT - PROCESO DE PAGO
 * Vista donde el cliente introduce datos de envío (Requisito del PDF - Figura 6)
 * Auto-completa si el usuario está logueado
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCarrito from '../hooks/useCarrito';
import useAutenticacion from '../hooks/useAutenticacion';
import { formatearPrecio } from '../util/formatters';
import { verificarStockCarrito, crearOrden, agregarDireccionUsuario } from '../util/constants';
import { notify } from '../components/ui/notificationHelper';
import { confirmDialog } from '../components/ui/confirmDialogHelper';
import logger from '../util/logger';

function Checkout() {
  const navigate = useNavigate();
  const { carrito, vaciarCarrito, calcularTotal, eliminarDelCarrito } = useCarrito();
  const { usuario, estaLogueado } = useAutenticacion();
  
  // Estado del formulario de envío
  const [datosEnvio, setDatosEnvio] = useState({
    nombreCompleto: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    region: '',
    codigoPostal: '',
    metodoPago: 'tarjeta'
  });

  const [procesando, setProcesando] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(!estaLogueado); // Si no está logueado, modo edición activo

  // Auto-completar con datos del usuario logueado
  useEffect(() => {
    if (estaLogueado && usuario) {
      setDatosEnvio(prev => ({
        ...prev,
        nombreCompleto: usuario.nombre || '',
        email: usuario.email || '',
        telefono: usuario.telefono || '',
        direccion: usuario.direccion || '',
        ciudad: usuario.ciudad || '',
        region: usuario.region || ''
      }));
      // Si el usuario tiene dirección guardada, no activar modo edición
      setModoEdicion(!usuario.direccion);
    } else {
      setModoEdicion(true);
    }
  }, [estaLogueado, usuario]);

  // Fuente de dirección seleccionada: 'perfil' | 'nueva'
  const [direccionFuente, setDireccionFuente] = useState(() => (usuario?.direccion ? 'perfil' : 'nueva'));
  const [selectedDireccionId, setSelectedDireccionId] = useState(null);
  const [nuevaDireccion, setNuevaDireccion] = useState({ direccion: '', ciudad: '', region: '', codigoPostal: '' });
  const [guardarEnCuenta, setGuardarEnCuenta] = useState(false);
  const [erroresEnvio, setErroresEnvio] = useState({});

  // Mantener direccionFuente en sync si cambia el usuario
  useEffect(() => {
    if (usuario && usuario.direccion) {
      setDireccionFuente('perfil');
    }
  }, [usuario]);

  // Inicializar selección de direcciones guardadas
  useEffect(() => {
    if (usuario && Array.isArray(usuario.direcciones) && usuario.direcciones.length > 0) {
      setSelectedDireccionId(usuario.direcciones[0].id);
    }
  }, [usuario]);

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (carrito.length === 0) {
      navigate('/carrito');
    }
  }, [carrito, navigate]);

  // No renderizar nada si el carrito está vacío
  if (carrito.length === 0) {
    return null;
  }

  // Manejar cambios en el formulario
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosEnvio(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Procesar el pago
  const procesarPago = async (e) => {
    e.preventDefault();
    setProcesando(true);

    try {
      // Validar datos de envío
      const camposRequeridos = ['nombreCompleto', 'email', 'telefono', 'direccion', 'ciudad', 'region'];
      const errs = {};
      for (const campo of camposRequeridos) {
        if (!datosEnvio[campo] || String(datosEnvio[campo]).trim().length === 0) errs[campo] = 'Campo requerido';
      }
      setErroresEnvio(errs);
      if (Object.keys(errs).length > 0) {
        notify('Por favor completa todos los campos requeridos', 'error', 3000);
        setProcesando(false);
        return;
      }

      // Si el usuario eligió guardar la dirección en su cuenta, guardarla localmente
      if (estaLogueado && guardarEnCuenta && direccionFuente === 'nueva') {
        try {
          await agregarDireccionUsuario({ etiqueta: 'Guardada', direccion: datosEnvio.direccion, ciudad: datosEnvio.ciudad, region: datosEnvio.region, codigoPostal: datosEnvio.codigoPostal });
          notify('Dirección guardada en tu cuenta', 'success');
        } catch (err) {
          logger?.error?.('No se pudo guardar dirección en cuenta:', err);
        }
      }
      // 🔍 PASO 1: Verificar stock en tiempo real
      notify('Verificando disponibilidad de productos...', 'info', 2000);
      
      const verificacion = await verificarStockCarrito(carrito);

      // Si hay productos sin stock
      if (!verificacion.disponible) {
        setProcesando(false);
        
        // Mostrar detalles de productos agotados
        const mensajes = verificacion.productosAgotados.map(p => 
          `• ${p.nombre}: ${p.motivo}`
        ).join('\n');

        const confirmar = await confirmDialog({
          title: '⚠️ Productos no disponibles',
          message: `Los siguientes productos no están disponibles:\n\n${mensajes}\n\n¿Deseas eliminarlos del carrito y continuar con los demás productos?`,
          confirmText: 'Continuar sin estos productos',
          cancelText: 'Revisar mi carrito'
        });

        if (!confirmar) {
          notify('Revisa tu carrito antes de continuar', 'info', 3000);
          return;
        }

        // Eliminar productos sin stock del carrito
        for (const productoAgotado of verificacion.productosAgotados) {
          eliminarDelCarrito(productoAgotado.id);
        }

        // Si se eliminaron todos los productos, no continuar
        const productosRestantes = carrito.filter(item => 
          !verificacion.productosAgotados.some(p => p.id === item.id)
        );
        
        if (productosRestantes.length === 0) {
          notify('No hay productos disponibles para comprar', 'error', 3000);
          setTimeout(() => navigate('/carrito'), 1000);
          return;
        }

        // Continuar con los productos restantes
        notify(`Continuando con ${productosRestantes.length} producto(s) disponible(s)`, 'success', 2000);
      }

      // 💳 PASO 2: Simular procesamiento de pago
      notify('Procesando pago...', 'info', 2000);
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simular probabilidad de éxito (90% éxito, 10% fallo)
      const exito = Math.random() > 0.1;

      if (exito) {
        // Preparar datos de la orden
        const subtotalCalculado = calcularTotal();
        const orden = {
          id: Date.now(),
          fecha: new Date().toISOString(),
          productos: carrito,
          datosEnvio,
          subtotal: subtotalCalculado,
          total: subtotalCalculado + (subtotalCalculado >= 50000 ? 0 : 5000),
          estado: 'completada',
          esInvitado: !estaLogueado,
          usuarioId: usuario?.usuario_id || null
        };
        
        // Intentar guardar en el backend
        try {
          if (estaLogueado) {
            await crearOrden(orden);
            // Orden guardada exitosamente en backend
          } else {
            // Usuario invitado, guardar solo en localStorage
          }
        } catch (_) {
          notify('Orden guardada localmente (backend no disponible)', 'warning', 3000);
        }

        // Siempre guardar en localStorage como respaldo
        const ordenesGuardadas = JSON.parse(localStorage.getItem('ordenes') || '[]');
        ordenesGuardadas.push(orden);
        localStorage.setItem('ordenes', JSON.stringify(ordenesGuardadas));

        // Guardar la última orden para CompraExitosa
        localStorage.setItem('ultimaOrden', JSON.stringify(orden));

        // Vaciar carrito
        vaciarCarrito();

        notify('¡Compra realizada con éxito! 🎉', 'success', 2000);

        // Redirigir a página de éxito después de un momento
        setTimeout(() => {
          navigate('/compra-exitosa', { state: { orden }, replace: true });
        }, 500);
      } else {
        // Redirigir a página de error
        navigate('/error-pago');
      }
    } catch (_) {
      notify('Error al verificar disponibilidad. Intenta nuevamente.', 'error', 4000);
    } finally {
      setProcesando(false);
    }
  };

  const subtotal = calcularTotal();
  const costoEnvio = subtotal >= 50000 ? 0 : 5000;
  const total = subtotal + costoEnvio;

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 display-4 fw-bold">🛍️ Finalizar Compra</h1>

      {/* Indicador de usuario */}
      {estaLogueado ? (
        <div className="alert alert-success d-flex align-items-center mb-4" style={{ maxWidth: '1200px', margin: '0 auto 2rem' }}>
          <span className="fs-4 me-3">✅</span>
          <div className="flex-grow-1">
            <strong>Comprando como: {usuario?.nombre}</strong>
            <p className="mb-0 small">Tus datos han sido pre-cargados. Puedes editarlos si lo necesitas.</p>
          </div>
          {!modoEdicion && (
            <button 
              onClick={() => setModoEdicion(true)}
              className="btn btn-sm btn-outline-success"
            >
              ✏️ Editar Datos
            </button>
          )}
        </div>
      ) : (
        <div className="alert alert-info d-flex align-items-center mb-4" style={{ maxWidth: '1200px', margin: '0 auto 2rem' }}>
          <span className="fs-4 me-3">🛍️</span>
          <div className="flex-grow-1">
            <strong>Comprando como invitado</strong>
            <p className="mb-0 small">
              Completa tus datos de envío. 
              <span className="ms-2">
                ¿Ya tienes cuenta? <a href="/iniciar-sesion" className="alert-link">Inicia sesión</a>
              </span>
            </p>
          </div>
        </div>
      )}

        <div className="row g-4">
          {/* Formulario de envío */}
          <div className="col-lg-7">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h3 className="card-title mb-4 fw-bold">📦 Información de Envío</h3>
                
                  {estaLogueado && (Array.isArray(usuario?.direcciones) && usuario.direcciones.length > 0 ? (
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Direcciones guardadas</label>
                      <div className="list-group mb-2">
                        {usuario.direcciones.map(d => (
                          <label key={d.id} className={`list-group-item list-group-item-action d-flex justify-content-between align-items-start ${selectedDireccionId === d.id ? 'active' : ''}`}>
                            <div>
                              <div className="fw-semibold">{d.etiqueta || 'Dirección'}</div>
                              <div className="small">{d.direccion} · {d.ciudad} · {d.region}</div>
                            </div>
                            <div>
                              <input type="radio" name="selectedAddress" checked={selectedDireccionId === d.id} onChange={() => { setSelectedDireccionId(d.id); setDireccionFuente('perfil'); setModoEdicion(false); setDatosEnvio(prev => ({ ...prev, nombreCompleto: usuario.nombre || '', email: usuario.email || '', telefono: usuario.telefono || '', direccion: d.direccion || '', ciudad: d.ciudad || '', region: d.region || '' })); }} />
                            </div>
                          </label>
                        ))}
                      </div>
                      <div className="btn-group" role="group">
                        <button type="button" className={`btn btn-outline-secondary ${direccionFuente === 'perfil' ? 'active' : ''}`} onClick={() => { setDireccionFuente('perfil'); setModoEdicion(false); if (selectedDireccionId) {
                          const sel = usuario.direcciones.find(x => x.id === selectedDireccionId);
                          if (sel) setDatosEnvio(prev => ({ ...prev, nombreCompleto: usuario.nombre || '', email: usuario.email || '', telefono: usuario.telefono || '', direccion: sel.direccion || '', ciudad: sel.ciudad || '', region: sel.region || '' }));
                        }}}>Usar dirección seleccionada</button>
                        <button type="button" className={`btn btn-outline-secondary ${direccionFuente === 'nueva' ? 'active' : ''}`} onClick={() => { setDireccionFuente('nueva'); setModoEdicion(true); }}>Ingresar nueva dirección</button>
                      </div>
                      <div className="form-text mt-2">Puedes elegir una dirección guardada o ingresar una nueva para esta compra.</div>
                    </div>
                  ) : (
                    // Si no hay direcciones guardadas, mostrar opción simple
                    usuario?.direccion && (
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Dirección Guardada</label>
                        <div className="d-flex gap-2 align-items-center">
                          <div className="flex-grow-1 small text-muted">{usuario.direccion} · {usuario.ciudad || ''} · {usuario.region || ''}</div>
                          <div className="btn-group">
                            <button className={`btn btn-outline-secondary ${direccionFuente === 'perfil' ? 'active' : ''}`} onClick={() => { setDireccionFuente('perfil'); setModoEdicion(false); setDatosEnvio(prev => ({ ...prev, nombreCompleto: usuario.nombre || '', email: usuario.email || '', telefono: usuario.telefono || '', direccion: usuario.direccion || '', ciudad: usuario.ciudad || '', region: usuario.region || '' })); }}>Usar</button>
                            <button className={`btn btn-outline-secondary ${direccionFuente === 'nueva' ? 'active' : ''}`} onClick={() => { setDireccionFuente('nueva'); setModoEdicion(true); }}>Ingresar nueva</button>
                          </div>
                        </div>
                      </div>
                    )
                  ))}

                  <form onSubmit={procesarPago}>
                  {/* Datos personales */}
                  <div className="row g-3 mb-4">
                    <div className="col-12">
                      <label className="form-label fw-bold">Nombre Completo *</label>
                      <input
                        type="text"
                        name="nombreCompleto"
                        className="form-control"
                        value={datosEnvio.nombreCompleto}
                        onChange={manejarCambio}
                        readOnly={estaLogueado && !modoEdicion && datosEnvio.nombreCompleto}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Email *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={datosEnvio.email}
                        onChange={manejarCambio}
                        readOnly={estaLogueado && !modoEdicion && datosEnvio.email}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Teléfono *</label>
                      <input
                        type="tel"
                        name="telefono"
                        className="form-control"
                        value={datosEnvio.telefono}
                        onChange={manejarCambio}
                        placeholder={estaLogueado ? '' : '+56 9 1234 5678'}
                        required
                      />
                    </div>
                  </div>

                  {/* Dirección */}
                  <div className="row g-3 mb-4">
                    <div className="col-12">
                      <label className="form-label fw-bold">Dirección *</label>
                      <input
                        type="text"
                        name="direccion"
                        className={`form-control ${erroresEnvio.direccion ? 'is-invalid' : ''}`}
                        placeholder="Calle, número, departamento"
                        value={datosEnvio.direccion}
                        onChange={manejarCambio}
                        required
                      />
                      {erroresEnvio.direccion && <div className="invalid-feedback">{erroresEnvio.direccion}</div>}
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Ciudad *</label>
                      <input
                        type="text"
                        name="ciudad"
                        className={`form-control ${erroresEnvio.ciudad ? 'is-invalid' : ''}`}
                        value={datosEnvio.ciudad}
                        onChange={manejarCambio}
                        required
                      />
                      {erroresEnvio.ciudad && <div className="invalid-feedback">{erroresEnvio.ciudad}</div>}
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Región *</label>
                      <select
                        name="region"
                        className={`form-select ${erroresEnvio.region ? 'is-invalid' : ''}`}
                        value={datosEnvio.region}
                        onChange={manejarCambio}
                        required
                      >
                        <option value="">Seleccionar...</option>
                        <option value="Metropolitana">Metropolitana</option>
                        <option value="Valparaíso">Valparaíso</option>
                        <option value="Biobío">Biobío</option>
                        <option value="Araucanía">Araucanía</option>
                        <option value="Los Lagos">Los Lagos</option>
                      </select>
                    </div>
                    {estaLogueado && direccionFuente === 'nueva' && (
                      <div className="col-12">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="guardarEnCuenta" checked={guardarEnCuenta} onChange={(e) => setGuardarEnCuenta(e.target.checked)} />
                          <label className="form-check-label" htmlFor="guardarEnCuenta">Guardar esta dirección en mi cuenta</label>
                        </div>
                      </div>
                    )}
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Código Postal</label>
                      <input
                        type="text"
                        name="codigoPostal"
                        className="form-control"
                        value={datosEnvio.codigoPostal}
                        onChange={manejarCambio}
                      />
                    </div>
                  </div>

                  {/* Método de pago */}
                  <div className="mb-4">
                    <h4 className="h5 mb-3">💳 Método de Pago</h4>
                    <div className="d-grid gap-2">
                      <label className="btn btn-outline-primary text-start">
                        <input
                          type="radio"
                          name="metodoPago"
                          value="tarjeta"
                          checked={datosEnvio.metodoPago === 'tarjeta'}
                          onChange={manejarCambio}
                          className="me-2"
                        />
                        💳 Tarjeta de Crédito/Débito
                      </label>
                      <label className="btn btn-outline-primary text-start">
                        <input
                          type="radio"
                          name="metodoPago"
                          value="transferencia"
                          checked={datosEnvio.metodoPago === 'transferencia'}
                          onChange={manejarCambio}
                          className="me-2"
                        />
                        🏦 Transferencia Bancaria
                      </label>
                    </div>
                  </div>

                  {/* Botón de pago */}
                  <button
                    type="submit"
                    className="btn btn-success btn-lg w-100"
                    disabled={procesando}
                  >
                    {procesando ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Procesando pago...
                      </>
                    ) : (
                      `Pagar ${formatearPrecio(total)}`
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Resumen de la orden */}
          <div className="col-lg-5">
            <div className="card shadow-sm border-0 position-sticky" style={{ top: '100px' }}>
              <div className="card-body p-4">
                <h3 className="card-title mb-4 fw-bold">📋 Resumen de Compra</h3>

                {/* Lista de productos */}
                <div className="mb-4">
                  {carrito.map((item) => (
                    <div key={item.id} className="d-flex gap-3 mb-3 pb-3 border-bottom">
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{item.nombre}</h6>
                        <small className="text-muted">Cantidad: {item.cantidad}</small>
                      </div>
                      <div className="text-end">
                        <strong>{formatearPrecio(item.precio * item.cantidad)}</strong>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totales */}
                <div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>{formatearPrecio(subtotal)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Envío:</span>
                    <span className={costoEnvio === 0 ? 'text-success fw-bold' : ''}>
                      {costoEnvio === 0 ? '¡GRATIS!' : formatearPrecio(costoEnvio)}
                    </span>
                  </div>
                  {costoEnvio === 0 && (
                    <div className="alert alert-success py-2 small">
                      🎉 ¡Envío gratis por compras sobre $50.000!
                    </div>
                  )}
                  <hr />
                  <div className="d-flex justify-content-between fs-5 fw-bold">
                    <span>Total:</span>
                    <span className="text-success">{formatearPrecio(total)}</span>
                  </div>
                </div>

                {/* Seguridad */}
                <div className="alert alert-info mt-4 small">
                  🔒 Pago seguro. Tus datos están protegidos.
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Checkout;
