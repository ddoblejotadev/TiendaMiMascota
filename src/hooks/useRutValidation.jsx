/**
 * HOOK: Validación de RUT Chileno
 * Valida y formatea RUT usando algoritmo módulo 11
 */

import { useState, useCallback } from 'react';

/**
 * Limpia el RUT removiendo puntos, guiones y espacios
 */
const limpiarRut = (rut) => {
  if (!rut) return '';
  return rut.toString().replace(/[.\s-]/g, '').toUpperCase();
};

/**
 * Calcula el dígito verificador usando módulo 11
 */
const calcularDigitoVerificador = (rutSinDv) => {
  let suma = 0;
  let multiplicador = 2;

  // Recorrer de derecha a izquierda
  for (let i = rutSinDv.length - 1; i >= 0; i--) {
    suma += parseInt(rutSinDv[i]) * multiplicador;
    multiplicador = multiplicador < 7 ? multiplicador + 1 : 2;
  }

  const resto = 11 - (suma % 11);

  if (resto === 11) return '0';
  if (resto === 10) return 'K';
  return resto.toString();
};

/**
 * Valida si el RUT es válido usando algoritmo módulo 11
 */
const esRutValido = (rut) => {
  // Si está vacío, es válido (campo opcional)
  if (!rut || rut.trim() === '') return true;

  const rutLimpio = limpiarRut(rut);

  // Debe tener entre 8 y 9 caracteres (7-8 dígitos + 1 DV)
  if (rutLimpio.length < 8 || rutLimpio.length > 9) return false;

  // Verificar que sea formato válido (números + K opcional)
  if (!/^[0-9]+[0-9K]$/.test(rutLimpio)) return false;

  // Separar RUT y dígito verificador
  const rutSinDv = rutLimpio.slice(0, -1);
  const dvIngresado = rutLimpio.slice(-1);

  // Calcular dígito verificador correcto
  const dvCalculado = calcularDigitoVerificador(rutSinDv);

  // Comparar
  return dvIngresado === dvCalculado;
};

/**
 * Formatea el RUT a formato XX.XXX.XXX-X
 */
const formatearRut = (rut) => {
  if (!rut || rut.trim() === '') return '';

  const rutLimpio = limpiarRut(rut);

  // Si no tiene suficientes caracteres, devolver limpio sin formato
  if (rutLimpio.length < 2) return rutLimpio;

  // Separar RUT y DV
  const rutSinDv = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1);

  // Formatear con puntos
  let rutFormateado = '';
  let contador = 0;

  // Agregar puntos de derecha a izquierda
  for (let i = rutSinDv.length - 1; i >= 0; i--) {
    if (contador === 3) {
      rutFormateado = '.' + rutFormateado;
      contador = 0;
    }
    rutFormateado = rutSinDv[i] + rutFormateado;
    contador++;
  }

  return `${rutFormateado}-${dv}`;
};

/**
 * Hook personalizado para validación de RUT
 */
function useRutValidation() {
  const [rut, setRut] = useState('');
  const [error, setError] = useState('');

  /**
   * Valida el RUT y actualiza el estado de error
   */
  const validar = useCallback((valorRut) => {
    setRut(valorRut);

    // Si está vacío, no hay error (campo opcional)
    if (!valorRut || valorRut.trim() === '') {
      setError('');
      return true;
    }

    // Validar RUT
    const esValido = esRutValido(valorRut);

    if (!esValido) {
      setError('RUT inválido');
      return false;
    }

    setError('');
    return true;
  }, []);

  /**
   * Formatea el RUT actual
   */
  const formatear = useCallback(() => {
    if (!rut || rut.trim() === '') return '';

    const rutFormateado = formatearRut(rut);
    setRut(rutFormateado);
    return rutFormateado;
  }, [rut]);

  /**
   * Resetea el estado
   */
  const resetear = useCallback(() => {
    setRut('');
    setError('');
  }, []);

  return {
    rut,
    error,
    esValido: (valorRut) => esRutValido(valorRut || rut),
    validar,
    formatear,
    resetear,
    // Funciones de utilidad exportadas
    limpiar: limpiarRut,
    formatearRut
  };
}

// Exportar funciones individuales también
export { esRutValido, formatearRut, limpiarRut };

export default useRutValidation;
