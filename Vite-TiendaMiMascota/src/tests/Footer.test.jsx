/**
 * PRUEBAS PARA EL COMPONENTE FOOTER
 * - Renderizado correcto ✅
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Footer Component', () => {
  it('debe renderizar correctamente el footer', () => {
    renderWithRouter(<Footer />);
    
    // Verificar que el nombre de la tienda está presente
    expect(screen.getByText(/TiendaMiMascota/i)).toBeInTheDocument();
  });

  it('debe mostrar información de contacto', () => {
    renderWithRouter(<Footer />);
    
    // Verificar email
    const emailRegex = /@/;
    const emails = screen.getAllByText(emailRegex);
    expect(emails.length).toBeGreaterThan(0);
  });

  it('debe mostrar el año actual en el copyright', () => {
    renderWithRouter(<Footer />);
    
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(year.toString()))).toBeInTheDocument();
  });

  it('debe mostrar enlaces a redes sociales o secciones', () => {
    renderWithRouter(<Footer />);
    
    // Verificar que hay enlaces
    const enlaces = screen.getAllByRole('link');
    expect(enlaces.length).toBeGreaterThan(0);
  });
});
