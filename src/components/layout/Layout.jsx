import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    <>
      <Header />
      <main style={{ minHeight: '60vh', padding: 'var(--space-md)' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
