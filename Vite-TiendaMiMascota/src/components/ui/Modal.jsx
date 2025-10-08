/**
 * COMPONENTE MODAL - Ventana Modal Reutilizable
 * 
 * Modal flexible que puede contener cualquier contenido.
 * Incluye overlay, animaciones y manejo de accesibilidad.
 * 
 * PROPS:
 * - isOpen: boolean (controla si está visible)
 * - onClose: función (callback al cerrar)
 * - title: string (título del modal)
 * - size: 'small' | 'medium' | 'large' | 'full'
 * - showCloseButton: boolean (mostrar X para cerrar)
 * - closeOnOverlayClick: boolean (cerrar al hacer clic en overlay)
 * - closeOnEsc: boolean (cerrar con tecla ESC)
 * - children: contenido del modal
 * 
 * EJEMPLOS DE USO:
 * <Modal isOpen={show} onClose={() => setShow(false)} title="Mi Modal">
 *   <p>Contenido del modal</p>
 * </Modal>
 */

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

const Modal = ({
  isOpen,
  onClose,
  title = '',
  size = 'medium',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  children,
  className = ''
}) => {
  
  // Ref para el contenedor del modal (para detectar clics dentro)
  const modalRef = useRef(null);
  
  // Ref para el elemento que tenía el foco antes de abrir el modal
  const previousFocusRef = useRef(null);
  
  /**
   * EFECTO: Bloquear scroll del body cuando el modal está abierto
   */
  useEffect(() => {
    if (isOpen) {
      // Guardar el elemento que tiene el foco actualmente
      previousFocusRef.current = document.activeElement;
      
      // Bloquear scroll del body
      document.body.style.overflow = 'hidden';
      
      // Enfocar el modal (accesibilidad)
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      // Restaurar scroll
      document.body.style.overflow = 'unset';
      
      // Restaurar foco al elemento anterior
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
    
    // Cleanup: restaurar scroll al desmontar
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  /**
   * EFECTO: Cerrar con tecla ESC
   */
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    // Agregar listener
    document.addEventListener('keydown', handleEscKey);
    
    // Cleanup: remover listener
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, closeOnEsc, onClose]);
  
  /**
   * HANDLER: Cerrar al hacer clic en el overlay
   */
  const handleOverlayClick = (e) => {
    // Verificar que el clic fue en el overlay y no en el contenido del modal
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  
  /**
   * Construye las clases CSS del modal
   */
  const getModalClasses = () => {
    return [
      'modal',
      `modal-${size}`,
      className
    ].filter(Boolean).join(' ');
  };
  
  // Si no está abierto, no renderizar nada
  if (!isOpen) return null;
  
  /**
   * Contenido del modal
   */
  const modalContent = (
    <div 
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div 
        ref={modalRef}
        className={getModalClasses()}
        tabIndex={-1}
      >
        {/* Header del modal */}
        {(title || showCloseButton) && (
          <div className="modal-header">
            {title && (
              <h2 id="modal-title" className="modal-title">
                {title}
              </h2>
            )}
            
            {showCloseButton && (
              <button
                type="button"
                className="modal-close-button"
                onClick={onClose}
                aria-label="Cerrar modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        )}
        
        {/* Contenido del modal */}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
  
  /**
   * USAR PORTAL para renderizar el modal en el body
   * Esto evita problemas con z-index y overflow
   */
  return createPortal(
    modalContent,
    document.body
  );
};

export default Modal;