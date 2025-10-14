/**
 * APLICACIÓN PRINCIPAL
 * Configuración de rutas y layout
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Importar páginas
import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import IniciarSesion from './pages/IniciarSesion';
import Registrarse from './pages/Registrarse';
import Contacto from './pages/Contacto';
import Acerca from './pages/Acerca';
import NoEncontrado from './pages/NoEncontrado';

// Nuevas páginas según requisitos del PDF
import Categorias from './pages/Categorias';
import Checkout from './pages/Checkout';
import CompraExitosa from './pages/CompraExitosa';
import ErrorPago from './pages/ErrorPago';
import Ofertas from './pages/Ofertas';

// Importar CSS global
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas con layout (Header + Footer) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Inicio />} />
          <Route path="productos" element={<Productos />} />
          <Route path="productos/:id" element={<DetalleProducto />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="iniciar-sesion" element={<IniciarSesion />} />
          <Route path="registrarse" element={<Registrarse />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="acerca" element={<Acerca />} />
          
          {/* Nuevas rutas según requisitos del PDF */}
          <Route path="categorias" element={<Categorias />} />
          <Route path="ofertas" element={<Ofertas />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="compra-exitosa" element={<CompraExitosa />} />
          <Route path="error-pago" element={<ErrorPago />} />
          
          {/* Página 404 */}
          <Route path="*" element={<NoEncontrado />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;