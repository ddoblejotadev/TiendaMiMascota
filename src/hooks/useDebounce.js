/**
 * HOOK: useDebounce
 * Retrasa la actualización de un valor hasta que no haya cambios por un tiempo
 * Útil para búsquedas y filtros en tiempo real
 */

import { useState, useEffect } from 'react';

/**
 * @param {any} value - Valor a debounce
 * @param {number} delay - Delay en milisegundos (default: 300ms)
 * @returns {any} - Valor debounced
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Crear timer
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar timer si value cambia antes del delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

