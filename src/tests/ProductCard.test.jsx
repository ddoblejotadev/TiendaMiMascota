import {describe,it,expect} from 'vitest';
import {screen} from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import { renderWithProviders } from './test-utils';

const producto={id:1,nombre:'Comida para Perros',descripcion:'Producto de prueba',precio:5000,imagen:'test.jpg',stock:10,categoria:'Alimento'};

describe('ProductCard',()=>{
  it('renderiza producto',()=>{
  renderWithProviders(<ProductCard producto={producto}/>);
    expect(screen.getByText(/Comida para Perros/i)).toBeInTheDocument();
  });
});
