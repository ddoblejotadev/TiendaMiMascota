import {describe,it,expect} from 'vitest';
import {render,screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Footer from '../components/Footer';

describe('Footer',()=>{
  it('renderiza',()=>{
    render(<BrowserRouter><Footer/></BrowserRouter>);
    expect(screen.getAllByText(/Mi Mascota/i)).toHaveLength(2);
  });
});
