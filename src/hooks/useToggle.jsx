/**
 * CUSTOM HOOK: useToggle
 * Maneja estados booleanos (on/off)
 */

import { useState } from 'react';

export function useToggle(valorInicial = false) {
  const [valor, setValor] = useState(valorInicial);

  const toggle = () => setValor(!valor);
  const setTrue = () => setValor(true);
  const setFalse = () => setValor(false);

  return [valor, toggle, setTrue, setFalse];
}