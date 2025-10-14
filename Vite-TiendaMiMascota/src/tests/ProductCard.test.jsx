import {describe,it,expect} from 'vitest';
import {render,screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const producto={id:1,nombre:'Comida para Perros',descripcion:'Producto de prueba',precio:5000,imagen:'test.jpg',stock:10,categoria:'Alimento'};

describe('ProductCard',()=>{
  it('renderiza producto',()=>{
    render(<BrowserRouter><ProductCard producto={producto}/></BrowserRouter>);
    expect(screen.getByText(/Comida para Perros/i)).toBeInTheDocument();
  });
});
