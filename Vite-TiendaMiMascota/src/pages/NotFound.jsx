import { Link } from 'react-router-dom'
import '../styles/global.css'

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <h1 className="error-code">404</h1>
          <h2>Página No Encontrada</h2>
          <p>Lo sentimos, la página que buscas no existe o ha sido movida.</p>
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              Volver al Inicio
            </Link>
            <Link to="/products" className="btn btn-secondary">
              Ver Productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
