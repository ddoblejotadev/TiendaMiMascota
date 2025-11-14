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
