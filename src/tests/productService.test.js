import { describe, it, expect } from 'vitest';
import { mapearProductoBackend } from '../services/productService';

describe('productService mapping', () => {
  it('maps imageUrl to imagen', () => {
    const backend = {
      id: 1,
      name: 'Alimento de prueba',
      imageUrl: 'https://images.unsplash.com/photo-test.jpg?w=400',
      category: 'Alimento'
    };

    const mapped = mapearProductoBackend(backend);
    expect(mapped.imagen).toBe('https://images.unsplash.com/photo-test.jpg?w=400');
  });

  it('maps images array first element', () => {
    const backend = {
      id: 2,
      name: 'Pelota',
      images: [{ url: 'https://cdn.example.com/pelota.jpg' }],
      category: 'Juguetes'
    };
    const mapped = mapearProductoBackend(backend);
    expect(mapped.imagen).toBe('https://cdn.example.com/pelota.jpg');
  });

  it('fallbacks to category image when no image present', () => {
    const backend = {
      id: 3,
      name: 'Sin imagen',
      category: 'Accesorios'
    };
    const mapped = mapearProductoBackend(backend);
    expect(mapped.imagen).toContain('images.unsplash.com');
  });
});
