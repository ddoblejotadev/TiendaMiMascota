/**
 * COMPONENTE CONFIRMDIALOG - Diálogo de Confirmación
 * 
 * Diálogo modal especializado para confirmaciones.
 * Se integra con el sistema de confirmaciones de confirmations.js
 * 
 * PROPS:
 * - isOpen: boolean
 * - title: string (título del diálogo)
 * - message: string (mensaje/descripción)
 * - type: 'danger' | 'warning' | 'info' | 'success'
 * - confirmText: string (texto del botón confirmar)
 * - cancelText: string (texto del botón cancelar)
 * - onConfirm: función (callback al confirmar)
 * - onCancel: función (callback al cancelar)
 * - showIcon: boolean (mostrar icono según tipo)
 * 
 * EJEMPLO DE USO:
 * <ConfirmDialog
 *   isOpen={show}
 *   type="danger"
 *   title="¿Eliminar producto?"
 *   message="Esta acción no se puede deshacer"
 *   confirmText="Eliminar"
 *   cancelText="Cancelar"
 *   onConfirm={handleDelete}
 *   onCancel={() => setShow(false)}
 * />
 */

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import './ConfirmDialog.css';

// ============================================
// ÍCONOS PARA CADA TIPO
// ============================================

const ConfirmIcons = {
  danger: (
    <svg className="confirm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path d="M15 9l-6 6M9 9l6 6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg className="confirm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg className="confirm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path d="M12 16v-4M12 8h.01" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  success: (
    <svg className="confirm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const ConfirmDialog = ({
  isOpen,
  title = '¿Estás seguro?',
  message = '',
  type = 'warning',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  showIcon = true,
  loading = false
}) => {
  
  // Refs para los botones (para enfocar automáticamente)
  const confirmButtonRef = useRef(null);
  const cancelButtonRef = useRef(null);
  const dialogRef = useRef(null);
  
  /**
   * EFECTO: Bloquear scroll y manejar foco
   */
  useEffect(() => {
    if (isOpen) {
      // Bloquear scroll del body
      document.body.style.overflow = 'hidden';
      
      // Enfocar el botón apropiado
      // Si es danger, enfocar cancelar; sino, enfocar confirmar
      if (type === 'danger' && cancelButtonRef.current) {
        cancelButtonRef.current.focus();
      } else if (confirmButtonRef.current) {
        confirmButtonRef.current.focus();
      }
    } else {
      // Restaurar scroll
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, type]);
  
  /**
   * EFECTO: Cerrar con tecla ESC
   */
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && !loading) {
        onCancel();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onCancel, loading]);
  
  /**
   * EFECTO: Trap focus dentro del diálogo
   * Evita que el usuario navegue con TAB fuera del diálogo
   */
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    
    const dialog = dialogRef.current;
    const focusableElements = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        // SHIFT + TAB (navegación hacia atrás)
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // TAB (navegación hacia adelante)
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    dialog.addEventListener('keydown', handleTabKey);
    
    return () => {
      dialog.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen]);
  
  /**
   * Maneja el clic en el overlay
   */
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onCancel();
    }
  };
  
  /**
   * Maneja el botón de confirmar
   */
  const handleConfirm = () => {
    if (!loading && onConfirm) {
      onConfirm();
    }
  };
  
  /**
   * Maneja el botón de cancelar
   */
  const handleCancel = () => {
    if (!loading && onCancel) {
      onCancel();
    }
  };
  
  // Si no está abierto, no renderizar nada
  if (!isOpen) return null;
  
  /**
   * Obtiene la variante del botón según el tipo
   */
  const getConfirmButtonVariant = () => {
    switch (type) {
      case 'danger':
        return 'danger';
      case 'warning':
        return 'warning';
      case 'success':
        return 'success';
      default:
        return 'primary';
    }
  };
  
  /**
   * Contenido del diálogo
   */
  const dialogContent = (
    <div 
      className="confirm-overlay"
      onClick={handleOverlayClick}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-message"
    >
      <div 
        ref={dialogRef}
        className={`confirm-dialog confirm-dialog-${type}`}
      >
        {/* Icono */}
        {showIcon && (
          <div className={`confirm-icon-wrapper confirm-icon-${type}`}>
            {ConfirmIcons[type]}
          </div>
        )}
        
        {/* Contenido */}
        <div className="confirm-content">
          {/* Título */}
          <h3 id="confirm-title" className="confirm-title">
            {title}
          </h3>
          
          {/* Mensaje */}
          {message && (
            <p id="confirm-message" className="confirm-message">
              {message}
            </p>
          )}
        </div>
        
        {/* Botones */}
        <div className="confirm-buttons">
          <Button
            ref={cancelButtonRef}
            variant="secondary"
            onClick={handleCancel}
            disabled={loading}
            fullWidth
          >
            {cancelText}
          </Button>
          
          <Button
            ref={confirmButtonRef}
            variant={getConfirmButtonVariant()}
            onClick={handleConfirm}
            loading={loading}
            disabled={loading}
            fullWidth
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
  
  // Renderizar con Portal
  return createPortal(dialogContent, document.body);
};

// ============================================
// CONTENEDOR DE CONFIRMACIONES
// ============================================

/**
 * Este componente escucha el sistema de confirmaciones
 * y muestra el ConfirmDialog automáticamente
 */
export const ConfirmDialogContainer = () => {
  const [confirmation, setConfirmation] = React.useState(null);
  
  /**
   * EFECTO: Suscribirse al sistema de confirmaciones
   */
  useEffect(() => {
    const { addConfirmListener } = require('../../util/confirmations');
    
    const unsubscribe = addConfirmListener((confirmData) => {
      // Si es una acción de ocultar
      if (confirmData.action === 'hide') {
        setConfirmation(null);
        return;
      }
      
      // Mostrar confirmación
      setConfirmation(confirmData);
    });
    
    return unsubscribe;
  }, []);
  
  if (!confirmation) return null;
  
  return (
    <ConfirmDialog
      isOpen={true}
      title={confirmation.title}
      message={confirmation.message}
      type={confirmation.type}
      confirmText={confirmation.confirmText}
      cancelText={confirmation.cancelText}
      showIcon={confirmation.showIcon}
      onConfirm={() => {
        if (confirmation.onConfirm) {
          confirmation.onConfirm();
        }
        setConfirmation(null);
      }}
      onCancel={() => {
        if (confirmation.onCancel) {
          confirmation.onCancel();
        }
        setConfirmation(null);
      }}
    />
  );
};

export default ConfirmDialog;