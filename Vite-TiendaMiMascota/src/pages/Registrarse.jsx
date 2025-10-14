/**
 * PÁGINA: REGISTRARSE
 * Formulario de registro de nuevos usuarios
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAutenticacion from '../hooks/useAutenticacion';
import '../styles/pages/Registrarse.css';

function Registrarse() {
  const navegar = useNavigate();
  const { registrarse } = useAutenticacion();
  
  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [aceptoTerminos, setAceptoTerminos] = useState(false);

  /**
   * Manejar envío del formulario
   */
  const manejarEnvio = (evento) => {
    evento.preventDefault();
    
    // Validación simple de términos
    if (!aceptoTerminos) {
      alert('❌ Debes aceptar los términos y condiciones');
      return;
    }
    
    // Intentar registrarse
    const exitoso = registrarse(nombre, correo, contrasena, confirmarContrasena);
    
    if (exitoso) {
      alert('✅ Registro exitoso. ¡Bienvenido!');
      navegar('/'); // Ir a inicio
    }
  };

  return (
    <div className="pagina-registrarse">
      <div className="registrarse-contenedor">
        {/* Lado izquierdo: Formulario */}
        <div className="registrarse-formulario">
          <h2>Crear Cuenta</h2>
          <p className="registrarse-subtitulo">
            Regístrate para empezar a comprar
          </p>

          <form onSubmit={manejarEnvio}>
            {/* Nombre completo */}
            <div className="grupo-formulario">
              <label htmlFor="nombre">Nombre Completo</label>
              <input
                type="text"
                id="nombre"
                placeholder="Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            {/* Correo electrónico */}
            <div className="grupo-formulario">
              <label htmlFor="correo">Correo Electrónico</label>
              <input
                type="email"
                id="correo"
                placeholder="tu@correo.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            {/* Contraseña */}
            <div className="grupo-formulario">
              <label htmlFor="contrasena">Contraseña</label>
              <div className="campo-contrasena">
                <input
                  type={mostrarContrasena ? 'text' : 'password'}
                  id="contrasena"
                  placeholder="Mínimo 6 caracteres"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  className="boton-mostrar-contrasena"
                  onClick={() => setMostrarContrasena(!mostrarContrasena)}
                >
                  {mostrarContrasena ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Confirmar contraseña */}
            <div className="grupo-formulario">
              <label htmlFor="confirmar-contrasena">Confirmar Contraseña</label>
              <input
                type={mostrarContrasena ? 'text' : 'password'}
                id="confirmar-contrasena"
                placeholder="Repite tu contraseña"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
                required
                minLength="6"
              />
            </div>

            {/* Checkbox términos */}
            <div className="grupo-checkbox">
              <label className="etiqueta-checkbox">
                <input
                  type="checkbox"
                  checked={aceptoTerminos}
                  onChange={(e) => setAceptoTerminos(e.target.checked)}
                  required
                />
                <span>
                  Acepto los{' '}
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    términos y condiciones
                  </a>
                </span>
              </label>
            </div>

            {/* Botón enviar */}
            <button type="submit" className="boton-registrarse">
              Crear Cuenta
            </button>
          </form>

          {/* Link a iniciar sesión */}
          <div className="registrarse-enlace-login">
            <p>
              ¿Ya tienes cuenta?{' '}
              <Link to="/iniciar-sesion">Inicia sesión aquí</Link>
            </p>
          </div>
        </div>

        {/* Lado derecho: Información */}
        <div className="registrarse-informacion">
          <h1>🐾 Únete a Mi Mascota</h1>
          <p>Crea tu cuenta y disfruta de:</p>
          
          <ul className="lista-beneficios">
            <li>
              <span className="icono">✓</span>
              <div>
                <strong>Compras Rápidas</strong>
                <p>Guarda tus direcciones y datos</p>
              </div>
            </li>
            <li>
              <span className="icono">✓</span>
              <div>
                <strong>Historial de Pedidos</strong>
                <p>Revisa todas tus compras</p>
              </div>
            </li>
            <li>
              <span className="icono">✓</span>
              <div>
                <strong>Ofertas Exclusivas</strong>
                <p>Descuentos solo para miembros</p>
              </div>
            </li>
            <li>
              <span className="icono">✓</span>
              <div>
                <strong>Envío Gratis</strong>
                <p>En tu primera compra</p>
              </div>
            </li>
          </ul>

          <div className="registrarse-ilustracion">
            <img src="/images/registro-mascota.jpg" alt="Mascota feliz" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registrarse;