import { useState, useEffect } from 'react'

function NotificationContainer({ position = 'top-right', maxNotifications = 5 }) {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Escuchar eventos personalizados de notificación
    const handleNotification = (event) => {
      const { message, type = 'info', duration = 3000 } = event.detail
      const id = Date.now()
      
      const newNotification = { id, message, type, duration }
      
      setNotifications((prev) => {
        const updated = [...prev, newNotification]
        return updated.slice(-maxNotifications)
      })

      // Auto-remover después de la duración
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }

    window.addEventListener('notify', handleNotification)
    return () => window.removeEventListener('notify', handleNotification)
  }, [maxNotifications])

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getIcon = (type) => {
    switch (type) {
      case 'success': return '✓'
      case 'error': return '✕'
      case 'warning': return '⚠'
      case 'info': return 'ℹ'
      default: return 'ℹ'
    }
  }

  return (
    <div className={`notification-container notification-${position}`}>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
          onClick={() => removeNotification(notification.id)}
        >
          <span className="notification-icon">{getIcon(notification.type)}</span>
          <span className="notification-message">{notification.message}</span>
          <button 
            className="notification-close"
            onClick={(e) => {
              e.stopPropagation()
              removeNotification(notification.id)
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export default NotificationContainer
