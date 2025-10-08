/**
 * COMPONENTE NOTIFICATION - Sistema de Notificaciones Toast
 * 
 * Este componente muestra notificaciones estilo "toast" en la pantalla.
 * Se integra con el sistema de notificaciones de notifications.js
 * 
 * ESTRUCTURA:
 * - NotificationContainer: Contenedor principal (se coloca en App.jsx)
 * - NotificationItem: Cada notificación individual
 * 
 * POSICIONES:
 * - top-right, top-left, top-center
 * - bottom-right, bottom-left, bottom-center
 */

import React, { useState, useEffect } from 'react';
import { addNotificationListener } from '../../util/notifications';
import './Notification.css';

// ============================================
// ÍCONOS PARA CADA TIPO DE NOTIFICACIÓN
// ============================================

const NotificationIcons = {
  success: (
    <svg className="notification-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="notification-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="notification-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg className="notification-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  )
};

// ============================================
// COMPONENTE: NOTIFICACIÓN INDIVIDUAL
// ============================================

const NotificationItem = ({ notification, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  
  /**
   * EFECTO: Auto-cerrar después del tiempo especificado
   */
  useEffect(() => {
    if (notification.duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, notification.duration);
      
      // Cleanup: cancelar timer si se cierra manualmente
      return () => clearTimeout(timer);
    }
  }, [notification.duration]);
  
  /**
   * Maneja el cierre con animación
   */
  const handleClose = () => {
    setIsExiting(true);
    
    // Esperar a que termine la animación antes de remover
    setTimeout(() => {
      onClose(notification.id);
    }, 300); // Duración de la animación de salida
  };
  
  /**
   * Construye las clases CSS de la notificación
   */
  const getNotificationClasses = () => {
    return [
      'notification-item',
      `notification-${notification.type}`,
      isExiting && 'notification-exiting'
    ].filter(Boolean).join(' ');
  };
  
  return (
    <div className={getNotificationClasses()}>
      {/* Icono */}
      {notification.showIcon && (
        <div className="notification-icon-wrapper">
          {NotificationIcons[notification.type]}
        </div>
      )}
      
      {/* Contenido */}
      <div className="notification-content">
        <p className="notification-message">{notification.message}</p>
        
        {/* Botón de acción (opcional) */}
        {notification.action && (
          <button
            className="notification-action-button"
            onClick={() => {
              notification.action.onClick();
              handleClose();
            }}
          >
            {notification.action.text}
          </button>
        )}
      </div>
      
      {/* Botón de cerrar */}
      {notification.closeButton && (
        <button
          className="notification-close-button"
          onClick={handleClose}
          aria-label="Cerrar notificación"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M1 1L13 13M1 13L13 1" />
          </svg>
        </button>
      )}
      
      {/* Barra de progreso (opcional) */}
      {notification.duration > 0 && (
        <div className="notification-progress">
          <div 
            className="notification-progress-bar"
            style={{
              animationDuration: `${notification.duration}ms`
            }}
          />
        </div>
      )}
    </div>
  );
};

// ============================================
// COMPONENTE: CONTENEDOR DE NOTIFICACIONES
// ============================================

const NotificationContainer = ({ position = 'top-right', maxNotifications = 5 }) => {
  const [notifications, setNotifications] = useState([]);
  
  /**
   * EFECTO: Suscribirse al sistema de notificaciones
   */
  useEffect(() => {
    // Suscribirse a las notificaciones
    const unsubscribe = addNotificationListener((notification) => {
      // Si es una acción de ocultar
      if (notification.action === 'hide') {
        handleRemove(notification.id);
        return;
      }
      
      // Si es ocultar todas
      if (notification.action === 'hideAll') {
        setNotifications([]);
        return;
      }
      
      // Agregar nueva notificación
      setNotifications(prev => {
        // Limitar cantidad de notificaciones
        const newNotifications = [notification, ...prev].slice(0, maxNotifications);
        return newNotifications;
      });
    });
    
    // Cleanup: desuscribirse al desmontar
    return unsubscribe;
  }, [maxNotifications]);
  
  /**
   * Remueve una notificación por ID
   */
  const handleRemove = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  /**
   * Construye las clases del contenedor
   */
  const getContainerClasses = () => {
    return [
      'notification-container',
      `notification-container-${position}`
    ].join(' ');
  };
  
  // Si no hay notificaciones, no renderizar nada
  if (notifications.length === 0) return null;
  
  return (
    <div className={getContainerClasses()}>
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={handleRemove}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;