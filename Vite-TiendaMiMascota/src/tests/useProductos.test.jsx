import {describe,it,expect} from 'vitest';
import {renderHook,waitFor} from '@testing-library/react';
import useProductos from '../hooks/useProductos';

describe('useProductos',()=>{
  it('carga productos',async()=>{
    const {result}=renderHook(()=>useProductos());
    await waitFor(()=>expect(result.current.cargando).toBe(false));
    expect(result.current.productos.length).toBeGreaterThan(0);
  });
});
