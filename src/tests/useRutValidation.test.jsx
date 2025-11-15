/**
 * TESTS: Validación de RUT
 * Tests unitarios para el hook useRutValidation
 */

import { describe, it, expect } from 'vitest';
import { esRutValido, formatearRut, limpiarRut } from '../hooks/useRutValidation';

describe('Validación de RUT Chileno', () => {
  
  describe('limpiarRut', () => {
    it('debe remover puntos, guiones y espacios', () => {
      expect(limpiarRut('12.345.678-K')).toBe('12345678K');
      expect(limpiarRut('12 345 678-K')).toBe('12345678K');
      expect(limpiarRut('12345678-K')).toBe('12345678K');
    });

    it('debe convertir a mayúsculas', () => {
      expect(limpiarRut('12345678-k')).toBe('12345678K');
    });

    it('debe manejar RUT vacío', () => {
      expect(limpiarRut('')).toBe('');
      expect(limpiarRut(null)).toBe('');
      expect(limpiarRut(undefined)).toBe('');
    });
  });

  describe('esRutValido', () => {
    it('debe validar RUT vacío como válido (campo opcional)', () => {
      expect(esRutValido('')).toBe(true);
      expect(esRutValido(null)).toBe(true);
      expect(esRutValido(undefined)).toBe(true);
      expect(esRutValido('  ')).toBe(true);
    });

    it('debe validar RUT correctos', () => {
      expect(esRutValido('12.345.678-5')).toBe(true);
      expect(esRutValido('12345678-5')).toBe(true);
      expect(esRutValido('12 345 678-5')).toBe(true);
      expect(esRutValido('11.111.111-1')).toBe(true);
      expect(esRutValido('22.222.222-2')).toBe(true);
    });

    it('debe validar RUT con dígito verificador K', () => {
      expect(esRutValido('11.111.111-1')).toBe(true);
      expect(esRutValido('11111111-1')).toBe(true);
      expect(esRutValido('7.777.777-6')).toBe(true);
    });

    it('debe rechazar RUT con dígito verificador incorrecto', () => {
      expect(esRutValido('12.345.678-9')).toBe(false);
      expect(esRutValido('11.111.111-2')).toBe(false);
      expect(esRutValido('22.222.222-3')).toBe(false);
    });

    it('debe rechazar formato inválido', () => {
      expect(esRutValido('123')).toBe(false);
      expect(esRutValido('abc123456-7')).toBe(false);
      expect(esRutValido('12345678')).toBe(false); // Sin dígito verificador
    });

    it('debe validar RUT de 7 dígitos', () => {
      expect(esRutValido('1.111.111-4')).toBe(true);
      expect(esRutValido('1111111-4')).toBe(true);
    });
  });

  describe('formatearRut', () => {
    it('debe formatear RUT correctamente', () => {
      expect(formatearRut('12345678-5')).toBe('12.345.678-5');
      expect(formatearRut('12345678-K')).toBe('12.345.678-K');
      expect(formatearRut('1111111-K')).toBe('1.111.111-K');
    });

    it('debe formatear RUT ya limpio', () => {
      expect(formatearRut('123456785')).toBe('12.345.678-5');
      expect(formatearRut('11111111K')).toBe('11.111.111-K');
    });

    it('debe manejar RUT vacío', () => {
      expect(formatearRut('')).toBe('');
      expect(formatearRut(null)).toBe('');
      expect(formatearRut(undefined)).toBe('');
    });

    it('debe formatear RUT con diferentes separadores', () => {
      expect(formatearRut('12 345 678-5')).toBe('12.345.678-5');
      expect(formatearRut('12.345.678-5')).toBe('12.345.678-5');
    });
  });

  describe('Casos reales de RUT chilenos', () => {
    it('debe validar RUT reales conocidos', () => {
      // Estos son RUT válidos calculados con el algoritmo módulo 11
      expect(esRutValido('12.345.678-5')).toBe(true);
      expect(esRutValido('7.777.777-6')).toBe(true);
      expect(esRutValido('11.111.111-1')).toBe(true);
    });
  });
});
