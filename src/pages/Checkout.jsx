/**
 * PÁGINA DE CHECKOUT - PROCESO DE PAGO
 * Vista donde el cliente introduce datos de envío (Requisito del PDF - Figura 6)
 * Auto-completa si el usuario está logueado
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCarrito from '../hooks/useCarrito';
import { formatearPrecio } from '../util/formatters';
import { verificarStockCarrito } from '../util/constants';
import { notify } from '../components/ui/notificationHelper';
import { confirmDialog } from '../components/ui/confirmDialogHelper';

function Checkout() {
  const navigate = useNavigate();
  const { carrito, vaciarCarrito, calcularTotal, eliminarDelCarrito } = useCarrito();
  
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

  // Auto-completar con datos del usuario logueado
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    if (usuarioGuardado) {
      try {
        const usuario = JSON.parse(usuarioGuardado);
        setDatosEnvio(prev => ({
          ...prev,
          nombreCompleto: `${usuario.nombre || ''} ${usuario.apellidos || ''}`.trim(),
          email: usuario.email || '',
          telefono: usuario.telefono || '',
          direccion: usuario.direccion || '',
          region: usuario.region || ''
        }));
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
      }
    }
  }, []);

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
        // Guardar orden en localStorage
        const orden = {
          id: Date.now(),
          fecha: new Date().toISOString(),
          productos: carrito,
          datosEnvio,
          subtotal: calcularTotal(),
          total: calcularTotal() + (calcularTotal() >= 50000 ? 0 : 5000),
          estado: 'completada'
        };
        
        const ordenesGuardadas = JSON.parse(localStorage.getItem('ordenes') || '[]');
        ordenesGuardadas.push(orden);
        localStorage.setItem('ordenes', JSON.stringify(ordenesGuardadas));

        // Vaciar carrito
        vaciarCarrito();

        // Redirigir a página de éxito
        navigate('/compra-exitosa', { state: { orden } });
      } else {
        // Redirigir a página de error
        navigate('/error-pago');
      }
    } catch (error) {
      console.error('Error al procesar pago:', error);
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
      <h1 className="text-center mb-5 display-4 fw-bold">🛒 Finalizar Compra</h1>

        <div className="row g-4">
          {/* Formulario de envío */}
          <div className="col-lg-7">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h3 className="card-title mb-4 fw-bold">📦 Información de Envío</h3>
                
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
                        className="form-control"
                        placeholder="Calle, número, departamento"
                        value={datosEnvio.direccion}
                        onChange={manejarCambio}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Ciudad *</label>
                      <input
                        type="text"
                        name="ciudad"
                        className="form-control"
                        value={datosEnvio.ciudad}
                        onChange={manejarCambio}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">Región *</label>
                      <select
                        name="region"
                        className="form-select"
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
