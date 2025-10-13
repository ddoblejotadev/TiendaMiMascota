import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useForm } from '../hooks/useForm'
import { notify } from '../components/ui/Notification'
import '../styles/global.css'

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [loading, setLoading] = useState(false)
  
  const { values, errors, handleChange, handleSubmit, setError } = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      acceptTerms: false
    },
    validate: (values) => {
      const errors = {}
      
      if (!values.name) {
        errors.name = 'El nombre es requerido'
      } else if (values.name.length < 3) {
        errors.name = 'El nombre debe tener al menos 3 caracteres'
      }
      
      if (!values.email) {
        errors.email = 'El correo es requerido'
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'El correo no es válido'
      }
      
      if (!values.password) {
        errors.password = 'La contraseña es requerida'
      } else if (values.password.length < 6) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres'
      }
      
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirma tu contraseña'
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Las contraseñas no coinciden'
      }
      
      if (values.phone && !/^\+?[\d\s-]{8,}$/.test(values.phone)) {
        errors.phone = 'El teléfono no es válido'
      }
      
      if (!values.acceptTerms) {
        errors.acceptTerms = 'Debes aceptar los términos y condiciones'
      }
      
      return errors
    },
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const result = await register({
          name: values.name,
          email: values.email,
          password: values.password,
          phone: values.phone
        })
        
        if (result.success) {
          notify('Registro exitoso. Bienvenido!', 'success')
          navigate('/')
        } else {
          setError('email', result.message || 'Error al registrar')
          notify(result.message || 'Error al registrar', 'error')
        }
      } catch (error) {
        notify('Error al registrar usuario', 'error')
        setError('email', 'Error al registrar')
      } finally {
        setLoading(false)
      }
    }
  })

  return (
    <div className="auth-page">
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <img src="/src/assets/logo1.png" alt="Mi Mascota Logo" />
          </Link>
          <nav>
            <Link to="/">Inicio</Link>
            <Link to="/products">Productos</Link>
            <Link to="/about">Nosotros</Link>
            <Link to="/contact">Contacto</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <div className="auth-container">
          <div className="auth-card">
            <h1>Crear Cuenta</h1>
            <p className="auth-subtitle">Regístrate para comenzar a comprar</p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="name">Nombre Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Juan Pérez"
                  autoComplete="name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="tu@email.com"
                  autoComplete="email"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono (opcional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="+56 9 1234 5678"
                  autoComplete="tel"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'error' : ''}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={values.acceptTerms}
                    onChange={handleChange}
                  />
                  <span>
                    Acepto los <Link to="/terms" className="link">términos y condiciones</Link>
                  </span>
                </label>
                {errors.acceptTerms && <span className="error-message">{errors.acceptTerms}</span>}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? 'Registrando...' : 'Crear Cuenta'}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                ¿Ya tienes cuenta? <Link to="/login" className="link">Inicia sesión aquí</Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Mi Mascota. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default Register