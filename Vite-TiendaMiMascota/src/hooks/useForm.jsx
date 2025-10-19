/**
 * CUSTOM HOOK: useForm
 * Maneja el estado y validación de formularios
 */

import { useState } from 'react';

export function useForm({ initialValues = {}, validate, onSubmit } = {}) {
  const [valores, setValores] = useState(initialValues);
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

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar todos los campos
    if (validate) {
      const validationErrors = validate(valores);
      setErrores(validationErrors);
      
      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }
    
    // Ejecutar callback de envío
    if (onSubmit) {
      await onSubmit(valores);
    }
  };

  /**
   * Establece un error específico
   */
  const setError = (campo, mensaje) => {
    setErrores(prev => ({
      ...prev,
      [campo]: mensaje
    }));
  };

  return {
    // Español
    valores,
    errores,
    tocado,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFormValues,
    setFormErrors,
    setError,
    tieneError,
    esValido,
    // Inglés (aliases)
    values: valores,
    errors: errores,
    touched: tocado,
    hasError: tieneError,
    isValid: esValido
  };
}