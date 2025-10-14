/**
 * PÁGINA: CONTACTO
 * Formulario de contacto y información de la tienda
 */

import { useState } from 'react';
import '../styles/pages/Contacto.css';

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
      alert('❌ Por favor completa todos los campos');
      return;
    }

    if (!correo.includes('@')) {
      alert('❌ Correo electrónico inválido');
      return;
    }

    // Simular envío
    setEnviando(true);
    
    setTimeout(() => {
      alert('✅ Mensaje enviado con éxito. Te responderemos pronto.');
      
      // Limpiar formulario
      setNombre('');
      setCorreo('');
      setAsunto('');
      setMensaje('');
      setEnviando(false);
    }, 1500);
  };

  return (
    <div className="pagina-contacto">
      {/* Encabezado */}
      <div className="contacto-encabezado">
        <h1>📞 Contáctanos</h1>
        <p>Estamos aquí para ayudarte con cualquier consulta</p>
      </div>

      <div className="contacto-contenido">
        {/* IZQUIERDA: Formulario de contacto */}
        <div className="contacto-formulario">
          <h2>Envíanos un Mensaje</h2>
          <p className="formulario-descripcion">
            Completa el formulario y nos pondremos en contacto contigo lo antes posible
          </p>

          <form onSubmit={manejarEnvio}>
            {/* Nombre */}
            <div className="grupo-formulario">
              <label htmlFor="nombre">Nombre Completo *</label>
              <input
                type="text"
                id="nombre"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            {/* Correo electrónico */}
            <div className="grupo-formulario">
              <label htmlFor="correo">Correo Electrónico *</label>
              <input
                type="email"
                id="correo"
                placeholder="tu@correo.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            {/* Asunto */}
            <div className="grupo-formulario">
              <label htmlFor="asunto">Asunto *</label>
              <select
                id="asunto"
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
            <div className="grupo-formulario">
              <label htmlFor="mensaje">Mensaje *</label>
              <textarea
                id="mensaje"
                placeholder="Escribe tu mensaje aquí..."
                rows="6"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                required
              ></textarea>
              <span className="contador-caracteres">
                {mensaje.length} / 500 caracteres
              </span>
            </div>

            {/* Botón enviar */}
            <button 
              type="submit" 
              className="boton-enviar"
              disabled={enviando}
            >
              {enviando ? '📤 Enviando...' : '📨 Enviar Mensaje'}
            </button>
          </form>
        </div>

        {/* DERECHA: Información de contacto */}
        <div className="contacto-informacion">
          <h2>Información de Contacto</h2>

          {/* Dirección */}
          <div className="info-item">
            <div className="info-icono">📍</div>
            <div className="info-texto">
              <h3>Dirección</h3>
              <p>Av. Principal 123, Local 45</p>
              <p>Santiago, Chile</p>
            </div>
          </div>

          {/* Teléfono */}
          <div className="info-item">
            <div className="info-icono">📱</div>
            <div className="info-texto">
              <h3>Teléfono</h3>
              <p>+56 9 1234 5678</p>
              <p className="horario">Lun - Vie: 9:00 - 18:00</p>
            </div>
          </div>

          {/* Email */}
          <div className="info-item">
            <div className="info-icono">✉️</div>
            <div className="info-texto">
              <h3>Email</h3>
              <p>contacto@mimascota.cl</p>
              <p>ventas@mimascota.cl</p>
            </div>
          </div>

          {/* Horario */}
          <div className="info-item">
            <div className="info-icono">🕐</div>
            <div className="info-texto">
              <h3>Horario de Atención</h3>
              <p><strong>Lunes a Viernes:</strong> 9:00 - 18:00</p>
              <p><strong>Sábados:</strong> 10:00 - 14:00</p>
              <p><strong>Domingos:</strong> Cerrado</p>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="redes-sociales">
            <h3>Síguenos en Redes Sociales</h3>
            <div className="iconos-redes">
              <a href="#" className="red-social facebook" title="Facebook">
                📘
              </a>
              <a href="#" className="red-social instagram" title="Instagram">
                📸
              </a>
              <a href="#" className="red-social twitter" title="Twitter">
                🐦
              </a>
              <a href="#" className="red-social whatsapp" title="WhatsApp">
                💬
              </a>
            </div>
          </div>

          {/* Mapa (simulado) */}
          <div className="mapa-contenedor">
            <div className="mapa-placeholder">
              <p>🗺️ Mapa de ubicación</p>
              <small>Av. Principal 123, Santiago</small>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de preguntas frecuentes */}
      <div className="contacto-ayuda">
        <h2>¿Necesitas Ayuda Rápida?</h2>
        <p>Revisa nuestras preguntas frecuentes</p>
        
        <div className="grid-ayuda">
          <div className="tarjeta-ayuda">
            <div className="ayuda-icono">📦</div>
            <h3>Envíos</h3>
            <p>Información sobre tiempos y costos de envío</p>
            <a href="#" className="enlace-ayuda">Ver más →</a>
          </div>

          <div className="tarjeta-ayuda">
            <div className="ayuda-icono">🔄</div>
            <h3>Devoluciones</h3>
            <p>Política de devoluciones y cambios</p>
            <a href="#" className="enlace-ayuda">Ver más →</a>
          </div>

          <div className="tarjeta-ayuda">
            <div className="ayuda-icono">💳</div>
            <h3>Pagos</h3>
            <p>Métodos de pago aceptados</p>
            <a href="#" className="enlace-ayuda">Ver más →</a>
          </div>

          <div className="tarjeta-ayuda">
            <div className="ayuda-icono">❓</div>
            <h3>FAQ</h3>
            <p>Preguntas frecuentes generales</p>
            <a href="#" className="enlace-ayuda">Ver más →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;