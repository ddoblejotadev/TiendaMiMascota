/**
 * COMPONENTE REGIONSELECT - Selector de Regiones y Comunas de Chile
 * 
 * Componente que permite seleccionar región y comuna de Chile.
 * Maneja automáticamente la dependencia entre región y comuna.
 * 
 * PROPS:
 * - selectedRegion: string | null (región seleccionada)
 * - selectedComuna: string | null (comuna seleccionada)
 * - onRegionChange: función (callback cuando cambia región)
 * - onComunaChange: función (callback cuando cambia comuna)
 * - disabled: boolean (deshabilitar ambos selectores)
 * - required: boolean (marcar como requerido)
 * - showLabels: boolean (mostrar labels)
 * - layout: 'vertical' | 'horizontal' (disposición)
 * 
 * EJEMPLO DE USO:
 * <RegionSelect
 *   selectedRegion={formData.region}
 *   selectedComuna={formData.comuna}
 *   onRegionChange={(region) => setFormData({...formData, region})}
 *   onComunaChange={(comuna) => setFormData({...formData, comuna})}
 *   required
 * />
 */

import React, { useMemo, useEffect } from 'react';
import { REGIONES, getComunasPorRegion, getRegionPorComuna } from '../../util/regions';
import './RegionSelect.css';

const RegionSelect = ({
  selectedRegion = null,
  selectedComuna = null,
  onRegionChange,
  onComunaChange,
  disabled = false,
  required = false,
  showLabels = true,
  layout = 'vertical',
  className = ''
}) => {
  
  /**
   * MEMO: Obtener comunas de la región seleccionada
   * Se recalcula solo cuando cambia selectedRegion
   */
  const comunasDisponibles = useMemo(() => {
    if (!selectedRegion) return [];
    return getComunasPorRegion(selectedRegion);
  }, [selectedRegion]);
  
  /**
   * EFECTO: Limpiar comuna si no pertenece a la región actual
   */
  useEffect(() => {
    if (!selectedComuna || !selectedRegion) return;
    
    const comunaPertenece = comunasDisponibles.some(
      comuna => comuna.nombre === selectedComuna
    );
    
    // Si la comuna no pertenece a la región, limpiarla
    if (!comunaPertenece && onComunaChange) {
      onComunaChange(null);
    }
  }, [selectedRegion, selectedComuna, comunasDisponibles, onComunaChange]);
  
  /**
   * HANDLER: Cambio de región
   */
  const handleRegionChange = (e) => {
    const region = e.target.value || null;
    
    if (onRegionChange) {
      onRegionChange(region);
    }
    
    // Limpiar comuna al cambiar de región
    if (onComunaChange && region !== selectedRegion) {
      onComunaChange(null);
    }
  };
  
  /**
   * HANDLER: Cambio de comuna
   */
  const handleComunaChange = (e) => {
    const comuna = e.target.value || null;
    
    if (onComunaChange) {
      onComunaChange(comuna);
    }
  };
  
  /**
   * Construye las clases del contenedor
   */
  const getContainerClasses = () => {
    return [
      'region-select-container',
      `region-select-${layout}`,
      className
    ].filter(Boolean).join(' ');
  };
  
  return (
    <div className={getContainerClasses()}>
      {/* SELECTOR DE REGIÓN */}
      <div className="region-select-field">
        {showLabels && (
          <label 
            htmlFor="region-select"
            className="region-select-label"
          >
            Región {required && <span className="required-mark">*</span>}
          </label>
        )}
        
        <select
          id="region-select"
          className="region-select-input"
          value={selectedRegion || ''}
          onChange={handleRegionChange}
          disabled={disabled}
          required={required}
          aria-label="Seleccionar región"
        >
          <option value="">Seleccione una región</option>
          {REGIONES.map((region) => (
            <option key={region.codigo} value={region.nombre}>
              {region.nombre}
            </option>
          ))}
        </select>
      </div>
      
      {/* SELECTOR DE COMUNA */}
      <div className="region-select-field">
        {showLabels && (
          <label 
            htmlFor="comuna-select"
            className="region-select-label"
          >
            Comuna {required && <span className="required-mark">*</span>}
          </label>
        )}
        
        <select
          id="comuna-select"
          className="region-select-input"
          value={selectedComuna || ''}
          onChange={handleComunaChange}
          disabled={disabled || !selectedRegion}
          required={required}
          aria-label="Seleccionar comuna"
        >
          <option value="">
            {selectedRegion 
              ? 'Seleccione una comuna' 
              : 'Primero seleccione una región'}
          </option>
          {comunasDisponibles.map((comuna) => (
            <option key={comuna.codigo} value={comuna.nombre}>
              {comuna.nombre}
            </option>
          ))}
        </select>
        
        {/* Indicador de cantidad de comunas */}
        {selectedRegion && comunasDisponibles.length > 0 && (
          <small className="region-select-hint">
            {comunasDisponibles.length} {comunasDisponibles.length === 1 ? 'comuna' : 'comunas'} disponibles
          </small>
        )}
      </div>
    </div>
  );
};

// ============================================
// COMPONENTE: SELECTOR CON BÚSQUEDA
// ============================================

/**
 * Versión avanzada con campo de búsqueda para comunas
 */
export const RegionSelectWithSearch = ({
  selectedRegion = null,
  selectedComuna = null,
  onRegionChange,
  onComunaChange,
  disabled = false,
  required = false,
  showLabels = true,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showDropdown, setShowDropdown] = React.useState(false);
  
  /**
   * MEMO: Comunas filtradas por búsqueda
   */
  const comunasFiltradas = useMemo(() => {
    if (!selectedRegion) return [];
    
    const comunas = getComunasPorRegion(selectedRegion);
    
    if (!searchTerm) return comunas;
    
    const termLower = searchTerm.toLowerCase();
    return comunas.filter(comuna =>
      comuna.nombre.toLowerCase().includes(termLower)
    );
  }, [selectedRegion, searchTerm]);
  
  /**
   * HANDLER: Seleccionar comuna del dropdown
   */
  const handleSelectComuna = (comunaNombre) => {
    if (onComunaChange) {
      onComunaChange(comunaNombre);
    }
    setSearchTerm('');
    setShowDropdown(false);
  };
  
  /**
   * EFECTO: Cerrar dropdown al hacer clic fuera
   */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.comuna-search-container')) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  
  return (
    <div className={`region-select-container ${className}`}>
      {/* Selector de Región (igual que antes) */}
      <div className="region-select-field">
        {showLabels && (
          <label htmlFor="region-search" className="region-select-label">
            Región {required && <span className="required-mark">*</span>}
          </label>
        )}
        
        <select
          id="region-search"
          className="region-select-input"
          value={selectedRegion || ''}
          onChange={(e) => {
            const region = e.target.value || null;
            if (onRegionChange) onRegionChange(region);
            if (onComunaChange) onComunaChange(null);
            setSearchTerm('');
          }}
          disabled={disabled}
          required={required}
        >
          <option value="">Seleccione una región</option>
          {REGIONES.map((region) => (
            <option key={region.codigo} value={region.nombre}>
              {region.nombre}
            </option>
          ))}
        </select>
      </div>
      
      {/* Campo de búsqueda de comuna */}
      <div className="region-select-field">
        {showLabels && (
          <label htmlFor="comuna-search" className="region-select-label">
            Comuna {required && <span className="required-mark">*</span>}
          </label>
        )}
        
        <div className="comuna-search-container">
          <input
            id="comuna-search"
            type="text"
            className="region-select-input"
            placeholder={selectedRegion ? 'Buscar comuna...' : 'Primero seleccione una región'}
            value={selectedComuna || searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
              if (onComunaChange && !e.target.value) {
                onComunaChange(null);
              }
            }}
            onFocus={() => selectedRegion && setShowDropdown(true)}
            disabled={disabled || !selectedRegion}
            required={required}
            autoComplete="off"
          />
          
          {/* Dropdown de resultados */}
          {showDropdown && selectedRegion && (
            <div className="comuna-dropdown">
              {comunasFiltradas.length > 0 ? (
                comunasFiltradas.map((comuna) => (
                  <button
                    key={comuna.codigo}
                    type="button"
                    className="comuna-dropdown-item"
                    onClick={() => handleSelectComuna(comuna.nombre)}
                  >
                    {comuna.nombre}
                  </button>
                ))
              ) : (
                <div className="comuna-dropdown-empty">
                  No se encontraron comunas
                </div>
              )}
            </div>
          )}
        </div>
        
        {selectedRegion && (
          <small className="region-select-hint">
            {comunasFiltradas.length} {comunasFiltradas.length === 1 ? 'comuna' : 'comunas'} 
            {searchTerm && ' encontradas'}
          </small>
        )}
      </div>
    </div>
  );
};

// ============================================
// COMPONENTE: SELECTOR COMPACTO (inline)
// ============================================

/**
 * Versión compacta para usar en línea
 */
export const RegionSelectInline = ({
  selectedRegion,
  selectedComuna,
  onRegionChange,
  onComunaChange,
  disabled = false
}) => {
  return (
    <div className="region-select-inline">
      <select
        className="region-select-input-inline"
        value={selectedRegion || ''}
        onChange={(e) => onRegionChange(e.target.value || null)}
        disabled={disabled}
      >
        <option value="">Región...</option>
        {REGIONES.map((region) => (
          <option key={region.codigo} value={region.nombre}>
            {region.nombre}
          </option>
        ))}
      </select>
      
      <span className="region-select-separator">/</span>
      
      <select
        className="region-select-input-inline"
        value={selectedComuna || ''}
        onChange={(e) => onComunaChange(e.target.value || null)}
        disabled={disabled || !selectedRegion}
      >
        <option value="">Comuna...</option>
        {selectedRegion && getComunasPorRegion(selectedRegion).map((comuna) => (
          <option key={comuna.codigo} value={comuna.nombre}>
            {comuna.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionSelect;