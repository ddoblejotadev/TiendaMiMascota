import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useForm } from '../hooks/useForm'
import { notify } from '../components/ui/Notification'
import '../styles/global.css'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  
  const { values, errors, handleChange, handleSubmit, setError } = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: (values) => {
      const errors = {}
      
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
      
      return errors
    },
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const result = await login(values.email, values.password)
        if (result.success) {
          notify('Inicio de sesión exitoso', 'success')
          navigate('/')
        } else {
          setError('email', result.message || 'Credenciales incorrectas')
          notify(result.message || 'Error al iniciar sesión', 'error')
        }
      } catch (error) {
        notify('Error al iniciar sesión', 'error')
        setError('email', 'Error al iniciar sesión')
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
            <h1>Iniciar Sesión</h1>
            <p className="auth-subtitle">Ingresa a tu cuenta</p>

            <form onSubmit={handleSubmit} className="auth-form">
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
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Recordarme</span>
                </label>
                <Link to="/forgot-password" className="link">¿Olvidaste tu contraseña?</Link>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                ¿No tienes cuenta? <Link to="/register" className="link">Regístrate aquí</Link>
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

export default Login