import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import { renderHook } from '@testing-library/react';

export function renderWithProviders(ui, options = {}) {
  return render(<BrowserRouter><CartProvider>{ui}</CartProvider></BrowserRouter>, options);
}

export function renderHookWithProviders(callback, options = {}) {
  const wrapper = ({ children }) => (
    <BrowserRouter>
      <CartProvider>{children}</CartProvider>
    </BrowserRouter>
  );
  return renderHook(callback, { wrapper, ...options });
}
