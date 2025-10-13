import { useCart } from '../hooks/useCart'
import '../styles/global.css'

function CartSummary() {
  const { cart, getTotal, getTotalItems } = useCart()

  const subtotal = getTotal ? getTotal() : cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const totalItems = getTotalItems ? getTotalItems() : cart.reduce((sum, item) => sum + item.quantity, 0)
  
  const envio = subtotal > 30000 ? 0 : 3500
  const descuento = subtotal > 50000 ? subtotal * 0.1 : 0
  const total = subtotal + envio - descuento

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="cart-summary">
      <h3 className="cart-summary-title">Resumen del Pedido</h3>
      
      <div className="cart-summary-content">
        <div className="summary-row">
          <span className="summary-label">Productos ({totalItems})</span>
          <span className="summary-value">{formatPrice(subtotal)}</span>
        </div>

        <div className="summary-row">
          <span className="summary-label">Envío</span>
          <span className={`summary-value ${envio === 0 ? 'free' : ''}`}>
            {envio === 0 ? 'GRATIS' : formatPrice(envio)}
          </span>
        </div>

        {descuento > 0 && (
          <div className="summary-row discount">
            <span className="summary-label">Descuento (10%)</span>
            <span className="summary-value">-{formatPrice(descuento)}</span>
          </div>
        )}

        <div className="summary-divider"></div>

        <div className="summary-row total">
          <span className="summary-label">Total</span>
          <span className="summary-value">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="cart-summary-info">
        {subtotal < 30000 && (
          <p className="info-message">
            💡 Agrega {formatPrice(30000 - subtotal)} más para envío gratis
          </p>
        )}
        {subtotal >= 30000 && subtotal < 50000 && (
          <p className="info-message success">
            ✓ ¡Envío gratis aplicado!
          </p>
        )}
        {subtotal >= 50000 && (
          <p className="info-message success">
            ✓ ¡Envío gratis + 10% de descuento!
          </p>
        )}
      </div>

      <div className="cart-summary-benefits">
        <h4>Beneficios incluidos:</h4>
        <ul>
          <li>✓ Garantía de satisfacción</li>
          <li>✓ Devolución en 30 días</li>
          <li>✓ Pago seguro</li>
          <li>✓ Soporte 24/7</li>
        </ul>
      </div>
    </div>
  )
}

export default CartSummary
