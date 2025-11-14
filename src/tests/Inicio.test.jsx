import {describe,it,expect} from 'vitest';
import {render,screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Inicio from '../pages/Inicio';

describe('Inicio',()=>{
  it('renderiza',()=>{
    render(<BrowserRouter><Inicio/></BrowserRouter>);
    expect(screen.getByText(/Bienvenido/i)).toBeInTheDocument();
  });
});
