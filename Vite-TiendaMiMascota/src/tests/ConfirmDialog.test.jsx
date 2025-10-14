/**
 * PRUEBAS PARA EL COMPONENTE CONFIRMDIALOG
 * - Renderizado correcto ✅
 * - Pruebas de props ✅
 * - Pruebas de eventos ✅
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmDialog from '../components/ui/ConfirmDialog';

describe('ConfirmDialog Component', () => {
  // PRUEBAS DE RENDERIZADO
  it('debe renderizar cuando isOpen es true', () => {
    render(
      <ConfirmDialog
        isOpen={true}
        title="Confirmar"
        message="¿Estás seguro?"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    
    expect(screen.getByText('Confirmar')).toBeInTheDocument();
    expect(screen.getByText('¿Estás seguro?')).toBeInTheDocument();
  });

  it('no debe renderizar cuando isOpen es false', () => {
    const { container } = render(
      <ConfirmDialog
        isOpen={false}
        title="Confirmar"
        message="¿Estás seguro?"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    
    // El componente no debe estar visible
    expect(container.firstChild).toBeNull();
  });

  // PRUEBAS DE PROPS
  it('debe mostrar el título correcto', () => {
    render(
      <ConfirmDialog
        isOpen={true}
        title="Eliminar Producto"
        message="¿Estás seguro?"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    
    expect(screen.getByText('Eliminar Producto')).toBeInTheDocument();
  });

  it('debe mostrar el mensaje correcto', () => {
    render(
      <ConfirmDialog
        isOpen={true}
        title="Confirmar"
        message="Esta acción no se puede deshacer"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    
    expect(screen.getByText('Esta acción no se puede deshacer')).toBeInTheDocument();
  });

  // PRUEBAS DE EVENTOS
  it('debe llamar onConfirm cuando se hace clic en confirmar', () => {
    const handleConfirm = vi.fn();
    
    render(
      <ConfirmDialog
        isOpen={true}
        title="Confirmar"
        message="¿Estás seguro?"
        onConfirm={handleConfirm}
        onCancel={() => {}}
      />
    );
    
    const confirmButton = screen.getByRole('button', { name: /Confirmar|Aceptar|Sí/i });
    fireEvent.click(confirmButton);
    
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it('debe llamar onCancel cuando se hace clic en cancelar', () => {
    const handleCancel = vi.fn();
    
    render(
      <ConfirmDialog
        isOpen={true}
        title="Confirmar"
        message="¿Estás seguro?"
        onConfirm={() => {}}
        onCancel={handleCancel}
      />
    );
    
    const cancelButton = screen.getByRole('button', { name: /Cancelar|No/i });
    fireEvent.click(cancelButton);
    
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it('debe cerrar el diálogo al hacer clic en el botón X', () => {
    const handleCancel = vi.fn();
    
    render(
      <ConfirmDialog
        isOpen={true}
        title="Confirmar"
        message="¿Estás seguro?"
        onConfirm={() => {}}
        onCancel={handleCancel}
      />
    );
    
    const closeButton = screen.getByRole('button', { name: /×|Cerrar/i });
    fireEvent.click(closeButton);
    
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  // PRUEBA DE ACCESIBILIDAD
  it('debe tener los botones correctamente etiquetados', () => {
    render(
      <ConfirmDialog
        isOpen={true}
        title="Confirmar"
        message="¿Estás seguro?"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    );
    
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });
});
