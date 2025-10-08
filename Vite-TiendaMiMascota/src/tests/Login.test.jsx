import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/auth/Login';
import { AuthProvider } from '../context/AuthContext';

const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

const renderWithAuthProvider = (component) => {
  return render(
    <AuthProvider>
      {component}
    </AuthProvider>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  describe('Renderizado inicial', () => {
    it('debe renderizar todos los elementos del formulario', () => {
      renderWithAuthProvider(<Login />);
      
      expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/tu contraseña/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    });

    it('debe mostrar el logo y el texto descriptivo', () => {
      renderWithAuthProvider(<Login />);
      
      expect(screen.getByAltText(/mi mascota logo/i)).toBeInTheDocument();
      expect(screen.getByText(/accede a tu cuenta de mi mascota/i)).toBeInTheDocument();
    });

    it('debe mostrar las credenciales de prueba', () => {
      renderWithAuthProvider(<Login />);
      
      expect(screen.getByText(/credenciales de prueba/i)).toBeInTheDocument();
      expect(screen.getByText(/admin@mimascota.com/)).toBeInTheDocument();
      expect(screen.getByText(/usuario@test.com/)).toBeInTheDocument();
    });

    it('debe mostrar enlaces de registro y recuperación de contraseña', () => {
      renderWithAuthProvider(<Login />);
      
      expect(screen.getByText(/¿no tienes cuenta\?/i)).toBeInTheDocument();
      expect(screen.getByText(/¿olvidaste tu contraseña\?/i)).toBeInTheDocument();
    });
  });

  describe('Validación del formulario', () => {
    it('debe mostrar error cuando el email está vacío', async () => {
      const user = userEvent.setup();
      renderWithAuthProvider(<Login />);
      
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      await user.click(submitButton);
      
      expect(screen.getByText(/el email es requerido/i)).toBeInTheDocument();
    });

    it('debe mostrar error cuando el email no es válido', async () => {
      const user = userEvent.setup();
      renderWithAuthProvider(<Login />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      
      await user.type(emailInput, 'email-invalido');
      await user.click(submitButton);
      
      expect(screen.getByText(/el email no es válido/i)).toBeInTheDocument();
    });

    it('debe mostrar error cuando la contraseña está vacía', async () => {
      const user = userEvent.setup();
      renderWithAuthProvider(<Login />);
      
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      await user.click(submitButton);
      
      expect(screen.getByText(/la contraseña es requerida/i)).toBeInTheDocument();
    });

    it('debe mostrar error cuando la contraseña es muy corta', async () => {
      const user = userEvent.setup();
      renderWithAuthProvider(<Login />);
      
      const passwordInput = screen.getByPlaceholderText(/tu contraseña/i);
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      
      await user.type(passwordInput, '123');
      await user.click(submitButton);
      
      expect(screen.getByText(/la contraseña debe tener al menos 6 caracteres/i)).toBeInTheDocument();
    });

    it('debe limpiar errores cuando el usuario empieza a escribir', async () => {
      const user = userEvent.setup();
      renderWithAuthProvider(<Login />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

      await user.click(submitButton);
      expect(screen.getByText(/el email es requerido/i)).toBeInTheDocument();

      await user.type(emailInput, 'test@test.com');
      expect(screen.queryByText(/el email es requerido/i)).not.toBeInTheDocument();
    });
  });

  describe('Funcionalidad de mostrar/ocultar contraseña', () => {
    it('debe alternar la visibilidad de la contraseña', async () => {
      const user = userEvent.setup();
      renderWithAuthProvider(<Login />);
      
      const passwordInput = screen.getByPlaceholderText(/tu contraseña/i);
      const toggleButton = screen.getByRole('button', { name: /mostrar contraseña/i });

      expect(passwordInput).toHaveAttribute('type', 'password');

      await user.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'text');

      await user.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  describe('Envío del formulario', () => {
    it('debe enviar el formulario con credenciales válidas de admin', async () => {
      const user = userEvent.setup();
      renderWithAuthProvider(<Login />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByPlaceholderText(/tu contraseña/i);
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      
      await user.type(emailInput, 'admin@mimascota.com');
      await user.type(passwordInput, 'admin123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('authToken', 'fake-jwt-token');
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
          'userData', 
          expect.stringContaining('admin@mimascota.com')
        );
      });
    });

    it('debe enviar el formulario con credenciales válidas de usuario', async () => {
      const user = userEvent.setup();
      renderWithAuthProvider(<Login />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByPlaceholderText(/tu contraseña/i);
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      
      await user.type(emailInput, 'usuario@test.com');
      await user.type(passwordInput, 'user123');
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('authToken', 'fake-jwt-token');
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
          'userData', 
          expect.stringContaining('usuario@test.com')
        );
      });
    });

    it('debe mostrar error con credenciales incorrectas', async () => {
      const user = userEvent.setup();
      renderWithAuthProvider(<Login />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByPlaceholderText(/tu contraseña/i);
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      
      await user.type(emailInput, 'test@test.com');
      await user.type(passwordInput, 'wrongpassword');
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText(/credenciales incorrectas/i)).toBeInTheDocument();
      });
    });
  });

  describe('Accesibilidad', () => {
    it('debe tener las etiquetas ARIA correctas para errores', async () => {
      const user = userEvent.setup();
      renderWithAuthProvider(<Login />);
      
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      await user.click(submitButton);
      
      const emailError = screen.getByText(/el email es requerido/i);
      const passwordError = screen.getByText(/la contraseña es requerida/i);
      
      expect(emailError).toHaveAttribute('role', 'alert');
      expect(passwordError).toHaveAttribute('role', 'alert');
    });

    it('debe tener aria-describedby en los campos con errores', async () => {
      const user = userEvent.setup();
      renderWithAuthProvider(<Login />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByPlaceholderText(/tu contraseña/i);
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      
      await user.click(submitButton);
      
      expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');
      expect(passwordInput).toHaveAttribute('aria-describedby', 'password-error');
    });

    it('debe tener etiqueta aria-label en el botón de mostrar contraseña', () => {
      renderWithAuthProvider(<Login />);
      
      const toggleButton = screen.getByRole('button', { name: /mostrar contraseña/i });
      expect(toggleButton).toHaveAttribute('aria-label');
    });
  });
});
