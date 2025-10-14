/**
 * PÁGINA: INICIAR SESIÓN
 * Formulario de login
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAutenticacion from '../hooks/useAutenticacion';
import '../styles/pages/IniciarSesion.css';

function IniciarSesion() {
  const navigate = useNavigate();
  const { iniciarSesion } = useAutenticacion();
  
  // Estados del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);

  /**
   * Manejar envío del formulario
   */
  const manejarSubmit = (e) => {
    e.preventDefault();
    
    // Intentar iniciar sesión
    const exito = iniciarSesion(email, password);
    
    if (exito) {
      alert('✅ Sesión iniciada con éxito');
      navigate('/'); // Ir a inicio
    }
  };

  return (
    <div className="pagina-login">
      <div className="login-contenedor">
        {/* Lado izquierdo: Imagen/Info */}
        <div className="login-info">
          <h1>🐾 Mi Mascota</h1>
          <p>Tu tienda de confianza para mascotas</p>
          <div className="login-ilustracion">
            <img src="/images/login-mascota.jpg" alt="Mascota feliz" />
          </div>
        </div>

        {/* Lado derecho: Formulario */}
        <div className="login-formulario">
          <h2>Iniciar Sesión</h2>
          <p className="login-subtitulo">
            Ingresa tus datos para continuar
          </p>

          <form onSubmit={manejarSubmit}>
            {/* Email */}
            <div className="form-grupo">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Contraseña */}
            <div className="form-grupo">
              <label htmlFor="password">Contraseña</label>
              <div className="input-password">
                <input
                  type={mostrarPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="boton-ver-password"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                >
                  {mostrarPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Recordar sesión */}
            <div className="form-opciones">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Recordarme</span>
              </label>
              <a href="#" className="link-olvidaste">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Botón submit */}
            <button type="submit" className="boton-login">
              Iniciar Sesión
            </button>
          </form>

          {/* Link a registro */}
          <div className="login-registro">
            <p>
              ¿No tienes cuenta?{' '}
              <Link to="/registrarse">Regístrate aquí</Link>
            </p>
          </div>

          {/* Separador */}
          <div className="login-separador">
            <span>O continúa con</span>
          </div>

          {/* Botones redes sociales */}
          <div className="login-redes">
            <button className="boton-red google">
              <img src="/images/google-icon.png" alt="Google" />
              Google
            </button>
            <button className="boton-red facebook">
              <img src="/images/facebook-icon.png" alt="Facebook" />
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IniciarSesion;