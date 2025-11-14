/**
 * COMPONENTE: RESUMEN DEL CARRITO
 * Muestra el resumen de compra con totales
 */

function CartSummary({ 
  subtotal, 
  envio, 
  descuento, 
  total,
  alComprar,
  deshabilitado = false
}) {

  /**
   * Formatear precio
   */
  const formatearPrecio = (precio) => {
    return '$' + precio.toLocaleString('es-CL');
  };

  return (
    <div className="resumen-carrito">
      <h3 className="resumen-titulo">📋 Resumen de Compra</h3>

      {/* Líneas de totales */}
      <div className="resumen-lineas">
        {/* Subtotal */}
        <div className="linea-total">
          <span className="linea-etiqueta">Subtotal:</span>
          <span className="linea-valor">{formatearPrecio(subtotal)}</span>
        </div>

        {/* Envío */}
        <div className="linea-total">
          <span className="linea-etiqueta">Envío:</span>
          <span className="linea-valor linea-envio">
            {envio === 0 ? (
              <span className="envio-gratis">¡GRATIS!</span>
            ) : (
              formatearPrecio(envio)
            )}
          </span>
        </div>

        {/* Descuento (si existe) */}
        {descuento > 0 && (
          <div className="linea-total">
            <span className="linea-etiqueta">Descuento:</span>
            <span className="linea-valor linea-descuento">
              -{formatearPrecio(descuento)}
            </span>
          </div>
        )}

        {/* Separador */}
        <div className="resumen-separador"></div>

        {/* Total */}
        <div className="linea-total linea-total-final">
          <span className="linea-etiqueta">Total:</span>
          <span className="linea-valor linea-total-valor">
            {formatearPrecio(total)}
          </span>
        </div>
      </div>

      {/* Información adicional */}
      <div className="resumen-info">
        <div className="info-item">
          <span className="info-icono">✓</span>
          <span>Envío gratis en compras sobre $30.000</span>
        </div>
        <div className="info-item">
          <span className="info-icono">✓</span>
          <span>Devolución gratis dentro de 30 días</span>
        </div>
        <div className="info-item">
          <span className="info-icono">✓</span>
          <span>Pago seguro</span>
        </div>
      </div>

      {/* Botón de compra */}
      <button 
        className="boton-finalizar-compra"
        onClick={alComprar}
        disabled={deshabilitado}
      >
        {deshabilitado ? (
          '🛒 Carrito Vacío'
        ) : (
          '💳 Finalizar Compra'
        )}
      </button>

      {/* Métodos de pago */}
      <div className="metodos-pago">
        <p className="metodos-titulo">Métodos de pago aceptados:</p>
        <div className="iconos-pago">
          <span className="icono-pago">💳</span>
          <span className="icono-pago">💵</span>
          <span className="icono-pago">🏦</span>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;