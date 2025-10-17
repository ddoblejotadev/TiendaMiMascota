import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Header from '../components/Header';
import { renderWithProviders } from './test-utils';

describe('Header', () => {
  it('renderiza correctamente', () => {
  renderWithProviders(<Header />);
    expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
  });
});
