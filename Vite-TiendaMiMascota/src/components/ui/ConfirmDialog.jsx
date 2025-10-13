import { useState, useEffect } from 'react'
import '../../styles/global.css'

export function ConfirmDialogContainer() {
  const [dialog, setDialog] = useState(null)

  useEffect(() => {
    const handleConfirm = (event) => {
      const { title, message, onConfirm, onCancel, confirmText = 'Confirmar', cancelText = 'Cancelar' } = event.detail
      
      setDialog({
        title,
        message,
        confirmText,
        cancelText,
        onConfirm,
        onCancel
      })
    }

    window.addEventListener('confirm-dialog', handleConfirm)
    return () => window.removeEventListener('confirm-dialog', handleConfirm)
  }, [])

  const handleConfirm = () => {
    if (dialog?.onConfirm) {
      dialog.onConfirm()
    }
    setDialog(null)
  }

  const handleCancel = () => {
    if (dialog?.onCancel) {
      dialog.onCancel()
    }
    setDialog(null)
  }

  if (!dialog) return null

  return (
    <div className="confirm-dialog-overlay" onClick={handleCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        {dialog.title && <h3 className="confirm-dialog-title">{dialog.title}</h3>}
        <p className="confirm-dialog-message">{dialog.message}</p>
        <div className="confirm-dialog-actions">
          <button className="btn btn-secondary" onClick={handleCancel}>
            {dialog.cancelText}
          </button>
          <button className="btn btn-primary" onClick={handleConfirm}>
            {dialog.confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

// Helper function para mostrar diálogos de confirmación
export const confirmDialog = (options) => {
  return new Promise((resolve) => {
    const event = new CustomEvent('confirm-dialog', {
      detail: {
        ...options,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false)
      }
    })
    window.dispatchEvent(event)
  })
}
