/**
 * PÁGINA: INICIAR SESIÓN
 * Formulario de login - 100% Bootstrap
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAutenticacion from '../hooks/useAutenticacion';

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
    <div className="container py-5" style={{ minHeight: '80vh' }}>
      <div className="row g-0 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Lado izquierdo: Info decorativa */}
        <div className="col-lg-5 d-none d-lg-flex flex-column justify-content-center text-white p-5" 
             style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <h1 className="display-4 fw-bold mb-3">🐾 Mi Mascota</h1>
          <p className="lead mb-4">Tu tienda de confianza para mascotas</p>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-white bg-opacity-25 rounded-circle p-3">
                <span className="fs-3">🛍️</span>
              </div>
              <div>
                <h5 className="mb-1">Productos de calidad</h5>
                <small className="text-white-50">Para tu mejor amigo</small>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div className="bg-white bg-opacity-25 rounded-circle p-3">
                <span className="fs-3">🚚</span>
              </div>
              <div>
                <h5 className="mb-1">Envío rápido</h5>
                <small className="text-white-50">A todo Chile</small>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div className="bg-white bg-opacity-25 rounded-circle p-3">
                <span className="fs-3">💳</span>
              </div>
              <div>
                <h5 className="mb-1">Pago seguro</h5>
                <small className="text-white-50">100% protegido</small>
              </div>
            </div>
          </div>
        </div>

        {/* Lado derecho: Formulario */}
        <div className="col-lg-7 bg-white p-5">
          <div className="mx-auto" style={{ maxWidth: '400px' }}>
            <h2 className="fw-bold mb-2">Iniciar Sesión</h2>
            <p className="text-muted mb-4">Ingresa tus datos para continuar</p>

            <form onSubmit={manejarSubmit}>
              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Contraseña */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">Contraseña</label>
                <div className="input-group">
                  <input
                    type={mostrarPassword ? 'text' : 'password'}
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                  >
                    {mostrarPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Recordar sesión */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="recordar" />
                  <label className="form-check-label" htmlFor="recordar">
                    Recordarme
                  </label>
                </div>
                <a href="#" className="text-decoration-none small">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Botón submit */}
              <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold mb-3">
                Iniciar Sesión
              </button>
            </form>

            {/* Link a registro */}
            <div className="text-center mb-3">
              <p className="text-muted mb-0">
                ¿No tienes cuenta?{' '}
                <Link to="/registrarse" className="text-decoration-none fw-semibold">
                  Regístrate aquí
                </Link>
              </p>
            </div>

            {/* Separador */}
            <div className="position-relative my-4">
              <hr />
              <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">
                O continúa con
              </span>
            </div>

            {/* Botones redes sociales */}
            <div className="d-grid gap-2">
              <button className="btn btn-outline-secondary btn-lg d-flex align-items-center justify-content-center gap-2">
                <span className="fw-bold">G</span> Google
              </button>
              <button className="btn btn-outline-primary btn-lg d-flex align-items-center justify-content-center gap-2">
                <span className="fw-bold">f</span> Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IniciarSesion;