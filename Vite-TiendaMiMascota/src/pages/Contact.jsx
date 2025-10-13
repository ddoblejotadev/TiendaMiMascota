import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import { notify } from '../components/ui/Notification'
import '../styles/global.css'

function Contact() {
  const [loading, setLoading] = useState(false)
  
  const { values, errors, handleChange, handleSubmit, resetForm } = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    },
    validate: (values) => {
      const errors = {}
      
      if (!values.name) {
        errors.name = 'El nombre es requerido'
      }
      
      if (!values.email) {
        errors.email = 'El correo es requerido'
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'El correo no es válido'
      }
      
      if (!values.subject) {
        errors.subject = 'El asunto es requerido'
      }
      
      if (!values.message) {
        errors.message = 'El mensaje es requerido'
      } else if (values.message.length < 10) {
        errors.message = 'El mensaje debe tener al menos 10 caracteres'
      }
      
      return errors
    },
    onSubmit: async (values) => {
      setLoading(true)
      try {
        // Simular envío de formulario
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        console.log('Formulario enviado:', values)
        notify('Mensaje enviado exitosamente. Te contactaremos pronto!', 'success')
        resetForm()
      } catch (error) {
        notify('Error al enviar el mensaje', 'error')
      } finally {
        setLoading(false)
      }
    }
  })

  return (
    <div className="contact-page">
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <img src="/src/assets/logo1.png" alt="Mi Mascota Logo" />
          </Link>
          <nav>
            <Link to="/">Inicio</Link>
            <Link to="/products">Productos</Link>
            <Link to="/about">Nosotros</Link>
            <Link to="/contact" className="active">Contacto</Link>
            <Link to="/cart">Carrito</Link>
            <Link to="/login">Iniciar Sesión</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <div className="page-header">
          <h1>Contáctanos</h1>
          <p>Estamos aquí para ayudarte. Envíanos tu consulta o comentario</p>
        </div>

        <div className="contact-layout">
          <div className="contact-info">
            <h2>Información de Contacto</h2>
            
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <h3>Dirección</h3>
                <p>Av. Principal 123, Santiago, Chile</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div>
                <h3>Teléfono</h3>
                <p>+56 9 1234 5678</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div>
                <h3>Email</h3>
                <p>contacto@mimascota.cl</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">🕐</div>
              <div>
                <h3>Horario de Atención</h3>
                <p>Lunes a Viernes: 9:00 - 18:00</p>
                <p>Sábados: 10:00 - 14:00</p>
              </div>
            </div>

            <div className="social-links">
              <h3>Síguenos</h3>
              <div className="social-icons">
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="Instagram">📷</a>
                <a href="#" aria-label="Twitter">🐦</a>
                <a href="#" aria-label="WhatsApp">💬</a>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h2>Envíanos un Mensaje</h2>
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nombre Completo *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Tu nombre"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo Electrónico *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="tu@email.com"
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  placeholder="+56 9 1234 5678"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Asunto *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'error' : ''}
                  placeholder="Motivo de tu consulta"
                />
                {errors.subject && <span className="error-message">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensaje *</label>
                <textarea
                  id="message"
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                  placeholder="Escribe tu mensaje aquí..."
                  rows="5"
                />
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Mi Mascota. Todos los derechos reservados.</p>
          <div className="footer-links">
            <Link to="/about">Sobre Nosotros</Link>
            <Link to="/contact">Contacto</Link>
            <Link to="/products">Productos</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Contact
