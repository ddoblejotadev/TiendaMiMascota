import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import NotificationContainer from './components/ui/Notification';
import ConfirmDialogContainer from './components/ui/ConfirmDialog';
import Inicio from './pages/Inicio';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Carrito from './pages/Carrito';
import IniciarSesion from './pages/IniciarSesion';
import Registrarse from './pages/Registrarse';
import Contacto from './pages/Contacto';
import Acerca from './pages/Acerca';
import NoEncontrado from './pages/NoEncontrado';
import Categorias from './pages/Categorias';
import Checkout from './pages/Checkout';
import CompraExitosa from './pages/CompraExitosa';
import ErrorPago from './pages/ErrorPago';
import Ofertas from './pages/Ofertas';
import Blog from './pages/Blog';
import MisPedidos from './pages/MisPedidos';
import PanelAdministrador from './pages/PanelAdministrador';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './layouts/AdminLayout';
import AdminProductos from './pages/admin/AdminProductos';
import AdminPedidos from './pages/admin/AdminPedidos';
import AdminUsuarios from './pages/admin/AdminUsuarios';

function App() {
  return (
    <BrowserRouter>
      <NotificationContainer position="top-right" maxNotifications={3} />
      <ConfirmDialogContainer />
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
          <Route path="blog" element={<Blog />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="compra-exitosa" element={<CompraExitosa />} />
          <Route path="error-pago" element={<ErrorPago />} />
          <Route path="pedidos" element={<MisPedidos />} />
          
          {/* Rutas protegidas para administradores (layout + subrutas) */}
          <Route path="admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<PanelAdministrador />} />
            <Route path="productos" element={<AdminProductos />} />
            <Route path="pedidos" element={<AdminPedidos />} />
            <Route path="usuarios" element={<AdminUsuarios />} />
          </Route>
          
          {/* Página 404 */}
          <Route path="*" element={<NoEncontrado />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;