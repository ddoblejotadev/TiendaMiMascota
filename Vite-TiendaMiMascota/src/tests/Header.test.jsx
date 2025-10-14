import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

describe('Header', () => {
  it('renderiza correctamente', () => {
    render(<BrowserRouter><Header /></BrowserRouter>);
    expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
  });
});
