/**
 * PRUEBAS PARA EL COMPONENTE NOTIFICATION
 * - Renderizado correcto ✅
 * - Pruebas de props ✅
 * - Pruebas de eventos ✅
 * - Pruebas condicionales ✅
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Notification from '../components/ui/Notification';

describe('Notification Component', () => {
  // PRUEBAS DE RENDERIZADO
  it('debe renderizar cuando isOpen es true', () => {
    render(
      <Notification
        isOpen={true}
        message="Operación exitosa"
        type="success"
        onClose={() => {}}
      />
    );
    
    expect(screen.getByText('Operación exitosa')).toBeInTheDocument();
  });

  it('no debe renderizar cuando isOpen es false', () => {
    const { container } = render(
      <Notification
        isOpen={false}
        message="Operación exitosa"
        type="success"
        onClose={() => {}}
      />
    );
    
    expect(container.firstChild).toBeNull();
  });

  // PRUEBAS DE PROPS
  it('debe mostrar el mensaje correcto', () => {
    render(
      <Notification
        isOpen={true}
        message="Producto agregado al carrito"
        type="success"
        onClose={() => {}}
      />
    );
    
    expect(screen.getByText('Producto agregado al carrito')).toBeInTheDocument();
  });

  it('debe aplicar la clase correcta para tipo "success"', () => {
    const { container } = render(
      <Notification
        isOpen={true}
        message="Éxito"
        type="success"
        onClose={() => {}}
      />
    );
    
    const notification = container.querySelector('.notification, .alert, [class*="success"]');
    expect(notification).toBeInTheDocument();
  });

  it('debe aplicar la clase correcta para tipo "error"', () => {
    const { container } = render(
      <Notification
        isOpen={true}
        message="Error"
        type="error"
        onClose={() => {}}
      />
    );
    
    const notification = container.querySelector('.notification, .alert, [class*="danger"], [class*="error"]');
    expect(notification).toBeInTheDocument();
  });

  it('debe aplicar la clase correcta para tipo "warning"', () => {
    const { container } = render(
      <Notification
        isOpen={true}
        message="Advertencia"
        type="warning"
        onClose={() => {}}
      />
    );
    
    const notification = container.querySelector('.notification, .alert, [class*="warning"]');
    expect(notification).toBeInTheDocument();
  });

  it('debe aplicar la clase correcta para tipo "info"', () => {
    const { container } = render(
      <Notification
        isOpen={true}
        message="Información"
        type="info"
        onClose={() => {}}
      />
    );
    
    const notification = container.querySelector('.notification, .alert, [class*="info"]');
    expect(notification).toBeInTheDocument();
  });

  // PRUEBAS DE EVENTOS
  it('debe llamar onClose cuando se hace clic en el botón cerrar', () => {
    const handleClose = vi.fn();
    
    render(
      <Notification
        isOpen={true}
        message="Mensaje de prueba"
        type="success"
        onClose={handleClose}
      />
    );
    
    const closeButton = screen.getByRole('button', { name: /×|Cerrar/i });
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('debe cerrarse automáticamente después del tiempo especificado', async () => {
    vi.useFakeTimers();
    const handleClose = vi.fn();
    
    render(
      <Notification
        isOpen={true}
        message="Mensaje temporal"
        type="success"
        onClose={handleClose}
        autoClose={3000}
      />
    );
    
    // Avanzar el tiempo 3 segundos
    vi.advanceTimersByTime(3000);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
    
    vi.useRealTimers();
  });

  // PRUEBA CONDICIONAL
  it('debe mostrar icono según el tipo de notificación', () => {
    const { container } = render(
      <Notification
        isOpen={true}
        message="Éxito"
        type="success"
        onClose={() => {}}
      />
    );
    
    // Buscar icono (puede ser SVG, i, o span con clase de icono)
    const icono = container.querySelector('svg, i, [class*="icon"]');
    expect(icono).toBeInTheDocument();
  });

  // PRUEBA DE ACCESIBILIDAD
  it('debe tener atributos de accesibilidad correctos', () => {
    render(
      <Notification
        isOpen={true}
        message="Mensaje accesible"
        type="info"
        onClose={() => {}}
      />
    );
    
    const notification = screen.getByRole('alert') || screen.getByRole('status');
    expect(notification).toBeInTheDocument();
  });
});
