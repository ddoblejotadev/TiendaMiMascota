import {describe,it,expect,beforeEach} from 'vitest';
import {renderHook,act} from '@testing-library/react';
import useCarrito from '../hooks/useCarrito';
import { renderHookWithProviders } from './test-utils';

describe('useCarrito',()=>{
  beforeEach(()=>localStorage.clear());
  it('inicia vacio',()=>{
    const {result}=renderHookWithProviders(()=>useCarrito());
    expect(result.current.carrito).toEqual([]);
  });
  it('agrega producto',()=>{
    const {result}=renderHookWithProviders(()=>useCarrito());
    act(()=>result.current.agregarAlCarrito({id:1,nombre:'Test',precio:5000}));
    expect(result.current.carrito).toHaveLength(1);
  });
});
