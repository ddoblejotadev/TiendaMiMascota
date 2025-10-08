/**
 * COMPONENTE BUTTON - Botón Reutilizable
 * 
 * Botón personalizado con diferentes variantes, tamaños y estados.
 * Diseñado para mantener consistencia visual en toda la aplicación.
 * 
 * PROPS:
 * - variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
 * - size: 'small' | 'medium' | 'large'
 * - fullWidth: boolean
 * - disabled: boolean
 * - loading: boolean
 * - icon: ReactNode (icono antes del texto)
 * - onClick: función
 * - children: contenido del botón
 * 
 * EJEMPLOS DE USO:
 * <Button variant="primary" onClick={handleClick}>Guardar</Button>
 * <Button variant="danger" size="small">Eliminar</Button>
 * <Button loading={isLoading}>Cargando...</Button>
 */

import React from 'react';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon = null,
  type = 'button',
  onClick,
  className = '',
  ...rest  // Captura todas las demás props
}) => {
  
  /**
   * Construye las clases CSS del botón
   * Combina clase base + variante + tamaño + estados
   */
  const getButtonClasses = () => {
    const classes = [
      'btn',                          // Clase base
      `btn-${variant}`,               // Variante de color
      `btn-${size}`,                  // Tamaño
      fullWidth && 'btn-full-width',  // Ancho completo
      loading && 'btn-loading',       // Estado de carga
      className                       // Clases adicionales
    ];
    
    // Filtrar valores falsy (false, null, undefined, '')
    return classes.filter(Boolean).join(' ');
  };
  
  /**
   * Maneja el clic del botón
   * No ejecuta onClick si está disabled o loading
   */
  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(e);
    }
  };
  
  return (
    <button
      type={type}
      className={getButtonClasses()}
      onClick={handleClick}
      disabled={disabled || loading}
      {...rest}  // Spread de props adicionales (aria-label, data-*, etc)
    >
      {/* Spinner de carga */}
      {loading && (
        <span className="btn-spinner" aria-hidden="true">
          <svg className="spinner" viewBox="0 0 50 50">
            <circle
              className="spinner-path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="5"
            />
          </svg>
        </span>
      )}
      
      {/* Icono opcional */}
      {!loading && icon && (
        <span className="btn-icon">{icon}</span>
      )}
      
      {/* Texto del botón */}
      {children && (
        <span className="btn-text">{children}</span>
      )}
    </button>
  );
};

export default Button;