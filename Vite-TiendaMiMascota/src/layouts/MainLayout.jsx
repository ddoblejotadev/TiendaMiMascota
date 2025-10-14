/**
 * LAYOUT: PRINCIPAL
 * Layout base con Header y Footer
 */

import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MainLayout() {
  return (
    <div className="layout-principal">
      <Header />
      
      <main className="contenido-principal">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}

export default MainLayout;