/**
 * CUSTOM HOOK: useForm
 * Maneja el estado y validación de formularios
 */

import { useState } from 'react';

export function useForm(valoresIniciales = {}) {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
  const [tocado, setTocado] = useState({});

  /**
   * Maneja el cambio de un campo
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setValores({
      ...valores,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Limpiar error del campo al escribir
    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: null
      });
    }
  };

  /**
   * Maneja cuando un campo pierde el foco
   */
  const handleBlur = (e) => {
    const { name } = e.target;
    
    setTocado({
      ...tocado,
      [name]: true
    });
  };

  /**
   * Resetea el formulario
   */
  const resetForm = () => {
    setValores(valoresIniciales);
    setErrores({});
    setTocado({});
  };

  /**
   * Establece valores del formulario
   */
  const setFormValues = (nuevosValores) => {
    setValores(nuevosValores);
  };

  /**
   * Establece errores de validación
   */
  const setFormErrors = (nuevosErrores) => {
    setErrores(nuevosErrores);
  };

  /**
   * Verifica si un campo tiene error y ha sido tocado
   */
  const tieneError = (campo) => {
    return tocado[campo] && errores[campo];
  };

  /**
   * Verifica si el formulario es válido
   */
  const esValido = () => {
    return Object.keys(errores).length === 0;
  };

  return {
    valores,
    errores,
    tocado,
    handleChange,
    handleBlur,
    resetForm,
    setFormValues,
    setFormErrors,
    tieneError,
    esValido
  };
}