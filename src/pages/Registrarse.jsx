/**
 * PÁGINA: REGISTRARSE
 * Formulario de registro de nuevos usuarios - 100% Bootstrap
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAutenticacion from '../hooks/useAutenticacion';
import useRutValidation from '../hooks/useRutValidation';
import { notify } from '../components/ui/notificationHelper';

function Registrarse() {
  const navegar = useNavigate();
  const { registrarse } = useAutenticacion();
  const { rut, error: errorRut, validar: validarRut, formatear: formatearRut, esValido: esRutValido } = useRutValidation();
  
  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [aceptoTerminos, setAceptoTerminos] = useState(false);
  const [role, setRole] = useState('user');
  const [mostrarOpcionesAvanzadas, setMostrarOpcionesAvanzadas] = useState(false);

  /**
   * Manejar envío del formulario
   */
  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    
    // Validación de términos
    if (!aceptoTerminos) {
      notify('Debes aceptar los términos y condiciones', 'warning', 3000);
      return;
    }

    // Validar RUT si fue ingresado
    if (rut && rut.trim() !== '' && !esRutValido(rut)) {
      notify('El RUT ingresado no es válido', 'error', 3000);
      return;
    }
    
    // Preparar datos del usuario
    const datosUsuario = {
      nombre,
      email: correo,
      password: contrasena,
      telefono: null,
      direccion: null,
      run: rut && rut.trim() !== '' ? rut : null // Opcional
    };

    // Validar contraseñas
    if (contrasena !== confirmarContrasena) {
      notify('Las contraseñas no coinciden', 'error', 3000);
      return;
    }
    
    // Intentar registrarse contra el backend
    const exitoso = await registrarse(datosUsuario);
    
    if (exitoso) {
      notify('Registro exitoso. ¡Bienvenido!', 'success', 2000);
      
      // Recargar la página para que todos los componentes vean el nuevo estado
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    }
    // Si falla, el error específico ya se muestra desde el hook useAutenticacion
  };

  return (
    <div className="container py-5" style={{ minHeight: '80vh' }}>
      <div className="row g-0 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Lado izquierdo: Formulario */}
        <div className="col-lg-7 bg-white p-5">
          <div className="mx-auto" style={{ maxWidth: '400px' }}>
            <h2 className="fw-bold mb-2">Crear Cuenta</h2>
            <p className="text-muted mb-4">Regístrate para empezar a comprar</p>

            <form onSubmit={manejarEnvio}>
              {/* Nombre completo */}
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label fw-semibold">Nombre Completo</label>
                <input
                  type="text"
                  id="nombre"
                  className="form-control form-control-lg"
                  placeholder="Juan Pérez"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              {/* RUT (Opcional) */}
              <div className="mb-3">
                <label htmlFor="rut" className="form-label fw-semibold">
                  RUT <span className="text-muted fw-normal">(Opcional)</span>
                </label>
                <input
                  type="text"
                  id="rut"
                  name="run"
                  className={`form-control form-control-lg ${errorRut ? 'is-invalid' : ''} ${rut && !errorRut && rut.trim() !== '' ? 'is-valid' : ''}`}
                  placeholder="12.345.678-K"
                  value={rut}
                  onChange={(e) => validarRut(e.target.value)}
                  onBlur={() => formatearRut()}
                  maxLength="12"
                />
                {errorRut && (
                  <div className="invalid-feedback d-block">
                    {errorRut}
                  </div>
                )}
                <div className="form-text">
                  Formato: 12.345.678-K (opcional)
                </div>
              </div>

              {/* Correo electrónico */}
              <div className="mb-3">
                <label htmlFor="correo" className="form-label fw-semibold">Correo Electrónico</label>
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

              {/* Contraseña */}
              <div className="mb-3">
                <label htmlFor="contrasena" className="form-label fw-semibold">Contraseña</label>
                <div className="input-group">
                  <input
                    type={mostrarContrasena ? 'text' : 'password'}
                    id="contrasena"
                    className="form-control form-control-lg"
                    placeholder="Mínimo 6 caracteres"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setMostrarContrasena(!mostrarContrasena)}
                  >
                    {mostrarContrasena ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Confirmar contraseña */}
              <div className="mb-3">
                <label htmlFor="confirmar-contrasena" className="form-label fw-semibold">Confirmar Contraseña</label>
                <input
                  type={mostrarContrasena ? 'text' : 'password'}
                  id="confirmar-contrasena"
                  className="form-control form-control-lg"
                  placeholder="Repite tu contraseña"
                  value={confirmarContrasena}
                  onChange={(e) => setConfirmarContrasena(e.target.value)}
                  required
                  minLength="6"
                />
              </div>

              {/* Checkbox términos */}
              <div className="mb-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="terminos"
                    checked={aceptoTerminos}
                    onChange={(e) => setAceptoTerminos(e.target.checked)}
                    required
                  />
                  <label className="form-check-label" htmlFor="terminos">
                    Acepto los{' '}
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-decoration-none">
                      términos y condiciones
                    </a>
                  </label>
                </div>
              </div>

              {/* Opciones avanzadas para tests (ocultas por defecto) */}
              <div className="mb-3">
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" id="optAvanzadas" checked={mostrarOpcionesAvanzadas} onChange={(e) => setMostrarOpcionesAvanzadas(e.target.checked)} />
                  <label className="form-check-label" htmlFor="optAvanzadas">Mostrar opciones avanzadas</label>
                </div>

                {mostrarOpcionesAvanzadas && (
                  <>
                    <label htmlFor="role" className="form-label fw-semibold">Tipo de cuenta</label>
                    <select id="role" className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                      <option value="user">Usuario</option>
                      <option value="admin">Administrador</option>
                    </select>
                    <div className="form-text">Selecciona 'Administrador' solo si ésta es una cuenta de administrador (solo para pruebas).</div>
                  </>
                )}
              </div>

              {/* Botón enviar */}
              <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold mb-3">
                Crear Cuenta
              </button>
            </form>

            {/* Link a iniciar sesión */}
            <div className="text-center">
              <p className="text-muted mb-0">
                ¿Ya tienes cuenta?{' '}
                <Link to="/iniciar-sesion" className="text-decoration-none fw-semibold">
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Lado derecho: Información decorativa */}
        <div className="col-lg-5 d-none d-lg-flex flex-column justify-content-center text-white p-5" 
             style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <h1 className="display-5 fw-bold mb-3">🐾 Únete a Mi Mascota</h1>
          <p className="lead mb-4">Crea tu cuenta y disfruta de:</p>
          
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-start gap-3">
              <div className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center" 
                   style={{ minWidth: '50px', height: '50px' }}>
                <span className="fs-4 fw-bold">✓</span>
              </div>
              <div>
                <h5 className="mb-1 fw-bold">Compras Rápidas</h5>
                <p className="text-white-50 mb-0 small">Guarda tus direcciones y datos</p>
              </div>
            </div>
            <div className="d-flex align-items-start gap-3">
              <div className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center" 
                   style={{ minWidth: '50px', height: '50px' }}>
                <span className="fs-4 fw-bold">✓</span>
              </div>
              <div>
                <h5 className="mb-1 fw-bold">Historial de Pedidos</h5>
                <p className="text-white-50 mb-0 small">Revisa todas tus compras</p>
              </div>
            </div>
            <div className="d-flex align-items-start gap-3">
              <div className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center" 
                   style={{ minWidth: '50px', height: '50px' }}>
                <span className="fs-4 fw-bold">✓</span>
              </div>
              <div>
                <h5 className="mb-1 fw-bold">Ofertas Exclusivas</h5>
                <p className="text-white-50 mb-0 small">Descuentos solo para miembros</p>
              </div>
            </div>
            <div className="d-flex align-items-start gap-3">
              <div className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center" 
                   style={{ minWidth: '50px', height: '50px' }}>
                <span className="fs-4 fw-bold">✓</span>
              </div>
              <div>
                <h5 className="mb-1 fw-bold">Envío Gratis</h5>
                <p className="text-white-50 mb-0 small">En tu primera compra</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registrarse;