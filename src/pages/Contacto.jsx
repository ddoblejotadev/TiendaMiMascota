/**
 * PÁGINA: CONTACTO
 * Formulario de contacto y información de la tienda - 100% Bootstrap
 */

import { useState } from 'react';
import { notify } from '../components/ui/notificationHelper';

function Contacto() {
  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);

  /**
   * Manejar envío del formulario
   */
  const manejarEnvio = (evento) => {
    evento.preventDefault();
    
    // Validaciones básicas
    if (!nombre || !correo || !asunto || !mensaje) {
      notify('Por favor completa todos los campos', 'error', 3000);
      return;
    }

    if (!correo.includes('@')) {
      notify('Correo electrónico inválido', 'error', 3000);
      return;
    }

    // Simular envío
    setEnviando(true);
    
    setTimeout(() => {
      notify('Mensaje enviado con éxito. Te responderemos pronto.', 'success', 4000);
      
      // Limpiar formulario
      setNombre('');
      setCorreo('');
      setAsunto('');
      setMensaje('');
      setEnviando(false);
    }, 1500);
  };

  return (
    <div>
      {/* Encabezado */}
      <div className="bg-primary text-white text-center py-5" 
           style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="container">
          <h1 className="display-4 fw-bold mb-2">📞 Contáctanos</h1>
          <p className="lead">Estamos aquí para ayudarte con cualquier consulta</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          {/* IZQUIERDA: Formulario de contacto */}
          <div className="col-lg-7">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h2 className="h3 fw-bold mb-2">Envíanos un Mensaje</h2>
                <p className="text-muted mb-4">
                  Completa el formulario y nos pondremos en contacto contigo lo antes posible
                </p>

                <form onSubmit={manejarEnvio}>
                  {/* Nombre */}
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label fw-semibold">Nombre Completo *</label>
                    <input
                      type="text"
                      id="nombre"
                      className="form-control form-control-lg"
                      placeholder="Tu nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </div>

                  {/* Correo electrónico */}
                  <div className="mb-3">
                    <label htmlFor="correo" className="form-label fw-semibold">Correo Electrónico *</label>
                    <input
                      type="email"
                      id="correo"
                      className="form-control form-control-lg"
                      placeholder="tu@correo.com"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      required
                    />
                  </div>

                  {/* Asunto */}
                  <div className="mb-3">
                    <label htmlFor="asunto" className="form-label fw-semibold">Asunto *</label>
                    <select
                      id="asunto"
                      className="form-select form-select-lg"
                      value={asunto}
                      onChange={(e) => setAsunto(e.target.value)}
                      required
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="consulta-producto">Consulta sobre producto</option>
                      <option value="pedido">Estado de pedido</option>
                      <option value="devolucion">Devolución o cambio</option>
                      <option value="sugerencia">Sugerencia</option>
                      <option value="reclamo">Reclamo</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  {/* Mensaje */}
                  <div className="mb-3">
                    <label htmlFor="mensaje" className="form-label fw-semibold">Mensaje *</label>
                    <textarea
                      id="mensaje"
                      className="form-control form-control-lg"
                      placeholder="Escribe tu mensaje aquí..."
                      rows="6"
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                      required
                      maxLength="500"
                    ></textarea>
                    <small className="text-muted">
                      {mensaje.length} / 500 caracteres
                    </small>
                  </div>

                  {/* Botón enviar */}
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg w-100 fw-bold"
                    disabled={enviando}
                  >
                    {enviando ? '📤 Enviando...' : '📨 Enviar Mensaje'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* DERECHA: Información de contacto */}
          <div className="col-lg-5">
            <h2 className="h3 fw-bold mb-4">Información de Contacto</h2>

            {/* Dirección */}
            <div className="d-flex gap-3 mb-4">
              <div className="fs-2">📍</div>
              <div>
                <h3 className="h5 fw-bold mb-1">Dirección</h3>
                <p className="mb-0">Av. Principal 123, Local 45</p>
                <p className="text-muted">Santiago, Chile</p>
              </div>
            </div>

            {/* Teléfono */}
            <div className="d-flex gap-3 mb-4">
              <div className="fs-2">📱</div>
              <div>
                <h3 className="h5 fw-bold mb-1">Teléfono</h3>
                <p className="mb-0">+56 9 1234 5678</p>
                <p className="text-muted small">Lun - Vie: 9:00 - 18:00</p>
              </div>
            </div>

            {/* Email */}
            <div className="d-flex gap-3 mb-4">
              <div className="fs-2">✉️</div>
              <div>
                <h3 className="h5 fw-bold mb-1">Email</h3>
                <p className="mb-0">contacto@mimascota.cl</p>
                <p className="text-muted">ventas@mimascota.cl</p>
              </div>
            </div>

            {/* Horario */}
            <div className="d-flex gap-3 mb-4">
              <div className="fs-2">🕐</div>
              <div>
                <h3 className="h5 fw-bold mb-2">Horario de Atención</h3>
                <p className="mb-1"><strong>Lunes a Viernes:</strong> 9:00 - 18:00</p>
                <p className="mb-1"><strong>Sábados:</strong> 10:00 - 14:00</p>
                <p className="mb-0"><strong>Domingos:</strong> Cerrado</p>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="card bg-light border-0 p-4 mb-4">
              <h3 className="h5 fw-bold mb-3">Síguenos en Redes Sociales</h3>
              <div className="d-flex gap-3 fs-2">
                <a href="#" className="text-decoration-none" title="Facebook">📘</a>
                <a href="#" className="text-decoration-none" title="Instagram">📸</a>
                <a href="#" className="text-decoration-none" title="Twitter">🐦</a>
                <a href="#" className="text-decoration-none" title="WhatsApp">💬</a>
              </div>
            </div>

            {/* Mapa */}
            <div className="card border-0 bg-secondary bg-opacity-10 text-center p-5">
              <p className="display-1 mb-2">🗺️</p>
              <p className="fw-bold mb-1">Mapa de ubicación</p>
              <small className="text-muted">Av. Principal 123, Santiago</small>
            </div>
          </div>
        </div>

        {/* Sección de ayuda rápida */}
        <div className="mt-5 pt-5 border-top">
          <h2 className="display-5 fw-bold text-center mb-3">¿Necesitas Ayuda Rápida?</h2>
          <p className="text-center text-muted mb-5">Revisa nuestras preguntas frecuentes</p>
          
          <div className="row g-4">
            <div className="col-sm-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body p-4">
                  <div className="display-3 mb-3">📦</div>
                  <h3 className="h5 fw-bold mb-2">Envíos</h3>
                  <p className="text-muted small mb-3">Información sobre tiempos y costos de envío</p>
                  <a href="#" className="text-decoration-none fw-semibold">Ver más →</a>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body p-4">
                  <div className="display-3 mb-3">🔄</div>
                  <h3 className="h5 fw-bold mb-2">Devoluciones</h3>
                  <p className="text-muted small mb-3">Política de devoluciones y cambios</p>
                  <a href="#" className="text-decoration-none fw-semibold">Ver más →</a>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body p-4">
                  <div className="display-3 mb-3">💳</div>
                  <h3 className="h5 fw-bold mb-2">Pagos</h3>
                  <p className="text-muted small mb-3">Métodos de pago aceptados</p>
                  <a href="#" className="text-decoration-none fw-semibold">Ver más →</a>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body p-4">
                  <div className="display-3 mb-3">❓</div>
                  <h3 className="h5 fw-bold mb-2">FAQ</h3>
                  <p className="text-muted small mb-3">Preguntas frecuentes generales</p>
                  <a href="#" className="text-decoration-none fw-semibold">Ver más →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;