import React from 'react';
import { Navigate } from 'react-router-dom';
import useAutenticacion from '../hooks/useAutenticacion';

/**
 * AdminRoute: Protege rutas de administrador.
 * Reglas: usuario debe estar logueado y tener rol 'admin'.
 */
function AdminRoute({ children }) {
  const { usuario, cargando } = useAutenticacion();

  if (cargando) return null;

  if (!usuario) {
    // No autenticado -> redirigir a iniciar sesión
    return <Navigate to="/iniciar-sesion" replace />;
  }

  // Verificar rol de admin
  const esAdmin = usuario.rol === 'admin';
  if (!esAdmin) {
    // Usuario no es admin -> redirigir a inicio
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute