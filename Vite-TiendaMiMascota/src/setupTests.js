/**
 * CONFIGURACIÓN DE PRUEBAS
 * Archivo de setup para configurar el entorno de testing
 */

import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extender expect con matchers de jest-dom
expect.extend(matchers);
// Limpiar después de cada test
afterEach(() => {
  cleanup();
});
// Mock global de alert para evitar errores en tests que lo usan
if (typeof global.alert === 'undefined') {
  global.alert = () => {};
}
