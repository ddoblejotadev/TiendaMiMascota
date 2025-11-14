/**
 * CUSTOM HOOK: useLocalStorage
 * Sincroniza estado con localStorage
 */

import { useState, useEffect } from 'react';

export function useLocalStorage(key, valorInicial) {
  // Obtener valor inicial de localStorage o usar el proporcionado
  const [valor, setValor] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : valorInicial;
    } catch (error) {
      console.error(`Error al leer ${key} de localStorage:`, error);
      return valorInicial;
    }
  });

  // Guardar en localStorage cuando el valor cambie
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(valor));
    } catch (error) {
      console.error(`Error al guardar ${key} en localStorage:`, error);
    }
  }, [key, valor]);

  return [valor, setValor];
}