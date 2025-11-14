import React from 'react';
import useAutenticacion from '../hooks/useAutenticacion';
import { Link } from 'react-router-dom';

function PanelAdministrador() {
  const { usuario, cerrarSesion } = useAutenticacion();

  return (
    <div style={{ padding: 20 }}>
      <h1>Panel de Administrador</h1>
      <p>Bienvenido, {usuario?.nombre || usuario?.email}</p>

      <section style={{ marginTop: 20 }}>
        <h2>Acciones rápidas</h2>
        <ul>
          <li><Link to="productos">Gestionar productos</Link></li>
          <li><Link to="pedidos">Ver pedidos</Link></li>
          <li><Link to="usuarios">Administrar usuarios</Link></li>
        </ul>
      </section>

      <div style={{ marginTop: 20 }}>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
      </div>
    </div>
  );
}

export default PanelAdministrador;
