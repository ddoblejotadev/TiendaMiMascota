// Helper function para mostrar notificaciones
export const notify = (message, type = 'info', duration = 3000) => {
  const event = new CustomEvent('notify', {
    detail: { message, type, duration }
  })
  window.dispatchEvent(event)
}
