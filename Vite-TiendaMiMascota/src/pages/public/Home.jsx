import React from 'react';

const Home = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Bienvenido a Mi Mascota</h1>
      <p>Tu tienda online para mascotas</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/login" style={{ 
          background: '#667eea', 
          color: 'white', 
          padding: '10px 20px', 
          textDecoration: 'none', 
          borderRadius: '5px' 
        }}>
          Iniciar Sesión
        </a>
      </div>
    </div>
  );
};

export default Home;
